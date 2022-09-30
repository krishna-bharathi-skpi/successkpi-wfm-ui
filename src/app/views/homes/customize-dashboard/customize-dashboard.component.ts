import { Component, OnInit } from '@angular/core';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
import * as jwtDecode from 'jwt-decode';
import utils from '../../../config';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { UserData } from '../../../../app/user';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-customize-dashboard',
  templateUrl: './customize-dashboard.component.html',
  styleUrls: ['./customize-dashboard.component.css']
})
export class CustomizeDashboardComponent implements OnInit {
  Mstr_CustomizeHomeScreen: string = null;
  uuid: string;
  userToken: string;
  decodeToken: any;
  mstrIdToken: any;
  idToken: any;
  documentID: string = null;



  constructor(private keyQuestionsService: KeyQuestionsService, public keyQuestions: KeyQuestionsService,
    private commonMethods: CommonMethods, public global: GlobalComponent, public loginService: LoginService) {
    this.userToken = this.commonMethods.decryptData(localStorage.getItem('userToken'));
    this.decodeToken = JSON.parse(JSON.stringify(jwtDecode(this.userToken)));
    this.uuid = this.decodeToken['custom:customerId'];
    this.getSharedDashboard();
  }

  ngOnInit() {

  }

  getSharedDashboard() {
    let systemSetingData: any;
    let rolehomeID: any;
    this.getsystemSettings().then((resdata) => {
      systemSetingData = resdata;
      return this.roleList();
    }).then((roles: any) => {
      rolehomeID = roles

      return this.getHomeDashboard()
    }).then((resTiles: any) => {
      // this.mstrIdToken = localStorage.getItem("mstrIdToken");
      // this.mstrIdToken = JSON.parse(this.mstrIdToken)
      // this.idToken = "?idToken=" + this.mstrIdToken['x-mstr-identitytoken'];
      if (rolehomeID.isHomedashboard === 'role') {
        this.documentID = rolehomeID.homeDashboardId;
      }
      else if (systemSetingData.dashboardId != null && typeof (systemSetingData['dashboardId']) != "undefined") {
        this.documentID = systemSetingData.dashboardId;
      }
      else {
        this.documentID = resTiles.OverView.documentID;
      }
      let decPassword = this.commonMethods.decryptMstrPwd(resTiles.Password)
      resTiles.Password = decPassword.pwd;
      if (!this.global.mstrPreference) {
        this.Mstr_CustomizeHomeScreen = resTiles.Mstr_CustomizeHomeScreen.replace("{{mstrServer}}", resTiles.mstrServer);
        this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{project}}", resTiles.project);
        // this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{uuid}}", this.uuid);
        // this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{password}}", resTiles.Password);
        this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{documentID}}", this.documentID);
        this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{locale}}", this.global.MstrWebCode)
        // this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen + '&hiddensections=' + this.global.hiddenSections
        this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen + '&usrSmgr=' + localStorage.getItem('_mstrweb')
        this.reloadReports()
      }
      else if (this.global.mstrPreference == 'preference') {
        this.Mstr_CustomizeHomeScreen = resTiles.Mstr_Preference.replace("{{locale}}", this.global.MstrWebCode);
        this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{project}}", resTiles.project);
        this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{localeMD}}", this.global.MstrWebCode);
        // this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen + '&hiddensections=' + this.global.hiddenSections
        this.reloadPreference(resTiles)
      }
      else {
        this.Mstr_CustomizeHomeScreen = resTiles.Mstr_CustomizeHomeScreen.split('&uid')[0]
        this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{mstrServer}}", resTiles.mstrServer);
        this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{project}}", resTiles.project);
        this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{documentID}}", this.documentID);
        // this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen + '&hiddensections=' + this.global.hiddenSections
      }

      // console.log(this.Mstr_CustomizeHomeScreen);

    })
  }

  getsystemSettings() {
    return new Promise((resolve, reject) => {
      this.keyQuestionsService.getsystemSettings().subscribe((ssData: any) => {
        resolve(ssData);
      }, (error) => {
        reject(error)
      })
    })

  }
  getHomeDashboard() {
    return new Promise((resolve, reject) => {
      this.keyQuestionsService.getKeyQuestions().subscribe((data: any) => {
        resolve(data)
      }, (error) => {
        reject(error)
      });
    })
  }

  localRole: any;
  roleList() {
    return new Promise((resolve, reject) => {
      this.localRole = UserData.role
      this.loginService.getroles(this.localRole).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        });
    })
  }
  reloadReports() {
    setTimeout(() => {
      this.global.mstrPreference = 'preference'
      this.getSharedDashboard()
    }, 300)
  }
  reloadPreference(data) {
    setTimeout(() => {
      this.global.mstrPreference = 'alive'
      this.Mstr_CustomizeHomeScreen = data.Mstr_CustomizeHomeScreen.split('&uid')[0]
      this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{mstrServer}}", data.mstrServer);
      this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{project}}", data.project);
      this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{documentID}}", this.documentID);
      // this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen + '&hiddensections=' + this.global.hiddenSections
    }, 300)
  }
  // getSharedDashboard(){

  //   this.keyQuestions.getKeyQuestions().subscribe((data:any)=>{
  //     console.log('data',data)
  //     console.log('data.Mstr_CustomizeHomeScreen',data.Mstr_CustomizeHomeScreen)
  //     console.log(data.mstrServer);

  //     this.Mstr_CustomizeHomeScreen = data.Mstr_CustomizeHomeScreen.replace("{{mstrServer}}", data.mstrServer);
  //     console.log('data.Mstr_CustomizeHomeScreen 2',data.Mstr_CustomizeHomeScreen)
  //     this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{project}}", data.project);
  //     this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{uuid}}", this.uuid);
  //     this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{password}}", data.Password);
  //     this.Mstr_CustomizeHomeScreen = this.Mstr_CustomizeHomeScreen.replace("{{documentID}}", this.documentID);
  //     console.log('data.Mstr_CustomizeHomeScreen 3',data.Mstr_CustomizeHomeScreen)

  //   }, (error) => {
  //     // console.log('error', error.error);
  //     this.commonMethods.addToastforlongtime(false, error.error)
  //   });
  // }

}



