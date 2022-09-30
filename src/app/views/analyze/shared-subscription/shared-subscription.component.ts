import { Component, OnInit } from '@angular/core';
import { KeyQuestionsService } from '../key-questions/key-questions.service';
import * as jwtDecode from 'jwt-decode';
import { utils } from '../../../../app/config';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-shared-subscription',
  templateUrl: './shared-subscription.component.html',
  styleUrls: ['./shared-subscription.component.css']
})
export class SharedSubscriptionComponent implements OnInit {
  // sharedSubscription: any = [];
  sharedDashboard: any = [];
  Subscription: Boolean = true; 
  isMstrActive: boolean = true;
  mstrPreference = null;
  microstrategylogouturl: string = "";

  constructor(public keyQuestionsService: KeyQuestionsService, private commonMethods: CommonMethods,
    public global: GlobalComponent, private spinnerService: NgxSpinnerService) {
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

  ngOnInit(): void {

  }
  
  getSubscription() {
    this.keyQuestionsService.getMstrConfig().subscribe((data: any) => {
      // let decPassword = this.commonMethods.decryptMstrPwd(data.Password)
      // data.Password = decPassword.pwd;

      // if (!this.mstrPreference) {
      //   this.sharedSubscription['Mstr_Shared_Subscriptions'] = data['Mstr_Shared_Subscriptions'].replace("{{mstrServer}}", data.mstrServer);
      //   this.sharedSubscription['Mstr_Shared_Subscriptions'] = this.sharedSubscription['Mstr_Shared_Subscriptions'].replace("{{project}}", data.project);
      //   this.sharedSubscription['Mstr_Shared_Subscriptions'] = this.sharedSubscription['Mstr_Shared_Subscriptions'].replace("{{locale}}", this.global.MstrWebCode);
      //   this.sharedSubscription['Mstr_Shared_Subscriptions'] = this.sharedSubscription['Mstr_Shared_Subscriptions'] + '&hiddensections=' + this.global.hiddenSections;
      //   this.sharedSubscription['Mstr_Shared_Subscriptions'] = this.sharedSubscription['Mstr_Shared_Subscriptions'] + '&usrSmgr=' + localStorage.getItem('_mstrweb')
      //   this.reloadReports()
      // }
      // else if (this.mstrPreference == 'preference') {
      //   this.sharedSubscription['Mstr_Shared_Subscriptions'] = data.Mstr_Preference.replace("{{locale}}", this.global.MstrWebCode);
      //   this.sharedSubscription['Mstr_Shared_Subscriptions'] = data['Mstr_Shared_Subscriptions'].replace("{{project}}", data.project);
      //   this.sharedSubscription['Mstr_Shared_Subscriptions'] = this.sharedSubscription['Mstr_Shared_Subscriptions'].replace("{{localeMD}}", this.global.MstrWebCode);
      //   this.sharedSubscription['Mstr_Shared_Subscriptions'] = this.sharedSubscription['Mstr_Shared_Subscriptions']  + '&hiddensections=' + this.global.hiddenSections
      //   this.reloadPreference(data)
      // }
      // else {
      //   this.sharedSubscription['Mstr_Shared_Subscriptions'] = data['Mstr_Shared_Subscriptions'].split('&uid')[0]
      //   this.sharedSubscription['Mstr_Shared_Subscriptions'] = data['Mstr_Shared_Subscriptions'].replace("{{mstrServer}}", data.mstrServer);
      //   this.sharedSubscription['Mstr_Shared_Subscriptions'] = this.sharedSubscription['Mstr_Shared_Subscriptions'].replace("{{project}}", data.project);
      //   this.sharedSubscription['Mstr_Shared_Subscriptions'] = this.sharedSubscription['Mstr_Shared_Subscriptions'] + '&hiddensections=' + this.global.hiddenSections
      // }

      
      if (!this.mstrPreference) {
        this.sharedDashboard.Mstr_Shared_Subscriptions = data.Mstr_Shared_Subscriptions.replace("{{mstrServer}}", data.mstrServer);
        this.sharedDashboard.Mstr_Shared_Subscriptions = this.sharedDashboard.Mstr_Shared_Subscriptions.replace("{{project}}", data.project);
        // this.sharedDashboard.Mstr_Shared_Subscriptions = this.sharedDashboard.Mstr_Shared_Subscriptions.replace("{{locale}}", this.global.MstrWebCode);
        // this.sharedDashboard.Mstr_Shared_Subscriptions = this.sharedDashboard.Mstr_Shared_Subscriptions + '&hiddensections=' + this.global.hiddenSections
        this.sharedDashboard.Mstr_Shared_Subscriptions = this.sharedDashboard.Mstr_Shared_Subscriptions + '&usrSmgr=' + localStorage.getItem('_mstrweb')

        this.reloadReports()
        this.Enablethereport();
      }
      else if (this.mstrPreference == 'preference') {
        this.sharedDashboard.Mstr_Shared_Subscriptions = data.Mstr_Shared_Subscriptions.replace("{{mstrServer}}", data.mstrServer);
        // this.sharedDashboard.Mstr_Shared_Subscriptions = data.Mstr_Preference.replace("{{locale}}", this.global.MstrWebCode);
        this.sharedDashboard.Mstr_Shared_Subscriptions = this.sharedDashboard.Mstr_Shared_Subscriptions.replace("{{project}}", data.project);
        // this.sharedDashboard.Mstr_Shared_Subscriptions = this.sharedDashboard.Mstr_Shared_Subscriptions.replace("{{localeMD}}", this.global.MstrWebCode);
        // this.sharedDashboard.Mstr_Shared_Subscriptions = this.sharedDashboard.Mstr_Shared_Subscriptions + '&hiddensections=' + this.global.hiddenSections
        this.reloadPreference(data)
      }
      else {
        // this.sharedDashboard.Mstr_Shared_Subscriptions = data.Mstr_Shared_Subscriptions.split('&uid')[0]
        this.sharedDashboard.Mstr_Shared_Subscriptions = this.sharedDashboard.Mstr_Shared_Subscriptions.replace("{{mstrServer}}", data.mstrServer);
        this.sharedDashboard.Mstr_Shared_Subscriptions = this.sharedDashboard.Mstr_Shared_Subscriptions.replace("{{project}}", data.project);
        // this.sharedDashboard.Mstr_Shared_Subscriptions = this.sharedDashboard.Mstr_Shared_Subscriptions + '&hiddensections=' + this.global.hiddenSections

      }

    }, (error) => {
      // console.log('error', error.error);
      this.commonMethods.addToastforlongtime(false, error.error)
      this.Subscription = false;
      setTimeout(() => {
        this.spinnerService.hide();
      }, 700);
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
      this.sharedDashboard.Mstr_Shared_Subscriptions = data.Mstr_Shared_Subscriptions.split('&uid')[0]
      this.sharedDashboard.Mstr_Shared_Subscriptions = this.sharedDashboard.Mstr_Shared_Subscriptions.replace("{{mstrServer}}", data.mstrServer);
      this.sharedDashboard.Mstr_Shared_Subscriptions = this.sharedDashboard.Mstr_Shared_Subscriptions.replace("{{project}}", data.project);
      // this.sharedDashboard.Mstr_Shared_Subscriptions = this.sharedDashboard.Mstr_Shared_Subscriptions + '&hiddensections=' + this.global.hiddenSections;
      this.Enablethereport();
    }, 300)
  }

}
