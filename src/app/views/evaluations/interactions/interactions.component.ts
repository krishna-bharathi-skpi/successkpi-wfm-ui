import { Component, OnInit } from '@angular/core';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
import utils from '../../../config';
import { GlobalComponent } from '../../../global/global.component';
import { CommonMethods } from '../../../common/common.components';

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.component.html',
  styleUrls: ['./interactions.component.css']
})
export class InteractionsComponent implements OnInit {

  constructor(private keyQuestionsService: KeyQuestionsService,public global: GlobalComponent,private commonMethods: CommonMethods) {
    this.commonMethods.dynamicBackgroundColorChange('default');
  }
  mstrIdToken: any;
  idToken: any;
  interactionRoom: string = null;

  ngOnInit(): void {
    this.getInteractions();
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

  getInteractions() {
    this.getMstrConfig().then((configId: any) => {
      this.validateMstrReportId(configId.project_id, configId.EvaluationInteractionId).then((validId: any) => {
        if(Object.keys(configId).length){
        // this.mstrIdToken = localStorage.getItem("mstrIdToken");
        // this.mstrIdToken = JSON.parse(this.mstrIdToken)
        // this.idToken = "?idToken=" + this.mstrIdToken['x-mstr-identitytoken'];
        // this.documentID = data.EvaluationInteractionId;
        // this.interactionRoom = environment.mstr_Url + data.project_id + "/" + this.documentID + this.idToken + '&ui.navigation=false';
        // console.log(data);
        // console.log(this.documentID);
        this.interactionRoom = configId.Mstr_Interaction;
        this.interactionRoom = this.interactionRoom.replace("{{documentID}}", configId.EvaluationInteractionId);
        // this.interactionRoom = this.interactionRoom + '&hiddensections=' + this.global.hiddenSections
        this.interactionRoom = this.interactionRoom + '&usrSmgr=' + localStorage.getItem('_mstrweb')
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
          if (data['isSuccess'].toLowerCase() == 'failed') {
            this.commonMethods.addToastforlongtime(false, 'There is an error in configuration. Please connect with support team to correct the configuration error');
          }
           resolve(data)
        },
        (error) => {
          console.log(error);
          if (error.error['isSuccess'].toLowerCase() == 'failed') {
            this.commonMethods.addToastforlongtime(false, 'There is an error in configuration. Please connect with support team to correct the configuration error');
          }
          reject(error);
        })
    })
  }

}
