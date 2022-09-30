import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  httpLocal: any;

  constructor(private http: HttpClient, private handler: HttpBackend,) {
    this.httpLocal = new HttpClient(handler);
  }

  url: string = "";

  /****** Workgroup *************/
  getWorkgroupList(model, wfmConfigId): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/workgroup/list/" + wfmConfigId;
    return this.http.post(url, model);
  }

  getWorkgroup(model): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/workgroup/query/" + model.workgroupId + '/' +  model.wfmConfigId;
    return this.http.get(url);
  }

  createWorkgroup(createModel): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/workgroup/create";
    return this.http.post(url, createModel);
  }

  updateWorkgroup(updateModel): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/workgroup/update/" + updateModel[1].workgroupId;
    return this.http.put(url, updateModel[0]);
  }

  deleteWorkgroup(model): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/workgroup/delete/" + model.workgroupId + '/' +  model.wfmConfigId;
    return this.http.delete(url, model.workgroupId);
  }

  /****** Workgroup agents *************/
  getWorkgroupAgentsList(params, model): Observable<any> {
    let url;
    if(model.agentType == 'allAgents'){
      url = utils.wfmPathPhase1 + '/api/agents/list/' + model.wfmConfigId;
    }else{
      url = utils.wfmPathPhase1 + '/api/workgroupagents/' + model.wfmConfigId + '/' + model.workgroupId;
    }
    return this.http.post(url, params);
  }

  getWorkgroupAgent(workgroupId): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/workgroupagents/query/" + workgroupId;
    return this.http.get(url);
  }

  addAgentsToWorkGroup(updateModel): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/workgroupagents/update/" + updateModel[1].workgroupId;
    return this.http.put(url, updateModel[0]);
  }

  deleteWorkgroupAgent(deleteModel): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/workgroupagents/delete/" + deleteModel.workgroupId + '/' + deleteModel.wfmConfigId+"?agentId="+ deleteModel.agentId;
    return this.http.delete(url, deleteModel);
  }

  /****** Workgroup rules *************/
  getWorkgroupRulesList(params, model): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/workgrouprule/list/${model.wfmConfigId}/${model.workgroupId}`;
    return this.http.post(url, params);
  }

  createWorkgroupRule(createModel, model): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/post/workgrouprule/create/${model.wfmConfigId}/${model.workgroupId}`;
    return this.http.post(url, createModel);
  }

  updateWorkgroupRule(updateModel, model): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/put/workgrouprule/update/${model.wfmConfigId}/${model.workgroupId}`;
    return this.http.put(url, updateModel);
  }

  getWorkgroupRule(model): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/get/workgrouprule/get/${model.wfmConfigId}/${model.workgroupId}/${model.workgroupRuleId}`;
    return this.http.get(url);
  }

  deleteWorkgroupRule(model): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/delete/workgrouprule/delete/${model.wfmConfigId}/${model.workgroupId}/${model.workgroupRuleId}`;
    return this.http.delete(url, model);
  }

  getRuleTypes(): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/rule/get/type`;
    return this.http.get(url);
  }

  getRuleCategories(ruleType): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/rule/get/category?ruleType=${ruleType}`;
    return this.http.get(url);
  }

  getRuleUnits(model): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/rule/get/unit?ruleType=${model.type}&ruleCategory=${model.category}`;
    return this.http.get(url);
  }

  getRules(model): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/rule/get?ruleType=${model.type}&ruleCategory=${model.category}&ruleUnit=${model.unit}`;
    return this.http.get(url);
  }

  /****** Tasks *************/
  getTasksList(model, wfmConfigId): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/task/list/" + wfmConfigId;
    return this.http.post(url, model);
  }

  getTask(model): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/task/query/" + model.taskId + '/' +  model.wfmConfigId;
    return this.http.get(url);
  }

  getTaskCategoryOptions(wfmConfigId): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/taskCategory/dropdownList";
    return this.http.get(url);
  }

  createTask(createModel): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/task/create";
    return this.http.post(url, createModel);
  }

  updateTask(updateModel): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/task/update/" + updateModel[1].taskId;
    return this.http.put(url, updateModel[0]);
  }

  deleteTask(deleteModel): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/task/delete/" + deleteModel.taskId + '/' +  deleteModel.wfmConfigId;
    return this.http.delete(url, deleteModel);
  }

  createTaskCategory(createModel): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/taskCategory/create";
    return this.http.post(url, createModel);
  }

  updateTaskCategory(payload): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/taskCategory/update/${payload.categoryId}`;
    return this.http.put(url, payload);
  }

  getTaskCategoriesList(model, wfmConfigId): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/taskCategory/list/${wfmConfigId}`
    return this.http.post(url, model);
  }

  deleteTaskCategory(deleteModel): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/taskCategory/delete//${deleteModel.categoryId}/${deleteModel.wfmConfigId}`;
    return this.http.delete(url, deleteModel);
  }

  /****** Workplan *************/
  getWorkplanList(params, model): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/workplan/list/${model.wfmConfigId}`;
    return this.http.post(url, params);
  }

  createWorkplan(createModel): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/workplan/create`;
    return this.http.post(url, createModel);
  }

  updateWorkplan(updateModel, model): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/workplan/update/${model.workplanId}/${model.wfmConfigId}`;
    return this.http.put(url, updateModel);
  }

  getWorkplan(model): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/workplan/query/${model.wfmConfigId}/${model.workplanId}`;
    return this.http.get(url);
  }

  deleteWorkplan(model): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/workplan/delete/${model.wfmConfigId}/${model.workplanId}`;
    return this.http.delete(url, model);
  }
  
  getWorkgroupNamesList(model): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/workgroup/namelist/${model.wfmConfigId}`;
    return this.http.get(url);
  }

  /****** Shift *************/
  getShiftsList(model, params): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/shiftprofile/list/${params.wfmConfigId}/${params.workplanId}`;
    return this.http.post(url, model);
  }

  createShift(createModel): Observable<any> {
    let url = utils.wfmPathPhase1 + "/api/shiftprofile/create";
    return this.http.post(url, createModel);
  }

  updateShift(updateModel, model): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/shiftprofile/update/${model.wfmConfigId}/${model.shiftProfileId}`;
    return this.http.put(url, updateModel);
  }

  deleteShift(model): Observable<any> {
    let url = utils.wfmPathPhase1 + `/api/shiftprofile/delete/${model.wfmConfigId}/${model.workplanId}/${model.shiftProfileId}`;
    return this.http.delete(url, model);
  }

  /**********************************/
  timeConvert(num){ 
    var hours = Math.floor(num / 60);  
    var minutes = num % 60;
    return hours + ":" + minutes;         
  }

  convertTime24to12 = (time24h) => {
    let time = time24h
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time24h];
  
    if (time.length > 1) {
      time = time.slice(1, -1);
      time[5] = +time[0] < 12 ? ' am' : ' pm';
      time[0] = +time[0] % 12 || 12;
    }
    return time.join(''); 
  };

  alignWfmContainer() {
    if ($("app-sidebar-nav").hasClass("ps")) {
      $('.wfm').css('margin-left', '0px');
    } else {
      $('.wfm').css('margin-left', '-30px');
    }
  }

}