import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonMethods } from '../common/common.components';
import { PreferenceService } from '../views/settings/successkpi-setting/successkpi-setting.service';
@Injectable({
  providedIn: 'root'
})
export class WfmGuard implements CanActivate {
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
      _rolesObj = _rolesObj == null ? null : _rolesObj['work']
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
      if (component.toLocaleLowerCase() == 'service-quality') {
        if (_rolesObj['serviceQuality']['isView']) {
          return true;
        }
        else if (_rolesObj['serviceQuality']['isView'] || _rolesObj['serviceQuality']['isViewEdit']) {
          return this.router.parseUrl('/wfm/service_levels/list')
        }
        else if (_rolesObj['forecasting']['isView'] || _rolesObj['forecasting']['isViewEdit']) {
          return this.router.parseUrl('/wfm/forecast/list')
        }
        else if (_rolesObj['schedule']['isView'] || _rolesObj['schedule']['isViewEdit']) {
          return this.router.parseUrl('/wfm/schedule/setup')
        }
        else {
          return this.router.parseUrl('/access-denied');
        }
      }
      else if (component.toLocaleLowerCase() == 'service-quality' && typeof _rolesObj['serviceQuality'] != 'undefined' ? (_rolesObj['serviceQuality']['isView'] || _rolesObj['serviceQuality']['isViewEdit']) : false) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'forecasting' && typeof _rolesObj['forecasting'] != 'undefined' ? (_rolesObj['forecasting']['isView'] || _rolesObj['forecasting']['isViewEdit']) : false) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'schedule' && typeof _rolesObj['schedule'] != 'undefined' ? (_rolesObj['schedule']['isView'] || _rolesObj['schedule']['isViewEdit']) : false) {
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
