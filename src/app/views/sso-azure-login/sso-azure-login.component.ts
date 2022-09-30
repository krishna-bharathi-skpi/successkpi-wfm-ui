import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AzureLoginModel } from './sso-azure-login.model';
import { SSO_AzureService } from './sso-azure-login.service';

@Component({
  selector: 'app-sso-azure-login',
  templateUrl: './sso-azure-login.component.html',
  styleUrls: ['./sso-azure-login.component.css']
})
export class SsoAzureLoginComponent implements OnInit {
   
  ssoForm:FormGroup
  isSubmit: boolean = false;
  disablebtn:boolean = true;
  disablesearchbtn:boolean = false;
  azureLoginModel:AzureLoginModel;
  getCookies:any;
  constructor(private fb: FormBuilder,private cookieService: CookieService,public ssoLogin: SSO_AzureService,private spinnerService: NgxSpinnerService) { 
    this.azureLoginModel = new AzureLoginModel();
    this.forms();
    this.spinnerService.show();
    this.getCookies = this.cookieService.get('azureOrgID');
    this.ssoForm.enable();
    
    if(this.getCookies != "" && this.getCookies != null){
      // console.log("1st IF")
      this.orgIdModel = this.getCookies;
      this.ssoForm.disable();
      this.disablebtn = false;
      this.disablesearchbtn = true;
      this.searchOrgID(this.orgIdModel)
      setTimeout(() => {
        this.orgIdErrMsg = ""
      }, 2000);
      
    }
    else if(typeof(this.getCookies) == "string" && this.getCookies == ""){
      this.ssoForm.enable();
      this.orgIdModel = "";
      this.disablebtn = true;
      this.disablesearchbtn = false;
      this.orgIdErrMsg = "";
      this.spinnerService.hide();
    }
    
  }

  ngOnInit(): void {
   
  }
  
  forms() {
    this.ssoForm = this.fb.group({
      orgID: [null, Validators.required],
    });

  }
  
  orgData:any = {};
  orgIdModel:string = "";
  orgIdErrMsg:string = ""
  searchOrgID(orgID){
    this.orgIdModel = orgID
    if (this.ssoForm.invalid) {
      this.isSubmit = true;
      // this.ssoForm.enable();
    }
    else{
      this.spinnerService.show();
      this.ssoLogin.searchOrgID(this.orgIdModel).subscribe(
        (data:any)=>{
          this.orgData = data;
          this.cookieService.set('azureOrgID',orgID)
          // console.log(this.orgData)
          this.disablebtn = false;
          this.disablesearchbtn = true;
          this.orgIdErrMsg = "";
          this.isSubmit = false;
          // this.ssoForm.disable();
          this.spinnerService.hide();
        },
        (error)=>{
          console.log(error.error)
          this.orgIdErrMsg = error.error;
          this.disablesearchbtn = false;
          this.disablebtn = true;
          this.ssoForm.enable();
          this.spinnerService.hide();
  
        }
      )
    }
    
  }
  
  
  
}
