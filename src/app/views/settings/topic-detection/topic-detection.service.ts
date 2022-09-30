import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";
import * as JsonPath from '../../../JsonPath';

@Injectable({
  providedIn: 'root'
})

export class topicDetectionService {
  httpLocal: any;
  
  constructor(private http: HttpClient, private handler: HttpBackend, ) {
    this.httpLocal = new HttpClient(handler);
    
  }
  url: string = "";
//   getEmployee(): Observable<any> {
//     this.url = "http://dummy.restapiexample.com/api/v1/employees"
//     return this.http.get(this.url);
//   }
  jobType():Observable<any>{
      // let url = "../assets/json-files/settings/topic-detection/job-type.json";
      // return this.httpLocal.get(url);
      let currentLang=localStorage.getItem("language");
      let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
      let params = new URLSearchParams();
      let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.topicDetect + '/' +JsonPath.configJson.settings.path.jobType + '/' + currentLang +"-job-type.json";
      params.append("objectkey",jsonS3Path) 
      params.append("raw",'json') 
      return this.http.get(url+params);
  }
  jobHours():Observable<any>{
      // let url = "../assets/json-files/settings/topic-detection/hours-DDL.json";
      // return this.httpLocal.get(url);
      let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
      let params = new URLSearchParams();
      let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.topicDetect + '/' +JsonPath.configJson.settings.jsonFile.hoursList ;
      params.append("objectkey",jsonS3Path) 
      params.append("raw",'json') 
      return this.http.get(url+params);
  }
  getJobs():Observable<any>{
      let url = utils.pathPhase6 + "/api/topic-detection/getJobs";
      return this.http.get(url);
  }
  createJobs(save):Observable<any>{
      let url = utils.pathPhase6 + "/api/topic-detection/create";
      return this.http.post(url,save);
  }
  tableheader():Observable<any>{
    // let currentLang=localStorage.getItem("language");
    // let url = "../assets/json-files/settings/topic-detection/table-header/" + currentLang + "-tableHeader.json"
    // return this.httpLocal.get(url)
      let currentLang=localStorage.getItem("language");
      let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
      let params = new URLSearchParams();
      let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.topicDetect + '/' +JsonPath.configJson.settings.path.tableHead + '/' + currentLang +"-tableHeader.json";
      params.append("objectkey",jsonS3Path) 
      params.append("raw",'json') 
      return this.http.get(url+params);
  }
}