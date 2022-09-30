import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonMethods } from '../../../../common/common.components';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import * as $ from "jquery";
import { serviceLevelService } from '../serviceLevel.service';
import { ForecastService } from '../../forecast/forecast.service';
import { MessageService } from 'primeng/api';
import { GlobalComponent } from '../../../../global/global.component';
import { OverlayPanel } from 'primeng/overlaypanel';
import {isEqual, pick} from 'lodash';

@Component({
  selector: 'app-add-edit-service-level',
  templateUrl: './add-edit-service-level.component.html',
  styleUrls: ['./add-edit-service-level.component.css'],
  providers: [MessageService]
})

export class AddEditServiceLevelComponent implements OnInit {

  @ViewChild('op') panel: OverlayPanel;

  // To validate a form
  isSubmitted: boolean = false;
  serviceLevelForm: FormGroup;
  description = ''; // to show the description count to user
  wfmConfigs: any = [];
  selectedConfig: any = []; // to select item in a datatable

  //edit mode
  serviceLevelId!: any; // to get the specific staffing detail
  isAddMode!: boolean; // to check the mode add/update
  serviceLevelData: any = []; // contains specific service level detail for editing

  selectedMediaType: string = 'Voice' // ngModel for media type
  // mediaType: any = { value: 'Voice' } // default selection for Media Type

  mediaTypes = [
    { value: 'Voice', label: 'Voice' },
    { value: 'Chat', label: 'Chat' },
    { value: 'Email', label: 'Email' },
    { value: 'Social', label: 'Social' }
  ]
  mediaType: any // ngModel

  svcLvlHours:any; // contains hours
  svcLvlHour:any; // ngModel
  svcLvlMinutes:any; // contains minutes
  svcLvlMinute:any; // ngModel
  svcLvlSeconds:any; // contains seconds
  svcLvlSecond:any; // ngModel

  avgSpeedHours:any; // contains hours
  avgSpeedHour:any; // ngModel
  avgSpeedMinutes:any; // contains minutes
  avgSpeedMinute:any; // ngModel
  avgSpeedSeconds:any; // contains seconds
  avgSpeedSecond:any; // ngModel

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private el: ElementRef,
    private commonMethods: CommonMethods,
    public global: GlobalComponent,
    private serviceLevelService: serviceLevelService,
    private forecastService: ForecastService,
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService
  ) {
    this.commonMethods.dynamicBackgroundColorChange('white');

    this.serviceLevelForm = this.formBuilder.group({
      serviceLevelName: [null, [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9-_ ]*$')]],
      serviceLevelDescription: [null, [Validators.maxLength(400), Validators.pattern('^[a-zA-Z0-9-_,. ]*$')]],
      // channel: [{ value: 'Voice'}, [Validators.required]],
      serviceLevel: [null, [Validators.required, Validators.maxLength(3)]],
      // targetAnswerTime: [null, [Validators.required, Validators.maxLength(6)]],
      // avgSpeedToAnswer: [null, [Validators.maxLength(3)]]
    }, { validator: this.validateTime });
  }

  ngOnInit(): void {
    this.serviceLevelService.alignWfmContainer();
    this.spinnerService.show();
    this.serviceLevelId = this.route.snapshot.params['id'];
    this.isAddMode = !this.serviceLevelId;
    this.initiateHoursMinutesSeconds();
    if (this.isAddMode) {
      this.getWfmConfigs(null);
      this.serviceLevelForm.get('serviceLevel').setValue('80'); // set default value as 80% for service level
      // this.serviceLevelForm.get('targetAnswerTime').setValue('20'); // set default value as 20 seconds for service level
    } else {
      this.getServiceLevelDetail();
    }
  }

  initiateHoursMinutesSeconds(){
    // initiating values for service level
    this.svcLvlHours = this.serviceLevelService.hourOptions;
    this.svcLvlMinutes = this.serviceLevelService.timeOptions;
    this.svcLvlSeconds = this.serviceLevelService.timeOptions;

    this.svcLvlHour = {value:'00'}
    this.svcLvlMinute = {value:'00'}
    this.svcLvlSecond = {value:'20'}

    // initiating values for avg speed of answer
    this.avgSpeedHours = this.serviceLevelService.hourOptions;
    this.avgSpeedMinutes = this.serviceLevelService.timeOptions;
    this.avgSpeedSeconds = this.serviceLevelService.timeOptions;
  }

  submitServiceLevel() {

    // // To check wfm config is selected
    let selectedConfigLength = Object.keys(this.selectedConfig).length;
    if (selectedConfigLength == 0) {
      this.messageService.add({ severity:'error', summary: 'Please select the Config' });
      if(this.wfmConfigs.length > 1){
        this.scroll('wfm_configs_table');
      }
      return
    }

    this.isSubmitted = true;
    if (this.serviceLevelForm.invalid) {
      // set focus on invalid controls
      for (const key of Object.keys(this.serviceLevelForm.controls)) {
        if (this.serviceLevelForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      return;
    }

    // validate media type
    if (!this.mediaType) {
      this.scroll('media_type_group');
      this.messageService.add({ severity:'info', summary: 'Click the button to add your media type' });
      return;
    }

    // condition for media type
    let media_type = null;
    if (this.mediaType !== undefined) {
        media_type = (this.mediaType) ? this.mediaType : null;
    }

    // validate time
    if (!this.svcLvlSecond) {
      this.scroll('service_level_group');
      return;
    }

    // validate service level - hours/minutes/seconds has no value
    if (this.svcLvlHour.value == 0 && this.svcLvlMinute.value == 0 && this.svcLvlSecond.value == 0) {
      this.messageService.add({ severity:'error', summary: 'Hours or Minutes or Seconds value must be greater than zero' });
      return;
    }

    // convert service level - hours, minutes and seconds to seconds 
    let svcLvlHoursToSeconds = (this.svcLvlHour) ? Math.floor(this.svcLvlHour.value * 60 * 60) : 0;
    let svcLvlMinutesToSeconds = (this.svcLvlMinute) ? Math.floor(this.svcLvlMinute.value * 60) : 0;
    let svcLvlSeconds = (this.svcLvlSecond) ? Math.floor(this.svcLvlSecond.value) : 0;
    let targetAnsTime = Math.floor(svcLvlHoursToSeconds + svcLvlMinutesToSeconds + svcLvlSeconds);

    // convert avg speed of answer - hours, minutes and seconds to seconds 
    let avgSpeedHoursToSeconds = (this.avgSpeedHour) ? Math.floor(this.avgSpeedHour.value * 60 * 60) : 0;
    let avgSpeedMinutesToSeconds = (this.avgSpeedMinute) ? Math.floor(this.avgSpeedMinute.value * 60) : 0;
    let avgSpeedSeconds = (this.avgSpeedSecond) ? Math.floor(this.avgSpeedSecond.value) : 0;
    let avgSpeedofAnswer = Math.floor(avgSpeedHoursToSeconds + avgSpeedMinutesToSeconds + avgSpeedSeconds);

    // assigning data for backend
    let dataForBackend = [{
      wfmConfigId: this.selectedConfig.wfmConfigId,
      configId: this.selectedConfig.configId,
      ...this.serviceLevelForm.value,
      targetAnswerTime: targetAnsTime,
      avgSpeedToAnswer: avgSpeedofAnswer,
      channel: media_type
    }]
  
    if (this.isAddMode) {
      // Create service level payload request
      this.spinnerService.show();
      this.serviceLevelService.createServiceLevel(dataForBackend[0]).subscribe((data: any) => {
        this.messageService.add({ severity:'success', summary: 'Service Quality Objective has been created successfully!' });
        setTimeout(() => {
          this.router.navigate(['wfm/service_levels/list']);
          this.spinnerService.hide();
        }, 2000);
      }, (error) => {
        console.log('error:', error.error.message);
        this.messageService.add({ severity: 'error', summary: error.error.message });
        this.spinnerService.hide();
      })
    } else {
      const originalLoadedData = pick(this.serviceLevelData, Object.keys(dataForBackend[0]))
      const isModified = !isEqual(dataForBackend[0], originalLoadedData);

      if (isModified) {
        // Update service level payload request
        this.spinnerService.show();
        dataForBackend.push({ serviceLevelId: this.serviceLevelId })
        this.serviceLevelService.updateServiceLevel(dataForBackend).subscribe((data: any) => {
          this.messageService.add({ severity:'success', summary: 'Service Quality Objective has been updated successfully!' });
          setTimeout(() => {
            this.router.navigate(['wfm/service_levels/list']);
            this.spinnerService.hide();
          }, 2000);
        }, (error) => {
          console.log('error:', error.error.message);
          this.messageService.add({ severity: 'error', summary: error.error.message });
          this.spinnerService.hide();
        })
      } else {
        this.router.navigate(['wfm/service_levels/list']);
      }
    }
  }

  manageMediaType(mediaType){
    this.isSubmitted = false;
    if(this.mediaType){
      this.messageService.add({ severity:'info', summary: 'You have changed your media type to ' + mediaType });
    }
    this.mediaType = mediaType;
    this.panel.hide();
  }

  // to set the overlay panel position to the top
  setMenuItemTop(){
    setTimeout(() => {
      let menuItemTop = $('.mt-overlaypanel').css('top').replace('px','');
      if (parseInt(menuItemTop) < 800) {
        $('.mt-overlaypanel').css('margin-top', '-9px');
      }
    }, 100);
  }

  //Edit mode
  getServiceLevelDetail() {
    this.spinnerService.show();
    this.serviceLevelService.getServiceLevelDetail(this.serviceLevelId).subscribe((data: any) => {
      if (data) {
        this.serviceLevelData = data // store the response data to forecastData variable
        this.serviceLevelForm.patchValue(this.serviceLevelData) // bind the response data to forecast form
        this.mediaType = this.serviceLevelData.channel;

        // bind hours, minutes and seconds for servive level
        let svcLvlHms = this.serviceLevelService.secondsToHms(this.serviceLevelData.targetAnswerTime)
        let svcLvlTime = svcLvlHms.split(':'); // split hours, minutes and seconds
        this.svcLvlHour = {value: svcLvlTime[0]}; // bind hours
        this.svcLvlMinute = {value: svcLvlTime[1]}; // bind minutes
        this.svcLvlSecond = {value: svcLvlTime[2]}; // bind seconds

        // bind hours, minutes and seconds for avg speed of answer
        let avgSpeedHms = this.serviceLevelService.secondsToHms(this.serviceLevelData.avgSpeedToAnswer)
        let avgSpeedTime = avgSpeedHms.split(':'); // split hours, minutes and seconds
        this.avgSpeedHour = {value: avgSpeedTime[0]}; // bind hours
        this.avgSpeedMinute = {value: avgSpeedTime[1]}; // bind minutes
        this.avgSpeedSecond = {value: avgSpeedTime[2]}; // bind seconds
        
        this.getWfmConfigs(this.serviceLevelData.wfmConfigId); // get wfm config list based on wfm config id 
      }else{
        this.messageService.add({ severity: 'info', summary: 'Service Quality detail is not available for Id: ' + this.serviceLevelId });
        setTimeout(() => {
          this.router.navigate(['wfm/service_levels/list']);
          this.spinnerService.hide();
        }, 2000);
      }
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Service Quality details are not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  // Page load -get wfm config details
  getWfmConfigs(wfmConfigId) {
    this.forecastService.getWfmConfigId().subscribe((data: any) => {
      if (data.Items[0]) {
        this.wfmConfigs = data.Items;
        if (this.isAddMode && this.wfmConfigs.length) {
          this.selectedConfig = this.wfmConfigs[0];
        }
        if (!this.isAddMode) {
          this.preSelectWfmConfig(wfmConfigId);
        }
      } else {
        this.wfmConfigs = [];
        this.spinnerService.hide();
        this.messageService.add({ severity: 'error', summary: 'Wfm config is not available', detail: 'Please try again later' });
      }
      if (this.isAddMode) {
        this.spinnerService.hide();
      }
    }, (error) => {
      console.log('error:', error.error.message);
      this.messageService.add({ severity: 'error', summary: 'Wfm config is not available', detail: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  preSelectWfmConfig(wfmConfigId) {
    setTimeout(() => {
      // $('input:radio[name="configOptions"]').filter('[value="' + wfmConfigId + '"]').prop('checked', true);
      // $('input:radio[name="configOptions"]').filter('[value!="' + wfmConfigId + '"]').prop('disabled', true);
      this.selectedConfig = {
        wfmConfigId: this.serviceLevelData.wfmConfigId,
        configId: this.serviceLevelData.configId
      }
      this.spinnerService.hide();
    }, 1000);
  }

  // Wfm config onchange to get selected config and queue list
  onChangeConfig(config) {
    this.selectedConfig = config;
  }

  // validation rules for service level, target answer time and avg speed of answer
  validateTime(group: FormGroup) {

    // let serviceLvl = group.controls.serviceLevel.value;
    // let targetAnsTime = group.controls.targetAnswerTime.value;
    // let avgSpeedAnswer = group.controls.avgSpeedToAnswer.value;

    // // Validate service level
    // if(serviceLvl !== '' && serviceLvl != null){
    //   if (parseInt(serviceLvl) > 100) {
    //     return { serviceLevel_invalid: true }
    //   }
    //   if (parseInt(serviceLvl) < 1) {
    //     return { serviceLevel_invalid: true }
    //   }
    // }

    // // Validate target answer time
    // if(targetAnsTime !== '' && targetAnsTime != null){
    //   if (parseInt(targetAnsTime) < 1) {
    //     return { targetAnsTime_invalid: true }
    //   }
    // }

    // // Validate avg speed of answer
    // if(avgSpeedAnswer !== '' && avgSpeedAnswer != null){
    //   if (parseInt(avgSpeedAnswer) < 1) {
    //     return { avgSpeedAnswer_invalid: true }
    //   }
    // }

    // let hours = group.controls.serviceLevelHours.value;
    // let mins = group.controls.serviceLevelMinutes.value;
    // let secs = group.controls.targetAnswerTime.value;

    // let avgHours = group.controls.avgSpeedofAnswerHours.value;
    // let avgMins = group.controls.avgSpeedofAnswerMinutes.value;
    // let avgSecs = group.controls.avgSpeedToAnswer.value;

    // // To check service levels - hours, minutes and seconds are valid
    // if (hours !== '' && hours != null) {
    //   if (parseInt(hours) > 24) {
    //     return { serviceLevelHoursInvalid: true }
    //   }
    // }if (mins !== '' && mins != null) {
    //   if (parseInt(mins) > 59) {
    //     return { serviceLevelMinutesInvalid: true }
    //   }
    // }if (secs !== '' && secs != null) {
    //   if (parseInt(secs) > 59) {
    //     return { serviceLevelSecondsInvalid: true }
    //   }
    // }

    // // To check average spped of answer - hours, minutes and seconds are valid
    // if (avgHours !== '' && avgHours != null) {
    //   if (parseInt(avgHours) > 24) {
    //     return { avgHoursInvalid: true }
    //   }
    // }if (avgMins !== '' && avgMins != null) {
    //   if (parseInt(avgMins) > 59) {
    //     return { avgMinutesInvalid: true }
    //   }
    // }if (avgSecs !== '' && avgSecs != null) {
    //   if (parseInt(avgSecs) > 59) {
    //     return { avgSecondsInvalid: true }
    //   }
    // }
  }

  cancelServiceLevel() {
    this.serviceLevelForm.reset();
    this.router.navigate(['wfm/service_levels/list']);
  }

  scroll(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }

}