import { Component, OnInit } from '@angular/core';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
import * as jwtDecode from 'jwt-decode';
import { utils } from '../../../../app/config';
import { CommonMethods } from '../../../common/common.components';
import { HeaderService } from '../../../containers/header/header.service';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({

  selector: 'app-shared-dashboard',
  templateUrl: './shared-dashboard.component.html',
  styleUrls: ['./shared-dashboard.component.css']

})
export class SharedDashboardComponent implements OnInit {
  // private keyQuestionsModel: KeyQuestionsModel;
  sharedDashboard: any = [];
  uuid: string;
  userToken: string;
  decodeToken: any;
  Subscription: Boolean = true;
  isMstrActive: boolean = true;
  mstrPreference = null;
  microstrategylogouturl: string = "";

  constructor(public keyQuestionsService: KeyQuestionsService, private commonMethods: CommonMethods,
    public headerService: HeaderService, public global: GlobalComponent, private spinnerService: NgxSpinnerService) {
    // this.keyQuestionsModel = new KeyQuestionsModel();
    this.userToken = this.commonMethods.decryptData(localStorage.getItem('userToken'));
    // this.userToken=utils.usertoken;
    this.decodeToken = JSON.parse(JSON.stringify(jwtDecode(this.userToken)));
    this.uuid = this.decodeToken['custom:customerId'];
    // this.mstrPreference = localStorage.getItem('mstrPreference');
    // if(this.mstrPreference==null)
    // {
    //   localStorage.setItem('mstrPreference',null);
    // }
    this.mstrPreference = null;
    this.spinnerService.show();
    this.Subscription = true;
    this.microstrategylogouturl = this.global.microstrategylogouturl;
    // this.getUiLanguage();
    setTimeout(() => {
      this.isMstrActive = false;
      this.getSharedDashboard();
    }, 300)

  }
  ngOnInit() {

    // this. getUiLanguage();
  }
  getSharedDashboard() {
    this.keyQuestionsService.getKeyQuestions().subscribe((data: any) => {
      // let decPassword = this.commonMethods.decryptMstrPwd(data.Password)
      // data.Password = decPassword.pwd;
      if (!this.mstrPreference) {
        this.sharedDashboard.Mstr_DashBoard = data.Mstr_DashBoard.replace("{{mstrServer}}", data.mstrServer);
        this.sharedDashboard.Mstr_DashBoard = this.sharedDashboard.Mstr_DashBoard.replace("{{project}}", data.project);
        // this.sharedDashboard.Mstr_DashBoard = this.sharedDashboard.Mstr_DashBoard.replace("{{uuid}}", this.uuid);
        // this.sharedDashboard.Mstr_DashBoard = this.sharedDashboard.Mstr_DashBoard.replace("{{password}}", data.Password);
        this.sharedDashboard.Mstr_DashBoard = this.sharedDashboard.Mstr_DashBoard.replace("{{locale}}", this.global.MstrWebCode);
        // this.sharedDashboard.Mstr_DashBoard = this.sharedDashboard.Mstr_DashBoard + '&hiddensections=' + this.global.hiddenSections
        this.sharedDashboard.Mstr_DashBoard = this.sharedDashboard.Mstr_DashBoard + '&usrSmgr=' + localStorage.getItem('_mstrweb')

        this.reloadReports();
        this.Enablethereport();
      }
      else if (this.mstrPreference == 'preference') {
        this.sharedDashboard.Mstr_DashBoard = data.Mstr_Preference.replace("{{locale}}", this.global.MstrWebCode);
        this.sharedDashboard.Mstr_DashBoard = this.sharedDashboard.Mstr_DashBoard.replace("{{project}}", data.project);
        this.sharedDashboard.Mstr_DashBoard = this.sharedDashboard.Mstr_DashBoard.replace("{{localeMD}}", this.global.MstrWebCode);
        // this.sharedDashboard.Mstr_DashBoard = this.sharedDashboard.Mstr_DashBoard + '&hiddensections=' + this.global.hiddenSections
        this.reloadPreference(data)
      }
      else {
        this.sharedDashboard.Mstr_DashBoard = data.Mstr_DashBoard.split('&uid')[0]
        this.sharedDashboard.Mstr_DashBoard = this.sharedDashboard.Mstr_DashBoard.replace("{{mstrServer}}", data.mstrServer);
        this.sharedDashboard.Mstr_DashBoard = this.sharedDashboard.Mstr_DashBoard.replace("{{project}}", data.project);
        // this.sharedDashboard.Mstr_DashBoard = this.sharedDashboard.Mstr_DashBoard + '&hiddensections=' + this.global.hiddenSections
      }
    }, (error) => {
      // console.log('error', error.error);
      console.log("Error in micro")
      this.commonMethods.addToastforlongtime(false, error.error)
      this.Subscription = false;
      this.spinnerService.hide();

    });
  }
  myLoadEvent(e) {

  }
  Enablethereport() {
    setTimeout(() => {
      this.spinnerService.hide();
      this.Subscription = false;
    }, 1000)
  }
  reloadReports() {
    setTimeout(() => {
      this.mstrPreference = 'preference'
      // this.getSharedDashboard()
    }, 300)
  }
  reloadPreference(data) {
    setTimeout(() => {

      this.mstrPreference = 'alive'
      this.sharedDashboard.Mstr_DashBoard = data.Mstr_DashBoard.split('&uid')[0]
      this.sharedDashboard.Mstr_DashBoard = this.sharedDashboard.Mstr_DashBoard.replace("{{mstrServer}}", data.mstrServer);
      this.sharedDashboard.Mstr_DashBoard = this.sharedDashboard.Mstr_DashBoard.replace("{{project}}", data.project);
      // this.sharedDashboard.Mstr_DashBoard = this.sharedDashboard.Mstr_DashBoard + '&hiddensections=' + this.global.hiddenSections;
      this.Enablethereport();
    }, 300)
  }

  // getUiLanguage(){
  //   this.headerService.getuiDropdwn().subscribe(
  //     (data:any)=>{
  //       // console.log(data[0].mstrWebCode);
  //       if(data.length != 0){
  //         this.global.MstrWebCode=[]
  //         data.forEach(element => {
  //           let val={language:element.value,mstrWebCode:element.mstrWebCode}
  //           this.global.MstrWebCode.push(val);
  //         });
  //         console.log(this.global.MstrWebCode); 
  //       }
  //       else{
  //         this.global.MstrWebCode=data[0].MstrWebCode;
  //       }
  //     }
  //   )
  // }

}