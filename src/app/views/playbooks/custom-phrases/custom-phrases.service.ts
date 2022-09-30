import { Injectable } from '@angular/core';
import { customPhrasesModel } from './custom-phrases.model';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { utils } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class CustomPhrasesService {
  public customModel:customPhrasesModel;

  constructor(private http:HttpClient,private handler:HttpBackend) 
  {
    this.customModel= new customPhrasesModel();
   }
   url:string="";

   saveCustomPhrases(postCustomPhrases):Observable<any>{
    let url=utils.pathPhase6+"/api/customdictionary/create";
    return this.http.post(url,postCustomPhrases);
   }

   getCustomPhrases(){
     let url=utils.pathPhase6+"/api/customdictionary/getItem";
     return this.http.get(url);
   }
}
