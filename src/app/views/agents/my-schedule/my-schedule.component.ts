import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
import { UserData } from '../../../user';
import { MstrTokenService } from '../../../services/mstrtoken.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.css']
})
export class MyScheduleComponent implements OnInit {

  constructor(private keyQuestionsService: KeyQuestionsService,public global: GlobalComponent,private commonMethods: CommonMethods,private mstrTokenService: MstrTokenService,private spinnerService: NgxSpinnerService) { }

  mySchedule: string = null;
  
  ngOnInit(): void {
    this.getMySchedule();
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

  getMySchedule(){
    this.getMstrConfig().then((configId: any) => {
      this.validateMstrReportId(configId.project_id, configId.agent_MyScheduleId).then((validId: any) => {
        if(Object.keys(configId).length){
         const userName = UserData.userName;
         this.mySchedule = configId.Mstr_MyEvaluation;
              this.mySchedule = this.mySchedule.replace("{{documentID}}", configId.agent_MyScheduleId);
              // this.mySchedule = this.mySchedule + '&hiddensections=' + this.global.hiddenSections;
              this.mySchedule = this.mySchedule + '&usrSmgr=' + localStorage.getItem('_mstrweb');
              this.mySchedule = this.mySchedule + '&valuePromptAnswers=' + userName;
              this.mySchedule = this.mySchedule + '&share=1'
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
