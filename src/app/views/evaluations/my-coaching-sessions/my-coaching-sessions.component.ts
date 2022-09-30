import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { MstrTokenService } from '../../../services/mstrtoken.service';
import UserData from '../../../user';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';

@Component({
  selector: 'app-my-coaching-sessions',
  templateUrl: './my-coaching-sessions.component.html',
  styleUrls: ['./my-coaching-sessions.component.css']
})
export class MyCoachingSessionsComponent implements OnInit {

  constructor(private keyQuestionsService: KeyQuestionsService,public global: GlobalComponent,private commonMethods: CommonMethods,private mstrTokenService: MstrTokenService, private spinnerService: NgxSpinnerService) {
    this.commonMethods.dynamicBackgroundColorChange('default');
  }

  // mstrIdToken: any;
  // idToken: any;
  myCoach_sessions: string = null;

  ngOnInit(): void {
    this.getmyEvaluation();
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
  
  getmyEvaluation() {
    this.getMstrConfig().then((configId: any) => {
      this.validateMstrReportId(configId.project_id, configId.myCoachingSessionID).then((validId: any) => {
        if(Object.keys(configId).length){
            let userName = UserData.userName;
            this.myCoach_sessions = configId.Mstr_MyEvaluation;
            this.myCoach_sessions = this.myCoach_sessions.replace("{{documentID}}", configId.myCoachingSessionID);
            // this.myCoach_sessions = this.myCoach_sessions + '&hiddensections=' + this.global.hiddenSections
            this.myCoach_sessions = this.myCoach_sessions;
            this.myCoach_sessions = this.myCoach_sessions + '&usrSmgr=' + localStorage.getItem('_mstrweb')
            this.myCoach_sessions = this.myCoach_sessions + '&valuePromptAnswers=' + userName
            this.myCoach_sessions = this.myCoach_sessions + '&share=1'
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
