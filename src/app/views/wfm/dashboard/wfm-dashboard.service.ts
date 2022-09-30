import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";

@Injectable({
  providedIn: 'root'
})
export class WfmDashboardService {
  httpLocal: any;

  constructor(private http: HttpClient, private handler: HttpBackend,) {
    this.httpLocal = new HttpClient(handler);
  }
  url: string = "";

  getForecastDataList(model): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/forecast/list";
    return this.http.post(url, model);
  }

  createForecast(createModel): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/forecast/create";
    return this.http.post(url, createModel);
  }

  getEndDate(): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/forecast/get/enddateepoch";
    return this.http.get(url);
  }

  getForecast(forecastRequestId): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/forecast/get/" + forecastRequestId;
    return this.http.get(url);
  }
  
}
