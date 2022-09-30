import { Injectable } from '@angular/core';
import { EvaluationModel } from './evaluation-forms.model';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { AsyncSubject, Observable } from 'rxjs';
import { utils } from '../../../config';
import * as JsonPath from '../../../JsonPath';
@Injectable({
  providedIn: 'root'
})
export class EvaluationFormsService {
httpLocal:any;
public evalotionModel:EvaluationModel
public getModerator = new AsyncSubject();
  constructor(private http:HttpClient,private handler: HttpBackend ) {
    this.httpLocal = new HttpClient(handler);
    this.evalotionModel=new EvaluationModel();
    // this.jsonPath = new configJson();
  }

  getThemeItems():Observable<any>{
    let url=utils.pathPhase+"/api/strategy";
    return this.http.get(url)
  }

  getQuestionDropDownList(): Observable<any> {
    // let currentLang=localStorage.getItem("language");
    // if( currentLang == 'spanish')
    // {
    //   return this.httpLocal.get("../assets/json-files/evaluvation/questions_spanish.json");
    // }
    // else if( currentLang == 'portuguese'){
    //   return this.httpLocal.get("../assets/json-files/evaluvation/questions_portuguese.json");
    // }
    // else{
    //   return this.httpLocal.get("../assets/json-files/evaluvation/questions.json");
    // }
    let currentLang=localStorage.getItem("language");
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.evaluation.path.evaluation +'/'+JsonPath.configJson.evaluation.path.evaluationforms + '/' + currentLang+'-questions.json';
    params.append("objectkey",jsonS3Path) 
    params.append("raw",'json') 
    return this.http.get(url+params);
  }

  postEvaluation(evaluationModel):Observable<any>{
    let url=utils.pathPhase3+"/api/evaluationRoom"
    return this.http.post(url,evaluationModel)
  }

  evaluationUpdate(evaluateItem):Observable<any>{
    let url=utils.pathPhase3+"/api/evaluationRoom/" + evaluateItem.evaluationId;
    return this.http.put(url,evaluateItem)
  }
  getEvaluation():Observable<any>{
    let url=utils.pathPhase3+"/api/evaluationRoom";
    return this.http.get(url)
  }

  getChangeTheme(selectedStrategy):Observable<any>{
    let url=utils.pathPhase3+"/api/getStrategyItems/" + selectedStrategy
    return this.http.get(url)
  }

  getChangeEditTheme(evaluationModel):Observable<any>{
    let url=utils.pathPhase3+"/api/getStrategyItems/" + evaluationModel.strategyId
    return this.http.get(url)
  }

  deleteEvalutionForm(evaluateItem):Observable<any>{
    let url = utils.pathPhase3 + "/api/evaluationRoom/" + evaluateItem.evaluationId;
    return this.http.delete(url);
  }

  userEvaluatorDDL():Observable<any>{
  let url = utils.pathPhase10 + "/api/users/UserDropdown"
  return this.http.get(url)
  }

  getHydrationDropDownList():Observable<any>{
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.evaluation.path.evaluation +'/'+JsonPath.configJson.evaluation.path.evaluationforms + '/' + JsonPath.configJson.evaluation.path.hydrationconditions + '/' + JsonPath.configJson.evaluation.jsonFile.callhydrationconditions;
    params.append("objectkey",jsonS3Path) 
    params.append("raw",'json') 
    return this.http.get(url+params);
  }

  getConfigFormDossierIdList(configFormDossierId):Observable<any>{
    // let url=utils.version_Path15+"/api/getQMFormConfig?"
    let url=utils.version_Path15+"/api/getQMFormConfigList?"
    let params = new URLSearchParams();
    params.append("platformId",configFormDossierId);
    return this.http.get(url);
  }

  getConfigFormDossierId(evaluationSKId):Observable<any>{
    // let url=utils.version_Path15+"/api/getQMFormConfig?"
    let url=utils.version_Path15+"/api/getQMFormConfig?"
    let params = new URLSearchParams();
    params.append("SK",evaluationSKId);
    return this.http.get(url+params);
  }

}
 