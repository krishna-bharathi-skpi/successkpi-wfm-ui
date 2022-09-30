import { Component } from '@angular/core';
import {
  navItemsEvaluation, navItemsEvaluationSpanish, navItemsEvaluationPortuguese, navItemsEvaluationFrench, navItemsEvaluationJapanese,
  navItemsEvaluationDutch, navItemsEvaluationGerman, navItemsEvaluationItalian, navItemsEvaluationKorean, navItemsEvaluationPolish, navTop
} from '../../../_nav';
import { GlobalComponent } from '../../../global/global.component';
import { type } from 'os';
import { PreferenceService } from '../../../views/settings/successkpi-setting/successkpi-setting.service';
import UserData from '../../../user';
import { EvaluationFormsService } from '../../../views/evaluations/evaluation-forms/evaluation-forms.service';
import { Router } from '@angular/router';
import { HeaderLayoutComponent } from '../../header/header.component';

@Component({
  selector: 'app-sidebar-evaluate',
  templateUrl: './evaluate.component.html'
})
export class EvaluateLayoutComponent {
  public sidebarMinimized = false;
  public navItems = [];

  constructor(public global: GlobalComponent, private preferenceService: PreferenceService, private evaluationService: EvaluationFormsService, private router: Router, private header: HeaderLayoutComponent) {
    // this.getAppComponent();  

    if (UserData.role.toLowerCase() != 'admin') {
      this.getModeratorID().then(res => {
        this.getplatformValidate();
      });
    }
    else {
      this.getplatformValidate();
      this.topNavigation();
    }
  }
  ngOnInit() {
    let language = localStorage.getItem("language")
    if (language === "english") {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsEvaluation)
    }
    else if (language === "portuguese") {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsEvaluationPortuguese)
    }
    else if (language === 'spanish') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsEvaluationSpanish)
    }
    else if (language === 'french') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsEvaluationFrench)
    }
    else if (language === 'japanese') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsEvaluationJapanese)
    }
    else if (language === 'dutch') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsEvaluationDutch)
    }
    else if (language === 'german') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsEvaluationGerman)
    }
    else if (language === 'italian') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsEvaluationItalian)
    }
    else if (language === 'korean') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsEvaluationKorean)
    }
    else if (language === 'polish') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsEvaluationPolish)
    }

    this.topNavigation();
  }

   //It Validate the sideBar restriction depdends upon roles and permission
  sideNavRestriction(val) {
    val.forEach((element, index) => {
      const loop = element.children && element.children != undefined ? element.children : null;
      if (loop == null) {
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
          if (UserData.role.toLowerCase() == 'admin' || this.subIdarr.length > 0) {
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
          if (this.global.currentPlatformID == 2 || this.global.currentPlatformID == 9) {
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
      } else {
        this.header.restrictMenuMobileDevice(element,this.subIdarr);

      }
    });

    return val
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  validatePlatformId: any = 0;
  getplatformValidate() {
    this.preferenceService.getPlatformDetail.subscribe(
      (data: any) => {
        // console.log(data)
        this.validatePlatformId = data.platformId;
        this.global.currentPlatformID = data.platformId;
        // this.sideNavRestriction(navItemsEvaluation)
        let language = localStorage.getItem("language")
        if (language === "english") {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsEvaluation)
        }
        else if (language === "portuguese") {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop): this.navItems = this.sideNavRestriction(navItemsEvaluationPortuguese)
        }
        else if (language === 'spanish') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop): this.navItems = this.sideNavRestriction(navItemsEvaluationSpanish)
        }
        else if (language === 'french') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop): this.navItems = this.sideNavRestriction(navItemsEvaluationFrench)
        }
        else if (language === 'japanese') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop): this.navItems = this.sideNavRestriction(navItemsEvaluationJapanese)
        }
        else if (language === 'dutch') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop): this.navItems = this.sideNavRestriction(navItemsEvaluationDutch)
        }
        else if (language === 'german') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop): this.navItems = this.sideNavRestriction(navItemsEvaluationGerman)
        }
        else if (language === 'italian') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop): this.navItems = this.sideNavRestriction(navItemsEvaluationItalian)
        }
        else if (language === 'korean') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop): this.navItems = this.sideNavRestriction(navItemsEvaluationKorean)
        }
        else if (language === 'polish') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop): this.navItems = this.sideNavRestriction(navItemsEvaluationPolish)
        }
      }
    ),
      (error) => {
        console.log(error)
      }
  }

  subIdarr: any = [];
  getModeratorID() {
    let subId = UserData.user_Sub_Id;
    this.subIdarr = [];
    return new Promise((resolve, reject) => {
      this.evaluationService.getModerator.subscribe(
        (data: any) => {
          // console.log(data);
          data.forEach(element => {
            if (element.userModerator != undefined && element.userModerator.length > 0) {
              let filterObj = element.userModerator.filter(s => s == subId);
              if (filterObj.length > 0) {
                // console.log(filterObj)
                this.subIdarr.push(filterObj[0])
              }
            }
          });
          // console.log(this.subIdarr)
          resolve(data);
        },
        (error) => {
          console.log(error.error);
          reject(error);
          if(error.error == 'No evaluation form for this user'){
            this.getplatformValidate();
          }
        }
      )
    })
  }
    //It reload the page when clicking the sidemenu 
  reloadComponent(event) {
    if ((window.matchMedia("(min-width: 992px)").matches)) {
      if (event.defaultPrevented) {
        const currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
      }
      return
    }
  }
  //It dynamically loads the sidemenu (Mobile,Tablet)
  topNavigation() {
    const NavTop = () => {
      this.navItems = navTop
      this.sideNavRestriction(this.navItems);
    }
    const NavWidth = () => {
      this.navItems = navItemsEvaluation
      this.sideNavRestriction(this.navItems);
    }

    (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsEvaluation);

    window.addEventListener("resize", function () {
      if (window.matchMedia("(max-width: 991px)").matches) {
        NavTop();
      } else {
        NavWidth();
      }
    })
  }

  ngOnDestroy() {
    this.router.onSameUrlNavigation = 'ignore';
  }
}
