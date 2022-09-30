import { Component, OnInit } from '@angular/core';
import { KeyQuestionsService } from './key-questions.service';
import { KeyQuestionsModel } from './key-questions.model';
import { CommonMethods } from '../../../common/common.components';
import { utils } from "../../../config";
import { Router } from '@angular/router';
import { GlobalComponent } from '../../../global/global.component';
import { UserData } from '../../../../app/user';
import { LoginService } from '../../login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { MstrTokenService } from '../../../services/mstrtoken.service';

@Component({
  selector: 'app-key-questions',
  templateUrl: './key-questions.component.html',
  styleUrls: ['./key-questions.component.css']
})
export class KeyQuestionsComponent implements OnInit {
  ListorEdit: string = "list"
  allcards: any = {}
  clearObject: object = {};
  mstrIdToken: any;
  idToken: any;
  public CustomerSpeaking: string = null
  public TopicsTrending: string = null
  public TrendingPhrases: string = null
  public CallToActionPlaybook: string = null
  public Interactions: string = null
  public CustomersFeel: string = null
  public PeopleTalkingAbout: string = null
  public Queue: string = "";
  public IVRContainment: string = "";
  public AgentScoring: string = "";
  public AgentDashboard: string = null;
  public AddtoEvaluationRoom: string = null;

  public IsCustomerSpeaking: boolean = false;
  public IsTopicsTrending: boolean = false;
  public IsTrendingPhrases: boolean = false;
  public IsCallToActionPlaybook: boolean = false;
  public IsInteractions: boolean = false;
  public IsCustomersFeel: boolean = false;
  public IsPeopleTalkingAbout: boolean = false;
  public IsQueue: boolean = false;
  public IsIVRContainment: boolean = false;
  public IsAgentScoring: boolean = false;
  public IsAgentDashboard: boolean = false;
  public IsAddtoEvaluationRoom: boolean = false;

  public IsActive: boolean = true;
  isEditor: boolean = true;
  // public IsDashboard:boolean = false;
  // public IsReport:boolean = false;
  // public IsSubscription:boolean= false;

  public keyQuestionsModel: KeyQuestionsModel;
  localRole: any;
  constructor(public keyQuestionsService: KeyQuestionsService, private commonMethods: CommonMethods,
    private router: Router, public global: GlobalComponent, public loginService: LoginService, private spinnerService: NgxSpinnerService,private mstrTokenService: MstrTokenService,) {
    this.keyQuestionsModel = new KeyQuestionsModel();
    this.localRole = UserData.role
    this.commonMethods.dynamicBackgroundColorChange('default');
    this.roleList();
  }

  ngOnInit(): void {
    // this.getKeyQuestions();
    this.IsActive = true;
    // this.getKeyQuestions();


  }

  projectID: any = null;
  mstrWebURL:any;
  getKeyQuestions() {
    this.spinnerService.show();
    this.keyQuestionsService.getKeyQuestions().subscribe((data: any) => {
      this.spinnerService.hide();
      if (this.keyQuestionsRole.roleId.toLowerCase() != 'admin') {
        this.keyQuestionsModel = this.keyQuestionsRole.keyQuestions;
      } else {
        this.keyQuestionsModel = data;
      }
      // this.mstrIdToken = localStorage.getItem("mstrIdToken")
      // this.mstrIdToken = JSON.parse(this.mstrIdToken)

      // this.idToken = "?idToken=" + this.mstrIdToken['x-mstr-identitytoken']
      this.projectID = data.project_id;
      this.mstrWebURL = this.URL;
      // this.mstrWebURL = this.mstrWebURL + '&hiddensections=' + this.global.hiddenSections
      this.mstrWebURL = this.mstrWebURL + '&usrSmgr=' + localStorage.getItem('_mstrweb')
      this.mstrWebURL = this.mstrWebURL + '&share=1'
      this.mstrWebURL = this.mstrWebURL + '&keyQ=1'
      
      this.CustomerSpeaking = this.mstrWebURL.replace("{{documentID}}", this.keyQuestionsModel.CustomerSpeaking.documentID);
      this.TopicsTrending = this.mstrWebURL.replace("{{documentID}}", this.keyQuestionsModel.TopicsTrending.documentID);
      this.TrendingPhrases = this.mstrWebURL.replace("{{documentID}}", this.keyQuestionsModel.TrendingPhrases.documentID);
      this.CallToActionPlaybook = this.mstrWebURL.replace("{{documentID}}", this.keyQuestionsModel.CallToActionPlaybook.documentID);
      this.Interactions = this.mstrWebURL.replace("{{documentID}}", this.keyQuestionsModel.Interactions.documentID);
      this.CustomersFeel = this.mstrWebURL.replace("{{documentID}}", this.keyQuestionsModel.CustomersFeel.documentID);
      this.PeopleTalkingAbout = this.mstrWebURL.replace("{{documentID}}", this.keyQuestionsModel.PeopleTalkingAbout.documentID);
      this.Queue = this.mstrWebURL.replace("{{documentID}}", this.keyQuestionsModel.Queue.documentID);
      this.IVRContainment = this.mstrWebURL.replace("{{documentID}}", this.keyQuestionsModel.IVRContainment.documentID);
      this.AgentScoring = this.mstrWebURL.replace("{{documentID}}", this.keyQuestionsModel.AgentScoring.documentID);
      this.AddtoEvaluationRoom = this.mstrWebURL.replace("{{documentID}}", this.keyQuestionsModel.AddtoEvaluationRoom.documentID);
      this.AgentDashboard = this.mstrWebURL.replace("{{documentID}}", this.keyQuestionsModel.AgentDashboard.documentID);

      // this.CustomerSpeaking = environment.mstr_Url + data.project_id + "/" + this.keyQuestionsModel.CustomerSpeaking.documentID + this.idToken + '&ui.navigation=false';
      // this.TopicsTrending = environment.mstr_Url + data.project_id + "/" + this.keyQuestionsModel.TopicsTrending.documentID + this.idToken + '&ui.navigation=false';
      // this.TrendingPhrases = environment.mstr_Url + data.project_id + "/" + this.keyQuestionsModel.TrendingPhrases.documentID + this.idToken + '&ui.navigation=false';
      // this.CallToActionPlaybook = environment.mstr_Url + data.project_id + "/" + this.keyQuestionsModel.CallToActionPlaybook.documentID + this.idToken + '&ui.navigation=false';
      // this.Interactions = environment.mstr_Url + data.project_id + "/" + this.keyQuestionsModel.Interactions.documentID + this.idToken + '&ui.navigation=false';
      // this.CustomersFeel = environment.mstr_Url + data.project_id + "/" + this.keyQuestionsModel.CustomersFeel.documentID + this.idToken + '&ui.navigation=false';
      // this.PeopleTalkingAbout = environment.mstr_Url + data.project_id + "/" + this.keyQuestionsModel.PeopleTalkingAbout.documentID + this.idToken + '&ui.navigation=false';
      // this.Queue = environment.mstr_Url + data.project_id + "/" + this.keyQuestionsModel.Queue.documentID + this.idToken + '&ui.navigation=false';
      // this.IVRContainment = environment.mstr_Url + data.project_id + "/" + this.keyQuestionsModel.IVRContainment.documentID + this.idToken + '&ui.navigation=false';
      // this.AgentScoring = environment.mstr_Url + data.project_id + "/" + this.keyQuestionsModel.AgentScoring.documentID + this.idToken + '&ui.navigation=false';
      // this.AddtoEvaluationRoom = environment.mstr_Url + data.project_id + "/" + this.keyQuestionsModel.AddtoEvaluationRoom.documentID + this.idToken + '&ui.navigation=false';
      // this.AgentDashboard = environment.mstr_Url + data.project_id + "/" + this.keyQuestionsModel.AgentDashboard.documentID + this.idToken + '&ui.navigation=false';


    }, (error) => {
      console.log('error', error);
      this.spinnerService.hide();
      this.commonMethods.addToastforlongtime(false, error.error)
    });
  }
  saveKeyQuestions() {
    if (this.keyQuestionsRole.roleId.toLowerCase() == 'admin') {
      this.spinnerService.show();
      this.keyQuestionsService.saveKeyQuestions(this.keyQuestionsModel).subscribe((data: any) => {
        this.commonMethods.addToastforlongtime(true, 'Key questions saved');
        this.getKeyQuestions();
        this.spinnerService.hide();
      }, (error) => {
        console.log('error', error);
        this.commonMethods.addToastforlongtime(false, error.error)
        this.spinnerService.hide();
        this.keyQuestionsModel = JSON.parse(JSON.stringify(this.clearObject))
      });
    }
    else {
      this.spinnerService.show();
      this.keyQuestionsService.updateKeyQuesRole(this.localRole, this.keyQuestionsModel).subscribe(
        (data: any) => {
          this.commonMethods.addToastforlongtime(true, 'Key questions updated');
          this.getKeyQuestions();
          this.spinnerService.hide();
        }, (error) => {
          console.log('error', error);
          this.commonMethods.addToastforlongtime(false, error.error)
          this.spinnerService.hide();
          this.keyQuestionsModel = JSON.parse(JSON.stringify(this.clearObject))
        });
    }

  }
  editCard(object) {
    this.clearObject = JSON.parse(JSON.stringify(this.keyQuestionsModel))
    this.allcards = object;
    this.isEditor = false;
  }

  cancel() {
    this.keyQuestionsModel = JSON.parse(JSON.stringify(this.clearObject))
  }


  keyQuestionsRole: any;
  roleList() {
    this.localRole = UserData.role
    this.spinnerService.show();
    this.loginService.getroles(this.localRole).subscribe(
      (data: any) => {
        if (typeof (data) == 'string') {
          this.keyQuestionsRole = JSON.parse(data);
        }
        else {
          this.keyQuestionsRole = data
        }
        // this.getKeyQuestions();
        this.getMstrConfig();
        this.spinnerService.show();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      });
  }



  public ShowIframe(ActiveLink,docID) {
    if (this.ListorEdit == "list") {
      //  console.log(docID)
      if(docID == null || docID == ""){
        this.commonMethods.addToastforlongtime(false,"Report handle is not configured for this Key Question")
      }
      else{
        if(docID != null && docID != ""){
          this.validateMstrReportId(docID).then((validIdRes: any) => {
            if (validIdRes['isSuccess'].toLowerCase() == 'success') {
                switch (ActiveLink) {
                  case "IsCustomerSpeaking":
                    this.keyQuestionsModel = new KeyQuestionsModel();
                    this.IsActive = false;
                    this.IsCustomerSpeaking = true;
                    break;
                  case "IsTopicsTrending":
                    this.keyQuestionsModel = new KeyQuestionsModel();
                    this.IsActive = false;
                    this.IsTopicsTrending = true;
                    break;
                  case "IsTrendingPhrases":
                    this.keyQuestionsModel = new KeyQuestionsModel();
                    this.IsActive = false;
                    this.IsTrendingPhrases = true;
                    break;
                  case "IsCallToActionPlaybook":
                    this.keyQuestionsModel = new KeyQuestionsModel();
                    this.IsActive = false;
                    this.IsCallToActionPlaybook = true;
                    break;
                  case "IsInteractions":
                    this.keyQuestionsModel = new KeyQuestionsModel();
                    this.IsActive = false;
                    this.IsInteractions = true;
                    break;
                  case "IsCustomersFeel":
                    this.keyQuestionsModel = new KeyQuestionsModel();
                    this.IsActive = false;
                    this.IsCustomersFeel = true;
                    break;
                  case "IsPeopleTalkingAbout":
                    this.keyQuestionsModel = new KeyQuestionsModel();
                    this.IsActive = false;
                    this.IsPeopleTalkingAbout = true;
                    break;
                  case "IsQueue":
                    this.keyQuestionsModel = new KeyQuestionsModel();
                    this.IsActive = false;
                    this.IsQueue = true;
                    break;
                  case "IsIVRContainment":
                    this.keyQuestionsModel = new KeyQuestionsModel();
                    this.IsActive = false;
                    this.IsIVRContainment = true;
                    break;
                  case "IsAgentScoring":
                    this.keyQuestionsModel = new KeyQuestionsModel();
                    this.IsActive = false;
                    this.IsAgentScoring = true;
                    break;
                  case "IsAgentDashboard":
                    this.keyQuestionsModel = new KeyQuestionsModel();
                    this.IsActive = false;
                    this.IsAgentDashboard = true;
                    break;
                  case "IsAddtoEvaluationRoom":
                    this.keyQuestionsModel = new KeyQuestionsModel();
                    this.IsActive = false;
                    this.IsAddtoEvaluationRoom = true;
                    break;

                  default:
                    this.keyQuestionsModel = new KeyQuestionsModel();
                    this.IsActive = true;
                }
          }
        })
      }
      }
    }
  }
   
  
  URL:any;
  getMstrConfig(){
    this.keyQuestionsService.getMstrConfig().subscribe(
      (data:any)=>{
        if(data['Mstr_MyEvaluation'] != undefined){
          this.URL = data['Mstr_MyEvaluation'];
          // console.log("IF",this.URL)
        }
        else{
          this.URL = "https://insight-usw2.successkpi.com/Analytics/servlet/mstrWeb?evt=2048001&src=mstrWeb.2048001&documentID={{documentID}}&evt=2048001&src=mstrWeb.2048001";
          // console.log("ELSE",this.URL)
        }
        setTimeout(() => {
          this.getKeyQuestions();
        }, 150);
       
      }
    ),
    (err)=>{
      console.log(err)
    }
  }

  keyPressOption: boolean = false;
  async omit_special_char(event) {
    this.keyPressOption = true;
    var k;
    k = event.charCode;  
    if ((k > 32 && k < 45) || k == 47 || (k > 57 && k < 65) || (k > 90 && k < 95) || k == 96 || (k > 122 && k < 127)) {
      return await event.preventDefault();
    }
  }


  // RemoveSpecialCharacters(val) {
  //   if (val != null && val.length > 1 && !this.keyPressOption) {
  //     const res = val.replace(/[^a-zA-Z0-9--._-_ - ]/g, "");
  //     // setTimeout(() => {
  //       this.allcards.documentID = res;
  //     // }, 50);
  //   }
  //   this.keyPressOption = false;
  // }
  onPaste(event) {
    if(event){
       const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
       (<HTMLInputElement>document.getElementById('documentnameid')).value = trimmedText;
       this.allcards.documentID  = trimmedText
    }
  }

  validateMstrReportId(documentID) {
    let params = {
      dossierId: documentID,
      reportType: "55",
      AuthToken: JSON.parse(localStorage.getItem('mstrAuthToken')),
      projectId: this.projectID
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
