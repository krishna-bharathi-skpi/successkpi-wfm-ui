import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { utils } from '../../../config';
import * as JsonPath from '../../../JsonPath';


@Injectable({
    providedIn: 'root'
})

export class ActionsService {
    httpLocal: any;
    url: string = "";

    constructor(private http: HttpClient, private handler: HttpBackend) {
        this.httpLocal = new HttpClient(handler);
    }

    getActionsItems(): Observable<any> {
        this.url = utils.pathPhase + "/api/CallforAction/cfascan";
        return this.http.get(this.url)
    }

    getActionType(): Observable<any> {
        // let currentLang=localStorage.getItem("language");
        // if( currentLang == 'spanish')
        // {
        // return this.httpLocal.get("../../../../assets/json-files/actions/action-type_spanish.json");
        // }
        // else if( currentLang == 'portuguese'){
        // return this.httpLocal.get("../../../../assets/json-files/actions/action-type_portuguese.json");
        // }
        // else{
        // return this.httpLocal.get("../../../../assets/json-files/actions/action-type.json");
        // }
        let currentLang=localStorage.getItem("language");
        let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
        let params = new URLSearchParams();
        let jsonS3Path = JsonPath.configJson.playbooks.path.playbooks +'/'+JsonPath.configJson.playbooks.path.actions + '/' +JsonPath.configJson.playbooks.path.actionType + '/' + currentLang+'-action-type.json' ;
        params.append("objectkey",jsonS3Path) 
        params.append("raw",'json') 
        return this.http.get(url+params);
       
    }

    actionCreate(actionObj): Observable<any> {
        this.url = utils.pathPhase9 + "/api/action/create";
        return this.http.post(this.url, actionObj)
    }

    getHttpsParameter(): Observable<any> {
        // return this.httpLocal.get("../../../../assets/json-files/actions/https-actiontype.json");
        let currentLang=localStorage.getItem("language");
        let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
        let params = new URLSearchParams();
        let jsonS3Path = JsonPath.configJson.playbooks.path.playbooks +'/'+JsonPath.configJson.playbooks.path.actions + '/' +JsonPath.configJson.playbooks.path.httpType + '/' + currentLang+'-https-actiontype.json' ;
        params.append("objectkey",jsonS3Path) 
        params.append("raw",'json') 
        return this.http.get(url+params);
    }

    getEvaluationItems(): Observable<any> {
        this.url = utils.pathPhase9 + "/api/dropdowns/get_evaluation";
        return this.http.get(this.url)
    }

    actionUpdate(actionObj): Observable<any> {
        this.url = utils.pathPhase9 + "/api/action/update/" + actionObj.callActionId;
        return this.http.put(this.url, actionObj)
    }

    actionDelete(actionObj) {
        this.url = utils.pathPhase9 + "/api/action/delete/" + actionObj.callActionId;
        return this.http.delete(this.url)
    }
}