import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import utils from '../config';
import { LoginService } from '../views/login/login.service'
import { NgxSpinnerService } from 'ngx-spinner';



@Injectable({
    providedIn: 'root'
})
export class MstrTokenService {

    constructor(
        private injector: Injector, private http: HttpClient,private spinnerService: NgxSpinnerService) {
    }
    mstrRefreshToken(): Observable<any> {
        let url = utils.authPath + "/api/auth0/validatemstrsession";
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
                // this.startRefreshTokenTimer(tokens);
                return tokens;

            }))
    }

    generateToken(): Observable<any> {
        let url = utils.authPath + "/api/auth0/createjwt";
        let obj = null
        return this.http.post(url, obj).
            pipe(tap((tokens: any) => {
                this.storeMstrToken(tokens);
                // this.startRefreshTokenTimer(tokens);
            }))
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

    refreshMSTRSession() {
        this.spinnerService.show();
        let url = utils.authPath + "/api/auth0/createmstrsession";
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
        this.http.post(url, obj).subscribe((data:any)=>{
            this.recreateMSTRsession(data);
        },
        (error)=>{
            console.log(error);
            this.spinnerService.hide();
        })
           
    }

    recreateMSTRsession(data) {
        if (data.mstrIdToken) {
            localStorage.setItem("mstrIdToken", JSON.stringify(data.mstrIdToken))
            localStorage.setItem("_mstrweb", data.mstrSessionState == '' ? null : data.mstrSessionState);
            localStorage.setItem("mstrAuthToken", JSON.stringify(data.mstrAuthToken));
        }
        else{
            this.spinnerService.hide();
        }
        this.spinnerService.hide();
        window.location.reload();
    }
}