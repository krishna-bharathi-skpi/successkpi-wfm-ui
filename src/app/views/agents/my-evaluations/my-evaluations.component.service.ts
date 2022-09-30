import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { utils } from '../../../config';
import * as JsonPath from '../../../JsonPath';

@Injectable({
    providedIn: 'root'
})

export class MyEvaluationsService {
    httpLocal: any;
    constructor(private http: HttpClient, private handler: HttpBackend) {
        this.httpLocal = new HttpClient(handler);
    }

    evaluationAcceptDispute(eval_Id, cmt, status): Observable<any> {
        let url = utils.pathPhase3 + "/api/evaluationstatuscreate?";
        let params = new URLSearchParams();
        params.append('evaluation_interactions_id', eval_Id);
        params.append('AgentComments', cmt);
        params.append('DisputeStatus', status);
        return this.http.get(url+params);
    }
}
