import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonMethods } from '../common/common.components';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private router: Router, private commonMethods: CommonMethods) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let _roles = localStorage.getItem('_&rp&');
    let isRole = false;
    let component = next.data.rolePath
    let f_Obj = null;
    let _rolesObj = null
    try {
      _rolesObj = _roles == null ? null : this.commonMethods.decryptData(_roles)
      f_Obj = _rolesObj;
      _rolesObj = _rolesObj == null ? null : _rolesObj['home']
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
      if (component.toLocaleLowerCase() == 'command-center') {
        if (typeof _rolesObj['commandCenter'] != 'undefined' ? _rolesObj['commandCenter']['isView'] : false) {
          return true;
        }
        else if (_rolesObj['homeDashboard']['isView']) {
          return this.router.parseUrl('home/home-dashboard');
        }
        else if (_rolesObj['homeDashboard']['isViewEdit']) {
          return this.router.parseUrl('/home/customize-dashboard')

        }
        else if (_rolesObj['help']['isView']) {
          return this.router.parseUrl('/home/help')
        }
        // else if (typeof _rolesObj['commandCenter'] != 'undefined' ? _rolesObj['commandCenter']['isView'] : false) {
        //   return this.router.parseUrl('/home/command-center')
        // }
        else {
          let resPath = this.commonMethods.findRedirectPath(f_Obj);
          if (resPath == 'home') {
            this.router.navigateByUrl('/home');
            return true;
          }
          else if (resPath == 'analytics') {
            this.router.navigateByUrl('/analytics');
            return false;
          }
          else if (resPath == 'evaluate') {
            this.router.navigateByUrl('/evaluations');
            return false;
          }
          else if (resPath == 'playbooks') {
            this.router.navigateByUrl('/playbooks');
            return false;
          }
          else if (resPath == 'settings') {
            this.router.navigateByUrl('/settings');
            return false;
          }
          else if (resPath == 'wfm') {
            this.router.navigateByUrl('/wfm');
            return false;
          }
          else if (resPath == 'agents') {
            this.router.navigateByUrl('/agents');
            return false;
          }
          else {
            this.router.navigateByUrl('/access-denied');
            return false;
          }


        }
      }
      else if (component.toLocaleLowerCase() == 'home-dashboard' && _rolesObj['homeDashboard']['isView']) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'customize-dashboard' && _rolesObj['homeDashboard']['isViewEdit']) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'help' && _rolesObj['help']['isView']) {
        return true
      }
      // else if (component.toLocaleLowerCase() == 'command-center' && typeof _rolesObj['commandCenter'] != 'undefined' ? _rolesObj['commandCenter']['isView'] : false) {
      //   return true
      // }
      else {
        return this.router.parseUrl('/access-denied')
      }

    }
    else {
      this.commonMethods.clearLocalStorage();
      this.router.navigate(['/login']);
      return false;
    }



  }


}
