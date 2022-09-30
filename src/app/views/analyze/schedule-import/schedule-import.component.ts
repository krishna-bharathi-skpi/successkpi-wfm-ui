import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../../../common/common.components';
import { ScheduleImportService } from './schedule-import.service';
import { ScheduleImportModel } from './schedule-import.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-schedule-import',
  templateUrl: './schedule-import.component.html',
  styleUrls: ['./schedule-import.component.css']
})
export class ScheduleImportComponent implements OnInit {

  viewDetails: string = "importSchedule";
  maxScheduleImportLimit: number = 1;
  scheduleImportModel: ScheduleImportModel;
  createSchedule: FormGroup;
  roleJson: any = []
  importTypes: any = [
    { "label": "ADD", "value": "ADD" },
    { "label": "REPLACE", "value": "REPLACE" }
  ]

  awsRegions: any = []

  constructor(private commonMethods: CommonMethods, private scheduleImportService: ScheduleImportService,
    private formBuilder: FormBuilder, public global: GlobalComponent, private spinnerService: NgxSpinnerService) { 
    this.commonMethods.dynamicBackgroundColorChange('white');
    this.scheduleImportModel = new ScheduleImportModel();
  }

  ngOnInit(): void {
    this.getImportSchedules();
    this.createImportScheduleForm();
    this.s3ImportScheduleScript();
    this.getAwsRegions();
    this.getMaxScheduleLimit();
  }

  createImportScheduleForm() {
    this.createSchedule = this.formBuilder.group(
      {
        scheduleName: [null, Validators.required],
        scheduleFrequency: [null, [Validators.required]],
        scheduleImportLocation: [null, [Validators.required]],
      }
    )
  }
  get validationCreateSchedule() { return this.createSchedule.controls; }
  submittedcreateSchedule = false;
  onSubmitCreate() {
    this.submittedcreateSchedule = true;
    if (this.createSchedule.invalid) {
      return
    }
  }

  // get all existing Schedules
  schedules: any = [];
  getImportSchedules() {
    this.spinnerService.show();
    // console.log("getImportSchedules Called");
    this.scheduleImportService.getImportSchedules().subscribe(
      (data: any) => {
        this.schedules = data;
        this.spinnerService.hide();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }

  // edit Schedule
  editImportSchedule(schedule) {
    this.scheduleImportModel = JSON.parse(JSON.stringify(schedule));
    this.viewDetails = 'editImportScheduleData';
  }

  // save user when add
  saveImportSchedule() {
    // console.log("save called");
    
    if (this.createSchedule.invalid) {
      this.submittedcreateSchedule = true;
    }
    else {
      this.spinnerService.show();
      // console.log("Save Schedule : ",this.scheduleModel);
      this.scheduleImportService.createImportSchedule(this.scheduleImportModel).subscribe(
        (data: any) => {
          this.scheduleImportModel = new ScheduleImportModel();
          this.viewDetails = 'importSchedule';
          this.getImportSchedules();
          this.commonMethods.addToastforlongtime(true, 'Import Schedule is created successfully. Please reachout to your SuccessKPI account team to activate this Scheduled Job.');
          this.spinnerService.hide();
        },
        (error) => {
          console.log(error);
          this.commonMethods.addToastforlongtime(false, error.error);
          this.spinnerService.hide();
        })
    }
  }


  // update Schedule
  updateImportSchedule() {
    if (this.createSchedule.invalid) {
      this.submittedcreateSchedule = true;
    }
    else {
      this.spinnerService.show();
      // console.log("Update Schedule : ",this.scheduleModel);
      this.scheduleImportService.updateImportSchedule(this.scheduleImportModel.scheduleId, this.scheduleImportModel).subscribe(
        (data: any) => {
          this.scheduleImportModel = new ScheduleImportModel();
          this.viewDetails = 'importSchedule';
          this.getImportSchedules();
          this.commonMethods.addToastforlongtime(true, 'Import Schedule is updated successfully. Please reachout to your SuccessKPI account team to update this Scheduled Job for further Process.');
          this.spinnerService.hide();
        },
        (error) => {
          console.log(error);
          this.commonMethods.addToastforlongtime(false, error.error);
          this.spinnerService.hide();
        })
    }
  }

  //delete import scheduel
  deleteImportSchedule() {
    this.spinnerService.show();
    // console.log("Delete schedule : ", this.scheduleModel);
    this.scheduleImportService.deleteImportSchedule(this.scheduleImportModel.scheduleId).subscribe(
      (data: any) => {
        this.scheduleImportModel = new ScheduleImportModel();
        this.viewDetails = 'importSchedule';
        this.getImportSchedules();
        this.commonMethods.addToastforlongtime(true, 'Schedule deleted');
        this.spinnerService.hide();
      },
      (error) => {
        console.log(error);
        this.commonMethods.addToastforlongtime(false, error.error);
        this.spinnerService.hide();
      })
  }



  // create schedule Import(Add)
  addImportSchedule() {
    if (this.schedules.length < this.maxScheduleImportLimit) {
      // console.log("inside if");
      
      this.scheduleImportModel = new ScheduleImportModel();
      this.createImportScheduleForm();
      this.createSchedule.reset();
      this.viewDetails = 'createScheduleData';
    }
    else {
      // console.log(("inside else"));
      
      var msg = "You have reached maximum allowed schedules. Please reach out to support@successkpi.com if you need more than " + this.maxScheduleImportLimit + " Scheduled Import";
      this.commonMethods.addToastforlongtime(false, msg);
    }
  }

  // create Cancel
  createCancel() {
    this.submittedcreateSchedule = false;
    this.scheduleImportModel = new ScheduleImportModel();
    this.getImportSchedules();
    this.viewDetails = 'importSchedule'
    this.createSchedule.reset();
  }

  s3ImportScheduleScript() {
    this.scheduleImportService.s3ImportScheduleScript().subscribe(
      (data: any) => {
        this.roleJson = data;
      }
    )
  }

  //get The max limit for the scheduled delivery 
  getMaxScheduleLimit() {
    this.spinnerService.show();
    this.scheduleImportService.getMaxScheduleImportLimit().subscribe(
      (data: any) => {
        this.maxScheduleImportLimit = data['maxScheduleImportLimit'];
        if (this.maxScheduleImportLimit === undefined || this.maxScheduleImportLimit === null)
          this.maxScheduleImportLimit = 1;
        this.spinnerService.hide();
      },
      (error) => {
        console.log(error);
        this.maxScheduleImportLimit = 1;
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
    // console.log(this.maxScheduleImportLimit)
  }

  getAwsRegions() {
    this.scheduleImportService.getAwsRegions().subscribe(
      (data: any) => {
        this.awsRegions = data;
      },
      (error) => {
        console.log('error', error)
      });
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


  // RemoveSpecialCharacters(val) {
  //   if (val != null && val.length > 1 && !this.keyPressOption) {
  //     const res = val.replace(/[^a-zA-Z0-9--._-_ - ]/g, "");
  //     // setTimeout(() => {
  //       this.scheduleImportModel.scheduleName = res;
  //     // }, 50);
  //   }
  //   this.keyPressOption = false;
  // }
  onPaste(event) {
    if(event){
       const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
       (<HTMLInputElement>document.getElementById('importnameid')).value = trimmedText;
       this.scheduleImportModel.scheduleName = trimmedText
    }
  }

}
