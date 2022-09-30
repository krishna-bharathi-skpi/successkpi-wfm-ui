import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonMethods } from '../common/common.components';
import { PreferenceService } from '../views/settings/successkpi-setting/successkpi-setting.service';
@Injectable({
  providedIn: 'root'
})
export class AnalyticsGuard implements CanActivate {
  constructor(private router: Router, private commonMethods: CommonMethods, private preferenceService: PreferenceService) { 
   // this.getplatformValidate();
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
      _rolesObj = _rolesObj == null ? null : _rolesObj['analytics']
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
      if (component.toLocaleLowerCase() == 'key-questions') {
        if (_rolesObj['keyQuestion']['isView'] || _rolesObj['keyQuestion']['isViewEdit']) {
          return true;
        }
        else if (_rolesObj['sharedDashboard']['isViewEdit']) {
          return this.router.parseUrl('/analytics/shared-dashboards')
        }
        else if (_rolesObj['customReports']['isViewEdit'] || _rolesObj['customReports']['isView']) {
          return this.router.parseUrl('/analytics/custom-reports')
        }
        else if (_rolesObj['subscription']['isViewEdit']) {
          return this.router.parseUrl('/analytics/subscriptions')
        }
        else if (typeof _rolesObj['myReports'] != 'undefined' ? _rolesObj['myReports']['isViewEdit']: false) {
          return this.router.parseUrl('/analytics/my-reports')
        }
        else if (typeof _rolesObj['publicReports'] != 'undefined' ? (_rolesObj['publicReports']['isView'] || _rolesObj['publicReports']['isViewEdit']): false) {
          return this.router.parseUrl('/analytics/public-reports')
        }
        else if (typeof _rolesObj['scheduleDelivery'] != 'undefined' ? (_rolesObj['scheduleDelivery']['isView'] || _rolesObj['scheduleDelivery']['isViewEdit']): false) {
          return this.router.parseUrl('/analytics/schedule-delivery')
        }
        else if (typeof _rolesObj['sharedSubscriptions'] != 'undefined' ? (_rolesObj['sharedSubscriptions']['isView'] || _rolesObj['sharedSubscriptions']['isViewEdit']): false) {
          return this.router.parseUrl('/analytics/shared-subscriptions')
        }
        else if (typeof _rolesObj['contactSubscriptions'] != 'undefined' ? ( _rolesObj['contactSubscriptions']['isViewEdit']): false) {
          return this.router.parseUrl('/analytics/contact-subscriptions')
        }
        else if (typeof _rolesObj['scheduleImport'] != 'undefined' ? (_rolesObj['scheduleImport']['isView'] || _rolesObj['scheduleImport']['isViewEdit']) : false) {
          return this.router.parseUrl('/analytics/schedule-import')
        }
        // else if (typeof _rolesObj['realtimeReport'] != 'undefined' ? _rolesObj['realtimeReport']['isQueueStatsView'] : false ){
        //   if(this.reportValidateGenesys == 2 && this.isRealTime == true){
        //     return this.router.parseUrl('/analytics/queue-stats')
        //   }
        // }
        // else if (typeof _rolesObj['realtimeReport'] != 'undefined' ?  _rolesObj['realtimeReport']['isQueueStatusView'] : false) {
        //   if(this.reportValidateGenesys == 2 && this.isRealTime == true){
        //     return this.router.parseUrl('/analytics/queue-status')
        //   }
        // }
        // else if (typeof _rolesObj['realtimeReport'] != 'undefined' ? _rolesObj['realtimeReport']['isAgentStatsView'] : false) {
        //   if(this.reportValidateGenesys == 2 && this.isRealTime == true){
        //     return this.router.parseUrl('/analytics/agent-stats')
        //   }
        // }
        // else if (typeof _rolesObj['realtimeReport'] != 'undefined' ? _rolesObj['realtimeReport']['isAgentStatusView'] : false) {
        //   if(this.reportValidateGenesys == 2 && this.isRealTime == true){
        //     return this.router.parseUrl('/analytics/agent-status')
        //   }
        // }
        else if (_rolesObj['help']['isView']) {
          return this.router.parseUrl('/analytics/help')
        }
        else {
          return this.router.parseUrl('/access-denied')
        }
      }
      else if (component.toLocaleLowerCase() == 'shared-dashboards' && _rolesObj['sharedDashboard']['isViewEdit']) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'custom-reports' && (_rolesObj['customReports']['isViewEdit'] || _rolesObj['customReports']['isView'])) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'subscriptions' && _rolesObj['subscription']['isViewEdit']) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'schedule-delivery' && typeof _rolesObj['scheduleDelivery'] != 'undefined' ? (_rolesObj['scheduleDelivery']['isView'] || _rolesObj['scheduleDelivery']['isViewEdit']) : false) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'public-reports' && typeof _rolesObj['publicReports'] != 'undefined' ? (_rolesObj['publicReports']['isView'] || _rolesObj['publicReports']['isViewEdit']) : false) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'shared-subscriptions' && typeof _rolesObj['sharedSubscriptions'] != 'undefined' ? (_rolesObj['sharedSubscriptions']['isView'] || _rolesObj['sharedSubscriptions']['isViewEdit']) : false) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'contact-subscriptions' && typeof _rolesObj['contactSubscriptions'] != 'undefined' ? ( _rolesObj['contactSubscriptions']['isViewEdit']) : false) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'schedule-import' && typeof _rolesObj['scheduleImport'] != 'undefined' ? (_rolesObj['scheduleImport']['isView'] || _rolesObj['scheduleImport']['isViewEdit']) : false) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'my-reports' && typeof _rolesObj['myReports'] != 'undefined' ?  _rolesObj['myReports']['isViewEdit'] : false) {
        return true
      }
      // else if (component.toLocaleLowerCase() == 'queue-stats' && typeof _rolesObj['realtimeReport'] != 'undefined'  ? _rolesObj['realtimeReport']['isQueueStatsView'] : false){ 
      //   if(this.reportValidateGenesys == 2 && this.isRealTime == true){
      //     return true
      //   }
      //   else{
      //     return false
      //   }
      // }
      // else if (component.toLocaleLowerCase() == 'queue-status' && typeof _rolesObj['realtimeReport'] != 'undefined' ? _rolesObj['realtimeReport']['isQueueStatusView'] : false) {
      //   if(this.reportValidateGenesys == 2 && this.isRealTime == true){
      //     return true
      //   }
      //   else{
      //     return false
      //   }
      // }
      // else if (component.toLocaleLowerCase() == 'agent-stats' && typeof _rolesObj['realtimeReport'] != 'undefined' ? _rolesObj['realtimeReport']['isAgentStatsView']  : false) {
      //   if(this.reportValidateGenesys == 2 && this.isRealTime == true){
      //     return true
      //   }
      //   else{
      //     return false
      //   }
      // }
      // else if (component.toLocaleLowerCase() == 'agent-status' && typeof _rolesObj['realtimeReport'] != 'undefined' ? _rolesObj['realtimeReport']['isAgentStatusView']  : false) {
      //   if(this.reportValidateGenesys == 2 && this.isRealTime == true){
      //     return true
      //   }
      //   else{
      //     return false
      //   }
      // }
      else if (component.toLocaleLowerCase() == 'help' && _rolesObj['help']['isView']) {
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

  reportValidateGenesys:any = 0;
  isRealTime:boolean = false;
  getplatformValidate(){
    this.preferenceService.getPlatformDetail.subscribe(
      (data:any)=>{
        // console.log(data)
        this.reportValidateGenesys = data.platformId;
        this.isRealTime = data.realTimeFlag != undefined ? data.realTimeFlag : false
      }
    ),
    (error)=>{
      console.log(error)
    }
  }
}