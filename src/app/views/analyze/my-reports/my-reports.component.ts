import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { KeyQuestionsService } from '../key-questions/key-questions.service';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.css']
})
export class MyReportsComponent implements OnInit {
  myReports: any = []
  Subscription: Boolean = true;
  isMstrActive: boolean = true;
  mstrPreference = null;
  microstrategylogouturl: string = "";
  constructor(private keyQuestionsService: KeyQuestionsService,public global: GlobalComponent,
     private spinnerService: NgxSpinnerService,private commonMethods: CommonMethods) {

    this.mstrPreference = null;
    this.spinnerService.show();
    this.Subscription = true;
    this.microstrategylogouturl = this.global.microstrategylogouturl;
    // this.getUiLanguage();
    setTimeout(() => {
      this.isMstrActive = false;
      this.getmyReports();
    }, 300)
   }

  ngOnInit(): void {
    // this.getmyReports()
  }

  getmyReports(){
    this.keyQuestionsService.getMstrConfig().subscribe(
     (data:any)=>{
          // console.log(data)
          if (!this.mstrPreference) {
            // this.myReports['Mstr_new_my-reports'] = data['Mstr_new_my-reports'].replace("{{mstrServer}}", data.mstrServer);
            // this.myReports['Mstr_new_my-reports'] = this.myReports['Mstr_new_my-reports'].replace("{{project}}", data.project);
            // this.myReports['Mstr_new_my-reports'] = this.myReports['Mstr_new_my-reports'].replace("{{locale}}", this.global.MstrWebCode);
            // this.myReports['Mstr_new_my-reports'] = data['Mstr_new_my-reports'] + '&hiddensections=' + this.global.hiddenSections
            this.myReports['Mstr_new_my-reports'] = data['Mstr_new_my-reports'] + '&usrSmgr=' + localStorage.getItem('_mstrweb')
    
            this.reloadReports()
            this.Enablethereport();
          }
          else if (this.mstrPreference == 'preference') {
            // this.myReports['Mstr_new_my-reports'] = data.Mstr_Preference.replace("{{locale}}", this.global.MstrWebCode);
            // this.myReports['Mstr_new_my-reports'] = this.myReports['Mstr_new_my-reports'].replace("{{project}}", data.project);
            // this.myReports['Mstr_new_my-reports'] = this.myReports['Mstr_new_my-reports'].replace("{{localeMD}}", this.global.MstrWebCode);
            // this.myReports['Mstr_new_my-reports'] = data['Mstr_new_my-reports'] + '&hiddensections=' + this.global.hiddenSections
            this.reloadPreference(data)
          }
          else {
            // this.myReports['Mstr_new_my-reports'] = data['Mstr_new_my-reports'].split('&uid')[0]
            // this.myReports['Mstr_new_my-reports'] = this.myReports['Mstr_new_my-reports'].replace("{{mstrServer}}", data.mstrServer);
            // this.myReports['Mstr_new_my-reports'] = this.myReports['Mstr_new_my-reports'].replace("{{project}}", data.project);
            // this.myReports['Mstr_new_my-reports'] = data['Mstr_new_my-reports'] + '&hiddensections=' + this.global.hiddenSections
    
          }
     },
     (error) => {
      // console.log('error', error.error);
      console.log("Error in mstr")
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
      // this.getmyReports()
    }, 300)
  }
  reloadPreference(data) {
    setTimeout(() => {

      this.mstrPreference = 'alive'
      this.myReports['Mstr_new_my-reports'] = data['Mstr_new_my-reports'].split('&uid')[0]
      this.myReports['Mstr_new_my-reports'] = this.myReports['Mstr_new_my-reports'].replace("{{mstrServer}}", data.mstrServer);
      this.myReports['Mstr_new_my-reports'] = this.myReports['Mstr_new_my-reports'].replace("{{project}}", data.project);
      // this.myReports['Mstr_new_my-reports'] = this.myReports['Mstr_new_my-reports'] + '&hiddensections=' + this.global.hiddenSections;
      this.Enablethereport();
    }, 300)
  }
  
}
