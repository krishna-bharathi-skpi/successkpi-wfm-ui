import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import utils from '../../config';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  sendCode(forgotModel): Observable<any> {
    let url = utils.pathPhase + "/api/auth/forgotpwd";
    return this.http.post(url,forgotModel);
  }

  changePassword(forgotModel): Observable<any> {
    let url = utils.pathPhase + "/api/auth/changepwd";
    return this.http.put(url,forgotModel);
  }
}
