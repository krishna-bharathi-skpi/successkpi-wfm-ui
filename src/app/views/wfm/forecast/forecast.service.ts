import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  httpLocal: any;
  forecastData: any = [];

  constructor(private http: HttpClient, private handler: HttpBackend,) {
    this.httpLocal = new HttpClient(handler);
  }
  url: string = "";

  getForecastList(model): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/forecast/list";
    // let url = utils.wfmPathPhase1 + "/api/forecast/list?pageNo=" + pagination.pageNo + "&pageSize=" + pagination.pageSize + "";
    return this.http.post(url, model);
  }

  getMstrInstance(model): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/forecast/mstr/createInstance";
    return this.http.post(url, model);
  }

  getGridData(model): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/forecast/grid";
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

  updateForecast(updateModel): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/forecast/update/" + updateModel[1].staffingRequestId;
    return this.http.put(url, updateModel[0]);
  }

  publishForecast(model): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/forecast/update_status/" + model[1].staffingRequestId;
    return this.http.put(url, model[0]);
  }

  deleteForecast(staffingRequestId): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/forecast/delete/" + staffingRequestId;
    return this.http.delete(url, staffingRequestId);
  }

  getQueueList(model): Observable<any> {
    // let url = utils.wfmPathPhase1 + `/api/forecast/get/queue/${model.wfmConfigId}`;
    let url = utils.wfmPathPhase1 + `/api/forecast/get/queue/${model.wfmConfigId}?isFrequent=${model.isFrequent}`;
    return this.http.get(url);
  }

  getWfmConfigId(): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/forecast/get/wfmConfig";
    return this.http.get(url);
  }

  getServiceLevelOptions(model): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/servicelevel/ddl/${model.wfmConfigId}/${model.mediaType}`;
    // let url = utils.wfmPathPhase1 + "/api/servicelevel/ddl/" + wfmConfigId + "";
    return this.http.get(url);
  }

  getForecastingData(params, model): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/forecast/post/fcstgriddata/" + model.wfmConfigId + '/' + model.staffingRequestId;
    // let url = utils.wfmPathPhase1 + "/api/forecast/get/fcstgriddata/" + model.wfmConfigId + '/' + model.staffingRequestId + "?pageNo=" + model.pageNo + "&pageSize=" + model.pageSize + "";
    return this.http.post(url, params);
  }

  updateForecastingData(model): Observable<any> {
    // let url = utils.wfmPathPhase1 + "/api/forecast/mstr/gridupdate";
    // return this.http.post(url, model);
    let url = utils.wfmPathPhase1 + "/api/forecast/update/mstrgridupdate";
    return this.http.put(url, model);
  }

  alignWfmContainer() {
    if ($("app-sidebar-nav").hasClass("ps")) {
      $('.wfm').css('margin-left', '0px');
    } else {
      $('.wfm').css('margin-left', '-30px');
    }
  }
  
}
