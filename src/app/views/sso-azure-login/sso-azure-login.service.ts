import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import utils from '../../config';
import { tap } from 'rxjs/operators';
import { CommonMethods } from '../../common/common.components';
import {
  Routes, Router,
  Event as RouterEvent,
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SSO_AzureService {

  constructor(private http: HttpClient, private commonMethods: CommonMethods, private router: Router) { }

  searchOrgID(orgID): Observable<any> {
    let url = utils.authPath + "/api/sso/get-customer-idp?";
    let params = new URLSearchParams();
    params.append("orgcode", orgID)
    return this.http.get(url + params)
  }
  
  redirectSSOLogin(data){
    let url = utils.authPath + "/api/sso/gettoken";
    return this.http.post(url,data)
  }
}
