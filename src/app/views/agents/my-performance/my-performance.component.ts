import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { MstrTokenService } from '../../../services/mstrtoken.service';
import UserData from '../../../user';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';

@Component({
  selector: 'app-my-performance',
  templateUrl: './my-performance.component.html',
  styleUrls: ['./my-performance.component.css']
})
export class MyPerformanceComponent implements OnInit {

  constructor(private keyQuestionsService: KeyQuestionsService,public global: GlobalComponent,private commonMethods: CommonMethods,private mstrTokenService: MstrTokenService,private spinnerService: NgxSpinnerService) {
    this.commonMethods.dynamicBackgroundColorChange('default');
   }

  documentID: string = null;
  myPerformance: string = null;

  ngOnInit(): void {
    this.getmyPerformance();
  }

  getMstrConfig() {
    return new Promise((resolve, reject) => {
      this.keyQuestionsService.getMstrConfig().subscribe(
        (data: any) => {
          resolve(data)
        },
        (error) => {
          console.log(error);
          reject(error)
          this.commonMethods.addToastforlongtime(false, error.error)
        })
    })
  }

  getmyPerformance() {
    this.getMstrConfig().then((configId: any) => {
      this.validateMstrReportId(configId.project_id, configId.agent_MyPerformanceId).then((validId: any) => {
        if(Object.keys(configId).length){
         let userName = UserData.userName;
         this.myPerformance = configId.Mstr_MyEvaluation;
                this.myPerformance = this.myPerformance.replace("{{documentID}}", configId.agent_MyPerformanceId);
                // this.myPerformance = this.myPerformance + '&hiddensections=' + this.global.hiddenSections
                this.myPerformance = this.myPerformance + '&usrSmgr=' + localStorage.getItem('_mstrweb')
                this.myPerformance = this.myPerformance + '&valuePromptAnswers=' + userName
                this.myPerformance = this.myPerformance + '&share=1'
          }
          else{
            this.commonMethods.addToastforlongtime(false, 'No Reports Found');
          }
      })
    })
  }

  validateMstrReportId(projectID,documentID) {
    let params = {
      dossierId: documentID,
      reportType: "55",
      AuthToken: JSON.parse(localStorage.getItem('mstrAuthToken')),
      projectId: projectID
    }
    return new Promise((resolve, reject) => {
       this.keyQuestionsService.validateMstrReportId(params).subscribe(
         (data: any) => {
           if (data['isSuccess'].toLowerCase() == 'failed'  && data.result.toLowerCase() != "the user's session has expired, please reauthenticate") {
             this.commonMethods.addToastforlongtime(false, 'There is an error in configuration. Please connect with support team to correct the configuration error');
           }
           else{
             if (data['isSuccess'].toLowerCase() == 'failed' && data.result.toLowerCase() == "the user's session has expired, please reauthenticate") {
                 this.mstrTokenService.refreshMSTRSession();
             }
           }
            resolve(data)
         },
         (error) => {
           console.log(error);
           if (error.error['isSuccess'].toLowerCase() == 'failed'  && error.error['result'].toLowerCase() != "the user's session has expired, please reauthenticate") {
            this.commonMethods.addToastforlongtime(false, 'There is an error in configuration. Please connect with support team to correct the configuration error');
          }
          else{
            if (error.error['isSuccess'].toLowerCase() == 'failed' && error.error['result'].toLowerCase() == "the user's session has expired, please reauthenticate") {
              this.mstrTokenService.refreshMSTRSession();
            }
          }
           reject(error);
           this.spinnerService.hide();
         })
     })
  }

}
