import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";
import * as JsonPath from '../../../JsonPath';


@Injectable({
  providedIn: 'root'
})

export class PartitionService {
  httpLocal: any;
  
  constructor(private http: HttpClient, private handler: HttpBackend, ) {
    this.httpLocal = new HttpClient(handler);
  }
  url: string = "";
    getdataPartitionS3():Observable<any>{
      // let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
      // let params = new URLSearchParams();
      // let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.roles + '/' + 'dataAccess.json';
      // params.append("objectkey",jsonS3Path) 
      // params.append("raw",'json') 
      // return this.http.get(url+params);
      let url = utils.version_Path15 + "/api/getConfig/partitionList";
      return this.http.get(url);
    }

    getCustomDataOption(id):Observable<any>{
    // let url = utils.pathPhase12 + "/api/getDataAccess/ddlOptions"
    // return this.http.get(url);
      let url = utils.version_Path15 + "/api/partition/queryCustomValues?";
      let params = new URLSearchParams();
      params.append("platformId",id) 
      return this.http.get(url+params);
    }

    // sendDataTOmstr(data):Observable<any>{
    // let url = utils.pathPhase12 + "/api/getDataAccess/mstrReport"
    // return this.http.post(url,data);
    // }
  
  savePartition(data):Observable<any>{
    let url = utils.version_Path15 + "/api/partition/create";
    return this.http.post(url,data);
  }

  updatePartition(data):Observable<any>{
    let url = utils.version_Path15 + "/api/partition/update/" + data.partitionId;
    return this.http.put(url,data);
  }
  
  deletePartition(data):Observable<any>{
    let url =  utils.version_Path15 + "/api/partition/delete/"+ data.partitionId;
    return this.http.delete(url);
  }
  
  getPartitionDB():Observable<any>{
    let url =  utils.version_Path15 + "/api/partition/getList";
    return this.http.get(url);
  }

}