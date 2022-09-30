import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";


@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  httpLocal: any;
  
  constructor(private http: HttpClient, private handler: HttpBackend, ) {
    this.httpLocal = new HttpClient(handler);
    
  }
  url: string = "";


getCustomerPool(): Observable<any>{
    let url = utils.pathPhase + "/api/getCustomerPoolUser";
    return this.http.get(url);
}
updatePoolUser(update): Observable<any>{
    let url = utils.pathPhase + "/api/UpdateRegisteredUser";
    return this.http.post(url,update);
}

}