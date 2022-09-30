import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import utils from '../config';
import * as CryptoJS from 'crypto-js';
import { LoginService } from '../views/login/login.service'


@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  constructor(
    private injector: Injector, private http: HttpClient) {
  }

  // public get router(): Router { //this creates router property on your service.
  //   return this.injector.get(Router);
  // }
  refreshToken(): Observable<any> {
    let url = utils.authPath + "/api/auth0/validatejwt";
    let obj = { refreshToken: this.decryptData(localStorage.getItem('_reftoken')) }
    return this.http.post(url, obj).
      pipe(tap((tokens: any) => {
        this.storeJwtToken(tokens);
        this.startRefreshTokenTimer(tokens);
        return tokens;

      }))
  }

  generateToken(): Observable<any> {
    let url = utils.authPath + "/api/auth0/createjwt";
    let obj = { refreshToken: this.decryptData(localStorage.getItem('_reftoken')) }
    return this.http.post(url, obj).
      pipe(tap((tokens: any) => {
        this.storeJwtToken(tokens);
        this.startRefreshTokenTimer(tokens);
      }))
  }

  mstrNewToken(): Observable<any> {
    let url = utils.authPath + "/api/auth0/mstr-refreshtoken";
    let mstr = {};
    if (localStorage.getItem("mstrAuthToken")) {
      mstr = localStorage.getItem("mstrAuthToken");
      mstr = typeof mstr == 'string' ? JSON.parse(mstr) : mstr;
    }
    let obj = {
      "mstrAuthToken": typeof mstr['authToken'] != 'undefined' ? mstr['authToken'] : null,
      "cookie": typeof mstr['cookie'] != 'undefined' ? mstr['cookie'] : null,
      "_mstrWeb": localStorage.getItem("_mstrweb"),
      "project": localStorage.getItem('mstrProject'),
      "group": localStorage.getItem('_mgrp')
    }
    return this.http.post(url, obj).
      pipe(tap((tokens: any) => {
        this.storeMstrToken(tokens);
      }))
  }

  // helper methods

  private startRefreshTokenTimer(token) {
    let idToken = null
    if (token.idToken) {
      idToken = token.idToken
    }
    else {
      idToken = this.decryptData(localStorage.getItem('userToken'));
    }
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(idToken.split('.')[1]));
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    // console.log(expires);
    // console.log(new Date(token.utc))
    let timeout = expires.getTime() - new Date(token.utc).getTime() - (600 * 1000);
    console.log(timeout)
    if (timeout < 0) {
      const auth = this.injector.get(LoginService);
      auth.stopRefreshTokenTimer()
      this.generateToken().subscribe();
      this.mstrNewToken().subscribe();
    }
    else {
      utils.refreshTokenTimeout = setTimeout(() => this.generateToken().subscribe(), timeout);
      utils.mstrTokenTimeout = setTimeout(() => this.mstrNewToken().subscribe(), timeout);
    }
  }

  storeJwtToken(token) {
    if (token.idToken) {
      //---------------------------------encrypted token
      let idToken = this.encryptData(token.idToken);
      localStorage.setItem("userToken", idToken);

      let accessToken = this.encryptData(token.accessToken);
      localStorage.setItem("accessToken", accessToken);

      let refreshToken = this.encryptData(token.refreshToken);
      localStorage.setItem("_reftoken", refreshToken);
    }
  }
  storeMstrToken(data) {
    const auth = this.injector.get(LoginService);
    if (data.mstrIdToken) {
      localStorage.setItem("mstrIdToken", JSON.stringify(data.mstrIdToken))
      localStorage.setItem("_mstrweb", data.mstrSessionState == '' ? null : data.mstrSessionState);
      localStorage.setItem("mstrAuthToken", JSON.stringify(data.mstrAuthToken))
      auth.redirectTo()
    }
  }

  encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), utils.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }
  }
  decryptData(data) {
    if (data) {
      try {
        const bytes = CryptoJS.AES.decrypt(data, utils.encryptSecretKey);
        if (bytes.toString()) {
          return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } else {
          return null
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}