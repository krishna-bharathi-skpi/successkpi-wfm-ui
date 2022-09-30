import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../../../common/common.components';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
declare var microstrategy: any;
import { utils } from '../../../config';
import { UserData } from '../../../user';
import { InteractionService } from '../../interaction-details/interaction-details.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TopicService } from '../topics/topics.service';
import { GlobalComponent } from '../../../global/global.component';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { MstrTokenService } from '../../../services/mstrtoken.service';
import { EvaluationWorkspaceNacdService } from '../../evaluations/evaluation-workspace-nacd/evaluation-workspace-nacd.service';

@Component({
  selector: 'app-phrase-recommendation',
  templateUrl: './phrase-recommendation.component.html',
  styleUrls: ['./phrase-recommendation.component.css']
})
export class PhraseRecommendationComponent implements OnInit {
  selectedTopicModel:string = "";
  subscription_DossierID: Subscription;
  subscription_ValidateReportID: Subscription;

  constructor(private commonMethods: CommonMethods,public keyQuestionsService: KeyQuestionsService,private interactionService: InteractionService,
    private spinnerService: NgxSpinnerService, private topicService: TopicService,public global: GlobalComponent,private mstrTokenService:MstrTokenService,
    public evService: EvaluationWorkspaceNacdService) {
    this.commonMethods.dynamicBackgroundColorChange('default');
    this.getTopics();
   }

  ngOnInit(): void {
    this.getEvaluationDossiers();
    this.topicDDLChange(this.selectedTopicModel)
  }

  // Get the dossier and project id's fro config file S3
  getEvaluationDossiers() {
    this.getDossierID().then((res) => {
      this.validateMstrReportId().then((validIdRes: any) => {
        if (validIdRes['isSuccess'].toLowerCase() == 'success') {
          this.mstrValidToken().then((isTrue) => {
            this.dossierTable();
          });
        }
      })
    })
  }

  DossierId: any;
  projectID: any;
  getDossierID() {
    return new Promise((resolve, reject) => {
      this.spinnerService.show();
    this.subscription_DossierID =  this.keyQuestionsService.getMstrConfig().subscribe(
        (data: any) => {
          this.DossierId = typeof (data.phrase_Recommendation_dossierId) != 'undefined' ? data.phrase_Recommendation_dossierId : null;
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
  
  mstrIdToken: any;
  idToken: any;
  dossierFilterList: any;
  dossier1: any = null;
  topicItem:any=[];
  topicCategory: string = "";
  selectionHandle:any;
  topicText: string = "";
  async dossierTable() {
    this.topicItem =[];
    this.topicCategory = "";
    this.selectionHandle = null;
    this.topicText = "";
    try {
      let projectID = this.projectID;
      let dossierID = this.DossierId;
      this.mstrIdToken = localStorage.getItem("mstrIdToken");
      this.mstrIdToken = JSON.parse(this.mstrIdToken)
      this.idToken = "?idToken=" + this.mstrIdToken['x-mstr-identitytoken'];
      let projectUrl = environment.mstr_Url + projectID;
      let dossierUrl = projectUrl + '/' + dossierID + this.idToken;
      this.spinnerService.show();
      if (this.mstrIdToken['x-mstr-identitytoken'] == undefined) {
        this.spinnerService.hide();
      }
      setTimeout(() => {
        this.spinnerService.hide();
      }, 8000);
      const getDossierDOMobj = document.getElementById("dossierContainer1");
      if (typeof (getDossierDOMobj) != 'undefined' && getDossierDOMobj != null && getDossierDOMobj.id == 'dossierContainer1') {
        await this.interactionService.dossierPromptWorkflow(this.mstrIdToken['x-mstr-identitytoken'], projectID, dossierID, null).then(jsonRes => {
      
        microstrategy.dossier.create({
        placeholder: document.getElementById("dossierContainer1"),
        url: dossierUrl,
        instance: jsonRes['instance'],
        enableResponsive: false,
        enableCustomAuthentication: true,
        customAuthenticationType: microstrategy.dossier.CustomAuthenticationType.AUTH_TOKEN,
        getLoginToken: function () {
          return new Promise(function (resolve, reject) {
            resolve(jsonRes['authToken'])
          }).then(function (identityToken) {
            return jsonRes['authToken'];
          })
        },
        errorHandler: function () {
          this.spinnerService.hide()
        }.bind(this),
        filterFeature: {
          enabled: false
        },
      }).then(function (dossier) {
        this.dossier1 = dossier;
        // this.dossier1.filterClearAll();
        this.dossier1.getFilterList().then(function (filterList) {
          this.dossierFilterList = filterList
          for (var i = 0; i < filterList.length; i++) {
            var filter = filterList[i];
            var availableFilterName = filter.filterName;
            var availableFilterKey = filter.filterKey;
            // console.log("availableFilterName",availableFilterName);
            // console.log("availableFilterKey",availableFilterKey);

            if(availableFilterName == "Topic"){
              let availableFilterItems = [];
              availableFilterItems = filter.filterDetail.items;
              // console.log(availableFilterItems)
              availableFilterItems.forEach(element => {
                this.topicItem.push(element.name);
              });
            }

          }
          this.spinnerService.hide();
        }.bind(this));

        var selectHandler = function (e) {
          var selectionName = null;
          let selectionObjConvId: any;
          for (var i = 0; i < e.graphics.length; i++) {
            var selection = e.graphics[i];				
            selectionName = selection[0].n;
            if (selectionName != 'Topic') {
              return false
            }
            var selectionValue = selection[0].vid;
            var selectionText = selection[0].v;
            selectionObjConvId = {
              name: selectionName,
              value: selectionValue,
              text: selectionText
            }
          }
          this.topicText = selectionObjConvId.text;
          // console.log(this.topicText)
          this.getRecommendedTopics(this.topicText);
          this.getKeyPhrase = [];
          this.tempArr = [];
          this.selectedPharseValue = [];
      
          let filterArr = this.topicDDL.filter(s => s.label.toLowerCase() == this.topicText.toLowerCase());
          if(filterArr.length > 0){
            this.selectedTopicModel = filterArr[0].value
          }
          else{
            this.selectedTopicModel = this.topicDDL[0].value
          }
          
        }.bind(this);
        this.selectionHandle = selectHandler
      
        dossier.registerEventHandler(
          "onGraphicsSelected",
          selectHandler);
        }.bind(this)).finally(function () {
        setTimeout(() => {
          this.spinnerService.hide();
        }, 8000);
      }.bind(this));
    })
    }
    }
    catch (e) {
      console.log(e);
      this.spinnerService.hide();
    }
  }
  
  // Filter and serach the topic from dossier table
  resultTopic: any;
  searchTopic(event) {
    this.resultTopic = this.topicItem.filter(a => a.toLowerCase().includes(event.query.toLowerCase()));
    this.selectedTopicModel = ""
  }

  // filter the dossier based on selected topic from the search list 
  OnchangeTopic(){
    this.getKeyPhrase = [];
    this.tempArr = [];
    this.selectedPharseValue = [];
    this.topicText = "";
    if(this.topicText == ""){
      this.selectedTopicModel = ""
    }
    for (var i = 0; i < this.dossierFilterList.length; i++) {
      var filter = this.dossierFilterList[i];
      var availableFilterName = filter.filterName;
      var availableFilterKey = filter.filterKey;
      if (availableFilterName == "Topic") {
        let selections = [];
        let filterInfoObj = {
          key: availableFilterKey
        };
        let availableFilterItems = filter.filterDetail.items;
        let selectedVal = ""
        availableFilterItems.forEach(element => {
          if (element.name == this.topicCategory) {
            selectedVal = element.value
          }
        });
        let selectionObj = {
          name: "Topic",
          value: selectedVal,
        };
        selections.push(selectionObj);
        let filterDataObj = {
          selections: selections,
          filterInfo: filterInfoObj
        }
        if (selectedVal == '') {
          this.dossier1.filterClear(filterDataObj);
        }
        else {
          this.dossier1.filterSelectMultiAttributes(filterDataObj);
        }
      }
    }
  }
  
  // clear the dossier
  EmptyFun(){
    if (this.topicCategory == null || this.topicCategory == ''){
      this.topicCategory = '';
      // this.OnchangeTopic();
      this.getKeyPhrase = [];
      this.tempArr = [];
      this.selectedPharseValue = [];
      this.topicText = "";
      this.selectedTopicModel = "";
      this.isSubmitEnable = true;
        if (!!document.getElementById('dossierContainer1')) {
            const tableId = document.getElementById('dossierContainer1');
             microstrategy.dossier.destroy({ placeholder: tableId });
            this.mstrValidToken().then((isTrue) => {
              this.dossierTable();
            });
            return;
         }
         else{
          this.dossier1.filterClearAll();
         }   

    }
  }

  topicClearEnable(topic){
    if(topic == "" || topic == null){
      this.isDisabled = true;
    }
    else{
      this.isDisabled = false;
    }
  }
  
  // clear btn for search the box
  isDisabled:boolean = true
  clearSearch(){
    if(this.topicCategory != "" && this.topicCategory != null){
      this.topicCategory = '';
      this.EmptyFun();
      this.isDisabled = true;
    }
  }

  // Get data set from the mstr based on select topic from dossier
  mstrToken: any = null;
  getKeyPhrase:any = [];
  tempArr:any = [];
  getRecommendedTopics(topicName) {
    this.mstrToken = localStorage.getItem("mstrAuthToken");
    let mstr = JSON.parse(this.mstrToken);
    let params = {
      customerId: UserData.customerId,
      cookie: mstr['cookie'],
      conversationid: topicName,
      ReportNo: "7",
      X_MSTR_AuthToken: mstr['authToken']
    }
    
    this.spinnerService.show();
    this.getKeyPhrase = [];
    this.tempArr= [];
    this.selectedPharseValue = [];
    this.interactionService.GetReportData(params).subscribe(
      (data: any) => {
      //  console.log(data);
       if(data.ReportData.result.data.root != null){
        data.ReportData.result.data.root.children[0].children.forEach(element => {
          element.children.forEach(item => {
           //  console.log(item.element.name)
           this.tempArr.push(item.element.name);
           this.getKeyPhrase =  new Set(this.tempArr)
          });
        });
        // console.log(this.getKeyPhrase)
       }
       else{
        this.tempArr = [];
        this.getKeyPhrase = [];
       }
      
       this.spinnerService.hide();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error.Message);
      }
    )
  }
  
  // Onchange selected key phrases from datasets
  selectedPharseValue:any = [];
  onChange(checked, item){
    // console.log(checked.checked , item);
    if(checked.checked == true || checked == true){
      this.selectedPharseValue.push(item);
      // console.log('this.selectedPharseValue' , this.selectedPharseValue);

      if((this.selectedTopicModel == "" || this.selectedTopicModel == null) && this.selectedPharseValue.length == 0){
        this.isSubmitEnable = true;
      }
      else if((this.selectedTopicModel == "" || this.selectedTopicModel == null) && this.selectedPharseValue.length > 0){
        this.isSubmitEnable = true;
      }
      else if((this.selectedTopicModel != "" || this.selectedTopicModel != null) && this.selectedPharseValue.length == 0){
        this.isSubmitEnable = true;
      }
      else{
        if((this.selectedTopicModel != "" || this.selectedTopicModel != null) && this.selectedPharseValue.length > 0){
          this.isSubmitEnable = false;
        }
      }
      
    } 
    else {
      this.selectedPharseValue.splice(this.selectedPharseValue.indexOf(item), 1);

      if((this.selectedTopicModel == "" || this.selectedTopicModel == null) && this.selectedPharseValue.length == 0){
        this.isSubmitEnable = true;
      }
      else if((this.selectedTopicModel == "" || this.selectedTopicModel == null) && this.selectedPharseValue.length > 0){
        this.isSubmitEnable = true;
      }
      else if((this.selectedTopicModel != "" || this.selectedTopicModel != null) && this.selectedPharseValue.length == 0){
        this.isSubmitEnable = true;
      }
      else{
        if((this.selectedTopicModel != "" || this.selectedTopicModel != null) && this.selectedPharseValue.length > 0){
          this.isSubmitEnable = false;
        }
      }
    }
    // console.log(this.selectedPharseValue.length, this.selectedPharseValue);
  }
  
  // Get list of topic from DB for DDL and Send the data to topic table
  topicList:any = [];
  topicDDL:any = [];
  getTopics() {
    this.topicService.GetTopicsItems().subscribe((data: any) => {
      // console.log(data)
      this.topicList = data;
      let arr = [];
      this.topicList.forEach(element => {
        if(element.topicName != '' && element.topicName != null){
          let labelValue = {
            label: element.topicName,
            value: element.topicId
          }
          arr.push(labelValue);
        }
      });
      let sortedArray= arr.sort(function(a, b) {
        if(a.label != null && a.label != ''){
          return a.label.localeCompare(b.label);
        }
      });
      this.topicDDL = sortedArray;
      // console.log(this.topicDDL)
    }, (error) => {
      console.log('error', error);
      this.commonMethods.addToastforlongtime(false, error.error)
    });
  }
  
  // find the ddl value and Validation for submit btn lyk enable or disabled 
  isSubmitEnable:boolean = true;
  topicDDLChange(topicOption){
    if((topicOption == "" || topicOption == null) && this.selectedPharseValue.length == 0){
      this.isSubmitEnable = true;
    }
    else if((topicOption == "" || topicOption == null) && this.selectedPharseValue.length > 0){
      this.isSubmitEnable = true;
    }
    else if((topicOption != "" || topicOption != null) && this.selectedPharseValue.length == 0){
      this.isSubmitEnable = true;
    }
    else{
      if((topicOption != "" || topicOption != null) && this.selectedPharseValue.length > 0){
        this.isSubmitEnable = false;
      }
    }

  }
  
  // Submit for adding selected keyphrases to the topics in DB
  sendKeyPhrase(){
    let tempArrOBJ = [];
    let selectedOBJ = this.topicList.filter(s => s.topicId == this.selectedTopicModel)[0];
    // console.log(selectedOBJ)
    if(this.selectedPharseValue.length > 0){
      this.selectedPharseValue.forEach(element => {
        selectedOBJ.topicPhrases.push(element)
        tempArrOBJ = selectedOBJ.topicPhrases.filter((v,i,a)=>a.findIndex(t => t == v)===i);
      });
      selectedOBJ.topicPhrases = tempArrOBJ;
      if (selectedOBJ.timeBased === undefined){
        selectedOBJ.timeBased = false;
        selectedOBJ.startTime = 0;
        selectedOBJ.endTime = 0;
      }
      // console.log(selectedOBJ)
      this.spinnerService.show();
      this.topicService.updateTopic(selectedOBJ.topicId, selectedOBJ).subscribe(
        (data:any)=>{
          // console.log(data);
          this.commonMethods.addToastforlongtime(true, 'Key phrases are added successfully to the selected topics');
          this.selectedTopicModel = "";
          this.selectedPharseValue = [];
          this.topicCategory = '';
          this.EmptyFun()
          this.isDisabled = true;
          this.isSubmitEnable = true;
          this.tempArr = [];
          this.getKeyPhrase = [];
          this.topicText = "";
          this.spinnerService.hide();
        },
        (error)=>{
          console.log(error)
          this.commonMethods.addToastforlongtime(false, error.error);
          this.spinnerService.hide();
        }
      )
    }
    else{
      if(this.selectedPharseValue.length == 0){
        this.commonMethods.addToastforlongtime(false, 'Select atleast one recommended key phrases');
      }
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
      this.subscription_ValidateReportID = this.keyQuestionsService.validateMstrReportId(params).subscribe(
        (data: any) => {
          if (data['isSuccess'].toLowerCase() == 'failed'  && data['result'].toLowerCase() != "the user's session has expired, please reauthenticate") {
            this.commonMethods.addToastforlongtime(false, 'There is an error in configuration. Please connect with support team to correct the configuration error');
          }
          else{
            if (data['isSuccess'].toLowerCase() == 'failed' && data['result'].toLowerCase() == "the user's session has expired, please reauthenticate") {
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
  ngOnDestroy(){
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

  subscription_mstrValidToken: Subscription;
  
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


}
