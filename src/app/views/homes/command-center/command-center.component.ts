import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethods } from '../../../common/common.components';
import { UserData } from '../../../user'
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
import { LoginService } from '../../login/login.service';
import { RolesService } from '../../settings/roles/roles.service';
import { utils } from "../../../config";
import { environment } from '../../../../environments/environment';
import { forkJoin } from 'rxjs';
import { MstrTokenService } from '../../../services/mstrtoken.service';

@Component({
  selector: 'app-command-center',
  templateUrl: './command-center.component.html',
  styleUrls: ['./command-center.component.css']
})
export class CommandCenterComponent implements OnInit {
  mstrIdToken: any;
  idToken: any;
  constructor( private router: Router,private commonMethods: CommonMethods,private loginService: LoginService,
    private roleService: RolesService,private spinnerService: NgxSpinnerService,public keyQuestionService: KeyQuestionsService,
    private mstrTokenService: MstrTokenService) {
    // this.getAppLink();
    // this.getTopAppsConfig();
    // this.getTopReportConfig();
    this.commonMethods.dynamicBackgroundColorChange('default');
    this.spinnerService.show();
   }

  ngOnInit(): void {
    this.getTopApps();
    this.mstrIdToken = localStorage.getItem("mstrIdToken")
    this.mstrIdToken = JSON.parse(this.mstrIdToken)

    this.idToken = "?idToken=" + this.mstrIdToken['x-mstr-identitytoken'];
  }
  
  localRole: any;
  roleData:any;
  roleslist() {
    this.localRole = UserData.role;
    this.loginService.getroles(this.localRole).subscribe(
      (data: any) => {
        if (typeof (data) == "string") {
          this.roleData = JSON.parse(data);
          setTimeout(() => {
            this.pageShowList(this.roleData)
          }, 700);
          
        }
        if (typeof (data) == "object") {
          this.roleData = data;
          setTimeout(() => {
            this.pageShowList(this.roleData)
          }, 700);
         
        }
        
      }, (error) => {
        this.spinnerService.hide();
        console.log('error', error);
      }
    )
  }

  topAppsArr:any = [];
  configApp = [];
  // getTopAppsConfig(){
  //   this.roleService.defaultTopApps().subscribe(
  //     (data:any)=>{
  //       if(data.length > 0){
  //         this.configApp = data;
  //       }
  //       else{
  //         let arr = []
  //         this.configApp = arr
  //       }
        
  //     }, 
  //     (error) => {
  //       this.spinnerService.hide();
  //       console.log('error', error);
  //     }
  //   )
  // }
  
  appLinkArr=[]
  // getAppLink(){
  //   this.roleService.getAppLink().subscribe(
  //     (data:any)=>{
  //       // console.log(data)
  //       this.appLinkArr = data
  //     }, 
  //     (error) => {
  //       this.spinnerService.hide();
  //       console.log('error', error);
  //     }
  //   )
  // }

  topReportsArr:any = [];
  tempReportArr:any=[];
  projectID:any;
  // getTopReportConfig(){
  //   this.keyQuestionService.getMstrConfig().subscribe(
  //     (data:any)=>{
  //       this.tempReportArr = data.topReports != undefined ? data.topReports : [];
  //       this.projectID = data.project_id;
  //       this.roleslist();
  //     }, 
  //     (error) => {
  //       this.spinnerService.hide();
  //       console.log('error', error);
  //     }
  //   )
  // }
  IsActive:string = "mainPage";
  IframeURL:string = "";
  
  async showIframe(reportID){
    // console.log(reportID)
    if(reportID != null || reportID != ""){
      this.IsActive = "reportPage";
      // this.IframeURL = environment.mstr_Url +  this.projectID + "/" + reportID + this.idToken + '&ui.navigation=false';
      await this.getTopReports(reportID);
    }
    if(reportID == null || reportID == ""){
      this.IsActive = "mainPage";
      this.commonMethods.addToastforlongtime(false, 'Report handle is not configured for this report')
    }
  }
  
  emptyLabel:boolean = false;
  pageShowList(data){
    this.spinnerService.show();
    if(data.roleId.toLowerCase() == 'admin'){
          this.topReportsArr = [];
          this.topAppsArr = [];
          if(this.configApp.length > 0){
            this.configApp.forEach(element => {
              if(element.appName == "" || element.appObj == "" || element.appName == null){
                let params = {
                  appName: "",
                  appObj: "",
                  appURL: ""
                }
                this.topAppsArr.push(params)
                // console.log(this.topAppsArr)
              }
              this.appLinkArr.forEach(items => {
                if(element.appObj != 'Help'){
                  if(items.label == element.appObj){
                    let params = {
                      appName: element.appName,
                      appObj: element.appObj,
                      appURL: items.value
                    }
                    this.topAppsArr.push(params)
                    //  console.log(this.topAppsArr)
                  }
                }
                else{
                  if(element.appName.toLowerCase() == items.value.split('/')[1].toLowerCase()){
                    if(items.value.split('/')[2].toLowerCase() == element.appObj.toLowerCase() ){
                      let params = {
                     appName: element.appName,
                     appObj: element.appObj,
                     appURL: items.value
                   }
                   this.topAppsArr.push(params)
                    }
                 }
             }
              });
            });
            const removeObj = this.topAppsArr.filter(e => e.appURL != '/settings/genesys-users')
            this.topAppsArr = removeObj;
          }
          else{
            this.topAppsArr = [];
            this.spinnerService.hide();
          }
          if(this.tempReportArr.length > 0){
            this.topReportsArr = this.tempReportArr
          }
          else{
            this.topReportsArr = [];
            this.spinnerService.hide();
          }
          
          this.spinnerService.hide();
    }
    if(data.roleId.toLowerCase() != 'admin'){
        if(data.topReports != undefined && data.topApps != undefined){
          this.topReportsArr = [];
          this.topAppsArr = [];

          this.topReportsArr = data.topReports;
          
            if(data.topApps.length > 0){
            let appArr = data.topApps;
          appArr.forEach(element => {
            if(element.appName == "" || element.appObj == "" || element.appName == null){
              let params = {
                appName: "",
                appObj: "",
                appURL: ""
              }
              this.topAppsArr.push(params)
              // console.log(this.topAppsArr)
            }
            this.appLinkArr.forEach(items => {
              if(element.appObj != 'Help'){
                if(items.label == element.appObj){
                   let params = {
                     appName: element.appName,
                     appObj: element.appObj,
                     appURL: items.value
                   }
                    this.topAppsArr.push(params)
                }
              }
              else{
                   if(element.appName.toLowerCase() == items.value.split('/')[1].toLowerCase()){
                     if(items.value.split('/')[2].toLowerCase() == element.appObj.toLowerCase() ){
                       let params = {
                      appName: element.appName,
                      appObj: element.appObj,
                      appURL: items.value
                    }
                    this.topAppsArr.push(params)
                     }
                  }
              }
            });
          });
          const removeObj = this.topAppsArr.filter(e => e.appURL != '/settings/genesys-users')
         this.topAppsArr = removeObj;
          this.spinnerService.hide();

         }
        }

        if(data.topReports == undefined && data.topApps == undefined){
          this.emptyLabel = true;
          this.spinnerService.hide();
        }
    }
    else{
        this.spinnerService.hide();
    }
    
  }

getTopApps() {
    const appLink = this.roleService.getAppLink();
    const topApps = this.roleService.defaultTopApps();
    const getMstr = this.keyQuestionService.getMstrConfig();
    forkJoin([appLink, topApps,getMstr ]).subscribe(
      (data: any) => {
          this.appLinkArr = data[0];
          this.configApp = data[1].length > 0 ? data[1] : [];
          this.tempReportArr = data[2].topReports != undefined ? data[2].topReports : [];
          this.projectID = data[2].project_id;
          this.roleslist();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    )
  }

  getEvent(item){
    if(item == ""){
      return 'disableLI'
    }
  }
  
  // getcursor(item){
  //   if(item == ""){
  //     return 'not-allowed'
  //   }
  // }

  myTopReports: string = null;
  getTopReports(reportID) {
    this.spinnerService.show();
    this.getMstrConfig().then((configId: any) => {
      this.validateMstrReportId(configId.project_id, reportID).then((validId: any) => {
          this.spinnerService.hide();
          if(Object.keys(configId).length){
         let userName = UserData.userName;
         this.myTopReports = configId.Mstr_MyEvaluation;
                this.myTopReports = this.myTopReports.replace("{{documentID}}", reportID);
                // this.myTopReports = this.myTopReports + '&hiddensections=' + this.global.hiddenSections
                this.myTopReports = this.myTopReports + '&usrSmgr=' + localStorage.getItem('_mstrweb')
                // this.myTopReports = this.myTopReports + '&valuePromptAnswers=' + userName
                this.myTopReports = this.myTopReports + '&share=1'

                // this.IframeURL = environment.mstr_Url +  this.projectID + "/" + reportID + this.idToken + '&ui.navigation=false';
                this.IframeURL = this.myTopReports;
          }
          else{
          this.spinnerService.hide();
          this.commonMethods.addToastforlongtime(false, 'No Reports Found');
          }
      })
    })
  }

  
  getMstrConfig() {
    return new Promise((resolve, reject) => {
      this.keyQuestionService.getMstrConfig().subscribe(
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

  validateMstrReportId(projectID,documentID) {
    this.spinnerService.show();
    let params = {
      dossierId: documentID,
      reportType: "55",
      AuthToken: JSON.parse(localStorage.getItem('mstrAuthToken')),
      projectId: projectID
    }
    return new Promise((resolve, reject) => {
       this.keyQuestionService.validateMstrReportId(params).subscribe(
         (data: any) => {
          this.spinnerService.hide();
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
           this.spinnerService.hide();
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
