import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";
import * as JsonPath from '../../../JsonPath';

@Injectable({
  providedIn: 'root'
})

export class ScheduleImportService {
  httpLocal: any;
  
  constructor(private http: HttpClient, private handler: HttpBackend ) {
    this.httpLocal = new HttpClient(handler);
    
  }
  url: string = "";
  createImportSchedule(model): Observable<any> {

    this.url = utils.pathPhase12 + "/api/scheduleImport";
    return this.http.post(this.url, model);
  }
  getImportSchedules() {
    this.url = utils.pathPhase12 + "/api/scheduleImportScan";
    return this.http.get(this.url);
  }
  deleteImportSchedule(ScheduleID): Observable<any> {
    this.url = utils.pathPhase12 + "/api/scheduleImport/" + ScheduleID
    return this.http.delete(this.url);
  }
  updateImportSchedule(ScheduleID, model): Observable<any> {
    this.url = utils.pathPhase12 + "/api/scheduleImport/" + ScheduleID
    return this.http.put(this.url, model)
  }
  s3ImportScheduleScript(): Observable<any> {
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.jsonFile.s3ScriptScheduleImport;
    params.append("objectkey", jsonS3Path)
    params.append("raw", 'json')
    return this.http.get(url + params);
  }

  getAwsRegions(): Observable<any> {
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.platformSettings + '/' + JsonPath.configJson.settings.path.amazon + '/' + JsonPath.configJson.jsonFile.awsRegions;
    params.append("objectkey", jsonS3Path)
    params.append("raw", 'key')
    return this.http.get(url + params);
  }

  getMaxScheduleImportLimit() {
    this.url = utils.pathPhase12 + "/api/scheduleImportLimitGet";
    return this.http.get(this.url);
  }
}