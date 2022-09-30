import { Component, Injectable, ViewChild } from '@angular/core';
import {
  navItem, navTop, navItemsPortuguese, navItemsSpanish, navItemsFrench, navItemsJapanese,
  navItemsDutch, navItemsGerman, navItemsItalian, navItemsKorean, navItemsPolish
} from '../../../_nav';
// import {utils} from '../../../config'
import { HeaderService } from '../../header/header.service';
import { GlobalComponent } from '../../../global/global.component';
import { Router } from '@angular/router';
import { HeaderLayoutComponent } from '../../header/header.component';
@Component({
  selector: 'app-sidebar-home',
  templateUrl: './home.component.html'
})

export class HomeLayoutComponent {
  public sidebarMinimized = false;
  public navItems = [];

  constructor(public headerService: HeaderService, public global: GlobalComponent, private router: Router, private header: HeaderLayoutComponent) {
    // this.getAppComponent(); 
    this.topNavigation();

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  ngOnInit() {

    this.sidebarMinimized = false;
    let language = localStorage.getItem("language")
    if (language === "english") {
      let val = this.navItems;
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItem)
    }
    else if (language === "portuguese") {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPortuguese)
    }
    else if (language === 'spanish') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsSpanish)
    }
    else if (language === 'french') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsFrench)
    }
    else if (language === 'japanese') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsJapanese)
    }
    else if (language === 'dutch') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsDutch)
    }
    else if (language === 'german') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsGerman)
    }
    else if (language === 'italian') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsItalian)
    }
    else if (language === 'korean') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsKorean)
    }
    else if (language === 'polish') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPolish)
    }

  }

   //It Validate the sideBar restriction depdends upon roles and permission
  sideNavRestriction(val) {
    val.forEach((element, index) => {
      const loop = element.children && element.children != undefined ? element.children : null;
      if (loop == null) {
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
      }
      else {
        this.header.restrictMenuMobileDevice(element);
      }
    });

    return val
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
      this.navItems = navItem
      this.sideNavRestriction(this.navItems);
    }

    (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItem);

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


  // getAppComponent(){
  //   alert("Check JSON")
  //   let localLanguage =  localStorage.getItem("language")
  //   if(localLanguage){
  //     this.global.getLangValue = localLanguage
  //  }
  //  else{
  //    this.global.getLangValue = "english";
  //  }

  //     this.headerService.getLanguage(this.global.getLangValue).subscribe(response => {
  //       console.log("S3JSON",response);
  //       this.global.language=response;
  //       utils.homeSideNav=this.global.language['home']['sideNav']
  //       console.log("sidenav",utils.homeSideNav);

  //     }
  //     , (error) => {
  //       console.log('error', error); 
  //     });


  // }
}
