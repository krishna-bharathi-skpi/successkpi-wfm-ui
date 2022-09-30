import { Component, OnInit } from '@angular/core';
import {
  navItemsWfm, navItemsWfmSpanish, navItemsWfmPortuguese, navItemsWfmFrench, navItemsWfmJapanese,
  navItemsWfmDutch, navItemsWfmGerman, navItemsWfmItalian, navItemsWfmKorean, navItemsWfmPolish, navTop
} from '../../../_nav';
import { GlobalComponent } from '../../../global/global.component';
import { Router } from '@angular/router';
import { HeaderLayoutComponent } from '../../header/header.component';

@Component({
  selector: 'app-sidebar-wfm',
  templateUrl: './wfm.component.html'
})
export class WfmLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = [];

  constructor(public global: GlobalComponent, private router: Router, private header: HeaderLayoutComponent) {
    this.topNavigation()
  }

  ngOnInit(): void {
    let language = localStorage.getItem("language")
    if (language === "english") {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsWfm)
    }
    else if (language === "portuguese") {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsWfmPortuguese)
    }
    else if (language === 'spanish') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsWfmSpanish)
    }
    else if (language === 'french') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsWfmFrench)
    }
    else if (language === 'japanese') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsWfmJapanese)
    }
    else if (language === 'dutch') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsWfmDutch)
    }
    else if (language === 'german') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsWfmGerman)
    }
    else if (language === 'italian') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsWfmItalian)
    }
    else if (language === 'korean') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsWfmKorean)
    }
    else if (language === 'polish') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsWfmPolish)
    }
  }

  //It Validate the sideBar restriction depdends upon roles and permission
  sideNavRestriction(val) {
    val.forEach((element, index) => {
      const loop = element.children && element.children != undefined ? element.children : null;
      if (loop == null) {
        if (element.url == '/wfm/service_levels/list') {
          let isActive = (this.global.rolePermissions.work.serviceQuality) == undefined ? false : (this.global.rolePermissions.work.serviceQuality.isView == false && this.global.rolePermissions.work.serviceQuality.isViewEdit == false) ? false : true;
          if (!isActive) {
            element.divider = true
          }
        }
        else if (element.url == '/wfm/forecast/list') {
          let isActive = (this.global.rolePermissions.work.forecasting) == undefined ? false : (this.global.rolePermissions.work.forecasting.isView == false && this.global.rolePermissions.work.forecasting.isViewEdit == false) ? false : true;
          if (!isActive) {
            element.divider = true
          }
        }
        else if (element.url == '/wfm/schedule/workgroup/list' || element.url == '/wfm/schedule/agents/list' || element.url == '/wfm/schedule/tasks/list' || element.url == '/wfm/schedule/workgroup_rules/list') {
          let isActive = (this.global.rolePermissions.work.schedule) == undefined ? false : (this.global.rolePermissions.work.schedule.isView == false && this.global.rolePermissions.work.schedule.isViewEdit == false) ? false : true;
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

  toggleMinimize(e) {
    this.sidebarMinimized = e;
    (this.sidebarMinimized) ? $('.wfm').css('margin-left', '-30px') : $('.wfm').css('margin-left', '0px');
  }

  //It dynamically loads the sidemenu (Mobile,Tablet)
  topNavigation() {
    const NavTop = () => {
      this.navItems = navTop
      this.sideNavRestriction(this.navItems);
    }
    const NavWidth = () => {
      this.navItems = navItemsWfm
      this.sideNavRestriction(this.navItems);
    }

    (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsWfm);

    window.addEventListener("resize", function () {
      if (window.matchMedia("(max-width: 991px)").matches) {
        NavTop();
      } else {
        NavWidth();
      }
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

}
