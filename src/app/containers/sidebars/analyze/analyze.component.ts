import { Component } from '@angular/core';
import {
  navItemsAnalytics, navItemsAnalyticsSpanish, navItemsAnalyticsPortuguese, navItemsAnalyticsFrench, navItemsAnalyticsJapanese,
  navItemsAnalyticsDutch, navItemsAnalyticsGerman, navItemsAnalyticsItalian, navItemsAnalyticsKorean, navItemsAnalyticsPolish, navTop
} from '../../../_nav';
import { Router } from '@angular/router';
import { KeyQuestionsService } from '../../../views/analyze/key-questions/key-questions.service';
import { GlobalComponent } from '../../../global/global.component';
import { LoginService } from '../../../views/login/login.service'
import { PreferenceService } from '../../../views/settings/successkpi-setting/successkpi-setting.service';
import { HeaderLayoutComponent } from '../../header/header.component';

@Component({
  selector: 'app-sidebar-analyze',
  templateUrl: './analyze.component.html'
})
export class AnalyzeLayoutComponent {
  public sidebarMinimized = false;
  public navItems = [];
  constructor(private router: Router, private keyQuestionService: KeyQuestionsService, public global: GlobalComponent, private loginService: LoginService, private preferenceService: PreferenceService, private header: HeaderLayoutComponent) {
    this.topNavigation();
   // this.getplatformValidate();

  }
  ngOnInit() {

    let language = localStorage.getItem("language")
    if (language === "english") {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalytics)
    }
    else if (language === "portuguese") {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsPortuguese)
    }
    else if (language === 'spanish') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsSpanish)
    }
    else if (language === 'french') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsFrench)
    }
    else if (language === 'japanese') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsJapanese)
    }
    else if (language === 'dutch') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsDutch)
    }
    else if (language === 'german') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsDutch)
    }
    else if (language === 'italian') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsItalian)
    }
    else if (language === 'korean') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsKorean)
    }
    else if (language === 'polish') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsPolish)
    }

  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;

  }
 //It Validate the sideBar restriction depdends upon roles and permission
  sideNavRestriction(val) {
    val.forEach((element, index) => {
      const loop = element.children && element.children != undefined ? element.children : null;
      if (loop == null) {
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
        // else if (element.name == "Realtime Reports (Beta)") {
        //   // console.log(element)
        //   if (this.global.rolePermissions.analytics.realtimeReport != undefined) {
        //     if (this.reportValidateGenesys == 2 && this.isRealTime == true) {
        //       if (this.global.rolePermissions.analytics.realtimeReport.isQueueStatsView == false && this.global.rolePermissions.analytics.realtimeReport.isQueueStatusView == false && this.global.rolePermissions.analytics.realtimeReport.isAgentStatsView == false && this.global.rolePermissions.analytics.realtimeReport.isAgentStatusView == false) {
        //         element.divider = true;
        //       }
        //       else {
        //         element.divider = false;
        //       }
        //     }
        //     else {
        //       element.divider = true;
        //     }
        //   }
        //   else {
        //     element.divider = true
        //   }
        // }
        // else if (element.url == '/analytics/queue-stats') {
        //   let isActive = typeof (this.global.rolePermissions.analytics.realtimeReport) == 'undefined' ? false : this.global.rolePermissions.analytics.realtimeReport.isQueueStatsView;
        //   if (this.reportValidateGenesys == 2 && this.isRealTime == true) {
        //     if (!isActive) {
        //       element.divider = true
        //     }
        //     else {
        //       element.divider = false;
        //     }
        //   }
        //   else {
        //     element.divider = true;
        //   }
        // }
        // else if (element.url == '/analytics/queue-status') {
        //   let isActive = typeof (this.global.rolePermissions.analytics.realtimeReport) == 'undefined' ? false : this.global.rolePermissions.analytics.realtimeReport.isQueueStatusView;
        //   if (this.reportValidateGenesys == 2 && this.isRealTime == true) {
        //     if (!isActive) {
        //       element.divider = true
        //     }
        //     else {
        //       element.divider = false;
        //     }
        //   }
        //   else {
        //     element.divider = true;
        //   }
        // }
        // else if (element.url == '/analytics/agent-stats') {
        //   let isActive = typeof (this.global.rolePermissions.analytics.realtimeReport) == 'undefined' ? false : this.global.rolePermissions.analytics.realtimeReport.isAgentStatsView;
        //   if (this.reportValidateGenesys == 2 && this.isRealTime == true) {
        //     if (!isActive) {
        //       element.divider = true
        //     }
        //     else {
        //       element.divider = false;
        //     }
        //   }
        //   else {
        //     element.divider = true;
        //   }
        // }
        // else if (element.url == '/analytics/agent-status') {
        //   let isActive = typeof (this.global.rolePermissions.analytics.realtimeReport) == 'undefined' ? false : this.global.rolePermissions.analytics.realtimeReport.isAgentStatusView;
        //   if (this.reportValidateGenesys == 2 && this.isRealTime == true) {
        //     if (!isActive) {
        //       element.divider = true
        //     }
        //     else {
        //       element.divider = false;
        //     }
        //   }
        //   else {
        //     element.divider = true;
        //   }
        // }
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
          let isActive = typeof (this.global.rolePermissions.analytics.help) == 'undefined' ? false : (this.global.rolePermissions.analytics.help.isView == false) ? false : true;
          if (!isActive) {
            element.divider = true
          }
        }
      }
      else {
        this.header.restrictMenuMobileDevice(element);
      }
    });

    return val
  }

  reportValidateGenesys: any = 0;
  isRealTime: boolean = false;
  getplatformValidate() {
    this.preferenceService.getPlatformDetail.subscribe(
      (data: any) => {
        // console.log(data)
        this.reportValidateGenesys = data.platformId;
        this.isRealTime = data.realTimeFlag != undefined ? data.realTimeFlag : false
        let language = localStorage.getItem("language")
        if (language === "english") {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalytics)
        }
        else if (language === "portuguese") {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsPortuguese)
        }
        else if (language === 'spanish') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsSpanish)
        }
        else if (language === 'french') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsFrench)
        }
        else if (language === 'japanese') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsJapanese)
        }
        else if (language === 'dutch') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsDutch)
        }
        else if (language === 'german') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsDutch)
        }
        else if (language === 'italian') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsItalian)
        }
        else if (language === 'korean') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsKorean)
        }
        else if (language === 'polish') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalyticsPolish)
        }
      }
    ),
      (error) => {
        console.log(error)
      }
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
      this.navItems = navItemsAnalytics
      this.sideNavRestriction(this.navItems);
    }

    (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAnalytics);

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
