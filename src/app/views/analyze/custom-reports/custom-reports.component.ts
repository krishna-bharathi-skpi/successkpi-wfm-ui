import { Component, OnInit } from '@angular/core';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
import * as jwtDecode from 'jwt-decode';
import { utils } from '../../../../app/config';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-custom-reports',
  templateUrl: './custom-reports.component.html',
  styleUrls: ['./custom-reports.component.css']
})
export class CustomReportsComponent implements OnInit {
  customReports: any = [];
  uuid: string;
  userToken: string;
  decodeToken: any;
  Subscription: Boolean = true;
  isMstrActive: boolean = true;
  mstrPreference = null;
  microstrategylogouturl: string = "";
  folderID:string = "";
  constructor(public keyQuestionsService: KeyQuestionsService, private commonMethods: CommonMethods,
    public global: GlobalComponent, private spinnerService: NgxSpinnerService) {
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
    this.microstrategylogouturl = this.global.microstrategylogouturl;
    this.spinnerService.show();
    this.Subscription = true;
    // this.getUiLanguage();
    setTimeout(() => {
      this.isMstrActive = false;
      this.getCustomReports();
    }, 300)

    this.folderID =  localStorage.getItem('mstr_SR_FID');
  }

  ngOnInit() {

  }
  getCustomReports() {
    this.keyQuestionsService.getKeyQuestions().subscribe((data: any) => {
      // this.customReports=data
      // let decPassword = this.commonMethods.decryptMstrPwd(data.Password)
      // data.Password = decPassword.pwd;
      
      if (!this.mstrPreference) {
        this.customReports.Mstr_MyReports = data.Mstr_MyReports.replace("{{mstrServer}}", data.mstrServer);
        this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports.replace("{{project}}", data.project);
        // this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports.replace("{{uuid}}", this.uuid);
        // this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports.replace("{{password}}", data.Password);
        // this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports.replace("{{locale}}", this.global.MstrWebCode);
        this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports + '&folderID=' + this.folderID
        // this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports + '&hiddensections=' + this.global.hiddenSections
        this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports + '&usrSmgr=' + localStorage.getItem('_mstrweb')
        this.reloadReports();
        this.Enablethereport();
      }
      else if (this.mstrPreference == 'preference') {
        // this.customReports.Mstr_MyReports = data.Mstr_Preference.replace("{{locale}}", this.global.MstrWebCode);
        this.customReports.Mstr_MyReports = data.Mstr_MyReports.replace("{{mstrServer}}", data.mstrServer);
        this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports.replace("{{project}}", data.project);
        // this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports.replace("{{localeMD}}", this.global.MstrWebCode);
        this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports + '&folderID=' + this.folderID
        // this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports + '&hiddensections=' + this.global.hiddenSections
        this.reloadPreference(data)
      }
      else {
        // this.customReports.Mstr_MyReports = data.Mstr_MyReports.split('&uid')[0]
        this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports.replace("{{mstrServer}}", data.mstrServer);
        this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports.replace("{{project}}", data.project);
        // this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports + '&hiddensections=' + this.global.hiddenSections
        this.Enablethereport();
      }
     

    }, (error) => {
      // console.log('error', error.error);
      this.commonMethods.addToastforlongtime(false, error.error)
      this.Subscription = false;
      this.spinnerService.hide();
    });
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
      // this.getCustomReports()
    }, 300)
  }
  reloadPreference(data) {
    setTimeout(() => {
      this.mstrPreference = 'alive'
      // this.customReports.Mstr_MyReports = data.Mstr_MyReports.split('&uid')[0]
      this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports.replace("{{mstrServer}}", data.mstrServer);
      this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports.replace("{{project}}", data.project);
      // this.customReports.Mstr_MyReports = this.customReports.Mstr_MyReports + '&hiddensections=' + this.global.hiddenSections;
      this.Enablethereport();
      if(this.folderID == "null" || this.folderID == "" || this.folderID == null){
          this.commonMethods.addToastforlongtime(false,"FolderID can't be null,Please contact administration")
      }
    }, 300)
  }
}