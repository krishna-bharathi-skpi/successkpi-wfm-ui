import { Component } from '@angular/core';
import {
  navItemsAgents, navItemsAgentsSpanish, navItemsAgentsPortuguese, navItemsAgentsFrench, navItemsAgentsJapanese,
  navItemsAgentsDutch, navItemsAgentsGerman, navItemsAgentsItalian, navItemsAgentsKorean, navItemsAgentsPolish, navTop
} from '../../../_nav';
import { Router } from '@angular/router';
import { GlobalComponent } from '../../../global/global.component';
import { LoginService } from '../../../views/login/login.service'
import { DispositionCodingService } from '../../../views/agents/disposition-coding/disposition-coding.service';
import { HeaderLayoutComponent } from '../../header/header.component';

@Component({
  selector: 'app-sidebar-agents',
  templateUrl: './agents.component.html'
})
export class AgentsLayoutComponent {
  public sidebarMinimized = false;
  public navItems = [];
  constructor(private router: Router, public global: GlobalComponent, private loginService: LoginService, private dispositionCodeService: DispositionCodingService, private header: HeaderLayoutComponent) {
    this.topNavigation();
  }
  ngOnInit() {

    let language = localStorage.getItem("language")
    if (language === "english") {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAgents)
    }
    else if (language === "portuguese") {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAgentsPortuguese)
    }
    else if (language === 'spanish') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAgentsSpanish)
    }
    else if (language === 'french') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAgentsFrench)
    }
    else if (language === 'japanese') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAgentsJapanese)
    }
    else if (language === 'dutch') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAgentsDutch)
    }
    else if (language === 'german') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAgentsGerman)
    }
    else if (language === 'italian') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAgentsItalian)
    }
    else if (language === 'korean') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAgentsKorean)
    }
    else if (language === 'polish') {
      (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAgentsPolish)
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
      } else {
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
      this.navItems = navItemsAgents
      this.sideNavRestriction(this.navItems);
    }

    (window.matchMedia("(max-width: 991px)").matches) ? this.navItems = this.sideNavRestriction(navTop) : this.navItems = this.sideNavRestriction(navItemsAgents);

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
