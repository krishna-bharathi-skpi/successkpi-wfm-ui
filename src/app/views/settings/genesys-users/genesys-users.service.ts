import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";


@Injectable({
  providedIn: 'root'
})

export class GenesysUserService {
  httpLocal: any;
  
  constructor(private http: HttpClient, private handler: HttpBackend, ) {
    this.httpLocal = new HttpClient(handler);
    
  }
  url: string = "";


  saveUser(save): Observable<any>{
    let url = utils.authPath + "/api/gusers/add-genesys-users";
    return this.http.post(url,save)
  }

  searchEmailFromGenesys(data){
    let url = utils.authPath + "/api/gusers/validate-genesys-users";
    return this.http.post(url,data)
  }
  importUsers(data): Observable<any>{
    let url = utils.authPath + "/api/gusers/importGenesysUsers";
    return this.http.post(url,data)
  }
  
}