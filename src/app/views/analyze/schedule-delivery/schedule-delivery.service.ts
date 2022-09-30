import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";
import * as JsonPath from '../../../JsonPath';

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {
  httpLocal: any;
  
  constructor(private http: HttpClient, private handler: HttpBackend ) {
    this.httpLocal = new HttpClient(handler);
    
  }
  url: string = "";
  createSchedule(model): Observable<any> {

    this.url = utils.pathPhase12 + "/api/schedule";
    return this.http.post(this.url, model);
  }
  getSchedules() {
    this.url = utils.pathPhase12 + "/api/scheduleScan";
    return this.http.get(this.url);
  }
  getMaxScheduleLimit(){
    this.url = utils.pathPhase12 + "/api/scheduleLimitGet";
    return this.http.get(this.url);
  }
  deleteSchedule(ScheduleID): Observable<any> {
    this.url = utils.pathPhase12 + "/api/schedule/" + ScheduleID
    return this.http.delete(this.url);
  }
  updateSchedule(ScheduleID, model): Observable<any> {
    this.url = utils.pathPhase12 + "/api/schedule/" + ScheduleID
    return this.http.put(this.url, model)
  }
  s3Script(): Observable<any> {
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.jsonFile.s3ScriptScheduleDelivery;
    params.append("objectkey", jsonS3Path)
    params.append("raw", 'json')
    return this.http.get(url + params);
  }
}