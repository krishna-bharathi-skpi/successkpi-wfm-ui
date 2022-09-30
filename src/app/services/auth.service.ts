import { Injectable, NgZone } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, switchMap, filter, take } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpClient, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { utils } from '../config';
import * as jwtDecode from 'jwt-decode';
import { CommonMethods } from '../common/common.components';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LoginService } from '../views/login/login.service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {
  url: string = environment.url;

  constructor(private router: Router, public httpclient: HttpClient, private zone: NgZone,
    private commonMethods: CommonMethods, private loginService: LoginService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const Token = this.commonMethods.decryptData(localStorage.getItem("userToken"));
    const accessToken = this.commonMethods.decryptData(localStorage.getItem("accessToken"));
    let isLogin = false;
    if (Token && accessToken) {
      request = this.addToken(request, Token, accessToken, 1);
    }
    else {
      isLogin = true;
      request = this.loginReq(request);
    }
    return next.handle(request).pipe(tap((data: any) => {
    }), catchError(error => {
      if (error.status === 0 && !isLogin) {
        return this.handle401Error(request, next);
      } else if (error.status === 401 && !isLogin) {
        this.loginService.logout();
        return throwError(error);
      }
      else {
        isLogin = false;
        return throwError(error);
      }
    }))
  }

  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!utils.isRefreshing) {
      utils.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.loginService.refreshToken().pipe(catchError((error) => {
        if (error.status == 401 || error.status == 501) {
          this.refreshTokenSubject.next({});
          this.loginService.logout();
          return throwError(error);
        }
        else {
          utils.isRefreshing = false;
          return throwError(error);
        }
      }),
        switchMap((token: any) => {
          setTimeout(() => {
            utils.isRefreshing = false;
          }, 15000)
          if (typeof token.idToken == 'undefined') {
            token = {
              idToken: this.commonMethods.decryptData(localStorage.getItem('userToken')),
              accessToken: this.commonMethods.decryptData(localStorage.getItem('accessToken'))
            }
            this.refreshTokenSubject.next(token);
            return next.handle(this.addToken(request, token.idToken, token.accessToken, 2));
          } else {
            this.refreshTokenSubject.next(token);
            return next.handle(this.addToken(request, token.idToken, token.accessToken, 2));
          }
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(request, token.idToken, token.accessToken, 2));
        }));
    }
  }
  private addToken(request: HttpRequest<any>, token: string, accessToken: string, urlCount: number) {
    let url = urlCount == 1 ? this.url + request.url : request.url
    return request.clone({
      url: url,
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'AccessToken': accessToken,
        'x-api-key': environment.privateKey
      }
    });
  }

  private loginReq(request: HttpRequest<any>) {
    return request.clone({
      url: this.url + request.url,
      setHeaders: {
        'x-api-key': environment.privateKey
      }
    });
  }



  // if (Token) {
  //   const cloned = req.clone({
  //     url: this.url + req.url,
  //     setHeaders: {
  //       'Content-Type': 'application/json; charset=utf-8',
  //       'Authorization': `Bearer ` + Token,
  //       'AccessToken': accessToken,
  //       'x-api-key': utils.privateKey
  //     }
  //   });

  //   return next.handle(cloned)
  //     .pipe(
  //       tap((data: any) => {
  //         const token = localStorage.getItem("userToken")
  //         var decode = jwtDecode(token);
  //         if (decode.exp < Date.now() / 1000) {
  //           // localStorage.clear();
  //           this.commonMethods.clearLocalStorage();
  //           window.location.reload();
  //         }
  //       }),
  //       catchError(this.handleError)
  //     )
  // }
  // else {
  //   const cloned = req.clone({
  //     url: this.url + req.url,
  //     setHeaders: {
  //       'Content-Type': 'application/json; charset=utf-8',
  //       'x-api-key': utils.privateKey
  //     }
  //   });

  //   return next.handle(cloned)
  //     .pipe(
  //       tap((data: any) => {
  //       }),
  //       catchError(this.handleError)
  //     )
  // }
  // private isRefreshing = false;
  // private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // handleError(error: any) {
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;
  //   }
  //   console.error(error);
  //   if (error.status === 401) {
  //     // localStorage.clear();
  //     this.commonMethods.clearLocalStorage();
  //     this.zone.run(() => this.router.navigate(['/login']));
  //   }
  //   else {
  //     return throwError(error)
  //   }
  // }
}
