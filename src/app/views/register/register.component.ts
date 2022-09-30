import { Component } from '@angular/core';
import { utils } from "../../config";
import { RegisterService } from "./register.service";
import { RegisterModel } from './register.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonMethods } from '../../common/common.components';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  termsandCondition: any;
  platformList: any = [];
  regionList: any = [];
  industryList: any = [];
  isSubmit: boolean = false;
  registerModel: RegisterModel;
  registerForm: FormGroup;
  platformObj: any = null;
  regionObj: any = null;
  loading: boolean = false;
  constructor(private registerService: RegisterService, private router: Router, private fb: FormBuilder, private commonMethods: CommonMethods) {
    this.registerModel = new RegisterModel();
  }
  ngOnInit() {

    this.termsandCondition = utils.termsandconditionUrl;
    this.getPlatform();
    // this.getPlatformJson();
    // this.getRegionJson();
    // this.getIndustryJson();
    this.form();
    this.getRegion();
    this.getIndustry();
  }

  form() {
    this.registerForm = this.fb.group({
      customername: [null, Validators.required],
      companyname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null,[ Validators.required, Validators.minLength(8)]],
      phone: [null, Validators.required],
      address: [null, Validators.required],
      // agree: [false, Validators.required],
      platform: [null, Validators.required],
      region: [null, Validators.required],
      industry: [null, Validators.required]
    })
  }
  getPlatform() {
    this.registerService.getPlatform().subscribe(
      (data: any) => {
        this.platformList = data

      })
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  // getPlatformJson(){
  //   this.registerService.getPlatformJson().subscribe(
  //     (data:any)=>{

  //       this.platformList = data;

  //       console.log("JSON",this.platformList);
  //     }
  //   )
  // }
  // getRegionJson(){
  //   this.registerService.getRegionJson().subscribe(
  //     (data:any)=>{

  //       this.regionList = data;

  //       console.log("JSON",this.regionList);
  //     }
  //   )
  // }
  // getIndustryJson(){
  //   this.registerService.getIndustryJson().subscribe(
  //     (data:any)=>{

  //       this.industryList = data;
  //       console.log("JSON",this.industryList);
  //     }
  //   )
  // }
  getRegion() {
    this.registerService.getRegion().subscribe((data: any) => {
      this.regionList = data;
    })
  }
  getIndustry() {
    this.registerService.getIndustry().subscribe((data: any) => {
      this.industryList = data;
    })
  }
  register(registerModel) {
    if (this.registerForm.invalid) {
      this.isSubmit = true;
    }
    else {
      this.loading = true;
      this.isSubmit = false;
      this.registerService.register(registerModel).subscribe(
        (data: any) => {
          this.registerForm.reset()
          this.commonMethods.addToastforlongtime(true, "Account created. Check your email for the verification link");
          // this.router.navigateByUrl("/login");

        },
        (error) => {
          this.loading = false;
          console.log(error);
          this.commonMethods.addToastforlongtime(false, error.error)

        }
      )
    }

  }

}
