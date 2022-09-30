import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";
import * as JsonPath from '../../../JsonPath';

@Injectable({
  providedIn: 'root'
})

export class HelpService {
  httpLocal: any;
  
  constructor(private http: HttpClient, private handler: HttpBackend, ) {
    this.httpLocal = new HttpClient(handler);
    
  }
  url: string = "";

//  Home Help Service
getS3HomeHelp(): Observable<any>{
    let currentLang=localStorage.getItem("language");
    let url = utils.pathPhase10 + "/api/help/get-authorized-help?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.help.path.help +'/'+JsonPath.configJson.help.path.homeHelp + '/' + currentLang+'-home-help.html';
    params.append("objectkey",jsonS3Path) 
    return this.http.get(url+params,{responseType: 'text'});
}

//  Analyze Help Service
getS3AnalyzeHelp(): Observable<any>{
  let currentLang=localStorage.getItem("language");
  let url = utils.pathPhase10 + "/api/help/get-authorized-help?"
  let params = new URLSearchParams();
  let jsonS3Path = JsonPath.configJson.help.path.help +'/'+JsonPath.configJson.help.path.analyzeHelp + '/' + currentLang+'-analyze-help.html';
  params.append("objectkey",jsonS3Path) 
  return this.http.get(url+params,{responseType: 'text'});
}

//  Evaluate Help Service
getS3EvaluateHelp(): Observable<any>{
  let currentLang=localStorage.getItem("language");
  let url = utils.pathPhase10 + "/api/help/get-authorized-help?"
  let params = new URLSearchParams();
  let jsonS3Path = JsonPath.configJson.help.path.help +'/'+JsonPath.configJson.help.path.evaluateHelp + '/' + currentLang+'-evaluation-help.html';
  params.append("objectkey",jsonS3Path) 
  return this.http.get(url+params,{responseType: 'text'});
}

//  Playbooks Help Service
getS3PlaybookHelp(): Observable<any>{
  let currentLang=localStorage.getItem("language");
  let url = utils.pathPhase10 + "/api/help/get-authorized-help?"
  let params = new URLSearchParams();
  let jsonS3Path = JsonPath.configJson.help.path.help +'/'+JsonPath.configJson.help.path.playbookHelp + '/' + currentLang+'-playbooks-help.html';
  params.append("objectkey",jsonS3Path) 
  return this.http.get(url+params,{responseType: 'text'});
}


}