import { Component, OnInit } from '@angular/core';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
import utils from '../../../config';
import { GlobalComponent } from '../../../global/global.component';
import { UserData } from '../../../../app/user';
import { CommonMethods } from '../../../common/common.components';
import { MstrTokenService } from '../../../services/mstrtoken.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-evaluation',
  templateUrl: './my-evaluation.component.html',
  styleUrls: ['./my-evaluation.component.css']
})
export class MyEvaluationComponent implements OnInit {

  constructor(private keyQuestionsService: KeyQuestionsService, public global: GlobalComponent, private commonMethods: CommonMethods,private mstrTokenService: MstrTokenService, private spinnerService: NgxSpinnerService) {
    this.commonMethods.dynamicBackgroundColorChange('default');
    
  }

  mstrIdToken: any;
  idToken: any;
  documentID: string = null;
  myEvaluation: string = null;

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
      this.validateMstrReportId(configId.project_id, configId.myevaluationreportID).then((validId: any) => {
        if(Object.keys(configId).length){
            let userName = UserData.userName;
            this.myEvaluation = configId.Mstr_MyEvaluation;
            this.myEvaluation = this.myEvaluation.replace("{{documentID}}", configId.myevaluationreportID);
            // this.myEvaluation = this.myEvaluation + '&hiddensections=' + this.global.hiddenSections
            this.myEvaluation = this.myEvaluation + '&usrSmgr=' + localStorage.getItem('_mstrweb')
            this.myEvaluation = this.myEvaluation + '&valuePromptAnswers=' + userName
            this.myEvaluation = this.myEvaluation + '&share=1'
            this.spinnerService.hide();
          }
        else{
          this.commonMethods.addToastforlongtime(false, 'No Reports Found');
          this.spinnerService.hide();
        }
      })
    })

  }

  validateMstrReportId(projectID, documentID) {
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
