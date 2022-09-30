import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";
import * as JsonPath from '../../../JsonPath';


@Injectable({
  providedIn: 'root'
})

export class PlatformService {
  httpLocal: any;
  
  constructor(private http: HttpClient, private handler: HttpBackend, ) {
    this.httpLocal = new HttpClient(handler);
    
  }
  url: string = "";
//   getEmployee(): Observable<any> {
//     this.url = "http://dummy.restapiexample.com/api/v1/employees"
//     return this.http.get(this.url);
//   }jsonFile.platformList
getContactCenter():Observable<any>{
  // return this.httpLocal.get("../../../../assets/json-files/settings/platform.json");
  let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
  let params = new URLSearchParams();
  let jsonS3Path = JsonPath.configJson.jsonFile.platformList;
  params.append("objectkey",jsonS3Path) 
  params.append("raw",'json') 
  return this.http.get(url+params);
}
getGenesysRegions():Observable<any> {
    let currentLang=localStorage.getItem("language");
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.platformSettings + '/' + JsonPath.configJson.settings.path.genesys + '/' + JsonPath.configJson.jsonFile.genesysRegion;
    params.append("objectkey",jsonS3Path) 
    params.append("raw",'key') 
    return this.http.get(url+params);
}
getLanguages():Observable<any>{
    // let url = utils.pathPhase6 + "/api/s3bucket/getLanguages";  
    // return this.http.get(url);
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.jsonFile.languagesList;
    params.append("objectkey",jsonS3Path) 
    params.append("raw",'key') 
    return this.http.get(url+params);
}
getDataLocations():Observable<any>{
  // let url = "../assets/json-files/settings/amazon-connect/data-source.json";
  // return this.httpLocal.get(url);
    let currentLang=localStorage.getItem("language");
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.platformSettings + '/' + JsonPath.configJson.settings.path.amazon + '/' + currentLang+"-data_locations.json";
    params.append("objectkey",jsonS3Path) 
    params.append("raw",'key') 
    return this.http.get(url+params);
}
getPlatforms():Observable<any>{
    let url = utils.pathPhase3 + "/api/vendorsetting/getVendorSettings";
    return this.http.get(url);
}
updateGenesys(platformModel):Observable<any>{
  let url = utils.pathPhase3 + "/api/vendorsetting/updateGenesysPureCloud/" +  platformModel.configId;
  return this.http.put(url,platformModel)
}
saveGenesys(save):Observable<any>{
  let url = utils.pathPhase3 + "/api/vendorsetting/createGenesyPureCloud";
  return this.http.post(url,save)
}
deletePlatform(platformModel):Observable<any>{
  let url = utils.version_Path15 + "/api/vendorsetting/invokeDeleteCXCenter/" + platformModel.configId;
  return this.http.delete(url);
}
updateAmazon(platformModel):Observable<any>{
  let url = utils.pathPhase3 + "/api/vendorsetting/updateVendorSettings/" + platformModel.configId;
  return this.http.put(url,platformModel)
}

saveAmazon(save):Observable<any>{
  let url = utils.pathPhase3 + "/api/vendorsetting/createvendorsetting";
  return this.http.post(url,save)
}

getTextdataLocation(Pid):Observable<any>{
    let currentLang=localStorage.getItem("language");
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path =  JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.platformSettings + '/' + JsonPath.configJson.settings.path.others + '/' + currentLang+"-text_data_locations.json";
    params.append("objectkey",jsonS3Path) 
    params.append("raw",'textlocation') 
    params.append("pId", Pid) 
    return this.http.get(url+params);
}
updateOtherContactCenters(platformModel):Observable<any>{
  let url =  utils.pathPhase3 + "/api/vendorsetting/updateOthersContactCenter/" + platformModel.configId;
  return this.http.put(url,platformModel)
}
saveOtherContactCenter(save):Observable<any>{
  let url = utils.pathPhase3 + "/api/vendorsetting/createOthersContactCenter";
  return this.http.post(url,save)
}
updateTextAnalytics(platformModel):Observable<any>{
  let url = utils.pathPhase6 + "/api/text-analytics/updateTextAnalytics/" + platformModel.configId;
  return this.http.put(url,platformModel);
}
saveTextAnalytics(save):Observable<any>{
  let url = utils.pathPhase6 + "/api/text-analytics/saveTextAnalytics";
  return this.http.post(url,save)
}
updateLivevox(platformModel,urls):Observable<any>{
  let url =  utils.version_Path15 + urls;
  return this.http.post(url,platformModel)
}
updateLivevoxRules(platformModel):Observable<any>{
  let url =  utils.version_Path15 + "/api/platformSettings/updateLivevoxCXRule";
  return this.http.post(url,platformModel)
}
updateAvaya(platformModel,urls):Observable<any>{
  let url =  utils.version_Path15 + urls;
  return this.http.post(url,platformModel)
}
updateAvayaRules(platformModel):Observable<any>{
  let url =  utils.version_Path15 + "/api/platformSettings/updateAvayaCXRule";
  return this.http.post(url,platformModel)
}

s3Script():Observable<any>{
  let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
  let params = new URLSearchParams();
  let jsonS3Path = JsonPath.configJson.jsonFile.s3Script;
  params.append("objectkey",jsonS3Path) 
  params.append("raw",'json') 
  return this.http.get(url+params);
  }
getTimeZones(): Observable<any> {
  let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
  let params = new URLSearchParams();
  let jsonS3Path = JsonPath.configJson.jsonFile.timeZones;
  params.append("objectkey", jsonS3Path)
  params.append("raw", 'key')
  return this.http.get(url + params);
  }

  updateUjet(platformModel): Observable<any> {
    let url = utils.pathPhase3 + "/api/vendorsetting/updateUjetContactCenter/" + platformModel.configId;
    return this.http.put(url, platformModel)
  }
  saveUjet(save): Observable<any> {
    let url = utils.pathPhase3 + "/api/vendorsetting/createUjetContactCenter";
    return this.http.post(url, save)
  }
  getAwsRegions(): Observable<any> {
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.platformSettings + '/' + JsonPath.configJson.settings.path.amazon + '/' + JsonPath.configJson.jsonFile.awsRegions;
    params.append("objectkey", jsonS3Path)
    params.append("raw", 'key')
    return this.http.get(url + params);
  }

  updateTalkDesk(platformModel): Observable<any> {
    let url = utils.version_Path15 + "/api/vendorsetting/updateTalkdeskContactCenter/" + platformModel.configId;
    return this.http.put(url, platformModel)
  }
  saveTalkDesk(save): Observable<any> {
    let url = utils.version_Path15 + "/api/vendorsetting/createTalkdeskContactCenter";
    return this.http.post(url, save)
  }
  getDomainURLsLivevox():Observable<any>{
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.jsonFile.domainurlLivevox;
    params.append("objectkey",jsonS3Path) 
    params.append("raw",'json') 
    return this.http.get(url+params);
  }
}