import { Injectable } from '@angular/core';
import * as Rx from "rxjs-compat/Rx";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import utils from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class RealTimeService {

  constructor(private http:HttpClient) { }

  private subject: Rx.Subject<MessageEvent>;
  private ws: any;

  public connect(url): Rx.Subject<MessageEvent>{
    if(!this.subject){
      this.subject = this.create(url);
      // console.log("Successfully Connected "+url);
    }
    return this.subject;
  }
  private create(url): Rx.Subject<MessageEvent> {
    this.ws = new WebSocket(url);

    let observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
      this.ws.onmessage = obs.next.bind(obs);
      this.ws.onerror=obs.error.bind(obs);
      this.ws.onclose = obs.complete.bind(obs);

      return this.ws.close.bind(this.ws);
    });
    let observer = {
      next: (data: Object) => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      }
    };
    return Rx.Subject.create(observer, observable);
  }

  
  public close() {
    this.ws.close()
    this.subject = null
  }
  
  getLoadedKibanaData(customerID):Observable<any>{
    let url= utils.realtime + "/api/getReportFromKibana?";
    let params = new URLSearchParams();
    params.append("customerID",customerID)
    return this.http.get(url+params)
  }
}