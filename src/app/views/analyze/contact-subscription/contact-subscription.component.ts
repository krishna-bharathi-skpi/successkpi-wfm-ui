import { Component, OnInit } from '@angular/core';
import { KeyQuestionsService } from '../key-questions/key-questions.service';
import * as jwtDecode from 'jwt-decode';
import { utils } from '../../../../app/config';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact-subscription',
  templateUrl: './contact-subscription.component.html',
  styleUrls: ['./contact-subscription.component.css']
})
export class ContactSubscriptionComponent implements OnInit {
  contactSubscription: any = [];
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
      // console.log(data);
      
      // let decPassword = this.commonMethods.decryptMstrPwd(data.Password)
      // data.Password = decPassword.pwd;

      // if (!this.mstrPreference) {
      //   this.contactSubscription.Mstr_Contact_Subscription = data.Mstr_Contact_Subscription.replace("{{mstrServer}}", data.mstrServer);
      //   this.contactSubscription.Mstr_Contact_Subscription = this.contactSubscription.Mstr_Contact_Subscription.replace("{{project}}", data.project);
      //   this.contactSubscription.Mstr_Contact_Subscription = this.contactSubscription.Mstr_Contact_Subscription.replace("{{locale}}", this.global.MstrWebCode);
      //   this.contactSubscription.Mstr_Contact_Subscription = this.contactSubscription.Mstr_Contact_Subscription + '&hiddensections=' + this.global.hiddenSections;
      //   this.contactSubscription.Mstr_Contact_Subscription = this.contactSubscription.Mstr_Contact_Subscription + '&usrSmgr=' + localStorage.getItem('_mstrweb')
      //   this.reloadReports()
      // }
      // else if (this.mstrPreference == 'preference') {
      //   this.contactSubscription.Mstr_Contact_Subscription = data.Mstr_Preference.replace("{{locale}}", this.global.MstrWebCode);
      //   this.contactSubscription.Mstr_Contact_Subscription = data.Mstr_Contact_Subscription.replace("{{project}}", data.project);
      //   this.contactSubscription.Mstr_Contact_Subscription = this.contactSubscription.Mstr_Contact_Subscription.replace("{{localeMD}}", this.global.MstrWebCode);
      //   this.contactSubscription.Mstr_Contact_Subscription = this.contactSubscription.Mstr_Contact_Subscription  + '&hiddensections=' + this.global.hiddenSections
      //   this.reloadPreference(data)
      // }
      // else {
      //   this.contactSubscription.Mstr_Contact_Subscription = data.Mstr_Contact_Subscription.split('&uid')[0]
      //   this.contactSubscription.Mstr_Contact_Subscription = data.Mstr_Contact_Subscription.replace("{{mstrServer}}", data.mstrServer);
      //   this.contactSubscription.Mstr_Contact_Subscription = this.contactSubscription.Mstr_Contact_Subscription.replace("{{project}}", data.project);
      //   this.contactSubscription.Mstr_Contact_Subscription = this.contactSubscription.Mstr_Contact_Subscription + '&hiddensections=' + this.global.hiddenSections
      // }
      
      if (!this.mstrPreference) {
        this.sharedDashboard.Mstr_Contact_Subscription = data.Mstr_Contact_Subscription.replace("{{mstrServer}}", data.mstrServer);
        this.sharedDashboard.Mstr_Contact_Subscription = this.sharedDashboard.Mstr_Contact_Subscription.replace("{{project}}", data.project);
        this.sharedDashboard.Mstr_Contact_Subscription = this.sharedDashboard.Mstr_Contact_Subscription.replace("{{locale}}", this.global.MstrWebCode);
        // this.sharedDashboard.Mstr_Contact_Subscription = this.sharedDashboard.Mstr_Contact_Subscription + '&hiddensections=' + this.global.hiddenSections
        this.sharedDashboard.Mstr_Contact_Subscription = this.sharedDashboard.Mstr_Contact_Subscription + '&usrSmgr=' + localStorage.getItem('_mstrweb')

        this.reloadReports()
        this.Enablethereport();
      }
      else if (this.mstrPreference == 'preference') {
        this.sharedDashboard.Mstr_Contact_Subscription = data.Mstr_Preference.replace("{{locale}}", this.global.MstrWebCode);
        this.sharedDashboard.Mstr_Contact_Subscription = this.sharedDashboard.Mstr_Contact_Subscription.replace("{{project}}", data.project);
        this.sharedDashboard.Mstr_Contact_Subscription = this.sharedDashboard.Mstr_Contact_Subscription.replace("{{localeMD}}", this.global.MstrWebCode);
        // this.sharedDashboard.Mstr_Contact_Subscription = this.sharedDashboard.Mstr_Contact_Subscription + '&hiddensections=' + this.global.hiddenSections
        this.reloadPreference(data)
      }
      else {
        this.sharedDashboard.Mstr_Contact_Subscription = data.Mstr_Contact_Subscription.split('&uid')[0]
        this.sharedDashboard.Mstr_Contact_Subscription = this.sharedDashboard.Mstr_Contact_Subscription.replace("{{mstrServer}}", data.mstrServer);
        this.sharedDashboard.Mstr_Contact_Subscription = this.sharedDashboard.Mstr_Contact_Subscription.replace("{{project}}", data.project);
        // this.sharedDashboard.Mstr_Contact_Subscription = this.sharedDashboard.Mstr_Contact_Subscription + '&hiddensections=' + this.global.hiddenSections
      }
      // console.log(this.sharedDashboard.Mstr_Contact_Subscription);      

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
      this.sharedDashboard.Mstr_Contact_Subscription = data.Mstr_Contact_Subscription.split('&uid')[0]
      this.sharedDashboard.Mstr_Contact_Subscription = this.sharedDashboard.Mstr_Contact_Subscription.replace("{{mstrServer}}", data.mstrServer);
      this.sharedDashboard.Mstr_Contact_Subscription = this.sharedDashboard.Mstr_Contact_Subscription.replace("{{project}}", data.project);
      // this.sharedDashboard.Mstr_Contact_Subscription = this.sharedDashboard.Mstr_Contact_Subscription + '&hiddensections=' + this.global.hiddenSections;
      this.Enablethereport();
    }, 300)
  }

}
