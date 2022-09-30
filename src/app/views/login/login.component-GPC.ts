import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, RouterModule, Routes } from "@angular/router";
import * as jwtDecode from "jwt-decode";
//import { CookieService } from "angular2-cookie/core";
import { LoginService } from './login.service';
import { CommonMethods } from '../../common/common.components';
import { UserData } from '../../user'
import { PreferenceService } from '../settings/successkpi-setting/successkpi-setting.service';
import { GlobalComponent } from '../../global/global.component'
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from '../../containers/header/header.service';
import * as auditLogs from '../../auditLogsPath';
import * as moment from 'moment';
// import { CookieService } from 'ngx-cookie-service';
import { utils } from '../../config';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup
  issubmit: boolean = false;
  loginobj: object = {};
  username: string = "";
  password: string = "";
  loading: boolean = false;
  isMstrActive = true;

  isloginPage = false;

  errormsg: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // public cookieService: CookieService, 
    private loginService: LoginService,
    private commonMethods: CommonMethods,
    private preferenceService: PreferenceService,
    private global: GlobalComponent, private spinnerService: NgxSpinnerService, public headerService: HeaderService) {
    this.spinnerService.show();
    this.validateToken()
  }

  ngOnInit() {
    setTimeout(() => {
      this.isMstrActive = false;
    }, 500)
    this.form();
  }

  validateToken() {
    if (this.commonMethods.tokenValidation()) {
      this.isloginPage = false
      setTimeout(() => {
        this.spinnerService.hide();
        this.router.navigateByUrl("/home/command-center");
      }, 1000)
    }
    else {
      this.spinnerService.hide();
      this.isloginPage = true;
      this.login();
    }
  }


  form() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  routerPath: any = null;
  loginRoles: any;

  login() {
    let gpc_Env = utils.genesys_premium_env;
    let genesysObj = localStorage.getItem('premium_app_auth_data');
    let gApi = localStorage.getItem(gpc_Env);
    // gApi ??= 'mypurecloud.com'
    if (genesysObj != null && localStorage.getItem("userToken") == null) {
      try {
        this.spinnerService.show();
        let loginobj = JSON.parse(genesysObj)
        loginobj.apiUrl = gApi;
        this.loading = true;
        this.loginService.login(loginobj).subscribe(
          (data: any) => {
            console.log("connection established!!")
            // console.log(data)
            this.storeJwtToken(data)
          },
          (error) => {
            this.loading = false;
            console.log(error);
            if (error.error === "Incorrect username or password." || error.error === "User does not exist."){
              this.errormsg = "Please check your username and password. If you still can’t log in, contact your SuccessKPI administrator."
            }
            else {
              this.errormsg = error.error;
            }
            this.commonMethods.addToastforlongtime(false, this.errormsg)
            this.spinnerService.hide();
          }
        );
      } catch (error) {
        // window.location.href = 'https://' + window.location.hostname + '/premium/wizard/index.html';
      }

    }
    else if (genesysObj == null) {
      // window.location.href = 'https://' + window.location.hostname + '/premium/wizard/index.html';
    }
  }

  storeJwtToken(data) {
    localStorage.setItem("mstrIdToken", JSON.stringify(data.mstrIdToken))
    localStorage.setItem("_mstrweb", data.mstrSessionState == '' ? null : data.mstrSessionState);
    localStorage.setItem("mstrAuthToken", JSON.stringify(data.mstrAuthToken))
    localStorage.setItem('mstrProject', data.mstrProject)
    localStorage.setItem('_mgrp', data['_mgrp'])
    localStorage.setItem('mstr_SR_FID',data['sharedFolderId'])
    localStorage.setItem('mstr_PR_FID',data['publicFolderId'])
    //---------------------------------encrypted token
    let idToken = this.commonMethods.encryptData(data.idToken);
    localStorage.setItem("userToken", idToken);

    let accessToken = this.commonMethods.encryptData(data.accessToken);
    localStorage.setItem("accessToken", accessToken);

    let refreshToken = this.commonMethods.encryptData(data.refreshToken);
    localStorage.setItem("_reftoken", refreshToken);

    this.global.rolePermissions = data.roles.successkpiFeatures;
    this.loginRoles = this.commonMethods.encryptData(data.roles.successkpiFeatures)
    localStorage.setItem("_&rp&", this.loginRoles);

    let _gr: any = { r: typeof data.roles.roleId == 'undefined' ? 'Admin' : data.roles.roleId }
    _gr = this.commonMethods.encryptData(_gr)
    localStorage.setItem('_&gr&', _gr);

    let decode = jwtDecode(data.idToken)
    UserData.email_Id = decode["email"];
    let getUser = localStorage.getItem("g_obj")
    if (getUser != null) {
      try {
        UserData.userName = JSON.parse(getUser)['userName']
      } catch (error) {
        UserData.userName = decode["custom:CustomerName"];
      }
    }
    else {
      UserData.userName = decode["custom:CustomerName"];
    }
    let login = auditLogs.configJson.login
    this.routerPath = login
    this.auditLog();
    this.getLocalLangs(decode["custom:customerId"]);
  }


  getLocalLangs(customerId) {
    this.spinnerService.show();
    this.loginService.getLocalLangs().subscribe(
      (data: any) => {
        if (typeof (data.uiLanguage) !== "undefined") {
          data.uiLanguage = data.uiLanguage != null && data.uiLanguage != "" ? data.uiLanguage : "english";
          localStorage.setItem("language", data.uiLanguage)
        }
        else {
          localStorage.setItem("language", "english")
        }
        let logoObj = localStorage.getItem('logo') == null || typeof (localStorage.getItem('logo')) == 'undefined' ? null : JSON.parse(localStorage.getItem('logo'))
        if (logoObj == null || logoObj.customerId != customerId) {
          this.setLogoPreference(customerId);
        }
        else {
          window.location.reload();
        }
        this.spinnerService.hide();
      }, (error) => {
        this.spinnerService.hide();
      })
  }


  setLogoPreference(customerId) {
    this.preferenceService.getPreference().subscribe(
      (data: any) => {
        if (typeof (data.imageUrl) != 'undefined' && data.imageUrl != null) {
          let re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
          if (data.isLogoChecked == 'upload' && re.test(data.imageUrl)) {

            localStorage.setItem("logo", JSON.stringify({ imageUrl: data.imageUrl, customerId: customerId }));
            // UserData.defaultLogo = data.imageUrl;

          }
          else if (data.isLogoChecked == 'default') {
            // UserData.defaultLogo = '../assets/img/SuccessKPI_Logo .svg';
            localStorage.setItem("logo", JSON.stringify({ imageUrl: 'default', customerId: customerId }));

          }
          else {
            localStorage.setItem("logo", JSON.stringify({ imageUrl: 'default', customerId: customerId }));
          }
        }
        else {
          localStorage.setItem("logo", null);
        }
        window.location.reload();
      }
    )
  }

  params: object;
  auditLog() {
    // let C_Id = UserData.customerId
    let Email = UserData.email_Id;

    let date = new Date();
    let timestamp = moment(date).format('YYYY-MM-DD HH:mm:ss');

    this.params = {
      // CustomerID: C_Id,
      User_Email: Email,
      Activity: this.routerPath,
      Event_Time: timestamp
    }
    // console.log(this.params)
    this.headerService.auditLog(this.params).subscribe(
      (data: any) => {
        // console.log(data);
        Email = null;
        this.routerPath = null;
        timestamp = null;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // localRole:any;
  // getRoleList(){
  //   this.localRole = localStorage.getItem("rN")
  //   this.loginService.getroleList(this.localRole).subscribe(
  //     (response)=>{
  //       console.log(response)
  //       // this.global.rolePermissions = response.successkpiFeatures
  //     },
  //     (error) => {
  //       console.log('error', error);
  //     });
  // }

}
