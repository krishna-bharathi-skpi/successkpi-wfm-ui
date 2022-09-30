import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";
import * as JsonPath from '../../../JsonPath';


@Injectable({
  providedIn: 'root'
})

export class AIMLService {
  httpLocal: any;
  
  constructor(private http: HttpClient, private handler: HttpBackend, ) {
    this.httpLocal = new HttpClient(handler);
  }
  url: string = "";

  saveAIScoring(data):Observable<any>{
    let url = utils.pathPhase14 + "/api/aiscoring/addmodel";
    return this.http.post(url,data);
  }

  updateAIScoring(data):Observable<any>{
    let url = utils.pathPhase14 + "/api/aiscoring/updatemodel";
    return this.http.post(url,data);
  }
  
  deleteAIScoring(data):Observable<any>{
    let url =  utils.pathPhase14 + "/api/partition/delete/"+ data.partitionId;
    return this.http.delete(url);
  }
  
  getAIScoring():Observable<any>{
    let url =  utils.pathPhase14 + "/api/aiscoring/getmodel";
    return this.http.get(url);
  }

  makeActiveVersion(data): Observable<any>{
    let url = utils.pathPhase14 + "/api/aiscoring/activeModel";
    return this.http.post(url,data);
  }

}