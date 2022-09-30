import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { utils } from '../../../config';
import * as JsonPath from '../../../JsonPath';
@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
httpLocal:any;
  constructor(private http:HttpClient,private handler: HttpBackend ) {  
    this.httpLocal = new HttpClient(handler);
    // this.jsonPath = new configJson();
  }

  getInteractionDetails(convID,customerID):Observable<any>{
    let url = utils.pathPhase15 + "/api/getevaluationdetail?";
    let params = new URLSearchParams();
    params.append("customerId", customerID)
    params.append("conversationid", convID)
    return this.http.get(url+params)
  }
  
  sendWorkspace(save):Observable<any>{
    let url = utils.pathPhase15 + "/api/Save_evaluation_interactions";
    return this.http.post(url,save)
  }
 

}
 