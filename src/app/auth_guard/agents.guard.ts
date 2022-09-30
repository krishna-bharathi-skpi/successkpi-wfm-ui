import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonMethods } from '../common/common.components';
import { PreferenceService } from '../views/settings/successkpi-setting/successkpi-setting.service';

@Injectable({
  providedIn: 'root'
})
export class AgentsGuard implements CanActivate {
  constructor(private router: Router, private commonMethods: CommonMethods,private preferenceService: PreferenceService) { 
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let _roles = localStorage.getItem('_&rp&');
    let isRole = false;
    let component = next.data.rolePath
    let _rolesObj = null
    try {
      _rolesObj = _roles == null ? null : this.commonMethods.decryptData(_roles)
      _rolesObj = _rolesObj == null ? null : _rolesObj['agents']
      if (_rolesObj) {
        isRole = true;
      } else {
        isRole = false;
      }
    } catch (error) {
      console.log('error', error)
      isRole = false;
    }
    if (localStorage.getItem('userToken') != null && localStorage.getItem("mstrAuthToken") != null && localStorage.getItem("mstrIdToken") != null && isRole) {
      if (component.toLocaleLowerCase() == 'disposition-coding') {
        if (_rolesObj['dispositionCoding']['isView'] || _rolesObj['dispositionCoding']['isViewEdit']) {
          return true;
        }
        else if (typeof _rolesObj['myPerformance'] != 'undefined' ? (_rolesObj['myPerformance']['isView']): false) {
          return this.router.parseUrl('/agents/my-performance')
        }
        else if ( typeof _rolesObj['myEvaluations'] != 'undefined' ? _rolesObj['myEvaluations']['isView'] : false) {
          return this.router.parseUrl('/agents/my-evaluations')
        }
        else if ( typeof _rolesObj['mySchedule'] != 'undefined' ? _rolesObj['mySchedule']['isView'] : false) {
          return this.router.parseUrl('/agents/my-schedule')
        }
        else {
          return this.router.parseUrl('/access-denied');
        }
      }
      else if (component.toLocaleLowerCase() == 'my-performance' && typeof _rolesObj['myPerformance'] != 'undefined' ? (_rolesObj['myPerformance']['isView']) : false) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'my-evaluations' && typeof _rolesObj['myEvaluations'] != 'undefined' ? (_rolesObj['myEvaluations']['isView']) : false) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'my-schedule' && typeof _rolesObj['mySchedule'] != 'undefined' ? (_rolesObj['mySchedule']['isView']) : false) {
        return true
      }
      else {
            return this.router.parseUrl('/access-denied');
      }
   
    }
    else {
      this.commonMethods.clearLocalStorage();
      this.router.navigate(['/login']);
      return false;
    }
    // return true;
  }


}
