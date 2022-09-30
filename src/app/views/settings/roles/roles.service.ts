import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";
import * as JsonPath from '../../../JsonPath';


@Injectable({
  providedIn: 'root'
})

export class RolesService {
  httpLocal: any;
  
  constructor(private http: HttpClient, private handler: HttpBackend, ) {
    this.httpLocal = new HttpClient(handler);
    
  }
  url: string = "";


getRoles():Observable<any>{
    let url = utils.pathPhase10 + "/api/roles/rolesget";
    return this.http.get(url);
}

saveRoles(save):Observable<any>{
    let url = utils.pathPhase10 +"/api/roles/rolescreate";
    return this.http.post(url,save);
}

updateRoles(update):Observable<any>{
    let url = utils.pathPhase10 + "/api/roles/rolesupdate/"+ update.roleId;
    return this.http.put(url,update);
}

deleteRoles(roleModel):Observable<any>{
    let url =  utils.pathPhase10 + "/api/roles/rolesdelete/"+ roleModel.roleId;
    return this.http.delete(url);
}

userPoolRole():Observable<any>{
  let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
  let params = new URLSearchParams();
  let jsonS3Path = JsonPath.configJson.jsonFile.roleAdmin;
  params.append("objectkey",jsonS3Path) 
  params.append("raw",'json') 
  return this.http.get(url+params);
}

getTopAppDDL():Observable<any>{
  let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
  let params = new URLSearchParams();
  let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.roles + '/' + JsonPath.configJson.settings.jsonFile.topAppDDL;
  params.append("objectkey",jsonS3Path) 
  params.append("raw",'json') 
  return this.http.get(url+params);
}

getTopAppObj():Observable<any>{
  let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
  let params = new URLSearchParams();
  let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.roles + '/' + 'app-object.json';
  params.append("objectkey",jsonS3Path) 
  params.append("raw",'json') 
  return this.http.get(url+params);
}

defaultTopApps():Observable<any>{
  let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
  let params = new URLSearchParams();
  let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.roles + '/' + JsonPath.configJson.settings.jsonFile.defaultApps;
  params.append("objectkey",jsonS3Path) 
  params.append("raw",'json') 
  return this.http.get(url+params);
}

getAppLink():Observable<any>{
  let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
  let params = new URLSearchParams();
  let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.roles + '/' + 'app-link.json';
  params.append("objectkey",jsonS3Path) 
  params.append("raw",'json') 
  return this.http.get(url+params);
}

// getdataAccess():Observable<any>{
//   let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
//   let params = new URLSearchParams();
//   let jsonS3Path = JsonPath.configJson.settings.path.setting + '/' + JsonPath.configJson.settings.path.roles + '/' + 'dataAccess.json';
//   params.append("objectkey",jsonS3Path) 
//   params.append("raw",'json') 
//   return this.http.get(url+params);
// }

// getCustomDataOption():Observable<any>{
//   let url = utils.pathPhase12 + "/api/getDataAccess/ddlOptions"
//   return this.http.get(url);
// }

// sendDataTOmstr(data):Observable<any>{
//   let url = utils.pathPhase12 + "/api/getDataAccess/mstrReport"
//   return this.http.post(url,data);
// }
}