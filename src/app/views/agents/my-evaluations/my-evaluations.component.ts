import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethods } from '../../../common/common.components';
import { GlobalComponent } from '../../../global/global.component';
import { UserData } from '../../../user';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
import { MyEvaluationsService } from './my-evaluations.component.service';
import { environment } from '../../../../environments/environment';
import { EvaluationWorkspaceNacdService } from '../../evaluations/evaluation-workspace-nacd/evaluation-workspace-nacd.service';
import { MstrTokenService } from '../../../services/mstrtoken.service';
import { PreferenceService } from '../../settings/successkpi-setting/successkpi-setting.service';
import { Subscription } from 'rxjs';
import { InteractionService } from '../../interaction-details/interaction-details.service';
declare var microstrategy: any;

@Component({
  selector: 'app-my-evaluations',
  templateUrl: './my-evaluations.component.html',
  styleUrls: ['./my-evaluations.component.css']
})
export class MyEvaluationsComponent implements OnInit {
  
  DossierId: any = null;
  projectID: any = null;
  isloadSpinner: boolean = false;
  myEvaluations: string = null;
  currentContact: any = null;
  currentEvaluationId: any = null;
  AgentAcceptDisputeStatus: any = ''; 
  AgentAcceptDisputeComments: any = ''; 
  AgentAcceptOptionDisable: boolean = true; 
  AgentDisputeOptionDisable: boolean = true; 
  selectedEvaluations: any = [];
  subscription_DossierID: Subscription;
  subscription_ValidateReportID: Subscription;
  subscription_mstrValidToken: Subscription;
  constructor(private keyQuestionsService: KeyQuestionsService, public global: GlobalComponent, private commonMethods: CommonMethods, 
    private spinnerService: NgxSpinnerService, public myEvaluation: MyEvaluationsService, public evService: EvaluationWorkspaceNacdService, 
    private mstrTokenService: MstrTokenService, public preferenceService: PreferenceService, private interactionService: InteractionService) { }

  ngOnInit() {
    // this.getmyEvaluations();
    // this.getsystemSettings();
    // console.log(this.preferenceService.getPlatformDetail);
    this.getPlatform();
    this.getDossierID();
  }

  getPlatform() {
    return new Promise((resolve, reject) => {
      this.preferenceService.getPlatformDetail.subscribe(
        (data: any) => {
          // console.log(data);
          // this.getPlatformValue = data.platformId
          this.myEvaluationAcceptDispute = data;
          resolve(data)
        },
        (error) => {
          console.log(error);
          reject(error);
        })
    })
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

  getmyEvaluations() {
    this.getMstrConfig().then((configId: any) => {
      this.validateMstrReportId(configId.project_id, configId.agent_MyEvaluationId).then((validId: any) => {
        if(Object.keys(configId).length){
         let userName = UserData.userName;
         this.myEvaluations = configId.Mstr_MyEvaluation;
         this.myEvaluations = this.myEvaluations.replace("{{documentID}}", configId.agent_MyEvaluationId);
        //  this.myEvaluations = this.myEvaluations + '&hiddensections=' + this.global.hiddenSections;
         this.myEvaluations = this.myEvaluations + '&usrSmgr=' + localStorage.getItem('_mstrweb');
         this.myEvaluations = this.myEvaluations + '&valuePromptAnswers=' + userName;
         this.myEvaluations = this.myEvaluations + '&share=1'
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
     this.subscription_ValidateReportID = this.keyQuestionsService.validateMstrReportId(params).subscribe(
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

  async evaluationAcceptDispute() {
    this.spinnerService.show();
    // this.currentEvaluationId  evaluationsObj.v
    let conversationId = [];
    this.selectedEvaluations.forEach(element => {
      conversationId.push(element.v);
    });
    // console.log(conversationId);
    this.myEvaluation.evaluationAcceptDispute(conversationId, this.AgentAcceptDisputeComments, this.AgentAcceptDisputeStatus).subscribe(
      (data: any) => {
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(true, 'Agent feedback updated for selected Evaluation(s)');
        this.AgentAcceptDisputeComments = '';
        this.selectedEvaluations = [];
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    );
  }

  //Load the Microstrategy Dossier
  async workspaceTable() {
    // if (this.category != "" && this.category != null) {
      try {
        this.spinnerService.show();
        // debugger
        const projectID = this.projectID != null ? this.projectID : null;
        const dossierID = this.DossierId != null ? this.DossierId : null;
        const mstrAuthToken = JSON.parse(localStorage.getItem('mstrAuthToken'))
        const mstrIdToken = JSON.parse(localStorage.getItem("mstrIdToken"))['x-mstr-identitytoken']
        const projectUrl = environment.mstr_Url + projectID;
        const dossierUrl = projectUrl + '/' + dossierID;
        if (mstrIdToken['x-mstr-identitytoken'] == undefined) {
          this.spinnerService.hide();
        }
        setTimeout(() => {
          this.spinnerService.hide();
        }, 10000);
        const filterList = [
          {
            "name": "Agent Name",
            "selections": [
              { "name": UserData.userName }
            ]
          }
        ];
        // await this.getInstanceIDfromMSTR(projectID, dossierID, mstrAuthToken, this.category).then((DossierInstance) => {
      const getDossierDOMobj = document.getElementById("myEvaluations");
      if (typeof (getDossierDOMobj) != 'undefined' && getDossierDOMobj != null && getDossierDOMobj.id == 'myEvaluations') {
        await this.interactionService.dossierPromptWorkflow(mstrIdToken, projectID, dossierID, filterList).then(jsonRes => {

        microstrategy.dossier.create({
          placeholder: document.getElementById("myEvaluations"),
          url: dossierUrl,
          filters: filterList,
          instance: jsonRes['instance'],
          enableResponsive: false,
          errorHandler: function () {
            this.spinnerService.hide()
          }.bind(this),
          // dockedFilter: {
          //   dockedPosition: "left",
          //   canClose: false,
          //   dockChangeable: false,
          //   isDocked: true
          // },
          enableCustomAuthentication: true,
          customAuthenticationType: microstrategy.dossier.CustomAuthenticationType.AUTH_TOKEN,
          getLoginToken: function () {
            return new Promise(function (resolve, reject) {
              resolve(jsonRes['authToken'])
            }).then(function (identityToken) {
              return jsonRes['authToken'];
            })
          },
        }).then((dossier) => {
          dossier.getFilterList().then(function (filterList) {
          // this.dossierFilterList = filterList;

          this.OnchangeAgent(filterList, dossier);

            // this.setEvaluationFormQA(this.category);

          // for (let i = 0; i < this.dossierFilterList.length; i++) {
          //   let filter = this.dossierFilterList[i];
          //   let availableFilterName = filter.filterName;
          //   let availableFilterKey = filter.filterKey;
          //   if (availableFilterName == "Agent Name") {
          //     let availableFilterItems = [];
          //     availableFilterItems = filter.filterDetail.items;
          //     availableFilterItems.forEach(element => {
          //       // this.agentItem.push(element.name);
          //       if(element.name == UserData.userName) {

          //       }
          //       console.log(element);
                
          //     });
          //   }
          // }
    //   //Select conversation ID handler
            dossier.registerEventHandler(
              "onGraphicsSelected",
              this.conversationIdselectHandler);
            this.AgentDDL = true;
            this.spinnerService.hide();
          }.bind(this));

          // dossier && 
          dossier.registerEventHandler('onGraphicsSelected', function (availableElements) {
            //Get vizualization key for selected cell :: AKSHAY
            let vizKey = availableElements.vizKey;

            //If vizKey already exists, then remove all the elements of that vizKey :: AKSHAY
            if (this.selectedEvaluations.length > 0 ) {
              this.selectedEvaluations = this.selectedEvaluations.filter(function (evaluationsObj) {
                    return (evaluationsObj.vizKey != vizKey);
                });
            }

            //Array manipulations :: AKSHAY
            if(availableElements.graphics.length > 0){
                for (let i=0; i<availableElements.graphics.length; i++) {
                  let graphics = availableElements.graphics[i][0];
                  let evaluationsObj = {
                        vizKey: vizKey,
                        n: graphics.n,
                        nid: graphics.nid,
                        v: graphics.v,
                        vid: graphics.vid
                    }
                    if(evaluationsObj.n === 'Evaluation ID') {
                      this.selectedEvaluations.push(evaluationsObj);
                    }
                }
            }
        }.bind(this));
    // });
    // console.log(this.selectedEvaluations);
        }).catch((e) => {
          this.spinnerService.hide();
        }).finally(function () {
          setTimeout(() => {
            this.spinnerService.hide();
          }, 10000);
        }.bind(this));
        })
      }
      } catch (e) {
        console.log(e);
        this.spinnerService.hide();
      }
    // }
    // else {
    //   this.category = "";
    //   this.spinnerService.hide();
    // }
  }

  OnchangeAgent(dossierFilterList, dossier) {
    for (let i = 0; i < dossierFilterList.length; i++) {
      let filter = dossierFilterList[i];
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
          if (element.name == UserData.userName) {
            selectedVal = element.value
            // console.log(selectedVal);
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
        // console.log(filterDataObj);
        if (selectedVal != '') {
          // dossier.filterClear(filterDataObj);
          dossier.filterSelectMultiAttributes(filterDataObj);
        }
      }

    }
  }

  //*****  get the Microstrategy Dossier ID *****
  getDossierID() {
    return new Promise((resolve, reject) => {
      this.spinnerService.show();
     this.subscription_DossierID = this.keyQuestionsService.getMstrConfig().subscribe(
        (data: any) => {
          this.DossierId = typeof (data.agent_MyEvaluationId) != 'undefined' ? data.agent_MyEvaluationId : null;
          this.projectID = data.project_id;
          this.spinnerService.show();
          // this.workspaceTable();
          this.mstrValidToken().then((isres) => {
            if (isres) {
              this.isloadSpinner = false;
            }
            this.workspaceTable();
          })
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

  mstrValidToken() {
    const idToken = JSON.parse(localStorage.getItem("mstrIdToken"))['x-mstr-identitytoken'];
    const authToken = JSON.parse(localStorage.getItem('mstrAuthToken'))
    let params = {
      ID_TOKEN: idToken,
      AUTH_TOKEN: authToken
    }
    return new Promise((resolve, reject) => {
     this.subscription_mstrValidToken = this.evService.mstrValidToken(params).subscribe(
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

  // reloadWorkspace() {
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
  // }

  conversationIdselectHandler = (e) => {
    let selectionName = null;
    let selectionObjConvId: any;
    for (let i = 0; i < e.graphics.length; i++) {
      let selection = e.graphics[i];
      // single attribute selection:
      selectionName = selection[0].n;
      if (selectionName != 'Evaluation ID') {
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
    this.currentEvaluationId = selectionObjConvId.text != undefined ? selectionObjConvId.text : "";
    // this.totalScore = 0;
    // this.totalQues = 0;
    // this.totalNotes = 0;
    // this.getTopicReport = [];
    // this.transcriptTab = [];
    // this.activeTab = this.items1[0]
    // this.tabMenuName = "Transcript"
    // this.notesPopup = false;
    // if (!this.currentContact?.includes('NON-ACD')) {
    //   this.nonACDAgentDropdown = false;
    //   this.spinnerService.show();
    //   this.getTranscribeData(this.currentContact);
    //   this.getEvalTopic(this.currentContact);
    //   this.getNotes();
    // } else {
    //   this.allNotes = [];
    //   this.getEvalutionDetail();
    //   this.refreshBtn(false)
    // }
  }

  myEvaluationAcceptDispute: any;
  getsystemSettings() {
    return new Promise((resolve, reject) => {
      this.keyQuestionsService.getsystemSettings().subscribe((ssData: any) => {
        // console.log('ssData', ssData);
        setTimeout(() => {
          this.myEvaluationAcceptDispute = ssData;
        }, 1000);
        resolve(ssData);
      }, (error) => {
        reject(error)
      })
    })

  }

   // !!! keep this ngOnDestroy method at last ,please verify if anybody work on this component !!!
  ngOnDestroy(){
    if (this.subscription_DossierID) {
      this.subscription_DossierID.unsubscribe();
    }
    if (this.subscription_ValidateReportID) {
      this.subscription_ValidateReportID.unsubscribe();
    }
    if (this.subscription_mstrValidToken) {
      this.subscription_mstrValidToken.unsubscribe();
    }

    const getDossierDOMobj = document.getElementById("myEvaluations");
    if (typeof (getDossierDOMobj) != 'undefined' && getDossierDOMobj != null) {
      if(getDossierDOMobj.id == 'myEvaluations'){
        microstrategy.dossier.destroy({ placeholder: getDossierDOMobj });
      }
      getDossierDOMobj.remove();
    }
  }

}
