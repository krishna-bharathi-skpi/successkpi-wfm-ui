import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";


@Injectable({
  providedIn: 'root'
})

export class UserService {
  httpLocal: any;
  
  constructor(private http: HttpClient, private handler: HttpBackend, ) {
    this.httpLocal = new HttpClient(handler);
    
  }
  url: string = "";
//   getEmployee(): Observable<any> {
//     this.url = "http://dummy.restapiexample.com/api/v1/employees"
//     return this.http.get(this.url);
//   }
getUsers(): Observable<any>{
    let url = utils.pathPhase + "/api/GetAdminUsers";
    return this.http.get(url);
}
getCustomerPool(): Observable<any>{
    let url = utils.pathPhase + "/api/getCustomerPoolUser";
    return this.http.get(url);
}
updateUser(updateModel): Observable<any>{
    let url = utils.pathPhase + "/api/AddUsersUpdate";
    return this.http.put(url,updateModel);
}
updatePoolUser(update): Observable<any>{
    let url = utils.pathPhase + "/api/UpdateRegisteredUser";
    return this.http.post(url,update);
}
deleteUser(userUpdateModel): Observable<any>{
    // let deleteType = typeof (userUpdateModel.cognitoSsoUserName) != 'undefined' && userUpdateModel.cognitoSsoUserName != null ? userUpdateModel.cognitoSsoUserName : "null";
    // deleteType = btoa(deleteType);
    // let url = utils.pathPhase + "/api/DeleteUser/" + userUpdateModel.userId + '?email='+userUpdateModel.email + '&cognitoSsoUserName=' +deleteType;
    // return this.http.delete(url);
    
  let deleteType = typeof (userUpdateModel.cognitoSsoUserName) != 'undefined' && userUpdateModel.cognitoSsoUserName != null ? userUpdateModel.cognitoSsoUserName : "null";
  deleteType = btoa(deleteType);
  // console.log(deleteType);
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: {
      cognitoSsoUserName: deleteType,
      email: userUpdateModel.email,
    }
  }
// console.log(options);

  let url = utils.pathPhase + "/api/DeleteUser/" + userUpdateModel.userId;
  return this.http.delete(url,options);
}
saveUser(save): Observable<any>{
    let url = utils.authPath + "/api/users/addusers";
    return this.http.post(url,save)
}
getRoleDDL(): Observable<any>{
  let url =  utils.pathPhase10 + "/api/roles/RolesDropDown";
  return this.http.get(url);
}

importUsers(data): Observable<any>{
  let url = utils.authPath + "/api/users/importUsers";
  return this.http.post(url,data)
}

getPartitionDDL(){
  let url =  utils.version_Path15 + "/api/partition/dropdownList";
  return this.http.get(url);
}

syncUserDetails(data){
  let url = utils.version_Path15 + "/api/sync-cognito";
  return this.http.post(url,{customerId: data})
}

resendConfirmation(data): Observable<any>{
  let url = utils.version_Path15 + "/api/resend-verification-link";
  return this.http.post(url,data)
}

// resetPassword(data): Observable<any>{
//   let url = utils.version_Path15 + "/api/resend-verification-link";
//   return this.http.post(url,data)
// }
}