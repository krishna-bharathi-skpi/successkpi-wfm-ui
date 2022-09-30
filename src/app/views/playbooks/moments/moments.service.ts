import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";
import * as JsonPath from '../../../JsonPath';

@Injectable({
  providedIn: 'root'
})

export class MomentService {
  httpLocal: any;

  constructor(private http: HttpClient, private handler: HttpBackend, ) {
    this.httpLocal = new HttpClient(handler);
  }

 



  getmomentTypes(): Observable<any> {
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.playbooks.path.playbooks +'/'+JsonPath.configJson.playbooks.path.moments + '/' +JsonPath.configJson.playbooks.jsonFile.momentType;
    params.append("objectkey",jsonS3Path) 
    params.append("raw",'json') 
    return this.http.get(url+params);
  }
  
  getSentimentType(): Observable<any> {
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.playbooks.path.playbooks +'/'+JsonPath.configJson.playbooks.path.moments + '/' +JsonPath.configJson.playbooks.jsonFile.sentimentType;
    params.append("objectkey",jsonS3Path) 
    params.append("raw",'json') 
    return this.http.get(url+params);
  }

  saveMoment(data): Observable<any>{
    let url = utils.version_Path15 + "/api/momentCallAnalytics/createcategory";
    return this.http.post(url,data);
  }

  updateMoment(data):Observable<any>{
    let url = utils.version_Path15 + "/api/momentCallAnalytics/updateCategory/"+ data.momentId;
    return this.http.put(url,data);
  }
  
  deleteMoment(data):Observable<any>{
    let url =  utils.version_Path15 + "/api/momentCallAnalytics/deleteCategory/"+ data.momentId;
    return this.http.delete(url);
  }
  
  getMoment():Observable<any>{
    let url =  utils.version_Path15 + "/api/momentCallAnalytics/getCategoryInfo";
    return this.http.get(url);
  }

  momentActive(data):Observable<any>{
    let url =  utils.version_Path15 + "/api/momentCallAnalytics/momentActive/" + data.momentId
    return this.http.post(url,{ momentActive: data.momentActive});
  }
}