import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonMethods } from '../common/common.components';
import { PreferenceService } from '../views/settings/successkpi-setting/successkpi-setting.service';

@Injectable({
  providedIn: 'root'
})
export class PlaybooksGuard implements CanActivate {
  constructor(private router: Router, private commonMethods: CommonMethods,private preferenceService: PreferenceService) { 
    this.getEnableFlag()
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
      _rolesObj = _rolesObj == null ? null : _rolesObj['playbooks']
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
      if (component.toLocaleLowerCase() == 'my-playbooks') {
        if (_rolesObj['myPlaybooks']['isView'] || _rolesObj['myPlaybooks']['isViewEdit']) {
          return true;
        }
        else if (_rolesObj['topics']['isView'] || _rolesObj['topics']['isViewEdit']) {
          return this.router.parseUrl('/playbooks/topics')
        }
        else if (typeof _rolesObj['moments'] != 'undefined' ? (_rolesObj['moments']['isView'] || _rolesObj['moments']['isViewEdit']): false) {
          if(this.isEnableMoment == true){
            return this.router.parseUrl('/playbooks/moments')
          }
        }
        else if (_rolesObj['themes']['isView'] || _rolesObj['themes']['isViewEdit']) {
          return this.router.parseUrl('/playbooks/themes')
        }
        else if (_rolesObj['actions']['isView'] || _rolesObj['actions']['isViewEdit']) {
          return this.router.parseUrl('/playbooks/actions')
        }
        else if (typeof _rolesObj['phraseRecommendation'] != 'undefined' ? (_rolesObj['phraseRecommendation']['isView'] || _rolesObj['phraseRecommendation']['isViewEdit']): false) {
          return this.router.parseUrl('/playbooks/phrase-recommmendation')
        }
        else if (_rolesObj['redactions']['isView'] || _rolesObj['redactions']['isViewEdit']) {
          return this.router.parseUrl('/playbooks/redactions')
        }
        else if (_rolesObj['customPhrases']['isView'] || _rolesObj['customPhrases']['isViewEdit']) {
          return this.router.parseUrl('/playbooks/custom-phrases')
        }
        else if (_rolesObj['help']['isView']) {
          return this.router.parseUrl('/playbooks/help')
        }
        else {
          return this.router.parseUrl('/access-denied')
        }
      }
      else if (component.toLocaleLowerCase() == 'topics' && (_rolesObj['topics']['isView'] || _rolesObj['topics']['isViewEdit'])) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'moments' && typeof _rolesObj['moments'] != 'undefined' ? (_rolesObj['moments']['isView'] || _rolesObj['moments']['isViewEdit']) : false) {
        if(this.isEnableMoment == true){
          return true;
        }
        else{
          return false;
        }
        
      }
      else if (component.toLocaleLowerCase() == 'themes' && (_rolesObj['themes']['isView'] || _rolesObj['themes']['isViewEdit'])) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'actions' && (_rolesObj['actions']['isView'] || _rolesObj['actions']['isViewEdit'])) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'phrase-recommmendation' && typeof _rolesObj['phraseRecommendation'] != 'undefined' ? (_rolesObj['phraseRecommendation']['isView'] || _rolesObj['phraseRecommendation']['isViewEdit']) : false) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'redactions' && (_rolesObj['redactions']['isView'] || _rolesObj['redactions']['isViewEdit'])) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'custom-phrases' && (_rolesObj['customPhrases']['isView'] || _rolesObj['customPhrases']['isViewEdit'])) {
        return true
      }
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
  
  isEnableMoment:Boolean = false;
  getEnableFlag(){
    this.preferenceService.getPlatformDetail.subscribe(
      (data:any)=>{
         this.isEnableMoment = (data.isCallTranscription_V2 != undefined) ? data.isCallTranscription_V2 : false;
      },
      (error)=>{
        console.log(error)
      }
    )
  }
}
