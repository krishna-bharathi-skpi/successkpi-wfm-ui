import { Component, OnInit } from '@angular/core';
import { utils } from "../../config";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonMethods } from '../../common/common.components';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register/register.service';
import { AwsRegisterModel } from '../aws-marketplace-register/aws-marketplace.model';


@Component({
  selector: 'app-platform-registers',
  templateUrl: './platform-registers.component.html',
  styleUrls: ['./platform-registers.component.css']
})
export class PlatformRegistersComponent implements OnInit {

  termsandCondition: any;
  platformList: any = [];
  regionList: any = [];
  industryList: any = [];
  isSubmit: boolean = false;
  registerModel: AwsRegisterModel;
  registerForm: FormGroup;
  platformObj: any = null;
  regionObj: any = null;
  loading: boolean = false;
  awsRegisterToken: any;
  platformQueryType:any;
  constructor(private registerService: RegisterService, private router: Router, private fb: FormBuilder, 
    private commonMethods: CommonMethods,private route: ActivatedRoute) {
    this.registerModel = new AwsRegisterModel();
    this.getRegion();
    this.getIndustry();
    this.route.queryParams.subscribe(params => {
      if (typeof (params['aws-product-ref_']) != "undefined" && params['aws-product-ref_'] != "" && typeof (params['value']) != "undefined" && params['value'] != "") {
        if (typeof (params['aws-product-ref_']) != "undefined" && params['aws-product-ref_'] != "" && (params['value'] == 1 || params['value'] == 5)) {
          this.awsRegisterToken = params['aws-product-ref_'];
          let temp = params['value'];
          this.platformQueryType = temp
        }
        else {
          this.router.navigateByUrl('/not-found');
        }
      }
      else {
        this.router.navigateByUrl('/not-found');
      }
    })
  }
  ngOnInit() {
    this.termsandCondition = utils.termsandconditionUrl;
    this.form();
    this.getPlatform(this.platformQueryType);
  }

  form() {
    this.registerForm = this.fb.group({
      customername: [null, Validators.required],
      companyname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null,[ Validators.required, Validators.minLength(8)]],
      phone: [null, Validators.required],
      address: [null, Validators.required],
      platform: [null, Validators.required],
      region: [null, Validators.required],
      industry: [null, Validators.required]
    })
  }
  getPlatform(val) {
    this.registerService.getPlatform().subscribe(
      (data: any) => {
        this.platformList = data
        let modelValue = this.platformList.filter(s=> s.Key == val)[0]
        // console.log(val)
        this.registerModel.platformObj = modelValue

      })
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

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
      this.registerModel.registrationToken = this.awsRegisterToken;
      this.registerService.awsPlatformRegister(registerModel).subscribe(
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
