import { Component, OnInit } from '@angular/core';
import { KeyQuestionsService } from '../key-questions/key-questions.service';
import * as jwtDecode from 'jwt-decode';
import { utils } from '../../../../app/config';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  keySubscription: any = [];
  uuid: string;
  userToken: string;
  decodeToken: any;
  Subscription: Boolean = true;
  isMstrActive: boolean = true;
  mstrPreference = null;
  microstrategylogouturl: string = "";
  constructor(public keyQuestionsService: KeyQuestionsService, private commonMethods: CommonMethods,
    public global: GlobalComponent, private spinnerService: NgxSpinnerService) {
    this.userToken = this.commonMethods.decryptData(localStorage.getItem('userToken'));
    // this.userToken=utils.usertoken;
    this.decodeToken = JSON.parse(JSON.stringify(jwtDecode(this.userToken)));
    this.uuid = this.decodeToken['custom:customerId'];
    // this.mstrPreference = localStorage.getItem('mstrPreference');
    // console.log(this.mstrPreference)
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
      this.getSubscription();
    }, 300)
  }

  ngOnInit() {
  }
  getSubscription() {
    this.keyQuestionsService.getKeyQuestions().subscribe((data: any) => {
      // let decPassword = this.commonMethods.decryptMstrPwd(data.Password)
      // data.Password = decPassword.pwd;
      if (!this.mstrPreference) {
        this.keySubscription.Mstr_Subscription = data.Mstr_Subscription.replace("{{mstrServer}}", data.mstrServer);
        this.keySubscription.Mstr_Subscription = this.keySubscription.Mstr_Subscription.replace("{{project}}", data.project);
        // this.keySubscription.Mstr_Subscription = this.keySubscription.Mstr_Subscription.replace("{{uuid}}", this.uuid);
        // this.keySubscription.Mstr_Subscription = this.keySubscription.Mstr_Subscription.replace("{{password}}", data.Password);
        this.keySubscription.Mstr_Subscription = this.keySubscription.Mstr_Subscription.replace("{{locale}}", this.global.MstrWebCode);
        // this.keySubscription.Mstr_Subscription = this.keySubscription.Mstr_Subscription + '&hiddensections=' + this.global.hiddenSections;
        this.keySubscription.Mstr_Subscription = this.keySubscription.Mstr_Subscription + '&usrSmgr=' + localStorage.getItem('_mstrweb')
        this.reloadReports();
        this.Enablethereport();
      }
      else if (this.mstrPreference == 'preference') {
        this.keySubscription.Mstr_Subscription = data.Mstr_Preference.replace("{{locale}}", this.global.MstrWebCode);
        this.keySubscription.Mstr_Subscription = this.keySubscription.Mstr_Subscription.replace("{{project}}", data.project);
        this.keySubscription.Mstr_Subscription = this.keySubscription.Mstr_Subscription.replace("{{localeMD}}", this.global.MstrWebCode);
        // this.keySubscription.Mstr_Subscription = this.keySubscription.Mstr_Subscription + '&hiddensections=' + this.global.hiddenSections
        this.reloadPreference(data)
      }
      else {
        this.keySubscription.Mstr_Subscription = data.Mstr_Subscription.split('&uid')[0]
        this.keySubscription.Mstr_Subscription = this.keySubscription.Mstr_Subscription.replace("{{mstrServer}}", data.mstrServer);
        this.keySubscription.Mstr_Subscription = this.keySubscription.Mstr_Subscription.replace("{{project}}", data.project);
        // this.keySubscription.Mstr_Subscription = this.keySubscription.Mstr_Subscription + '&hiddensections=' + this.global.hiddenSections
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
      this.mstrPreference = 'preference';
      localStorage.setItem('mstrPreference', 'preference');
      // this.getSubscription();
    }, 300)
  }
  reloadPreference(data) {
    setTimeout(() => {
      this.mstrPreference = 'alive'
      this.keySubscription.Mstr_Subscription = data.Mstr_Subscription.split('&uid')[0]
      this.keySubscription.Mstr_Subscription = this.keySubscription.Mstr_Subscription.replace("{{mstrServer}}", data.mstrServer);
      this.keySubscription.Mstr_Subscription = this.keySubscription.Mstr_Subscription.replace("{{project}}", data.project);
      // this.keySubscription.Mstr_Subscription = this.keySubscription.Mstr_Subscription + '&hiddensections=' + this.global.hiddenSections;
      this.Enablethereport();
    }, 300)
  }

}