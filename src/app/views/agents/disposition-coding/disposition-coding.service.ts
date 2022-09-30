import { Injectable } from '@angular/core';
// import { EvaluationModel } from './evaluation-forms.model';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { utils } from '../../../config';
import * as JsonPath from '../../../JsonPath';
@Injectable({
  providedIn: 'root'
})
export class  DispositionCodingService {
httpLocal:any;
// public evalotionModel: DispositionCodingModel
  constructor(private http:HttpClient,private handler: HttpBackend ) {  
    this.httpLocal = new HttpClient(handler);
    // this.evalotionModel=new EvaluationModel();
  }

  getThemeItems():Observable<any>{
    let url=utils.pathPhase+"/api/strategy";
    return this.http.get(url)
  }

  getQuestionDropDownList(): Observable<any> {

    let currentLang=localStorage.getItem("language");
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.evaluation.path.evaluation +'/'+JsonPath.configJson.evaluation.path.evaluationforms + '/' + currentLang+'-questions.json';
    params.append("objectkey",jsonS3Path) 
    params.append("raw",'json') 
    return this.http.get(url+params);
  }

  getPreference():Observable<any>{
    let url = utils.pathPhase3 + "/api/getsystem-setting";
    return this.http.get(url);
}

getDispositionCoding():Observable<any>{
  // GET - https://tl7le1zbzl.execute-api.us-east-1.amazonaws.com/dev/api/disposition/getmodel
  // let url =  utils.pathPhase14 + "/api/aiscoring/getmodel";
  let url =  utils.pathPhase16 + "/api/disposition/getmodel";
  return this.http.get(url);
}

saveDispositionCoding(data):Observable<any>{
  // https://tl7le1zbzl.execute-api.us-east-1.amazonaws.com/dev/api/disposition/addmodel
  let url = utils.pathPhase16 + "/api/disposition/addmodel";
  return this.http.post(url,data);
}

updateDispositionCoding(data):Observable<any>{
  // https://tl7le1zbzl.execute-api.us-east-1.amazonaws.com/dev/api/disposition/updatemodel
  let url = utils.pathPhase16 + "/api/disposition/updatemodel";
  return this.http.post(url,data);
}

deleteDispositionCoding(data):Observable<any>{
  let url =  utils.pathPhase16 + "/api/disposition/delete/"+ data.partitionId;
  return this.http.delete(url);
}

makeActiveVersion(data): Observable<any>{
  let url = utils.pathPhase14 + "/api/aiscoring/activeModel";
  return this.http.post(url,data);
}

}
 