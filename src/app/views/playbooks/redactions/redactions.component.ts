import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import {Redactionmodel} from './redaction.model';
import { RedactionService } from './redaction.service';
import { CommonMethods } from '../../../common/common.components';
import { ToggleClasses } from '@coreui/angular/lib/shared/toggle-classes';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-redactions',
  templateUrl: './redactions.component.html',
  styleUrls: ['./redactions.component.css']
})
export class RedactionsComponent implements OnInit {
  redactionForm: FormGroup;
  issubmit:boolean=false;
  emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  ccRegex: RegExp = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;


  public redModelObj: Redactionmodel;
  constructor(private fb:FormBuilder,private redactionService:RedactionService,
    private commonMethods:CommonMethods,public global: GlobalComponent,private spinnerService: NgxSpinnerService) { 
    this.redModelObj=new Redactionmodel();
  }

  ngOnInit(): void {
    this.getRedaction();
    this.redactionForms();
    this.commonMethods.dynamicBackgroundColorChange('white')
  }

  redactionForms(){
    this.redactionForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
      phone: ['', Validators.required],
      ssn: ['', Validators.required],
      creditcard:['', Validators.compose([Validators.required,Validators.pattern(this.ccRegex)])]
    });
  }

  getRedaction(){
    this.redactionService.getRedaction().subscribe((data:any)=>{
      this.issubmit=false;
      if (data != null && !this.isEmpty(data)) {
        this.redModelObj = data;
        // console.log(this.redModelObj);
        
      }
    }, (error) => {
      console.log('error', error)
      this.commonMethods.addToastforlongtime(false, error.error)
    });
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  loading:boolean=false;
  redactionPost(){
    // if(this.redactionForm.invalid){
    //   this.issubmit=true;
    // }
    // else{
      this.loading = true;
      this.spinnerService.show();
      this.redactionService.redactionPost(this.redModelObj).subscribe((data:any)=>{

        this.commonMethods.addToastforlongtime(true, 'Redaction updated'); 
        this.loading = false;
        this.spinnerService.hide();
      },
      (error)=>{
        this.loading = false;
        console.log('error',error);  
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      });
    // }
  
  }

  onoffToggle(){
    this.redModelObj.isRedactionActive ==true ? (this.redModelObj.isEmailActive=true , this.redModelObj.isPhoneActive=true, this.redModelObj.isSsnActive = true, this.redModelObj.isCreditCardActive=true )   : 
    (this.redModelObj.isEmailActive=false,this.redModelObj.isPhoneActive=false, this.redModelObj.isSsnActive=false, this.redModelObj.isCreditCardActive=false)  
  }

  cancel(){
    this.redModelObj=new Redactionmodel();
    this.redactionForm.reset();
    this.issubmit=false;
  }


}
