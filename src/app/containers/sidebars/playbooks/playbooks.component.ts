import { Component } from '@angular/core';
import {
  navItemsPlaybooks, navItemsPlaybooksPortuguese, navItemsPlaybooksSpanish, navItemsPlaybooksFrench, navItemsPlaybooksJapanese,
  navItemsPlaybooksDutch, navItemsPlaybooksGerman, navItemsPlaybooksItalian, navItemsPlaybooksKorean, navItemsPlaybooksPolish, navTop
} from '../../../_nav';
import { GlobalComponent } from '../../../global/global.component';
import { PreferenceService } from '../../../views/settings/successkpi-setting/successkpi-setting.service';
import { Router } from '@angular/router';
import { HeaderLayoutComponent } from '../../header/header.component';

@Component({
  selector: 'app-sidebar-playbooks',
  templateUrl: './playbooks.component.html'
})
export class PlaybooksLayoutComponent {
  public sidebarMinimized = false;
  public navItems = [];

  constructor(public global: GlobalComponent, private preferenceService: PreferenceService, private router: Router, private header: HeaderLayoutComponent) {
    this.getEnableFlag();
    this.topNavigation();
  }

  ngOnInit() {

    let language = localStorage.getItem("language")
    if (language === "english") {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooks)
    }
    else if (language === "portuguese") {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksPortuguese)
    }
    else if (language === 'spanish') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksSpanish)
    }
    else if (language === 'french') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksFrench)
    }
    else if (language === 'japanese') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksJapanese)
    }
    else if (language === 'dutch') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksDutch)
    }
    else if (language === 'german') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksGerman)
    }
    else if (language === 'italian') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksItalian)
    }
    else if (language === 'korean') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksKorean)
    }
    else if (language === 'polish') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksPolish)
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
      }
      else {
        this.header.restrictMenuMobileDevice(element);
      }
    });

    return val
  }

  isEnableMoment: Boolean = false;
  getEnableFlag() {
    this.preferenceService.getPlatformDetail.subscribe(
      (data: any) => {
        this.isEnableMoment = (data.isCallTranscription_V2 != undefined) ? data.isCallTranscription_V2 : false;
        let language = localStorage.getItem("language")
        if (language === "english") {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooks)
        }
        else if (language === "portuguese") {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksPortuguese)
        }
        else if (language === 'spanish') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksSpanish)
        }
        else if (language === 'french') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksFrench)
        }
        else if (language === 'japanese') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksJapanese)
        }
        else if (language === 'dutch') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksDutch)
        }
        else if (language === 'german') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksGerman)
        }
        else if (language === 'italian') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksItalian)
        }
        else if (language === 'korean') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksKorean)
        }
        else if (language === 'polish') {
          (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooksPolish)
        }
      },
      (error) => {
        console.log(error)
      }
    )
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
      this.navItems = navItemsPlaybooks
      this.sideNavRestriction(this.navItems);
    }

    (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsPlaybooks);

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
