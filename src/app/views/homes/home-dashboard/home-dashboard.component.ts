import { Component, OnInit } from '@angular/core';
import { KeyQuestionsService } from '../../analyze/key-questions/key-questions.service';
import utils from '../../../config';
import { CommonMethods } from '../../../common/common.components';
import { UserData } from '../../../../app/user';
import { LoginService } from '../../login/login.service';
import { GlobalComponent } from '../../../global/global.component';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {
  overViewModel = { overView: null }
  documentID: string = null;
  mstrIdToken: any;
  idToken: any;

  constructor(private keyQuestionsService: KeyQuestionsService, private commonMethods: CommonMethods,
    public global: GlobalComponent, public loginService: LoginService) {
    this.getOverviwDashboard();
  }

  ngOnInit() {
    // this.roleList();
  }

  getOverviwDashboard() {
    let systemSetingData: any;
    let rolehomeID:any;
    this.getsystemSettings().then((resdata) => {
      systemSetingData = resdata;
      return this.roleList();
    }).then((roles:any) =>{
      rolehomeID = roles

      return this.getHomeDashboard()
    
    }).then((resTiles: any) => {
      // this.mstrIdToken = localStorage.getItem("mstrIdToken");
      // this.mstrIdToken = JSON.parse(this.mstrIdToken)
      // this.idToken = "?idToken=" + this.mstrIdToken['x-mstr-identitytoken'];
      if(rolehomeID.isHomedashboard === 'role' ){
        this.documentID = rolehomeID.homeDashboardId;
      } 
      else if (systemSetingData.dashboardId != null && typeof (systemSetingData['dashboardId']) != "undefined") {
        this.documentID = systemSetingData.dashboardId;
      }
      else {
        this.documentID = resTiles.OverView.documentID;
      }
      // this.overViewModel.overView = environment.mstr_Url + resTiles.project_id + "/" + this.documentID + this.idToken + '&ui.navigation=false';
        this.overViewModel.overView = resTiles.Mstr_MyEvaluation;
        this.overViewModel.overView = this.overViewModel.overView.replace("{{documentID}}", this.documentID);
        // this.overViewModel.overView = this.overViewModel.overView + '&hiddensections=' + this.global.hiddenSections;
        this.overViewModel.overView = this.overViewModel.overView + '&usrSmgr=' + localStorage.getItem('_mstrweb');
        this.overViewModel.overView = this.overViewModel.overView + '&share=1';
    })
  }

  getsystemSettings() {
    
    return new Promise((resolve, reject) => {
      this.keyQuestionsService.getsystemSettings().subscribe((ssData: any) => {
        resolve(ssData);
      }, (error) => {
        reject(error)
      })
    })

  }

  getHomeDashboard() {
    
    return new Promise((resolve, reject) => {
      this.keyQuestionsService.getMstrConfig().subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error)
      });
    })
  }
  
  localRole:any;
  roleList(){
    return new Promise((resolve, reject) => {
    this.localRole = UserData.role
    this.loginService.getroles(this.localRole).subscribe(
      (data: any)=>{
        resolve(data);
      },
      (error) => {
        reject(error);
    });
  })
 }
}
