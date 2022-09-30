import { Component, OnInit } from '@angular/core';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
import utils from '../../../config';
import { GlobalComponent } from '../../../global/global.component';
import { UserData } from '../../../../app/user';
import { CommonMethods } from '../../../common/common.components';
import { MstrTokenService } from '../../../services/mstrtoken.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-myteam-evaluation',
  templateUrl: './myteam-evaluation.component.html',
  styleUrls: ['./myteam-evaluation.component.css']
})
export class MyteamEvaluationComponent implements OnInit {

  constructor(private keyQuestionsService: KeyQuestionsService,public global: GlobalComponent,private commonMethods: CommonMethods,private mstrTokenService: MstrTokenService, private spinnerService: NgxSpinnerService) {
    this.commonMethods.dynamicBackgroundColorChange('default');
  }
  
  mstrIdToken: any;
  idToken: any;
  documentID: string = null;
  myteam: string = null;

  ngOnInit(): void {
    this.getTeamEvaluation();
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

  getTeamEvaluation(){
    this.getMstrConfig().then((configId: any) => {
      this.validateMstrReportId(configId.project_id, configId.myteamsEvaluationID).then((validId: any) => {
            if(Object.keys(configId).length){
                let userName = UserData.userName;
                this.myteam = configId.Mstr_MyTeamEvaluation;
                this.myteam = this.myteam.replace("{{documentID}}", configId.myteamsEvaluationID);
                // this.myteam = this.myteam + '&hiddensections=' + this.global.hiddenSections;
                this.myteam = this.myteam + '&usrSmgr=' + localStorage.getItem('_mstrweb');
                this.myteam = this.myteam + '&valuePromptAnswers=' + userName;
                this.myteam = this.myteam + '&share=1';
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
          if (data['isSuccess'].toLowerCase() == 'failed'  && data['result'].toLowerCase() != "the user's session has expired, please reauthenticate") {
            console.log("isIf")
            this.commonMethods.addToastforlongtime(false, 'There is an error in configuration. Please connect with support team to correct the configuration error');
          }
          else{
            if (data['isSuccess'].toLowerCase() == 'failed' && data['result'].toLowerCase() == "the user's session has expired, please reauthenticate") {
              console.log("iselse")
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
