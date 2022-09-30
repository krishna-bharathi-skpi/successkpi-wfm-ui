import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule, NavigationEnd, Routes } from '@angular/router';
import utils from '../../config';
import { UserData } from '../../user'
import { HttpClient, HttpBackend } from '@angular/common/http';
// import { TranslateService } from '@ngx-translate/core';

import { DropdownModule } from 'primeng/dropdown';
import { HeaderService } from './header.service';
import { CommonMethods } from '../../common/common.components';
import { GlobalComponent } from '../../global/global.component';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../../views/login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as auditLogs from '../../auditLogsPath';
import * as moment from 'moment';
import { MstrTokenService } from '../../services/mstrtoken.service';
import { navTop } from '../../_nav';
import { PreferenceService } from '../../views/settings/successkpi-setting/successkpi-setting.service';
import { EvaluationFormsService } from '../../views/evaluations/evaluation-forms/evaluation-forms.service';
import { MessageService } from 'primeng/api';
import { ProfileModel } from '../../views/settings/profile/profile.model';
import { ProfileComponent } from '../../views/settings/profile/profile.component';

@Component({
  selector: 'app-top-header',
  templateUrl: './header.component.html'
})

@Injectable({
  providedIn: 'root'
})

export class HeaderLayoutComponent implements OnInit {
  topnav: string = ''
  userName: string = '';
  lang: string;
  httpLocal: any;
  language: any = [];
  selectedLangs: any;
  languagelist: any;
  changeLang: string = "";
  visibleSidebar: boolean = false;
  isHideChangePassword:boolean = true;
  isEnableUsername:boolean = false;
  logoObj = localStorage.getItem('logo') == null || typeof (localStorage.getItem('logo')) == 'undefined' ? null : JSON.parse(localStorage.getItem('logo'))
  re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  defaultLogo: string = this.logoObj == null || this.logoObj.imageUrl == 'default' || this.logoObj.imageUrl == null || !(this.re.test(this.logoObj.imageUrl)) ? '../assets/img/SuccessKPI_Logo .svg' : this.logoObj.imageUrl
  constructor(private router: Router, private handler: HttpBackend,
    private http: HttpClient, public headerService: HeaderService,
    private commonMethods: CommonMethods,
    public global: GlobalComponent, private formBuilder: FormBuilder, private loginService: LoginService, private spinnerService: NgxSpinnerService,
    private mstrTokenService: MstrTokenService, private preferenceService: PreferenceService, private evaluationservice: EvaluationFormsService, private messageService: MessageService) {
    this.validateTopHeader();
    this.httpLocal = new HttpClient(handler);
    this.userName = UserData.userName;
    this.getLangJson();
    this.getuiDropdwn();
    this.roleslist();


  }
  @ViewChild(ProfileComponent) profileComponentChild: ProfileComponent

  permissionsHeaders: any;
  analyticsPermission: boolean = false;
  playbooksPermission: boolean = false;
  settingsPermission: boolean = false;
  evaluationPermission: boolean = false;
  homePermission: boolean = false;
  agentsPermission: boolean = false;
  workPermission: boolean = false;
  ngOnInit() {

     if (UserData.role.toLowerCase() != 'admin') {
       if(this.router.url.split('/')[1] == 'evaluations'){
       this.getModeratorID().then(res => {
        this.getplatformValidate();
       })
      }
      else{
        this.getplatformValidate();
      }
     }
     else {
       this.getplatformValidate();
     }

    this.rolesValidation();
    this.userLogo();
    this.updatePasswordForm();
    // this.auditLog();
  }

  rolesValidation() {
    this.permissionsHeaders = this.global.rolePermissions
    let isActiveScheduleDelivery = typeof (this.permissionsHeaders.analytics.scheduleDelivery) != 'undefined' ? (this.permissionsHeaders.analytics.scheduleDelivery.isView || this.permissionsHeaders.analytics.scheduleDelivery.isViewEdit) : false;
    let isActiveMyEvaluation = typeof (this.permissionsHeaders.evaluate.myEvaluation) != 'undefined' ? this.permissionsHeaders.evaluate.myEvaluation.isView : false;
    let isActiveScheduleImport = typeof (this.permissionsHeaders.analytics.scheduleImport) != 'undefined' ? (this.permissionsHeaders.analytics.scheduleImport.isView || this.permissionsHeaders.analytics.scheduleImport.isViewEdit) : false;
    let isActiveQueueStats = typeof (this.permissionsHeaders.analytics.realtimeReport) != 'undefined' ? this.permissionsHeaders.analytics.realtimeReport.isQueueStatsView : false;
    let isActiveQueueStatus = typeof (this.permissionsHeaders.analytics.realtimeReport) != 'undefined' ? this.permissionsHeaders.analytics.realtimeReport.isQueueStatusView : false;
    let isActiveAgentStats = typeof (this.permissionsHeaders.analytics.realtimeReport) != 'undefined' ? this.permissionsHeaders.analytics.realtimeReport.isAgentStatsView : false;
    let isActiveAgentStatus = typeof (this.permissionsHeaders.analytics.realtimeReport) != 'undefined' ? this.permissionsHeaders.analytics.realtimeReport.isAgentStatusView : false;
    let isActiveMyTeamsEvaluation = typeof (this.permissionsHeaders.evaluate.myTeamEvaluation) != 'undefined' ? this.permissionsHeaders.evaluate.myTeamEvaluation.isView : false;
    let isActiveCommandCenter = typeof (this.permissionsHeaders.home.commandCenter) != 'undefined' ? this.permissionsHeaders.home.commandCenter.isView : false;
    let isActive_coach_workspace = typeof (this.permissionsHeaders.evaluate.coachingWorkspace) != 'undefined' ? (this.permissionsHeaders.evaluate.coachingWorkspace.isView || this.permissionsHeaders.evaluate.coachingWorkspace.isViewEdit) : false;
    let isActive_evaluationWorkspaceNacd = typeof (this.permissionsHeaders.evaluate.evaluationWorkspaceNacd) != 'undefined' ? (this.permissionsHeaders.evaluate.evaluationWorkspaceNacd.isView || this.permissionsHeaders.evaluate.evaluationWorkspaceNacd.isViewEdit) : false;
    let isActive_newInteractions = typeof (this.permissionsHeaders.evaluate.newInteractions) != 'undefined' ? this.permissionsHeaders.evaluate.newInteractions.isView : false;
    let isActive_myCoachingSession = typeof (this.permissionsHeaders.evaluate.myCoachingSessions) != 'undefined' ? this.permissionsHeaders.evaluate.myCoachingSessions.isView : false;
    let isActive_dataPartition = typeof (this.permissionsHeaders.settings.dataPartition) != 'undefined' ? (this.permissionsHeaders.settings.dataPartition.isView || this.permissionsHeaders.settings.dataPartition.isViewEdit) : false;
    let isActive_AI_ML = typeof (this.permissionsHeaders.evaluate.ai_ml_Scoring) != 'undefined' ? (this.permissionsHeaders.evaluate.ai_ml_Scoring.isView || this.permissionsHeaders.evaluate.ai_ml_Scoring.isViewEdit) : false;
    let isActive_PhraseRecommendation = typeof (this.permissionsHeaders.playbooks.phraseRecommendation) != 'undefined' ? (this.permissionsHeaders.playbooks.phraseRecommendation.isView || this.permissionsHeaders.playbooks.phraseRecommendation.isViewEdit) : false;
    let isActive_PublicReports = typeof (this.permissionsHeaders.analytics.publicReports) != 'undefined' ? (this.permissionsHeaders.analytics.publicReports.isView || this.permissionsHeaders.analytics.scheduleImport.publicReports) : false;
    let isActive_Moments = typeof (this.permissionsHeaders.playbooks.moments) != 'undefined' ? (this.permissionsHeaders.playbooks.moments.isView || this.permissionsHeaders.playbooks.moments.isViewEdit) : false;
    let isActiveSharedSubscription = typeof (this.permissionsHeaders.analytics.sharedSubscriptions) != 'undefined' ? (this.permissionsHeaders.analytics.sharedSubscriptions.isView || this.permissionsHeaders.analytics.sharedSubscriptions.isViewEdit) : false;
    let isActiveContactSubscription = typeof (this.permissionsHeaders.analytics.contactSubscriptions) != 'undefined' ? (this.permissionsHeaders.analytics.contactSubscriptions.isView || this.permissionsHeaders.analytics.contactSubscriptions.isViewEdit) : false;
    let isActive_mangeDispute = typeof (this.permissionsHeaders.evaluate.manageDispute) != 'undefined' ? (this.permissionsHeaders.evaluate.manageDispute.isView || this.permissionsHeaders.evaluate.manageDispute.isViewEdit) : false;
    let isActive_Work_serviceQuality = this.permissionsHeaders.work != undefined ? typeof (this.permissionsHeaders.work.serviceQuality) != 'undefined' ? (this.permissionsHeaders.work.serviceQuality.isView || this.permissionsHeaders.work.serviceQuality.isViewEdit) : false : false;
    let isActive_Work_forecasting = this.permissionsHeaders.work != undefined ? typeof (this.permissionsHeaders.work.forecasting) != 'undefined' ? (this.permissionsHeaders.work.forecasting.isView || this.permissionsHeaders.work.forecasting.isViewEdit) : false : false;
    let isActive_Work_schedule = this.permissionsHeaders.work != undefined ? typeof (this.permissionsHeaders.work.schedule) != 'undefined' ? (this.permissionsHeaders.work.schedule.isView || this.permissionsHeaders.work.schedule.isViewEdit) : false : false;
    let isActive_Agent_Disposition_Coding = this.permissionsHeaders.agents != undefined ? typeof (this.permissionsHeaders.agents.dispositionCoding) != 'undefined' ? (this.permissionsHeaders.agents.dispositionCoding.isView || this.permissionsHeaders.agents.dispositionCoding.isViewEdit) : false : false;
    let isActive_Agent_myPerformance = this.permissionsHeaders.agents != undefined ? typeof (this.permissionsHeaders.agents.myPerformance) != 'undefined' ? (this.permissionsHeaders.agents.myPerformance.isView) : false : false;
    let isActive_Agent_myEvaluations = this.permissionsHeaders.agents != undefined ? typeof (this.permissionsHeaders.agents.myEvaluations) != 'undefined' ? (this.permissionsHeaders.agents.myEvaluations.isView) : false : false;
    let isActive_Agent_mySchedule = this.permissionsHeaders.agents != undefined ? typeof (this.permissionsHeaders.agents.mySchedule) != 'undefined' ? (this.permissionsHeaders.agents.mySchedule.isView) : false : false;

    if (this.permissionsHeaders.home != undefined && this.permissionsHeaders.home.help.isView || this.permissionsHeaders.home.homeDashboard.isViewEdit || this.permissionsHeaders.home.homeDashboard.isView || isActiveCommandCenter) {
      this.homePermission = true
    }
    if (this.permissionsHeaders.analytics.customReports.isView || this.permissionsHeaders.analytics.help.isView || this.permissionsHeaders.analytics.keyQuestion.isView || this.permissionsHeaders.analytics.sharedDashboard.isView || this.permissionsHeaders.analytics.subscription.isView
      || this.permissionsHeaders.analytics.keyQuestion.isViewEdit || this.permissionsHeaders.analytics.sharedDashboard.isViewEdit || this.permissionsHeaders.analytics.customReports.isViewEdit || this.permissionsHeaders.analytics.subscription.isViewEdit ||
      isActiveScheduleDelivery || isActiveScheduleImport || isActiveQueueStats || isActiveQueueStatus || isActiveAgentStats || isActiveAgentStatus || isActive_PublicReports || isActiveSharedSubscription || isActiveContactSubscription) {
      this.analyticsPermission = true
    }
    if (this.permissionsHeaders.evaluate.evaluationFroms.isView || this.permissionsHeaders.evaluate.help.isView || this.permissionsHeaders.evaluate.interactions.isView
      || this.permissionsHeaders.evaluate.evaluationFroms.isViewEdit || isActiveMyEvaluation || isActiveMyTeamsEvaluation || isActive_newInteractions || isActive_coach_workspace || isActive_myCoachingSession || isActive_AI_ML || isActive_mangeDispute ||
      isActive_evaluationWorkspaceNacd) {
      this.evaluationPermission = true
    }
    if (this.permissionsHeaders.playbooks.actions.isView || this.permissionsHeaders.playbooks.customPhrases.isView || this.permissionsHeaders.playbooks.help.isView || this.permissionsHeaders.playbooks.myPlaybooks.isView || this.permissionsHeaders.playbooks.redactions.isView || this.permissionsHeaders.playbooks.themes.isView || this.permissionsHeaders.playbooks.topics.isView
      || this.permissionsHeaders.playbooks.myPlaybooks.isViewEdit || this.permissionsHeaders.playbooks.topics.isViewEdit || this.permissionsHeaders.playbooks.themes.isViewEdit || this.permissionsHeaders.playbooks.actions.isViewEdit || this.permissionsHeaders.playbooks.redactions.isViewEdit || this.permissionsHeaders.playbooks.customPhrases.isViewEdit || isActive_PhraseRecommendation || isActive_Moments) {
      this.playbooksPermission = true
    }
    if (this.permissionsHeaders.settings.platformSettings.isView || this.permissionsHeaders.settings.preferences.isView || this.permissionsHeaders.settings.roles.isView || this.permissionsHeaders.settings.topicDetection.isView || this.permissionsHeaders.settings.users.isView
      || this.permissionsHeaders.settings.platformSettings.isViewEdit || this.permissionsHeaders.settings.preferences.isViewEdit || this.permissionsHeaders.settings.roles.isViewEdit || this.permissionsHeaders.settings.users.isViewEdit || this.permissionsHeaders.settings.topicDetection.isViewEdit || isActive_dataPartition) {
      this.settingsPermission = true;
    }
    if (this.permissionsHeaders.evaluate.evaluationFroms.isView || this.permissionsHeaders.evaluate.help.isView || this.permissionsHeaders.evaluate.interactions.isView
      || this.permissionsHeaders.evaluate.evaluationFroms.isViewEdit || isActiveMyEvaluation || isActiveMyTeamsEvaluation || isActive_newInteractions || isActive_coach_workspace || isActive_myCoachingSession || isActive_AI_ML || isActive_mangeDispute ||
      isActive_evaluationWorkspaceNacd) {
      this.evaluationPermission = true;
    }
    // if (this.permissionsHeaders.work != undefined && (isActive_Work_serviceQuality || isActive_Work_forecasting || isActive_Work_schedule)) {
    //   this.workPermission = true
    // }
    if (this.permissionsHeaders.work != undefined && this.permissionsHeaders.work.serviceQuality.isView || this.permissionsHeaders.work.forecasting.isView || this.permissionsHeaders.work.schedule.isView 
      || this.permissionsHeaders.work.serviceQuality.isViewEdit || this.permissionsHeaders.work.forecasting.isViewEdit || this.permissionsHeaders.work.schedule.isViewEdit 
      || isActive_Work_serviceQuality || isActive_Work_forecasting || isActive_Work_schedule) {
      this.workPermission = true;
    }
    if (this.permissionsHeaders.agents != undefined && (isActive_Agent_Disposition_Coding || isActive_Agent_myPerformance || isActive_Agent_myEvaluations || isActive_Agent_mySchedule)) {
      this.agentsPermission = true 
    }

  }

  userLogo() {
    let user = this.userName;
    let usersplit = user.split(" ");
    let intials = "";
    if (usersplit.length == 1) {
      intials = user.charAt(0).toUpperCase();
    }
    else {
      intials = usersplit[0].charAt(0).toUpperCase() + "" + usersplit[1].charAt(0).toUpperCase()
    }
    document.getElementById('profileImage').innerHTML = intials;
  };

  changeLanguage(flag) {
    if (flag === "change") {
      this.changeLang = this.global.getLangValue;
      let changeLangActivity = auditLogs.configJson.changeLang;
      this.routerPath = changeLangActivity;
      this.auditLog();
    }
    else if (flag === "cancel") {
      this.global.getLangValue = this.changeLang;
      this.changeLang = " ";
    }
    else {
      this.changeLang = " ";
    }

  }

  // changePwd() {
  //   let changePwd = auditLogs.configJson.changePwd;
  //   this.routerPath = changePwd;
  //   this.auditLog();
  // }
  // profileModel = new ProfileModel();
  auditLogPreference() {
    this.activeTabIndex = 0;
    this.visibleSidebar = true
    const changePwd = auditLogs.configJson + "(" + auditLogs.configJson.userProfile + "/" + auditLogs.configJson.changePwd + ")";
    this.routerPath = changePwd;
    this.auditLog();
  }

  getuiDropdwn() {
    this.headerService.getuiDropdwn().subscribe(
      (data: any) => {
        this.global.getDropdwn = data;
        let localLanguage = localStorage.getItem("language")
        if (localLanguage) {
          this.global.getLangValue = localLanguage
        }
        else {
          this.global.getLangValue = this.global.getDropdwn[0].value;
          localStorage.setItem("language", this.global.getDropdwn[0].value)
        }
        //MSTR Code
        if (data.length != 0) {
          const result = data.filter(langCode => langCode.value === this.global.getLangValue);
          if (result.length > 0) {
            this.global.MstrWebCode = result[0].mstrWebCode;
            // console.log(this.global.MstrWebCode);
          }
        }
      }, (err) => {
        console.log(err);
        this.spinnerService.hide();
      }
    )
  }
  getLangJson() {
    let localLanguage = localStorage.getItem("language")
    if (localLanguage) {
      this.global.getLangValue = localLanguage
    }
    else {
      this.global.getLangValue = "english";
    }
    return new Promise((resolve, reject) => {
      // this.spinnerService.show();
      this.headerService.getLanguage(this.global.getLangValue).subscribe(response => {
        this.global.language = response;
        // this.spinnerService.hide();
        resolve(response)
      },
        (error) => {
          console.log(error.error);
          reject(error);
          this.spinnerService.hide();
        })

    });
  }

  // updateLanguage() {
  //   this.spinnerService.show();
  //   this.headerService.updateLanguage({ uiLanguage: this.global.getLangValue }).subscribe(
  //     (data: any) => {
  //       localStorage.setItem("language", this.global.getLangValue);
  //       // this.reloginMSTR();
  //       this.refreshMSTRsessions();
  //       this.spinnerService.show();
  //     },
  //     (error) => {
  //       console.log(error);
  //       this.spinnerService.hide();
  //       this.commonMethods.addToastforlongtime(false, error.error);
  //     }
  //   )
  // }

  // refreshMSTRsessions() {
  //   // this.spinnerService.show();
  //   this.mstrTokenService.ReloadWorkspace().subscribe(
  //     (obj: any) => {
  //       this.mstrTokenService.ReloadWorkspace().subscribe(
  //         (data: any) => {
  //           this.mstrTokenService.recreateMSTRsession(data);
  //           this.spinnerService.hide();
  //           window.location.reload();
  //         },
  //         (error) => {
  //           console.log(error);
  //         });

  //     },
  //     (error) => {
  //       console.log(error);
  //       this.commonMethods.addToastforlongtime(false, error.error);
  //       this.spinnerService.hide();
  //     }
  //   )
  // }

  // reloginMSTR() {
  //   let mstr;
  //   if (typeof (localStorage.getItem("mstrAuthToken") != "undefined")) {
  //     mstr = localStorage.getItem("mstrAuthToken");
  //     mstr = JSON.parse(mstr);
  //   }
  //   let url = utils.pathPhase9 + "/api/reMstrLogIn/" + this.global.getLangValue;
  //   let params = {
  //     "mstrAuthToken": typeof (mstr) != 'undefined' ? mstr['authToken'] : null,
  //     "cookie": typeof (mstr) != 'undefined' ? mstr['cookie'] : null
  //   }
  //   this.spinnerService.show();
  //   this.http.put(url, params).subscribe(
  //     (data: any) => {
  //       localStorage.removeItem("mstrAuthToken");
  //       localStorage.removeItem("mstrIdToken");
  //       localStorage.setItem("mstrIdToken", JSON.stringify(data.mstrIdToken));
  //       localStorage.setItem("mstrAuthToken", JSON.stringify(data.mstrAuthToken));
  //       this.spinnerService.hide();
  //       window.location.reload();
  //     }, (err) => {
  //       console.log(err);
  //       this.commonMethods.addToastforlongtime(false, err.error);
  //       window.location.reload();
  //       this.spinnerService.hide();
  //     });
  // }
  routerPath: any = null;

  validateTopHeader() {
    let header = ''
    this.router.events.subscribe((event) => {
      this.topnav = ''
      if (event instanceof NavigationEnd) {
        event instanceof NavigationEnd ? header = event.urlAfterRedirects : null;
        let sideNavPath = null;

        let rUrl = typeof (header) == 'string' ? header.toLowerCase() : null
        let cust_rUrl = rUrl.split('/')

        if (rUrl == '/home/home-dashboard' || rUrl == '/home/customize-dashboard' || rUrl == '/home/help' || rUrl == '/home/command-center') {
          this.topnav = 'home'

          if (rUrl == '/home/home-dashboard') {
            sideNavPath = auditLogs.configJson.headers.home + "-" + auditLogs.configJson.homeSection.homeDashboard;
          }
          else if (rUrl == '/home/customize-dashboard') {
            sideNavPath = auditLogs.configJson.headers.home + "-" + auditLogs.configJson.homeSection.customizeDashboard;
          }
          else if (rUrl == '/home/help') {
            sideNavPath = auditLogs.configJson.headers.home + "-" + auditLogs.configJson.homeSection.help;
          }
          else if (rUrl == '/home/command-center') {
            sideNavPath = auditLogs.configJson.headers.home + "-" + auditLogs.configJson.homeSection.commandCenter;
          }
        }
        else if (rUrl == '/playbooks/my-playbooks' || rUrl == '/playbooks/topics' || rUrl == '/playbooks/moments' || rUrl == '/playbooks/themes' || rUrl == '/playbooks/actions' || rUrl == '/playbooks/phrase-recommmendation' || rUrl == '/playbooks/redactions' || rUrl == '/playbooks/custom-phrases' || rUrl == '/playbooks/help') {
          this.topnav = 'playbooks'
          if (rUrl == '/playbooks/my-playbooks') {
            sideNavPath = auditLogs.configJson.headers.playbooks + "-" + auditLogs.configJson.playbookSection.myplaybooks;
          }
          else if (rUrl == '/playbooks/topics') {
            sideNavPath = auditLogs.configJson.headers.playbooks + "-" + auditLogs.configJson.playbookSection.topic;
          }
          else if (rUrl == '/playbooks/moments') {
            sideNavPath = auditLogs.configJson.headers.playbooks + "-" + auditLogs.configJson.playbookSection.moments;
          }
          else if (rUrl == '/playbooks/themes') {
            sideNavPath = auditLogs.configJson.headers.playbooks + "-" + auditLogs.configJson.playbookSection.theme;
          }
          else if (rUrl == '/playbooks/actions') {
            sideNavPath = auditLogs.configJson.headers.playbooks + "-" + auditLogs.configJson.playbookSection.action;
          }
          else if (rUrl == '/playbooks/phrase-recommmendation') {
            sideNavPath = auditLogs.configJson.headers.playbooks + "-" + auditLogs.configJson.playbookSection.phraseRecommendation;
          }
          else if (rUrl == '/playbooks/redactions') {
            sideNavPath = auditLogs.configJson.headers.playbooks + "-" + auditLogs.configJson.playbookSection.redaction;
          }
          else if (rUrl == '/playbooks/custom-phrases') {
            sideNavPath = auditLogs.configJson.headers.playbooks + "-" + auditLogs.configJson.playbookSection.customPhrase;
          }
          else if (rUrl == '/playbooks/help') {
            sideNavPath = auditLogs.configJson.headers.playbooks + "-" + auditLogs.configJson.playbookSection.help;
          }
        }
        else if (rUrl == '/evaluations/evaluation-workspace-nacd' || rUrl == '/evaluations/coaching-workspace' || rUrl == '/evaluations/manage-dispute' || rUrl == '/evaluations/ai_ml-scoring' || rUrl == '/evaluations/evaluation-forms' || rUrl == '/evaluations/interactions' || rUrl == '/evaluations/my-evaluation' || rUrl == '/evaluations/my-teams-evaluation' || rUrl == '/evaluations/my-coaching-sessions' || rUrl == '/evaluations/new-interactions' || rUrl == '/evaluations/help') {
          this.topnav = 'evaluation'

          // if (rUrl == '/evaluations/evaluation-workspace') {
          //   sideNavPath = auditLogs.configJson.headers.evaluation + "-" + auditLogs.configJson.evaluateSection.workspace;
          // }
          // else 
          if (rUrl == '/evaluations/evaluation-workspace-nacd') {
            sideNavPath = auditLogs.configJson.headers.evaluation + "-" + auditLogs.configJson.evaluateSection.workspace_nacd;
          }
          else if (rUrl == '/evaluations/evaluation-forms') {
            sideNavPath = auditLogs.configJson.headers.evaluation + "-" + auditLogs.configJson.evaluateSection.forms;
          }
          // else if (rUrl == '/evaluations/interactions') {
          //   sideNavPath = auditLogs.configJson.headers.evaluation + "-" + auditLogs.configJson.evaluateSection.interactions;
          // }
          else if (rUrl == '/evaluations/new-interactions') {
            sideNavPath = auditLogs.configJson.headers.evaluation + "-" + auditLogs.configJson.evaluateSection.new_interactions;
          }
          else if (rUrl == '/evaluations/my-evaluation') {
            sideNavPath = auditLogs.configJson.headers.evaluation + "-" + auditLogs.configJson.evaluateSection.myEvaluation;
          }
          else if (rUrl == '/evaluations/my-teams-evaluation') {
            sideNavPath = auditLogs.configJson.headers.evaluation + "-" + auditLogs.configJson.evaluateSection.myTeamsEvaluation;
          }
          else if (rUrl == '/evaluations/help') {
            sideNavPath = auditLogs.configJson.headers.evaluation + "-" + auditLogs.configJson.evaluateSection.help;
          }
          else if (rUrl == '/evaluations/coaching-workspace') {
            sideNavPath = auditLogs.configJson.headers.evaluation + "-" + auditLogs.configJson.evaluateSection.coach_workspace;
          }
          else if (rUrl == '/evaluations/my-coaching-sessions') {
            sideNavPath = auditLogs.configJson.headers.evaluation + "-" + auditLogs.configJson.evaluateSection.myCoach;
          }
          else if (rUrl == '/evaluations/ai_ml-scoring') {
            sideNavPath = auditLogs.configJson.headers.evaluation + "-" + auditLogs.configJson.evaluateSection.ai_mlScoring;
          }
          else if (rUrl == '/evaluations/manage-dispute') {
            sideNavPath = auditLogs.configJson.headers.evaluation + "-" + auditLogs.configJson.evaluateSection.manageDispute;
          }
        }
        else if (rUrl == '/analytics/key-questions' || rUrl == '/analytics/shared-dashboards' || rUrl == '/analytics/custom-reports' || rUrl == '/analytics/subscriptions' || rUrl == '/analytics/schedule-delivery'
          || rUrl == '/analytics/schedule-import' || rUrl == '/analytics/help' || rUrl == '/analytics/queue-stats' || rUrl == '/analytics/queue-status' || rUrl == '/analytics/agent-stats' || rUrl == '/analytics/agent-status' || rUrl == "/analytics/my-reports" || rUrl == '/analytics/public-reports'
          || rUrl == '/analytics/shared-subscriptions' || rUrl == '/analytics/contact-subscriptions') {
          this.topnav = 'analytics'

          if (rUrl == '/analytics/key-questions') {
            sideNavPath = auditLogs.configJson.headers.analytics + "-" + auditLogs.configJson.analyticsSection.keyQuestion;
          }
          else if (rUrl == '/analytics/shared-dashboards') {
            sideNavPath = auditLogs.configJson.headers.analytics + "-" + auditLogs.configJson.analyticsSection.dashboard;
          }
          else if (rUrl == '/analytics/custom-reports') {
            sideNavPath = auditLogs.configJson.headers.analytics + "-" + auditLogs.configJson.analyticsSection.custom;
          }
          else if (rUrl == '/analytics/public-reports') {
            sideNavPath = auditLogs.configJson.headers.analytics + "-" + auditLogs.configJson.analyticsSection.publicReports;
          }
          else if (rUrl == '/analytics/subscriptions') {
            sideNavPath = auditLogs.configJson.headers.analytics + "-" + auditLogs.configJson.analyticsSection.subscription;
          }
          else if (rUrl == '/analytics/shared-subscriptions') {
            sideNavPath = auditLogs.configJson.headers.analytics + "-" + auditLogs.configJson.analyticsSection.sharedSubscription;
          }
          else if (rUrl == '/analytics/contact-subscriptions') {
            sideNavPath = auditLogs.configJson.headers.analytics + "-" + auditLogs.configJson.analyticsSection.contactSubscription;
          }
          else if (rUrl == '/analytics/schedule-delivery') {
            sideNavPath = auditLogs.configJson.headers.analytics + "-" + auditLogs.configJson.analyticsSection.scheduleDelivery;
          }
          else if (rUrl == '/analytics/schedule-import') {
            sideNavPath = auditLogs.configJson.headers.analytics + "-" + auditLogs.configJson.analyticsSection.scheduleImport;
          }
          else if (rUrl == '/analytics/help') {
            sideNavPath = auditLogs.configJson.headers.analytics + "-" + auditLogs.configJson.analyticsSection.help;
          }
          else if (rUrl == '/analytics/queue-stats') {
            sideNavPath = auditLogs.configJson.headers.analytics + "-" + auditLogs.configJson.analyticsSection.queueStats;
          }
          else if (rUrl == '/analytics/queue-status') {
            sideNavPath = auditLogs.configJson.headers.analytics + "-" + auditLogs.configJson.analyticsSection.queueStatus;
          }
          else if (rUrl == '/analytics/agent-stats') {
            sideNavPath = auditLogs.configJson.headers.analytics + "-" + auditLogs.configJson.analyticsSection.agentStats;
          }
          else if (rUrl == '/analytics/agent-status') {
            sideNavPath = auditLogs.configJson.headers.analytics + "-" + auditLogs.configJson.analyticsSection.agentStatus;
          }
          else if (rUrl == '/analytics/my-reports') {
            sideNavPath = auditLogs.configJson.headers.analytics + "-" + auditLogs.configJson.analyticsSection.my_reports;
          }

        }
        else if (rUrl == '/settings/platform-setting' || rUrl == '/settings/preferences' || rUrl == '/settings/partitions' || rUrl == '/settings/roles' || rUrl == '/settings/users' || rUrl == '/settings/topic-detection') {
          this.topnav = 'settings'
          if (rUrl == '/settings/platform-setting') {
            sideNavPath = auditLogs.configJson.headers.settings + "-" + auditLogs.configJson.settingsSection.platform;
          }
          else if (rUrl == '/settings/preferences') {
            sideNavPath = auditLogs.configJson.headers.settings + "-" + auditLogs.configJson.settingsSection.preference;
          }
          else if (rUrl == '/settings/roles') {
            sideNavPath = auditLogs.configJson.headers.settings + "-" + auditLogs.configJson.settingsSection.roles;
          }
          else if (rUrl == '/settings/users') {
            sideNavPath = auditLogs.configJson.headers.settings + "-" + auditLogs.configJson.settingsSection.user;
          }
          else if (rUrl == '/settings/topic-detection') {
            sideNavPath = auditLogs.configJson.headers.settings + "-" + auditLogs.configJson.settingsSection.topic;
          }
          else if (rUrl == '/settings/partitions') {
            sideNavPath = auditLogs.configJson.headers.settings + "-" + auditLogs.configJson.settingsSection.partition;
          }
          // else if (rUrl == '/settings/profile') {
          //   sideNavPath = auditLogs.configJson.headers.settings + "-" + auditLogs.configJson.settingsSection.profile;
          // }
        }
        else if (rUrl == '/agents/disposition-coding' || rUrl == '/agents/my-performance' || rUrl == '/agents/my-evaluations' || rUrl == '/agents/my-schedule') {
          this.topnav = 'agents'
          if (rUrl == '/agents/disposition-coding') {
            sideNavPath = auditLogs.configJson.headers.agents + "-" + auditLogs.configJson.agentsSection.disposition_coding;
          }
          else if (rUrl == '/agents/my-performance') {
            sideNavPath = auditLogs.configJson.headers.agents + "-" + auditLogs.configJson.agentsSection.Agent_my_performance;
          }
          else if (rUrl == '/agents/my-evaluations') {
            sideNavPath = auditLogs.configJson.headers.agents + "-" + auditLogs.configJson.agentsSection.Agent_my_Evaluations;
          }
          else if (rUrl == '/agents/my-schedule') {
            sideNavPath = auditLogs.configJson.headers.agents + "-" + auditLogs.configJson.agentsSection.Agent_my_Schedule;
          }
        }
        else if (cust_rUrl[1] == 'wfm') {
          this.topnav = 'wfm'
          if (rUrl == '/wfm/service_levels/list') {
            sideNavPath = auditLogs.configJson.headers.work + "-" + auditLogs.configJson.workSection.serviceQuality
          }
          else if (rUrl == '/wfm/forecast/list') {
            sideNavPath = auditLogs.configJson.headers.work + "-" + auditLogs.configJson.workSection.forecasting
          }
          else if (rUrl == '/wfm/schedule/workgroup/list' || rUrl == '/wfm/schedule/agents/list' || rUrl == '/wfm/schedule/tasks/list' || rUrl == '/wfm/schedule/workplan/list') {
            sideNavPath = auditLogs.configJson.headers.work + "-" + auditLogs.configJson.workSection.schedule
          }
          // To highlight sidebar menu
          $('.wfm-sidebar a').removeClass('active');
          setTimeout(() => {
            $('.sidebar_' + cust_rUrl[2] + ' a').addClass('active');
            setTimeout(() => {
              if(cust_rUrl[3] == 'workgroup' || cust_rUrl[3] == 'workgroup_rules'){
                $('.sidebar_workgroup a').addClass('active');
              }
              if(cust_rUrl[3] == 'agents'){
                $('.sidebar_agent a').addClass('active');
              }
              if(cust_rUrl[3] == 'tasks'){
                $('.sidebar_task a').addClass('active');
              }
              if(cust_rUrl[3] == 'workplan'){
                $('.sidebar_workplan a').addClass('active');
              }
            }, 10);
          }, 10);
        }

        if (sideNavPath != null && sideNavPath != this.global.previousPath) {
          this.routerPath = sideNavPath;
          this.global.previousPath = this.routerPath
          this.auditLog();
        }

      }
    }
    )
  }




  logout() {
    this.spinnerService.show();
    let logout = auditLogs.configJson.logout;
    this.routerPath = logout;
    this.auditLog();
    this.loginService.logout();
  }
  // change password
  updatePass: FormGroup;
  updatePasswordForm() {
    this.updatePass = this.formBuilder.group({
      oldPass: ['', Validators.required],
      newPass: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', Validators.required],
    })
  }
  get validationPass() { return this.updatePass.controls; }
  submittedPassword = false;
  onSubmitGenesys() {
    this.submittedPassword = true;
    if (this.updatePass.invalid) {
      return
    }
  }
  // update password in change password tab
  param: object;
  oldpwd: string = "";
  newpwd: string = "";
  newpwd1: string = "";
  passwordMatch = false;
  isLoading: boolean = false;
  updatePassword() {
    if (this.newpwd === this.newpwd1) {
      this.passwordMatch = false;
    } else {
      this.passwordMatch = true;
    }
    if (this.updatePass.invalid || this.passwordMatch == true) {
      if (this.updatePass.invalid) {
        this.submittedPassword = true;
      }
      return;
    }
    this.param = {
      "oldPassword": this.oldpwd,
      "newPassword": this.newpwd,
      "AccessToken": this.commonMethods.decryptData(localStorage.getItem("accessToken"))
    }
    this.passwordMatch = false;
    this.isLoading = true;
    this.updatePass.disable();
    // this.spinnerService.show();
    this.headerService.updatePassword(this.param).subscribe(
      (data: any) => {
        this.messageService.add({ key: 'tc', severity: 'success', summary: 'Password changed', sticky: true });
        // this.commonMethods.addToastforlongtime(true, 'Password changed');
        this.logout();
        // this.spinnerService.hide();
      },
      (err) => {
        console.log(err);
        this.messageService.add({ key: 'tc', severity: 'info', summary: err.error });
        // this.commonMethods.addToastforlongtime(false, err.error);
        this.isLoading = false;
          this.updatePass.enable();
          this.spinnerService.hide();
        // this.spinnerService.hide();
        // window.location.reload()
      })
  }
  cancelPassword(event?) {
    if (this.profileComponentChild != undefined && this.profileComponentChild.onChangeText != undefined) {
      if (this.activeTabIndex == 1) {
        this.updatePass.reset();
        this.passwordMatch = false;
        this.submittedPassword = false;
      }
      else {
        if (this.activeTabIndex == 0 && !this.profileComponentChild.onChangeText) {
          // this.profileComponentChild.profileform.reset()
          this.profileComponentChild.profileModel = new ProfileModel();
          this.visibleSidebar = event
          this.profileComponentChild.getCustomerPool("header");
        }
      }
      this.profileComponentChild.onChangeText = true
    }
    else {
      this.updatePass.reset();
      this.passwordMatch = false;
      this.submittedPassword = false;
    }
    this.visibleSidebar = false;
  }

  // checkPasswordMatch(newPass, confirmPwd) {
  //   setTimeout(() => {
  //     if ( newPass == confirmPwd) {
  //       this.passwordMatch = 1;
  //     } else {
  //       this.passwordMatch = 0;
  //     }
  //   }, 250);
  // }

  localRole: any;
  rolespermission: any;
  roleslist() {
    this.localRole = UserData.role
    this.loginService.getroles(this.localRole).subscribe(
      (data: any) => {
        this.loginService.getRoleData.next(data);
        this.loginService.getRoleData.complete();
        if (typeof (data) == "string") {
          this.rolespermission = JSON.parse(data).successkpiFeatures
        }
        if (typeof (data) == "object") {
          this.rolespermission = data.successkpiFeatures
        }
        this.global.rolePermissions = this.rolespermission
        let val = this.commonMethods.encryptData(this.rolespermission)
        localStorage.setItem("_&rp&", val);
      }, (error) => {
        console.log('error', error);
        this.spinnerService.hide();
      }
    )
    //   return new Promise((resolve, reject) => {
    //     this.localRole = UserData.role
    //     this.loginService.getroles(this.localRole).subscribe(
    //       (data: any)=>{
    //         resolve(data.successkpiFeatures);
    //       },
    //       (error) => {
    //         reject(error);
    //     });
    //   })
  }

  params: object;
  auditLog() {
    // let C_Id = UserData.customerId
    let Email = UserData.email_Id

    let date = new Date();
    let timestamp = moment(date).format('YYYY-MM-DD HH:mm:ss');

    this.params = {
      // CustomerID: C_Id,
      User_Email: Email,
      Activity: this.routerPath,
      Event_Time: timestamp
    }
    this.headerService.auditLog(this.params).subscribe(
      (data: any) => {
        // C_Id = null;
        Email = null;
        this.routerPath = null;
        timestamp = null;

      },
      (error) => {
        console.log(error);
        // this.commonMethods.addToastforlongtime(false , error.error)
      })
  }

  // MobileDevice Sidebar Restriction (991px)
  restrictMenuMobileDevice(element?,moderatorID?) {
    this.rolesValidation();
    let subIdArr = [];
    if (UserData.role.toLowerCase() != 'admin') {
      this.evaluationservice.getModerator.subscribe((data:any) => {
        subIdArr = [];
        data.forEach(element => {
          if (element.userModerator != undefined && element.userModerator.length > 0) {
            let filterObj = element.userModerator.filter(s => s == UserData.user_Sub_Id);
            if (filterObj.length > 0) {
              subIdArr.push(filterObj[0])
            }
          }
        });
      })
    }

    if (element.name == "Home") {
      if (this.homePermission) {
        element.divider = false
        element.children.forEach(element => {
          if (element.url == '/home/help') {
            if (this.global.rolePermissions.home.help.isView == false) {
              element.divider = true            // true means not shown ,false means shown(initially false in nav.ts)
            }
          }
          else if (element.url == '/home/customize-dashboard') {
            if (this.global.rolePermissions.home.homeDashboard.isViewEdit == false) {
              element.divider = true
            }
          }
          else if (element.url == '/home/home-dashboard') {
            if (this.global.rolePermissions.home.homeDashboard.isView == false) {
              element.divider = true
            }
          }
          else if (element.url == '/home/command-center') {
            let isActive = typeof (this.global.rolePermissions.home.commandCenter) == 'undefined' ? false : this.global.rolePermissions.home.commandCenter.isView;
            if (!isActive) {
              element.divider = true
            }

          }
        });
      }
      else {
        element.divider = true
      }
    }
    if (element.name == "Analytics") {
      if (this.analyticsPermission) {
        element.divider = false
        element.children.forEach(element => {
          if (element.url == '/analytics/key-questions') {
            if (this.global.rolePermissions.analytics.keyQuestion.isView == false && this.global.rolePermissions.analytics.keyQuestion.isViewEdit == false) {
              element.divider = true            // true means not shown ,false means shown(initially false in nav.ts)
            }
          }
          else if (element.url == '/analytics/my-reports') {
            let isActive = typeof (this.global.rolePermissions.analytics.myReports) == 'undefined' ? false : this.global.rolePermissions.analytics.myReports.isViewEdit;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/analytics/public-reports') {
            let isActive = typeof (this.global.rolePermissions.analytics.publicReports) == 'undefined' ? false : (this.global.rolePermissions.analytics.publicReports.isView == false && this.global.rolePermissions.analytics.publicReports.isViewEdit == false) ? false : true;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/analytics/schedule-delivery') {
            let isActive = typeof (this.global.rolePermissions.analytics.scheduleDelivery) == 'undefined' ? false : (this.global.rolePermissions.analytics.scheduleDelivery.isView == false && this.global.rolePermissions.analytics.scheduleDelivery.isViewEdit == false) ? false : true;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/analytics/schedule-import') {
            let isActive = typeof (this.global.rolePermissions.analytics.scheduleImport) == 'undefined' ? false : (this.global.rolePermissions.analytics.scheduleImport.isView == false && this.global.rolePermissions.analytics.scheduleImport.isViewEdit == false) ? false : true;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/analytics/shared-dashboards') {
            if (this.global.rolePermissions.analytics.sharedDashboard.isViewEdit == false) {
              element.divider = true
            }
          }
          else if (element.url == '/analytics/custom-reports') {
            if (this.global.rolePermissions.analytics.customReports.isViewEdit == false && this.global.rolePermissions.analytics.customReports.isView == false) {
              element.divider = true
            }
          }
          else if (element.url == '/analytics/subscriptions') {
            if (this.global.rolePermissions.analytics.subscription.isViewEdit == false) {
              element.divider = true
            }
          }
          else if (element.url == '/analytics/shared-subscriptions') {
            let isActive = typeof (this.global.rolePermissions.analytics.sharedSubscriptions) == 'undefined' ? false : (this.global.rolePermissions.analytics.sharedSubscriptions.isView == false && this.global.rolePermissions.analytics.sharedSubscriptions.isViewEdit == false) ? false : true;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/analytics/contact-subscriptions') {
            let isActive = typeof (this.global.rolePermissions.analytics.contactSubscriptions) == 'undefined' ? false : (this.global.rolePermissions.analytics.contactSubscriptions.isViewEdit == false) ? false : true;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/analytics/help') {
            if (this.global.rolePermissions.analytics.help.isView == false) {
              element.divider = true
            }
          }
        });
      }
      else {
        element.divider = true
      }
    }
    if (element.name == "Evaluation") {
      if (this.evaluationPermission) {
        element.divider = false
        element.children.forEach(element => {
          // if (element.url == '/evaluations/evaluation-workspace') {
          //   if (this.global.rolePermissions.evaluate.evaluationWorkspace.isView == false && this.global.rolePermissions.evaluate.evaluationWorkspace.isViewEdit == false) {
          //     element.divider = true            // true means not shown ,false means shown(initially false in nav.ts)
          //   }
          // }
          if (element.url == '/evaluations/evaluation-workspace-nacd') {
            let isActive = typeof (this.global.rolePermissions.evaluate.evaluationWorkspaceNacd) == 'undefined' ? false : (this.global.rolePermissions.evaluate.evaluationWorkspaceNacd.isView == false && this.global.rolePermissions.evaluate.evaluationWorkspaceNacd.isViewEdit == false) ? false : true;
            if (!isActive) {
              element.divider = true;
            }
          }
          else if (element.url == '/evaluations/coaching-workspace') {
            let isActive = typeof (this.global.rolePermissions.evaluate.coachingWorkspace) == 'undefined' ? false : (this.global.rolePermissions.evaluate.coachingWorkspace.isView == false && this.global.rolePermissions.evaluate.coachingWorkspace.isViewEdit == false) ? false : true;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/evaluations/manage-dispute') {
            let isActive = typeof (this.global.rolePermissions.evaluate.manageDispute) == 'undefined' ? false : (this.global.rolePermissions.evaluate.manageDispute.isView == false && this.global.rolePermissions.evaluate.manageDispute.isViewEdit == false) ? false : true;
            if (UserData.role.toLowerCase() == 'admin' || subIdArr.length > 0) {
              if (!isActive) {
                element.divider = true
              }
              else {
                element.divider = false;
              }
            }
            else {
              element.divider = true
            }

          }
          else if (element.url == '/evaluations/evaluation-forms') {
            if (this.global.rolePermissions.evaluate.evaluationFroms.isView == false && this.global.rolePermissions.evaluate.evaluationFroms.isViewEdit == false) {
              element.divider = true
            }
          }
          else if (element.url == '/evaluations/my-evaluation') {
            let isActive = typeof (this.global.rolePermissions.evaluate.myEvaluation) == 'undefined' ? false : this.global.rolePermissions.evaluate.myEvaluation.isView;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/evaluations/my-teams-evaluation') {
            let isActive = typeof (this.global.rolePermissions.evaluate.myTeamEvaluation) == 'undefined' ? false : this.global.rolePermissions.evaluate.myTeamEvaluation.isView;
            if (this.validatePlatformId == 2 || this.validatePlatformId== 9) {
              if (!isActive) {
                element.divider = true
              }
              else {
                element.divider = false;
              }
            }
            else {
              element.divider = true
            }

          }
          else if (element.url == '/evaluations/my-coaching-sessions') {
            let isActive = typeof (this.global.rolePermissions.evaluate.myCoachingSessions) == 'undefined' ? false : this.global.rolePermissions.evaluate.myCoachingSessions.isView;
            if (!isActive) {
              element.divider = true
            }
          }
          // else if (element.url == '/evaluations/interactions') {
          //   if (this.global.rolePermissions.evaluate.interactions.isView == false) {
          //     element.divider = true
          //   }
          // }
          else if (element.url == '/evaluations/new-interactions') {
            let isActive = typeof (this.global.rolePermissions.evaluate.newInteractions) == 'undefined' ? false : this.global.rolePermissions.evaluate.newInteractions.isView;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/evaluations/ai_ml-scoring') {
            let isActive = typeof (this.global.rolePermissions.evaluate.ai_ml_Scoring) == 'undefined' ? false : (this.global.rolePermissions.evaluate.ai_ml_Scoring.isView == false && this.global.rolePermissions.evaluate.ai_ml_Scoring.isViewEdit == false) ? false : true;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/evaluations/help') {
            if (this.global.rolePermissions.evaluate.help.isView == false) {
              element.divider = true
            }
          }
        });
      }
      else {
        element.divider = true
      }
    }
    if (element.name == "Playbooks") {
      if (this.playbooksPermission) {
        element.divider = false
        element.children.forEach(element => {
          if (element.url == '/playbooks/my-playbooks' && element.name != 'Playbook Builder ™') {
            if (this.global.rolePermissions.playbooks.myPlaybooks.isView == false && this.global.rolePermissions.playbooks.myPlaybooks.isViewEdit == false) {
              element.divider = true            // true means not shown ,false means shown(initially false in nav.ts)
            }
          }
          else if (element.url == '/playbooks/topics') {
            if (this.global.rolePermissions.playbooks.topics.isView == false && this.global.rolePermissions.playbooks.topics.isViewEdit == false) {
              element.divider = true
            }
          }
          else if (element.url == '/playbooks/moments') {
            let isActive = typeof (this.global.rolePermissions.playbooks.moments) == 'undefined' ? false : (this.global.rolePermissions.playbooks.moments.isView == false && this.global.rolePermissions.playbooks.moments.isViewEdit == false) ? false : true;
            if (this.isEnableMoment == true) {
              if (!isActive) {
                element.divider = true
              }
              else {
                element.divider = false;
              }
            }
            else {
              element.divider = true
            }
          }
          else if (element.url == '/playbooks/themes') {
            if (this.global.rolePermissions.playbooks.themes.isView == false && this.global.rolePermissions.playbooks.themes.isViewEdit == false) {
              element.divider = true
            }
          }
          else if (element.url == '/playbooks/actions') {
            if (this.global.rolePermissions.playbooks.actions.isView == false && this.global.rolePermissions.playbooks.actions.isViewEdit == false) {
              element.divider = true
            }
          }
          else if (element.url == '/playbooks/phrase-recommmendation') {
            let isActive = typeof (this.global.rolePermissions.playbooks.phraseRecommendation) == 'undefined' ? false : (this.global.rolePermissions.playbooks.phraseRecommendation.isView == false && this.global.rolePermissions.playbooks.phraseRecommendation.isViewEdit == false) ? false : true;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/playbooks/redactions') {
            if (this.global.rolePermissions.playbooks.redactions.isView == false && this.global.rolePermissions.playbooks.redactions.isViewEdit == false) {
              element.divider = true
            }
          }
          else if (element.url == '/playbooks/custom-phrases') {
            if (this.global.rolePermissions.playbooks.customPhrases.isView == false && this.global.rolePermissions.playbooks.customPhrases.isViewEdit == false) {
              element.divider = true
            }
          }
          else if (element.url == '/playbooks/help') {
            if (this.global.rolePermissions.playbooks.help.isView == false) {
              element.divider = true
            }
          }
        });
      }
      else {
        element.divider = true
      }
    }
    if (element.name == "Settings") {
      if (this.settingsPermission) {
        element.divider = false
        element.children.forEach(element => {
          // if (element.url == '/settings/profile') {
          //   if (this.global.rolePermissions.settings.profile.isView == false && this.global.rolePermissions.settings.profile.isChangePwd == false) {
          //     element.divider = true            // true means not shown ,false means shown(initially false in nav.ts)
          //   }
          // }
           if (element.url == '/settings/preferences') {
            if (this.global.rolePermissions.settings.preferences.isView == false && this.global.rolePermissions.settings.preferences.isViewEdit == false) {
              element.divider = true
            }
          }
          else if (element.url == '/settings/partitions') {
            let isActive = typeof (this.global.rolePermissions.settings.dataPartition) == 'undefined' ? false : (this.global.rolePermissions.settings.dataPartition.isView == false && this.global.rolePermissions.settings.dataPartition.isViewEdit == false) ? false : true;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/settings/roles') {
            if (this.global.rolePermissions.settings.roles.isView == false && this.global.rolePermissions.settings.roles.isViewEdit == false) {
              element.divider = true
            }
          }
          else if (element.url == '/settings/users') {
            if (this.global.rolePermissions.settings.users.isView == false && this.global.rolePermissions.settings.users.isViewEdit == false) {
              element.divider = true
            }
          }
          else if (element.url == '/settings/platform-setting') {
            if (this.global.rolePermissions.settings.platformSettings.isView == false && this.global.rolePermissions.settings.platformSettings.isViewEdit == false) {
              element.divider = true
            }
          }
          else if (element.url == '/settings/topic-detection') {
            if (this.global.rolePermissions.settings.topicDetection.isView == false && this.global.rolePermissions.settings.topicDetection.isViewEdit == false) {
              element.divider = true
            }
          }
        });
      }
      else {
        element.divider = true
      }
    }
    if (element.name == "Agents") {
      if (this.agentsPermission) {
        element.divider = false
        element.children.forEach(element => {
          if (element.url == '/agents/disposition-coding') {
            let isActive = typeof (this.global.rolePermissions.agents.dispositionCoding) == 'undefined' ? false : (this.global.rolePermissions.agents.dispositionCoding.isView == false && this.global.rolePermissions.agents.dispositionCoding.isViewEdit == false) ? false : true;
            if (!isActive) {
              element.divider = true
            }
          }

          else if (element.url == '/agents/my-performance') {
            let isActive = typeof (this.global.rolePermissions.agents.myPerformance) == 'undefined' ? false : this.global.rolePermissions.agents.myPerformance.isView;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/agents/my-evaluations') {
            let isActive = typeof (this.global.rolePermissions.agents.myEvaluations) == 'undefined' ? false : this.global.rolePermissions.agents.myEvaluations.isView;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/agents/my-schedule') {
            let isActive = typeof (this.global.rolePermissions.agents.mySchedule) == 'undefined' ? false : this.global.rolePermissions.agents.mySchedule.isView;
            if (!isActive) {
              element.divider = true
            }
          }
        });
      }
      else {
        element.divider = true
      }
    }
    if (element.name == "Workᴮᵉᵗᵃ") {
      if (this.workPermission) {
        element.divider = false
        element.children.forEach(element => {
          if (element.url == '/wfm/service_levels/list') {
            let isActive = typeof (this.global.rolePermissions.work.serviceQuality) == undefined ? false : (this.global.rolePermissions.work.serviceQuality.isView == false && this.global.rolePermissions.work.serviceQuality.isViewEdit == false) ? false : true;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/wfm/forecast/list') {
            let isActive = typeof (this.global.rolePermissions.work.forecasting) == undefined ? false : (this.global.rolePermissions.work.forecasting.isView == false && this.global.rolePermissions.work.forecasting.isViewEdit == false) ? false : true;
            if (!isActive) {
              element.divider = true
            }
          }
          else if (element.url == '/wfm/schedule/workgroup/list' || element.url == '/wfm/schedule/agents/list' || element.url == '/wfm/schedule/tasks/list' || element.url == '/wfm/schedule/workgroup_rules/list' || element.url == '/wfm/schedule/workplan/list') {
            let isActive = typeof (this.global.rolePermissions.work.schedule) == undefined ? false : (this.global.rolePermissions.work.schedule.isView == false && this.global.rolePermissions.work.schedule.isViewEdit == false) ? false : true;
            if (!isActive) {
              element.divider = true
            }
          }
        });
      }
      else {
        element.divider = true
      }
    }
  }

  isEnableMoment: Boolean = false;
  validatePlatformId: any = 0
  getplatformValidate() {
    this.preferenceService.getPreference().subscribe(
      (data: any) => {
        this.preferenceService.getPlatformDetail.next(data);
        this.preferenceService.getPlatformDetail.complete();
        this.validatePlatformId = data.platformId;
        this.global.currentPlatformID = data.platformId;

        this.isEnableMoment = (data.isCallTranscription_V2 != undefined) ? data.isCallTranscription_V2 : false;
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      })
  }

  subIdarr: any = []
  getModeratorID() {
    let subId = UserData.user_Sub_Id;
    this.subIdarr = [];
    return new Promise((resolve, reject) => {
      this.evaluationservice.getEvaluation().subscribe(
        (data: any) => {
          if (data.length > 0 && data != 'No evaluation form for this user') {
            this.evaluationservice.getModerator.next(data)
            this.evaluationservice.getModerator.complete();
            data.forEach(element => {
              if (element.userModerator != undefined && element.userModerator.length > 0) {
                let filterObj = element.userModerator.filter(s => s == subId);
                if (filterObj.length > 0) {
                  this.subIdarr.push(filterObj[0])
                }
              }
            });
          }
          resolve(data);
        },
        (error) => {
          console.log(error.error);
          reject(error);
          this.getplatformValidate();
          if(error.error == 'No evaluation form for this user'){
            this.getplatformValidate();
          }
          this.spinnerService.hide();
        }
      )
    })
  }

  activeTabIndex: number = 0;
  tabViewChange(event) {
    this.activeTabIndex = event.index
    if (this.profileComponentChild != undefined && this.profileComponentChild.onChangeText != undefined) {
      if (!this.profileComponentChild.onChangeText) {
        if (this.activeTabIndex == 1) {
          this.profileComponentChild.onChangeText = true
          this.updatePass.reset();
          this.messageService.add({ key: 'tc', severity: 'info', summary: "Changes cannot be present while switching the tab.Please save the changes from current tab" });
          this.profileComponentChild.getDropDownList("header");
        }
        if (this.activeTabIndex == 0) {
          this.updatePass.reset();
          this.profileComponentChild.onChangeText = true
        }
      }
      if ((this.updatePass.value.oldPass != '' && this.updatePass.value.oldPass != null) || (this.updatePass.value.newPass != '' && this.updatePass.value.newPass != null) || (this.updatePass.value.confirmPass != '' && this.updatePass.value.confirmPass != null)) {
        this.updatePass.reset();
        this.messageService.add({ key: 'tc', severity: 'info', summary: "Changes cannot be present while switching the tab.Please save the changes from current tab" });

      }
      if (this.activeTabIndex == 1) {
        // this.updatePasswordForm();
        this.updatePass.reset();
        this.submittedPassword = false;
        this.passwordMatch = false;
        this.profileComponentChild.onChangeText = true;
      }
    }
  }
}
