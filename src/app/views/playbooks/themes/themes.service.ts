import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams,HttpBackend } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { utils } from "../../../config";
import {ThemesModel} from "../themes/themes.model"

@Injectable({
    providedIn: 'root'
})

export class ThemeService {
    httpLocal:any;
    public themeModel :ThemesModel
     
    constructor( private http: HttpClient, private handler: HttpBackend,) { 
        this.httpLocal = new HttpClient(handler);
        this.themeModel = new ThemesModel();
    }
    url: string = "";
    // getEmployee(): Observable<any> {
    //     this.url = "http://dummy.restapiexample.com/api/v1/employees"
    //     return this.http.get(this.url);
    // }

    getTopics(): Observable<any> {
      this.url =  utils.pathPhase9 + "/api/dropdowns/gettopics";
      return this.http.get(this.url);
    }
    // themes create
    createTheme(create): Observable<any>{
        // console.log("crate",create);
        
        this.url=  utils.pathPhase + "/api/strategy";
        return this.http.post(this.url,create);
    }
    getThemeItems(): Observable<any>{
        this.url=utils.pathPhase +"/api/strategyScan";
        return this.http.get(this.url);
    }
    updateTheme(update,model):Observable<any>{
        this.url = utils.pathPhase + "/api/strategy/" +update;
        return this.http.put(this.url,model);
    }
    deleteTheme(strategyId):Observable<any>{
        this.url = utils.pathPhase + "/api/strategy/" + strategyId;
        return this.http.delete(this.url);
    }
    toggleTheme(themeActive):Observable<any>{
        let url = utils.pathPhase9 + "/api/themes/" + themeActive.themeId;
        return this.http.post(url,  {active: themeActive.active})
    }
}