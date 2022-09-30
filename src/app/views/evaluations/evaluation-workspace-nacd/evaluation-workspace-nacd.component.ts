import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
/* Service Import */
import { EvaluationWorkspaceNacdService } from './evaluation-workspace-nacd.service'

//import WaveSurfer from 'wavesurfer.js';
import WaveSurfer from 'wavesurfer.js/dist/wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js'
import MarkersPlugin from 'wavesurfer.js/src/plugin/markers/index.js'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js'

/* common Component Import */
import { CommonMethods } from '../../../common/common.components';
import * as moment from 'moment';
import { PagerService } from '../../../services/pager.service'
import { EvaluateSaveModel, NotesModel } from './evaluation-workspace-nacd.model';

/* Audio Player Import */
declare var $: any;
declare var require: any
// let WaveSurfer = require('../../../../assets/audioscript/wavesurfer.js');
// let TimelinePlugin = require('../../../../assets/audioscript/plugin/wavesurfer.timeline.js');
// let CursorPlugin = require('../../../../assets/audioscript/plugin/wavesurfer.cursor.js');

import { utils } from '../../../config';
import { GlobalComponent } from '../../../global/global.component';
import { promise } from 'protractor';
import { NgxSpinnerService } from "ngx-spinner";
import UserData from '../../../user';
import { InteractionService } from '../../interaction-details/interaction-details.service';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
import { LoginService } from '../../login/login.service';
import { MstrTokenService } from '../../../services/mstrtoken.service';
import { ClipboardService } from 'ngx-clipboard';
import { resolve } from 'dns';
import { environment } from '../../../../environments/environment';
import { PartitionService } from '../../settings/partition/partition.service';
import { PreferenceService } from '../../settings/successkpi-setting/successkpi-setting.service';
import { Subscription } from 'rxjs';
import { EvaluationFormsService } from '../evaluation-forms/evaluation-forms.service';

declare var microstrategy: any;
// import embeddedjs from '../../../../assets/tableJS/embeddinglib.js'
@Component({
  selector: 'app-evaluation-workspace-nacd',
  templateUrl: './evaluation-workspace-nacd.component.html',
  styleUrls: ['./evaluation-workspace-nacd.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class EvaluationWorkspaceNacdComponent implements OnInit {


  constructor(public ew_NACDservice: EvaluationWorkspaceNacdService, private commonMethods: CommonMethods,
    private pagerService: PagerService, public global: GlobalComponent, private spinnerService: NgxSpinnerService,
    private interactionService: InteractionService, public keyQuestionsService: KeyQuestionsService,
    private loginService: LoginService, private mstrTokenService: MstrTokenService, private _clipboardService: ClipboardService,
    private partitionService: PartitionService, private preferenceService: PreferenceService,  private evaluationService: EvaluationFormsService) {
    // this.getEvaluationLoad();
    this.evaluatesaveModel = new EvaluateSaveModel();
    this.notesModel = new NotesModel();
    let today = new Date();
    let fDate = today.setDate(today.getDate() - 7);
    this.fromDate = new Date(fDate)
    this.toDate = new Date();
    this.commonMethods.dynamicBackgroundColorChange('default');
    this.roleslist();
  }
  tabMenuName: string = "Transcript";
  filterRefresh: boolean = true;
  items1: MenuItem[];

  topicsTab = [];
  /* Audio Player varibales */
  audioUrl: string = 'null';
  ws: any;
  sentiment_data: any
  sentenceSentiment: any = null;
  sentimentBySentence_data: any;

  /* Evaluate Report Variables */
  newHeader = ["Call Start Time", "Caller ID", "Queue Name", "Agent Name"];
  newHeaderMetrics = ["Talk Time", "Wait Time", "Handle Time"];
  evaluateData: any;
  evaluateCustom = [];
  evaluateObj = { a: "", b: "", c: "", d: "", q: "", e: "", f: "", g: "", h: "", i: "", j: "", k: [], tp: [], sp: 0, spc: 1 };
  newRowObj = { l: "", m: "", n: "", o: "", p: "" };
  topicObj = { evRoomName: null, topicName: null, startTime: 0 };
  category: any;
  evaluationItem = [];
  questionsList: Object[];
  allItems: Object[];
  agentItem = ['All'];
  queueItem = ['All'];
  resultAgent = [];
  resultQueue = []
  agentCategory: string = 'All';
  queueCategory: string = 'All';
  teamCategory: string = "All";
  rowClick: boolean = false;
  // transcriptTab: Object[];
  transcriptTab: any = [];
  tooltip: string = "Please select interactions for evaluation"
  currentContact: string = "";
  pager: any = {};
  pagedItems: Object[];

  fromDate: Date;
  toDate: Date;
  // evaluation_coach: boolean = false;

  disableqa: boolean = false;
  // disablecoach: boolean = false;
  evaluatorDropdown: any = [];
  selectedEvaluator: string = ""
  ismoderator: boolean = false;
  allowResubmit: boolean = false;
  public evaluatesaveModel: EvaluateSaveModel
  public notesModel: NotesModel;

  selectedCity: string = null;
  cities = []
  localLang = 'english';
  /* Evaluation Dropdown change*/
  evalRoomData: any;
  evalRoomName: any;
  selectedLabel: any;
  currentEvaluationDetails: any = { evalRoomId: null, evalRoomName: '', evalRoomIsNonACD: false };

  /** get Evaluation forms */
  evaluateUserDDL: any;
  evaluaterUser: any;
  selectlabelDB: any;
  selectedEvalItem: any;

  totalCountQues: number = 0;
  totalCountNotes: number = 0;

  loading: boolean = false;
  evalFormAgent: any;
  saveAgentName: any = null;
  /** evaluation workspace save */
  // coachFlag: boolean = true;
  /* filter Interaction functions */
  isfilterLoading = false;
  AgentDDL: boolean = false;
  DossierId: any = null;
  projectID: any = null;

  resultTeams: any;
  teamItem: any = ['All'];
  EvalRes: any = []

  resultEvalName: any;
  evalUserItem: any = ['All'];
  evalUserCategory: string = "All";

  errhandleTime: boolean = false;

  totalScore: number = 0;
  totalQues: number = 0;
  totalNotes: number = 0;

  AllEvalData: any = []

  EvalItemDDL: any = [];
  minDate: Date;
  maxDate: Date;
  mstrIdToken: any;
  idToken: any;
  statusDDL: any = [];
  statusModel: any;
  handleTDDL: any = [];
  handleModel: any;
  timeIptModel: number = 0;
  istableGet: boolean = true;
  dossier1: any = null;
  dossierFilterList: any;
  conversationItem: any = ['All'];
  convCategory: string = "All";

  resultConvID: any;

  mstrToken: any = null;
  audioEndpoint: any = null;
  getTopicReport: any = [];
  getTopicReportTime: any= [];
  getReportEvalname: any = null;
  labelVal: any = {}
  agentDDLform: any = [];
  getQueueLoopAgent: any = [];

  // NotEs section

  getTimePlayer: any;

  notesPopup: boolean = false;

  errValNotes: boolean = false;
  conversationID: boolean = false;
  errTime: boolean = false;

  allNotes: any = [];

  itemConvID: any = null;
  itemId: any = null;

  // getQuestions:any=[];
  saveFlagDisable: boolean = false;
  resetQuesList: any = [];
  eval_Status: string = "";

  localRole: any;
  roleEvalForm: any = null;
  roleEvalFormName: any = '';

  // copy(text: string,i,j){
  //   this._clipboardService.copy(text);
  //   this.indexTexti = i;
  //   this.indexTextj = j;
  //   this.isCopy = true;
  //   setTimeout(() => {
  //     this.isCopy = false;
  //   }, 4500);
  //   // this.commonMethods.addToastforlongtime(true, 'Description text of question have been copied !')
  // }

  //  Copy functionality for desc text
  isConformBox: boolean = false;
  isCopy: boolean = false;
  indexTexti: any;
  indexTextj: any;

  // sendDataTOmstr(){
  //   return new Promise((resolve,reject)=>{
  //     let token = localStorage.getItem('mstrAuthToken');
  //     token = JSON.parse(token)
  //     let params = {
  //       xmstrAuthTokenParam: token['authToken'],
  //       mstrSessionStateParam: localStorage.getItem('_mstrweb'),
  //       projectIdParam: this.projectID,
  //       projectNameParam: localStorage.getItem('mstrProject'),
  //       dossierIdParam: this.DossierId,
  //       dossierInstanceIdParam: this.dossierInstanceID.mid,
  //       cookieParam : token['cookie']
  //     }
  //     this.ew_NACDservice.sendDataTOmstr(params).subscribe(
  //       (data:any)=>{
  //         // console.log("SetInstance",data);
  //         resolve(data)
  //       },
  //       (error)=>{
  //         console.log(error);
  //         reject(error);
  //         this.spinnerService.hide();

  //       }
  //     )
  //   })

  // }

  // dossierInstanceID:any;
  // getmstrInstanceID(){
  //   return new Promise((resolve,reject)=>{
  //     let token = localStorage.getItem('mstrAuthToken');
  //     token = JSON.parse(token)
  //     let params = {
  //       xmstrAuthTokenParam: token['authToken'],
  //       cookieParam : token['cookie'],
  //       projectIdParam: this.projectID,
  //       dossierIdParam: this.DossierId
  //     }
  //     this.ew_NACDservice.getMSTRInstanceID(params).subscribe(
  //       (data:any)=>{
  //         this.dossierInstanceID = data;
  //         // console.log("instanceID",this.dossierInstanceID);
  //         resolve(data);
  //       },
  //       (error)=>{
  //         console.log(error);
  //         reject(error);
  //         this.spinnerService.hide();
  //       }
  //     )
  //   })

  // }
  // }
  isloadSpinner: boolean = false;
  nonACDAgentDropdown: boolean = false;
  currentSelectedEvaluationForm: any = '';
  isAudioPlayerShow: boolean = false;
  isInteractionGrid: boolean = true;
  isEvaluationForm: boolean = false;
  videoUrl: any = [];
  isDisableRefresh:boolean = true;
  isSwitchDisable:boolean = true;
  isEvaluationTabs:boolean = false;
  isAudioSpinner:boolean = false;
  subscription_DossierID: Subscription;
  subscription_ValidateReportID: Subscription;
  subscription_mstrValidToken: Subscription;

  ngOnInit(): void {
    utils.isMstrReload = false;
    this.getPlatformValidation().then(() => {
      this.evaluationTabValue();
    })
    // this.getConfigFormDossierIdList();
    this.getEvaluationDossiers();

    //  this.videoUrl = ["http://media.w3.org/2010/05/sintel/trailer.mp4","https://archive.org/download/Popeye_forPresident/Popeye_forPresident_512kb.mp4","https://media.geeksforgeeks.org/wp-content/uploads/20190616234019/Canvas.move_.mp4"]
  }

  // tabDetails:any[];
  // evaluation tabs
  evaluationTabs() {
    return new Promise((resolve, reject) => {
      this.ew_NACDservice.evaluationTabs().subscribe(
        (data: any) => {
          resolve(data);
        }, (err) => {
          reject(err)
        })
    })
  }

  evaluationTabValue() {
    this.items1 = [
      {
        label: '', command: (e) => {
          this.tabMenuName = "Transcript"
          e.originalEvent = this.handleChange(e.item)
        }
      },
      {
        label: '', command: (e) => {
          this.tabMenuName = "Topics"
          e.originalEvent = this.handleChange(e.item)
        }
      },
      {
        label: 'Notes', command: (e) => {
          this.tabMenuName = "Notes"
          e.originalEvent = this.handleChange(e.item)
        }
      },
      {
        label: 'Screen', command: (e) => {
          this.tabMenuName = "Screen"
          e.originalEvent = this.handleChange(e.item)
        }
      }
    ];

    if (!this.isMediaScreen) {
      this.items1 = this.items1.filter(element => element.label != 'Screen')
    }
    this.activeTab = this.items1[0]
    this.evaluationTabs().then((res) => {
      if (localStorage.getItem("language") != null && typeof (localStorage.getItem("language")) != 'undefined') {
        this.localLang = localStorage.getItem("language")
      }
      this.items1[0].label = res[this.localLang]['Transcript']
      this.items1[1].label = res[this.localLang]['Topics']
    }).catch((err) => {
      this.items1[0].label = 'Transcript'
      this.items1[1].label = 'Topics'
    })
  }

  //get the evaluationform data from DB
  getEvalutionItems() {
    return new Promise((resolve, reject) => {
      this.ew_NACDservice.getEvaluationForms().subscribe((data: any) => {
        this.evaluationItem = data;
        resolve(this.evaluationItem)
      }, (err) => {
        reject(err)
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, err.error)
        console.log(err)
      })
    })
  }

  //set Evaluation form Question Answers
  setEvaluationFormQA(category) {
    let quesarr = [];
    let notesarr = [];
    if (category != "" && category != null) {
      const evalQuesList = this.evaluationItem.filter(element => element.evaluationRoomName == category)[0]
      this.selectedEvalItem = evalQuesList;
      this.evalRoomName = evalQuesList.evaluationRoomName;
      this.currentEvaluationDetails = { evalRoomId: evalQuesList.evaluationId, evalRoomName: evalQuesList.evaluationRoomName, evalRoomIsNonACD: evalQuesList.isNonACD == undefined ? false : evalQuesList.isNonACD };
      evalQuesList.questionsList.map((data: any) => {
        data.Topics.questions.map(elementQ => {
          // if(elementQ.questionData != undefined && elementQ.questionData != null) {
          //   elementQ.questionData.forEach(elementQlabel => {
          //     elementQlabel.label = elementQlabel.label.replace(' (undefined)', '')
          //   });
          // }
          if (elementQ.conditionalSkipQuestion == undefined) {
            elementQ.conditionalSkipQuestion = true;
          }
          if (elementQ.conditionalSkip && elementQ.conditionalSkipDetails != undefined) {
            elementQ.conditionalSkipQuestion = false;
          }
          if (elementQ.questionChoice == "Choice" || elementQ.questionChoice == "Yes/No") {
            elementQ.answerdata = null;
            elementQ.questionData = this.templatetoAns(elementQ.questionValue);
          }
          if (elementQ.questionChoice == "Choice" || elementQ.questionChoice == "Yes/No" || elementQ.questionChoice == "Number") {
            quesarr.push(elementQ)
            this.totalCountQues = quesarr.length
          }
          if (elementQ.questionChoice == "Comments") {
            notesarr.push(elementQ)
            this.totalCountNotes = notesarr.length
          }
        });
        if (data.topicShowHide == undefined) {
          data.topicShowHide = true;
        } else {
          data.topicShowHide = true;
        }
      });
      this.questionsList = evalQuesList.questionsList;
    }
  }

  evaluationWorkSpaceSave(status) {
    // Existing validation for conversationId need changes
    if (this.currentContact == null || this.currentContact == "" && !this.nonACDAgentDropdown) {
      this.commonMethods.addToastforlongtime(false, 'Please select interactions for evaluation');
      return;
    }
    else {
      if (this.currentContact == null || this.currentContact == "") {
        this.evaluatesaveModel.contactId = null;
      } else {
        this.evaluatesaveModel.contactId = this.currentContact;
      }

      // {evalRoomId:element.evaluationId, evalRoomName: element.evaluationRoomName, evalRoomIsNonACD: element.isNonACD==undefined?false:element.isNonACD }
      // if (this.currentEvaluationDetails?.evalRoomIsNonACD) {
        if (this.currentContact?.includes('NON-ACD')) {
        this.evaluatesaveModel.Type = 'NON-ACD'; 
      } else {
        this.evaluatesaveModel.Type = 'ACD';
      }
      // this.saveAgentName = this.agentDDLform.filter(s => s.value == this.evalFormAgent)[0];
      if (status == "Complete") {
        let count = 0;
        let mandatoryCount = 0;
        this.questionsList.forEach((data: any) => {
          data.Topics.questions.forEach(element => {

            if (element.questionMandatory == true && !element.conditionalSkip) {
              if (element.questionChoice == "Comments") {
                if (element.answerdata == null || element.answerdata == undefined || element.answerdata == "") {
                  // this.commonMethods.addToastforlongtime(false, ' Please fill the require(*) answer for the questions');
                  count = count + 1;
                  return;
                }
              } else if (element.questionChoice == "Choice" || element.questionChoice == "Yes/No" && !element.conditionalSkip) {

                if (element.answerdata == null || element.answerdata == undefined && element?.displaytype?.value == "radio") {
                  // if (element.answerdata.Answer == null) {
                    count = count + 1;
                    // this.commonMethods.addToastforlongtime(false, ' Please fill the require(*) answer for the questions');
                    // return;
                  // }
                } else {
                  if ((element?.displaytype?.value != "radio" || element?.displaytype?.value == undefined) && (element.answerdata?.Answer == null || element.answerdata?.Answer == undefined)) {
                    count = count + 1;
                    // this.commonMethods.addToastforlongtime(false, ' Please fill the require(*) answer for the questions');
                    // return;
                  }

              }
              } else {
                if (element.numberValue == null || element.numberValue == "" || element.numberValue == undefined && !element.conditionalSkip) {
                  // this.commonMethods.addToastforlongtime(false, ' Please fill the require(*) answer for the questions');
                  count = count + 1;
                  // return;
                }
              }
            }

            // if (element?.displaytype?.value == "radio") {
            //   element.questionData.forEach((quesData, indexQD) => {
            //     if (quesData.value.Answer == element.answerdata) {
            //       // elementQ.answerdata = element.questionData[indexQD].value;
            //       element.answerdata = quesData?.value;
            //       // elementQ.answerdata = element.questionData[indexQD];
            //       // delete element.answerdata?.Score;
            //     }
            //   });
            // }
          })
        })
        // if (count > 0) { mandatoryCount
          if (count > 0) {
          this.commonMethods.addToastforlongtime(false, 'Please provide responses to all the mandatory questions (marked “*”)');
          return;
        } else {
          this.questionsList.forEach((data: any) => {
            data.Topics.questions.forEach(element => {
              if (element?.displaytype?.value == "radio") {
                element.questionData.forEach((quesData, indexQD) => {
                  if (quesData.value.Answer == element.answerdata) {
                    // elementQ.answerdata = element.questionData[indexQD].value;
                    element.answerdata = quesData?.value;
                    // elementQ.answerdata = element.questionData[indexQD];
                    // delete element.answerdata?.Score;
                  }
                });
              }
            })
          })
        }
        if (this.notesPopup == true) {
          this.commonMethods.addToastforlongtime(false, 'Please save notes');
          return;
        }

        this.saveAgentName = this.agentDDLform.filter(s => s.value == this.evalFormAgent)[0];
        this.evaluatesaveModel.evaluationId = this.selectedEvalItem.evaluationId;
        this.evaluatesaveModel.evaluationRoomName = this.selectedEvalItem.evaluationRoomName;
        this.evaluatesaveModel.strategyId = this.selectedEvalItem.strategyId;
        this.evaluatesaveModel.strategyName = this.selectedEvalItem.strategyName;
        this.evaluatesaveModel.questionsList = this.questionsList;
        // this.evaluatesaveModel.contactId = this.currentContact;
        // this.evaluatesaveModel.queue_name = this.saveAgentName==undefined || this.saveAgentName.queueDetail==undefined || this.saveAgentName.queueDetail.name==undefined?"":this.saveAgentName.queueDetail.name;
        // this.evaluatesaveModel.queueid = this.saveAgentName==undefined?"" : this.saveAgentName.queueDetail.id;
        // this.evaluatesaveModel.agent_name = this.saveAgentName==undefined?"" : this.saveAgentName.label;
        this.evaluatesaveModel.queue_name = this.saveAgentName.queueDetail?.name;
        this.evaluatesaveModel.queueid = this.saveAgentName.queueDetail?.id;
        this.evaluatesaveModel.agent_name = this.saveAgentName.label;
        this.evaluatesaveModel.evaluationReportRoom = this.getReportEvalname;
        this.evaluatesaveModel.status = status;
        this.evaluatesaveModel.userid = this.evalFormAgent;
        this.evaluatesaveModel.evaluation_interactions_id = this.selectedEvaluator;
        // this.evaluatesaveModel.evaluation_coach=this.evaluation_coach;
        let url = utils.pathPhase3 + "/api/redshift";
        this.loading = true;
        this.spinnerService.show();
        this.ew_NACDservice.evaluationWorkSpaceSave(this.evaluatesaveModel).subscribe(
          (data: any) => {
            // this.ReloadData();
            // document.getElementById("refresh-btn-dossier").click();
            this.questionsList.forEach((evItem: any) => {
              evItem.Topics.questions.forEach(ques => {
                ques.numberValue = "";
                ques.answerdata = null;
              });
            });
            this.loading = false;
            this.spinnerService.hide();
            this.evaluatesaveModel = new EvaluateSaveModel();
            this.currentContact = ''
            this.getTopicReport = [];
            this.transcriptTab = [];
            this.videoUrl = [];
            this.allNotes = [];
            this.evalFormAgent = "";
            if (!this.currentEvaluationDetails.evalRoomIsNonACD) {
              this.agentDDLform = [];
            }
            this.totalScore = 0;
            this.totalQues = 0;
            this.totalNotes = 0;
            this.disableqa = false;
            // this.disablecoach = false;
            this.evaluatorDropdown = [];
            this.selectedEvaluator = ""
            this.ismoderator = false;
            this.allowResubmit = false;
            // this.evaluatesaveModel.evaluation_coach = false;
            this.eval_Status = "";
            this.refreshBtn(false);
            this.notesPopup = false;
            this.playerSelectedCategories = this.playerDisplayCategories
            this.playbackIndex = '1.0';  
            this.selectedIndex = 2;
            // this.rowClick = false;
            this.tooltip = "Please select interactions for evaluation";
            // this.filterInteraction('filter')
            if (data.result == 'No data available!') {
              this.commonMethods.addToastforlongtime(false, 'Record not found');
            } else {
              this.commonMethods.addToastforlongtime(true, data.result);
            }
            // this.spinnerService.hide();
            // if (utils.isMstrReload) {
            //   this.loginService.redirectTo('reload')
            // }
          }, (err) => {
            this.loading = false;
            // this.rowClick = true;
            this.spinnerService.hide();
            this.commonMethods.addToastforlongtime(false, err.error)
          })
      }
      if (status == "In Progress") {

        this.questionsList.forEach((data: any) => {
          data.Topics.questions.forEach(element => {
            if (element?.displaytype?.value == "radio") {
              element.questionData?.forEach((quesData, indexQD) => {
                if (quesData.value.Answer == element.answerdata) {
                  element.answerdata = element.questionData[indexQD]?.value;
                }
              });
            }
          })
        })

        this.saveAgentName = this.agentDDLform.filter(s => s.value == this.evalFormAgent)[0];
        this.evaluatesaveModel.evaluationId = this.selectedEvalItem.evaluationId;
        this.evaluatesaveModel.evaluationRoomName = this.selectedEvalItem.evaluationRoomName;
        this.evaluatesaveModel.strategyId = this.selectedEvalItem.strategyId;
        this.evaluatesaveModel.strategyName = this.selectedEvalItem.strategyName;
        this.evaluatesaveModel.questionsList = this.questionsList;
        // this.evaluatesaveModel.contactId = this.currentContact;
        this.evaluatesaveModel.queue_name = this.saveAgentName.queueDetail?.name;
        this.evaluatesaveModel.queueid = this.saveAgentName.queueDetail?.id;
        this.evaluatesaveModel.agent_name = this.saveAgentName.label;
        this.evaluatesaveModel.evaluationReportRoom = this.getReportEvalname;
        this.evaluatesaveModel.status = status;
        this.evaluatesaveModel.userid = this.evalFormAgent;
        this.evaluatesaveModel.evaluation_interactions_id = this.selectedEvaluator;
        // this.evaluatesaveModel.evaluation_coach=this.evaluation_coach;
        this.loading = true;
        this.spinnerService.show();
        this.ew_NACDservice.evaluationWorkSpaceSave(this.evaluatesaveModel).subscribe(
          (data: any) => {
            // this.ReloadData();
            // document.getElementById("refresh-btn-dossier").click();
            this.questionsList.forEach((evItem: any) => {
              evItem.Topics.questions.forEach(ques => {
                ques.numberValue = "";
                ques.answerdata = null;
              });
            });
            this.loading = false;
            this.spinnerService.hide();
            this.evaluatesaveModel = new EvaluateSaveModel();
            this.currentContact = ''
            this.getTopicReport = [];
            this.transcriptTab = [];
            this.videoUrl = [];
            this.allNotes = [];
            this.evalFormAgent = "";
            if (!this.currentEvaluationDetails.evalRoomIsNonACD) {
              this.agentDDLform = [];
            }
            this.totalScore = 0;
            this.totalQues = 0;
            this.totalNotes = 0;
            this.disableqa = false;
            // this.disablecoach = false;
            this.evaluatorDropdown = [];
            this.selectedEvaluator = ""
            this.ismoderator = false;
            this.allowResubmit = false;
            this.eval_Status = "";
            // this.evaluatesaveModel.evaluation_coach = false;
            this.refreshBtn(false);
            this.notesPopup = false;
            this.playerSelectedCategories = this.playerDisplayCategories
            this.playbackIndex = '1.0';  
            this.selectedIndex = 2;
            this.tooltip = "Please select interactions for evaluation";
            if (data.result == 'No data available!') {
              this.commonMethods.addToastforlongtime(false, 'Record not found');
            } else {
              this.commonMethods.addToastforlongtime(true, data.result);
            }
            // if (utils.isMstrReload) {
            //   this.loginService.redirectTo('reload')
            // }
          }, (err) => {
            this.loading = false;
            this.spinnerService.hide();
            this.commonMethods.addToastforlongtime(false, err.error)
          })
      }
    }
  }

  /** get agent and customers Transcribe data   */
  
  getTranscribeData(conversationId) {
    this.ew_NACDservice.getTranscribeData(conversationId).subscribe((data: any) => {
      if(data[0]?.from_user_emailid==undefined) {
        this.transcriptTab = data.sort(this.commonMethods.compareValues('start_time'));
      } else {
        this.transcriptTab = data;
        this.transcriptTab.forEach(element => {
          // element.start_time = this.datePipe.transform(element.start_time, 'MM/dd/yyyy hh:mm a');
          element.start_time = moment(element.start_time).format("MM/dd/yyyy hh:mm a");
        });
      }
      this.isEvaluationTabs = false;
    }, (error) => {
      console.log(error);
      this.transcriptTab = [];
      this.spinnerService.hide();
      this.isEvaluationTabs = false
      // this.commonMethods.addToastforlongtime(false, error.error);
    })
  }

  /*Audio Interaction Player Functions ------------------------------------------------------------------------------------------- */
  refreshBtn(flag: boolean = true) {
    $('#play-btn,i').removeClass('fa-pause');
    $('#mute').find('i').removeClass('fa-volume-up fa-volume-off');
    $('#mute').find('i').toggleClass('fa-volume-up');
    $('#play-btn').attr("value", "play");
    if (flag) {
      this.audioPlayerInit();
    } else {
      this.audioUrl = environment.uiUrl + '/' + 'assets/mp3/0917.mp3';
      this.audioPlayerInit();
    }
  }

  // *********************************************************
  //playerDisplayCategoriesArr: any[] = [{name: 'Note Indicators', key: 'Note'},{name: 'ColorBy Channel', key: 'Color'}, {name: 'Sentiment Bar', key: 'Sentiment'}, {name: 'Topic tags', key: 'Topic'}];
  playerDisplayCategories: any[] = [{name: 'Note Indicators', key: 'Note'},{name: 'ColorBy Channel', key: 'Color'}, {name: 'Sentiment Bar', key: 'Sentiment'}, {name: 'Topic tags', key: 'Topic'}];
  playerSelectedCategories:any[] = this.playerDisplayCategories
  //add this when conversation loads
  isTopics:boolean = true 
  checkPlayerValue(keyId,selectedKey: any, event){
    //console.log(keyId, selectedKey, event)
    if(keyId == 'Color'){
      $('.wavesurfer-region').toggle()
    }
    if(keyId == 'Note'){
      $('.wavesurfer-marker .flag-image').toggle()
    }
    if(keyId == 'Sentiment'){
      $('.wavesurfer-marker .sentimentMarker').toggle('fast',()=>{
        if($('wave').hasClass('noafter')){
          $('wave').removeClass('noafter');
        }
        else
        $('wave').addClass('noafter');
      })
      // if($('wave').hasClass('noafter')){
      //   $('wave').removeClass('noafter');
      // }
    }
    if(keyId == 'Topic'){
      this.isTopics = event
      // $('.wavesurfer-marker .topic-image').toggle(1000, function(){
      //   $("#audio-spectrum").addClass('autoHeight')
      //   $(".evalDetailsBottom").css({'height': '280px'})
      // })

        if($("#audio-spectrum").hasClass('autoHeight')){
          $("#audio-spectrum").removeClass('autoHeight')
          $(".evalDetailsBottom").css({'height': '250px'})
        }
        else{
          $("#audio-spectrum").addClass('autoHeight')
          $(".evalDetailsBottom").css({'height': this.hasAutoHeight})
        }
        $('.wavesurfer-marker .topicMarker').toggle()
    }
  }

  addAutoHeight(){
    if(this.isTopics == true){

    }
  }

  checkPlayerSpeed(speedId,speedKey: number, event){
    this.selectedIndex = speedKey;

    this.playbackIndex = speedId
    this.ws.setPlaybackRate(this.playbackIndex);
  }

// *********************************************************

index: any;
activeTab: MenuItem;
regionsDataArr = [];
NotesPlayerData: any = [];
TopicsPlayerData: any = [];
SentimentPlayerData:any = []
conversid: string = '';
addedValue: any;
previousTopic: any
nextTopic:any
currentTopic:any
previousTime: any
nextTime:any
currentTime:any
imgWidth: number
hasAutoHeight: any = '300px'
localValue: number;
disableMute: boolean = false;
playbackSpeed: Array<String> = ['0.5', '0.8', '1.0', '1.2', '1.5', '2.0'];
playbackIndex: string
selectedIndex: number;
playRateSpeedSelected:any[] = this.playbackSpeed

NotesData: any = [];
selectedNoteIndex: any

  hoverNotes() {
    this.ws.on('marker-click', (ele) => {
      //console.log(ele)
      if(ele.label === undefined){
        //console.log(ele.label)
        this.activeTab = this.items1[2]
        this.tabMenuName = this.items1[2].label
        this.selectedNoteIndex = this.NotesPlayerData.findIndex(x => x.time === ele.time);
      }
    })
  }

  isMediaScreenLoader: boolean = false;
  handleChange(e) {
    //console.log(e)
    // if(e.index == undefined){
    //   this.activeTab = e.index;
    // }
    // else{
    //   this.activeTab = this.items1[e.index];
    // }
    this.activeTab = e;

    if (e.label == 'Screen' && this.currentContact != undefined && this.currentContact != '') {
      this.isMediaScreenLoader = true;
      if (this.platformId == 2 && this.isMediaScreen) {
        this.getVideoUrl(this.currentContact);
      }
    }
  }

  getNotesPlayerData() {
    this.NotesPlayerData = [];
    if (this.audioUrl != '' && this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3') {
      this.allNotes.forEach((element: any) => {
        let img = new Image(15, 15);
        let notes: any = {};
        img.src = "../assets/img/notes.svg"
        img.className = 'flag-image';
        notes.markerElement = img
        notes.time = parseFloat(element.time);
        notes.color = '#333';
        notes.position = 'top';
        this.NotesPlayerData.push(notes);
      });
    }
  }
  //Sentiment by sentence marker placement
  getSentimentPlayerData() {
    this.SentimentPlayerData = [];
    //console.log(this.sentiment_data)
    if (this.audioUrl != '' && this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3') {
      //if(this.sentiment_data.ReportData == undefined){
        //if(this.sentiment_data?.ReportData?.result?.data?.root != null && this.sentenceSentiment != null){
          //console.log(this.sentiment_data, this.SentimentPlayerData)
          if(this.sentiment_data != null){
          // console.log(
          //   this.sentenceSentiment,
          //   this.sentiment_data?.ReportData?.result?.data?.root != null, this.sentenceSentiment != null,
          //   this.sentiment_data?.ReportData?.result?.data?.root != null && this.sentenceSentiment != null
          // )
        this.sentenceSentiment.forEach((element: any) => {
        if(element.sentiment == 'POSITIVE'){
          element.color = '#285943'
        }
        else if(element.sentiment == 'NEGATIVE'){
          element.color = '#FC5130'
        }
        else if(element.sentiment == 'NEUTRAL'){
          element.color = '#D8D8D8'
        }
        //parseFloat(element.end_time) - (element.start_time)
        this.imgWidth = Math.round((parseFloat(element.end_time) - parseFloat(element.start_time)) * 100) / 100 
        let img = new Image(this.imgWidth, 15);
        let sentiByData: any = {};
        //img.src = "../assets/img/transparent.gif"
        img.src = "http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif"
        img.className = 'sentiment-image';
        img.style.backgroundColor = element.color
        sentiByData.markerElement = img
        sentiByData.time = parseFloat(element.start_time);
        sentiByData.color = 'rgba(216,216,216,0.26)';
        sentiByData.position = 'bottom';
        sentiByData.label = " "
        this.SentimentPlayerData.push(sentiByData);
      });
      }
    }
  }

  //Topics marker placement
  getTopicsPlayerData(){
    this.TopicsPlayerData = [];
    //console.log(this.TopicsPlayerData)
    this.addedValue = {}
    if(this.audioUrl != '' && this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3'){
      this.getTopicRandomColor()
      this.getTopicReportTime.forEach((element: any, index) => {
        //this.addedValue[element.time] = (this.addedValue[element.time] || 0) + 1
        if (index > 0) {
          this.previousTopic = this.getTopicReportTime[index-1].topic.split(' |')[0].trim()
          //console.log("Previous: " + this.getTopicReportTime[index-1].topic);  
        }
        if (index < (this.getTopicReportTime.length - 1)) {
          this.nextTopic = this.getTopicReportTime[index+1].topic.split(' |')[0].trim()
          this.nextTime = this.getTopicReportTime[index+1].time
          //this.nextTopic = this.getTopicReportTime[index+1].topic.split(' |')[0].trim()
          //console.log("Next: " + this.getTopicReportTime[index+1].topic);
        }
        this.currentTopic = this.getTopicReportTime[index].topic.split(' |')[0].trim()
        this.currentTime = this.getTopicReportTime[index].time

        
        let newarray=[]
        for(let i=index;i<this.getTopicReportTime.length;i++){
          if(element.topic.split(" |")[0] == this.getTopicReportTime[i].topic.split(" |")[0]
              && element.time == this.getTopicReportTime[i].time
          ){
            
            //element.color = this.getTopicReportTime[i].color = colors[counter];
            newarray.push({"time":element.time,"topic":element.topic.split("|")[0],"count":newarray.length+1})
            //console.log(newarray.length+1 > 1 ? newarray.length+1 : " ")
            // newarray.forEach(newarr=>{
            //   newarr.count = newarr.count > 1 ? newarr.count : " "
            // })
          }
        }

        let addedCounterTime = Object.values(this.addedValue)
        //console.log(addedCounterTime)
        //console.log(this.addedValue[element.time], element.topic)
        let img = new Image(15, 15);
        let topics: any = {};
        img.src = "http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif"
        img.className = 'topic-image';
        img.style.backgroundColor = element.color
        topics.markerElement = img
        topics.time = parseFloat(element.time);
        topics.color = element.color;
        topics.position = 'bottom';
        //topics.label = element.topic
        //console.log(addedCounterTime)
        newarray.forEach((ele)=>{
          //console.log("COUNT",ele, ele.count)
          topics.label = ele.topic
        })
        // if(this.addedValue[element.time] > 4){
        //   img.style.backgroundColor = 'white'
        //   img.style.border = '1px solid #333'
        // }

        this.TopicsPlayerData.push(topics);
      }); 
    }
    //console.log(this.TopicsPlayerData)
  }


  // $(".topic-image").hover(()=>{
  //   $(this).append( $( "<span> ***</span>" ))
  // })


  addMarker(options: any) {
    //console.log(this.ws.markers)
    //console.log(this.ws.markers, options)
    options.forEach((opt)=>{
    // console.log(opt)
    // console.log(this.ws.markers.add(opt))
    return this.ws.markers.add(opt);
    })
  }

  getTopicRandomColor(){
    let colors = ["#256676", "#34F50E", "#941483", "#5EBF72", "#1932BF", "#A9E81A", "#BC0542", "#4AD9E1", "#713529", "#BFCD8E", "#3D4E92", "#C5D5F0", "#1C5F1E", "#FCC2FB", "#6108E8", "#F3D426", "#F365E7", "#3A91FB", "#F6BB86", "#997CFB", "#B77529", "#FF6B97", "#FD5917", "#4D4815", "#B97EAC"]
    let counter = 0;
    this.addedValue = {}
    this.getTopicReportTime.forEach((element,index) => {
      for(let i=index;i<this.getTopicReportTime.length;i++){
        if(element.topic.split(' |')[0].trim() == this.getTopicReportTime[i].topic.split(' |')[0].trim()){
          //console.log(element, element.color)
          if(element.color == undefined){
          //  element.code = arr[i].code = counter;
           element.color = this.getTopicReportTime[i].color = colors[counter];
           ++counter;
          }
          else{
            this.getTopicReportTime[i].color = element.color; 
          //  arr[i].code = element.code;
          }
        }
      }
    });
    //console.log(this.getTopicReportTime)
  }

  getRegions() {
    this.regionsDataArr = [];
    if (this.audioUrl != '' && this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3') {
      this.transcriptTab.forEach((element: any) => {
        let regionsData: any = {}
        this.conversid = element.contact_id;
        regionsData.start = parseFloat(element.start_time);
        regionsData.end = parseFloat(element.end_time);
        regionsData.loop = false;
        regionsData.drag = false;
        if (element.channel == "Agent" || element.channel == "AGENT") {
          regionsData.color = 'hsla(196, 84%, 56%, 1)'//"#30BCED";
        }
        else if (element.channel == "Customer" || element.channel == "CUSTOMER") {
          regionsData.color = 'hsla(139, 53%, 74%, 1)'  //"#98DFAF";
        }
        //regionsData.attributes = this.label
        //regionsData.attributes = {label:"Tag1"}

        this.regionsDataArr.push(regionsData);
      });
      //this.hoverNotes();
      // if(this.audioUrl != 'null' && this.transcriptTab.length > 0 ){
      //   this.hoverNotes();
    }
  }

  addTopicMarker(){
    if(this.getTopicReportTime[0].topic == 'N/A'){
      //this.playerSelectedCategories = [{name: 'ColorBy Channel', key: 'Color'}, {name: 'Sentiment Bar', key: 'Sentiment'}];
      $("#audio-spectrum").addClass('sized')
      $(".evalDetailsBottom").css({'height': '280px'})
      return false;
    }
    else{
      this.addMarker(this.TopicsPlayerData)
      //this.playerSelectedCategories = [{name: 'ColorBy Channel', key: 'Color'}, {name: 'Sentiment Bar', key: 'Sentiment'}, {name: 'Topic tags', key: 'Topic'}];
      $("#audio-spectrum").removeClass('sized')
      $(".evalDetailsBottom").css({'height': '250px'})
    }
  }

  addSentimentMarker(){
    if(this.sentiment_data?.ReportData?.result?.data?.root != null){
      this.addMarker(this.SentimentPlayerData)
    }
    else {
      //console.log("noafter should add")
     $('wave').addClass('noafter');
     return false
    }
  }
  // this.ws.on('ready', this.updateTimer)
  // this.ws.on('audioprocess', this.updateTimer)
  // this.ws.on('seek', this.updateTimer)

  updateTimer() {
    console.log(this.ws.getCurrentTime())
    var currentTime = this.secondsToTimestamp(this.ws.getCurrentTime());
    var remainingTime = this.secondsToTimestamp(this.ws.getDuration());
    $('#waveform-time-indicator .currentTime').text(currentTime);
    $('#waveform-time-indicator .remainingTime').text(remainingTime);
    console.log(currentTime, remainingTime)
  }
  
  secondsToTimestamp(seconds) {
    seconds = Math.floor(seconds);
    var h:any = Math.floor(seconds / 3600);
    var m:any = Math.floor((seconds - (h * 3600)) / 60);
    var s:any = seconds - (h * 3600) - (m * 60);
  
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return m + ':' + s;
  }
  
  // this.ws.on('ready', this.updateTimer)
  // this.ws.on('audioprocess', this.updateTimer)
  // this.ws.on('seek', this.updateTimer)

  getVolumeSlider(){
    let volumeSlider: HTMLElement = document.querySelector("#volumeSlider") as HTMLElement
    const handleVolumeChange = e => {
      // Set volume as input value divided by 100
      // NB: Wavesurfer only excepts volume value between 0 - 1
      const volume:any = e.target.value / 100
      this.ws.setVolume(volume)
      // Save the value to local storage so it persists between page reloads
      localStorage.setItem("audio-player-volume", volume)
    }
    const setVolumeFromLocalStorage = () => {
      // Retrieves the volume from local storage, or falls back to default value of 50
      let localValue = localStorage.getItem("audio-player-volume")
      let volume:any = this.localValue * 100 || 50
      volumeSlider.innerHTML = volume
    }
    window.addEventListener("load", setVolumeFromLocalStorage)
    volumeSlider.addEventListener("input", handleVolumeChange)

    $("#mute").hover(function(){
      $(".volume-slider").toggle()
      //this.ws.getVolume()
    })

    const currentTime = document.querySelector("#currentTime")
    const totalDuration = document.querySelector("#totalDuration")    

    const formatTimecode = seconds => {
      return new Date(seconds * 1000).toISOString().substr(11, 8)
    }
        // Wavesurfer event listeners
    this.ws.on("ready", () => {
      // Set wavesurfer volume
      //this.ws.setVolume(volumeSlider.value / 100)
      // Set audio track total duration
      const duration = this.ws.getDuration()
      totalDuration.innerHTML = formatTimecode(duration)
      //reset time to 0 when new convId selected
      currentTime.innerHTML = formatTimecode(0)
    })
    // Sets the timecode current timestamp as audio plays
    this.ws.on("audioprocess", () => {
      const time = this.ws.getCurrentTime()
      currentTime.innerHTML = formatTimecode(time)
      $('.play-1x').on('click', function () {
        //this.ws.setPlaybackRate(1);
      });
    })

    //change playback speed
    // $('.play-quarterx').on('click', function () {
    //   this.ws.setPlaybackRate(0.25);
    // });
    // $('.play-halfx').on('click', function () {
    //   this.ws.setPlaybackRate(0.5);
    // });
    // $('.play-1x').on('click', function () {
    //   this.ws.setPlaybackRate(1);
    // });
    // $('.play-2x').on('click', function () {
    //   this.ws.setPlaybackRate(2);
    // });

//     //new function for speed audio	
// 	var speedlist = document.getElementById("speedlist");
// 	speedlist.addEventListener("change",changeSpeed);
	
//     function changeSpeed(event){
// 		audio.playbackRate = event.target.value;
// 	} 
// }

  } 
  
  audioPlayerInit() {
    if (this.audioUrl != '' && this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3') {
      if (typeof (this.ws) == 'object' && typeof (this.ws.destroy) == 'function') {
        this.ws.destroy();
      }
    //console.log(this.ws, this.audioUrl)  
    this.getRegions();
    this.getNotesPlayerData();
    this.getTopicsPlayerData();
    this.getSentimentPlayerData();
    //console.log("region called")
    this.ws = WaveSurfer.create({
      container: '#audio-spectrum',
      waveColor: '#525252',
      progressColor: '#424232',
      backend: 'MediaElement',
      autoCenter: true,
      partialRender: false,
      removeMediaElementOnDestroy: false,
      height: 140,
      barHeight: 0.5, // the height of the wave
      barRadius: 2,
      barWidth: 1,
      barGap: null,
      responsive: true,
      fluid: true,
      plugins: [
        TimelinePlugin.create({
          container: '#wave-timeline'
        }),
        CursorPlugin.create({
          showTime: true,
          opacity: 1,
          customShowTimeStyle: {
            'background-color': '#000',
            color: '#fff',
            padding: '0px',
            'font-size': '12px',
          }
        }),
        RegionsPlugin.create({
          deferInit: false,
          regions: this.regionsDataArr,
          //attributes: {label:"Tag1"}
          }),
          MarkersPlugin.create({
          deferInit: false,
          markers: this.NotesPlayerData,
          }),
        ],

    });
    if (typeof (this.ws) == 'object' && this.audioUrl.trim() != "") {
      let resAudioLoad = this.ws.load(this.audioUrl);
      this.hoverNotes();
      //Add sentiment by sentence data
      this.addSentimentMarker()
      //Add topic data
      this.addTopicMarker()

      this.getVolumeSlider()

      $(".flag-image").parent('div').siblings('div').addClass("noteMarkerDiv")
      $(".sentiment-image").parent('div').addClass("sentimentMarker")
      $(".sentiment-image").parent('div').siblings('div').addClass("sentimentMarkerDiv")
      $(".topic-image").parent('div').addClass("topicMarker")
      $(".topic-image").parent('div').siblings('div').addClass("topicMarkerDiv")
      $(".topicMarkerDiv").parent('marker').addClass("topic-wavesurfer-marker")
      $(".topicMarker").hover(function() {
        $(this).toggleClass("indexActive")
        $(this).parent( ".topic-wavesurfer-marker" ).toggleClass("overflow-show");
        //$(this).find("span").toggleClass("topic-span")
          // .next()
          //   .stop( true, true )
          //   .slideToggle();
      })
      
      // if (resAudioLoad.xhr.status != 200 && resAudioLoad.xhr.status != 206 && resAudioLoad.xhr.status != 304) {
      //   this.audioUrl = environment.uiUrl + '/' + 'assets/mp3/0917.mp3';
      //   this.ws.load(this.audioUrl)
      //   // this.commonMethods.addToastforlongtime(false, 'Access Denied')
      // }
    }
    // reset play icon after -- Finished playing
    if(this.audioUrl != '' && this.audioUrl != 'null') {
      this.ws.on('finish', function() {
        $('#play-btn,i').removeClass('fa-pause');
        $('#play-btn').attr("value", "play");
        //console.log('Finished playing');
      });
    }
    }
    else {
      if (typeof (this.ws) == 'object' && typeof (this.ws.destroy) == 'function') {
        this.ws.destroy();
      }
    }
    // if (typeof (this.ws) == 'object'){
      setTimeout(() => {
        this.isAudioSpinner = false
      }, 2000);
    // }
}


  onChangeAudioLoader(isToggle) {
    if (isToggle) {
      if (this.audioUrl != 'null' && this.audioUrl != environment.uiUrl + '/' + 'assets/mp3/0917.mp3' && this.audioUrl != '') {
        this.refreshBtn();
      }
    }
  }

  onChangeBlur() {
    this.currentSelectedEvaluationForm = this.category;
    this.evalRoomName = null;
    this.questionsList = [];
    this.AgentDDL = false;
    // if(!this.currentEvaluationDetails.evalRoomIsNonACD) {
    this.agentDDLform = [];
    // }
    // this.evalFormAgent = '';
    // this.selectedEvaluator = '';
    this.totalCountQues = 0;
    this.totalCountNotes = 0;
    this.totalQues = 0;
    this.totalNotes = 0;
    this.totalScore = 0;
    this.evaluatesaveModel = new EvaluateSaveModel();
    this.refreshBtn(false)
    this.currentContact = "";
    this.transcriptTab = [];
    this.videoUrl = [];
    this.getTopicReport = [];
    this.allNotes = [];
    this.playerSelectedCategories = this.playerDisplayCategories
    this.playbackIndex = '1.0';  
    this.selectedIndex = 2;
    if($("#audio-spectrum").hasClass('autoHeight')){
        $("#audio-spectrum").removeClass('autoHeight')
      }
  }

  async onChangeEvaluationDDl() {
    this.spinnerService.show();
    // await this.getEvalutionItems();
    this.formLevelDossierIdList = [];
    // await this.getConfigFormDossierId(this.evaluationItem.filter(s=>s.evaluationRoomName==this.category)[0]);
   await this.getConfigFormDossierId(this.evaluationItem.filter(s=>s.evaluationRoomName==this.category)[0]).then(() => {
    this.spinnerService.hide();
    this.spinnerService.show();
    if(this.formLevelDossierIdList[0]?.value != undefined && this.formLevelDossierIdList[0]?.value != null && this.formLevelDossierIdList[0]?.value != "") {
      this.validateMstrReportId(this.formLevelDossierIdList[0]?.value).then((validIdRes: any) => {
        this.spinnerService.hide();
        if (validIdRes['isSuccess'].toLowerCase() == 'success') {
          this.spinnerService.show();
          this.AgentDDL = true;
          // this.coachFlag = true;
          this.saveFlagDisable = false;
          this.evalFormAgent = '';
          this.selectedEvaluator = '';
          this.isloadSpinner = true;
          this.isDisableRefresh = false;
          this.isSwitchDisable = true;
          this.isAudioPlayerShow = false;
          this.isEvaluationForm = false;
          const getTableId = document.getElementById('dossierContainer1');
          if (this.category != "" && this.category != null) {
            if (!!document.getElementById('dossierContainer1')) {
              getTableId.style.display = 'none'
              microstrategy.dossier.destroy({ placeholder: getTableId });
            }
           this.mstrValidToken().then((isTrue) => {
              this.isDisableRefresh = this.category != "" && this.category != undefined && this.category != null ?  false :  true; 
              this.workspaceTable().then(() => {
                this.isloadSpinner = false;
                getTableId != undefined ? getTableId.style.display = 'block' : null;
                this.setEvaluationFormQA(this.category)
              })
            })
          }
        } else {
          // setTimeout(() => {
            this.category = '';
            const getTableId = document.getElementById('dossierContainer1');
              if (!!document.getElementById('dossierContainer1')) {
                getTableId.style.display = 'none'
                microstrategy.dossier.destroy({ placeholder: getTableId });
              }
          // }, 200);
          this.spinnerService.hide();
          return this.commonMethods.addToastforlongtime(false, "Invalid Dossier Id")
        }

      },
      (onRejected) => {
      // setTimeout(() => {
        this.category = '';
        const getTableId = document.getElementById('dossierContainer1');
          if (!!document.getElementById('dossierContainer1')) {
            getTableId.style.display = 'none'
            microstrategy.dossier.destroy({ placeholder: getTableId });
          }
        // }, 200);
        this.spinnerService.hide();
      });
    } else {
    this.spinnerService.show();
    this.AgentDDL = true;
    // this.coachFlag = true;
    this.saveFlagDisable = false;
    this.evalFormAgent = '';
    this.selectedEvaluator = '';
    this.isloadSpinner = true;
    this.isDisableRefresh = false;
    this.isSwitchDisable = true;
    this.isAudioPlayerShow = false;
    this.isEvaluationForm = false;
    const getTableId = document.getElementById('dossierContainer1');
    if (this.category != "" && this.category != null) {
      if (!!document.getElementById('dossierContainer1')) {
        getTableId.style.display = 'none'
        microstrategy.dossier.destroy({ placeholder: getTableId });
      }
     this.mstrValidToken().then((isTrue) => {
        this.spinnerService.hide();
        this.isDisableRefresh = this.category != "" && this.category != undefined && this.category != null ?  false :  true; 
        this.workspaceTable().then(() => {
          this.isloadSpinner = false;
          getTableId != undefined ? getTableId.style.display = 'block' : null;
          this.setEvaluationFormQA(this.category)
        })
      })
    }
    }

    });
    // if(this.agentDDLform.length == 0 || this.agentDDLform.length == 1) {
    //   this.getCustomDataDDL();
    // }
    this.spinnerService.hide();
  }

  //***  Intial Load of Dossier Evaluation ***/
  getEvaluationDossiers() {
    this.spinnerService.show();
    this.getEvalutionItems().then((evalFormRes: any[]) => {
      if (evalFormRes.length > 0) {

        this.formatEvaluationFormDDL(evalFormRes);
        this.getDossierID().then(() => {
          this.validateMstrReportId(null).then((validIdRes: any) => {
            if (validIdRes['isSuccess'].toLowerCase() == 'success') {
              let count = 0;
              // this.roleEvalForm = data.roleEvaluationFormID;
              this.roleEvalFormName = this.evaluationItem.filter(s=>s.evaluationId==this.roleEvalForm)[0]?.evaluationRoomName;
              this.EvalItemDDL.forEach(element => {
                  // label: "Evaluation Room for High AHT"
                  // value
                if(element.label == this.roleEvalFormName || element.value == this.roleEvalFormName) {
                  count =  count + 1;
                }
              });
              if(count == 0) {
                if(this.EvalItemDDL.length == 1) {
                  this.category = this.EvalItemDDL.length == 1 ? this.EvalItemDDL[0].value : "";
                } else {
                  this.category = "";
                }
              } else {
                this.category = this.EvalItemDDL.length == 1 || this.EvalItemDDL.length >= 1 ? this.EvalItemDDL[0].value : "";
              }

              this.isDisableRefresh = this.category != "" && this.category != undefined && this.category != null ?  false :  true; 
              if (this.category != "" && this.category != null) {
                this.isloadSpinner = true
                this.mstrValidToken().then((isres) => {
                  if (isres) {
                    this.isloadSpinner = false;
                  }
                  this.workspaceTable();
                })
              }
              else {
                this.spinnerService.hide();
                this.isloadSpinner = false;
              }
            }
          })
        })
      }
      else {
        this.spinnerService.hide();
      }
    })
  }

  //****** set the Evaluationform DropDown data *****
  formatEvaluationFormDDL(response) {
    let labelVal = {};
    response.map(element => {
      labelVal = {
        label: element.evaluationRoomName,
        value: element.evaluationRoomName
      }
      if (this.localRole.toLowerCase() != 'admin' && this.roleEvalForm != null) {
        if (element.evaluationId == this.roleEvalForm) {
          this.EvalItemDDL.unshift(labelVal)
        }
        else {
          this.EvalItemDDL.push(labelVal);
        }
      }
      else {
        this.EvalItemDDL.push(labelVal);
      }
    });
  }

  //*****  get the Microstrategy Dossier ID *****
  getDossierID() {
    return new Promise((resolve, reject) => {
      this.spinnerService.show();
     this.subscription_DossierID = this.keyQuestionsService.getMstrConfig().subscribe(
        (data: any) => {
          this.DossierId = typeof (data.ew_dossierID) != 'undefined' ? data.ew_dossierID : null;
          this.projectID = data.project_id;
          this.spinnerService.show();
          resolve(data)
        },
        (error) => {
          reject(error);
          console.log(error);
          this.spinnerService.hide();
          this.commonMethods.addToastforlongtime(false, "Invalid Dossier URL")
        }
      )
    })
  }

  async CalculateScore() {
    // console.log(i,val)
    let total_S = 0;
    let total_Q = 0;
    let total_N = 0;
    await this.questionsList.forEach((data: any) => {
      data.Topics.questions.forEach(element => {
        // console.log(element);

        if (element.questionChoice == "Choice") {
          if (element.answerdata != undefined && element.answerdata != null) {
            if (element.answerdata.Score != undefined && element.answerdata.Score != null) {

              // total_S += parseInt(element.answerdata.Score)
              if (element?.displaytype?.value == "radio") {
                element.questionData.forEach((quesData, indexQD) => {
                  if (quesData.value.Answer == element.answerdata) {
                    // console.log('quesData.value.Score', quesData.value.Score);
                    total_S += quesData.value.Score == null || quesData.value.Score == undefined ? 0 : parseFloat(parseFloat(quesData.value.Score).toFixed(2));
                    // if(quesData.value.Score.toString().includes('.')) {
                    //   total_S += parseFloat(parseFloat(quesData.value.Score).toFixed(2));
                    // } else {
                    //   total_S += quesData.value.Score;
                    // }
                  }
                });
              } else {
                // console.log('element.answerdata.Score', element.answerdata.Score);
                total_S += element.answerdata.Score == null || element.answerdata.Score == undefined ? 0 : parseFloat(parseFloat(element.answerdata.Score).toFixed(2));
                // if(element.answerdata.Score.toString().includes('.')) {
                //   total_S += parseFloat(parseFloat(element.answerdata.Score).toFixed(2));
                // } else {
                //   total_S += element.answerdata.Score;
                // }
              }
              // total_Q += 1; 
            } else if (element.answerdata.Score == null || element.answerdata.Score == "") {
              // element.answerdata.Score = 0;
              if (element?.displaytype?.value == "radio") {
                element.questionData.forEach((quesData, indexQD) => {
                  if (quesData.value.Answer == element.answerdata) {
                    // console.log('quesData.value.Score', quesData.value.Score);
                    total_S += quesData.value.Score == null || quesData.value.Score == undefined ? 0 : parseFloat(parseFloat(quesData.value.Score).toFixed(2));
                    // if(quesData.value.Score.toString().includes('.')) {
                    //   total_S += parseFloat(parseFloat(quesData.value.Score).toFixed(2));
                    // } else {
                    //   total_S += quesData.value.Score;
                    // }
                  }
                });
              } else {
                // console.log('element.answerdata.Score', element.answerdata.Score);
                total_S += element.answerdata.Score == null || element.answerdata.Score == undefined ? 0 : parseFloat(parseFloat(element.answerdata.Score).toFixed(2));

                // if(element.answerdata?.Score?.toString().includes('.')) {
                //   total_S += element.answerdata.Score == null || element.answerdata.Score == undefined? 0 : parseFloat(parseFloat(element.answerdata.Score).toFixed(2));
                // } else {
                //   total_S += element.answerdata.Score;
                // }
              }
              // total_Q += 0
            }
            //  if((element.answerdata.Answer == null && element.answerdata.Score == null) || (element.answerdata.Answer == null && element.answerdata.Score == "0")){
            //   let zeroVal = -1;
            //   total_Q += zeroVal
            // }
            if (element.answerdata.Answer != null || (element?.displaytype?.value == "radio" && element.answerdata != null)) {
              total_Q += 1;
            }
          }
        }
        if (element.questionChoice == "Yes/No") {
          if (element.answerdata != undefined && element.answerdata != null) {
            if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
              if (element?.displaytype?.value == "radio") {
                element.questionData.forEach((quesData, indexQD) => {
                  if (quesData.value.Answer == element.answerdata) {
                    // console.log('quesData.value.Score', quesData.value.Score);
                    total_S += quesData.value.Score == null || quesData.value.Score == undefined ? 0 : parseFloat(parseFloat(quesData.value.Score).toFixed(2));
                    // if(quesData.value.Score.toString().includes('.')) {
                    //   total_S += quesData.value.Score == null || quesData.value.Score == undefined? 0 : parseFloat(parseFloat(quesData.value.Score).toFixed(2));
                    // } else {
                    //   total_S += quesData.value.Score;
                    // }
                  }
                });
              } else {
                // console.log('quesData.value.Score', element.answerdata.Score);
                total_S += element.answerdata.Score == null || element.answerdata.Score == undefined ? 0 : parseFloat(parseFloat(element.answerdata.Score).toFixed(2));
                // if(element.answerdata.Score.toString().includes('.')) {
                //   total_S += quesData.value.Score == null || quesData.value.Score == undefined? 0 : parseFloat(parseFloat(element.answerdata.Score).toFixed(2));
                // } else {
                //   total_S += element.answerdata.Score;
                // }
              }
            } else if (element.answerdata.Score == null || element.answerdata.Score == "") {
              if (element?.displaytype?.value == "radio") {
                element.questionData.forEach((quesData, indexQD) => {
                  if (quesData.value.Answer == element.answerdata) {
                    // console.log('quesData.value.Score', quesData.value.Score);
                    total_S += quesData.value.Score == null || quesData.value.Score == undefined ? 0 : parseFloat(parseFloat(quesData.value.Score).toFixed(2));
                    // if(quesData.value.Score.toString().includes('.')) {
                    //   total_S += quesData.value.Score == null || quesData.value.Score == undefined? 0 : parseFloat(parseFloat(quesData.value.Score).toFixed(2));
                    // } else {
                    //   total_S += quesData.value.Score;
                    // }
                  }
                });
              } else {
                // console.log('quesData.value.Score', element.answerdata.Score);
                total_S += element.answerdata?.Score == null || element.answerdata?.Score == undefined ? 0 : parseFloat(parseFloat(element.answerdata?.Score).toFixed(2));
                // if(element.answerdata.Score.toString().includes('.')) {
                //   total_S += element.answerdata.Score == null || element.answerdata.Score == undefined? 0 : parseFloat(parseFloat(element.answerdata.Score).toFixed(2));
                // } else {
                //   total_S += element.answerdata.Score == null || element.answerdata.Score == undefined? 0 : element.answerdata.Score;
                // }
              }
            }
            // if((element.answerdata.Answer == null && element.answerdata.Score == null) || (element.answerdata.Answer == null && element.answerdata.Score == "0")){
            //   let zeroVal = -1;
            //   total_Q += zeroVal
            //   console.log("null1",total_Q)
            // }
            if (element.answerdata.Answer != null || (element?.displaytype?.value == "radio" && element.answerdata != null)) {
              total_Q += 1;
            }
          }
        }
        if (element.questionChoice == "Number") {
          // console.log('element.numberValue', element.numberValue);
          if (element.numberValue != null && element.numberValue != undefined && element.numberValue != "") {
            // if(element.numberValue.isNaN()  || NaN. isNaN(element.numberValue)) {
            if (element.numberValue.toString().includes('.')) {
              // || element.numberValue.isNaN()
              total_S += element.numberValue == null || element.numberValue == undefined ? 0 : parseFloat(parseFloat(element.numberValue).toFixed(2));
            } else {
              total_S += element.numberValue == null || element.numberValue == undefined ? 0 : parseInt(element.numberValue);
            }
            // }

            total_Q += 1;
          } else {
            total_S += 0;
          }
        }
        if (element.questionChoice == "Comments") {
          if (element.answerdata != null && element.answerdata != undefined && element.answerdata != "") {
            total_N += 1;
          }
          if (element.answerdata == "") {
            total_N--;
          }
        }


        // if(element?.displaytype?.value == "radio") {
        //   element.questionData.forEach((quesData, indexQD) => {
        //     if(quesData.value.Answer == element.answerdata?.Answer && quesData.value.Score == element.answerdata?.Score) {
        //       element.answerdata = element.questionData[indexQD]?.value?.Answer;
        //     }
        //   });
        // }
        // console.log('total_S', total_S);

      });
    })
    // console.log('this.questionsList', this.questionsList);

    if (total_Q <= 0) {
      total_Q = 0
    }
    let finalFloatValue = total_S?.toString().split(".");
    if (finalFloatValue[1]?.length > 2) {
      this.totalScore = parseFloat(parseFloat(finalFloatValue[0] + '.' + finalFloatValue[1].substring(0, 2)).toFixed(2));
    } else {
      this.totalScore = total_S;
    }
    this.totalQues = total_Q;
    this.totalNotes = total_N;
  }
  allEvaluationQuestionAnswers: any = [];

  //Load the Microstrategy Dossier
  async workspaceTable() {
    // debugger
    this.spinnerService.show();
    if (this.category != "" && this.category != null) {
      try {
        const projectID = this.projectID != null ? this.projectID : null;
        let dossierID;
        // let selectedFormEvalId = this.formLevelDossierIdList.filter(element => element.DossierID == this.category)
        // let selectedFormEvalId = this.formLevelDossierIdList?.filter(element => element.evaluationRoomName == this.category)
        if(this.formLevelDossierIdList[0]?.value != undefined && this.formLevelDossierIdList[0]?.value != null && this.formLevelDossierIdList[0]?.value != "") {
          dossierID = this.formLevelDossierIdList[0]?.value != null ? this.formLevelDossierIdList[0]?.value : null;
        } else {
          dossierID = this.DossierId != null ? this.DossierId : null;
        }
        // this.formLevelDossierIdList.forEach(element => {
        //   if(element.DossierID == this.category) {
        //     dossierID = element.value != null ? this.value : null;
        //   }
        // });
        // const dossierID = this.DossierId != null ? this.DossierId : null;
        const mstrAuthToken = JSON.parse(localStorage.getItem('mstrAuthToken'))
        const mstrIdToken = JSON.parse(localStorage.getItem("mstrIdToken"))['x-mstr-identitytoken']
        const projectUrl = environment.mstr_Url + projectID;
        const dossierUrl = projectUrl + '/' + dossierID;
        if (mstrIdToken == undefined) {
          this.spinnerService.hide();
        }
        setTimeout(() => {
          this.spinnerService.hide();
        }, 10000);
        const filterList = [
          {
            "name": "Evaluation Room",
            "selections": [
              { "name": this.category }
            ]
          }
        ];

        let promptsAnswers = {
          'Evaluation Room Value': this.category
        };
        // await this.getInstanceIDfromMSTR(projectID, dossierID, mstrAuthToken, this.category).then((DossierInstance) => {
          await this.interactionService.dossierPromptWorkflow(mstrIdToken, projectID, dossierID, promptsAnswers).then(jsonRes => {
          this.spinnerService.hide();
          microstrategy.dossier.create({
            placeholder: document.getElementById("dossierContainer1"),
            url: dossierUrl,
            instance: jsonRes['instance'],
            enableResponsive: false,
            errorHandler: function () {
              this.spinnerService.hide()
            }.bind(this),
            dockedFilter: {
              dockedPosition: "left",
              canClose: false,
              dockChangeable: false,
              isDocked: true
            },
            enableCustomAuthentication: true,
            customAuthenticationType: microstrategy.dossier.CustomAuthenticationType.AUTH_TOKEN,
            getLoginToken: function () {
              return new Promise(function (resolve, reject) {
                resolve(jsonRes['authToken'])
              }).then(function () {
                  return jsonRes['authToken'];
              })
            },
          }).then((dossier) => {
          dossier.getFilterList().then(function (filterList) {
            this.setEvaluationFormQA(this.category);

            //Select conversation ID handler
            dossier.registerEventHandler(
              "onGraphicsSelected",
              this.conversationIdselectHandler);
            this.AgentDDL = true;
            this.spinnerService.hide();
          }.bind(this));
        }).catch((e) => {
          this.spinnerService.hide();
        }).finally(function () {
          setTimeout(() => {
            this.spinnerService.hide();
          }, 10000);
        }.bind(this));
        });
      } catch (e) {
        console.log(e);
        this.spinnerService.hide();
      }
    }
    else {
      this.category = "";
      this.spinnerService.hide();
    }
  }

  //Create instance for the prompt for the particular evaluation
  getInstanceIDfromMSTR = (project_id, dossierId, AUTH_TOKEN, category) => {
    let params = {
      projectId: project_id,
      dossierId: dossierId,
      authToken: AUTH_TOKEN,
      evaluationFormName: category
    }
    return new Promise((res, rej) => {
      this.ew_NACDservice.getMSTRInstance(params).subscribe(
        (data: any) => {
          if (data['isSuccess'].toLowerCase() === 'success') {
            res(data.result)
          }
        },
        (err) => {
          console.log(err)
          this.commonMethods.addToastforlongtime(false, err.error.isSuccess == 'failed' ? 'Request failed to fetch the instances ' : err.error.result?.message)
          rej(err)
        }
      )
    })
  }

  conversationIdselectHandler = (e) => {
    let selectionName = null;
    let selectionObjConvId: any;
    for (let i = 0; i < e.graphics.length; i++) {
      let selection = e.graphics[i];
      // single attribute selection:
      selectionName = selection[0].n;
      if (selectionName != 'Conversation ID') {
        return false
      }
      // this.spinnerService.show();
      let selectionValue = selection[0].vid;
      let selectionText = selection[0].v;
      selectionObjConvId = {
        name: selectionName,
        value: selectionValue,
        text: selectionText
      }
    }
    this.currentContact = selectionObjConvId?.text != undefined ? selectionObjConvId.text : "";
    this.totalScore = 0;
    this.totalQues = 0;
    this.totalNotes = 0;
    this.getTopicReport = [];
    this.transcriptTab = [];
    this.videoUrl = [];
    this.activeTab = this.items1[0]
    this.tabMenuName = "Transcript"
    this.notesPopup = false;
    this.playerSelectedCategories = this.playerDisplayCategories
    this.playbackIndex = '1.0';  
    this.selectedIndex = 2;
    if($("#audio-spectrum").hasClass('autoHeight')){
      //console.log("before toggle called")
        $("#audio-spectrum").removeClass('autoHeight')
      }
    this.isAudioSpinner = true;
    this.isEvaluationForm = true;
    this.isAudioPlayerShow = true;
    this.isSwitchDisable = false;
    this.isEvaluationTabs = true;
    if (!this.currentContact?.includes('NON-ACD')) {
      this.nonACDAgentDropdown = false;
      // this.spinnerService.show();
      this.getTranscribeData(this.currentContact);
      this.getEvalTopic(this.currentContact);
      this.getNotes();

    } else {
      this.allNotes = [];
      this.getTopicReport = [];
      this.transcriptTab = [];
      this.videoUrl = [];
      this.nonACDAgentDropdown = true;
      this.isAudioSpinner = false;
      this.isEvaluationTabs = false;
      this.getEvalutionDetail();
      this.refreshBtn(false)
    }
  }

  getEvalTopic(conversationId) {
    // for temprary purpose :
    // this.getEvalutionDetail();
    this.mstrToken = localStorage.getItem("mstrAuthToken");
    let mstr = JSON.parse(this.mstrToken);
    let agentDDL = []
    let params = {
      customerId: UserData.customerId, 
      cookie: mstr['cookie'],
      conversationid: conversationId,
      ReportNo: "4",
      X_MSTR_AuthToken: mstr['authToken']
    }
    let params1 = {
      customerId: UserData.customerId,
      cookie: mstr['cookie'],
      conversationid: conversationId,
      ReportNo: "9",
      X_MSTR_AuthToken: mstr['authToken']
    }
    if (!this.currentEvaluationDetails.evalRoomIsNonACD) {
      this.agentDDLform = [];
    }
    this.evalFormAgent = "";
    agentDDL = [];
    let topicData = [];
    this.isAudioSpinner = true;
    this.refreshBtn(false)

    this.spinnerService.show();
    this.interactionService.GetReportData(params).subscribe(
      (data: any) => {
        if (data.ReportData.result.data.root != null) {
          this.audioEndpoint = data.ReportData.result.data.root.children[0].children[0].children[0].children[0].children[0].children[0].children[0].element.name;
          this.getTopicReport = data.ReportData.result.data.root.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children;
          this.getReportEvalname = data.ReportData.result.data.root.children[0].children[0].children[0].element.name;
          this.getQueueLoopAgent = data.ReportData.result.data.root.children[0].children[0].children[0].children
          //console.log(this.getTopicReport)
          this.getTopicReportTime = topicData;
          this.getTopicReport.forEach(topic => {
            topic.children.forEach(topicTime => {
                const topicDetail = {
                  time: topicTime.element.name,
                  topic: topic.element.name
                }
                topicData.push(topicDetail);
                topicData.sort(this.commonMethods.compareValues('time'))
            });
          });
          // this.getQueueLoopAgent.forEach(element => {
          //   element.children[0].children.forEach(item => {
          //     let labelValue = {
          //       label: item.element.formValues.DESC,
          //       value: item.element.formValues.ID
          //     }

          //     agentDDL.push(labelValue);
          //   });
          // });
          this.getQueueLoopAgent.forEach(id => {
            id.children.forEach(item1 => {
              item1.children.forEach(item => {
                const labelValue = {
                  label: item.element.formValues.DESC,
                  value: item.element.formValues.ID,
                  queueDetail: {
                    name: item1.element.name,
                    id: id.element.name
                  }
                }
                agentDDL.push(labelValue);
              });
            });
          });
          // console.log(JSON.stringify(agentDDL))
          if (conversationId != null || conversationId != "" && !this.currentContact.includes('NON-ACD')) {
            this.agentDDLform = agentDDL
            this.evalFormAgent = this.agentDDLform[0].value;
            this.getEvalutionDetail();
          } else {
            agentDDL = [];
            if (!this.currentEvaluationDetails.evalRoomIsNonACD) {
              // this.agentDDLform = [];
            }
          }
          this.isEvaluationTabs = false;
          this.getSignedURL();
          this.spinnerService.hide();
        }
        else {
          this.spinnerService.hide();
        }
      },
      (error) => {
        console.log(error);
        this.isEvaluationTabs = false;
        this.spinnerService.hide();
      }
    ) 
    let sentimentBy_Data = [];
    this.interactionService.GetReportData(params1).subscribe(
      (data: any) => {
        if (data.ReportData.result.data.root != null) {
          this.sentiment_data = data
          //if(this.sentiment_data.ReportData.result.data.root.children[0] != undefined){
            this.sentimentBySentence_data = data.ReportData.result.data.root.children[0].children
            this.sentenceSentiment = sentimentBy_Data
            this.sentimentBySentence_data.forEach(item => {
              item.children.forEach(sentiItem => {
                  const sentimentDetail = {
                    sentiment: sentiItem.element.name,
                    start_time: sentiItem?.children[0]?.element?.name,
                    end_time: sentiItem?.children[0]?.children[0]?.element?.name
                  }
                  sentimentBy_Data.push(sentimentDetail);
                  //sentimentBy_Data.sort(this.commonMethods.compareValues('start_time'))
              });
            });
            this.isEvaluationTabs = false;
            this.getSignedURL();
          }
        else{
          this.spinnerService.hide();
        }
        //this.refreshBtn(false)
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }

  getSignedURL() {
    const regExp = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (regExp.test(this.audioEndpoint)) {
      this.ew_NACDservice.getEvaluateObj(this.audioEndpoint).subscribe(
        (data: any) => {
          this.audioUrl = data.url
          setTimeout(() => {
            //console.log("setTimeOut called")
            this.refreshBtn(true);
            this.spinnerService.hide();
          }, 2100);
        }
      )
    }
  }

  playandpause() {
    if (typeof (this.ws) == 'object' && typeof (this.ws.play) == 'function' && typeof (this.ws.pause) == 'function') {
      $('#play-btn').find('i').toggleClass('fa-pause');
      if ($('#play-btn').attr("value") == "play") {
        $('#play-btn').attr("value", "pause");
        this.ws.play();
      } else {
        $('#play-btn').attr("value", "play");
        this.ws.pause();
      }
    }
  }

  skipForward() {
    if (typeof (this.ws) == 'object' && typeof (this.ws.skipForward) == 'function') {
      this.ws.skipForward(10);
    }
  }

  skipBackward() {
    if (typeof (this.ws) == 'object' && typeof (this.ws.skipBackward) == 'function') {
      this.ws.skipBackward(10);
    }
  }

  volumeChange() {
    const volumeSlider = document.querySelector("#volumeSlider")
    if (typeof (this.ws) == 'object' && typeof (this.ws.toggleMute) == 'function') {
      $('#mute').find('i').toggleClass('fa-volume-up fa-volume-off');
      this.ws.toggleMute();
      const isMuted = this.ws.getMute()
      
      if (isMuted) {
        // volumeIcon.src = "assets/icons/mute.svg"
        //volumeSlider.disabled = true
        this.disableMute = true
      } else {
        // volumeSlider.disabled = false
        // volumeIcon.src = "assets/icons/volume.svg"
        this.disableMute = false
      }
    }
  }

  // Find audio for topics
  findTopic_Audio(topic) {
    if (typeof (this.ws) == 'object') {
      // console.log("OBJ")
      this.ws.setCurrentTime(topic.children[0].element.name);
    }
  }

  // Find audio for transcript
  trancriptSF(time) {
    if (typeof (time) == 'string') {
      time = parseInt(time.replace('s', ''))
    }
    if (typeof (this.ws) == 'object') {
      this.ws.setCurrentTime(time);
    }
  }

  /*---------------------------------------------------------*/
  /* Common validation and transform functions */

  templatetoAns(val) {
    if (val != null || val != undefined) {
      let split = val.split(",");
      let Keyval = [];
      split.forEach(element => {
        let data = [];
        if (element.includes('=')) {
          data = element.split("=");
        } else if (element.includes('-')) {
          data = element.split("-");
        } else {
          data = [];
        }
        // console.log("data + data", data);
        // if(data[1]=='undefined' || data[1] == undefined || data[1]=='null' || data[1] == null) {
        //   if(data[1]=='undefined' || data[1] == undefined) {
        //   data[1] = 0;
        // }
        const valueDDL = data[0] + " " + "(" + data[1] + ")"
        const ObjVal = { Answer: data[0], Score: data[1] }
        Keyval.push({ label: valueDDL, value: ObjVal });
      });
      return Keyval;
    } else {
      return [];
    }
  }

  getTimeMediaPlayer() {
    setTimeout(() => {
      const time = this.ws.getCurrentTime().toString();
      this.getTimePlayer = time
      //console.log(this.ws.getDuration(), this.ws.getCurrentTime())
      // this.getTimePlayer = time[0].padStart(2, "0") + ":" + time[1].slice(0,2);
      // console.log(this.getTimePlayer);
    }, 10);
  }

  addnotes() {
    if (this.notesPopup == false) {
      this.notesModel = new NotesModel();
      this.notesPopup = true;
    } else {
      this.notesPopup = false;
    }
  }

  closenotes() {
    this.notesPopup = false
    this.notesModel = new NotesModel();
    this.errValNotes = false;
    this.conversationID = false;
    this.errTime = false;
  }

  saveNotes() {
    this.notesModel.conversationid = this.currentContact;
    this.notesModel.time = this.getTimePlayer;
    this.notesModel.customerId = UserData.customerId;
    if (this.notesModel.notes == '' || this.notesModel.notes == null) {
      this.errValNotes = true;

    } else {
      this.errValNotes = false;
    }
    if (this.notesModel.conversationid == '' || this.notesModel.conversationid == null) {
      this.conversationID = true;

    } else {
      this.conversationID = false;
    }
    if (this.notesModel.time == '' || this.notesModel.time == null) {
      this.errTime = true;

    } else {
      this.errTime = false;
    }
    if (this.conversationID || this.errValNotes || this.errTime) {
      return
    }

    this.ew_NACDservice.saveNotes(this.notesModel).subscribe(
      (data: any) => {
        this.notesPopup = false;
        this.getNotes();
        this.notesModel = new NotesModel();
        this.errValNotes = false;
        this.conversationID = false;
        this.errTime = false;
        this.commonMethods.addToastforlongtime(true, 'Notes Saved');
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getNotes() {
    this.ew_NACDservice.getNotes(this.currentContact).subscribe(
      (data: any) => {
        //this.allNotes = data.message;
        this.allNotes = data.message.sort(this.commonMethods.compareValues('time'))
        this.isEvaluationTabs = false;
        this.playerSelectedCategories = this.playerDisplayCategories;
        this.playbackIndex = '1.0';  
        this.selectedIndex = 2;
        if($("#audio-spectrum").hasClass('autoHeight')){
          $("#audio-spectrum").removeClass('autoHeight')
        }
        this.refreshBtn()
      },
      (error) => {
        console.log(error);
        this.isEvaluationTabs = false;
        this.spinnerService.hide();
      }
    )
  }

  deletepopup(item) {
    this.itemConvID = item.conversationid;
    this.itemId = item.id;
  }

  deleteNotes() {
    this.ew_NACDservice.deleteNotes(this.itemConvID, this.itemId).subscribe(
      (data: any) => {
        // console.log("deleteNotes",data);
        this.commonMethods.addToastforlongtime(true, 'Notes Deleted');
        this.getNotes();
        this.itemConvID = null;
        this.itemId = null;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  async getEvaluationAns() {
    this.spinnerService.show();
    await this.ew_NACDservice.getEvaluationAns(this.currentContact, this.selectedEvalItem.evaluationId, this.evalFormAgent, this.selectedEvalItem.evaluationRoomName, this.selectedEvaluator).subscribe(
      async (data: any) => {
        if (data != null) {
          await data[0].questionsList.forEach((dataques: any, topicJ) => {
            dataques.Topics.questions.forEach((element, quesI) => {

              // Question data convert to float value
              if (element.questionData != undefined) {
                element?.questionData.forEach(elementQD => {
                  if (elementQD.value?.Score != null || elementQD.value?.Score != '') {
                    if (element?.displaytype?.value != "radio" && element.answerdata?.Score != null && element.answerdata?.Score.toString().includes('.')) {
                      if(elementQD.value?.Score?.toString()?.split('.')[1]?.length>1) {
                      elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                    } else {
                      // elementQD.value.Score = elementQD.value.Score;
                      if(element.answerdata?.Score?.toString()?.split('.')[1]?.length>1) {
                        elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                      } else if(element.answerdata?.Score?.toString()?.split('.')[1]?.length==1) {
                        elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(1).toString();
                      } else {
                        elementQD.value.Score = elementQD.value.Score;
                      }
                    }
                  } else {
                    elementQD.value.Score = elementQD.value.Score;
                  }
                  }
                });
              }

              // Default value assigning block for Answer data
              if (element.questionid == element.questionid) {
                if (element.questionChoice != 'Number' && element.questionChoice != 'Comments') {

                  if ((data[0].evaluation_status == 'InComplete' || data[0].evaluation_status == 'Incomplete') && (element.answerdata == null || (element.answerdata.Answer == null || element.answerdata.Score == null))) {
                    if ((element.defaultanswer != null || element.defaultanswer != undefined)) {
                      if (element?.displaytype?.value == "radio" && element.questionChoice == 'Choice') {
                        // element.answerdata = element.defaultanswer?.Answer;
                        if (element.answerdata?.Answer != undefined) {
                          element.answerdata = element.defaultanswer?.Answer;
                        } else {
                          element.answerdata = element.defaultanswer;
                        }
                      } else if (element?.displaytype?.value == "radio" && element.questionChoice == 'Yes/No') {
                        // element.answerdata = element.defaultanswer.Score;
                        // element.answerdata = element.defaultanswer.Answer;
                        if (element.answerdata?.Answer != undefined) {
                          element.answerdata = element.defaultanswer?.Answer;
                        } else {
                          element.answerdata = element.defaultanswer;
                        }
                      } else {
                        // element.answerdata = element.defaultanswer;
                        element.questionData.forEach((quesData, indexQD) => {
                          if (quesData.value.Answer == element.defaultanswer || quesData.value.Answer == element.defaultanswer?.Answer) {
                            element.answerdata = quesData?.value;
                          }
                        });
                      }
                    } else {
                      if (element?.displaytype?.value == "radio" && element.questionChoice == 'Choice') {
                        element.answerdata = element.answerdata?.Answer;
                      } else if (element?.displaytype?.value == "radio" && element.questionChoice == 'Yes/No') {
                        // element.answerdata = element.answerdata?.Score;
                        element.answerdata = element.answerdata?.Answer;
                      } else {
                        // element.answerdata = element.answerdata;
                        element.questionData.forEach((quesData, indexQD) => {
                          if (quesData.value.Answer == element.answerdata || quesData.value.Answer == element.answerdata?.Answer) {
                            element.answerdata = quesData?.value;
                          }
                        });
                      }
                      // else {
                      //   element.questionData.forEach((quesData, indexQD) => {
                      //     if(quesData.value.Answer == element.answerdata || quesData.value.Answer == element.answerdata?.Answer) {
                      //       element.answerdata = quesData?.value;
                      //     }
                      //   });
                      // }
                    }
                  } else {
                    if (element?.displaytype?.value == "radio" && element.questionChoice == 'Choice') {
                      // element.answerdata = element.answerdata?.Answer;
                      if (element.answerdata?.Answer != undefined) {
                        element.answerdata = element.answerdata?.Answer;
                      } else {
                        element.answerdata = element.answerdata;
                      }
                    } else if (element?.displaytype?.value == "radio" && element.questionChoice == 'Yes/No') {
                      // element.answerdata = element.answerdata?.Score;
                      // element.answerdata = element.answerdata?.Answer;
                      if (element.answerdata?.Answer != undefined) {
                        element.answerdata = element.answerdata?.Answer;
                      } else {
                        element.answerdata = element.answerdata;
                      }
                    } else {
                      // element.answerdata = element.answerdata;
                      element.questionData.forEach((quesData, indexQD) => {
                        if (quesData.value.Answer == element.answerdata || quesData.value.Answer == element.answerdata?.Answer) {
                          element.answerdata = quesData?.value;
                        }
                      });
                    }
                  }

                } else if (element.questionChoice == 'Number') {
                  if ((data[0].evaluation_status == 'InComplete' || data[0].evaluation_status == 'Incomplete') && (element.defaultanswer != null || element.defaultanswer != undefined)) {
                    element.numberValue = element.defaultanswer;
                  } else {
                    element.numberValue = element.numberValue;
                  }


                  // if(element.numberValue == null || element.numberValue == undefined) {
                  //   if((element.defaultanswer != null || element.defaultanswer != undefined) && (element.numberValue == null || element.numberValue == '') ) {
                  //     element.numberValue = element.defaultanswer;
                  //   } else {
                  //     if(element.numberValue != null ) {
                  //       element.numberValue = element.numberValue;

                  //     // if((element.numberValue?.toString().split('.')[1] !='0' && element.numberValue?.toString().split('.')[1]!='00') ) {
                  //     //   element.numberValue = parseFloat(element.numberValue).toFixed(1);
                  //     // } else {
                  //     //   if(element.numberValue != null) {
                  //     //     element.numberValue = parseInt(element.numberValue);
                  //     //   } else {
                  //     //     element.numberValue = element.numberValue;
                  //     //   }
                  //     // }

                  //     }

                  //   }
                  // } else {
                  //   if(element.numberValue != null) {
                  //     element.numberValue = parseInt(element.numberValue);
                  //   } else {
                  //     element.numberValue = element.numberValue;
                  //   }
                  // }
                  // if(element.numberValue == "NaN") {
                  //   element.numberValue = null;
                  // }
                } else if (element.questionChoice == 'Comments') {
                  element.answerdata = element.answerdata;
                }
              }

              this.questionsList.forEach((elementT: any) => {
                elementT.Topics.questions.forEach(elementQ => {
                  if (element.questionid == elementQ.questionid) {

                    // Question data convert to float value
                    if (elementQ.questionData != undefined) {
                      elementQ.questionData.forEach(elementQD => {
                        if (elementQD.value?.Score != null || elementQD.value?.Score != '') {
                          // elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                          if (element?.displaytype?.value != "radio" && element.answerdata?.Score != null && element.answerdata?.Score.toString().includes('.')) {
                            // elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                            if(elementQD.value?.Score?.toString()?.split('.')[1]?.length>1) {
                              elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                            } else {
                              if(element.answerdata?.Score?.toString()?.split('.')[1]?.length>1) {
                                elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                              } else if(element.answerdata?.Score?.toString()?.split('.')[1]?.length==1) {
                                elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(1).toString();
                              } else {
                                elementQD.value.Score = elementQD.value.Score;
                              }

                              if(element.answerdata?.Score?.toString()?.split('.')[1]?.length>1) {
                                elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                              } else if(element.answerdata?.Score?.toString()?.split('.')[1]?.length==1) {
                                elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(1).toString();
                              } else {
                                elementQD.value.Score = elementQD.value.Score;
                              }
                              
                            }
                          } else {
                            elementQD.value.Score = elementQD.value.Score;
                          }
                        }
                      });
                    }

                    // Default value assigning block for Conditional skip data
                    if (element.questionChoice != 'Number' && elementQ.questionChoice != 'Number' && element.questionChoice != 'Comments') {

                      if ((data[0].evaluation_status == 'InComplete' || data[0].evaluation_status == 'Incomplete')) {
                        if ((element.defaultanswer != null || element.defaultanswer != undefined)) {
                          if (element?.displaytype?.value == "radio" && element.questionChoice == 'Choice') {
                            // elementQ.answerdata = element.defaultanswer?.Answer;
                            if (element.defaultanswer?.Answer != undefined) {
                              elementQ.answerdata = element.defaultanswer?.Answer;
                            } else {
                              elementQ.answerdata = element.defaultanswer;
                            }
                          } else if (element?.displaytype?.value == "radio" && element.questionChoice == 'Yes/No') {
                            // elementQ.answerdata = element.defaultanswer.Score;
                            // elementQ.answerdata = element.defaultanswer.Answer;
                            if (element.defaultanswer.Answer != undefined) {
                              elementQ.answerdata = element.defaultanswer.Answer;
                            } else {
                              elementQ.answerdata = element.defaultanswer;
                            }
                          } else {
                            // elementQ.answerdata = element.defaultanswer;
                            element.questionData.forEach((quesData, indexQD) => {
                              if (quesData.value.Answer == element.answerdata || quesData.value.Answer == element.answerdata?.Answer) {
                                elementQ.answerdata = quesData?.value;
                              }
                            });
                          }
                        } else {
                          if (element?.displaytype?.value == "radio" && element.questionChoice == 'Choice') {
                            elementQ.answerdata = element.answerdata?.Answer;
                          } else if (element?.displaytype?.value == "radio" && element.questionChoice == 'Yes/No') {
                            // elementQ.answerdata = element.answerdata?.Score;
                            elementQ.answerdata = element.answerdata?.Answer;
                          } else {
                            // elementQ.answerdata = element.answerdata;
                            element.questionData.forEach((quesData, indexQD) => {
                              if (quesData.value.Answer == element.answerdata || quesData.value.Answer == element.answerdata?.Answer) {
                                elementQ.answerdata = quesData?.value;
                              }
                            });
                          }
                        }
                      } else {
                        if (element?.displaytype?.value == "radio" && element.questionChoice == 'Choice') {
                          if (element.answerdata?.Answer != undefined) {
                            elementQ.answerdata = element.answerdata?.Answer;
                          } else {
                            elementQ.answerdata = element.answerdata;
                          }
                        } else if (element?.displaytype?.value == "radio" && element.questionChoice == 'Yes/No') {
                          // elementQ.answerdata = element.answerdata?.Score;
                          if (element.answerdata?.Answer != undefined) {
                            elementQ.answerdata = element.answerdata?.Answer;
                          } else {
                            elementQ.answerdata = element.answerdata;
                          }
                        } else {
                          // elementQ.answerdata = element.answerdata;
                          element.questionData.forEach((quesData, indexQD) => {
                            if (quesData.value.Answer == element.answerdata || quesData.value.Answer == element.answerdata?.Answer) {
                              elementQ.answerdata = quesData?.value;
                            }
                          });
                        }
                      }

                    } else if (elementQ.questionChoice == 'Number') {
                      if ((data[0].evaluation_status == 'InComplete' || data[0].evaluation_status == 'Incomplete') && (elementQ.defaultanswer != null || elementQ.defaultanswer != undefined)) {
                        // elementQ.numberValue = elementQ.defaultanswer;
                        elementQ.numberValue = elementQ.defaultanswer;
                      } else {
                        elementQ.numberValue = element.numberValue;
                      }

                      // if(elementQ.numberValue == undefined || elementQ.numberValue == null) {
                      //   if((element.defaultanswer != null || element.defaultanswer != undefined) && (element.numberValue == null || element.numberValue == '') ) {
                      //     // elementQ.numberValue = parseInt(element.defaultanswer);
                      //     elementQ.numberValue = element.defaultanswer;
                      //   } else {
                      //     if(element.numberValue != null ) {
                      //       elementQ.numberValue = element.numberValue;

                      //     // if((element.numberValue?.toString().split('.')[1] !='0' && element.numberValue?.toString().split('.')[1]!='00') ) {
                      //     //   elementQ.numberValue = parseFloat(element.numberValue).toFixed(1);
                      //     // } else {
                      //     //   // elementQ.numberValue = parseInt(element.numberValue);
                      //     //   if(element.numberValue != null) {
                      //     //     elementQ.numberValue = parseInt(element.numberValue);
                      //     //   } else {
                      //     //     elementQ.numberValue = element.numberValue;
                      //     //   }
                      //     // }
                      //     // // elementQ.numberValue = element.numberValue;
                      //   }
                      //   }
                      // } else {
                      //   if(element.numberValue != null) {
                      //     elementQ.numberValue = parseInt(element.numberValue);
                      //   } else {
                      //     elementQ.numberValue = element.numberValue;
                      //   }
                      // }
                    } else if (elementQ.questionChoice == 'Comments') {
                      elementQ.answerdata = element.answerdata;
                    }

                  }
                });
              });
          });
          });


          // console.log('this.questionsList', this.questionsList);

          // Conditional Skip Process start section
          await data[0].questionsList.forEach((dataques: any, topicJ) => {
            dataques.Topics.questions.forEach((element, quesI) => {

              // Replace Undefiend object value to Empty string
              if (element.questionData != undefined && element.questionData != null) {
                element.questionData.forEach(elementlabel => {
                  elementlabel.label = elementlabel.label.replace(' (undefined)', '');
                  // elementlabel.value.Score = elementlabel.value.Score=='undefined' || elementlabel.value.Score==null?'0':elementlabel.value.Score;
                  // if(elementlabel.value.Score == undefined || elementlabel.value.Score == null) {
                  //   elementlabel.value.Score = 0;
                  // }
                });
              }

              if (element.questionChoice == "Choice" || element.questionChoice == "Yes/No") {
                element.questionData = this.templatetoAns(element.questionValue);
              }
              if (element.conditionalSkipQuestion == undefined) {
                element.conditionalSkipQuestion = true;
              }
              if (element.conditionalSkip && element.conditionalSkipDetails != undefined) {
                element.conditionalSkipQuestion = false;
              }
              // if(element.conditionalSkipQuestion == null && element.conditionalSkipQuestion == undefined ) {
              if (topicJ == 0 && quesI == 0) {
                if ((data[0].questionsList[0].Topics.questions[0]?.answerdata?.Answer != null && element.answerdata?.Score != null) || data[0].questionsList[0].Topics.questions[0]?.numberValue != null) {
                  this.conditionalSkipQuestionShow(topicJ, quesI, data[0].questionsList, 1);
                } else {
                  this.conditionalSkipQuestionShow(topicJ, quesI, data[0].questionsList, 1);
                  if (element?.conditionalSkipQuestion == undefined) {
                    // element.conditionalSkipQuestion = true;
                  }
                }
              } else {
                this.conditionalSkipQuestionShow(topicJ, quesI, data[0].questionsList, 1);
              }
              // }
            });
            if (data.topicShowHide == undefined) {
              data.topicShowHide = true;
            } else {
              data.topicShowHide = true;
            }
            if (topicJ == 0) {
              dataques.topicShowHide = true;
            }
          });
          // console.log("data[0].questionsList", data[0].questionsList);

          // this.questionsList = data[0].questionsList;
          this.resetQuesList = this.questionsList;
          this.eval_Status = data[0].evaluation_status;
          this.disableqa = (data[0].disableqa == undefined || data[0].disableqa == null) ? false : data[0].disableqa;
          // this.disablecoach = (data[0].disablecoach == undefined || data[0].disablecoach == null) ? false : data[0].disablecoach;
          this.allowResubmit = data[0].allowResubmit

          // this.evaluatesaveModel.evaluation_coach = data[0].evaluation_coach
          // await this.CalculateScore();
          await this.CalculateScore();

          if (data[0].evaluation_status != undefined || data[0].evaluation_status != null) {
            if (data[0].evaluation_status.toLowerCase() == 'complete') {
              // this.coachFlag = false;
              this.saveFlagDisable = true;
            } else {
              // this.coachFlag = true
              this.saveFlagDisable = false;
            }
          }
          this.spinnerService.hide();
        }

      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }

  testtt(answerdata) {
    // console.log('answerdata', answerdata);
  }

   reloadWorkspace() {
    this.mstrTokenService.refreshMSTRSession();
  //   this.spinnerService.show();
  //   this.mstrTokenService.ReloadWorkspace().subscribe(
  //     (data: any) => {
  //       this.mstrTokenService.recreateMSTRsession(data);
  //       this.spinnerService.hide();
  //       window.location.reload();
  //     },
  //     (error) => {
  //       console.log(error);
  //       this.spinnerService.hide();
  //     }
  //   )
   }

  async getEvalutionDetail() {
    // console.log(this.selectedEvalItem);
    // Evaluation Form reset section

    this.spinnerService.show();
    await this.questionsList.forEach((data: any) => {
      data.Topics.questions.forEach(element => {
        if (element.questionChoice == 'Choice') {
          if (element.answerdata != undefined && element.answerdata != null) {
            if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
              element.answerdata = null
            }
          }
        }
        if (element.questionChoice == 'Yes/No') {
          if (element.answerdata != undefined && element.answerdata != null) {
            if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
              element.answerdata = null
            }
          }
        }
        if (element.questionChoice == 'Number') {
          if (element.numberValue != null || element.numberValue != undefined && element.numberValue != '') {
            element.numberValue = null;
          }
        }
        if (element.questionChoice == 'Comments') {
          if (element.answerdata != null || element.answerdata != undefined && element.answerdata != '') {
            element.answerdata = null
          }
        }
      });
    })


    this.ew_NACDservice.getEvalutionDetail(this.currentContact, this.selectedEvalItem.evaluationId, this.evalFormAgent, this.selectedEvalItem.evaluationRoomName, 
      this.currentContact.includes('NON-ACD')?true:false).subscribe(
      (data: any) => {
        if (data != null) {
          this.evaluatorDropdown = [];
          this.ismoderator = data.ismoderator;
          data.evaluatordetail.forEach(element => {
            this.evaluatorDropdown.push(element);
          });
          this.selectedEvaluator = (this.evaluatorDropdown.length > 0) ? this.evaluatorDropdown[0].value : "";
          this.getEvaluationAns();
          this.spinnerService.hide();
          // if(this.currentEvaluationDetails.evalRoomIsNonACD) {
          if ((this.currentContact != null || this.currentContact != "") && this.currentContact.includes('NON-ACD')) {
            if (data.agentdetail[0].label != null && data.agentdetail[0].value != null) {
              this.agentDDLform = data.agentdetail;
              this.evalFormAgent = data.agentdetail[0].value;
            }
          }
          // }
        }
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }

  roleslist() {
    this.localRole = UserData.role
    this.loginService.getRoleData.subscribe(
      (data: any) => {
        if (data.roleEvaluationFormID != null || data.roleEvaluationFormID != undefined) {
          this.roleEvalForm = data.roleEvaluationFormID;
          // this.roleEvalFormName = this.evaluationItem.filter(s=>s.evaluationId==data.roleEvaluationFormID)[0].evaluationRoomName;
        }
      }, (error) => {
        console.log('error', error);
      }
    )
  }

  textAreaKeys(event) {
    if ((event.keyCode == 13 || event.charCode == 13) || (event.keyCode == 124 || event.charCode == 124) || (event.keyCode == 92 || event.charCode == 92) || (event.keyCode == 47 || event.charCode == 47)) {
      event.preventDefault();
    }
  }

  keyPress(event: any) {
    // const pattern = /[0-9\+\-\ ]/;
    // const inputChar = String.fromCharCode(event.charCode);
    // if (event.keyCode != 8 && !pattern.test(inputChar)) {
    //   event.preventDefault();
    // }

    if ((event.keyCode == 45 || event.charCode == 45)) {
      // || (event.keyCode == 46 || event.charCode == 46)
      event.preventDefault();
    }
  }

  
  // descValue:string = "";
  conformPopOver(i, j) {
    //   // this.descValue = "";
    // this.isCopy = false;
    if (this.isConformBox == false) {
      this.indexTexti = i;
      this.indexTextj = j;
      this.isConformBox = true;
      // setTimeout(() => {
        //  this.isConformBox = false;
      // }, 12500);
      // window.addEventListener('click', ()=>{
      //     confirmPop();
      // })
      // const confirmPop = () => {
      //   this.isConformBox = false;
      // }
      
    } else {
      this.isConformBox = false;
      this.indexTexti = i;
      this.indexTextj = j;
    }
  }
  
  tickFun(i, j, val) {
  //  let ele = document.getElementById('hyper').textContent
  //  console.log(ele)
    this.isConformBox = false;
    // console.log(val)
     this._clipboardService.copy(val);
    this.indexTexti = i;
    this.indexTextj = j;
    this.isCopy = true;
    setTimeout(() => {
      this.isCopy = false;
    }, 2000);
  }

  crossFun(i, j) {
    this.isConformBox = false;
    this.indexTexti = i;
    this.indexTextj = j;
    this.isCopy = false;
  }

  // Reset evaluation form Que&Ans data
  resetModel() {
    // console.log(this.eval_Status.toLowerCase())
    if (!this.currentEvaluationDetails.evalRoomIsNonACD) {

      if (this.currentContact == '' || this.currentContact == null) {
        this.commonMethods.addToastforlongtime(false, 'Please select interactions to reset the evaluation');
      } else if (this.eval_Status.toLowerCase() == 'incomplete' && (this.currentContact != '' || this.currentContact != null)) {
        this.commonMethods.addToastforlongtime(false, 'Selected interaction has no record');
      } else {
        document.getElementById('modalOpen').click();
      }
    } else {
      if (this.currentEvaluationDetails.evalRoomIsNonACD && this.currentContact == '' || this.currentContact == null) {
        this.commonMethods.addToastforlongtime(false, 'Please select interactions to reset the evaluation');

        // this.questionsList.forEach((data: any) => {
        //   data.Topics.questions.forEach(element => {
        //     if (element.questionChoice == 'Choice') {
        //       if (element.answerdata != undefined && element.answerdata != null) {
        //         if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
        //           element.answerdata = null
        //         }
        //       }
        //     }
        //     if (element.questionChoice == 'Yes/No') {
        //       if (element.answerdata != undefined && element.answerdata != null) {
        //         if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
        //           element.answerdata = null
        //         }
        //       }
        //     }
        //     if (element.questionChoice == 'Number') {
        //       if (element.numberValue != null || element.numberValue != undefined && element.numberValue != '') {
        //         element.numberValue = null;
        //       }
        //     }
        //     if (element.questionChoice == 'Comments') {
        //       if (element.answerdata != null || element.answerdata != undefined && element.answerdata != '') {
        //         element.answerdata = null
        //       }
        //     }
        //   });
        // })
        // this.totalNotes = 0;
        // this.totalScore = 0;
        // this.totalQues = 0;
        // this.resetQuesList = [];

      } else {
        if (this.currentContact == '' || this.currentContact == null) {
          this.commonMethods.addToastforlongtime(false, 'Please select interactions to reset the evaluation');
        } else if (this.eval_Status.toLowerCase() == 'incomplete' && (this.currentContact != '' || this.currentContact != null)) {
          this.commonMethods.addToastforlongtime(false, 'Selected interaction has no record');
        } else {
          document.getElementById('modalOpen').click();
        }
      }
    }
  }

  async resetData() {
    await this.resetQuesList.forEach((data: any) => {
      data.Topics.questions.forEach(element => {
        if (element.questionData != undefined && element.questionData != null) {
          element.questionData.forEach(elementlabel => {
            elementlabel.label = elementlabel.label.replace(' (undefined)', '');
            // if(elementlabel.value.Score == undefined || elementlabel.value.Score == null) {
            //   elementlabel.value.Score = 0;
            // }
          });
        }
        if (element.conditionalSkipQuestion == undefined) {
          element.conditionalSkipQuestion = true;
        }
        if (element.conditionalSkip && element.conditionalSkipDetails != undefined) {
          // element.conditionalSkipQuestion = false;
          element.conditionalSkipQuestion = true;
        }
      });
      if (data.topicShowHide == undefined) {
        data.topicShowHide = true;
      } else {
        data.topicShowHide = true;
      }
    });
    this.questionsList = this.resetQuesList;
    let type;

    // if (this.currentEvaluationDetails?.evalRoomIsNonACD) {
    if (this.currentContact.includes('NON-ACD')) {
      type = 'NON-ACD';
    } else {
      type = 'ACD';
    }
    this.spinnerService.show();
    this.ew_NACDservice.resetEvalData(this.selectedEvaluator, type).subscribe(
      (data: any) => {
        this.questionsList.forEach((data: any) => {
          data.Topics.questions.forEach(element => {
            if (element.questionChoice == 'Choice') {
              if (element.answerdata != undefined && element.answerdata != null) {
                if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
                  element.answerdata = null
                }
              }
            }
            if (element.questionChoice == 'Yes/No') {
              if (element.answerdata != undefined && element.answerdata != null) {
                if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
                  element.answerdata = null
                }
              }
            }
            if (element.questionChoice == 'Number') {
              if (element.numberValue != null || element.numberValue != undefined && element.numberValue != '') {
                element.numberValue = null;
              }
            }
            if (element.questionChoice == 'Comments') {
              if (element.answerdata != null || element.answerdata != undefined && element.answerdata != '') {
                element.answerdata = null
              }
            }
          });
        })
        this.totalNotes = 0;
        this.totalScore = 0;
        this.totalQues = 0;
        this.resetQuesList = [];
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(true, data.result);
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    );
  }

  async nonACDresetData() { 
    this.nonACDAgentDropdown = true;
    // this.spinnerService.show();
    // Interaction player reset section
    this.audioUrl = '';
    this.refreshBtn();

    // Transcript, Topics & Notes reset section
    this.currentContact = '';
    this.transcriptTab = [];
    this.videoUrl = [];
    this.getTopicReport = [];
    this.allNotes = [];
    this.evalFormAgent = null;
    this.saveFlagDisable = false;
    this.isAudioPlayerShow = true;
    this.isEvaluationForm = true;
    this.isSwitchDisable = false;
    //this.ws.destroy();

    // Evaluation Form reset section
    await this.questionsList.forEach((data: any) => {
      data.Topics.questions.forEach(element => {
        if (element.questionChoice == 'Choice') {
          if (element.answerdata != undefined && element.answerdata != null) {
            if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
              element.answerdata = null;
            } else {
              element.answerdata = null;
            }
          }
        }
        if (element.questionChoice == 'Yes/No') {
          if (element.answerdata != undefined && element.answerdata != null) {
            if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
              element.answerdata = null;
            } else {
              element.answerdata = null;
            }
          }
        }
        if (element.questionChoice == 'Number') {
          if (element.numberValue != null || element.numberValue != undefined && element.numberValue != '') {
            element.numberValue = null;
          }
        }
        if (element.questionChoice == 'Comments') {
          if (element.answerdata != null || element.answerdata != undefined && element.answerdata != '') {
            element.answerdata = null;
          }
        }
      });
    })
    // Evaluation Form Conditional skip visibility changes
    this.getEvalutionItems();
    this.totalNotes = 0;
    this.totalScore = 0;
    this.totalQues = 0;
    this.resetQuesList = [];
    this.spinnerService.hide();
    // if(this.agentDDLform.length == 0 || this.agentDDLform.length == 1) {
    this.getCustomDataDDL();
    // }
  }

  async ReloadData() {
    // this.getEvalutionItems();
    this.formLevelDossierIdList = [];
    await this.getConfigFormDossierId(this.evaluationItem.filter(s=>s.evaluationRoomName==this.category)[0]).then(() => {

     if(this.formLevelDossierIdList[0]?.value != undefined && this.formLevelDossierIdList[0]?.value != null && this.formLevelDossierIdList[0]?.value != "") {
      this.validateMstrReportId(this.formLevelDossierIdList[0]?.value).then((validIdRes: any) => {
        if (validIdRes['isSuccess'].toLowerCase() == 'success') {

          if (!!document.getElementById('dossierContainer1')) {
            if (this.isloadSpinner == false) {
              document.getElementById('dossierContainer1').style.display = 'none';
              this.isloadSpinner = true;
              const tableId = document.getElementById('dossierContainer1');
              microstrategy.dossier.destroy({ placeholder: tableId });
            }
            this.workspaceTable();
            this.spinnerService.hide();
            setTimeout(() => {
              this.isloadSpinner = false;
              document.getElementById('dossierContainer1').style.display = 'block';
            }, 7000);
          }

        } else {
          return this.commonMethods.addToastforlongtime(false, "Invalid Dossier Id")
        }
      },(onRejected) => {
      // setTimeout(() => {
        this.category = '';
        const getTableId = document.getElementById('dossierContainer1');
          if (!!document.getElementById('dossierContainer1')) {
            getTableId.style.display = 'none'
            microstrategy.dossier.destroy({ placeholder: getTableId });
          }
        // }, 200);
        this.spinnerService.hide();
      });
     } else {
      if (!!document.getElementById('dossierContainer1')) {
        if (this.isloadSpinner == false) {
          document.getElementById('dossierContainer1').style.display = 'none';
          this.isloadSpinner = true;
          const tableId = document.getElementById('dossierContainer1');
          microstrategy.dossier.destroy({ placeholder: tableId });
        }
        this.workspaceTable();
        this.spinnerService.hide();
        setTimeout(() => {
          this.isloadSpinner = false;
          document.getElementById('dossierContainer1').style.display = 'block';
        }, 7000);
      }
     }


  });
  }

  async ReplaceSlashFuctionEvaluationForm(feedback, j, i) {
    // this.questionsList.forEach((data: any) => {
    this.questionsList.forEach((data: any, index1) => {
      data.Topics.questions.forEach((element, index) => {
        if (index1 == j && index == i) {
          if (element.questionChoice == 'Comments') {
            // console.log(element.questionChoice);
            if (feedback != null || feedback !== undefined) {
              // feedback = feedback.replace(/\//g, '');
              feedback = feedback.replace(/\\n/g, '');
              feedback = feedback.replace(/\//g, '');
              feedback = feedback.replace(/\\/g, '');
              feedback = feedback.replace(/\|/g, '');
              setTimeout(() => {
                return element.answerdata = feedback;
              }, 10);
            }
          }
        }
      });
    });
  }
  conditionalSkipCount: any = 0;
  async conditionalSkipQuestionShow(j, i, questionsList, reassign) {
    let countReset = 0;
    // formQuestioncount = 0;
    // Reset invalid Answers and their related values
    // if(countReset==0) {
    //   await this.tempraryResetData(j, i);
    // }
    // Get All Question with Answer in Evaluation Workspace
    let questionListAll = [];
    // questionListAll = questionsList;
    await questionsList?.forEach((elementT1) => {
      elementT1.Topics.questions.forEach(elementT2 => {
        questionListAll.push(elementT2);
        // formQuestioncount+=1;
      });
    });

    // Conditional Skip Question show/hide function
    // await questionListAll.forEach((elementQuestAns, indexT) => {
    await this.questionsList.forEach((elementTopic: any, indexTopic) => {
      let topicCount = 0;
      elementTopic.Topics.questions.forEach((elementQuest, indexQuestion) => {
        let count = 0;
        let conditionCheck = 0;

        //  First Qustion show Code block
        if (indexTopic == 0 && indexQuestion == 0) {
          if (elementQuest.conditionalSkipQuestion == undefined) {
            elementQuest.conditionalSkipQuestion = true;
          } else {
            elementQuest.conditionalSkipQuestion = true;
          }
        }

        if (elementQuest.conditionalSkip && elementQuest.conditionalSkipDetails != null && elementQuest.conditionalSkipDetails !== undefined) {
          if (elementQuest.conditionalSkipDetails?.conditionMet == 'Any') {

            elementQuest.conditionalSkipDetails.conditionalList.forEach(elementCSQuest => {
              questionListAll.forEach((elementQuestAns, indexT) => {
                if (elementCSQuest.conditionalQuestion?.id == elementQuestAns.questionId) {
                  // if(elementCSQuest.conditionalQuestion?.id == elementQuestAns.questionId && elementCSQuest.conditionalQuestion?.id!=undefined && elementQuestAns.questionId!=undefined) {

                  if (elementCSQuest.conditionalQuestion?.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Number') {
                    let getConditionalValues;
                    if (elementCSQuest.conditionalValue?.toString().includes('=')) {
                      getConditionalValues = elementCSQuest.conditionalValue.split('=');
                    }
                    if (elementCSQuest.conditionalValue?.toString().includes('-')) {
                      getConditionalValues = elementCSQuest.conditionalValue.split('-');
                    }
                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0)) {
                    //   count = count + 1;
                    // }
                    if (parseInt(elementQuestAns.numberValue) >= parseInt(getConditionalValues[0]) && parseInt(elementQuestAns.numberValue) <= parseInt(getConditionalValues[1])) {
                      count = count + 1;
                      conditionCheck = conditionCheck + 1;
                    } else {
                      conditionCheck = conditionCheck + 1;
                    }
                  }
                  if (elementCSQuest.conditionalQuestion?.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Choice') {
                    const getConditionalValues = elementCSQuest.conditionalValue.split(',');
                    let choiceCount = 0;
                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0)) {
                    //   count = count + 1;
                    // }
                    getConditionalValues.forEach(elementCSQVal => {
                      if (
                        // elementQuestAns.answerdata?.Answer+'='+elementQuestAns.answerdata?.Score == elementCSQVal || elementQuestAns.answerdata?.Answer+'-'+elementQuestAns.answerdata?.Score == elementCSQVal 
                        elementQuestAns.answerdata?.Answer == elementCSQVal.split('=')[0] || elementQuestAns.answerdata == elementCSQVal.split('=')[0]
                      ) {
                        choiceCount = choiceCount + 1;
                        if (choiceCount >= 1) {
                          count = count + 1;
                          conditionCheck = conditionCheck + 1;
                        }
                      } else {
                        conditionCheck = conditionCheck + 1;
                      }
                    });
                  }
                  if (elementCSQuest.conditionalQuestion?.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Yes/No') {
                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0)) {
                    //   count = count + 1;
                    // }
                    if (
                      //   elementCSQuest.conditionalValue == elementQuestAns.answerdata?.Answer+'='+elementQuestAns.answerdata?.Score || 
                      // elementCSQuest.conditionalValue == elementQuestAns.answerdata?.Answer+'-'+elementQuestAns.answerdata?.Score 
                      elementCSQuest.conditionalValue.split('=')[0] == elementQuestAns.answerdata?.Answer || elementCSQuest.conditionalValue.split('=')[0] == elementQuestAns.answerdata

                    ) {
                      count = count + 1;
                      conditionCheck = conditionCheck + 1;
                    } else {
                      conditionCheck = conditionCheck + 1;
                    }
                  }
                  if (elementCSQuest.conditionalQuestion?.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Comments') {
                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0)) {
                    //   count = count + 1;
                    // }
                    if (elementCSQuest.conditionalValue == elementQuestAns.answerdata) {
                      count = count + 1;
                      conditionCheck = conditionCheck + 1;
                    } else {
                      conditionCheck = conditionCheck + 1;
                    }
                  }
                }
              });
            });

            // Final Condition of Any condiion section
            if (count > 0 && conditionCheck > 0) {
              elementQuest.conditionalSkipQuestion = true;

              // Default value reassign section
              // await this.questionsList.forEach((data: any, index) => {
              //   data.Topics.questions.forEach((elementQuest, index1) => {
              if (elementQuest.conditionalSkipQuestion) {
                // console.log('elementQuest.answerdata', elementQuest.answerdata);

                if ((elementQuest.questionChoice == 'Yes/No') && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
                  if (elementQuest?.displaytype?.value == "radio") {
                    if ((elementQuest.answerdata == null)) {
                      // if(elementQuest.defaultanswer.Answer!=undefined && elementQuest.answerdata) {
                      elementQuest.answerdata = elementQuest.defaultanswer.Answer;
                      // } else {
                      // elementQuest.answerdata = elementQuest.defaultanswer;
                      // }
                    }
                    //  else {
                    //   elementQuest.answerdata = elementQuest.defaultanswer;
                    // }
                  } else {
                    if ((elementQuest.answerdata?.Answer == null)) {
                      // elementQuest.answerdata = elementQuest.defaultanswer;
                      elementQuest.questionData.forEach((quesData, indexQD) => {
                        if (quesData.value.Answer == elementQuest.defaultanswer || quesData.value.Answer == elementQuest.defaultanswer?.Answer) {
                          elementQuest.answerdata = quesData?.value;
                        }
                      });
                    }
                  }
                }
                if ((elementQuest.questionChoice == 'Choice') && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
                  if (elementQuest?.displaytype?.value == "radio") {
                    if ((elementQuest.answerdata == null)) {
                      // if(elementQuest.defaultanswer.Answer!=undefined && elementQuest.answerdata) {
                      elementQuest.answerdata = elementQuest.defaultanswer.Answer;
                      // } else {
                      // elementQuest.answerdata = elementQuest.defaultanswer;
                      // }
                    }
                    //  else {
                    //   elementQuest.answerdata = elementQuest.defaultanswer;
                    // }
                  } else {
                    if ((elementQuest.answerdata?.Answer == null)) {
                      // elementQuest.answerdata = elementQuest.defaultanswer;
                      elementQuest.questionData.forEach((quesData, indexQD) => {
                        if (quesData.value.Answer == elementQuest.defaultanswer || quesData.value.Answer == elementQuest.defaultanswer?.Answer) {
                          elementQuest.answerdata = quesData?.value;
                        }
                      });
                    }
                  }
                }
                if (elementQuest.questionChoice == 'Number' && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
                  // if(elementQuest.numberValue == null || elementQuest.numberValue == undefined) {
                  //   elementQuest.numberValue = elementQuest.defaultanswer;
                  // }
                  if (elementQuest.numberValue == null) {
                    if (elementQuest.defaultanswer.toString().includes('.')) {
                      // || elementQuest.numberValue.isNaN()
                      elementQuest.numberValue = elementQuest.defaultanswer == null || elementQuest.defaultanswer == undefined ? 0 : parseFloat(parseFloat(elementQuest.defaultanswer).toFixed(2));
                    } else {
                      elementQuest.numberValue = elementQuest.defaultanswer == null || elementQuest.defaultanswer == undefined ? 0 : parseInt(elementQuest.defaultanswer);
                    }
                  }
                }
              } else {
                // if((elementQuest.questionChoice == 'Yes/No')) {
                //   if(elementQuest?.displaytype?.value == "radio") {
                //     elementQuest.answerdata = null;
                //   } else {
                //     elementQuest.answerdata = { Answer: null, Score: null };
                //   }
                // } 
                // if((elementQuest.questionChoice == 'Choice')) {
                //   if(elementQuest?.displaytype?.value == "radio") {
                //     elementQuest.answerdata = null;
                //   } else {
                //     elementQuest.answerdata = { Answer: null, Score: null };
                //   }
                // }
                // if(elementQuest.questionChoice == 'Number') {
                //     elementQuest.numberValue = null;
                // }

              }

              //   });
              // });

            } else {
              if (count == 0 && conditionCheck > 0) {
                if (elementQuest.questionChoice != 'Number') {
                  elementQuest.answerdata = null;
                } else {
                  elementQuest.numberValue = null;
                }
                elementQuest.conditionalSkipQuestion = false;
              } else if (conditionCheck == 0) {
                if (elementQuest.questionChoice != 'Number') {
                  elementQuest.answerdata = null;
                } else {
                  elementQuest.numberValue = null;
                }
                elementQuest.conditionalSkipQuestion = false;
              } else {
                if (elementQuest.questionChoice != 'Number') {
                  elementQuest.answerdata = null;
                } else {
                  elementQuest.numberValue = null;
                }
                elementQuest.conditionalSkipQuestion = false;
              }
              this.CalculateScore();
            }

            if (elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length == 0 || elementQuest.conditionalSkipDetails.conditionalList[0]?.conditionalQuestion == null)) {
              elementQuest.conditionalSkipQuestion = true;
            }

          }

          if (elementQuest.conditionalSkipDetails?.conditionMet == 'All') {

            elementQuest.conditionalSkipDetails.conditionalList.forEach(elementCSQuest => {
              questionListAll.forEach((elementQuestAns, indexT) => {
                if (elementCSQuest.conditionalQuestion?.id == elementQuestAns.questionId || elementCSQuest.conditionalQuestion?.id == elementQuestAns.questionid) {
                  if (elementCSQuest.conditionalQuestion?.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Number') {
                    // const getConditionalValues = elementCSQuest.conditionalValue.split('-');
                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0)) {
                    //   count = count + 1;
                    // }
                    let getConditionalValues;
                    if (elementCSQuest.conditionalValue?.toString().includes('=')) {
                      getConditionalValues = elementCSQuest.conditionalValue.split('=');
                    }
                    if (elementCSQuest.conditionalValue?.toString().includes('-')) {
                      getConditionalValues = elementCSQuest.conditionalValue.split('-');
                    }

                    // && indexQuestion==0
                    // if( indexTopic ==1 && indexQuestion==0) {
                    // }

                    // if( parseInt(elementQuestAns.numberValue) >= parseInt(getConditionalValues[0]) && parseInt(elementQuestAns.numberValue) <= parseInt(getConditionalValues[1])) {
                    if (parseInt(elementQuestAns.numberValue) >= parseInt(getConditionalValues[0]) && parseInt(elementQuestAns.numberValue) <= parseInt(getConditionalValues[1])) {
                      count = count + 1;
                      conditionCheck = conditionCheck + 1;
                    } else {
                      conditionCheck = conditionCheck + 1;
                    }
                  }
                  if (elementCSQuest.conditionalQuestion?.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Choice') {
                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0)) {
                    //   count = count + 1;
                    // }
                    const getConditionalValues = elementCSQuest.conditionalValue.split(',');
                    let choiceCount = 0;
                    getConditionalValues.forEach(elementCSQVal => {

                      if (elementQuestAns.answerdata?.Answer == elementCSQVal.split('=')[0] || elementQuestAns.answerdata == elementCSQVal.split('=')[0]) {
                        // elementQuestAns.answerdata?.Answer+'='+elementQuestAns.answerdata?.Score == elementCSQVal.split('=')[0]
                        choiceCount = choiceCount + 1;
                        if (choiceCount >= 1) {
                          count = count + 1;
                          conditionCheck = conditionCheck + 1;
                        }
                      } else {
                        conditionCheck = conditionCheck + 1;
                      }
                    });
                  }
                  if (elementCSQuest.conditionalQuestion?.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Yes/No') {
                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0)) {
                    //   count = count + 1;
                    // }
                    if (indexTopic == 1 && indexQuestion == 0) {
                      // console.log('test', elementCSQuest.conditionalValue == answerValueObjectYesNo?.Answer+'='+answerValueObjectYesNo?.Score);
                    }
                    if (
                      elementCSQuest.conditionalValue.split('=')[0] == elementQuestAns.answerdata?.Answer || elementCSQuest.conditionalValue.split('=')[0] == elementQuestAns.answerdata
                    ) {
                      count = count + 1;
                      conditionCheck = conditionCheck + 1;
                    } else {
                      conditionCheck = conditionCheck + 1;
                    }
                  }
                  if (elementCSQuest.conditionalQuestion?.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Comments') {
                    // if(elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length==0)) {
                    //   count = count + 1;
                    // }
                    if (elementCSQuest.conditionalValue == elementQuestAns.answerdata) {
                      count = count + 1;
                      conditionCheck = conditionCheck + 1;
                    } else {
                      conditionCheck = conditionCheck + 1;
                    }
                  }
                }
              });
            });

            // Final Condition of Any condiion section

            if (count >= elementQuest.conditionalSkipDetails.conditionalList.length && conditionCheck > 0) {
              elementQuest.conditionalSkipQuestion = true;

              // Default value reassign section
              // await this.questionsList.forEach((data: any, index) => {
              //   data.Topics.questions.forEach((elementQuest, index1) => {
              if (elementQuest.conditionalSkipQuestion) {
                // console.log('elementQuest.answerdata', elementQuest.answerdata);

                if ((elementQuest.questionChoice == 'Yes/No') && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
                  if (elementQuest?.displaytype?.value == "radio") {
                    if ((elementQuest.answerdata == null)) {
                      // if(elementQuest.defaultanswer.Answer!=undefined && elementQuest.answerdata) {
                      elementQuest.answerdata = elementQuest.defaultanswer.Answer;
                      // } else {
                      // elementQuest.answerdata = elementQuest.defaultanswer;
                      // }
                    }
                    //  else {
                    //   elementQuest.answerdata = elementQuest.defaultanswer;
                    // }
                  } else {
                    if ((elementQuest.answerdata?.Answer == null)) {
                      // elementQuest.answerdata = elementQuest.defaultanswer;
                      elementQuest.questionData.forEach((quesData, indexQD) => {
                        if (quesData.value.Answer == elementQuest.defaultanswer || quesData.value.Answer == elementQuest.defaultanswer?.Answer) {
                          elementQuest.answerdata = quesData?.value;
                        }
                      });
                    }
                  }
                }
                if ((elementQuest.questionChoice == 'Choice') && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
                  if (elementQuest?.displaytype?.value == "radio") {
                    if ((elementQuest.answerdata == null)) {
                      // if(elementQuest.defaultanswer.Answer!=undefined && elementQuest.answerdata) {
                      elementQuest.answerdata = elementQuest.defaultanswer.Answer;
                      // } else {
                      // elementQuest.answerdata = elementQuest.defaultanswer;
                      // }
                    }
                    //  else {
                    //   elementQuest.answerdata = elementQuest.defaultanswer;
                    // }
                  } else {
                    if ((elementQuest.answerdata?.Answer == null)) {
                      // elementQuest.answerdata = elementQuest.defaultanswer;
                      elementQuest.questionData.forEach((quesData, indexQD) => {
                        if (quesData.value.Answer == elementQuest.defaultanswer || quesData.value.Answer == elementQuest.defaultanswer?.Answer) {
                          elementQuest.answerdata = quesData?.value;
                        }
                      });
                    }
                  }
                }
                if (elementQuest.questionChoice == 'Number' && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
                  // if(elementQuest.numberValue == null || elementQuest.numberValue == undefined) {
                  //   elementQuest.numberValue = elementQuest.defaultanswer;
                  // }
                  // if ( elementQuest.numberValue != undefined && elementQuest.numberValue != "") {
                  // if(elementQuest.numberValue.isNaN()  || NaN. isNaN(elementQuest.numberValue)) {
                  if (elementQuest.numberValue == null) {

                    if (elementQuest.defaultanswer.toString().includes('.')) {
                      // || elementQuest.numberValue.isNaN()
                      elementQuest.numberValue = elementQuest.defaultanswer == null || elementQuest.defaultanswer == undefined ? 0 : parseFloat(parseFloat(elementQuest.defaultanswer).toFixed(2));
                    } else {
                      elementQuest.numberValue = elementQuest.defaultanswer == null || elementQuest.defaultanswer == undefined ? 0 : parseInt(elementQuest.defaultanswer);
                    }
                  }
                  // }
                  // } else {
                  //   // elementQuest.numberValue = 0;
                  // }
                }
              } else {
                // if((elementQuest.questionChoice == 'Yes/No')) {
                //   if(elementQuest?.displaytype?.value == "radio") {
                //     elementQuest.answerdata = null;
                //   } else {
                //     elementQuest.answerdata = { Answer: null, Score: null };
                //   }
                // } 
                // if((elementQuest.questionChoice == 'Choice')) {
                //   if(elementQuest?.displaytype?.value == "radio") {
                //     elementQuest.answerdata = null;
                //   } else {
                //     elementQuest.answerdata = { Answer: null, Score: null };
                //   }
                // }
                // if(elementQuest.questionChoice == 'Number') {
                //     elementQuest.numberValue = null;
                // }

              }

              //   });
              // });


            } else {
              if (count < elementQuest.conditionalSkipDetails.conditionalList.length && conditionCheck > 0
                // && (elementQuest.answerdata == null || (elementQuest.answerdata.Answer == null || elementQuest.answerdata.Score == null)) && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined) 
              ) {
                // if(elementQ.answerdata == null || (element.answerdata.Answer == null || element.answerdata.Score == null)) {
                //   if((element.defaultanswer != null || element.defaultanswer != undefined)) {
                if (elementQuest.questionChoice != 'Number') {
                  elementQuest.answerdata = null;
                } else {
                  elementQuest.numberValue = null;
                }
                elementQuest.conditionalSkipQuestion = false;
              } else if (conditionCheck == 0) {
                if (elementQuest.questionChoice != 'Number') {
                  elementQuest.answerdata = null;
                } else {
                  elementQuest.numberValue = null;
                }
                elementQuest.conditionalSkipQuestion = false;
              } else {
                if (elementQuest.questionChoice != 'Number') {
                  elementQuest.answerdata = null;
                } else {
                  elementQuest.numberValue = null;
                }
                elementQuest.conditionalSkipQuestion = false;
              }
              this.CalculateScore();
            }

            if (elementQuest.conditionalSkip && (elementQuest.conditionalSkipDetails.conditionalList.length == 0 || elementQuest.conditionalSkipDetails.conditionalList[0]?.conditionalQuestion == null)) {
              elementQuest.conditionalSkipQuestion = true;
            }

          }
        }

        // Topic show/hide count section
        if (elementQuest.conditionalSkipQuestion == true) {
          topicCount = topicCount + 1;
        }
      });

      // Topic show/hide section
      // if(topicCount >= elementTopic.Topics.questions.length) {
      if (topicCount > 0) {
        if (elementTopic.topicShowHide == undefined) {
          elementTopic.topicShowHide = true;
        } else {
          elementTopic.topicShowHide = true;
        }
      } else {
        if (elementTopic.topicShowHide == undefined) {
          elementTopic.topicShowHide = false;
        } else {
          elementTopic.topicShowHide = false;
        }
      }
      if (indexTopic == 0) {
        elementTopic.topicShowHide = true;
      }
    });

    if (reassign == 1) {
      await this.questionsList.forEach((data: any, index) => {
        data.Topics.questions.forEach((elementQuest, index1) => {
          if (elementQuest.conditionalSkipQuestion) {
            if ((elementQuest.questionChoice == 'Yes/No') && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
              if (elementQuest?.displaytype?.value == "radio") {
                if ((elementQuest.answerdata == null)) {
                  // if(elementQuest.defaultanswer.Answer!=undefined && elementQuest.answerdata) {
                  elementQuest.answerdata = elementQuest.defaultanswer.Answer;
                  // } else {
                  // elementQuest.answerdata = elementQuest.defaultanswer;
                  // }
                }
                //  else {
                //   elementQuest.answerdata = elementQuest.defaultanswer;
                // }
              } else {
                if ((elementQuest.answerdata?.Answer == null)) {
                  // elementQuest.answerdata = elementQuest.defaultanswer;
                  elementQuest.questionData.forEach((quesData, indexQD) => {
                    if (quesData.value.Answer == elementQuest.defaultanswer || quesData.value.Answer == elementQuest.defaultanswer?.Answer) {
                      elementQuest.answerdata = quesData?.value;
                    }
                  });
                }
              }
            }
            if ((elementQuest.questionChoice == 'Choice') && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
              if (elementQuest?.displaytype?.value == "radio") {
                if ((elementQuest.answerdata == null)) {
                  // if(elementQuest.defaultanswer.Answer!=undefined && elementQuest.answerdata) {
                  elementQuest.answerdata = elementQuest.defaultanswer.Answer;
                  // } else {
                  // elementQuest.answerdata = elementQuest.defaultanswer;
                  // }
                }
                //  else {
                //   elementQuest.answerdata = elementQuest.defaultanswer;
                // }
              } else {
                if ((elementQuest.answerdata?.Answer == null)) {
                  // elementQuest.answerdata = elementQuest.defaultanswer;
                  elementQuest.questionData.forEach((quesData, indexQD) => {
                    if (quesData.value.Answer == elementQuest.defaultanswer || quesData.value.Answer == elementQuest.defaultanswer?.Answer) {
                      elementQuest.answerdata = quesData?.value;
                    }
                  });
                }
              }
            }
            if (elementQuest.questionChoice == 'Number' && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
              // if(elementQuest.numberValue == null || elementQuest.numberValue == undefined) {
              //   elementQuest.numberValue = elementQuest.defaultanswer;
              // }
              if (elementQuest.defaultanswer != undefined && elementQuest.defaultanswer != "") {
                // if(elementQuest.numberValue.isNaN()  || NaN. isNaN(elementQuest.numberValue)) {
                if (elementQuest.numberValue == null) {

                  if (elementQuest.defaultanswer.toString().includes('.')) {
                    // || elementQuest.numberValue.isNaN()
                    elementQuest.numberValue = elementQuest.defaultanswer == null || elementQuest.defaultanswer == undefined ? 0 : parseFloat(parseFloat(elementQuest.defaultanswer).toFixed(2));
                  } else {
                    elementQuest.numberValue = elementQuest.defaultanswer == null || elementQuest.defaultanswer == undefined ? 0 : parseInt(elementQuest.defaultanswer);
                  }
                }
                // }
              } else {
                // elementQuest.numberValue = 0;
              }
            }
            // this.CalculateScore();

          } else {
            // if((elementQuest.questionChoice == 'Yes/No')) {
            //   if(elementQuest?.displaytype?.value == "radio") {
            //     elementQuest.answerdata = null;
            //   } else {
            //     elementQuest.answerdata = { Answer: null, Score: null };
            //   }
            // } 
            // if((elementQuest.questionChoice == 'Choice')) {
            //   if(elementQuest?.displaytype?.value == "radio") {
            //     elementQuest.answerdata = null;
            //   } else {
            //     elementQuest.answerdata = { Answer: null, Score: null };
            //   }
            // }
            // if(elementQuest.questionChoice == 'Number') {
            //     elementQuest.numberValue = null;
            // }

          }
          // await this.CalculateScore();

        });
      });
      // setTimeout(() => {
      await this.conditionalSkipQuestionShow(j, i, this.questionsList, 0);
      //  await this.CalculateScore();
      reassign = 0;
      // }, 10);
    }
    // setTimeout(() => {
    // }, 5000);

  }


  getCustomDataDDL() {
    // Feature changes for hardcode of Agent dropdown values
    //   this.agentItem = [
    //     {label:'Prasanna Kumaran', value:'151c1b5d-c2c5-4fc5-a92b-d9b37c97757b'},
    //     {label:'Vince Mendoza', value:'df963fdc-c989-4a87-922a-ad5de4d887fc'},
    // ];
    this.partitionService.getCustomDataOption(this.global.currentPlatformID).subscribe(
      (data: any) => {
        this.agentDDLform = data.Agents;
        if (this.agentDDLform?.length > 0) {
          this.evalFormAgent = this.agentDDLform[0];
        }
        // } 

      },
      (error) => {
        console.log(error)
      }
    )
  }


  async replaceNegativeFloatKeys(val, j, i, answerType, ch) {
    this.questionsList.forEach((data: any, index) => {
      data.Topics.questions.forEach((element, index1) => {
        if (index == j && index1 == i) {
          if (element.questionChoice == 'Number') {

            if (val != null && val != 'null' && val !== undefined && val !== 'undefined') {
              // if(answerType=='min') {
              setTimeout(() => {
                if (val.toString().length >= 5 && val.toString().includes('.')) {
                  return element.numberValue = parseFloat(val).toFixed(2);
                } else {
                  return element.numberValue = val;
                }
              }, 10);
            }

          }
        }
      });
    });
  }

  CheckMaxvalue(numberValue, j, i, questionValue) {
    let tempValue = JSON.parse(JSON.stringify(numberValue));
    this.questionsList.forEach((data: any, index) => {
      data.Topics.questions.forEach((element, index1) => {
        if (index == j && index1 == i) {
          if (element.questionChoice == 'Number') {

            if (numberValue != null || numberValue != 'null' || numberValue !== undefined || numberValue !== 'undefined') {
              let minmax;
              if (questionValue?.includes('=')) {
                minmax = questionValue.split('=');
              }
              if (questionValue?.includes('-')) {
                minmax = questionValue.split('-');
              }
              setTimeout(() => {
                if (minmax[1] < numberValue) {
                  // event.preventDefault();
                  // element.numberValue = parseInt(minmax[1]);
                  if (numberValue.toString().length >= 5 && numberValue.toString().includes('.')) {
                    element.numberValue = parseFloat(minmax[1]).toFixed(2);
                  } else {
                    element.numberValue = parseInt(minmax[1]);
                  }
                }
              }, 100);
            }

          }
        }
      });
    });

  }

  mstrValidToken() {
    const idToken = JSON.parse(localStorage.getItem("mstrIdToken"))['x-mstr-identitytoken'];
    const authToken = JSON.parse(localStorage.getItem('mstrAuthToken'))
    let params = {
      ID_TOKEN: idToken,
      AUTH_TOKEN: authToken
    }
    return new Promise((resolve, reject) => {
     this.subscription_mstrValidToken = this.ew_NACDservice.mstrValidToken(params).subscribe(
        (data: any) => {
          // console.log(data)
          if (data.isSuccess.toLowerCase() === 'success' && data.result !== 'valid identity token') {
            localStorage.removeItem('mstrIdToken');
            const setIdToken = {
              'x-mstr-identitytoken': data.result
            }
            localStorage.setItem('mstrIdToken', JSON.stringify(setIdToken))
          }
          else if (data.isSuccess.toLowerCase() === 'success' && data.result === 'NA') {
            this.mstrTokenService.refreshMSTRSession();
          }
          else {
            if (data.isSuccess.toLowerCase() === 'failed' && (data.result.toLowerCase() === 'invalid access token' || data.result === "The user's session has expired, please reauthenticate")) {
              // this.commonMethods.addToastforlongtime(false,'Mstr session has Expired,Please wait for a moment...')
              this.mstrTokenService.refreshMSTRSession();
            }
          }
          resolve(true)
        },
        (error) => {
          console.log(error)
          reject(error)
          this.spinnerService.hide();
        })
    })

  }

  ConditionalSkipCheckMaxvalue(numberValue, j, i, quesValue) {
    let minmax;
    if (quesValue != null || quesValue !== undefined) {
      if (quesValue?.includes('=')) {
        minmax = quesValue.split('=');
      }
      if (quesValue?.includes('-')) {
        minmax = quesValue.split('-');
      }
    }
    let finalAnsMax;
    if (numberValue < minmax[0] || minmax[1] < numberValue) {
      setTimeout(() => {
        // this.questionsList.forEach((data: any, index) => {
        //   data.Topics.questions.forEach((element, index1) => {

        if (numberValue > minmax[1]) {
          if (numberValue.toString().length >= 5 && numberValue.toString().includes('.')) {
            finalAnsMax = parseFloat(parseFloat(minmax[1]).toFixed(2));
          } else {
            finalAnsMax = minmax[1];
          }
        }
        // else if ( numberValue < minmax[0] ) {
        //   if (numberValue.toString().length >= 5 && numberValue.toString().includes('.')) {
        //     finalAnsMax = parseFloat(parseFloat(minmax[0]).toFixed(2));
        //   } else {
        //     finalAnsMax = minmax[0];
        //   }
        // } 
        else {
          if (numberValue.toString().length >= 5 && numberValue.toString().includes('.')) {
            finalAnsMax = parseFloat(parseFloat(numberValue).toFixed(2));
          } else {
            finalAnsMax = numberValue;
          }
        }

        this.questionsList.forEach((data: any, jindex) => {
          data.Topics.questions.forEach((element, iindex) => {
            if (j == jindex && i == iindex) {
              element.numberValue = parseFloat(parseFloat(finalAnsMax).toFixed(2));
            }
          });
        });

      }, 100);
    } else {
      // numberValue = parseFloat(parseFloat(numberValue).toFixed(2));
      setTimeout(() => {

        this.questionsList.forEach((data: any, jindex) => {
          data.Topics.questions.forEach((element, iindex) => {
            if (j == jindex && i == iindex) {
              element.numberValue = parseFloat(parseFloat(numberValue).toFixed(2));
              // element.numberValue = parseFloat(numberValue).toFixed(2);
            }
          });
        });
      }, 100);
    }

  }

  validateMstrReportId(dossierID) {
    let params = {
      dossierId: dossierID==null?this.DossierId:dossierID,
      reportType: "55",
      AuthToken: JSON.parse(localStorage.getItem('mstrAuthToken')),
      projectId: this.projectID
    }
    return new Promise((resolve, reject) => {
     this.subscription_ValidateReportID = this.keyQuestionsService.validateMstrReportId(params).subscribe(
        (data: any) => {
          if (data['isSuccess'].toLowerCase() == 'failed' && data.result.toLowerCase() != "the user's session has expired, please reauthenticate") {
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

  async defaultValueAssignForNonACD() {

    // await this.questionsList.forEach((dataques: any, topicJ) => {
    //   dataques.Topics.questions.forEach((element, quesI) => {

    // // Question data convert to float value
    // if(element.questionData != undefined) {
    //   element?.questionData.forEach(elementQD => {
    //     if(elementQD.value?.Score!=null || elementQD.value?.Score!='') {
    //       if(element?.displaytype?.value != "radio" && element.answerdata?.Score != null && element.answerdata?.Score.toString().includes('.')) {
    //         elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
    //       } else {
    //         elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
    //       }
    //     }
    //   });
    // }

    // // Default value assigning block for Answer data
    // if(element.questionid == element.questionid) {
    //   if(element.questionChoice != 'Number' && element.questionChoice != 'Comments') {

    //     // data[0].evaluation_status=='InComplete' && 
    //     if((element.answerdata == null || (element.answerdata.Answer == null || element.answerdata.Score == null))) {
    //       if((element.defaultanswer != null || element.defaultanswer != undefined) 
    //       ) {
    //         if(element?.displaytype?.value == "radio" && element.questionChoice == 'Choice') {
    //           if(element.answerdata?.Answer!=undefined) {
    //             element.answerdata = element.answerdata?.Answer;
    //           } else {
    //             element.answerdata = element.answerdata;
    //           }
    //         } else if(element?.displaytype?.value == "radio" && element.questionChoice == 'Yes/No') {
    //           if(element.answerdata?.Answer!=undefined) {
    //             element.answerdata = element.answerdata?.Answer;
    //           } else {
    //             element.answerdata = element.answerdata;
    //           }
    //         } else {
    //           element.answerdata = element.defaultanswer;
    //         }
    //       }
    //     }

    //   } else if( element.questionChoice == 'Number') {
    //     // (data[0].evaluation_status=='InComplete' || data[0].evaluation_status=='Incomplete') &&
    //     // if( (element.defaultanswer!=null || element.defaultanswer!=undefined)) {
    //       element.numberValue = element.defaultanswer;
    //     // } else {
    //     //   element.numberValue = element.numberValue;
    //     // }
    //   }  else if( element.questionChoice == 'Comments') {
    //     element.answerdata = element.answerdata;
    //   }
    // }

    this.questionsList.forEach((elementT: any) => {
      elementT.Topics.questions.forEach(elementQ => {
        // if(element.questionid == elementQ.questionid) {

        // Question data convert to float value
        if (elementQ.questionData != undefined) {
          elementQ.questionData.forEach(elementQD => {
            if (elementQD.value?.Score != null || elementQD.value?.Score != '') {
              if (elementQ.answerdata?.Score != null && elementQ.answerdata?.Score?.toString().includes('.')) {
                elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
              } else {
                elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
              }
            } else {
            }
          });
        }

        // Default value assigning block for Conditional skip data
        if (elementQ.questionChoice != 'Number' && elementQ.questionChoice != 'Number' && elementQ.questionChoice != 'Comments') {

          // if(data[0].evaluation_status=='InComplete') {
          if ((elementQ.defaultanswer != null || elementQ.defaultanswer != undefined)
          ) {
            if (elementQ?.displaytype?.value == "radio" && elementQ.questionChoice == 'Choice') {
              if (elementQ.defaultanswer?.Answer != undefined) {
                elementQ.answerdata = elementQ.defaultanswer?.Answer;
              } else {
                elementQ.answerdata = elementQ.defaultanswer;
              }
            } else if (elementQ?.displaytype?.value == "radio" && elementQ.questionChoice == 'Yes/No') {
              if (elementQ.defaultanswer?.Answer != undefined) {
                elementQ.answerdata = elementQ.defaultanswer?.Answer;
              } else {
                elementQ.answerdata = elementQ.defaultanswer;
              }
            } else {
              elementQ.answerdata = elementQ.defaultanswer;
            }
          } else {
          }
          // } else {
          //   if(element?.displaytype?.value == "radio" && elementQ.questionChoice == 'Choice') {
          //       if(elementQ.answerdata?.Answer!=undefined) {
          //         elementQ.answerdata = elementQ.answerdata?.Answer;
          //       } else {
          //         elementQ.answerdata = elementQ.answerdata;
          //       }
          //     } else if(element?.displaytype?.value == "radio" && elementQ.questionChoice == 'Yes/No') {
          //       if(elementQ.answerdata?.Answer!=undefined) {
          //         elementQ.answerdata = elementQ.answerdata?.Answer;
          //       } else {
          //         elementQ.answerdata = elementQ.answerdata;
          //       }
          //   }  else {
          //       elementQ.answerdata = elementQ.answerdata;
          //     }
          // }

        } else if (elementQ.questionChoice == 'Number') {
          // if(elementQ.answerdata == undefined) {
          if ((elementQ.defaultanswer != null || elementQ.defaultanswer != undefined) && (elementQ.numberValue == null || elementQ.numberValue == '')) {
            elementQ.numberValue = elementQ?.defaultanswer;
          } else {
            // (data[0].evaluation_status=='InComplete' || data[0].evaluation_status=='Incomplete') && 
            if ((elementQ.defaultanswer != null || elementQ.defaultanswer != undefined)) {
              elementQ.numberValue = elementQ.defaultanswer;
            } else {
              elementQ.numberValue = elementQ.numberValue;
            }
          }
          // }
        } else if (elementQ.questionChoice == 'Comments') {
          elementQ.answerdata = elementQ.answerdata;
        }
        // console.log("this.elementQ", elementQ);

        // }
      });
    });


    //   });
    // })

    // this.resetQuesList = this.questionsList;
    // this.eval_Status = data[0].evaluation_status;
    // this.disableqa = (data[0].disableqa === undefined || data[0].disableqa === null) ? false : data[0].disableqa;
    // this.disablecoach = (data[0].disablecoach === undefined || data[0].disablecoach === null) ? false : data[0].disablecoach;
    // this.allowResubmit = data[0].allowResubmit

    await this.questionsList.forEach((dataques: any, topicJ) => {
      dataques.Topics.questions.forEach((element, quesI) => {

        // Replace Undefiend object value to Empty string
        if (element.questionData != undefined && element.questionData != null) {
          element.questionData.forEach(elementlabel => {
            elementlabel.label = elementlabel.label.replace(' (undefined)', '');
          });
        }

        if (element.questionChoice == "Choice" || element.questionChoice == "Yes/No") {
          element.questionData = this.templatetoAns(element.questionValue);
        }

        if (element.conditionalSkipQuestion == undefined) {
          element.conditionalSkipQuestion = true;
        }
        if (element.conditionalSkip && element.conditionalSkipDetails != undefined) {
          element.conditionalSkipQuestion = false;
        }
        if (topicJ == 0 && quesI == 0) {
          // if ((this.questionsList[0].Topics.questions[0]?.answerdata?.Answer != null && element.answerdata?.Score != null) || this.questionsList[0].Topics.questions[0]?.numberValue != null) {
          this.conditionalSkipQuestionShow(topicJ, quesI, this.questionsList, 0);
          // } else {
          //   this.conditionalSkipQuestionShow(topicJ, quesI, this.questionsList, 0);
          //   if (element?.conditionalSkipQuestion == undefined) {
          //   }
          // }
        } else {
          this.conditionalSkipQuestionShow(topicJ, quesI, this.questionsList, 0);
        }

      });

      // if (data.topicShowHide == undefined) {
      //   data.topicShowHide = true;
      // } else {
      //   data.topicShowHide = true;
      // }
      // if (topicJ == 0) {
      //   dataques.topicShowHide = true;
      // }
    })
    // this.evaluatesaveModel.evaluation_coach = data[0].evaluation_coach
    this.CalculateScore();
    // if (data[0].evaluation_status != undefined || data[0].evaluation_status != null) {
    //   if (data[0].evaluation_status.toLowerCase() === 'complete') {
    //     this.coachFlag = false;
    //     this.saveFlagDisable = true;
    //   }
    //   else {
    //     this.coachFlag = true
    //     this.saveFlagDisable = false;
    //   }
    // }
    this.spinnerService.hide();
    // }
    // },
    // (error) => {
    //   console.log(error);
    //   this.spinnerService.hide();
    // }
    // )

  }
  //
  getVideoUrl(convID) {
    this.ew_NACDservice.getMediaUrl(convID).subscribe((data: any) => {
      this.videoUrl = data.url;
      this.isMediaScreenLoader = false;
      if (data.statusCode == 202) {
        this.isMediaScreenLoader = true;
        this.videoUrl = [];
        this.ew_NACDservice.getMediaUrl(convID).subscribe((param: any) => {
          this.videoUrl = param.url;
          this.isMediaScreenLoader = false;
        },
          (error) => {
            console.log(error);
            this.isMediaScreenLoader = false;
          })
      }
    },
      (error) => {
        console.log(error);
        this.isMediaScreenLoader = false;
      })
  }

  platformId: number;
  isMediaScreen: boolean = false;
  getPlatformValidation() {
    return new Promise((resolve, reject) => {
      this.preferenceService.getPlatformDetail.subscribe((data: any) => {
        this.platformId = data.platformId;
        this.isMediaScreen = data.isMediaScreen != undefined ? data.isMediaScreen : false;
        resolve(data)
      },
        (error) => {
          reject(error)
          console.log(error);
        })

    })
  }

  validateLink(displayAs,quesDesc,URL){
     if(displayAs != null && displayAs != undefined && quesDesc != null && quesDesc != undefined && displayAs != '' && quesDesc != ''){
        let displayAsMatch = quesDesc.match(displayAs)
        setTimeout(() => {
          if(!!document.getElementById('hyper')){
          const hyperlink = document.getElementById('hyper')
          const Link = URL.split('//').length == 1 ? "<a style='text-decoration: underline;color: #0000EE;' href=\""+ "https://" + URL+"\" target=\"_BLANK\">"+displayAsMatch[0]+"</a>" : "<a style='text-decoration: underline;color: #0000EE;'  href=\""+ URL+"\" target=\"_BLANK\">"+displayAsMatch[0]+"</a>";
          hyperlink.innerHTML = hyperlink.innerHTML.split(displayAsMatch[0]).join(Link)
          }
        }, 20);
     }
  }

    formLevelDossierIdList: any = [];
    //get Config FormDossier Id
    getConfigFormDossierIdList() {
        this.evaluationService.getConfigFormDossierIdList(this.platformId).subscribe((data: any) => {
          this.formLevelDossierIdList = data;
        },
        (error) => {
          console.log(error);
          this.commonMethods.addToastforlongtime(false, error.error);
        })
    }

    currentFormLevelDossierId: any = [];
    //get Config FormDossier Id
   getConfigFormDossierId(evaluationSKId) {
    return new Promise((resolve, reject) => {
       this.evaluationService.getConfigFormDossierId(evaluationSKId?.formLevelDossierId?.SK).subscribe((data: any) => {
          // this.formLevelDossierIdList = [];
          this.formLevelDossierIdList.push(data);
          // return true;
          resolve(true)
        },
        (error) => {
          console.log(error);
          this.commonMethods.addToastforlongtime(false, error.error);
          resolve(true)
        })
      });
    }

     // !!! ****** keep this ngOnDestroy method at last ,please verify if anybody work on this component ***** !!!
     ngOnDestroy() {
      if (typeof (this.ws) == 'object' && typeof (this.ws.destroy) == 'function') {
        this.ws.destroy();
      }
      if (this.subscription_DossierID) {
        this.subscription_DossierID.unsubscribe();
      }
      if (this.subscription_mstrValidToken) {
        this.subscription_mstrValidToken.unsubscribe();
      }
      if (this.subscription_ValidateReportID) {
        this.subscription_ValidateReportID.unsubscribe();
      }
  
      const getDossierDOMobj = document.getElementById("dossierContainer1");
      if (typeof (getDossierDOMobj) != 'undefined' && getDossierDOMobj != null) {
        getDossierDOMobj.style.display = 'none'
        if(getDossierDOMobj.id == 'dossierContainer1'){
          microstrategy.dossier.destroy({ placeholder: getDossierDOMobj });
        }
        getDossierDOMobj.remove();
      }
    }
}
