import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { utils } from '../../../config';
import { Observable } from 'rxjs';
import { KeyQuestionsModel } from './key-questions.model';
import { KeyQuestionsComponent } from './key-questions.component';


@Injectable({
  providedIn: 'root'
})
export class KeyQuestionsService {
  private keyQuestionsModel: KeyQuestionsModel;
  keyQuestions: KeyQuestionsComponent
  constructor(private http: HttpClient) {
    this.keyQuestionsModel = new KeyQuestionsModel();
  }
  url: string = "";
  getKeyQuestions(): Observable<any> {
    let url = utils.pathPhase + "/api/AnalyseConfig";// "/api/analyzeTiles/getAnalyzeTiles"
    return this.http.get(url);
  }

  getMstrConfig(): Observable<any> {
    let url = utils.authPath + "/api/mstr/getmstrconfig";
    return this.http.get(url);
  }

  saveKeyQuestions(analyzeTilesObj): Observable<any> {
    let url = utils.pathPhase6 + "/api/analyzeTiles/createAnalyzeTiles";
    return this.http.post(url, analyzeTilesObj);
  }

  getsystemSettings(): Observable<any> {
    let url = utils.pathPhase3 + "/api/getsystem-setting";
    return this.http.get(url);
  }

  updateKeyQuesRole(roleId, analyzeTilesObj): Observable<any> {
    let url = utils.pathPhase10 + "/api/roles/keyquestioncardupdate/" + roleId;
    return this.http.put(url, analyzeTilesObj);
  }

  validateMstrReportId(validID): Observable<any>{
    let url = utils.version_Path15 + "/api/microstrategy/validDossierId";
    return this.http.post(url,validID);
  }

  //  showKeyQuestions(){
  // this.keyQuestions.ShowIframe('none')
  // }
}

