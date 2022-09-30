import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";
import { TopicModel } from "../topics/topics.model"
import * as JsonPath from '../../../JsonPath';

@Injectable({
  providedIn: 'root'
})

export class TopicService {
  httpLocal: any;
  public topicModel: TopicModel

  constructor(private http: HttpClient, private handler: HttpBackend, ) {
    this.httpLocal = new HttpClient(handler);
    this.topicModel = new TopicModel();
  }
  url: string = "";
  getEmployee(): Observable<any> {
    this.url = "http://dummy.restapiexample.com/api/v1/employees"
    return this.http.get(this.url);
  }

  // getConditionsJson():Observable<any>{
  //     return this.httpLocal.get("../../../../assets/json-files/my-playbooks/conditions.json");
  // }
  createTopic(save): Observable<any> {
    this.topicModel = save;
    // if(this.topicModel.topicId==null)
    // {
    this.url = utils.pathPhase + "/api/topic";
    return this.http.post(this.url, this.topicModel);
    // }
    // else{
    //   this.url=  utils.pathPhase +"/api/topic/" +this.topicModel.topicId;
    //   return this.http.put(this.url,this.topicModel);
    // }
    // console.log(this.topicModel)


  }
  GetTopicsItems() {

    this.url = utils.pathPhase + "/api/topicScan";
    return this.http.get(this.url);

  }
  deleteTopic(topicID): Observable<any> {
    this.url = utils.pathPhase + "/api/topic/" + topicID
    return this.http.delete(this.url);
  }
  updateTopic(topicID, model): Observable<any> {
    this.url = utils.pathPhase + "/api/topic/" + topicID
    return this.http.put(this.url, model)

  }
  toggleTopic(topicItem): Observable<any> {
    // console.log("Active",this.url);

    this.url = utils.pathPhase + "/api/topicActive/" + topicItem.topicId
    return this.http.post(this.url, { active: topicItem.active })
  }
  testKeyphrase(data): Observable<any> {
    this.url = utils.pathPhase20 + "/api/TestTopic"
    return this.http.post(this.url,data)
  }

  getChannelDropDownList(): Observable<any> {
    // return this.httpLocal.get("../../../../assets/json-files/topics/channel.json");
    let currentLang=localStorage.getItem("language");
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.playbooks.path.playbooks +'/'+JsonPath.configJson.playbooks.path.topics + '/' +JsonPath.configJson.playbooks.path.channel + '/' + currentLang+'-channel.json' ;
    params.append("objectkey",jsonS3Path) 
    params.append("raw",'json') 
    return this.http.get(url+params);
  }
  getTopicTemplateItems(): Observable<any> {
    let url = utils.pathPhase9 + "/api/dropdowns/get-authorized-ddl?"
    let params = new URLSearchParams();
    let jsonS3Path = JsonPath.configJson.playbooks.path.playbooks + '/' + JsonPath.configJson.playbooks.path.topics + '/' + JsonPath.configJson.playbooks.jsonFile.topictemplate;
    params.append("objectkey", jsonS3Path)
    params.append("raw", 'json')
    return this.http.get(url + params);
  }
}