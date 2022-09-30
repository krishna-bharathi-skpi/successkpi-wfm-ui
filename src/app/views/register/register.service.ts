import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import utils from '../../config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  httpLocal: any;
  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.httpLocal = new HttpClient(handler);
  }

  getPlatform(): Observable<any> {
    let url = utils.pathPhase6 + "/api/s3bucket/getContactCenterPlatform";
    return this.http.get(url)

  }
  // getPlatformJson(): Observable<any> {
  //   return this.httpLocal.get("../../../../assets/json-files/register/register.json");
  // }
  // getRegionJson(): Observable<any> {
  //   return this.httpLocal.get("../../../../assets/json-files/register/region.json");
  // }
  getRegion(): Observable<any> {
    let url = utils.pathPhase6 + "/api/s3bucket/getRegions";
    return this.http.get(url)
  }
  // getIndustryJson(): Observable<any> {
  //   return this.httpLocal.get("../../../../assets/json-files/register/industry.json");
  // }
  getIndustry(): Observable<any> {
    let url = utils.pathPhase6 + "/api/s3bucket/getIndustry";
    return this.http.get(url)
  }

  register(registerModel): Observable<any> {
    let url = utils.authPath + "/api/auth0/signup";
    return this.http.post(url, registerModel)
  }

  awsCCIRegister(registerModel): Observable<any>{
    let url = utils.authPath + "/api/aws-marketplace/cci-signup";
    return this.http.post(url, registerModel)
  }

  awsPlatformRegister(registerModel):Observable<any>{
    // console.log(registerModel)
    if(registerModel.platformObj.Key == 1){
      // console.log("IF1",registerModel)
      let url = utils.pathPhase3 + "/api/aws-marketplace/product-registration"
      return this.http.post(url, registerModel)
    }
    if(registerModel.platformObj.Key == 5){
      // console.log("IF2",registerModel)
      let url = utils.pathPhase6 + "/api/aws-marketplace/text-analytics/product-registration"
      return this.http.post(url, registerModel)
    }
  
  }
}
