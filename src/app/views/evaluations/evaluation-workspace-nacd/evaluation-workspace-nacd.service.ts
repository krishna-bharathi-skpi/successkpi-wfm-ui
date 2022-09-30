import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { utils } from '../../../config';
import * as JsonPath from '../../../JsonPath';

@Injectable({
    providedIn: 'root'
})

export class EvaluationWorkspaceNacdService {
    httpLocal: any;
    constructor(private http: HttpClient, private handler: HttpBackend) {
        this.httpLocal = new HttpClient(handler);
    }


    getEvaluationWorkspaceReport(reqObj): Observable<any> {
        let url = utils.pathPhase3 + "/api/evaluate/" + reqObj.mstrAuthToken
        return this.http.post(url, reqObj.body);
    }

    getEvaluationForms() {
        let url = utils.pathPhase3 + "/api/evaluationRoom"
        return this.http.get(url)
    }
    getTranscribeData(currentContact): Observable<any> {
        let url = utils.pathPhase6 + "/api/transcribe/gettranscribecsv?" + "contactId=" + currentContact;
        return this.http.get(url)
    }

    getEvaluateObj(s3Url): Observable<any> {
        let url = utils.pathPhase3 + "/api/s3accesspermission?" + "url=" + s3Url
        return this.http.get(url);
    }

    evaluationWorkSpaceSave(evaluatesaveModel): Observable<any> {
        let url = utils.pathPhase3 + "/api/redshift";
        return this.http.post(url, evaluatesaveModel)
    }
    evaluationTabs(): Observable<any> {
        // return this.httpLocal.get("../../../../assets/json-files/evaluvation/evaluation-workspace/tabMenu.json");
        let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
        let params = new URLSearchParams();
        let jsonS3Path = JsonPath.configJson.evaluation.path.evaluation + '/' + JsonPath.configJson.evaluation.path.evluationworkspace + '/' + JsonPath.configJson.evaluation.jsonFile.tabMenu;
        params.append("objectkey", jsonS3Path)
        params.append("raw", 'json')
        return this.http.get(url + params);
    }

    getPrePeaks(): Observable<any> {
        return this.httpLocal.get("../../../../assets/audioscript/wavesurfer-peaks.json");
    }

    saveNotes(saveNote): Observable<any> {
        let url = utils.pathPhase11 + "/api/createInteractionNotes";
        return this.http.post(url, saveNote);
    }

    getNotes(convID): Observable<any> {
        let url = utils.pathPhase11 + "/api/getinteractionnotes?";
        let params = new URLSearchParams();
        params.append('conversationid', convID);
        return this.http.get(url + params);
    }

    deleteNotes(convID, id): Observable<any> {
        let url = utils.pathPhase11 + "/api/deleteInteractionNotes?";
        let params = new URLSearchParams();
        params.append('conversationid', convID),
            params.append('id', id)
        return this.http.delete(url + params);
    }	
    
    getEvaluationAns(convID, eval_Id, userID, eval_Room, evaluation_interactions_id): Observable<any> {
        let url = utils.pathPhase3 + "/api/getEvalutionItemsWithAnswer?";
        let params = new URLSearchParams();
        params.append('conversationid', convID),
        params.append('evaluation_id', eval_Id),
        params.append('userid', userID),
        params.append('eva_room', eval_Room)
        params.append('evaluation_interactions_id', evaluation_interactions_id)
        return this.http.get(url+params);
    }

    getEvalutionDetail(convID, eval_Id, userID, eval_Room, isnonacd): Observable<any> {
        let url = utils.pathPhase3 + "/api/getEvalutionDetail?";
        if (isnonacd && (convID == undefined ||  convID == null)) {
        // if (convID.includes('NON-ACD')) {
            userID = null;
        }
        let params = new URLSearchParams();
        params.append('conversationid', convID),
        params.append('evaluation_id', eval_Id),
        params.append('userid', userID),
        params.append('eva_room', eval_Room),
        params.append('isnonacd', isnonacd)
        return this.http.get(url + params);
    }

    saveCoachDetails(saveDetails): Observable<any> {
        let url = utils.pathPhase3 + "/api/coachingsave";
        return this.http.post(url, saveDetails);
    }

    resetEvalData(eval_Id, type): Observable<any> {
        let url = utils.pathPhase3 + "/api/evaluationreset?";
        let params = new URLSearchParams();
        params.append('evaluation_interactions_id', eval_Id);
        params.append('Type', type);
        return this.http.get(url+params);
    }
    getMSTRInstance(data):Observable<any>{
        let url = utils.version_Path15 + "/api/microstrategy/createInstance";
        return this.http.post(url,data);
    }
    
    mstrValidToken(mstrToken):Observable<any>{
        let url = utils.version_Path15 + "/api/microstrategy/validIdToken";
        return this.http.post(url,mstrToken);
    }

    getMediaUrl(conversationID):Observable<any> {
        let url = utils.pathPhase3 + "/api/getMediaUrl?";
        let params = new URLSearchParams();
        params.append('conversationsId', conversationID);
        return this.http.get(url+params);
    }

    // sendDataTOmstr(data):Observable<any>{
    //     let url = utils.version_Path15 + "/api/dataPartition/applyFiltersMSTR"
    //     return this.http.post(url,data);
    // }
    
    // getMSTRInstanceID(data):Observable<any>{
    //     let url = utils.version_Path15 + "/api/partitionFilter/mstrInstanceID"
    //     return this.http.post(url,data);
    // }


    getManageDisputeEvaluationDetail(eval_Id): Observable<any> {
        let url = utils.version_Path15 + "/api/getManageDisputeEvaluationDetail?";
        let params = new URLSearchParams();
        // params.append('conversationid', convID),
        params.append('evaluation_id', eval_Id)
        // params.append('userid', userID),
        // params.append('eva_room', eval_Room)
        return this.http.get(url + params);
    }

    getCoachingWorkspaceEvalutionDetail(convID, eval_Id, userID, eval_Room, isnonacd): Observable<any> {
        let url = utils.pathPhase3 + "/api/getEvalutionDetail?";
        let params = new URLSearchParams();
        params.append('conversationid', convID),
        params.append('evaluation_id', eval_Id),
        params.append('userid', userID),
        params.append('eva_room', eval_Room),
        params.append('isnonacd', isnonacd)
        return this.http.get(url + params);
    }
}
