import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from '../../../config';
import { MyPlaybookModel } from '../myplaybook/myplaybook.model';
import { GlobalComponent } from '../../../global/global.component';
import * as JsonPath from '../../../JsonPath';


@Injectable({
  providedIn: 'root'
})

export class MyPlaybookService {
  httpLocal: any;

  constructor(private http: HttpClient, private handler: HttpBackend,public global: GlobalComponent) {
    this.httpLocal = new HttpClient(handler);
  }
  url: string = "";
  getEmployee(): Observable<any> {
    this.url = "http://dummy.restapiexample.com/api/v1/employees"
    return this.http.get(this.url);
  }

  getConditionsJson(): Observable<any> {
    // this.global.languageDropdownChange = this.global.language;
    // console.log("ang",this.global.languageDropdownChange)
    // console.log(this.global.language);
    // let currentLang=localStorage.getItem("language");
    // console.log(currentLang);
    
    // if( currentLang == 'spanish')
    // {
    //   return this.httpLocal.get("../../../../assets/json-files/my-playbooks/condition_spanish.json");
    // }
    // else if( currentLang == 'portuguese'){
    //   return this.httpLocal.get("../../../../assets/json-files/my-playbooks/condition_portuguese.json");
    // }
    // else{
    //   return this.httpLocal.get("../../../../assets/json-files/my-playbooks/conditions.json");
    // }
    let currentLang=localStorage.getItem("language");
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.playbooks.path.playbooks +'/'+JsonPath.configJson.playbooks.path.myplaybooks + '/' +JsonPath.configJson.playbooks.path.conditions + '/' + currentLang+'-conditions.json';
    params.append("objectkey",jsonS3Path) 
    params.append("raw",'json') 
    return this.http.get(url+params);
  }

  getTemplateItem(): Observable<any> {
    let url = utils.pathPhase9 + "/api/getalllibraries";//api/CallforAction
    return this.http.get(url)
  }

  copyTemplate(playbookTemplateList) {
    let url = utils.pathPhase9 + "/api/importlibrary";
    return this.http.post(url, playbookTemplateList)
  }

  playbookCreate(playCreate): Observable<any> {
    let url = utils.pathPhase9 + "/api/playbook";
    return this.http.post(url, playCreate)
  }

  //call action
  getCalltoAction(): Observable<any> {
    let url = utils.pathPhase9 + "/api/dropdowns/getaction";//api/CallforAction
    return this.http.get(url)
  }

  //call topics
  getTopics(): Observable<any> {
    let url = utils.pathPhase9 + "/api/dropdowns/gettopics";//;api/topic
    return this.http.get(url)
  }
  //edit playbooks
  getplaybookItems() {
    let url = utils.pathPhase9 + "/api/playbook/playbookscan";
    return this.http.get(url)
  }
  //edit playbook save
  updatePlaybook(save): Observable<any> {

    let url = utils.pathPhase9 + "/api/playbook/" + save.playBookId;
    return this.http.put(url, save);
  }

  deletePlaybook(playBookId): Observable<any> {
    let url = utils.pathPhase9 + "/api/playbook/" + playBookId
    return this.http.delete(url);
  }

  togglePlaybook(playbookItem): Observable<any> {
    let url = utils.pathPhase9 + "/api/playbookActive/" + playbookItem.playBookId
    return this.http.post(url, { active: playbookItem.active })
  }

  getTheme(): Observable<any> {
    let url = utils.pathPhase9 + "/api/dropdowns/getthemes";
    return this.http.get(url)
  }

  getFilterConditionsDDL(): Observable<any>{
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.playbooks.path.playbooks +'/'+JsonPath.configJson.playbooks.path.myplaybooks + '/' + JsonPath.configJson.playbooks.jsonFile.filterConditions;
    params.append("objectkey",jsonS3Path) 
    params.append("raw",'json') 
    return this.http.get(url+params);
  }
  

}