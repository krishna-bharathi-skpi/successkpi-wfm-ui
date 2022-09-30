import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonMethods } from '../common/common.components';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router, private commonMethods: CommonMethods) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('userToken') != null && localStorage.getItem("mstrAuthToken") != null && localStorage.getItem("mstrIdToken") != null) {
      return true;
    }
    else {
      this.commonMethods.clearLocalStorage();
      this.router.navigate(['/login']);
      return false;
    }
  }

}
