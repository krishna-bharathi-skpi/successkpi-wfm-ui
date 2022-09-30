import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonMethods } from '../../../common/common.components';
import { PreferenceModel } from './successkpi-setting.model';
import { PreferenceService } from './successkpi-setting.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { parse } from 'path';
import { GlobalComponent } from '../../../global/global.component';
import { UserData } from '../../../user';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-successkpi-setting',
  templateUrl: './successkpi-setting.component.html',
  styleUrls: ['./successkpi-setting.component.css']
})
export class SuccesskpiSettingComponent implements OnInit {
  selectedValue: any;
  preferenceModel: PreferenceModel;
  platform: any = [];
  selectedPlatform: any = []
  form: FormGroup;
  fileDataUri: any;
  dashboardId: string = null;
  callAnalyticsDDL:any;
  languageDetectDDL:any;
  isTranscriptionDisable:boolean = true;
  constructor(private commonMethods: CommonMethods, private preferenceService: PreferenceService, private formBuilder: FormBuilder
    , public global: GlobalComponent,private spinnerService: NgxSpinnerService) {
    this.commonMethods.dynamicBackgroundColorChange('white');
    this.preferenceModel = new PreferenceModel();
    this.form = new FormGroup({
      contactCenter: new FormControl('', [Validators.required]),
    });
    this.dashboardDocId();
  }
  @ViewChild('fileInput') fileInput: ElementRef;
  acceptedMimeTypes = [
    'image/jpeg',
    'image/png'
  ];
  ngOnInit(): void {
    this.getpreferenceDDL();
    // this.getContactCenter();
  }

  getpreferenceDDL(){
    const contactCenter = this.preferenceService.getContactCenter();
    const callAnalayticsType = this.preferenceService.getCallAnalyticsType();
    const languageDetection = this.preferenceService.getLanguageDetection()
    forkJoin([contactCenter,callAnalayticsType,languageDetection]).subscribe((data:any) => {
      // console.log(data)
        this.platform = data[0];
        this.callAnalyticsDDL = data[1];
        this.languageDetectDDL = data[2];
    })
  }

  // contact-centers Dropdown
  // getContactCenter() {
  //   this.preferenceService.getContactCenter().subscribe(
  //     (data: any) => {
  //       this.platform = data;
  //       // this.selectedPlatform=this.platform[0].value;
  //     }
  //   )
  // }
  logoCheck = true;
  imageUri: any;
  PlatformID: any;
  convertNum: any
  // isLogoChecked: string = 'default';
  // getPreference data
  getPreference() {
    this.spinnerService.show();
    this.preferenceService.getPreference().subscribe(
      (data: any) => {
        if (data != null && !this.isEmpty(data)) {
          this.preferenceModel = data;
          if (this.preferenceModel.imageUrl != null) {
            this.logoCheck = false;
          }
          data.isLogoChecked == false ? this.preferenceModel.isLogoChecked = 'default': null
          this.filename = this.preferenceModel.imageName == null ? "" : "[" + this.preferenceModel.imageName + "]";
          this.imageUri = this.preferenceModel.imageUrl;
          this.fileDataUri = this.preferenceModel.imageUrl
          this.convertNum = this.preferenceModel.platformId
          // this.PlatformID = this.preferenceModel.platformId;
          this.PlatformID = parseInt(this.convertNum)
          // this.isLogoChecked = this.preferenceModel.isLogoChecked
          if (this.preferenceModel.dashboardId != null && typeof (this.preferenceModel.dashboardId) != "undefined") {
            this.dashboardId = this.preferenceModel.dashboardId;
          }
          else {
            this.dashboardId = this.defaultDocId;
          }
          this.preferenceModel.callAnalyticsType = this.preferenceModel.callAnalyticsType != undefined && this.preferenceModel.callAnalyticsType != null && this.preferenceModel.callAnalyticsType != '' ? this.preferenceModel.callAnalyticsType : this.callAnalyticsDDL[0].value;
          this.preferenceModel.languageDetection = this.preferenceModel.languageDetection != undefined && this.preferenceModel.languageDetection  != null && this.preferenceModel.languageDetection != '' ? this.preferenceModel.languageDetection : 'Specific Language Detection';
          this.preferenceModel.speakerLabelValue = this.preferenceModel.speakerLabelValue  != undefined && this.preferenceModel.speakerLabelValue  != null  ? this.preferenceModel.speakerLabelValue : 2;
          this.preferenceModel.audioIdentificationType = this.preferenceModel.audioIdentificationType != undefined && this.preferenceModel.audioIdentificationType  != null && this.preferenceModel.audioIdentificationType != '' ? this.preferenceModel.audioIdentificationType : 'Channel Detection';
        }
        else {
          this.dashboardId = this.defaultDocId;
        }
        this.spinnerService.hide();
      },
      (error) => {
        console.log('error', error);
        this.spinnerService.hide();
      })
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  // get home dashboard ID
  defaultDocId: string = null;
  dashboardDocId() {
    this.spinnerService.show();
    this.preferenceService.dashboardDocId().subscribe(
      (data: any) => {
        this.defaultDocId = data.OverView.documentID;
        this.getPreference();
        this.spinnerService.show();
      },
      (error) => {
        console.log('error', error);
        this.spinnerService.hide();
      })
  }
  // Save Preference
  loading: boolean = false;
  isValidator:boolean = false
  savePreference() {
    this.speakerLabelValidator(this.preferenceModel.speakerLabelValue)
    this.preferenceModel.platformName = this.platform.filter(s => s.value == this.PlatformID)[0].label
    const regExp = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (regExp.test(this.fileDataUri)) {
      this.preferenceModel.image = this.imageUri;
    }
    else {
      if (typeof (this.fileDataUri) != "undefined" && this.fileDataUri != null && this.fileDataUri.length > 0) {
        const base64File = this.fileDataUri.split(',')[1];
        this.preferenceModel.image = base64File;
      }
    }
    this.preferenceModel.platformId = parseInt(this.PlatformID)
    this.preferenceModel.dashboardId = this.dashboardId;

    this.preferenceModel.allowAgentFeedback = this.preferenceModel.allowAgentFeedback == undefined ? false : this.preferenceModel.allowAgentFeedback;
    this.preferenceModel.accept = this.preferenceModel.accept == undefined ? false : this.preferenceModel.accept;
    this.preferenceModel.dispute = this.preferenceModel.dispute == undefined ? false : this.preferenceModel.dispute;

    if(!this.preferenceModel.allowAgentFeedback) {
      this.preferenceModel.accept = false;
      this.preferenceModel.dispute = false;
    }
    // this.isLogoChecked = this.preferenceModel.isLogoChecked
      this.loading = true;
    // this.spinnerService.show();
    this.preferenceService.savePreference(this.preferenceModel).subscribe(
      (data: any) => {
        this.dashboardDocId();
        if (this.preferenceModel.isLogoChecked == 'default') {
          localStorage.setItem("logo", JSON.stringify({ imageUrl: 'default', customerId: UserData.customerId }))
        }
        else {
          localStorage.setItem("logo", JSON.stringify({ imageUrl: data.imageUrl, customerId: UserData.customerId }))
        }
        this.commonMethods.addToastforlongtime(true, 'Preferences Created');
        // this.spinnerService.hide();
         window.location.reload();
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.log('error', error);
        this.commonMethods.addToastforlongtime(false, error.error)
      })
  }
  // upload img
  filename: any = ""
  previewFile() {
    const file = this.fileInput.nativeElement.files[0];
    this.filename = file.name == null ? "" : "[" + file.name + "]";
    if (file && this.validateFile(file)) {

      const reader = new FileReader();
      reader.readAsDataURL(this.fileInput.nativeElement.files[0]);
      reader.onload = () => {
        this.fileDataUri = reader.result;
      }
      this.logoCheck = false;
    } else {
      this.commonMethods.addToastforlongtime(false, 'File must be jpg or png')
    }
  }
  validateFile(file) {
    return this.acceptedMimeTypes.includes(file.type)
  }

  keyPressOption: boolean = false;
  async omit_special_char(event) {
    this.keyPressOption = true;
    var k;
    k = event.charCode;  
    if ((k > 32 && k < 45) || k == 47 || (k > 57 && k < 65) || (k > 90 && k < 95) || k == 96 || (k > 122 && k < 127)) {
      return await event.preventDefault();
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 32) {
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    else {
      event.preventDefault();
    }

  } 

  speakerLabelValidator(item){
    if(item >= 2 && item <= 10){
      this.isValidator = false
      this.loading = false
    }
    else{
      this.isValidator = true
      this.loading = true;
      return
    }
  }

  deleteLabel(msg) {
    let temVal = JSON.parse(JSON.stringify(this.preferenceModel.lanuageDetectionOption));
    const index: number = this.preferenceModel.lanuageDetectionOption.indexOf(msg);
    if (index !== -1) {
      temVal.splice(index, 1);
      this.preferenceModel.lanuageDetectionOption = temVal;
  }
}

conditionChange(item){
    if(item.toLowerCase() == 'call transcription v2'){
      this.preferenceModel.languageDetection = this.preferenceModel.languageDetection == 'Automatic Multiple Language Detection'  ? 'Specific Language Detection' : this.preferenceModel.languageDetection;
    }
  this.isValidator = false;

}

  // RemoveSpecialCharacters(val) {
  //   if (val != null && val.length > 1 && !this.keyPressOption) {
  //     const res = val.replace(/[^a-zA-Z0-9--._-_ - ]/g, "");
  //     // setTimeout(() => {
  //       this.dashboardId = res;
  //     // }, 50);
  //   }
  //   this.keyPressOption = false;
  // }
  onPaste(event) {
    if(event){
       const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
       (<HTMLInputElement>document.getElementById('preferencenameid')).value = trimmedText;
       this.dashboardId = trimmedText;
    }
  }
}
