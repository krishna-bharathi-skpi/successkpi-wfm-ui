import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonMethods } from '../../../common/common.components';
import { RolesService } from './roles.service';
import { ReportModel, RolesModel } from './roles.model';
import { PreferenceService } from '../successkpi-setting/successkpi-setting.service'
import { ProfileService } from '../profile/profile.service';
import { GlobalComponent } from '../../../global/global.component';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActionsService } from '../../playbooks/actions/actions.service';
import UserData from '../../../user';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  Roles: any = [];
  EditRole: string = 'roleList';
  // selectedValue:string="company";
  associateQueue: any = ['IT services', 'IT Chat backup']
  roleModel: RolesModel;
  rolesForm: FormGroup;
  loading: boolean = false;
  visibleSidebar5: any;
  Editcard: boolean = false;

  constructor(private commonMethods: CommonMethods, private roleService: RolesService,
    private formBuilder: FormBuilder, private preferenceService: PreferenceService,
    private profileService: ProfileService, public global: GlobalComponent,
    public keyQuestionService: KeyQuestionsService, private spinnerService: NgxSpinnerService, private actionsService: ActionsService,private loginService:LoginService ) {
    // this.getCustomDataDDL();
    this.userPoolRole();
    this.commonMethods.dynamicBackgroundColorChange('white');
    this.getplatformValidate();
    this.roleModel = new RolesModel();
    this.getdefaultRole();
    // this.userPoolRole();
    this.getKeyQues();
    this.getEvalDDL();
    this.getTopReportConfig();
    this.getTopAppsConfig();
    this.getTopAppDDL();
    this.getTopAppObj();
    // this.getdataAccess();

  }

  ngOnInit() {
    this.roleform();
    this.getDashboardId();
    this.getRoles();

    // this.userPoolRole();
  }
  getAlign(i) {
    if (i == 0) {
      return "22px";
    }
  }
  // Form creation
  roleform() {
    this.rolesForm = this.formBuilder.group({
      rolesName: ['', Validators.required],
      homeDashboardID: ['']
    })
  }
  get validationRoles() { return this.rolesForm.controls; }
  submittedRoles = false;
  onSubmitRoles() {
    this.submittedRoles = true;
    if (this.rolesForm.invalid) {
      return
    }
  }

  // Add/Edit functions
  // roleName:any
  createEdit: any = "";
  roleValue: any;
  editKeyValue: any = null;
  addEditrole(role, type) {
    this.roleDisable = false;
    this.rolesForm.enable();
    if (type == "create") {
      this.roleModel = new RolesModel();
      this.roleModel.homeDashboardId = this.homeID;
      this.roleModel.keyQuestions = this.sameValue;
      this.defaultKeyQues = this.sameValue;
      // this.roleModel.roleName = "Role";
      this.roleValue = "Role";
      this.EditRole = "edit";
      this.createEdit = type;
      this.saveKeyQues = null;
      this.tempAppArr = [];
      this.tempTopReport = [];
      // this.roleModel.dataAccess = JSON.parse(JSON.stringify(this.dataAccessList))
    }
    else {
      this.roleModel = new RolesModel();
      // role.successkpiFeatures.agents.dispositionCoding = {isView: true, isViewEdit: true};
      this.roleModel = JSON.parse(JSON.stringify(role));
      if (this.roleModel.successkpiFeatures.evaluate.myEvaluation == null || this.roleModel.successkpiFeatures.evaluate.myEvaluation == undefined) {
        this.roleModel.successkpiFeatures.evaluate.myEvaluation = {
          "isView": false
        }
      }
      else{
        this.roleModel = new RolesModel();
       // console.log(this.roleModel.successkpiFeatures);
        // role.successkpiFeatures.agents.dispositionCoding = {isView: true, isViewEdit: true};
        this.roleModel = JSON.parse(JSON.stringify(role));
        if(this.roleModel.successkpiFeatures.evaluate.myEvaluation == null || this.roleModel.successkpiFeatures.evaluate.myEvaluation == undefined){
          this.roleModel.successkpiFeatures.evaluate.myEvaluation = {
            "isView": false
          }
        } 
        if (this.roleModel.successkpiFeatures.analytics.scheduleDelivery == null || this.roleModel.successkpiFeatures.analytics.scheduleDelivery == undefined) {
          this.roleModel.successkpiFeatures.analytics.scheduleDelivery = {
            "isView": false,
            "isViewEdit": false
          }
        } 
        if (this.roleModel.successkpiFeatures.analytics.scheduleImport == null || this.roleModel.successkpiFeatures.analytics.scheduleImport == undefined) {
          this.roleModel.successkpiFeatures.analytics.scheduleImport = {
            "isView": false,
            "isViewEdit": false
          }
        }
        if (this.roleModel.successkpiFeatures.analytics.realtimeReport == null || this.roleModel.successkpiFeatures.analytics.realtimeReport == undefined) {
          this.roleModel.successkpiFeatures.analytics.realtimeReport = {
            "isQueueStatsView": false,
            "isQueueStatusView": false,
            "isAgentStatsView": false,
            "isAgentStatusView": false
          }
        }
        if(this.roleModel.successkpiFeatures.evaluate.myTeamEvaluation == null || this.roleModel.successkpiFeatures.evaluate.myTeamEvaluation == undefined){
          this.roleModel.successkpiFeatures.evaluate.myTeamEvaluation = {
            "isView": false
          }
        } 
        if(this.roleModel.successkpiFeatures.evaluate.newInteractions == null || this.roleModel.successkpiFeatures.evaluate.newInteractions == undefined){
          this.roleModel.successkpiFeatures.evaluate.newInteractions = {
            "isView": false
          }
        } 
        if(this.roleModel.successkpiFeatures.evaluate.myCoachingSessions == null || this.roleModel.successkpiFeatures.evaluate.myCoachingSessions == undefined){
          this.roleModel.successkpiFeatures.evaluate.myCoachingSessions = {
            "isView": false
          }
        } 
        if(this.roleModel.successkpiFeatures.home.commandCenter == null || this.roleModel.successkpiFeatures.home.commandCenter == undefined){
          this.roleModel.successkpiFeatures.home.commandCenter = {
            "isView": false
          }
        } 
        if(this.roleModel.successkpiFeatures.evaluate.evaluationWorkspaceNacd == null || this.roleModel.successkpiFeatures.evaluate.evaluationWorkspaceNacd == undefined){
          this.roleModel.successkpiFeatures.evaluate.evaluationWorkspaceNacd = {
            "isView": false,
            "isViewEdit": false
          }
        } 
        if(this.roleModel.successkpiFeatures.evaluate.coachingWorkspace == null || this.roleModel.successkpiFeatures.evaluate.coachingWorkspace == undefined){
          this.roleModel.successkpiFeatures.evaluate.coachingWorkspace = {
            "isView": false,
            "isViewEdit": false
          }
        } 
        if(this.roleModel.istopApps == undefined || this.roleModel.istopApps == null){
          this.roleModel.istopApps = "company"
        }
        if(this.roleModel.istopReports == undefined || this.roleModel.istopReports == null){
          this.roleModel.istopReports = "company"
        }
        if (this.roleModel.successkpiFeatures.analytics.myReports == null || this.roleModel.successkpiFeatures.analytics.myReports == undefined) {
          this.roleModel.successkpiFeatures.analytics.myReports = {
            "isViewEdit": false
          }
        }
        if(this.roleModel.successkpiFeatures.settings.dataPartition == null || this.roleModel.successkpiFeatures.settings.dataPartition == undefined){
          this.roleModel.successkpiFeatures.settings.dataPartition = {
            "isView": false,
            "isViewEdit": false
          }
        } 
        if(this.roleModel.successkpiFeatures.evaluate.ai_ml_Scoring == null || this.roleModel.successkpiFeatures.evaluate.ai_ml_Scoring == undefined){
          this.roleModel.successkpiFeatures.evaluate.ai_ml_Scoring = {
            "isView": false,
            "isViewEdit": false
          }
        } 
        if(this.roleModel.successkpiFeatures.playbooks.phraseRecommendation == null || this.roleModel.successkpiFeatures.playbooks.phraseRecommendation == undefined){
          this.roleModel.successkpiFeatures.playbooks.phraseRecommendation = {
            "isView": false,
            "isViewEdit": false
          }
        } 
        if (this.roleModel.successkpiFeatures.analytics.publicReports == null || this.roleModel.successkpiFeatures.analytics.publicReports == undefined) {
          this.roleModel.successkpiFeatures.analytics.publicReports = {
            "isView": false,
            "isViewEdit": false
          }
        }
        if(this.roleModel.successkpiFeatures.playbooks.moments == null || this.roleModel.successkpiFeatures.playbooks.moments == undefined){
          this.roleModel.successkpiFeatures.playbooks.moments = {
            "isView": false,
            "isViewEdit": false
          }
        } 
        if (this.roleModel.successkpiFeatures.analytics.sharedSubscriptions == null || this.roleModel.successkpiFeatures.analytics.sharedSubscriptions == undefined) {
          this.roleModel.successkpiFeatures.analytics.sharedSubscriptions = {
            "isView": false,
            "isViewEdit": false
          }
        }
        if (this.roleModel.successkpiFeatures.analytics.contactSubscriptions == null || this.roleModel.successkpiFeatures.analytics.contactSubscriptions == undefined) {
          this.roleModel.successkpiFeatures.analytics.contactSubscriptions = {
            "isView": false,
            "isViewEdit": false
          }
        }
        if(this.roleModel.successkpiFeatures.evaluate.manageDispute == null || this.roleModel.successkpiFeatures.evaluate.manageDispute == undefined){
          this.roleModel.successkpiFeatures.evaluate.manageDispute = {
            "isView": false,
            "isViewEdit": false
          }
        }
          if(this.roleModel.successkpiFeatures.agents == null || this.roleModel.successkpiFeatures.agents == undefined){
            let agent = {
              "dispositionCoding":{
                  "isView": false,
                  "isViewEdit": false
              },
              "myPerformance":{
                "isView": false
            },
            "myEvaluations":{
              "isView": false
            },
            "mySchedule":{
              "isView": false
          }
            }
            this.roleModel.successkpiFeatures.agents = agent;
        }
        else{
          
         if(this.roleModel.successkpiFeatures.agents.dispositionCoding == null || this.roleModel.successkpiFeatures.agents.dispositionCoding == undefined){  
          this.roleModel.successkpiFeatures.agents.dispositionCoding = {
                "isView": false,
                "isViewEdit": false
              }          
        } 
        
        if(this.roleModel.successkpiFeatures.agents.myPerformance == null || this.roleModel.successkpiFeatures.agents.myPerformance == undefined){
          this.roleModel.successkpiFeatures.agents.myPerformance = {
                "isView": false
              }
        }
        
        if(this.roleModel.successkpiFeatures.agents.myEvaluations == null || this.roleModel.successkpiFeatures.agents.myEvaluations == undefined){
          this.roleModel.successkpiFeatures.agents.myEvaluations = {
                "isView": false
              }
        }
        if(this.roleModel.successkpiFeatures.agents.mySchedule == null || this.roleModel.successkpiFeatures.agents.mySchedule == undefined){
          this.roleModel.successkpiFeatures.agents.mySchedule = {
                "isView": false
              }
        }
    }

        this.defaultKeyQues = this.sameValue;
        // this.roleValue=role.roleName
        this.EditRole = "edit";
        this.createEdit = type;
        if(this.roleModel.iskeyQuestions == 'role'){
          this.editKeyValue = JSON.parse(JSON.stringify(this.roleModel.keyQuestions));
          this.defaultKeyQues = this.editKeyValue;
          // console.log("Role",this.defaultKeyQues);
        }
        else{
          this.editKeyValue = JSON.parse(JSON.stringify(this.roleModel.keyQuestions));
          this.defaultKeyQues = this.editKeyValue;
        }
        if(this.roleModel.topApps != undefined){
          this.tempAppArr = [];
          this.tempAppArr = JSON.parse(JSON.stringify(this.roleModel.topApps))
        }
       
        if(this.roleModel.topReports != undefined){
          this.tempTopReport = [];
          this.tempTopReport = JSON.parse(JSON.stringify(this.roleModel.topReports))
        }
       
        // if(this.roleModel.dataAccess == null && typeof(this.roleModel.dataAccess) == "object"){
        //   // console.log(" IF")
        //   this.roleModel.dataAccess = JSON.parse(JSON.stringify(this.dataAccessList))
        // }
        // else if(this.roleModel.dataAccess.length > 0){
        //   // console.log("ELSE IF")
        //   let temArr=[];
        //   this.dataAccessList.forEach(element => {
        //     let arr = this.roleModel.dataAccess.filter(s => s.dataLabel == element.dataLabel)
        //     // console.log(arr)
        //     if(arr.length == 0){
        //       temArr.push(element)
        //     }
        //   });
        //   if(temArr.length > 0){
        //     temArr.forEach(element => {
        //       this.roleModel.dataAccess.push(element)
        //     });
        //   }
        //   this.roleModel.dataAccess = JSON.parse(JSON.stringify(this.roleModel.dataAccess))
        // }
        // else{
        //   // console.log("ELSE")
        //   this.roleModel.dataAccess = JSON.parse(JSON.stringify(this.dataAccessList))
        // }
 
      }

      if (this.roleModel.successkpiFeatures.work == null || this.roleModel.successkpiFeatures.work == undefined) {
        let work = {
          "serviceQuality": {
            "isView": false,
            "isViewEdit": false
          },
          "forecasting": {
            "isView": false,
            "isViewEdit": false
          },
          "schedule": {
            "isView": false,
            "isViewEdit": false
          }
        }
        this.roleModel.successkpiFeatures.work = work;
      }
      else {
        if (this.roleModel.successkpiFeatures.work.serviceQuality == null || this.roleModel.successkpiFeatures.work.serviceQuality == undefined) {
          this.roleModel.successkpiFeatures.work.serviceQuality = {
            "isView": false,
            "isViewEdit": false
          }

        }
        if (this.roleModel.successkpiFeatures.work.forecasting == null || this.roleModel.successkpiFeatures.work.forecasting == undefined) {
          this.roleModel.successkpiFeatures.work.forecasting = {
            "isView": false,
            "isViewEdit": false
          }
        }
        if (this.roleModel.successkpiFeatures.work.schedule == null || this.roleModel.successkpiFeatures.work.schedule == undefined) {
          this.roleModel.successkpiFeatures.work.schedule = {
            "isView": false,
            "isViewEdit": false
          }
        }
      }

      this.defaultKeyQues = this.sameValue;
      // this.roleValue=role.roleName
      this.EditRole = "edit";
      this.createEdit = type;
      if (this.roleModel.iskeyQuestions == 'role') {
        this.editKeyValue = JSON.parse(JSON.stringify(this.roleModel.keyQuestions));
        this.defaultKeyQues = this.editKeyValue;
        // console.log("Role",this.defaultKeyQues);
      }
      else {
        this.editKeyValue = JSON.parse(JSON.stringify(this.roleModel.keyQuestions));
        this.defaultKeyQues = this.editKeyValue;
      }
      if (this.roleModel.topApps != undefined) {
        this.tempAppArr = [];
        this.tempAppArr = JSON.parse(JSON.stringify(this.roleModel.topApps))
      }

      if (this.roleModel.topReports != undefined) {
        this.tempTopReport = [];
        this.tempTopReport = JSON.parse(JSON.stringify(this.roleModel.topReports))
      }

      // if(this.roleModel.dataAccess == null && typeof(this.roleModel.dataAccess) == "object"){
      //   // console.log(" IF")
      //   this.roleModel.dataAccess = JSON.parse(JSON.stringify(this.dataAccessList))
      // }
      // else if(this.roleModel.dataAccess.length > 0){
      //   // console.log("ELSE IF")
      //   let temArr=[];
      //   this.dataAccessList.forEach(element => {
      //     let arr = this.roleModel.dataAccess.filter(s => s.dataLabel == element.dataLabel)
      //     // console.log(arr)
      //     if(arr.length == 0){
      //       temArr.push(element)
      //     }
      //   });
      //   if(temArr.length > 0){
      //     temArr.forEach(element => {
      //       this.roleModel.dataAccess.push(element)
      //     });
      //   }
      //   this.roleModel.dataAccess = JSON.parse(JSON.stringify(this.roleModel.dataAccess))
      // }
      // else{
      //   // console.log("ELSE")
      //   this.roleModel.dataAccess = JSON.parse(JSON.stringify(this.dataAccessList))
      // }

    }

  }

  // Associate queue data hit enter
  addText2(text2: string) {
    if (text2) {
      let duplicate = false;
      this.associateQueue.forEach(item => {
        if (item == text2) {
          duplicate = true;

        }
      })
      if (!duplicate) {
        this.associateQueue.push(text2);
      } else {
        // this.commonMethods.addToastforlongtime(false, 'Avoid Entering Same Data');
        // this.alerts = "";
        // this.alerts = "Avoid entering same data";
      }
    }
  }
  // Delete queue phrase
  deleteMsg(msg: string) {
    const index: number = this.associateQueue.indexOf(msg);
    if (index !== -1) {
      this.associateQueue.splice(index, 1);
    }
  }

  breadCrumbBack() {
    this.roleModel = new RolesModel();
    this.EditRole = 'roleList';
    this.rolesForm.reset();
    this.submittedRoles = false;
    // this.defaultKeyQues = null;
    this.notChangeValue = false;
    this.editKeyValue = null;
    this.saveKeyQues = null;
    this.emptyAppLabel = false;
    this.emptyReportLabel = false;
    // this.dataAccessErr = false;
  }

  homeID: string;
  defaultID: string;
  getDashboardId() {
    this.preferenceService.dashboardDocId().subscribe(
      (data: any) => {
        // console.log(data)
        this.defaultID = data.OverView.documentID;
        this.homeID = this.defaultID
      }
    )
  }

  defaultRole: any;
  rolename: any;
  getdefaultRole() {
    this.profileService.getCustomerPool().subscribe(
      (data: any) => {
        this.defaultRole = data[0].role
        this.rolename = this.defaultRole
      }
    )
  }

  roleDisable: boolean = false
  primaryRole(role) {
    this.roleModel = this.adminRole
    this.EditRole = "edit";
    this.createEdit = 'edit';
    this.roleDisable = true;
    this.rolesForm.disable();
    // this.roleModel.dataAccess = this.dataAccessList
    // if(rolename == this.adminRole.roleName){
    //   this.rolesForm.disable();
    // }
  }
  adminRole: any;
  adminName: any;
  userPoolRole() {
    this.roleService.userPoolRole().subscribe(
      (data: any) => {
        // console.log("QQQQQQQQQQQQQQQQQQQQQ");
        // console.log(data);
        // data.forEach(element => {
        //   if(data.successkpiFeatures.agents == undefined || data.successkpiFeatures.agents == null) {
        //   let agent = {
        //     "dispositionCoding":{
        //         "isView": false,
        //         "isViewEdit": false
        //     }
        //   }
        //   data.successkpiFeatures.agents = agent;
        // }
        // console.log(data);
        // });
        this.adminRole = data;
        this.adminName = data.roleName
        // this.roleModel = data;
      }
    )
  }
  defaultKeyQues: any;
  getKey: any;
  sameValue: any = null;
  commonDefault: any;
  getKeyQues() {
    this.keyQuestionService.getKeyQuestions().subscribe(
      (data: any) => {
        // console.log(data);
        this.defaultKeyQues = data;
        this.sameValue = JSON.parse(JSON.stringify(data));
        this.getKey = JSON.stringify(data);
        this.commonDefault = JSON.parse(JSON.stringify(data));
      }
    )
  }
  roleFun() {
    // console.log(this.roleModel.keyQuestions );
    // console.log(this.commonDefault );
    if (this.createEdit == 'create') {
      if (this.roleModel.iskeyQuestions == 'role') {
        // console.log("role create")
        this.editKeyValue = null;
        this.tempCreate = null;
        this.saveKeyQues = null;
        this.roleModel.keyQuestions = this.sameValue;
        this.defaultKeyQues = this.roleModel.keyQuestions
      }

    }

  }
  getRoles() {
    this.spinnerService.show();
    this.roleService.getRoles().subscribe(
      (data: any) => {
        // data.forEach(element => {
        //   if(element.successkpiFeatures.agents == undefined || element.successkpiFeatures.agents == null) {

        //   let agent = {
        //     "dispositionCoding":{
        //         "isView": false,
        //         "isViewEdit": false
        //     }
        //   }
        //   element.successkpiFeatures.agents = agent;
        // }
        // });

        this.Roles = data;
        this.spinnerService.hide();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }
  allcards: any = {}
  clearObject: object = {};
  editCard(object, type) {
    this.Editcard = true
    this.clearObject = JSON.parse(JSON.stringify(object))
    this.allcards = object;
    this.allcards.type = type;
    // console.log(type)
  }

  // Cancel card 
  editcardCancel() {

    this.Editcard = false;

    if (this.allcards.type == 'CustomerSpeaking') {
      this.defaultKeyQues.CustomerSpeaking = this.clearObject
    }
    else if (this.allcards.type == 'TopicsTrending') {
      this.defaultKeyQues.TopicsTrending = this.clearObject
    }
    else if (this.allcards.type == 'TrendingPhrases') {
      this.defaultKeyQues.TrendingPhrases = this.clearObject
    }
    else if (this.allcards.type == 'CallToActionPlaybook') {
      this.defaultKeyQues.CallToActionPlaybook = this.clearObject
    }
    else if (this.allcards.type == 'Interactions') {
      this.defaultKeyQues.Interactions = this.clearObject
    }
    else if (this.allcards.type == 'CustomersFeel') {
      this.defaultKeyQues.CustomersFeel = this.clearObject
    }
    else if (this.allcards.type == 'PeopleTalkingAbout') {
      this.defaultKeyQues.PeopleTalkingAbout = this.clearObject
    }
    else if (this.allcards.type == 'Queue') {
      this.defaultKeyQues.Queue = this.clearObject
    }
    else if (this.allcards.type == 'IVRContainment') {
      this.defaultKeyQues.IVRContainment = this.clearObject
    }
    else if (this.allcards.type == 'AgentScoring') {
      this.defaultKeyQues.AgentScoring = this.clearObject
    }
    else if (this.allcards.type == 'AgentDashboard') {
      this.defaultKeyQues.AgentDashboard = this.clearObject
    }
    else if (this.allcards.type == 'AddtoEvaluationRoom') {
      this.defaultKeyQues.AddtoEvaluationRoom = this.clearObject
    }

  }

  // Save card 
  editcardSave() {
    if (this.allcards.type == 'CustomerSpeaking') {
      this.defaultKeyQues.CustomerSpeaking = this.allcards
    }
    else if (this.allcards.type == 'TopicsTrending') {
      this.defaultKeyQues.TopicsTrending = this.allcards
    }
    else if (this.allcards.type == 'TrendingPhrases') {
      this.defaultKeyQues.TrendingPhrases = this.allcards
    }
    else if (this.allcards.type == 'CallToActionPlaybook') {
      this.defaultKeyQues.CallToActionPlaybook = this.allcards
    }
    else if (this.allcards.type == 'Interactions') {
      this.defaultKeyQues.Interactions = this.allcards
    }
    else if (this.allcards.type == 'CustomersFeel') {
      this.defaultKeyQues.CustomersFeel = this.allcards
    }
    else if (this.allcards.type == 'PeopleTalkingAbout') {
      this.defaultKeyQues.PeopleTalkingAbout = this.allcards
    }
    else if (this.allcards.type == 'Queue') {
      this.defaultKeyQues.Queue = this.allcards
    }
    else if (this.allcards.type == 'IVRContainment') {
      this.defaultKeyQues.IVRContainment = this.allcards
    }
    else if (this.allcards.type == 'AgentScoring') {
      this.defaultKeyQues.AgentScoring = this.allcards
    }
    else if (this.allcards.type == 'AgentDashboard') {
      this.defaultKeyQues.AgentDashboard = this.allcards
    }
    else if (this.allcards.type == 'AddtoEvaluationRoom') {
      this.defaultKeyQues.AddtoEvaluationRoom = this.allcards
    }
    this.Editcard = false;
    this.allcards = {}
  }

  // Save Key Quest Pop up
  saveKeyQues: any = null;
  notChangeValue: boolean = false;
  tempSave: any = null;
  keyQuesSave() {
    this.getKey = JSON.stringify(this.defaultKeyQues);
    this.saveKeyQues = JSON.parse(this.getKey);
    this.tempCreate = this.saveKeyQues;
    this.notChangeValue = true;
    this.visibleSidebar5 = false;
  }

  // Cancel Key Quest Pop up
  tempCancel: any = null;
  tempCreate: any = null;
  keyQuesCancel() {
    this.visibleSidebar5 = false;
    if (this.createEdit == 'edit') {
      this.defaultKeyQues = this.tempCancel;
      // console.log("EDIT CAncel");
    }
    if (this.createEdit == 'create') {
      // console.log("CREATE CAncel");
      this.defaultKeyQues = this.tempCreate;
    }

  }

  windiowRole() {
    this.visibleSidebar5 = true;
    this.Editcard = false;
    if (this.createEdit == 'create') {
      // console.log("CREATE Window");
      this.tempCreate = JSON.parse(JSON.stringify(this.commonDefault));
      this.defaultKeyQues = this.tempCreate;
      if (this.notChangeValue == true) {
        this.defaultKeyQues = this.saveKeyQues;
      }
    }
    if (this.createEdit == 'edit') {
      this.tempCancel = JSON.parse(JSON.stringify(this.editKeyValue));
      this.defaultKeyQues = this.tempCancel;
      // console.log("EDIT Window",this.defaultKeyQues);
      if (this.notChangeValue == true) {
        this.defaultKeyQues = this.saveKeyQues;
      }
    }

  }
  saveRoles() {
    if (this.roleModel.istopApps == 'role') {
      for(let element of this.roleModel.topApps){
        if ((element.appObj == "" || element.appObj == null) && (element.appName != "" || element.appName != null)) {
          this.emptyAppLabel = true;
          break;
        }
        else {
          this.emptyAppLabel = false;
        }
        if ((element.appObj == "" || element.appObj == null) && (element.appName == "" || element.appName == null)) {
          this.emptyAppLabel = false;
        }
      };
    }
    else {
      this.emptyAppLabel = false;
    }
    if (this.roleModel.istopReports == 'role') {
      for(let element of this.roleModel.topReports){
        if ((element.reportID == "" || element.reportID == null) && (element.reportName != "" || element.reportName != null)) {
          this.emptyReportLabel = true;
          break;
        }
        else {
          this.emptyReportLabel = false;
        }
        if ((element.reportID == "" || element.reportID == null) && (element.reportName == "" || element.reportName == null)) {
          this.emptyReportLabel = false;
        }
      }
    }
    else {
      this.emptyReportLabel = false;
    }

    // this.validDataAccess(this.roleModel.dataAccess)

    if (this.rolesForm.invalid || this.roleModel.homeDashboardId == null || this.roleModel.homeDashboardId == '' || this.emptyAppLabel == true || this.emptyReportLabel == true) {
      if (this.rolesForm.invalid || this.roleModel.homeDashboardId == null || this.roleModel.homeDashboardId == '' || this.emptyAppLabel == true || this.emptyReportLabel == true) {
        this.submittedRoles = true;
      }
      return
    }
    else {
      if (this.roleModel.isHomedashboard == 'company') {
        this.roleModel.homeDashboardId = this.defaultID
      }
      if (this.roleModel.iskeyQuestions == 'company') {
        this.roleModel.keyQuestions = this.sameValue
        // console.log(this.roleModel.keyQuestions.TopicsTrending)
      }
      else if (this.roleModel.iskeyQuestions == 'role') {
        if (this.saveKeyQues == null && this.notChangeValue == false) {
          this.roleModel.keyQuestions = this.sameValue
        }
        else {
          this.roleModel.keyQuestions = this.saveKeyQues
        }
      }
      if (this.roleModel.istopApps == 'company') {
        this.roleModel.topApps = JSON.parse(JSON.stringify(this.defaultTopAppsArr == undefined ? [] : this.defaultTopAppsArr));
      }
      if (this.roleModel.istopReports == 'company') {
        this.roleModel.topReports = JSON.parse(JSON.stringify(this.defaultTopReport == undefined ? [] : this.defaultTopReport));
      }
      if (this.roleModel.istopApps == 'role') {
        this.roleModel.topApps.forEach(element => {
          if (element.appName == "" || element.appName == null) {
            element.appObj = ""
          }
        });
      }
      // this.roleModel.dataAccess = this.dataAccessList
      this.spinnerService.show();
      this.roleService.saveRoles(this.roleModel).subscribe(
        (data: any) => {
          // console.log(data);
          this.roleModel = new RolesModel();
          this.getRoles();
          this.EditRole = 'roleList';
          this.notChangeValue = false;
          this.rolesForm.reset();
          this.commonMethods.addToastforlongtime(true, 'Role created');
          this.spinnerService.hide();
          this.loading = false;
          this.defaultKeyQues = null;
          this.editKeyValue = null;
          this.tempAppArr = [];
          this.tempTopReport = [];
          this.emptyAppLabel = false;
          this.emptyReportLabel = false;
          // this.dataAccessErr = false;
          // this.sendDataTOmstr(data.Item)
          // this.saveKeyQues = null;
        },
        (error) => {
          this.loading = false;
          console.log(error);
          this.spinnerService.hide();
          this.commonMethods.addToastforlongtime(false, error.error);
        })
    }

  }

  emptyAppLabel: boolean = false;
  emptyReportLabel: boolean = false;
  // dataAccessErr:boolean = false;
  updateRoles() {
    if (this.roleModel.istopApps == 'role') {
      for( let element of this.roleModel.topApps){
        if ((element.appObj == "" || element.appObj == null) && (element.appName != "" || element.appName != null)) {
          this.emptyAppLabel = true;
          break;
        }
        else {
          this.emptyAppLabel = false;
        }
        if ((element.appObj == "" || element.appObj == null) && (element.appName == "" || element.appName == null)) {
          this.emptyAppLabel = false;
        }
      };
    }
    else {
      this.emptyAppLabel = false;
    }
    if (this.roleModel.istopReports == 'role') {
      for(let element of this.roleModel.topReports) {
        if ((element.reportID == "" || element.reportID == null) && (element.reportName != "" || element.reportName != null)) {
          this.emptyReportLabel = true;
          break;
        }
        else {
          this.emptyReportLabel = false;
        }
        if ((element.reportID == "" || element.reportID == null) && (element.reportName == "" || element.reportName == null)) {
          this.emptyReportLabel = false;
        }
      }
    }
    else {
      this.emptyReportLabel = false;
    }
    // this.validDataAccess(this.roleModel.dataAccess)

    if (this.rolesForm.invalid || this.roleModel.homeDashboardId == null || this.roleModel.homeDashboardId == '' || this.emptyAppLabel == true || this.emptyReportLabel == true) {
      if (this.rolesForm.invalid || this.roleModel.homeDashboardId == null || this.roleModel.homeDashboardId == '' || this.emptyAppLabel == true || this.emptyReportLabel == true) {
        this.submittedRoles = true;
      }
      return
    }
    else {
      if (this.roleModel.isHomedashboard == 'company') {
        this.roleModel.homeDashboardId = this.defaultID
      }
      if (this.roleModel.iskeyQuestions == 'company') {
        // console.log("COMPY", this.sameValue)
        this.roleModel.keyQuestions = this.sameValue

        // console.log(this.roleModel.keyQuestions.TopicsTrending)
      }
      else if (this.roleModel.iskeyQuestions == 'role') {
        // if(this.saveKeyQues == null && this.notChangeValue == false){
        //   console.log("SAME VALUE IF")
        //   this.roleModel.keyQuestions = this.sameValue
        // }
        // else{
        // console.log("ROLE")
        this.roleModel.keyQuestions = this.defaultKeyQues
        // console.log("ROLE",this.roleModel.keyQuestions)
        // }

      }
      if (this.roleModel.istopApps == 'company') {
        this.roleModel.topApps = JSON.parse(JSON.stringify(this.defaultTopAppsArr == undefined ? [] : this.defaultTopAppsArr));
      }
      if (this.roleModel.istopReports == 'company') {
        this.roleModel.topReports = JSON.parse(JSON.stringify(this.defaultTopReport == undefined ? [] : this.defaultTopReport));
      }
      if (this.roleModel.istopApps == 'role') {
        this.roleModel.topApps.forEach(element => {
          if (element.appName == "" || element.appName == null) {
            element.appObj = ""
          }
        });
      }
      
    this.spinnerService.show();
    // console.log(this.roleModel)
    // this.roleModel.roleEvaluationFormID = null;
    this.roleService.updateRoles(this.roleModel).subscribe(
      (data:any)=>{
        // console.log(data);
         this.roleModel = new RolesModel();
        if(data.roleId == UserData.role){
          this.getCurrentRolePermission(data.roleId);
        }
        this.EditRole = 'roleList';
        this.notChangeValue = false;
        this.getRoles();
        this.commonMethods.addToastforlongtime(true,data.roleId == UserData.role ? 'Role updated.Please wait for a moment!':'Role updated');

        // this.spinnerService.hide();
        this.loading = false;
        this.emptyAppLabel = false;
        this.emptyReportLabel = false;
        // this.dataAccessErr = false;
        // this.sendDataTOmstr(data)
        // this.defaultKeyQues = null;
        // this.editKeyValue = null;
        // this.saveKeyQues = null;
      },
      (error)=>{
        this.loading = false;
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
    }
  }
  
  deleteRoles(){
    this.spinnerService.show();
    this.roleService.deleteRoles(this.roleModel).subscribe(
      (data: any) => {
        this.getRoles()
        this.EditRole = 'roleList';
        this.commonMethods.addToastforlongtime(true, 'Role deleted');
        this.spinnerService.hide();
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }

  roleEvalDDL: any = []
  getEvalDDL() {
    this.actionsService.getEvaluationItems().subscribe(
      (data: any) => {
        // console.log(data)
        this.roleEvalDDL = data;
      }, (error) => {
        console.log(error.error)
        this.commonMethods.addToastforlongtime(false, error.error)
      })
  }

  validatePlatformId: number = 0;
  tabPermission: boolean = false;
  tabDisableString: string = "";
  isEnableMoment: Boolean = false;
  isRealTime: boolean = false;
  getplatformValidate() {
    this.preferenceService.getPlatformDetail.subscribe(
      (data: any) => {
        // console.log(data)
        this.validatePlatformId = data.platformId;
        // if (data.platformId == 2 && data.platformName == "Genesys PureCloud") {
        //   this.validatePlatformIdGenesys = true;
        //   // this.tabPermission = false;
        //   // this.tabDisableString = "";
        //   this.isRealTime = data.realTimeFlag != undefined ? data.realTimeFlag : false
        // }
        // else {
        //   this.validatePlatformIdGenesys = false;
        //   this.tabPermission = true;
        //   this.tabDisableString = "Under Process";
        //   this.isRealTime = false;
        // }
        this.isEnableMoment = (data.isCallTranscription_V2 != undefined) ? data.isCallTranscription_V2 : false;
      }
    ),
      (error) => {
        console.log(error)
      }
  }

  // topReportsArr:any = [];
  defaultTopReport: any = [];
  tempTopReport: any = [];
  getTopReportConfig() {
    this.keyQuestionService.getMstrConfig().subscribe(
      (data: any) => {
        // this.topReportsArr = data.topReports
        this.defaultTopReport = data.topReports
      },
      (error) => {
        console.log(error)
      }
    )
  }

  roleTopReport(type) {
    if (type == "role") {
      //  this.roleModel.topReports = this.topReportsArr;
      if (this.tempTopReport.length == 0) {
        this.roleModel.topReports = JSON.parse(JSON.stringify(this.defaultTopReport == undefined ? [] : this.defaultTopReport));
      }
      else {
        this.roleModel.topReports = JSON.parse(JSON.stringify(this.tempTopReport));
      }
    }
    if (type == "company") {
      this.tempTopReport = JSON.parse(JSON.stringify(this.roleModel.topReports))
      this.roleModel.topReports = JSON.parse(JSON.stringify(this.defaultTopReport == undefined ? [] : this.defaultTopReport));
    }
  }
  emptyModel: string = ""
  roleTopApps(type) {

    if (type == "role") {
      if (this.tempAppArr.length == 0) {
        // console.log(this.defaultTopAppsArr)

        this.roleModel.topApps = JSON.parse(JSON.stringify(this.defaultTopAppsArr));
      }
      else {

        this.roleModel.topApps = JSON.parse(JSON.stringify(this.tempAppArr));
      }

    }
    if (type == "company") {
      this.tempAppArr = JSON.parse(JSON.stringify(this.roleModel.topApps))
      this.roleModel.topApps = JSON.parse(JSON.stringify(this.defaultTopAppsArr));
    }

  }


  // topAppsArr:any = [];
  defaultTopAppsArr: any = [];
  tempAppArr: any = [];
  getTopAppsConfig() {
    this.roleService.defaultTopApps().subscribe(
      (data: any) => {
        // console.log(data)
        this.defaultTopAppsArr = data;

      },
      (error) => {
        console.log(error)
      }
    )
  }

  topAppsDDL: any = []
  getTopAppDDL() {
    this.roleService.getTopAppDDL().subscribe(
      (data: any) => {
        this.topAppsDDL = data;

      },
      (error) => {
        console.log(error)
      }
    )
  }

  topAppObjDDL: any = []
  getTopAppObj() {
    this.roleService.getTopAppObj().subscribe(
      (data: any) => {
         this.topAppObjDDL = data;
      },
      (error) => {
        console.log(error)
      }
    )
  }

  resultAppObj: any;
  searchAppObj(event,item) {
    let objArr = [], objArrayLabel = [];
    this.topAppObjDDL.map(ele =>{
        if(ele[item] != undefined){
            objArr = ele[item]
        }
    })
     objArr.map(element => {
      objArrayLabel.push(element.label)
      });
      if((this.validatePlatformId != 2) && (this.validatePlatformId != 9)){
        objArrayLabel = objArrayLabel.filter(e => e != "My Team's Evaluation")
      }
      this.resultAppObj = objArrayLabel.filter(a => a.toLowerCase().includes(event.query.toLowerCase()))
  }

  onChangeTopApps(event,i){    
      if (this.roleModel.istopApps == 'role') {
        this.roleModel.topApps.forEach((element,index) => {
          if(event.value && i == index){
              if(element.appName != '' && element.appName != null){
                  element.appObj = ''
              }
              return;
          }
        });
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
  //       this.roleModel.roleName = res;
  //     // }, 50);
  //   }
  //   this.keyPressOption = false;
  // }
  onPaste(event) {
    if(event){
       const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
       (<HTMLInputElement>document.getElementById('rolenameid')).value = trimmedText;
       this.roleModel.roleName = trimmedText
    }
  }

  getCurrentRolePermission(roleID){
    let rolespermission;
    this.spinnerService.show();
    this.loginService.getroles(roleID).subscribe(
      (data: any) => {
        if (typeof (data) == "string") {
          rolespermission = JSON.parse(data).successkpiFeatures
        }
        if (typeof (data) == "object") {
           rolespermission = data.successkpiFeatures
        }
        localStorage.removeItem("_&rp&");
        this.global.rolePermissions = rolespermission
        const encryptedRolesValue = this.commonMethods.encryptData(rolespermission)
        localStorage.setItem("_&rp&", encryptedRolesValue);
         window.location.reload();
         this.spinnerService.hide();
      }, 
      (error) => {
        console.log('error', error);
        this.spinnerService.hide();
      }
    )
  }
  
// --------------*********Data Access functionality*******-----------------------

  // --------------*********Data Access functionality*******-----------------------

  // // getDataAcces from S3
  //   dataAccessList:any=[]
  //   getdataAccess(){
  //     this.roleService.getdataAccess().subscribe(
  //       (data:any)=>{
  //         // console.log(data)
  //          let arr = [];
  //          data.forEach(element => {
  //           element.dataList = []
  //           arr.push(element)
  //         });
  //         this.dataAccessList = arr;

  //       },
  //       (error)=>{
  //         console.log(error)
  //       }
  //     )
  //   }

  // // dataAccess Multiselect DDL dynamic value loaded
  //   ddlModelValue(item){
  //     // console.log(item)
  //     this.ddl_custom_List = [];
  //     this.ddl_custom_List = this.customList[item];
  //     // console.log(this.ddl_custom_List)
  //   }

  // // Radio button onclick event for custom value
  //   onRadioSelect(value,label){
  //     // console.log(value)
  //     // if(value == 'all'){
  //       this.roleModel.dataAccess.forEach(element => {
  //         if(value == 'custom'){
  //           if(element.dataLabel == label){
  //             element.dataList.forEach(item => {
  //               if(item.toLowerCase() == 'all'){
  //                 element.dataList = []
  //               }
  //             });
  //           }
  //         }

  //       });
  //       // console.log(this.roleModel.dataAccess)
  //     // }
  //   }

  //   // dataAccess get Multiselect DDL value from redshift api 
  //   ddl_custom_List:any=[];
  //   customList:any;
  //   getCustomDataDDL(){
  //     this.roleService.getCustomDataOption().subscribe(
  //       (data:any)=>{
  //         // console.log(data)
  //         this.customList = data
  //         // console.log(this.customList);
  //       },
  //       (error)=>{
  //         console.log(error)
  //       }
  //     )
  //   }

  //   getStyle(i){
  //     if(i % 2 == 0) {
  //       return 'label-even'
  //     }  
  //     else {
  //       return 'label-odd'
  //     }
  //   }

  //VAlidation if custom selected , need to select ddl value for save and update
  // validDataAccess(val){
  //   //  val = this.roleModel.dataAccess;
  //   for(let element of val){
  //     if(element.dataValue == 'custom'){
  //       if(element.dataList.length == 0){
  //         this.dataAccessErr = true;
  //         break;
  //       }
  //       else{
  //         this.dataAccessErr = false;
  //       }
  //     }
  //     else{
  //       this.dataAccessErr = false;
  //       if(element.dataList.length == 0){
  //         element.dataList = ['All']
  //       }
  //       else{
  //         element.dataList = ['All']
  //       }
  //     }
  //   }
  // }

  // sendDataTOmstr(data){
  //  let arr = [];
  //  data.dataAccess.forEach(element => {
  //    let obj={
  //     mstrAttributeName: element.dataLabel,
  //     mstrAttributePermittedValues: element.dataList
  //    }
  //    arr.push(obj)
  //  });

  //  let paramsBody={
  //   mstrFilterDefJSONArray : arr,
  //   mstrFilterLogicalOperator : "AND",
  //   mstrFilterTargetProject : localStorage.getItem('mstrProject'),
  //   mstrUserGroupName : localStorage.getItem('_mgrp'),
  //   roleName: data.roleName
  //  }
  // //  console.log(JSON.stringify(paramsBody))
  //  this.roleService.sendDataTOmstr(paramsBody).subscribe(
  //    (data:any)=>{
  //     // console.log(data)
  //    },
  //    (error)=>{
  //      console.log(error)
  //    }
  //  )
  // }

  // deleteLabel(msg) {
  //   // console.log(msg)
  //   let temVal = JSON.parse(JSON.stringify(this.roleModel.dataAccess));
  //   temVal.forEach(element => {
  //    const index: number = element.dataList.indexOf(msg);
  //    console.log(index)
  //   if (index !== -1) {
  //     element.dataList.splice(index, 1);
  //   }
  //   });
  //   this.roleModel.dataAccess = temVal;

  // }

}
