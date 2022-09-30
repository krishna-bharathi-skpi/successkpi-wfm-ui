import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../../../common/common.components';
import { ScheduleService } from './schedule-delivery.service';
import { ScheduleModel } from './schedule-delivery.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GlobalComponent } from '../../../global/global.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-schedule-delivery',
  templateUrl: './schedule-delivery.component.html',
  styleUrls: ['./schedule-delivery.component.css']
})
export class ScheduleDeliveryComponent implements OnInit {

  viewDetails: string = "deliverySchedule";
  maxScheduleLimit: number = 5;
  scheduleModel: ScheduleModel;
  createSchedule: FormGroup;
  roleJson: any = []
  exportTypes: any =[]
  // = [
  //   { "label": "CSV", "value": "CSV" },
  //   { "label": "JSON", "value": "JSON" },
  //   { "label": "EXCEL", "value": "EXCEL" }
  // ]
  objType:any = [
    { "label": "Report", "value": "report" },
    { "label": "Document", "value": "document" }
  ]
  constructor(private commonMethods: CommonMethods, private scheduleService: ScheduleService,
    private formBuilder: FormBuilder, public global: GlobalComponent, private spinnerService: NgxSpinnerService) {
    this.commonMethods.dynamicBackgroundColorChange('white');
    this.scheduleModel = new ScheduleModel();
    this.onchangetype(this.scheduleModel.objectType)
  }

  ngOnInit(): void {
    this.getSchedules();
    this.createScheduleForm();
    this.s3Script();
    this.getMaxScheduleLimit();
  }

  createScheduleForm() {
    this.createSchedule = this.formBuilder.group(
      {
        scheduleName: [null, Validators.required],
        scheduleFrequency: [null, [Validators.required]],
        scheduleExportLocation: [null, [Validators.required]],
        scheduleReportHandle: [null, Validators.required],
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

  // get Schedules data
  schedules: any = [];
  getSchedules() {
    this.spinnerService.show();
    // console.log("getSchedules Called");
    this.scheduleService.getSchedules().subscribe(
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
  editSchedule(schedule) {
    this.scheduleModel = JSON.parse(JSON.stringify(schedule));
    this.viewDetails = 'editScheduleData';
    this.onchangetype(this.scheduleModel.objectType)
  }
  // save user when add
  saveSchedule() {
    if (this.createSchedule.invalid) {
      this.submittedcreateSchedule = true;
    }
    else {
      this.spinnerService.show();
      // console.log("Save Schedule : ",this.scheduleModel);
      this.scheduleService.createSchedule(this.scheduleModel).subscribe(
        (data: any) => {
          this.scheduleModel = new ScheduleModel();
          this.viewDetails = 'deliverySchedule';
          this.getSchedules();
          this.commonMethods.addToastforlongtime(true, 'Schedule created');
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
  updateSchedule() {
    if (this.createSchedule.invalid) {
      this.submittedcreateSchedule = true;
    }
    else {
      this.spinnerService.show();
      // console.log("Update Schedule : ",this.scheduleModel);
      this.scheduleService.updateSchedule(this.scheduleModel.scheduleId,this.scheduleModel).subscribe(
        (data: any) => {
          this.scheduleModel = new ScheduleModel();
          this.viewDetails = 'deliverySchedule';
          this.getSchedules();
          this.commonMethods.addToastforlongtime(true, 'Schedule updated');
          this.spinnerService.hide();
        },
        (error) => {
          console.log(error);
          this.commonMethods.addToastforlongtime(false, error.error);
          this.spinnerService.hide();
        })
    }
  }

  // delete user
  deleteSchedule() {
    this.spinnerService.show();
    // console.log("Delete schedule : ", this.scheduleModel);
    this.scheduleService.deleteSchedule(this.scheduleModel.scheduleId).subscribe(
        (data: any) => {
          this.scheduleModel = new ScheduleModel();
          this.viewDetails = 'deliverySchedule';
          this.getSchedules();
          this.commonMethods.addToastforlongtime(true, 'Schedule deleted');
          this.spinnerService.hide();
        },
        (error) => {
          console.log(error);
          this.commonMethods.addToastforlongtime(false, error.error);
          this.spinnerService.hide();
        })
  }

  //get The max limit for the scheduled delivery 
  getMaxScheduleLimit() {
    this.spinnerService.show();
    this.scheduleService.getMaxScheduleLimit().subscribe(
      (data: any) => {
        // console.log(data['maxScheduleLimit']);
        this.maxScheduleLimit = data['maxScheduleLimit'];
        if (this.maxScheduleLimit === undefined || this.maxScheduleLimit === null)
          this.maxScheduleLimit = 5;
        this.spinnerService.hide();
      },
      (error) => {
        console.log(error);
        this.maxScheduleLimit = 5;
        this.spinnerService.hide();
        this.commonMethods.addToastforlongtime(false, error.error);
      })
  }

  // create user(Add)
  addUser() {
    if (this.schedules.length < this.maxScheduleLimit) {
      this.scheduleModel = new ScheduleModel();
      this.createScheduleForm();
      this.createSchedule.reset();
      this.viewDetails = 'createScheduleData';
      this.onchangetype(this.scheduleModel.objectType)
    }
    else {
      var msg = "You have reached maximum allowed schedules. Please reach out to support@successkpi.com if you need more than " + this.maxScheduleLimit + " Scheduled Delivery";
      this.commonMethods.addToastforlongtime(false, msg);
    }
  }
  // create Cancel
  createCancel() {
    this.submittedcreateSchedule = false;
    this.scheduleModel = new ScheduleModel();
    this.getSchedules();
    this.viewDetails = 'deliverySchedule'
    this.createSchedule.reset();
  } 
  
  s3Script() {
    this.scheduleService.s3Script().subscribe(
      (data: any) => {
        this.roleJson = data;
      }
    )
  }

  onchangetype(val){
  //  console.log(val)
   if(val == 'document'){
     this.exportTypes = [
       { "label": "EXCEL", "value": "EXCEL" },
       { "label": "PDF", "value": "PDF" },
       { "label": "CSV", "value": "CSV" }
     ]
     this.scheduleModel.scheduleDataFormat = (this.scheduleModel.scheduleDataFormat == "")?this.exportTypes[0].value:this.scheduleModel.scheduleDataFormat
   }
   else{
    this.exportTypes = [
      { "label": "CSV", "value": "CSV" },
      { "label": "JSON", "value": "JSON" },
      { "label": "EXCEL", "value": "EXCEL" }
    ]
     this.scheduleModel.scheduleDataFormat = (this.scheduleModel.scheduleDataFormat == "") ? this.exportTypes[0].value : this.scheduleModel.scheduleDataFormat
   }
  }

  documentDownload() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'https://content.successkpis.com/assets/help/document-export-configuration.pdf');
    link.click();
    link.remove();
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
  //       this.scheduleModel.scheduleName = res;
  //     // }, 50);
  //   }
  //   this.keyPressOption = false;
  // }

  onPaste(event) {
    if(event){
       const trimmedText = event.replace(/[`~!@#$%^&*()|+\=?;:%'",.<>\{\}\[\]\\\/]/gi, '');
       (<HTMLInputElement>document.getElementById('deliverynameid')).value = trimmedText;
       this.scheduleModel.scheduleName = trimmedText
    }
  }
}
