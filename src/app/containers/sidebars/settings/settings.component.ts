import { Component } from '@angular/core';
import {
  navItemsSettings, navItemsSettingsSpanish, navItemsSettingsPortuguese, navItemsSettingsFrench, navItemsSettingsJapanese,
  navItemsSettingsDutch, navItemsSettingsGerman, navItemsSettingsItalian, navItemsSettingsKorean, navItemsSettingsPolish, navTop
} from '../../../_nav';
import { GlobalComponent } from '../../../global/global.component';
import { Router } from '@angular/router';
import { HeaderLayoutComponent } from '../../header/header.component';


@Component({
  selector: 'app-sidebar-settings',
  templateUrl: './settings.component.html'
})
export class SettingsLayoutComponent {
  public sidebarMinimized = false;
  public navItems = [];

  constructor(public global: GlobalComponent,private router: Router, private header: HeaderLayoutComponent) {
    // this.getAppComponent();  
    this.topNavigation();
  }

  ngOnInit() {
    let language = localStorage.getItem("language")
    if (language === "english") {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsSettings)
    }
    else if (language === "portuguese") {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsSettingsPortuguese)
    }
    else if (language === 'spanish') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsSettingsSpanish)
    }
    else if (language === 'french') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsSettingsFrench)
    }
    else if (language === 'japanese') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsSettingsJapanese)
    }
    else if (language === 'dutch') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsSettingsDutch)
    }
    else if (language === 'german') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsSettingsGerman)
    }
    else if (language === 'italian') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsSettingsItalian)
    }
    else if (language === 'korean') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsSettingsKorean)
    }
    else if (language === 'polish') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsSettingsPolish)
    }
  }

   //It Validate the sideBar restriction depdends upon roles and permission
  sideNavRestriction(val) {
    val.forEach((element, index) => {
      const loop = element.children && element.children != undefined ? element.children : null;
      if (loop == null) {
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
      }
        else {
          this.header.restrictMenuMobileDevice(element);
        }
    });

    return val
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
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
      this.navItems = navItemsSettings
      this.sideNavRestriction(this.navItems);
    }

    (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsSettings);

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
