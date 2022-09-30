import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsyncSubject, Observable, throwError } from 'rxjs';
import utils from '../../config';
import { tap } from 'rxjs/operators';
import { CommonMethods } from '../../common/common.components';
import {
  Routes, Router,
  Event as RouterEvent,
} from '@angular/router';
import * as routePath from '../../common/mstrrefreshrouterpath.json';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private commonMethods: CommonMethods, private router: Router) { }
  mstrRoutes: any = (routePath as any).default;
  login(loginobj): Observable<any> {
    let url = utils.authPath + "/api/genesyspremium/signin";
    return this.http.post(url, loginobj)
  }

  logout() {
    this.stopRefreshTokenTimer()
    if (this.commonMethods.tokenValidation()) {
      let mstr = {};
      if (localStorage.getItem("mstrAuthToken")) {
        mstr = localStorage.getItem("mstrAuthToken");
        mstr = typeof mstr == 'string' ? JSON.parse(mstr) : mstr;
      }
      let url = utils.authPath + "/api/genesyspremium/signout";
      let params = {
        "mstrAuthToken": typeof mstr['authToken'] != 'undefined' ? mstr['authToken'] : null,
        "accessToken": this.commonMethods.decryptData(localStorage.getItem("accessToken")),
        "cookie": typeof mstr['cookie'] != 'undefined' ? mstr['cookie'] : null,
        "_mstrWeb": localStorage.getItem("_mstrweb"),
        "project": localStorage.getItem("mstrProject"),
        "group": localStorage.getItem('_mgrp')

      }
      this.http.post(url, params).subscribe((data: any) => {
        this.commonMethods.clearLocalStorage();
        window.location.reload();
      }, (err) => {
        this.commonMethods.clearLocalStorage();
        window.location.reload();
      });
    }
    else {
      this.commonMethods.clearLocalStorage();
      this.router.navigateByUrl('/login')
    }

  }


  idleLogout() {
    this.stopRefreshTokenTimer();
    if (this.commonMethods.tokenValidation()) {
      let mstr = {};
      if (localStorage.getItem("mstrAuthToken")) {
        mstr = localStorage.getItem("mstrAuthToken");
        mstr = typeof mstr == 'string' ? JSON.parse(mstr) : mstr;
      }
      let url = utils.authPath + "/api/genesyspremium/signout";
      let params = {
        "mstrAuthToken": typeof mstr['authToken'] != 'undefined' ? mstr['authToken'] : null,
        "accessToken": this.commonMethods.decryptData(localStorage.getItem("accessToken")),
        "cookie": typeof mstr['cookie'] != 'undefined' ? mstr['cookie'] : null,
        "_mstrWeb": localStorage.getItem("_mstrweb"),
        "project": localStorage.getItem("mstrProject"),
        "group": localStorage.getItem('_mgrp')
      }
      this.http.post(url, params).subscribe((data: any) => {
        this.commonMethods.clearLocalStorage();
      }, (err) => {
        this.commonMethods.clearLocalStorage();
      });
    }
    else {
      this.commonMethods.clearLocalStorage();
    }
  }

  getLocalLangs(): Observable<any> {
    let url = utils.pathPhase9 + "/api/getlanguagecustomerpool"
    return this.http.get(url);
  }
  getRoleData = new AsyncSubject();
  getroles(roleId): Observable<any> {
    let url = utils.pathPhase10 + "/api/roles/GetRoleData?";
    let params = new URLSearchParams()
    params.append("roleId", roleId)
    return this.http.get(url + params)
  }

  refreshToken(): Observable<any> {
    let url = utils.authPath + "/api/auth0/validatejwt";
    let obj = { refreshToken: this.commonMethods.decryptData(localStorage.getItem('_reftoken')) }
    return this.http.post(url, obj).
      pipe(tap((tokens: any) => {
        if (typeof (tokens.idToken) != 'undefined') {
          this.storeJwtToken(tokens);
        }
      }))
  }

  storeJwtToken(token) {
    if (token.idToken) {
      //---------------------------------encrypted token
      let idToken = this.commonMethods.encryptData(token.idToken);
      localStorage.setItem("userToken", idToken);

      let accessToken = this.commonMethods.encryptData(token.accessToken);
      localStorage.setItem("accessToken", accessToken);

      let refreshToken = this.commonMethods.encryptData(token.refreshToken);
      localStorage.setItem("_reftoken", refreshToken);
    }
  }

  stopRefreshTokenTimer() {
    if (typeof (utils.refreshTokenTimeout) != 'undefined') {
      clearTimeout(utils.refreshTokenTimeout);
    }
    if (typeof (utils.mstrTokenTimeout) != 'undefined') {
      clearTimeout(utils.mstrTokenTimeout);
    }
  }

  redirectTo(url: string = null) {
    if (url == 'reload') {
      url = this.router.url
      this.router.navigateByUrl('/_reload', { skipLocationChange: true }).then(() => {
        this.router.navigate([url]);
      })
    }
    else {
      if (!url) {
        url = this.router.url
      }
      let data = ''
      try {
        let str = url.split('/')
        data = str[str.length - 1]
      } catch (error) {
        data = url
      }
      let isReload = this.mstrReloadRoutes(data)
      if (isReload) {
        this.router.navigateByUrl('/_reload', { skipLocationChange: true }).then(() => {
          this.router.navigate([url]);
        })
      }
      else {
        utils.isMstrReload = true;
      }
    }
  }

  mstrReloadRoutes(path) {
    try {
      if (typeof this.mstrRoutes[path] != 'undefined') {
        return true
      }
      else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  genesysSessionValidate(loginobj): Observable<any> {
    let url = utils.authPath + "/api/genesyspremium/genesysvalidate";
    return this.http.post(url, loginobj)
  }
}
