import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { utils } from "./config";
import { HttpClient, HttpBackend } from '@angular/common/http';
import * as jwtDecode from 'jwt-decode';

import { UserData } from './user';
// import { TranslateService } from '@ngx-translate/core';
import { CommonMethods } from './common/common.components';
import { GlobalComponent } from './global/global.component';
import { HeaderService } from './containers/header/header.service';
import { BnNgIdleService } from 'bn-ng-idle';
import * as auditLogs from './auditLogsPath';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { KeyQuestionsService } from './views/analyze/key-questions/key-questions.service';
// import { JwtHelperService } from "@auth0/angular-jwt";

import { LoginService } from './views/login/login.service';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer'


import { RefreshTokenService } from '../app/services/refreshtoken.service'


@Component({
  selector: 'body',
  template: `<router-outlet></router-outlet>
  <ngx-spinner  class="spinner-load"  bdColor = "rgba(0, 0, 0, 0.73)" size = "medium" color = "rgb(127, 199, 165)" type = "ball-clip-rotate-multiple"  [fullScreen] = "true"></ngx-spinner>  
  
  <span id="mymodal" data-toggle="modal" data-target="#sessionModal"></span>
  
  <div class="modal" id="sessionModal" data-backdrop="static">
 <div class="modal-dialog">
   <div class="modal-content delete-popup">
     <div class="logout-modal">
       <div class="delete-popup-content" style="padding: 35px 30px 35px 30px;">
         <img src="../assets/img/glyphs_messaging/glyph_danger.svg" style="height: 30px;
             margin-right: 20px;">
         <h5 style="padding-top:6px">Your session has expired due to inactivity.</h5>
       </div>
     </div>
     <div class="modal-footer " style="border-top: 0px;justify-content: center;">
       <div>
         <button type="button" class="btn-pop-del" data-dismiss="modal" (click)="logoutSession(true)">Okay</button>
       </div>
     </div>
   </div>
 </div>
</div>
`
})
export class AppComponent implements OnInit {
  httpLocal: any;
  constructor(private router: Router, private http: HttpClient, private commonMethods: CommonMethods,
    public global: GlobalComponent, public headerService: HeaderService, private handler: HttpBackend,
    private bnIdle: BnNgIdleService, private spinnerService: NgxSpinnerService, private loginService: LoginService, private keyQuestionsService: KeyQuestionsService, private refreshService: RefreshTokenService) {
  }

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    let valid = this.commonMethods.tokenValidation();
    this.setProfile(valid)
  }

  setProfile(valid) {
    if (valid) {
      let role = localStorage.getItem("_&rp&");
      let idtoken = localStorage.getItem("userToken");
      let accessToken = localStorage.getItem("accessToken");
      let _reftoken = localStorage.getItem("_reftoken");
      if (idtoken && role && accessToken && _reftoken) {
        try {
          let token = this.commonMethods.decryptData(idtoken);
          let resDec = this.commonMethods.decryptData(role)
          let actoken = this.commonMethods.decryptData(accessToken);
          let reftoken = this.commonMethods.decryptData(_reftoken)
          if (token && resDec && actoken && reftoken) {
            let decode = jwtDecode(token);
            UserData.userName = decode["custom:CustomerName"];
            UserData.customerId = decode["custom:customerId"];
            UserData.role = decode["custom:Role"];
            UserData.email_Id = decode["email"];
            UserData.user_Sub_Id = decode["sub"];
            this.global.rolePermissions = resDec;
            this.IdleLogout();
            this.getMstrProject();
            utils.isMstrTokenAlive = true;
            this.refreshMstrInterval();
          }
          else {
            this.loginService.logout();
          }
        } catch (error) {
          this.loginService.logout();
        }
      }
    }
    // else { //comment it for reload/refresh on same page
    //   this.loginService.logout()
    // }
  }

  IdleLogout() {
    this.bnIdle.startWatching(3600).subscribe((res) => {
      if (res) {
        console.log("session expired");
        this.stopTimer();
        this.logoutSession();
      }
    });
  }

  stopTimer() {
    this.bnIdle.stopTimer()
  }

  logoutSession(reload: boolean = false) {
    if (!reload) {
      let logout = auditLogs.configJson.logout;
      this.auditLog(logout);
      this.loginService.idleLogout();
      document.getElementById('mymodal').click();
    } else {
      this.spinnerService.show();
      window.location.reload();
    }
  }

  auditLog(routerPath) {
    let Email = UserData.email_Id
    let date = new Date();
    let timestamp = moment(date).format('YYYY-MM-DD HH:mm:ss');
    let params = {
      User_Email: Email,
      Activity: routerPath,
      Event_Time: timestamp
    }
    this.headerService.auditLog(params).subscribe(
      (data: any) => {
        Email = null;
        routerPath = null;
        timestamp = null;
      },
      (error) => {
        console.log(error);
      })
  }

  getMstrProject() {
    this.keyQuestionsService.getMstrConfig().subscribe((data: any) => {
      localStorage.setItem('mstrProject', data.project);
      localStorage.setItem('_mgrp', data.mstrgroup);
      localStorage.setItem('EVAL_ROOM_ATTR_ID', data.EVAL_ROOM_ATTR_ID);

    })
  }

  refreshMstrInterval() {
    Observable.timer(0, 300000)
      .takeWhile(() => utils.isMstrTokenAlive) // only fires when component is alive
      .subscribe(() => {
        this.refreshService.mstrNewToken().subscribe((res) => {
        })
      });
  }
}

