import { Component, EventEmitter, Injectable, Input, OnInit, Output,OnChanges } from '@angular/core';
import { CommonMethods } from '../../../common/common.components';
import { ProfileModel } from './profile.model';
import { ProfileService } from './profile.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GlobalComponent } from '../../../global/global.component';
import { UserService } from '../users/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from '../../../containers/header/header.service';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { MstrTokenService } from '../../../services/mstrtoken.service';
import { PlatformService } from '../platform-setting/platform-setting.service';

@Injectable({
  providedIn: 'root'
 })
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  roles:any=[];
  profileModel: ProfileModel;
  profileform: FormGroup;
  patitionList:any= [];
  profileTimeZone:any = [];
  @Output() visibleProfile = new EventEmitter();
  @Input() isEnableUsername:boolean
  constructor(private commonMethods: CommonMethods,private profileService: ProfileService,private formBuilder: FormBuilder,
    public global: GlobalComponent, private userService: UserService,private spinnerService: NgxSpinnerService,private headerService:HeaderService, private messageService: MessageService,private mstrTokenService:MstrTokenService,private platformService:PlatformService) { 
    // this.commonMethods.dynamicBackgroundColorChange('white'); 
    this.profileModel = new ProfileModel();
    // this.getRoleDDL();
    this.patitionList = [
      {
        label: "All", value: "All"
      }
    ]
    this.getDropDownList();
    
  }

  ngOnInit(): void {
    this.roles = [
      {label:'Admin', value:'Admin'},
      // {label:'Analyst', value:'Analyst'}
    ];
    // this.getPartitionDDL()
    // this.getCustomerPool();
    this.profileForm();
  }
  isloadSpinner:boolean = true
  getDropDownList(isPage?) {
    const roleDDL = this.userService.getRoleDDL();
    const dataPartition = this.userService.getPartitionDDL();
    const uiLangDropdown = this.headerService.getuiDropdwn();
    const timeZone = this.platformService.getTimeZones()
    forkJoin([roleDDL, dataPartition, uiLangDropdown,timeZone]).subscribe(
      (data: any) => {
        if(data[0].length > 0){
          data[0].map(ele =>{
            this.roles.push(ele);
          })
        }

        if(data[1].length > 0){
          data[1].map(ele =>{
            this.patitionList.push(ele);
          })
        }
        this.global.getDropdwn = data[2];
        this.setLanguageValue(this.global.getDropdwn);
        this.profileTimeZone = data[3];
          this.getCustomerPool(isPage);
  
      },
      (error) => {
        console.log(error);
        this.isloadSpinner = false
        //this.spinnerService.hide();
      }
    )
  }
 
   
  profileForm(){
    this.profileform = this.formBuilder.group(
      {
        userName:[null, Validators.required],
        // email:[null, Validators.required],
        phone:[null,  Validators.required],
      }
    )
  }
  get validationProfile() { return this.profileform.controls; }
  submittedProfile=false;
  onSubmitEdit() {
    this.submittedProfile = true;
  
    if (this.profileform.invalid) {
      return
    }
  }

  cancelProfile() {
    this.visibleProfile.emit(false);
    if(!this.onChangeText){
      this.getCustomerPool("header");
    }
  }
 
  // get customer loged data from customer pool 
  customerPoolUser:any;
  getCustomerPool(page?){
    this.profileform.enable();
    this.loading = false;
    // this.spinnerService.show();
    if(page != "header"){
    this.profileService.getCustomerPool().subscribe(
      (response:any)=>{
         this.global.cancelProfile = JSON.stringify(response);
         const data = response
        if(data[0].role != undefined){
          this.profileModel= data[0];
        }
        else{
          if(data[0].role == undefined){
            this.profileModel= data[1];
          }
        }
      this.profileModel.role = data[0].role != undefined && data[0].role.toLowerCase() != 'admin' ? this.roles.filter(s => s.value == data[0].role)[0]['label'] : data[0].role;
      if(data[0].datapartition != undefined ){
          if(data[0].datapartition != null && data[0].datapartition != '' && data[0].datapartition != 'All'){
            this.profileModel.datapartition =  this.patitionList.filter(s => s.value == data[0].datapartition)[0]['label']
          }
          else{
            if(data[0].datapartition == 'All'){
              this.profileModel.datapartition = 'All'
            }
          }
      }
      else{
        this.profileModel.datapartition = this.patitionList[0].value
      }
      this.profileModel.uiLanguage = data[0].uiLanguage != '' && data[0].uiLanguage != null ? data[0].uiLanguage : this.global.getDropdwn[0].value
       this.profileModel.CustomerTimeZone = data[0].CustomerTimeZone != null && data[0].CustomerTimeZone != '' && data[0].CustomerTimeZone != undefined ? data[0].CustomerTimeZone : this.profileTimeZone[0].value;
      
       this.loading = false;
        this.isloadSpinner = false
        // this.spinnerService.hide();
      },
      (error)=>{
        console.log(error);
        this.isloadSpinner = false
        // this.spinnerService.hide();
        // this.commonMethods.addToastforlongtime(false, error.error);
        this.messageService.add({ key: 'tc', severity: 'info', summary: error.error });

      })
    }
    else{
         this.profileModel = new ProfileModel();
      const jsonModel = JSON.parse(this.global.cancelProfile);
        this.profileModel = jsonModel[0]
      
       this.profileModel.role = this.profileModel.role != undefined && this.profileModel.role.toLowerCase() != 'admin' ? this.roles.filter(s => s.value == this.profileModel.role)[0]['label'] : this.profileModel.role;
      if(this.profileModel.datapartition != undefined ){
        if(this.profileModel.datapartition != null && this.profileModel.datapartition != '' && this.profileModel.datapartition != 'All'){
          this.profileModel.datapartition =  this.patitionList.filter(s => s.value == this.profileModel.datapartition)[0]['label']
        }
        else{
          if(this.profileModel.datapartition == 'All'){
            this.profileModel.datapartition = 'All'
          }
        }
    }
    else{
      this.profileModel.datapartition = this.patitionList[0].value
    }
      this.profileModel.uiLanguage = this.profileModel.uiLanguage != '' && this.profileModel.uiLanguage != null ? this.profileModel.uiLanguage : this.global.getDropdwn[0].value
      this.profileModel.CustomerTimeZone = this.profileModel.CustomerTimeZone != null && this.profileModel.CustomerTimeZone != '' && this.profileModel.CustomerTimeZone != undefined ? this.profileModel.CustomerTimeZone : this.profileTimeZone[0].value;
      this.loading = false;
      this.isloadSpinner = false
    }
  }

  loading:boolean = false;
  cancelLoad:boolean = false
  updatePoolUser(){
    if(this.profileform.invalid ){
      this.submittedProfile = true;
    }
    this.loading = true;
    this.cancelLoad = true
    this.profileform.disable();
     this.spinnerService.hide();
    this.profileService.updatePoolUser(
      {
        "access_Token": this.commonMethods.decryptData(localStorage.getItem('accessToken')),
         "CustomerName": this.profileModel.customerName,
        "CustomerAddress": this.profileModel.customerAddress,
        "CompanyName": this.profileModel.companyName,
        "CustomerPhone": this.profileModel.customerPhone,
         "CustomerTimeZone": this.profileModel.CustomerTimeZone,
        "uiLanguage": this.profileModel.uiLanguage
      }).subscribe(
      (data:any)=>{
        this.messageService.add({ key: 'tc', severity: 'success', summary: 'Profile updated. Please wait for a moment...',life:10000,sticky:true });
        localStorage.setItem("language", this.profileModel.uiLanguage.toString());
        this.mstrTokenService.refreshMSTRSession();
        // this.profileModel = new ProfileModel();
        // this.getCustomerPool();
        // this.profileform.reset();
        this.cancelLoad = false
        // this.commonMethods.addToastforlongtime(true, 'Profile updated');
         this.spinnerService.hide();
      },
      (error)=>{
        this.loading = false;
        this.cancelLoad = false
        this.profileform.enable();
        console.log(error);
         this.spinnerService.hide();
        this.messageService.add({ key: 'tc', severity: 'info', summary: error.error,life:100000,sticky:true  });
        // this.commonMethods.addToastforlongtime(false, error.error);
      });
  }
  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // getRoleDDL(){
  //   // this.spinnerService.show();
  //   this.userService.getRoleDDL().subscribe(
  //     (data:any)=>{
  //        data.forEach(element => {
  //         this.roles.push(element);
  //       });
  //      this.getCustomerPool();
  //      // this.spinnerService.show();
  //     },
  //     (error) => {
  //       console.log('error', error)
  //       // this.spinnerService.hide();
  //     })
  // }

  // getPartitionDDL(){
  //   this.userService.getPartitionDDL().subscribe(
  //    (data:any)=>{
  //     //  console.log(data);
  //      data.forEach(element => {
  //        this.patitionList.push(element)
  //      });
  //    },
  //    (error) => {
  //      console.log('error', error)
  //   })    
  // }

  keyPressOption: boolean = false;
  async omit_special_char(event) {
    this.keyPressOption = true;
    var k;
    k = event.charCode;  
    if ((k > 32 && k < 45) || k == 47 || (k > 57 && k < 65) || (k > 90 && k < 95) || k == 96 || (k > 122 && k < 127)) {
      return await event.preventDefault();
    }
  }


  // RemoveSpecialCharacters(val) {
  //   if (val != null && val.length > 1 && !this.keyPressOption) {
  //     const res = val.replace(/[^a-zA-Z0-9--._-_ - ]/g, "");
  //     // setTimeout(() => {
  //       this.profileModel.customerName = res;
  //     // }, 50);
  //   }
  //   this.keyPressOption = false;
  // }
  onPaste(event) {
    if(event){
       const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
       (<HTMLInputElement>document.getElementById('profilenameid')).value = trimmedText;
       this.profileModel.customerName  = trimmedText
    }
  }

  setLanguageValue(languageValue) {
    let localLanguage = localStorage.getItem("language")
    if (localLanguage) {
      this.global.getLangValue = localLanguage
    }
    else {
      this.global.getLangValue = languageValue[0].value;
      localStorage.setItem("language", languageValue[0].value)
    }
    //MSTR Code
    if (languageValue.length != 0) {
      const result = languageValue.filter(langCode => langCode.value === this.global.getLangValue);
      if (result.length > 0) {
        this.global.MstrWebCode = result[0].mstrWebCode;
      }
    }
  }

  onChangeText:boolean = true
  onChangeEvent(){
    if((this.profileform.value.userName != '' && this.profileform.value.userName != null) ||(this.profileform.value.phone != '' && this.profileform.value.phone != null) ){
          this.onChangeText = false
    }
  }
 
}
