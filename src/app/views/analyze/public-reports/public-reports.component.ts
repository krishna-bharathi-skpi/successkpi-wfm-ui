import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { KeyQuestionsService } from '../key-questions/key-questions.service';

@Component({
  selector: 'app-public-reports',
  templateUrl: './public-reports.component.html',
  styleUrls: ['./public-reports.component.css']
})
export class PublicReportsComponent implements OnInit {

  publicReports: any = [];
  Subscription: Boolean = true;
  isMstrActive: boolean = true;
  mstrPreference = null;
  microstrategylogouturl: string = "";
  folderID:string = "";

  constructor(public keyQuestionsService: KeyQuestionsService, private commonMethods: CommonMethods,
    public global: GlobalComponent, private spinnerService: NgxSpinnerService) {
    this.mstrPreference = null;
    this.microstrategylogouturl = this.global.microstrategylogouturl;
    this.spinnerService.show();
    this.Subscription = true;
    // this.getUiLanguage();
    setTimeout(() => {
      this.isMstrActive = false;
      this.getCustomReports();
    }, 300)
    this.folderID =  localStorage.getItem('mstr_PR_FID');
  }

  ngOnInit() {

  }

  getCustomReports() {
    this.keyQuestionsService.getKeyQuestions().subscribe((data: any) => {
      if (!this.mstrPreference) {
        this.publicReports.Mstr_MyReports = data.Mstr_MyReports.replace("{{mstrServer}}", data.mstrServer);
        this.publicReports.Mstr_MyReports = this.publicReports.Mstr_MyReports.replace("{{project}}", data.project);
        this.publicReports.Mstr_MyReports = this.publicReports.Mstr_MyReports + '&folderID=' + this.folderID
        // this.publicReports.Mstr_MyReports = this.publicReports.Mstr_MyReports + '&hiddensections=' + this.global.hiddenSections
        this.publicReports.Mstr_MyReports = this.publicReports.Mstr_MyReports + '&usrSmgr=' + localStorage.getItem('_mstrweb')
        this.reloadReports();
        this.Enablethereport();
      }
      else if (this.mstrPreference == 'preference') {
        this.publicReports.Mstr_MyReports = data.Mstr_MyReports.replace("{{mstrServer}}", data.mstrServer);
        this.publicReports.Mstr_MyReports = this.publicReports.Mstr_MyReports.replace("{{project}}", data.project);
        this.publicReports.Mstr_MyReports = this.publicReports.Mstr_MyReports + '&folderID=' + this.folderID
        // this.publicReports.Mstr_MyReports = this.publicReports.Mstr_MyReports + '&hiddensections=' + this.global.hiddenSections
        this.reloadPreference(data)
      }
      else {
        this.publicReports.Mstr_MyReports = this.publicReports.Mstr_MyReports.replace("{{mstrServer}}", data.mstrServer);
        this.publicReports.Mstr_MyReports = this.publicReports.Mstr_MyReports.replace("{{project}}", data.project);
        // this.publicReports.Mstr_MyReports = this.publicReports.Mstr_MyReports + '&hiddensections=' + this.global.hiddenSections
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
      this.publicReports.Mstr_MyReports = this.publicReports.Mstr_MyReports.replace("{{mstrServer}}", data.mstrServer);
      this.publicReports.Mstr_MyReports = this.publicReports.Mstr_MyReports.replace("{{project}}", data.project);
      // this.publicReports.Mstr_MyReports = this.publicReports.Mstr_MyReports + '&hiddensections=' + this.global.hiddenSections;
      this.Enablethereport();
      if(this.folderID == "null" || this.folderID == "" || this.folderID == null){
          this.commonMethods.addToastforlongtime(false,"FolderID can't be null,Please contact administration")
      }
    }, 300)
  }

}
