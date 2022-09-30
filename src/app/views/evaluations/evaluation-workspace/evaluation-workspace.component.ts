import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
/* Service Import */
import { EvaluationWorkspaceService } from './evaluation-workspace.service'

/* common Component Import */
import { CommonMethods } from '../../../common/common.components';
import * as moment from 'moment';
import { PagerService } from '../../../services/pager.service'
import { EvaluateSaveModel, NotesModel } from './evaluation-workspace.model';

/* Audio Player Import */
declare var $: any;
declare var require: any
let WaveSurfer = require('../../../../assets/audioscript/wavesurfer.js');
let TimelinePlugin = require('../../../../assets/audioscript/plugin/wavesurfer.timeline.js');
let CursorPlugin = require('../../../../assets/audioscript/plugin/wavesurfer.cursor.js');

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
import { Subscription } from 'rxjs';

declare var microstrategy: any;
// import embeddedjs from '../../../../assets/tableJS/embeddinglib.js'
@Component({
  selector: 'app-evaluation-workspace',
  templateUrl: './evaluation-workspace.component.html',
  styleUrls: ['./evaluation-workspace.component.css']
})
export class EvaluationWorkspaceComponent implements OnInit {
  constructor(public evService: EvaluationWorkspaceService, private commonMethods: CommonMethods,
    private pagerService: PagerService, public global: GlobalComponent, private spinnerService: NgxSpinnerService,
    private interactionService: InteractionService, public keyQuestionsService: KeyQuestionsService,
    private loginService: LoginService, private mstrTokenService: MstrTokenService,private _clipboardService: ClipboardService) {
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
  DossierId: any;
  projectID: any;

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
  conversationItem:any = ['All'];
  convCategory: string = "All";

  resultConvID:any;

  mstrToken: any = null;
  audioEndpoint: any = null;
  getTopicReport: any = [];
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
  resetQuesList:any = [];
  eval_Status:string = "";

  localRole: any;
  roleEvalForm: any = null;


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
  isConformBox:boolean = false;
  isCopy:boolean = false;
  indexTexti:any;
  indexTextj:any;

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
  //     this.evService.sendDataTOmstr(params).subscribe(
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
  //     this.evService.getMSTRInstanceID(params).subscribe(
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
  isloadSpinner:boolean = false;
  subscription:Subscription;
  currentEvaluationDetails: any = { evalRoomId: null, evalRoomName: '', evalRoomIsNonACD: false };
  subscription_DossierID: Subscription;
  subscription_ValidateReportID: Subscription;

  ngOnInit(): void {
    utils.isMstrReload = false;
    this.items1 = [
      {
        label: '', command: (event) => {
          this.tabMenuName = "Transcript"
        }
      },
      {
        label: '', command: (event) => {
          this.tabMenuName = "Topics"
        }
      },
      {
        label: 'Notes', command: (event) => {
          this.tabMenuName = "Notes"
        }
      }
    ];
    this.evaluationTabValue();
    // this.getEvalTopic();
    this.getEvaluationDossiers();
    // this.getEvalutionItems();
  }

  // tabDetails:any[];
  // evaluation tabs
  evaluationTabs() {
    return new Promise((resolve, reject) => {
      this.evService.evaluationTabs().subscribe(
        (data: any) => {
          resolve(data);
        }, (err) => {
          reject(err)
        })
    })
  }

  evaluationTabValue() {
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
  async onChangeEvalution() {
    let quesarr = [];
    let notesarr = [];
    this.EvalItemDDL.forEach(element => {
      if (element.value == this.category) {
        this.selectedLabel = element.label;
      }
    });
    this.evalRoomData = null;
    // console.log(this.evaluationItem)
    this.evaluationItem.forEach(element => {
      if (element.evaluationRoomName == this.selectedLabel) {
        this.evalRoomData = element
      }

    });
    this.clearData('eOnChange');
    this.refreshBtn(false)
    // console.log(this.evalRoomData)
    if (this.evalRoomData != null || this.evalRoomData != undefined) {
      this.evalRoomName = this.evalRoomData.evaluationRoomName;

      this.evalRoomData.questionsList.forEach(data => {
        data.Topics.questions.forEach(element => {
          if (element.questionChoice == "Choice" || element.questionChoice == "Yes/No") {
            element.answerdata = null;
            element.questionData = this.templatetoAns(element.questionValue);
          }
          // else {
          //   element.numberValue = "";
          // }
          if (element.questionChoice == "Choice" || element.questionChoice == "Yes/No" || element.questionChoice == "Number") {
            quesarr.push(element)
            this.totalCountQues = quesarr.length
            // console.log(this.totalCountQues)
          }
          if (element.questionChoice == "Comments") {
            notesarr.push(element)
            this.totalCountNotes = notesarr.length
            // console.log(this.totalCountNotes)
          }
        });

      })
      // this.category = this.evalRoomData
      this.selectedEvalItem = this.evalRoomData;
      this.currentEvaluationDetails = { evalRoomId: this.selectedEvalItem.evaluationId, evalRoomName: this.selectedEvalItem.evaluationRoomName, evalRoomIsNonACD: this.selectedEvalItem.isNonACD == undefined ? false : this.selectedEvalItem.isNonACD };

      await this.selectedEvalItem.questionsList.forEach((data: any) => {
        data.Topics.questions.forEach(element => {
          if(element.questionData != undefined && element.questionData != null) {
            element.questionData.forEach(elementlabel => {
              elementlabel.label = elementlabel.label.replace(' (undefined)', '');
              // if(elementlabel.value.Score == undefined || elementlabel.value.Score == null) {
              //   elementlabel.value.Score = 0;
              // }
            });

          }
          if(element.conditionalSkipQuestion == undefined ) {
            element.conditionalSkipQuestion = true;
          }
          if(element.conditionalSkip && element.conditionalSkipDetails != undefined ) {
            element.conditionalSkipQuestion = false;
            // element.conditionalSkipQuestion = true;
          }
        });
        if(data.topicShowHide == undefined ) {
          data.topicShowHide = true;
        } else {
          data.topicShowHide = true;
        }
      })
      this.questionsList = this.selectedEvalItem.questionsList;

    } else {
      this.evalRoomName = null;
      this.questionsList = null
    }

    // console.log(this.questionsList)
  }

  /* Initial Load  */
  getEvaluationLoad() {
    this.getEvalutionItems().then((res) => {
      // return this.getEvaluationWorkspaceReport();
      // return this.workspaceTable();
    }).then((resEv) => {
      return this.filterItem('load')
    }).then((resfilter) => {
      /* Audio Interaction player */
      this.refreshBtn(false);
      this.setPage(1)
    })
      .catch((error) => {
        console.log('error', error)
      })
  }

  /** get Evaluation Intaraction report from mstr */
  getEvaluationWorkspaceReport() {
    return new Promise((resolve, reject) => {
      let count = 0;
      let countEr = 0;
      let EroomName = "";
      this.newHeader = ["Call Start Time", "Caller ID", "Queue Name", "Agent Name"];
      this.newHeaderMetrics = ["Talk Time", "Wait Time", "Handle Time"];
      this.evaluateObj = { a: "", b: "", c: "", d: "", q: "", e: "", f: "", g: "", h: "", i: "", j: "", k: [], tp: [], sp: 0, spc: 1 };
      this.newRowObj = { l: "", m: "", n: "", o: "", p: "" };
      this.topicObj = { evRoomName: null, topicName: null, startTime: 0 };
      let mstr = localStorage.getItem("mstrAuthToken");
      mstr = JSON.parse(mstr)
      if (typeof (mstr['authToken']) !== 'undefined' && typeof (mstr['cookie']) !== 'undefined') {
        let params = {
          mstrAuthToken: mstr['authToken'],
          body:
          {
            "Cookie": mstr['cookie']
          }
        }
        this.evService.getEvaluationWorkspaceReport(params).subscribe((data: any) => {
          if (typeof (data.code) != "undefined") {
            this.commonMethods.addToastforlongtime(false, data.message);
            reject(data)
          }
          else {
            if (data.length != 0) {
              this.evaluateCustom = [];
              this.evaluateData = data;
              // result.data.root
              if (this.evaluateData.result.data.root != null) {
                this.evaluateData.result.data.root.children.forEach(childRoot => {
                  this.evaluateObj.a = childRoot.element.name
                  childRoot.children.forEach(child1 => {
                    this.evaluateObj.b = child1.element.name
                    child1.children.forEach(child2 => {
                      this.evaluateObj.c = child2.element.name
                      child2.children.forEach(childq => {
                        this.evaluateObj.q = childq.element.name
                        childq.children.forEach(child4 => {
                          this.evaluateObj.e = child4.element.name
                          child4.children.forEach(child5 => {
                            this.evaluateObj.f = child5.element.name
                            child5.children.forEach(child6 => {
                              if (countEr == 0) {
                                this.evaluateObj.g = child6.element.name;
                                EroomName = child6.element.name;
                              }
                              else {
                                EroomName = child6.element.name;
                                // this.newRowObj.m = child6.element.name
                                countEr++;
                              }
                              this.evaluateObj.sp += child6.children.length;
                              child6.children.forEach(child7 => {
                                child7.children.forEach(child8 => {
                                  this.topicObj.evRoomName = child6.element.name;
                                  this.topicObj.topicName = child7.element.name
                                  this.topicObj.startTime = child8.element.name
                                  this.evaluateObj.tp.push(this.topicObj);
                                  this.topicObj = { evRoomName: null, topicName: null, startTime: 0 };
                                  if (count == 0) {
                                    this.evaluateObj.h = child8.metrics['Talk Time'].rv
                                    this.evaluateObj.i = child8.metrics['Wait Time'].rv
                                    this.evaluateObj.j = child8.metrics['Handle Time'].rv
                                    count++;
                                    countEr++;
                                    this.newRowObj = { l: "", m: "", n: "", o: "", p: "" };
                                  }
                                  else if (count != 0) {
                                    this.newRowObj.m = EroomName;
                                    this.newRowObj.n = child8.metrics['Talk Time'].rv;
                                    this.newRowObj.o = child8.metrics['Wait Time'].rv;
                                    this.newRowObj.p = child8.metrics['Handle Time'].rv;
                                    this.evaluateObj.k.push(this.newRowObj);
                                    count++;
                                    countEr++;
                                    this.newRowObj = { l: "", m: "", n: "", o: "", p: "" };
                                  }
                                });
                              });
                            });

                          })
                        });
                      });
                    });
                  })
                  count = 0;
                  countEr = 0;
                  this.evaluateCustom.push(this.evaluateObj)
                  this.evaluateObj = { a: "", b: "", c: "", d: "", q: "", e: "", f: "", g: "", h: "", i: "", j: "", k: [], tp: [], sp: 0, spc: 1 };
                });
              }
              resolve(this.evaluateCustom)
            }
            else {
              this.evaluateCustom = [];
              resolve(this.evaluateCustom)
            }
          }
        },
          (error) => {
            console.log(error.error);
            this.commonMethods.addToastforlongtime(false, error.error)
          })
      } else {
        reject('Unknown error')
      }
    })

  }

  getEvalutionItems() {
    let evalUser = null;
    let quesarr = [];
    let notesarr = [];
    return new Promise((resolve, reject) => {
      this.evService.getEvaluationForms().subscribe(async (data: any) => {
        this.evaluationItem = data;
        this.istableGet = false;
        if (this.evaluationItem.length > 0) {
          this.EvalItemDDL.forEach(element => {
            if (element.value == this.category) {
              this.selectlabelDB = element.label;
            }
          });
          await this.evaluationItem.forEach(element => {
            if (element.evaluationRoomName == this.selectlabelDB) {
              this.selectedEvalItem = element;
              // this.category = element;
              this.evalRoomName = element.evaluationRoomName;
              element.questionsList.forEach((data: any) => {
                data.Topics.questions.forEach(elementQ => {
                  // if(elementQ.questionData != undefined && elementQ.questionData != null) {
                  //   elementQ.questionData.forEach(elementQlabel => {
                  //     elementQlabel.label = elementQlabel.label.replace(' (undefined)', '')
                  //   });
                  // }
                  if(elementQ.conditionalSkipQuestion == undefined ) {
                    elementQ.conditionalSkipQuestion = true;
                  }
                  if(elementQ.conditionalSkip && elementQ.conditionalSkipDetails != undefined ) {
                    elementQ.conditionalSkipQuestion = false;
                    // elementQ.conditionalSkipQuestion = true;
                  }
                  if (elementQ.questionChoice == "Choice" || elementQ.questionChoice == "Yes/No") {
                    elementQ.answerdata = null;
                    elementQ.questionData = this.templatetoAns(elementQ.questionValue);
                  }
                  if (elementQ.questionChoice == "Choice" || elementQ.questionChoice == "Yes/No" || elementQ.questionChoice == "Number") {
                    quesarr.push(elementQ)
                    this.totalCountQues = quesarr.length
                    // console.log(this.totalCountQues)
                  }
                  if (elementQ.questionChoice == "Comments") {
                    notesarr.push(elementQ)
                    this.totalCountNotes = notesarr.length
                    // console.log(this.totalCountNotes)
                  }
                });
                if(data.topicShowHide == undefined ) {
                  data.topicShowHide = true;
                } else {
                  data.topicShowHide = true;
                }

              });
              this.questionsList = element.questionsList;
            }
          });

          resolve(true);
        }
      }, (err) => {
        reject(err)
        this.commonMethods.addToastforlongtime(false, err.error)
        // this.istableGet=false;
        console.log(err)
      })
    })
  }

  /** filtering the based on the filter condition */
  filterItem(flag?: string) {
    // return new Promise((resolve, reject) => {
    //   this.clearData('filter');
    //   /* Audio Interaction player */
    //   this.refreshBtn(false);
    //   if (typeof (this.category) != 'undefined' && typeof (this.category.evaluationRoomName == 'string')) {
    //     let value = this.category.evaluationRoomName.trim()
    //     this.questionsList.forEach((evItem: any) => {
    //       evItem.Topics.questions.forEach(ques => {
    //         ques.numberValue = "";
    //         ques.answerdata = null;
    //       });
    //     });
    //     let evaluateList = []
    //     evaluateList = JSON.parse(JSON.stringify(this.evaluateCustom));
    //     this.allItems = evaluateList.filter(item => {
    //       let endDate = moment(item.c).format("MM/DD/YYYY")
    //       let filterfromDate = moment(this.fromDate).format("MM/DD/YYYY")
    //       let filtertoDate = moment(this.toDate).format("MM/DD/YYYY")
    //       let conD = false
    //       if (item.k.length != 0) {
    //         let count = 0;
    //         let k = item.k.length;
    //         let Value = item.k
    //         let topics = item.tp;
    //         item.k = [];
    //         item.tp = [];
    //         for (let index = 0; index < k; index++) {
    //           if (Value[index].m.toLowerCase().trim() == value.toLowerCase().trim()) {
    //             item.k.push({ l: Value[index].l, m: Value[index].m, n: Value[index].n, o: Value[index].o, p: Value[index].p })
    //           }
    //         }
    //         for (let index = 0; index < topics.length; index++) {
    //           if (topics[index].evRoomName.toLowerCase().trim() == value.toLowerCase().trim()) {
    //             item.tp.push({ evRoomName: topics[index].evRoomName, topicName: topics[index].topicName, startTime: topics[index].startTime })
    //           };
    //         }

    //         if (item.k.length != 0) {
    //           if (item.g.toLowerCase().trim() == value.toLowerCase().trim()) {
    //             item.sp = item.k.length + 1;
    //             return Date.parse(endDate) >= Date.parse(filterfromDate) && Date.parse(endDate) <= Date.parse(filtertoDate)
    //           }
    //           else {
    //             item.g = item.k[item.k.length - 1].m
    //             item.h = item.k[item.k.length - 1].n
    //             item.i = item.k[item.k.length - 1].o
    //             item.j = item.k[item.k.length - 1].p
    //             item.k.pop();
    //             item.sp = item.k.length + 1;
    //             return Date.parse(endDate) >= Date.parse(filterfromDate) && Date.parse(endDate) <= Date.parse(filtertoDate)
    //           }
    //         }
    //         else {
    //           item.sp = 1;
    //           return item.g.toLowerCase().trim() == value.toLowerCase().trim() && Date.parse(endDate) >= Date.parse(filterfromDate) && Date.parse(endDate) <= Date.parse(filtertoDate)
    //         }

    //       }
    //       else {
    //         return item.g.toLowerCase().trim() == value.toLowerCase().trim() && Date.parse(endDate) >= Date.parse(filterfromDate) && Date.parse(endDate) <= Date.parse(filtertoDate)

    //       }
    //     })
    //     if (this.allItems.length != 0) {
    //       if (flag == 'load') {
    //         this.agentItem = [];
    //         this.queueItem = [];
    //         this.agentItem.push("All");
    //         this.queueItem.push("All");
    //         this.allItems.forEach((agent: any) => {
    //           if (typeof (agent != 'undefined') && typeof (agent.e != 'undefined')) {
    //             if (this.agentItem.indexOf(agent.e) == -1) {
    //               this.agentItem.push(agent.e);
    //             }
    //           }
    //         })
    //         this.allItems.forEach((queue: any) => {
    //           if (typeof (queue != 'undefined') && typeof (queue.q != 'undefined')) {
    //             if (this.queueItem.indexOf(queue.q) == -1) {
    //               this.queueItem.push(queue.q);
    //             }
    //           }
    //         })
    //       }
    //     }
    //     resolve(this.allItems)
    //   }
    // })

  }


  /* Agent and queue Auto complete functions */
  searchAgents(event) {
    this.resultAgent = this.agentItem.filter(a => a.toLowerCase().includes(event.query.toLowerCase()))
  }
  searchQueues(event) {
    this.resultQueue = this.queueItem.filter(q => q.toLowerCase().includes(event.query.toLowerCase()))
  }


  /** generate access permission url for audio Interaction*/
  getEvaluateObj(evDataCol0) {
    this.loading = false;
    this.clearData('clickTableRow')
    this.topicsTab = evDataCol0.tp;
    let regExp = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    this.questionsList.forEach((evItem: any) => {
      evItem.Topics.questions.forEach(ques => {
        ques.numberValue = "";
        ques.answerdata = null;
      });
    });
    this.transcriptTab = [];
    this.currentContact = evDataCol0.a;
    this.evaluatesaveModel.contactId = evDataCol0.a;
    this.evaluatesaveModel.evaluationReportRoom = evDataCol0.g;
    this.evaluatesaveModel.queue_name = evDataCol0.q;
    this.evaluatesaveModel.agent_name = evDataCol0.e;
    if (regExp.test(evDataCol0.f)) {
      this.evService.getEvaluateObj(evDataCol0.f).subscribe((data: any) => {
        this.rowClick = true;
        this.audioUrl = data.url;
        this.tooltip = "";
        this.getTranscribeData();
        this.getNotes();
        this.refreshBtn();
      }, (err) => {
        this.currentContact = '';
        this.tooltip = "Please select interactions for evaluation"
        this.rowClick = false;
        this.refreshBtn(false);
      })

    } else {
      this.rowClick = false;
      this.refreshBtn(false);
      this.commonMethods.addToastforlongtime(false, "Invalid audio url")
    }
  }
  evaluationWorkSpaceSave(status) {
    if (this.currentContact == null || this.currentContact == "") {
      this.commonMethods.addToastforlongtime(false, 'Please select interactions for evaluation');
      return;
    } else {
      if (status == "Complete") {
        let count = 0;
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
          })
        })
        if (count > 0) {
          this.commonMethods.addToastforlongtime(false, 'Please provide responses to all the mandatory questions (marked “*”)');
          return;
        }
        this.saveAgentName = this.agentDDLform.filter(s => s.value == this.evalFormAgent)[0];
        // console.log(this.selectedEvalItem);
        // console.log(this.saveAgentName);
        // console.log(this.saveAgentName.queueDetail);
        this.evaluatesaveModel.evaluationId = this.selectedEvalItem.evaluationId;
        this.evaluatesaveModel.evaluationRoomName = this.selectedEvalItem.evaluationRoomName;
        this.evaluatesaveModel.strategyId = this.selectedEvalItem.strategyId;
        this.evaluatesaveModel.strategyName = this.selectedEvalItem.strategyName;
        this.evaluatesaveModel.questionsList = this.questionsList;
        this.evaluatesaveModel.contactId = this.currentContact;
        // this.evaluatesaveModel.queue_name = this.saveAgentName==undefined || this.saveAgentName.queueDetail==undefined || this.saveAgentName.queueDetail.name==undefined?"":this.saveAgentName.queueDetail.name;
        // this.evaluatesaveModel.queueid = this.saveAgentName==undefined?"" : this.saveAgentName.queueDetail.id;
        // this.evaluatesaveModel.agent_name = this.saveAgentName==undefined?"" : this.saveAgentName.label;
        this.evaluatesaveModel.queue_name = this.saveAgentName?.queueDetail?.name;
        this.evaluatesaveModel.queueid = this.saveAgentName?.queueDetail?.id;
        this.evaluatesaveModel.agent_name = this.saveAgentName?.label;
        this.evaluatesaveModel.evaluationReportRoom = this.getReportEvalname;
        this.evaluatesaveModel.status = status;
        this.evaluatesaveModel.userid = this.evalFormAgent;
        this.evaluatesaveModel.evaluation_interactions_id = this.selectedEvaluator;
        // this.evaluatesaveModel.evaluation_coach=this.evaluation_coach;
        let url = utils.pathPhase3 + "/api/redshift";
        this.loading = true;
        this.spinnerService.show();
        this.evService.evaluationWorkSpaceSave(this.evaluatesaveModel).subscribe(
          (data: any) => {
            this.questionsList.forEach((evItem: any) => {
              evItem.Topics.questions.forEach(ques => {
                ques.numberValue = "";
                ques.answerdata = null;
              });
            });
            this.loading = false;
            this.evaluatesaveModel = new EvaluateSaveModel();
            this.currentContact = ''
            this.getTopicReport = [];
            this.transcriptTab = [];
            this.allNotes = [];
            this.evalFormAgent = "";
            this.agentDDLform = [];
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
            // this.rowClick = false;
            this.tooltip = "Please select interactions for evaluation";
            // this.filterInteraction('filter')
            if (data.result == 'No data available!') {
              this.commonMethods.addToastforlongtime(false, 'Record not found');
            } else {
              this.commonMethods.addToastforlongtime(true, data.result);
            }
            this.spinnerService.hide();
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

        this.saveAgentName = this.agentDDLform.filter(s => s.value == this.evalFormAgent)[0];

        this.evaluatesaveModel.evaluationId = this.selectedEvalItem.evaluationId;
        this.evaluatesaveModel.evaluationRoomName = this.selectedEvalItem.evaluationRoomName;
        this.evaluatesaveModel.strategyId = this.selectedEvalItem.strategyId;
        this.evaluatesaveModel.strategyName = this.selectedEvalItem.strategyName;
        this.evaluatesaveModel.questionsList = this.questionsList;
        this.evaluatesaveModel.contactId = this.currentContact;
        this.evaluatesaveModel.queue_name = this.saveAgentName?.queueDetail?.name;
        this.evaluatesaveModel.queueid = this.saveAgentName?.queueDetail?.id;
        this.evaluatesaveModel.agent_name = this.saveAgentName?.label;
        this.evaluatesaveModel.evaluationReportRoom = this.getReportEvalname;
        this.evaluatesaveModel.status = status;
        this.evaluatesaveModel.userid = this.evalFormAgent;
        this.evaluatesaveModel.evaluation_interactions_id = this.selectedEvaluator;
        // this.evaluatesaveModel.evaluation_coach=this.evaluation_coach;
        this.loading = true;
        this.spinnerService.show();
        this.evService.evaluationWorkSpaceSave(this.evaluatesaveModel).subscribe(
          (data: any) => {
            this.questionsList.forEach((evItem: any) => {
              evItem.Topics.questions.forEach(ques => {
                ques.numberValue = "";
                ques.answerdata = null;
              });
            });
            this.loading = false;
            this.evaluatesaveModel = new EvaluateSaveModel();
            this.currentContact = ''
            this.getTopicReport = [];
            this.transcriptTab = [];
            this.allNotes = [];
            this.evalFormAgent = "";
            this.agentDDLform = [];
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
            this.tooltip = "Please select interactions for evaluation";
            if (data.result == 'No data available!') {
              this.commonMethods.addToastforlongtime(false, 'Record not found');
            } else {
              this.commonMethods.addToastforlongtime(true, data.result);
            }
            this.spinnerService.hide();
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
  getTranscribeData() {
    this.evService.getTranscribeData(this.currentContact).subscribe((data: any) => {
      if(data[0]?.from_user_emailid==undefined) {
        this.transcriptTab = data.sort(this.commonMethods.compareValues('start_time'));
      } else {
        this.transcriptTab = data;
        this.transcriptTab.forEach(element => {
          // element.start_time = this.datePipe.transform(element.start_time, 'MM/dd/yyyy hh:mm a');
          element.start_time = moment(element.start_time).format("MM/dd/yyyy hh:mm a");
        });
      }
    }, (error) => {
      console.log(error);
      this.transcriptTab = [];
      // this.commonMethods.addToastforlongtime(false, error.error);
    })
  }
  tableLoading() {
    if (!this.istableGet) {
      this.istableGet = true;
    }
  }
  filterInteraction(flag) {
    this.isfilterLoading = true
    if (!this.istableGet) {
      this.istableGet = true;
    }
    this.getEvaluationWorkspaceReport().then((resReport) => {
      return this.filterItem(flag)
    }).then((resInt) => {
      this.isfilterLoading = false
      this.filterAgentAndQueue();
      this.istableGet = false;
    }).catch((err) => {
      this.isfilterLoading = false;
      this.istableGet = false;
      this.commonMethods.addToastforlongtime(false, err);
    })
  }

  filterAgentAndQueue() {
    let result: Object[];
    if (this.agentCategory.trim() == '') {
      this.agentCategory = 'All'
    }
    if (this.queueCategory.trim() == '') {
      this.queueCategory = 'All'
    }

    if (this.agentCategory.toLowerCase().trim() == 'all' && this.queueCategory.toLowerCase().trim() == 'all') {
      this.setPageagentFilter(1, this.allItems)
    } else if (this.agentCategory.toLowerCase().trim() != 'all' && this.queueCategory.toLowerCase().trim() != 'all') {
      result = this.allItems.filter((item: any) => {
        if (typeof (item.e) == 'string' && typeof (item.q) == 'string') {
          return item.e.toLowerCase().trim() == this.agentCategory.toLowerCase().trim() && item.q.toLowerCase().trim() == this.queueCategory.toLowerCase().trim()
        }

      })
      this.setPageagentFilter(1, result)
    } else if (this.agentCategory.toLowerCase().trim() == 'all' && this.queueCategory.toLowerCase().trim() != 'all') {
      result = this.allItems.filter((item: any) => {
        if (typeof (item.e) == 'string' && typeof (item.q) == 'string') {
          return item.q.toLowerCase().trim() == this.queueCategory.toLowerCase().trim()
        }

      })
      this.setPageagentFilter(1, result)
    } else if (this.agentCategory.toLowerCase().trim() != 'all' && this.queueCategory.toLowerCase().trim() == 'all') {
      result = this.allItems.filter((item: any) => {
        if (typeof (item.e) == 'string' && typeof (item.q) == 'string') {
          return item.e.toLowerCase().trim() == this.agentCategory.toLowerCase().trim()
        }

      })
      this.setPageagentFilter(1, result)
    } else {
      this.setPageagentFilter(1, this.agentItem)
    }
  }



  /* Pagination functions */

  setPageagentFilter(page: number, result: any = []) {
    // get pager object from service
    this.pager = this.pagerService.getPager(result.length, page);

    // get current page of items
    this.pagedItems = result.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // console.log('pagedItems', this.pagedItems)
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // console.log('pagedItems', this.pagedItems)

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

  audioPlayerInit() {
    if (typeof (this.ws) == 'object' && typeof (this.ws.destroy) == 'function') {
      this.ws.destroy();
    }
    this.ws = WaveSurfer.create({
      container: '#audio-spectrum',
      waveColor: '#41c4fe',
      backend: 'MediaElement',
      autoCenter: true,
      partialRender: false,
      removeMediaElementOnDestroy: false,
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
            padding: '2px',
            'font-size': '12px',


          }
        })
      ],

      progressColor: 'gray',
      scrollParent: false,

    });
    if (typeof (this.ws) == 'object' && this.audioUrl.trim() != "") {
      let resAudioLoad = this.ws.load(this.audioUrl);
      // if (resAudioLoad.xhr.status != 200 && resAudioLoad.xhr.status != 206 && resAudioLoad.xhr.status != 304) {
      //   this.audioUrl = environment.uiUrl + '/' + 'assets/mp3/0917.mp3';
      //   this.ws.load(this.audioUrl)
      //   // this.commonMethods.addToastforlongtime(false, 'Access Denied')
      // }
    }

  }
  onChangeBlur() {
    this.evalRoomName = null;
    this.questionsList = [];
    // this.AgentDDL = false;
    this.AgentDDL = true;
    this.agentDDLform = [];
    this.totalCountQues = 0;
    this.totalCountNotes = 0;
    this.totalQues = 0;
    this.totalNotes = 0;
    this.totalScore = 0;
    this.evaluatesaveModel = new EvaluateSaveModel();
  }
  getEvaluationDossiers() {
    this.getDossierID().then((res) => {
      this.validateMstrReportId().then((validIdRes: any) => {
        if (validIdRes['isSuccess'].toLowerCase() == 'success') {
      // this.getmstrInstanceID().then(res1 =>{
      //   this.sendDataTOmstr().then(res12 =>{
          this.workspaceTable();
        // })
      // })
       }
      })
    })
  }
  getDossierID() {
    return new Promise((resolve, reject) => {
      this.spinnerService.show();
      // this.keyQuestionsService.getKeyQuestions().subscribe(
        this.subscription_DossierID = this.keyQuestionsService.getMstrConfig().subscribe(
        (data: any) => {
          this.DossierId = typeof (data.evaluation_dossierId) != 'undefined' ? data.evaluation_dossierId : null;
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
  searchTeams(event) {
    this.resultTeams = this.teamItem.filter(q => q.toLowerCase().includes(event.query.toLowerCase()))
  }
  searchEvalUser(event) {
    this.resultEvalName = this.evalUserItem.filter(q => q.toLowerCase().includes(event.query.toLowerCase()))
  }
  onChangeTime(time) {
    if (time == null || time < 0) {
      this.errhandleTime = true
    } else if (time == 0) {
      this.errhandleTime = false;
    } else {
      this.errhandleTime = false;
    }
  }

  EmptyFun() {
    if (this.agentCategory == null || this.agentCategory == '') {
      this.agentCategory = 'All';
      this.OnchangeAgent();
    }
    if (this.queueCategory == null || this.queueCategory == '') {
      this.queueCategory = 'All';
      this.OnchangeQueue();
    }
    if (this.teamCategory == null || this.teamCategory == '') {
      this.teamCategory = 'All';
      this.OnchangeTeam();
    }
    if (this.evalUserCategory == null || this.evalUserCategory == '') {
      this.evalUserCategory = 'All';
      this.OnchangeEvalUsername();
    }
    if (this.convCategory == null || this.convCategory == '') {
      this.convCategory = 'All';
      this.OnchangeConversation();
    }
  }

  resetLeftsidefilters() {
    // this.dossier1.filterClearAll()
    this.agentCategory = 'All';
    this.queueCategory = 'All';
    this.teamCategory = 'All';
    this.evalUserCategory = 'All';
    this.statusModel = "All";
  }
  CalculateScore() {
    // console.log(i,val)

    let total_S = 0;
    let total_Q = 0;
    let total_N = 0;
    this.questionsList.forEach((data: any) => {
      data.Topics.questions.forEach(element => {

        if (element.questionChoice == "Choice") {
          if (element.answerdata != undefined && element.answerdata != null) {
            if (element.answerdata.Score != undefined && element.answerdata.Score != null) {

              // total_S += parseInt(element.answerdata.Score)
              // if (element?.displaytype?.value == "radio") {
              //   element.questionData.forEach((quesData, indexQD) => {
              //     if (quesData.value.Answer == element.answerdata) {
              //       // console.log('quesData.value.Score', quesData.value.Score);
              //       total_S += quesData.value.Score == null || quesData.value.Score == undefined ? 0 : parseFloat(parseFloat(quesData.value.Score).toFixed(2));
              //       // if(quesData.value.Score.toString().includes('.')) {
              //       //   total_S += parseFloat(parseFloat(quesData.value.Score).toFixed(2));
              //       // } else {
              //       //   total_S += quesData.value.Score;
              //       // }
              //     }
              //   });
              // } else {
                // console.log('element.answerdata.Score', element.answerdata.Score);
                total_S += element.answerdata.Score == null || element.answerdata.Score == undefined ? 0 : parseFloat(parseFloat(element.answerdata.Score).toFixed(2));
                // if(element.answerdata.Score.toString().includes('.')) {
                //   total_S += parseFloat(parseFloat(element.answerdata.Score).toFixed(2));
                // } else {
                //   total_S += element.answerdata.Score;
                // }
              // }
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
              // if (element?.displaytype?.value == "radio") {
              //   element.questionData.forEach((quesData, indexQD) => {
              //     if (quesData.value.Answer == element.answerdata) {
              //       // console.log('quesData.value.Score', quesData.value.Score);
              //       total_S += quesData.value.Score == null || quesData.value.Score == undefined ? 0 : parseFloat(parseFloat(quesData.value.Score).toFixed(2));
              //       // if(quesData.value.Score.toString().includes('.')) {
              //       //   total_S += quesData.value.Score == null || quesData.value.Score == undefined? 0 : parseFloat(parseFloat(quesData.value.Score).toFixed(2));
              //       // } else {
              //       //   total_S += quesData.value.Score;
              //       // }
              //     }
              //   });
              // } else {
                // console.log('quesData.value.Score', element.answerdata.Score);
                total_S += element.answerdata.Score == null || element.answerdata.Score == undefined ? 0 : parseFloat(parseFloat(element.answerdata.Score).toFixed(2));
                // if(element.answerdata.Score.toString().includes('.')) {
                //   total_S += quesData.value.Score == null || quesData.value.Score == undefined? 0 : parseFloat(parseFloat(element.answerdata.Score).toFixed(2));
                // } else {
                //   total_S += element.answerdata.Score;
                // }
              // }
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


      });
    })

    if (total_Q <= 0) {
      total_Q = 0
    }

    let finalFloatValue = total_S?.toString().split(".");
    if(finalFloatValue[1]?.length >2) {
      this.totalScore = parseFloat(parseFloat(finalFloatValue[0]+'.'+finalFloatValue[1].substring(0, 2)).toFixed(2));
    } else {
      this.totalScore = total_S;
    }

    // this.totalScore = total_S;
    this.totalQues = total_Q;
    this.totalNotes = total_N;
    
  }
  getEvalFromDB() {
    this.AllEvalData = [];
    return new Promise((resolve, reject) => {
      this.evService.getEvaluationForms().subscribe(
        (data: any) => {
          if (data.length > 0 || data != undefined || data != null) {
            data.forEach(element => {
              let LabelObj = {
                label: element.evaluationRoomName,
                value: element.evaluationId
              }
              this.AllEvalData.push(LabelObj);
            });
            resolve(this.AllEvalData);
          }
        },
        (err) => {
          console.log(err)
          reject(err)
        }
      )

    })

  }
  workspaceTable() {
    this.EvalItemDDL = [];
    this.statusDDL = [{
      label: 'All',
      value: ''
    }];
    this.agentItem = ['All'];
    this.queueItem = ['All'];
    this.conversationItem = ['All'];
    this.teamItem = ['All'];
    this.evalUserItem = ['All'];
    this.agentCategory = 'All';
    this.queueCategory = 'All';
    this.teamCategory = 'All';
    this.evalUserCategory = 'All';
    this.statusModel = "";
    this.convCategory = 'All';
    this.category = ""

    try {
      this.getEvalFromDB().then((response) => {
        this.EvalRes = response
      })
      let projectID = this.projectID;
      let dossierID = this.DossierId
      this.mstrIdToken = localStorage.getItem("mstrIdToken");
      this.mstrIdToken = JSON.parse(this.mstrIdToken)
      // this.mstrIdToken['x-mstr-identitytoken'] = 'fdjkllkfdjkklfdkj'
      this.idToken = "?idToken=" + this.mstrIdToken['x-mstr-identitytoken'];
      let DFrdate;
      let Dtodate;
      let projectUrl = environment.mstr_Url + projectID;
      let dossierUrl = projectUrl + '/' + dossierID + this.idToken;
      this.spinnerService.show();
      if (this.mstrIdToken['x-mstr-identitytoken'] == undefined) {
        this.spinnerService.hide();
      }
      setTimeout(() => {
        this.spinnerService.hide();
      }, 10000);
      const getDossierDOMobj = document.getElementById("dossierContainer1");
      if (typeof (getDossierDOMobj) != 'undefined' && getDossierDOMobj != null && getDossierDOMobj.id == 'dossierContainer1') {
      microstrategy.dossier.create({
        placeholder: document.getElementById("dossierContainer1"),
        url: dossierUrl,
        // instance: this.dossierInstanceID,
        enableResponsive: false,
        errorHandler: function () {
          this.spinnerService.hide()
        }.bind(this),
        filterFeature: {
          enabled: false
        },
      }).then(function (dossier) {
        this.dossier1 = dossier;
        $('#errorDossierId').hide();
        this.dossier1.getFilterList().then(function (filterList) {
          this.dossierFilterList = filterList;
          //Populate filter values in dropdown/auto-complete
          this.populateFilters();

          //Add event listeners
          this.addDossierEventListeners(dossier);

          //Set intial filter values
          this.setInitialFilters();

          this.AgentDDL = true;
          this.getEvalutionItems();
          this.spinnerService.hide();
        }.bind(this));
      }.bind(this)).catch((e) => {
        this.spinnerService.hide();
      }).finally(function () {
        setTimeout(() => {
          this.spinnerService.hide();
        }, 10000);
      }.bind(this));
    }
    } catch (e) {
      console.log(e);
      this.spinnerService.hide();
    }
  }

  populateFilters() {
    if(this.dossierFilterList == null) {
      return;
    }
    for (let i = 0; i < this.dossierFilterList.length; i++) {
      let filter = this.dossierFilterList[i];
      let availableFilterName = filter.filterName;
      let availableFilterKey = filter.filterKey;
      
      if (availableFilterName == "Evaluation Room") {
        let availableFilterItems = [];
        availableFilterItems = filter.filterDetail.items;
        availableFilterItems.forEach(element => {
          this.EvalRes.forEach(dbItem => {
            if (dbItem.label == element.name) {
              let labelVal = {
                label: element.name,
                value: element.value
              }
              if (this.localRole.toLowerCase() != 'admin' && this.roleEvalForm != null) {
                if (dbItem.value == this.roleEvalForm) {
                  this.EvalItemDDL.unshift(labelVal)
                }
                else {
                  this.EvalItemDDL.push(labelVal);
                }
              }
              else {
                this.EvalItemDDL.push(labelVal);
              }
            }
          });
        });
      }
      else if (availableFilterName == "Interaction Start Time - Dt") {
        let filterKeyDate = [];
        filterKeyDate = filter.filterKey;
        let filterDetail = filter.filterDetail;
        this.fromDate = new Date(moment(filterDetail.minDate).format("MM/DD/YYYY"));
        this.toDate = new Date(moment(filterDetail.maxDate).format("MM/DD/YYYY"));
      }
      else if (availableFilterName == "Conversation ID") {
        let availableFilterItems = [];
        availableFilterItems = filter.filterDetail.items;
        availableFilterItems.forEach(element => {
          this.conversationItem.push(element.name);
        });
      }
      else if (availableFilterName == "Agent Name") {
        let availableFilterItems = [];
        availableFilterItems = filter.filterDetail.items;
        availableFilterItems.forEach(element => {
          this.agentItem.push(element.name);
        });
      }
      else if (availableFilterName == "Queue Name") {
        let availableFilterItems = [];
        availableFilterItems = filter.filterDetail.items;
        availableFilterItems.forEach(element => {
          this.queueItem.push(element.name);
        });
      }
      else if (availableFilterName == "Evaluator Username") {
        let availableFilterItems = [];
        availableFilterItems = filter.filterDetail.items;
        availableFilterItems.forEach(element => {
          this.evalUserItem.push(element.name);
        });
      }
      else if (availableFilterName == "Team") {
        let availableFilterItems = [];
        availableFilterItems = filter.filterDetail.items;
        availableFilterItems.forEach(element => {
          this.teamItem.push(element.name);
        });
      }
      else if (availableFilterName == "Evaluation Status") {
        let availableFilterItems = [];
        availableFilterItems = filter.filterDetail.items;
        availableFilterItems.forEach(element => {
          let labelVal = {
            label: element.name,
            value: element.value
          }
          this.statusDDL.push(labelVal);
        });
      }
    }
  }

  addDossierEventListeners(dossier) {
    var refreshBtn = document.getElementById('refresh-btn-dossier');
    refreshBtn.addEventListener('click', function() {
      this.onChangeEvalution();
      this.onChangeEvaluationForm();
    }.bind(this));

    //Select conversation ID handler
    dossier.registerEventHandler(
          "onGraphicsSelected",
          this.conversationIdselectHandler);
  }

  conversationIdselectHandler = function(e) {
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
    // this.currentContact = selectionObjConvId==undefined?"":selectionObjConvId.text;
    this.currentContact = selectionObjConvId.text;
    this.spinnerService.hide();
    this.totalScore = 0;
    this.totalQues = 0;
    this.totalNotes = 0;
    this.getTopicReport = [];
    this.transcriptTab = [];
    if (!this.currentContact?.includes('NON-ACD')) {
      this.getTranscribeData();
      this.getEvalTopic();
      this.getNotes();
    } else {
      this.getEvalutionDetail();
      // this.allNotes = [];
    }
  }.bind(this);

  setInitialFilters() {
    for (let i = 0; i < this.dossierFilterList.length; i++) {
      let filter = this.dossierFilterList[i];
      let availableFilterName = filter.filterName;
      let availableFilterKey = filter.filterKey;
      
      //Set evaluation form filter
      if (availableFilterName == "Evaluation Room") {
        this.category = this.EvalItemDDL[0].value;
        var refreshBtn = document.getElementById('refresh-btn-dossier');
        refreshBtn.click();
      }
    }
  }

  onChangeEvaluationForm() {
    if(this.dossierFilterList == null) {
      return;
    }
    for (let i = 0; i < this.dossierFilterList.length; i++) {
      let filter = this.dossierFilterList[i];
      let availableFilterName = filter.filterName;
      let availableFilterKey = filter.filterKey;
      
      if (availableFilterName == "Evaluation Room") {
        let ele_val = '';
        let selections = [];
        let filterInfoObj = {
          key: availableFilterKey
        };
        this.EvalItemDDL.forEach(element => {
          if (this.selectedLabel == undefined || this.selectedLabel == null) {
            this.selectedLabel = this.selectlabelDB
          }
          if (element.label == this.selectedLabel) {
            ele_val = element.value
          }
        });
        if(ele_val!='') {
          let selectionObj = {
            name: "Evaluation Room",
            value: ele_val
          };
          selections.push(selectionObj);
          let filterDataObj = {
            selections: selections,
            filterInfo: filterInfoObj
          }
          if (this.category.length == 0 || this.category == null) {
            this.dossier1.filterClear(filterDataObj);
          } else {
            this.dossier1.filterSelectMultiAttributes(filterDataObj);
          }
        }
      }
    }
  }

  OnchangeAgent() {
    for (let i = 0; i < this.dossierFilterList.length; i++) {
      let filter = this.dossierFilterList[i];
      let availableFilterName = filter.filterName;
      let availableFilterKey = filter.filterKey;
      if (availableFilterName == "Agent Name") {
        let selections = [];
        let filterInfoObj = {
          key: availableFilterKey
        };
        let availableFilterItems = filter.filterDetail.items;
        let selectedVal = "";
        availableFilterItems.forEach(element => {
          if (element.name == this.agentCategory) {
            selectedVal = element.value
          }
        });
        let selectionObj = {
          name: "Agent Name",
          value: selectedVal,
        };
        selections.push(selectionObj);
        let filterDataObj = {
          selections: selections,
          filterInfo: filterInfoObj
        }
        if (selectedVal == '' || selectedVal.toLowerCase() == "all") {
          this.dossier1.filterClear(filterDataObj);
        } else {
          this.dossier1.filterSelectMultiAttributes(filterDataObj);
        }
      }

    }
  }




  OnchangeQueue() {
    for (let i = 0; i < this.dossierFilterList.length; i++) {
      let filter = this.dossierFilterList[i];
      let availableFilterName = filter.filterName;
      let availableFilterKey = filter.filterKey;
      if (availableFilterName == "Queue Name") {
        let selections = [];
        let filterInfoObj = {
          key: availableFilterKey
        };
        let availableFilterItems = filter.filterDetail.items;
        let selectedVal = ""
        availableFilterItems.forEach(element => {
          if (element.name == this.queueCategory) {
            selectedVal = element.value
          }
        });
        let selectionObj = {
          name: "Queue Name",
          value: selectedVal,
        };
        selections.push(selectionObj);
        let filterDataObj = {
          selections: selections,
          filterInfo: filterInfoObj
        }
        if (selectedVal == '' || selectedVal.toLowerCase() == "all") {
          this.dossier1.filterClear(filterDataObj);
        } else {
          this.dossier1.filterSelectMultiAttributes(filterDataObj);
        }
      }

    }
  }

  OnchangeTeam() {
    for (let i = 0; i < this.dossierFilterList.length; i++) {
      let filter = this.dossierFilterList[i];
      let availableFilterName = filter.filterName;
      let availableFilterKey = filter.filterKey;
      if (availableFilterName == "Team") {
        let selections = [];
        let filterInfoObj = {
          key: availableFilterKey
        };
        let availableFilterItems = filter.filterDetail.items;
        let selectedVal = ""
        availableFilterItems.forEach(element => {
          if (element.name == this.teamCategory) {
            selectedVal = element.value
          }
        });
        let selectionObj = {
          name: "Team",
          value: selectedVal,
        };
        selections.push(selectionObj);
        let filterDataObj = {
          selections: selections,
          filterInfo: filterInfoObj
        }
        if (selectedVal == '' || selectedVal.toLowerCase() == "all") {
          this.dossier1.filterClear(filterDataObj);
        } else {
          this.dossier1.filterSelectMultiAttributes(filterDataObj);
        }
      }
    }
  }

  OnchangeEvalUsername() {
    for (let i = 0; i < this.dossierFilterList.length; i++) {
      let filter = this.dossierFilterList[i];
      let availableFilterName = filter.filterName;
      let availableFilterKey = filter.filterKey;

      if (availableFilterName == "Evaluator Username") {
        let selections = [];
        let filterInfoObj = {
          key: availableFilterKey
        };
        let availableFilterItems = filter.filterDetail.items;
        let selectedVal = ""
        availableFilterItems.forEach(element => {
          if (element.name == this.evalUserCategory) {
            selectedVal = element.value
          }
        });
        let selectionObj = {
          name: "Evaluator Username",
          value: selectedVal,
        };
        selections.push(selectionObj);
        let filterDataObj = {
          selections: selections,
          filterInfo: filterInfoObj
        }

        if (selectedVal == '' || selectedVal.toLowerCase() == "all") {
          this.dossier1.filterClear(filterDataObj);
        } else {
          this.dossier1.filterSelectMultiAttributes(filterDataObj);
        }
      }

    }
  }

  OnchangeDateFilter() {

    // moment(this.toDate).format("MM/DD/YYYY")
    // console.log(moment(this.fromDate).format("MM/DD/YYYY")<=moment(this.toDate).format("MM/DD/YYYY"));
    // console.log(moment(this.fromDate).isBefore(moment(this.toDate)));
    
    if(moment(this.fromDate).isBefore(moment(this.toDate))) {
      for (let i = 0; i < this.dossierFilterList.length; i++) {
        let filter = this.dossierFilterList[i];
        let availableFilterName = filter.filterName;
        let availableFilterKey = filter.filterKey;
        if (availableFilterName == "Interaction Start Time") {
          // let filterInfoObj = {
          //   key: availableFilterKey,
          // };
          // let filterDataObj = {
          //   filterInfo: filterInfoObj,
          //   date: {
          //     from: moment(this.fromDate).format("MM/DD/YYYY") + " 12:00:00 AM",
          //     to: moment(this.toDate).format("MM/DD/YYYY") + " 11:59:00 PM"
          //   }
          // }

          var closestFromIndex = -1;
              filter.filterDetail.items.some((item, index) => {
                var dateItemFormatted = moment(item.name).format("MM/DD/YYYY");
                //Compare and get the closest matching fromDate
                // if(new Date(dateItemFormatted) >= new Date(this.fromDate)) {
                  if(
                    (new Date(dateItemFormatted) <= (new Date(moment(this.toDate).format("MM/DD/YYYY"))))
                    && 
                    (new Date(dateItemFormatted) >= (new Date(moment(this.fromDate).format("MM/DD/YYYY"))))
                ) {
                  closestFromIndex = filter.filterDetail.items.indexOf(item);
                  return true;
                }
              });
        

        var closestToIndex = -1;
        filter.filterDetail.items.slice().reverse().some((item, index) => {
            var dateItemFormatted = moment(item.name).format("MM/DD/YYYY");
            //Compare and get the closest matching fromDate
            // if(new Date(dateItemFormatted) <= new Date(this.toDate)) {
              if(
                (new Date(dateItemFormatted) <= (new Date(moment(this.toDate).format("MM/DD/YYYY"))))
                && 
                (new Date(dateItemFormatted) >= (new Date(moment(this.fromDate).format("MM/DD/YYYY"))))
            ) {
                // console.log('filterDetail.indexOf(item) :: ', filter.filterDetail.items.indexOf(item));
                closestToIndex = filter.filterDetail.items.indexOf(item);
                return true;
            }
        });

        let filterInfoObj = {
          key: availableFilterKey,
        };

        let filterDataObj = {
          filterInfo: filterInfoObj,
          selections: [closestFromIndex,closestToIndex]
        }

          let errFrom = moment(filter.filterDetail.items[filter.filterDetail.indexInfo.from].name).format("MM/DD/YYYY");
          let errTo = moment(filter.filterDetail.items[filter.filterDetail.indexInfo.to].name).format("MM/DD/YYYY");
          let fromSelect = this.fromDate
          let toSelect = this.toDate
          $('#dossierContainer1').show();
          $('#errorDossierId').hide();
          if (fromSelect < new Date(errFrom) || fromSelect > new Date(errTo)) {
            this.commonMethods.addToastforlongtime(false, "'From' Date are exceed from the evaluation dossier");
            // this.fromDate = filter.filterDetail.minDate;
            this.fromDate = new Date(moment(filter.filterDetail.items[filter.filterDetail.indexInfo.from].name).format("MM/DD/YYYY"));
          } else if (toSelect < new Date(errFrom) || toSelect > new Date(errTo)) {
            this.commonMethods.addToastforlongtime(false, "'To' Date are exceed from the evaluation dossier");
            // this.toDate = filter.filterDetail.maxDate;
            this.toDate = new Date(moment(filter.filterDetail.items[filter.filterDetail.indexInfo.to].name).format("MM/DD/YYYY"));
          } else if((closestFromIndex==-1) && (closestToIndex==-1)) {
              $('#errorDossierId').show();
              $('#dossierContainer1').hide();
              // this.commonMethods.addToastforlongtime(false, "Data Does Not Exists for Selected Dates");
              this.dossier1.filterClear(filterDataObj);
          } else {
            if (fromSelect == null || toSelect == null) {
              this.dossier1.filterClear(filterDataObj);
            } else {
              // this.dossier1.filterSetDateRange(filterDataObj);
              this.dossier1.filterAttributeMultiSlider(filterDataObj);
            }
          }
        }
      }
    } else {
      this.commonMethods.addToastforlongtime(false, "From Date has been exceeded by To Date");
    }
  }

  OnchangeStatus() {
    for (let i = 0; i < this.dossierFilterList.length; i++) {
      let filter = this.dossierFilterList[i];
      let availableFilterName = filter.filterName;
      let availableFilterKey = filter.filterKey;

      if (availableFilterName == "Evaluation Status") {
        let status_val = '';
        let selections = [];
        let filterInfoObj = {
          key: availableFilterKey
        };
        status_val = this.statusDDL.filter(s => s.value == this.statusModel)[0].value;
        // console.log(status_val)
        let selectionObj = {
          name: "Evaluation Status",
          value: status_val
        };
        selections.push(selectionObj);
        let filterDataObj = {
          selections: selections,
          filterInfo: filterInfoObj
        }
        if (this.statusModel == '' || this.statusModel.toLowerCase() == "all") {
          this.dossier1.filterClear(filterDataObj);
        } else {
          this.dossier1.filterSelectMultiAttributes(filterDataObj);
        }
      }

    }
  }

  OnchangeConversation() {
    for (let i = 0; i < this.dossierFilterList.length; i++) {
      let filter = this.dossierFilterList[i];
      let availableFilterName = filter.filterName;
      let availableFilterKey = filter.filterKey;
      if (availableFilterName == "Conversation ID") {
        const selections = [];
        const filterInfoObj = {
          key: availableFilterKey
        };
        const availableFilterItems = filter.filterDetail.items;
        let selectedVal = ""
        availableFilterItems.forEach(element => {
          if (element.name == this.convCategory) {
            selectedVal = element.value
          }
        });
        const selectionObj = {
          name: "Conversation ID",
          value: selectedVal,
        };
        selections.push(selectionObj);
        const filterDataObj = {
          selections: selections,
          filterInfo: filterInfoObj
        }
        if (selectedVal == '' || selectedVal.toLowerCase() == "all") {
          this.dossier1.filterClear(filterDataObj);
        } else {
          this.dossier1.filterSelectMultiAttributes(filterDataObj);
        }
      }

    }
  }
  searchConversation(event) {
    this.resultConvID = this.conversationItem.filter(a => a.toLowerCase().includes(event.query.toLowerCase()))
  }

  getEvalTopic() {
    // for temprary purpose :
    // this.getEvalutionDetail();

    this.mstrToken = localStorage.getItem("mstrAuthToken");
    let mstr = JSON.parse(this.mstrToken);
    let agentDDL = []
    // this.currentContact = "37d9310f-6686-4f30-994b-a35120cd5247"; //590fcce9-9a76-4798-8023-676178b321ca
    let params = {
      customerId: UserData.customerId,
      cookie: mstr['cookie'],
      conversationid: this.currentContact,
      ReportNo: "4",
      X_MSTR_AuthToken: mstr['authToken']
    }
    this.agentDDLform = [];
    this.evalFormAgent = "";
    agentDDL = [];
    this.interactionService.GetReportData(params).subscribe(
      (data: any) => {
        if (data.ReportData.result.data.root != null) {
          this.audioEndpoint = data.ReportData.result.data.root.children[0].children[0].children[0].children[0].children[0].children[0].children[0].element.name;
          this.getTopicReport = data.ReportData.result.data.root.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children;
          this.getReportEvalname = data.ReportData.result.data.root.children[0].children[0].children[0].element.name;
          this.getQueueLoopAgent = data.ReportData.result.data.root.children[0].children[0].children[0].children
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
                  queueDetail:{
                    name: item1.element.name,
                    id: id.element.name
                  }

                }
                agentDDL.push(labelValue);
              });
            });
          });
          // console.log(JSON.stringify(agentDDL))

          if (this.currentContact != null || this.currentContact != "") {
            this.agentDDLform = agentDDL
            this.evalFormAgent = this.agentDDLform[0].value;
            this.getEvalutionDetail();
          } else {
            agentDDL = [];
            this.agentDDLform = [];
          }

          this.getSignedURL();
        }
        this.refreshBtn(false)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getSignedURL() {
    const regExp = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (regExp.test(this.audioEndpoint)) {
      this.evService.getEvaluateObj(this.audioEndpoint).subscribe(
        (data: any) => {
          this.audioUrl = data.url
          this.refreshBtn();
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
    if (typeof (this.ws) == 'object' && typeof (this.ws.toggleMute) == 'function') {
      $('#mute').find('i').toggleClass('fa-volume-up fa-volume-off');
      this.ws.toggleMute();
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
        if(element.includes('=')) {
        data = element.split("=");
        } else if(element.includes('-')) {
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


  clearData(flag) {
    if (flag == 'eOnChange') {
      this.pagedItems = [];
      this.pager = {};
      this.topicsTab = [];
      this.transcriptTab = [];
      this.rowClick = false;
      this.currentContact = '';
      this.tooltip = "Please select interactions for evaluation"
    } else if (flag == 'clickTableRow') {
      this.currentContact = '';
      this.topicsTab = [];
      this.transcriptTab = [];
    } else if (flag == 'filter') {
      this.pagedItems = [];
      this.pager = {};
      this.topicsTab = [];
      this.transcriptTab = [];
      this.rowClick = false;
      this.currentContact = '';
      this.tooltip = "Please select interactions for evaluation"
    }
  }

  getTimeMediaPlayer() {
    setTimeout(() => {
      const time = this.ws.getCurrentTime().toString();
      this.getTimePlayer = time
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
    // this.currentContact = '005ad6e0-3794-49f3-9a11-16b2a212a91e'
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

    this.evService.saveNotes(this.notesModel).subscribe(
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
    // console.log("ContactID",this.currentContact)
    // this.currentContact = '005ad6e0-3794-49f3-9a11-16b2a212a91e'
    this.evService.getNotes(this.currentContact).subscribe(
      (data: any) => {
        this.allNotes = data.message;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  deletepopup(item) {
    this.itemConvID = item.conversationid;
    this.itemId = item.id;
  }
  deleteNotes() {
    this.evService.deleteNotes(this.itemConvID, this.itemId).subscribe(
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
    // this.currentContact = '37d9310f-6686-4f30-994b-a35120cd5247';
    // this.selectedEvalItem.evaluationId= '1562150992767';
    // this.evalFormAgent = '01597a9a-de68-47c0-b6af-1550892cbd6b';
    this.spinnerService.show();
    await this.evService.getEvaluationAns(this.currentContact, this.selectedEvalItem.evaluationId, this.evalFormAgent, this.selectedEvalItem.evaluationRoomName, this.selectedEvaluator).subscribe(
      async (data: any) => {
        if (data != null) {
          this.conditionalSkipCount = 0;
          await data[0].questionsList.forEach((dataques: any, topicJ) => {
            dataques.Topics.questions.forEach((element, quesI) => {
              // console.log("status", data[0]);
              // console.log("status", data[0].evaluation_status);

              // Question data convert to float value
              if(element.questionData != undefined) {
                element?.questionData.forEach(elementQD => {
                  if(elementQD.value?.Score!=null || elementQD.value?.Score!='') {
                    if(element?.displaytype?.value != "radio" && element.answerdata?.Score != null && element.answerdata?.Score.toString().includes('.')) {
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
                  }
                });
              }

              if(data[0].evaluation_status != "InComplete") {
              // Answer data reassign to Evaluation Selected Form
                this.questionsList.forEach((elementT:any) => {
                  elementT.Topics.questions.forEach(elementQ => {
                    // Question data convert to float value
                    if(elementQ.questionData != undefined) {
                      elementQ.questionData.forEach(elementQD => {
                        if(elementQD.value?.Score!=null || elementQD.value?.Score!='') {
                          // elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                          if(element?.displaytype?.value != "radio" && element.answerdata?.Score != null && element.answerdata?.Score.toString().includes('.')) {
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
                        }
                      });
                    }

                    if(element.questionid == elementQ.questionid) {
                      if(element.questionChoice != 'Number' && elementQ.questionChoice != 'Number') {
                        if(elementQ.answerdata == undefined) {
                          elementQ.answerdata = null;
                          elementQ.answerdata = element.answerdata;
                        } else {
                          elementQ.answerdata = null;
                          elementQ.answerdata = element.answerdata;
                        }
                      } else {
                        if(elementQ.answerdata == undefined) {
                          elementQ.numberValue = null;
                          elementQ.numberValue = element.numberValue;
                        } else {
                          elementQ.numberValue = null;
                          elementQ.numberValue = element.numberValue;
                        }
                      }
                    }
                  });
                });
              } else {
                this.questionsList.forEach((elementT:any) => {
                  elementT.Topics.questions.forEach(elementQ => {
                    // Question data convert to float value
                    if(elementQ.questionData != undefined) {
                      elementQ.questionData.forEach(elementQD => {
                        if(elementQD.value?.Score!=null || elementQD.value?.Score!='') {
                          // elementQD.value.Score = parseFloat(elementQD.value.Score).toFixed(2).toString();
                          if(element?.displaytype?.value != "radio" && element.answerdata?.Score != null && element.answerdata?.Score.toString().includes('.')) {
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
                        }
                      });
                    }
                                      
                    if(element.questionid == elementQ.questionid) {
                      if(element.questionChoice != 'Number' && elementQ.questionChoice != 'Number') {
                        if(elementQ.answerdata == undefined) {
                          elementQ.answerdata = null;
                        } else {
                          elementQ.answerdata = null;
                        }
                      } else {
                        if(elementQ.answerdata == undefined) {
                          elementQ.numberValue = null;
                        } else {
                          elementQ.numberValue = null;
                        }
                      }
                    }
                  });
                });
              }

              // Replace Undefiend object value to Empty string
              if(element.questionData != undefined && element.questionData != null) {
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
              if(element.conditionalSkipQuestion == undefined ) {
                element.conditionalSkipQuestion = true;
              }
              if(element.conditionalSkip && element.conditionalSkipDetails != undefined ) {
                element.conditionalSkipQuestion = false;
              }

              // if(element.conditionalSkipQuestion == null && element.conditionalSkipQuestion == undefined ) {
                if(topicJ==0 && quesI==0) {
                  if((data[0].questionsList[0].Topics.questions[0]?.answerdata?.Answer != null && element.answerdata?.Score != null) || data[0].questionsList[0].Topics.questions[0]?.numberValue != null) {
                    this.conditionalSkipQuestionShow(topicJ, quesI, data[0].questionsList, 1);
                  } else {
                    this.conditionalSkipQuestionShow(topicJ, quesI, data[0].questionsList, 1);
                    if(element?.conditionalSkipQuestion == undefined ) {
                      // element.conditionalSkipQuestion = true;
                    }
                  }
                } else {
                  this.conditionalSkipQuestionShow(topicJ, quesI, data[0].questionsList, 1);
                }
              // }

            });
            if(data.topicShowHide == undefined ) {
              data.topicShowHide = true;
            } else {
              data.topicShowHide = true;
            }
            if(topicJ == 0) {
              dataques.topicShowHide = true;
            }

          });
          // console.log("data[0].questionsList", data[0].questionsList);
          // console.log("this.questionsList", this.questionsList);
          
          // this.questionsList = data[0].questionsList;
          this.resetQuesList = this.questionsList;
          this.eval_Status = data[0].evaluation_status;
          this.disableqa = (data[0].disableqa == undefined || data[0].disableqa == null) ? false : data[0].disableqa;
          // this.disablecoach = (data[0].disablecoach == undefined || data[0].disablecoach == null) ? false : data[0].disablecoach;
          this.allowResubmit = data[0].allowResubmit

          // this.evaluatesaveModel.evaluation_coach = data[0].evaluation_coach
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

   reloadWorkspace() {
    this.mstrTokenService.refreshMSTRSession();
  //   this.spinnerService.show();
  //   this.mstrTokenService.ReloadWorkspace().subscribe(
  //     (data: any) => {
  //       // console.log(data)
  //       this.mstrTokenService.recreateMSTRsession(data);
  //       this.spinnerService.hide();
  //       window.location.reload();  

  //     },
  //     (error) => {
  //       console.log(error);
  //       this.spinnerService.hide();
  //     }
  //   )
  //   // window.location.reload()
   }

  getEvalutionDetail() {
    // console.log(this.selectedEvalItem);

    this.spinnerService.show();
    this.evService.getEvalutionDetail(this.currentContact, this.selectedEvalItem.evaluationId, this.evalFormAgent, this.selectedEvalItem.evaluationRoomName, this.currentEvaluationDetails.evalRoomIsNonACD).subscribe(
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
          if (this.currentContact != null || this.currentContact != "") {
            if (data.agentdetail[0].label != null && data.agentdetail[0].value != null) {
              this.agentDDLform = data.agentdetail;
              this.evalFormAgent = data.agentdetail[0].value;
            }
          }
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
    this.loginService.getroles(this.localRole).subscribe(
      (data: any) => {
        if (data.roleEvaluationFormID != null || data.roleEvaluationFormID != undefined) {
          this.roleEvalForm = data.roleEvaluationFormID;
        }

      }, (error) => {
        console.log('error', error);
      }
    )
  }

  textAreaKeys(event) {
    if ((event.keyCode == 13 || event.charCode == 13)|| (event.keyCode == 124 || event.charCode == 124) || (event.keyCode == 92 || event.charCode == 92) || (event.keyCode == 47 || event.charCode == 47)) {
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
  conformPopOver(i,j) {
  //   // this.descValue = "";
  this.isCopy = false;
    if(this.isConformBox == false) {
      this.indexTexti = i;
      this.indexTextj = j;
      this.isConformBox = true;
      setTimeout(() => {
        this.isConformBox = false;
      }, 12500);
    } else {
      this.isConformBox = false;
      this.indexTexti = i;
      this.indexTextj = j;
    }
  }

  tickFun(i,j,val) {
    this.isConformBox = false;
    this._clipboardService.copy(val);
    this.indexTexti = i;
    this.indexTextj = j;
    this.isCopy = true;
    setTimeout(() => {
      this.isCopy = false;
    }, 3000);
  }

  crossFun(i,j) {
    this.isConformBox = false;
    this.indexTexti = i;
    this.indexTextj = j;
    this.isCopy = false;
  }

  // Reset evaluation form Que&Ans data
  resetModel() {
    // console.log(this.eval_Status.toLowerCase())
    if(this.currentContact == '' || this.currentContact == null) {
      this.commonMethods.addToastforlongtime(false, 'Please select interactions to reset the evaluation');
    } else if(this.eval_Status.toLowerCase() == 'incomplete' && (this.currentContact != '' || this.currentContact != null)) {
      this.commonMethods.addToastforlongtime(false, 'Selected interaction has no record');
    } else {
      document.getElementById('modalOpen').click();
    }
  }

  async resetData() {
    await this.resetQuesList.forEach((data: any) => {
      data.Topics.questions.forEach(element => {

        if(element.questionData != undefined && element.questionData != null) {
          element.questionData.forEach(elementlabel => {
            elementlabel.label = elementlabel.label.replace(' (undefined)', '');
            // if(elementlabel.value.Score == undefined || elementlabel.value.Score == null) {
            //   elementlabel.value.Score = 0;
            // }
          });
        }
        if(element.conditionalSkipQuestion == undefined ) {
          element.conditionalSkipQuestion = true;
        }
        if(element.conditionalSkip && element.conditionalSkipDetails != undefined ) {
          // element.conditionalSkipQuestion = false;
          element.conditionalSkipQuestion = true;
        }
      });
        if(data.topicShowHide == undefined ) {
          data.topicShowHide = true;
        } else {
          data.topicShowHide = true;
        }

    });

    this.questionsList = this.resetQuesList;

    this.spinnerService.show();
    this.evService.resetEvalData(this.selectedEvaluator).subscribe(
      (data:any)=> {
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
      (error)=> {
        console.log(error);
        this.spinnerService.hide();
      }
    );

  }
  ReloadData() {
    if(this.isloadSpinner == false) {
      document.getElementById('dossierContainer1').style.display = 'none';
      this.isloadSpinner = true;
      const tableId = document.getElementById('dossierContainer1');
      microstrategy.dossier.destroy({placeholder: tableId});
    }
    this.workspaceTable();
    this.spinnerService.hide();
    setTimeout(() => {
      this.isloadSpinner = false;
      document.getElementById('dossierContainer1').style.display = 'block';
    }, 7000);
  }

  async ReplaceSlashFuctionEvaluationForm(feedback, j, i) {
    // this.questionsList.forEach((data: any) => {
      this.questionsList.forEach((data: any, index1) => {
      data.Topics.questions.forEach((element, index) => {
        if (index1==j && index == i) {
          if (element.questionChoice == 'Comments') {
          // console.log(element.questionChoice);
          if (feedback!=null || feedback!==undefined) {
            // feedback = feedback.replace(/\//g, '');
          feedback = feedback.replace(/\\n/g, '');
          feedback = feedback.replace(/\//g, '');
          feedback = feedback.replace(/\\/g, '');
          feedback = feedback.replace(/\|/g, '');
          setTimeout(() => {
          return element.answerdata=feedback;
          }, 10);
        }
        }
      }


      });
    });

}

conditionalSkipCount:any = 0;
async conditionalSkipQuestionShow(j, i, questionsList, reassign) {

    let countReset = 0;
    // await questionsList.forEach((elementTopic:any, indexTopic) => {
    //   elementTopic.Topics.questions.forEach((elementQuest, indexQuestion) => {
    //     if(j!=indexTopic && i!=indexTopic && elementQuest.conditionalSkip) {
    //         // elementQuest.forEach(Qlist => {
    //           elementQuest?.conditionalSkipDetails?.conditionalList.forEach(CSQList => {
    //             // debugger

    //             if(questionsList[j].Topics.questions[i].questionid == CSQList.conditionalQuestion.id || questionsList[j].Topics.questions[i]?.questionId == CSQList.conditionalQuestion.id ) {
    //               // console.log('id', questionsList[j].Topics.questions[i]);
    //               // console.log('CSQList', CSQList);
    //               if (questionsList[j].Topics.questions[i].questionChoice == 'Number' && questionsList[j].Topics.questions[i].numberValue >= CSQList.conditionalValue.split('=')[0] && questionsList[j].Topics.questions[i].numberValue <= CSQList.conditionalValue.split('=')[1]) {
    //                 countReset = countReset+1;
    //                 return countReset;
    //               }
    //               if (questionsList[j].Topics.questions[i].questionChoice == 'Choice') {
    //                 const getConditionalValues = CSQList.conditionalValue.split(',');
    //                 getConditionalValues.forEach(elementCSQVal => {
    //                   if(questionsList[j].Topics.questions[i].answerdata?.Answer+'='+questionsList[j].Topics.questions[i].answerdata?.Score == elementCSQVal || questionsList[j].Topics.questions[i].answerdata?.Answer+'-'+questionsList[j].Topics.questions[i].answerdata?.Score == elementCSQVal ) {
    //                     countReset = countReset+1;
    //                     return countReset;
    //                 }
    //                 });
    //               }

    //               if (questionsList[j].Topics.questions[i].questionChoice == 'Yes/No') {
    //                 if(questionsList[j].Topics.questions[i].answerdata?.Answer+'='+questionsList[j].Topics.questions[i].answerdata?.Score == CSQList.conditionalValue  ||
    //                 questionsList[j].Topics.questions[i].answerdata?.Answer+'-'+questionsList[j].Topics.questions[i].answerdata?.Score == CSQList.conditionalValue ) {
    //                   countReset = countReset+1;
    //                   return countReset;
    //                 }
    //               }
    //               if (questionsList[j].Topics.questions[i].questionChoice == 'Comments') {
    //                 if(questionsList[j].Topics.questions[i].answerdata == CSQList.conditionalValue) {
    //                   countReset = countReset+1;
    //                   return countReset;
    //                 } 
    //               }

    //             }
    //       });
    //     // });
    //     }

    //   });
    // });

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
        });
      });
    
    //  console.log('questionsList', questionsList);
    //  console.log('this.questionsList', this.questionsList);

  // Conditional Skip Question show/hide function
  // await questionListAll.forEach((elementQuestAns, indexT) => {
      await this.questionsList.forEach((elementTopic:any, indexTopic) => {
      let topicCount = 0;
        elementTopic.Topics.questions.forEach((elementQuest, indexQuestion) => {
          let count = 0;
          let conditionCheck = 0;

              // if(elementQuest?.questionChoice == 'Choice'|| elementQuest?.questionChoice == 'Yes/No' || elementQuest?.questionChoice == 'Comments') {
              //   if((elementQuest?.answerdata == null || elementQuest?.answerdata == '') && indexT!=0 && indexQ != 0) {
              //     elementQuest.conditionalSkipQuestion = false;
              //   }
              // } else {
              //   if((elementQuest?.numberValue == null || elementQuest?.numberValue == '') && indexT!=0 && indexQ != 0) {
              //     elementQuest.conditionalSkipQuestion = false;
              //   }
              // }

              //  First Qustion show Code block
              if(indexTopic == 0 && indexQuestion == 0 ) {
                if(elementQuest.conditionalSkipQuestion == undefined) {
                  elementQuest.conditionalSkipQuestion = true;
                } else {
                  elementQuest.conditionalSkipQuestion = true;
                }
              }


            if(elementQuest.conditionalSkip && elementQuest.conditionalSkipDetails != null && elementQuest.conditionalSkipDetails !== undefined) {
                if(elementQuest.conditionalSkipDetails?.conditionMet == 'Any') {

                  elementQuest.conditionalSkipDetails.conditionalList.forEach(elementCSQuest => {
                      questionListAll.forEach((elementQuestAns, indexT) => {
                            if(elementCSQuest.conditionalQuestion?.id == elementQuestAns.questionId ) {
                              // if(elementCSQuest.conditionalQuestion?.id == elementQuestAns.questionId && elementCSQuest.conditionalQuestion?.id!=undefined && elementQuestAns.questionId!=undefined) {

                                if( elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Number') {
                                  let getConditionalValues;
                                  if(elementCSQuest.conditionalValue?.toString().includes('=')) {
                                    getConditionalValues = elementCSQuest.conditionalValue.split('=');
                                  }
                                  if(elementCSQuest.conditionalValue?.toString().includes('-')) {
                                    getConditionalValues = elementCSQuest.conditionalValue.split('-');
                                  }
                                  // console.log('elementQuestAns.numberValue', elementQuestAns.numberValue);
                                  // console.log('getConditionalValues[0]', getConditionalValues[0]);
                                  // console.log('getConditionalValues[1]', getConditionalValues[1]);

                                  if( parseInt(elementQuestAns.numberValue) >= parseInt(getConditionalValues[0]) && parseInt(elementQuestAns.numberValue) <= parseInt(getConditionalValues[1])) {
                                    count = count + 1;
                                    conditionCheck = conditionCheck + 1;
                                  } else {
                                    conditionCheck = conditionCheck + 1;
                                  }
                                }
                                if(elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Choice') {
                                  const getConditionalValues = elementCSQuest.conditionalValue.split(',');
                                  let choiceCount = 0;
                                  getConditionalValues.forEach(elementCSQVal => {
                                    // if(elementQuestAns.answerdata?.Answer+'='+elementQuestAns.answerdata?.Score == elementCSQVal || elementQuestAns.answerdata?.Answer+'-'+elementQuestAns.answerdata?.Score == elementCSQVal ) {
                                      if(elementQuestAns.answerdata?.Answer == elementCSQVal?.split('=')[0] || elementQuestAns.answerdata?.Answer == elementCSQVal?.split('-')[0] ) {
                                        choiceCount = choiceCount + 1;
                                      // if(choiceCount >= getConditionalValues.length) {
                                      if(choiceCount >= 1) {
                                        count = count + 1;
                                        conditionCheck = conditionCheck + 1;
                                      }
                                  } else {
                                      conditionCheck = conditionCheck + 1;
                                    }
                                  });
                                }
                                if(elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Yes/No') {
                                  // if(elementCSQuest.conditionalValue == elementQuestAns.answerdata?.Answer+'='+elementQuestAns.answerdata?.Score || elementCSQuest.conditionalValue == elementQuestAns.answerdata?.Answer+'-'+elementQuestAns.answerdata?.Score ) {
                                  if(elementCSQuest.conditionalValue?.split('=')[0] == elementQuestAns.answerdata?.Answer || elementCSQuest.conditionalValue?.split('=')[0] == elementQuestAns.answerdata?.Answer ) {
                                    count = count + 1;
                                    conditionCheck = conditionCheck + 1;
                                  } else {
                                    conditionCheck = conditionCheck + 1;
                                  }
                                }
                                if(elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Comments') {
                                  if(elementCSQuest.conditionalValue == elementQuestAns.answerdata ) {
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
                  // if(j != indexT && i != indexQ) {
                    if(count>0 && conditionCheck>0) {
                      // elementQ.conditionalSkipQuestion = true;
                      elementQuest.conditionalSkipQuestion = true;

                      // Default value reassign section
                      // await this.questionsList.forEach((data: any, index) => {
                      //   data.Topics.questions.forEach((elementQuest, index1) => {
                        if(elementQuest.conditionalSkipQuestion) {
                          // console.log('elementQuest.answerdata', elementQuest.answerdata);

                          if((elementQuest.questionChoice == 'Yes/No') && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
                            //   if(elementQuest?.displaytype?.value == "radio") {
                            //     if((elementQuest.answerdata == null)) {
                            //     // if(elementQuest.defaultanswer.Answer!=undefined && elementQuest.answerdata) {
                            //       elementQuest.answerdata = elementQuest.defaultanswer.Answer;
                            //     // } else {
                            //       // elementQuest.answerdata = elementQuest.defaultanswer;
                            //     // }
                            //   }
                            //   //  else {
                            //   //   elementQuest.answerdata = elementQuest.defaultanswer;
                            //   // }
                            // } else {
                              if((elementQuest.answerdata?.Answer == null)) {
                                // elementQuest.answerdata = elementQuest.defaultanswer;
                                elementQuest.questionData.forEach((quesData, indexQD) => {
                                  if(quesData.value.Answer == elementQuest.defaultanswer || quesData.value.Answer == elementQuest.defaultanswer?.Answer) {
                                    elementQuest.answerdata = quesData?.value;
                                  }
                                });
                              }
                            // }
                          } 
                          if((elementQuest.questionChoice == 'Choice') && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
                          //   if(elementQuest?.displaytype?.value == "radio") {
                          //     if((elementQuest.answerdata == null)) {
                          //     // if(elementQuest.defaultanswer.Answer!=undefined && elementQuest.answerdata) {
                          //       elementQuest.answerdata = elementQuest.defaultanswer.Answer;
                          //     // } else {
                          //       // elementQuest.answerdata = elementQuest.defaultanswer;
                          //     // }
                          //   }
                          //   //  else {
                          //   //   elementQuest.answerdata = elementQuest.defaultanswer;
                          //   // }
                          // } else {
                            if((elementQuest.answerdata?.Answer == null)) {
                              // elementQuest.answerdata = elementQuest.defaultanswer;
                              elementQuest.questionData.forEach((quesData, indexQD) => {
                                if(quesData.value.Answer == elementQuest.defaultanswer || quesData.value.Answer == elementQuest.defaultanswer?.Answer) {
                                  elementQuest.answerdata = quesData?.value;
                                }
                              });
                            }
                          // }
                          }
                          if(elementQuest.questionChoice == 'Number' && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
                            // if(elementQuest.numberValue == null || elementQuest.numberValue == undefined) {
                            //   elementQuest.numberValue = elementQuest.defaultanswer;
                            // }
                            if(elementQuest.numberValue == null) {

                              if(elementQuest.defaultanswer.toString().includes('.')) {
                                // || elementQuest.numberValue.isNaN()
                                elementQuest.numberValue = elementQuest.defaultanswer == null || elementQuest.defaultanswer == undefined? 0 : parseFloat(parseFloat(elementQuest.defaultanswer).toFixed(2));
                              } else {
                                elementQuest.numberValue = elementQuest.defaultanswer == null || elementQuest.defaultanswer == undefined? 0 : parseInt(elementQuest.defaultanswer);
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

                    } else {
                      if(count==0 && conditionCheck>0) {
                        if(elementQuest.questionChoice != 'Number') {
                          elementQuest.answerdata = null;
                        } else {
                          elementQuest.numberValue = null;
                        }
                        elementQuest.conditionalSkipQuestion = false;
                    } else if(conditionCheck == 0) {
                      if(elementQuest.questionChoice != 'Number') {
                        elementQuest.answerdata = null;
                      } else {
                        elementQuest.numberValue = null;
                      }
                      elementQuest.conditionalSkipQuestion = false;
                    } else {
                      if(elementQuest.questionChoice != 'Number') {
                        elementQuest.answerdata = null;
                      } else {
                        elementQuest.numberValue = null;
                      }
                      elementQuest.conditionalSkipQuestion = false;
                    }
                    this.CalculateScore();
                    }
                  // }

                }

                if(elementQuest.conditionalSkipDetails?.conditionMet == 'All') {

                  elementQuest.conditionalSkipDetails.conditionalList.forEach(elementCSQuest => {
                      questionListAll.forEach((elementQuestAns, indexT) => {
                        // console.log('elementCSQuest.conditionalQuestion?.id',elementCSQuest.conditionalQuestion?.id);
                        // console.log('elementQuestAns.questionId', elementQuestAns.questionId);
                        // console.log(elementCSQuest.conditionalQuestion?.id == elementQuestAns.questionId);
                        // console.log('elementCSQuest',elementCSQuest);
                        // console.log('elementQuestAns', elementQuestAns);
                        if(elementCSQuest.conditionalQuestion?.id == elementQuestAns.questionId || elementCSQuest.conditionalQuestion?.id == elementQuestAns.questionid) {
                              // if(elementCSQuest.conditionalQuestion?.id == elementQuestAns.questionId && elementCSQuest.conditionalQuestion?.id!=undefined && elementQuestAns.questionId!=undefined) {
                              // console.log('questionListAll', questionListAll);


                                // console.log("Conditional check with QuestionAnswers");

                                if( elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Number') {
                                  // const getConditionalValues = elementCSQuest.conditionalValue.split('-');
                                  let getConditionalValues;
                                  if(elementCSQuest.conditionalValue?.toString().includes('=')) {
                                    getConditionalValues = elementCSQuest.conditionalValue.split('=');
                                  }
                                  if(elementCSQuest.conditionalValue?.toString().includes('-')) {
                                    getConditionalValues = elementCSQuest.conditionalValue.split('-');
                                  }
                                  
                                  // console.log('indexTopic && indexQuestion', indexTopic +'-'+ indexQuestion);
                                  // console.log('elementQuestAns.numberValue', typeof(elementQuestAns.numberValue));
                                  // console.log('getConditionalValues[0]', typeof(getConditionalValues[0]));
                                  // console.log('getConditionalValues[1]', typeof(getConditionalValues[1]));
                                  // console.log('Check', parseInt(elementQuestAns.numberValue) >= parseInt(getConditionalValues[0]) && parseInt(elementQuestAns.numberValue) <= parseInt(getConditionalValues[1]));
                                  if( parseInt(elementQuestAns.numberValue) >= parseInt(getConditionalValues[0]) && parseInt(elementQuestAns.numberValue) <= parseInt(getConditionalValues[1])) {
                                    // console.log(getConditionalValues[0]);
                                    // console.log(getConditionalValues[1]);
                                    // console.log(elementQuestAns.numberValue);

                                    count = count + 1;
                                    conditionCheck = conditionCheck + 1;
                                  } else {
                                    conditionCheck = conditionCheck + 1;
                                  }
                                }
                                if(elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Choice') {
                                  const getConditionalValues = elementCSQuest.conditionalValue.split(',');
                                  let choiceCount = 0;
                                  getConditionalValues.forEach(elementCSQVal => {
                                    // if(elementQuestAns.answerdata?.Answer+'='+elementQuestAns.answerdata?.Score == elementCSQVal || elementQuestAns.answerdata?.Answer+'-'+elementQuestAns.answerdata?.Score == elementCSQVal ) {
                                      if(elementQuestAns.answerdata?.Answer == elementCSQVal?.split('=')[0] || elementQuestAns.answerdata?.Answer == elementCSQVal?.split('-')[0] ) {
                                      choiceCount = choiceCount + 1;
                                      // if(choiceCount >= getConditionalValues.length) {
                                      if(choiceCount >= 1) {
                                        count = count + 1;
                                        conditionCheck = conditionCheck + 1;
                                      }
                                  } else {
                                      conditionCheck = conditionCheck + 1;
                                    }
                                  });
                                }
                                if(elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Yes/No') {
                                  // if(elementCSQuest.conditionalValue == elementQuestAns.answerdata?.Answer+'='+elementQuestAns.answerdata?.Score || elementCSQuest.conditionalValue == elementQuestAns.answerdata?.Answer+'-'+elementQuestAns.answerdata?.Score ) {
                                  if(elementCSQuest.conditionalValue?.split('=')[0] == elementQuestAns.answerdata?.Answer || elementCSQuest.conditionalValue?.split('=')[0] == elementQuestAns.answerdata?.Answer ) {
                                    count = count + 1;
                                    conditionCheck = conditionCheck + 1;
                                  } else {
                                    conditionCheck = conditionCheck + 1;
                                  }
                                }
                                if(elementCSQuest.conditionalQuestion.questionChoice == elementQuestAns.questionChoice && elementQuestAns.questionChoice == 'Comments') {
                                  if(elementCSQuest.conditionalValue == elementQuestAns.answerdata ) {
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
                  // if(j != indexT && i != indexQ) {

                    if(count >= elementQuest.conditionalSkipDetails.conditionalList.length && conditionCheck>0) {
                      // elementQ.conditionalSkipQuestion = true;
                      elementQuest.conditionalSkipQuestion = true;

                      // Default value reassign section
                      // await this.questionsList.forEach((data: any, index) => {
                      //   data.Topics.questions.forEach((elementQuest, index1) => {
                        if(elementQuest.conditionalSkipQuestion) {
                          // console.log('elementQuest.answerdata', elementQuest.answerdata);

                          if((elementQuest.questionChoice == 'Yes/No') && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
                            //   if(elementQuest?.displaytype?.value == "radio") {
                            //     if((elementQuest.answerdata == null)) {
                            //     // if(elementQuest.defaultanswer.Answer!=undefined && elementQuest.answerdata) {
                            //       elementQuest.answerdata = elementQuest.defaultanswer.Answer;
                            //     // } else {
                            //       // elementQuest.answerdata = elementQuest.defaultanswer;
                            //     // }
                            //   }
                            //   //  else {
                            //   //   elementQuest.answerdata = elementQuest.defaultanswer;
                            //   // }
                            // } else {
                              if((elementQuest.answerdata?.Answer == null)) {
                                // elementQuest.answerdata = elementQuest.defaultanswer;
                                elementQuest.questionData.forEach((quesData, indexQD) => {
                                  if(quesData.value.Answer == elementQuest.defaultanswer || quesData.value.Answer == elementQuest.defaultanswer?.Answer) {
                                    elementQuest.answerdata = quesData?.value;
                                  }
                                });
                              }
                            // }
                          } 
                          if((elementQuest.questionChoice == 'Choice') && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
                          //   if(elementQuest?.displaytype?.value == "radio") {
                          //     if((elementQuest.answerdata == null)) {
                          //     // if(elementQuest.defaultanswer.Answer!=undefined && elementQuest.answerdata) {
                          //       elementQuest.answerdata = elementQuest.defaultanswer.Answer;
                          //     // } else {
                          //       // elementQuest.answerdata = elementQuest.defaultanswer;
                          //     // }
                          //   }
                          //   //  else {
                          //   //   elementQuest.answerdata = elementQuest.defaultanswer;
                          //   // }
                          // } else {
                            if((elementQuest.answerdata?.Answer == null)) {
                              // elementQuest.answerdata = elementQuest.defaultanswer;
                              elementQuest.questionData.forEach((quesData, indexQD) => {
                                if(quesData.value.Answer == elementQuest.defaultanswer || quesData.value.Answer == elementQuest.defaultanswer?.Answer) {
                                  elementQuest.answerdata = quesData?.value;
                                }
                              });
                            }
                          // }
                          }
                          if(elementQuest.questionChoice == 'Number' && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
                            // if(elementQuest.numberValue == null || elementQuest.numberValue == undefined) {
                            //   elementQuest.numberValue = elementQuest.defaultanswer;
                            // }
                            if(elementQuest.numberValue == null) {
                              if(elementQuest.defaultanswer.toString().includes('.')) {
                                // || elementQuest.numberValue.isNaN()
                                elementQuest.numberValue = elementQuest.defaultanswer == null || elementQuest.defaultanswer == undefined? 0 : parseFloat(parseFloat(elementQuest.defaultanswer).toFixed(2));
                              } else {
                                elementQuest.numberValue = elementQuest.defaultanswer == null || elementQuest.defaultanswer == undefined? 0 : parseInt(elementQuest.defaultanswer);
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
                      // console.log('elementQuest', elementQuest);
                      if(count<elementQuest.conditionalSkipDetails.conditionalList.length && conditionCheck>0) {
                        if(elementQuest.questionChoice != 'Number') {
                          elementQuest.answerdata = null;
                        } else {
                          elementQuest.numberValue = null;
                        }
                        elementQuest.conditionalSkipQuestion = false;
                      } else if(conditionCheck == 0) {
                        if(elementQuest.questionChoice != 'Number') {
                          elementQuest.answerdata = null;
                        } else {
                          elementQuest.numberValue = null;
                        }
                        elementQuest.conditionalSkipQuestion = false;
                      } else {
                        if(elementQuest.questionChoice != 'Number') {
                          elementQuest.answerdata = null;
                        } else {
                          elementQuest.numberValue = null;
                        }
                        elementQuest.conditionalSkipQuestion = false;
                      }
                      this.CalculateScore();
                    }
                  // }

                }
            }

            // Topic show/hide count section
            if(elementQuest.conditionalSkipQuestion==true) {
              topicCount = topicCount+1;
            }
            // console.log('elementQuest', elementQuest);
        });

            // Topic show/hide section
            // if(topicCount >= elementTopic.Topics.questions.length) {
            if(topicCount > 0) {
              if(elementTopic.topicShowHide == undefined ) {
                elementTopic.topicShowHide = true;
              } else {
                elementTopic.topicShowHide = true;
              }
            } else {
              if(elementTopic.topicShowHide == undefined ) {
                elementTopic.topicShowHide = false;
              } else {
                elementTopic.topicShowHide = false;
              }
            }
            if(indexTopic == 0) {
              elementTopic.topicShowHide = true;
            }

      });
            // console.log('this.questionsList', this.questionsList);



        if(reassign==1) {

        // setTimeout(() => {
          await this.questionsList.forEach((data: any, index) => {
            data.Topics.questions.forEach((elementQuest, index1) => {
              if(elementQuest.conditionalSkipQuestion) {
                if((elementQuest.questionChoice == 'Yes/No') && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
                  //   if(elementQuest?.displaytype?.value == "radio") {
                  //     if((elementQuest.answerdata == null)) {
                  //     // if(elementQuest.defaultanswer.Answer!=undefined && elementQuest.answerdata) {
                  //       elementQuest.answerdata = elementQuest.defaultanswer.Answer;
                  //     // } else {
                  //       // elementQuest.answerdata = elementQuest.defaultanswer;
                  //     // }
                  //   }
                  //   //  else {
                  //   //   elementQuest.answerdata = elementQuest.defaultanswer;
                  //   // }
                  // } else {
                    if((elementQuest.answerdata?.Answer == null)) {
                      // elementQuest.answerdata = elementQuest.defaultanswer;
                      elementQuest.questionData.forEach((quesData, indexQD) => {
                        if(quesData.value.Answer == elementQuest.defaultanswer || quesData.value.Answer == elementQuest.defaultanswer?.Answer) {
                          elementQuest.answerdata = quesData?.value;
                        }
                      });
                    }
                  // }
                } 
                if((elementQuest.questionChoice == 'Choice') && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
                //   if(elementQuest?.displaytype?.value == "radio") {
                //     if((elementQuest.answerdata == null)) {
                //     // if(elementQuest.defaultanswer.Answer!=undefined && elementQuest.answerdata) {
                //       elementQuest.answerdata = elementQuest.defaultanswer.Answer;
                //     // } else {
                //       // elementQuest.answerdata = elementQuest.defaultanswer;
                //     // }
                //   }
                //   //  else {
                //   //   elementQuest.answerdata = elementQuest.defaultanswer;
                //   // }
                // } else {
                  if((elementQuest.answerdata?.Answer == null)) {
                    // elementQuest.answerdata = elementQuest.defaultanswer;
                    elementQuest.questionData.forEach((quesData, indexQD) => {
                      if(quesData.value.Answer == elementQuest.defaultanswer || quesData.value.Answer == elementQuest.defaultanswer?.Answer) {
                        elementQuest.answerdata = quesData?.value;
                      }
                    });
                  }
                // }
                }
                if(elementQuest.questionChoice == 'Number' && (elementQuest.defaultanswer != null || elementQuest.defaultanswer != undefined)) {
                  if(elementQuest.numberValue == null || elementQuest.numberValue == undefined) {
                    elementQuest.numberValue = elementQuest.defaultanswer;
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

            });
          });
        // }, 0);
        setTimeout(() => {
          this.conditionalSkipQuestionShow(j, i, this.questionsList, 0);
          reassign = 0;
          }, 10);
      // }
        }
      // console.log('this.questionsList', this.questionsList);


}

async tempraryResetData(jTopic, iQuestion) {
  this.spinnerService.show();

    await this.questionsList.forEach((data: any, indexTopic) => {
    data.Topics.questions.forEach((element, indexQuest) => {
      // console.log('tempraryResetData', element);
      
      if( indexTopic >= jTopic && indexQuest > iQuestion && element.conditionalSkip) {
        this.CalculateScore();
      if (element.questionChoice == 'Choice') {
        if (element.answerdata != undefined && element.answerdata != null) {
          if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
            element.answerdata = null;
          }
        }
      }
      if (element.questionChoice == 'Yes/No') {
        if (element.answerdata != undefined && element.answerdata != null) {
          if (element.answerdata.Score != undefined && element.answerdata.Score != null) {
            element.answerdata = null;
          }
        }
      }
      if (element.questionChoice == 'Number') {
        if (element.numberValue != null || element.numberValue !== undefined && element.numberValue !== '') {
          element.numberValue = null;
        }
      }
      if (element.questionChoice == 'Comments') {
        if (element.answerdata != null || element.answerdata !== undefined && element.answerdata !== '') {
          element.answerdata = null;
        }
      }

      } else {
        if(indexTopic > jTopic && indexQuest <= iQuestion && element.conditionalSkip) {
          this.CalculateScore();
          if (element.questionChoice == 'Choice') {
            if (element.answerdata !== undefined && element.answerdata != null) {
              if (element.answerdata.Score !== undefined && element.answerdata.Score != null) {
                element.answerdata = null;
              }
            }
          }
          if (element.questionChoice == 'Yes/No') {
            if (element.answerdata !== undefined && element.answerdata != null) {
              if (element.answerdata.Score !== undefined && element.answerdata.Score != null) {
                element.answerdata = null;
              }
            }
          }
          if (element.questionChoice == 'Number') {
            if (element.numberValue != null || element.numberValue !== undefined && element.numberValue !== '') {
              element.numberValue = null;
            }
          }
          if (element.questionChoice == 'Comments') {
            if (element.answerdata != null || element.answerdata !== undefined && element.answerdata !== '') {
              element.answerdata = null;
            }
          }

        }
      }

    });
  });
  // this.totalNotes = 0;
  // this.totalScore = 0;
  // this.totalQues = 0;
  // this.resetQuesList = [];
  this.spinnerService.hide();
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
    if(numberValue < minmax[0] || minmax[1]<numberValue) {
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
            if(j==jindex && i==iindex) {
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
          if(j==jindex && i==iindex) {
              element.numberValue = parseFloat(parseFloat(numberValue).toFixed(2));
            // element.numberValue = parseFloat(numberValue).toFixed(2);
          }
        });
        });
      }, 100);
    }
  
  }

  validateMstrReportId() {
    let params = {
      dossierId: this.DossierId,
      reportType: "55",
      AuthToken: JSON.parse(localStorage.getItem('mstrAuthToken')),
      projectId: this.projectID
    }
    return new Promise((resolve, reject) => {
      this.subscription_ValidateReportID =  this.keyQuestionsService.validateMstrReportId(params).subscribe(
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

    // !!! keep this ngOnDestroy method at last ,please verify if anybody work on this component !!!
    ngOnDestroy() {
      if (typeof (this.ws) == 'object' && typeof (this.ws.destroy) == 'function') {
        this.ws.destroy();
      }

      if (this.subscription_DossierID) {
        this.subscription_DossierID.unsubscribe();
      }
      if (this.subscription_ValidateReportID) {
        this.subscription_ValidateReportID.unsubscribe();
      }
  
      const getDossierDOMobj = document.getElementById("dossierContainer1");
      if (typeof (getDossierDOMobj) != 'undefined' && getDossierDOMobj != null) {
        if(getDossierDOMobj.id == 'dossierContainer1'){
          microstrategy.dossier.destroy({ placeholder: getDossierDOMobj });
        }
        getDossierDOMobj.remove();
      }
    }

}

