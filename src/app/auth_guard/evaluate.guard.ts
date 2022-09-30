import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonMethods } from '../common/common.components';
import { PreferenceService } from '../views/settings/successkpi-setting/successkpi-setting.service';
@Injectable({
  providedIn: 'root'
})
export class EvaluateGuard implements CanActivate {
  constructor(private router: Router, private commonMethods: CommonMethods,private preferenceService: PreferenceService) {
    this.getplatformValidate();
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
      _rolesObj = _rolesObj == null ? null : _rolesObj['evaluate']
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
      if (component.toLocaleLowerCase() == 'evaluation-workspace-nacd') {
        if (_rolesObj['evaluationWorkspaceNacd']['isView'] || _rolesObj['evaluationWorkspaceNacd']['isViewEdit']) {
          return true;
        }
        // else if (typeof _rolesObj['evaluationWorkspaceNacd'] != 'undefined' ? (_rolesObj['evaluationWorkspaceNacd']['isView'] || _rolesObj['evaluationWorkspaceNacd']['isViewEdit']): false) {
        //   return this.router.parseUrl('/evaluations/evaluation-workspace-nacd')
        // }
        else if (typeof _rolesObj['coachingWorkspace'] != 'undefined' ? (_rolesObj['coachingWorkspace']['isView'] || _rolesObj['coachingWorkspace']['isViewEdit']): false) {
          return this.router.parseUrl('/evaluations/coaching-workspace')
        }
        else if (typeof _rolesObj['manageDispute'] != 'undefined' ? (_rolesObj['manageDispute']['isView'] || _rolesObj['manageDispute']['isViewEdit']): false) {
          return this.router.parseUrl('/evaluations/manage-dispute')
        }
        else if (_rolesObj['evaluationFroms']['isView'] || _rolesObj['evaluationFroms']['isViewEdit']) {
          return this.router.parseUrl('/evaluations/evaluation-forms')

        }
        else if (typeof _rolesObj['myEvaluation'] != 'undefined' ? _rolesObj['myEvaluation']['isView'] : false) {
          return this.router.parseUrl('/evaluations/my-evaluation')
        }
        else if (typeof _rolesObj['myTeamEvaluation'] != 'undefined' ? _rolesObj['myTeamEvaluation']['isView'] : false) {
          if(this.validatePlatformId == 2 || this.validatePlatformId == 9){
            return this.router.parseUrl('/evaluations/my-teams-evaluation')
          }
        }
        else if (typeof _rolesObj['myCoachingSessions'] != 'undefined' ? _rolesObj['myCoachingSessions']['isView'] : false) {
          return this.router.parseUrl('/evaluations/my-coaching-sessions')
        }
        // else if (_rolesObj['interactions']['isView']) {
        //   return this.router.parseUrl('/evaluations/interactions')
        // }
        else if (typeof _rolesObj['newInteractions'] != 'undefined' ? _rolesObj['newInteractions']['isView'] : false) {
          return this.router.parseUrl('/evaluations/new-interactions')
        }
        else if (typeof _rolesObj['ai_ml_Scoring'] != 'undefined' ? (_rolesObj['ai_ml_Scoring']['isView'] || _rolesObj['ai_ml_Scoring']['isViewEdit']): false) {
          return this.router.parseUrl('/evaluations/ai_ml-scoring')
        }
        else if (_rolesObj['help']['isView']) {
          return this.router.parseUrl('/evaluations/help')
        }
        else {
          return this.router.parseUrl('/access-denied')
        }
      }
      // else if (component.toLocaleLowerCase() == 'evaluation-workspace-nacd' && typeof _rolesObj['evaluationWorkspaceNacd'] != 'undefined' ? (_rolesObj['evaluationWorkspaceNacd']['isView'] || _rolesObj['evaluationWorkspaceNacd']['isViewEdit']) : false) {
      //   return true
      // }
      else if (component.toLocaleLowerCase() == 'coaching-workspace' && typeof _rolesObj['coachingWorkspace'] != 'undefined' ? (_rolesObj['coachingWorkspace']['isView'] || _rolesObj['coachingWorkspace']['isViewEdit']) : false) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'manage-dispute' && typeof _rolesObj['manageDispute'] != 'undefined' ? (_rolesObj['manageDispute']['isView'] || _rolesObj['manageDispute']['isViewEdit']) : false) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'evaluation-forms' && (_rolesObj['evaluationFroms']['isView'] || _rolesObj['evaluationFroms']['isViewEdit'])) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'my-evaluation' && typeof _rolesObj['myEvaluation'] != 'undefined' ? _rolesObj['myEvaluation']['isView'] : false) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'my-teams-evaluation' && typeof _rolesObj['myTeamEvaluation'] != 'undefined' ? _rolesObj['myTeamEvaluation']['isView'] : false) {
        if(this.validatePlatformId == 2 || this.validatePlatformId == 9){
          return true
        }
        else{
          return false
        }
      }
      else if (component.toLocaleLowerCase() == 'my-coaching-sessions' && typeof _rolesObj['myCoachingSessions'] != 'undefined' ? _rolesObj['myCoachingSessions']['isView'] : false) {
        return true
      }
      // else if (component.toLocaleLowerCase() == 'interactions' && _rolesObj['interactions']['isView']) {
      //   return true
      // }
      else if (component.toLocaleLowerCase() == 'new-interactions' && typeof _rolesObj['newInteractions'] != 'undefined' ? _rolesObj['newInteractions']['isView'] : false) {
        return true
      }
      else if (component.toLocaleLowerCase() == 'ai-ml-scoring' && typeof _rolesObj['ai_ml_Scoring'] != 'undefined' ? (_rolesObj['ai_ml_Scoring']['isView'] || _rolesObj['ai_ml_Scoring']['isViewEdit']) : false) {
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
  
  validatePlatformId:any = 0;
  getplatformValidate(){
    this.preferenceService.getPlatformDetail.subscribe(
      (data:any)=>{
        // console.log(data)
        this.validatePlatformId = data.platformId;
      }
    ),
    (error)=>{
      console.log(error)
    }
  }

}
