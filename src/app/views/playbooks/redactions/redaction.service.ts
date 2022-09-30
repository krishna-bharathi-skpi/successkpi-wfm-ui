import { Injectable } from '@angular/core';
import { Redactionmodel } from './redaction.model';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { utils } from '../../../config';
import { Observable, of, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RedactionService {
public reactionModel:Redactionmodel;
httpLocal:any;
  constructor(private http:HttpClient, private handler:HttpBackend) {
    // this.httpLocal= new HttpClient(handler);
    this.reactionModel=new Redactionmodel();
   }
   url: string = "";

   redactionPost(redactionPost):Observable<any>{
     let url=utils.pathPhase6+"/api/redaction/saveredaction";
     return this.http.post(url,redactionPost);
   }

   getRedaction():Observable<any> {
     let url=utils.pathPhase6+"/api/redaction/getRedaction";
     return this.http.get(url);

   }
}
