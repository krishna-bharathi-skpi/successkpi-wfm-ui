import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonMethods } from '../common/common.components';
 
@Injectable({
 providedIn: 'root'
})
export class SettingsGuard implements CanActivate {
 constructor(private router: Router, private commonMethods: CommonMethods) { }
 canActivate(
   next: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   let _roles = localStorage.getItem('_&rp&');
   let isRole = false;
   let component = next.data.rolePath
   let _rolesObj = null
   try {
     _rolesObj = _roles == null ? null : this.commonMethods.decryptData(_roles)
     _rolesObj = _rolesObj == null ? null : _rolesObj['settings']
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
     if (component.toLocaleLowerCase() == 'preferences') {
       if (_rolesObj['preferences']['isView'] || _rolesObj['preferences']['isViewEdit']) {
         return true;
       }
       else if (typeof _rolesObj['dataPartition'] != 'undefined' ? (_rolesObj['dataPartition']['isView'] || _rolesObj['dataPartition']['isViewEdit']): false) {
        return this.router.parseUrl('/settings/partitions')
      }
       else if (_rolesObj['roles']['isView'] || _rolesObj['roles']['isViewEdit']) {
        return this.router.parseUrl('/settings/roles')
      }
      else if (_rolesObj['users']['isView'] || _rolesObj['users']['isViewEdit']) {
        return this.router.parseUrl('/settings/users')
      }
       else if (_rolesObj['platformSettings']['isView'] || _rolesObj['platformSettings']['isViewEdit']) {
         return this.router.parseUrl('/settings/platform-setting')
       }
       else if (_rolesObj['topicDetection']['isView'] || _rolesObj['topicDetection']['isViewEdit']) {
         return this.router.parseUrl('/settings/topic-detection')
       }
       else {
         return this.router.parseUrl('/access-denied')
       }
     }
     // else if (component.toLocaleLowerCase() == 'preferences' && (_rolesObj['preferences']['isView'] || _rolesObj['preferences']['isViewEdit'])) {
     //   return true
     // }
     else if (component.toLocaleLowerCase() == 'partitions' && typeof _rolesObj['dataPartition'] != 'undefined' ? (_rolesObj['dataPartition']['isView'] || _rolesObj['dataPartition']['isViewEdit']) : false) {
       return true
     }
     else if (component.toLocaleLowerCase() == 'roles' && (_rolesObj['roles']['isView'] || _rolesObj['roles']['isViewEdit'])) {
       return true
     }
     else if (component.toLocaleLowerCase() == 'users' && (_rolesObj['users']['isView'] || _rolesObj['users']['isViewEdit'])) {
       return true
     }
     else if (component.toLocaleLowerCase() == 'platform-setting' && (_rolesObj['platformSettings']['isView'] || _rolesObj['platformSettings']['isViewEdit'])) {
       return true
     }
     else if (component.toLocaleLowerCase() == 'topic-detection' && (_rolesObj['topicDetection']['isView'] || _rolesObj['topicDetection']['isViewEdit'])) {
       return true
     }
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
 

