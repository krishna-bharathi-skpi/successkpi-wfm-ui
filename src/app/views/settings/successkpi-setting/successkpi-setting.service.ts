import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, from, AsyncSubject } from 'rxjs';
import { utils } from "../../../config";
import * as JsonPath from '../../../JsonPath';


@Injectable({
  providedIn: 'root'
})

export class PreferenceService {
  httpLocal: any;
  
  constructor(private http: HttpClient, private handler: HttpBackend, ) {
    this.httpLocal = new HttpClient(handler);
    
  }
  url: string = "";
  public getPlatformDetail = new AsyncSubject();
//   getEmployee(): Observable<any> {
//     this.url = "http://dummy.restapiexample.com/api/v1/employees"
//     return this.http.get(this.url);
//   }
getContactCenter():Observable<any>{
  // return this.httpLocal.get("../../../../assets/json-files/settings/platform.json");
  let currentLang=localStorage.getItem("language");
  let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
  let params = new URLSearchParams();
  let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.preference + '/' + JsonPath.configJson.jsonFile.platformList;
  params.append("objectkey",jsonS3Path) 
  params.append("raw",'key') 
  return this.http.get(url+params);
}
getPreference():Observable<any>{
    let url = utils.pathPhase3 + "/api/getsystem-setting";
    return this.http.get(url);
}
dashboardDocId():Observable<any>{
    let url = utils.pathPhase + "/api/AnalyseConfig";
    return this.http.get(url);
}
savePreference(save):Observable<any>{
    let url = utils.pathPhase3 + "/api/createSystemSetting";
    return this.http.post(url,save)
}
getCallAnalyticsType():Observable<any>{
  let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
  let params = new URLSearchParams();
  let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.preference + '/' + JsonPath.configJson.jsonFile.callAnalyticsType;
  params.append("objectkey",jsonS3Path) 
  params.append("raw",'json') 
  return this.http.get(url+params);
}
getLanguageDetection():Observable<any>{
  let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
  let params = new URLSearchParams();
  let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.preference + '/' + JsonPath.configJson.jsonFile.languageDetection;
  params.append("objectkey",jsonS3Path) 
  params.append("raw",'json') 
  return this.http.get(url+params);
}
 
}