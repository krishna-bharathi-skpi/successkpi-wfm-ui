import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from '../../../app/config';



@Injectable({
  providedIn: 'root'
})

export class HeaderService {
  httpLocal: any;
  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.httpLocal = new HttpClient(handler);
  }
  url: string = "";
  
  getLanguage(lang){
      let url = utils.pathPhase9 + "/api/s3bucket/getuilanguagejson?";
      let params = new URLSearchParams()
      params.append("language",lang) 
      return this.http.get(url+params)
    }
  updateLanguage(update):Observable<any>{
    let url = utils.pathPhase9 + "/api/updateuilanguage";
    return this.http.post(url,update);
  }
  // getLangJson():Observable<any>{ 
  //   let url ="../../../../assets/json-files/home-dropdwn/language.json"
  //   return this.httpLocal.get(url)
  // }
  getuiDropdwn():Observable<any>{
    let url = utils.pathPhase9 + "/api/s3bucket/getlocaleddb";
    return this.http.get(url)
  }

  // chnagepassword
  // update
  updatePassword(update):Observable<any>{
    let url = utils.pathPhase + "/api/userChangePassword";
    return this.http.post(url,update);
  }

  auditLog(audit):Observable<any>{
    let url = utils.pathPhase10 + "/api/s3bucket/skpiauditLogs";
    return this.http.post(url,audit, {responseType: 'text'});
  }
}