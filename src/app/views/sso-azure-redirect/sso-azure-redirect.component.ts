import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethods } from '../../common/common.components';
import { HeaderService } from '../../containers/header/header.service';
import { GlobalComponent } from '../../global/global.component';
import { LoginService } from '../login/login.service';
import { PreferenceService } from '../settings/successkpi-setting/successkpi-setting.service';
import { Router, RouterModule, Routes } from "@angular/router";
import * as jwtDecode from "jwt-decode";
import { UserData } from '../../user'
import * as auditLogs from '../../auditLogsPath';
import * as moment from 'moment';
import { SSO_AzureService } from '../sso-azure-login/sso-azure-login.service';

@Component({
  selector: 'app-sso-azure-redirect',
  templateUrl: './sso-azure-redirect.component.html',
  styleUrls: ['./sso-azure-redirect.component.css']
})
export class SsoAzureRedirectComponent implements OnInit {
  
  queryParams:any
  isMstrActive = true;

  isloginPage = false;

  errormsg: string = "";
  constructor(private activatedRoute: ActivatedRoute,private loginService: LoginService,
    private commonMethods: CommonMethods, private preferenceService: PreferenceService,
    private global: GlobalComponent, private spinnerService: NgxSpinnerService, public headerService: HeaderService,
    private router: Router,public ssoLogin: SSO_AzureService) {
      this.spinnerService.show();
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params
    });
    
   }

  ngOnInit(): void {
   this.validateToken()
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
      // this.spinnerService.hide();
      // this.isloginPage = true
      if(this.queryParams.code != "" && this.queryParams.code != undefined){
        // console.log("CODE")
        this.login()
      }
      else{
        this.spinnerService.hide();
      }
      
    }
  }



  routerPath: any = null;
  loginRoles: any;

  login() {
    
    let loginobj = {
      code: this.queryParams.code,
      orgcode:this.queryParams.orgcode
    };
    // console.log(loginobj)
    this.spinnerService.show();
    this.ssoLogin.redirectSSOLogin(loginobj).subscribe(
      (data: any) => {
        console.log("connection established!!")
        // console.log(data)
        this.storeJwtToken(data)
      },
      (error) => {
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
      
  }

  storeJwtToken(data) {
    localStorage.setItem("mstrIdToken", JSON.stringify(data.mstrIdToken))
    localStorage.setItem("_mstrweb", data.mstrSessionState == '' ? null : data.mstrSessionState);
    localStorage.setItem("mstrAuthToken", JSON.stringify(data.mstrAuthToken))
    localStorage.setItem('mstrProject', data.mstrProject)
    localStorage.setItem('_mgrp', data['_mgrp'])
    localStorage.setItem('mstr_SR_FID',data['cusFolderId'])
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

    let decode = jwtDecode(data.idToken)
    UserData.userName = decode["custom:CustomerName"];
    UserData.email_Id = decode["email"];
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
}
