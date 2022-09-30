import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";

@Injectable({
  providedIn: 'root'
})
export class serviceLevelService {
  httpLocal: any;
  serviceLevelData: any = [];

  constructor(private http: HttpClient, private handler: HttpBackend,) {
    this.httpLocal = new HttpClient(handler);
  }

  url: string = "";

  getServiceLevelList(serviceLevelModel): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/servicelevel/query";
    // let url = utils.wfmPathPhase1 + "/api/servicelevel/query?pageNo=" + pagination.pageNo + "&pageSize=" + pagination.pageSize + "";
    return this.http.post(url, serviceLevelModel);
  }

  getServiceLevelDetail(serviceLevelId): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/servicelevel/get/" + serviceLevelId + "";
    return this.http.get(url);
  }

  createServiceLevel(createModel): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/servicelevel/create";
    return this.http.post(url, createModel);
  }

  updateServiceLevel(updateModel): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/servicelevel/update/" + updateModel[1].serviceLevelId;
    return this.http.put(url, updateModel[0]);
  }

  deleteServiceLevel(serviceLevelId): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/servicelevel/delete/" + serviceLevelId;
    return this.http.delete(url, serviceLevelId);
  }

  alignWfmContainer() {
    if ($("app-sidebar-nav").hasClass("ps")) {
      $('.wfm').css('margin-left', '0px');
    } else {
      $('.wfm').css('margin-left', '-30px');
    }
  }

  secondsToHms(seconds) {

    let d = Number(seconds);

    if (d <= 0) {

      return '00:00:00'

    } else {
      let h = Math.floor(d / 3600);
      let m = Math.floor(d % 3600 / 60);
      let s = Math.floor(d % 3600 % 60);

      let hDisplay = h <= 9 ? '0' + h + ':' : h + ":";
      let mDisplay = m <= 9 ? '0' + m + ':' : m + ":";
      let sDisplay = s <= 9 ? '0' + s : s;

      return hDisplay + mDisplay + sDisplay;
    }
  }

  hourOptions = [
    { value: '00', label: '00' },
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' },
    { value: '04', label: '04' },
    { value: '05', label: '05' },
    { value: '06', label: '06' },
    { value: '07', label: '07' },
    { value: '08', label: '08' },
    { value: '09', label: '09' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' }
  ]

  TwelvehourOptions = [
    { value: '00', label: '00' },
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' },
    { value: '04', label: '04' },
    { value: '05', label: '05' },
    { value: '06', label: '06' },
    { value: '07', label: '07' },
    { value: '08', label: '08' },
    { value: '09', label: '09' },
    { value: '10', label: '10' },
    { value: '11', label: '11' }
  ]

  timeOptions = [
    { value: '00', label: '00' },
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' },
    { value: '04', label: '04' },
    { value: '05', label: '05' },
    { value: '06', label: '06' },
    { value: '07', label: '07' },
    { value: '08', label: '08' },
    { value: '09', label: '09' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
    { value: '26', label: '26' },
    { value: '27', label: '27' },
    { value: '28', label: '28' },
    { value: '29', label: '29' },
    { value: '30', label: '30' },
    { value: '31', label: '31' },
    { value: '32', label: '32' },
    { value: '33', label: '33' },
    { value: '34', label: '34' },
    { value: '35', label: '35' },
    { value: '36', label: '36' },
    { value: '37', label: '37' },
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },
    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' },
    { value: '45', label: '45' },
    { value: '46', label: '46' },
    { value: '47', label: '47' },
    { value: '48', label: '48' },
    { value: '49', label: '49' },
    { value: '50', label: '50' },
    { value: '51', label: '51' },
    { value: '52', label: '52' },
    { value: '53', label: '53' },
    { value: '54', label: '54' },
    { value: '55', label: '55' },
    { value: '56', label: '56' },
    { value: '57', label: '57' },
    { value: '58', label: '58' },
    { value: '59', label: '59' }
  ]
  

}