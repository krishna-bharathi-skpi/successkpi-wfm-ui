import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonMethods } from '../../../../common/common.components';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { serviceLevelService } from '../../service-levels/serviceLevel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ForecastService } from '../forecast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import * as $ from "jquery";
import { GlobalComponent } from '../../../../global/global.component';
import { OverlayPanel } from 'primeng/overlaypanel';
import { isEqual, pick, omit } from 'lodash';

@Component({
  selector: 'app-add-edit-forecast',
  templateUrl: './add-edit-forecast.component.html',
  styleUrls: ['./add-edit-forecast.component.css'],
  providers: [MessageService],
  // encapsulation: ViewEncapsulation.None,
})

export class AddEditForecastComponent implements OnInit {

  // To validate a form
  isSubmitted: boolean = false;
  isServiceButtonClicked: boolean = false;
  forecastForm: FormGroup;
  // date variables to set restrictions 
  startDate = {
    minDate: null,
    maxDate: null
  }
  endDate = {
    minDate: null,
    maxDate: null
  }
  description = ''; // to show the forecast description count to user
  slDescription: any = '' // to show the service level description count to user

  @ViewChild('dt') table: Table; // to perform all the operations of datatable
  @ViewChild('op') panel: OverlayPanel;

  wfmConfigs: any = []; // to fetch the wfm config list
  selectedConfig: any = []; // to select item in a datatable
  selectedConfiglength: any; // to get length of selected config
  serviceLevels: any = []; // array to store service level dropdown options
  serviceLevelOption: any; // ngModel for Service Level dropdown

  //queue
  alphabets: any = []; // contains alpahabets
  queues: any = []; // contains queue data
  queuesList: any = []; // used one more variable for storing queue data to avoid api request
  selectedQueues: any = []; // contains selected queue data
  frequentQueues: any = [] // to store frequent queues
  selectedFrequentQueues: any = [] // to store selected frequent queues
  searchKey: any = null! // global search for queue

  //edit mode
  staffingRequestId!: any; // to get the specific forecast detail
  isAddMode!: boolean; // to check the mode add/update
  forecastData: any = []; // contains specific forecast data for editing

  // To validate a service level dialog form
  isServiceLevelDialogSubmitted: boolean = false;
  serviceLevelFormDialog: FormGroup;
  // serviceLevel: any; // ngModel
  mediaTypeServiceLevelDialog: any = { value: 'Voice' } // ngModel - default selection for Media Type
  channel: any = { value: 'Voice' } // ngModel - default selection for Media Type
  display: boolean = false; // dialog - show/hide

  successKpiErrorMsgSummary = 'Sorry! You cant able to create forecast';
  successKpiErrorMsgDetail = 'Please contact SuccessKPI adminstrator';

  isValidShrinkage:any = true;
  isValidOccupancy:any = true;

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

  manageMediaTypeEvent:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private el: ElementRef,
    private commonMethods: CommonMethods,
    public global: GlobalComponent,
    private forecastService: ForecastService,
    private spinnerService: NgxSpinnerService,
    private serviceLevelService: serviceLevelService,
    private messageService: MessageService
  ) {
    this.commonMethods.dynamicBackgroundColorChange('white');

    this.staffingRequestId = this.route.snapshot.params['id'];
    this.isAddMode = !this.staffingRequestId;

    if(this.isAddMode){
      this.forecastForm = this.formBuilder.group({
        staffingRequestName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9-_ ]*$')]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        staffingRequestDescription: [null, [Validators.maxLength(400), Validators.pattern('^[a-zA-Z0-9-_,. ]*$')]],
        // channel: ['', [Validators.required]],
        // serviceLevel: ['', [Validators.required]],
        shrinkage: ['', [Validators.required, Validators.maxLength(5)]],
        occupancy: ['', [Validators.required, Validators.maxLength(3)]],
        isNotified: [false, [Validators.required]]
      }, { validator: this.checkDates });
    }else{
      this.forecastForm = this.formBuilder.group({
        staffingRequestName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9-_ ]*$')]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        staffingRequestDescription: [null, [Validators.maxLength(400), Validators.pattern('^[a-zA-Z0-9-_,. ]*$')]],
        // channel: ['', [Validators.required]],
        // serviceLevel: ['', [Validators.required]],
        shrinkage: ['', [Validators.required, Validators.maxLength(6)]],
        occupancy: ['', [Validators.required, Validators.maxLength(3)]],
        isNotified: [false, [Validators.required]]
      });
    }
    
    this.serviceLevelFormDialog = this.formBuilder.group({
      serviceLevelName: [null, [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9-_ ]*$')]],
      serviceLevelDescription: [null, [Validators.maxLength(400), Validators.pattern('^[a-zA-Z0-9-_,. ]*$')]],
      // channel: [{ value: 'Voice' }, [Validators.required]],
      serviceLevel: [null, [Validators.required, Validators.maxLength(3)]],
      // targetAnswerTime: [null, [Validators.required, Validators.maxLength(6)]],
      // avgSpeedToAnswer: [null, [Validators.maxLength(3)]]
    }, { validator: this.validateTime });
  }

  ngOnInit(): void {

    // this.staffingRequestId = this.route.snapshot.params['id'];
    // this.isAddMode = !this.staffingRequestId;
    this.forecastService.alignWfmContainer();
    this.spinnerService.show();

    if (!this.isAddMode) {
      this.getForecastData();
    } else {
      this.getWfmConfigs(null);
      this.initiateShrinkageAndOccupancy();
      this.getEndDate(); // get end date for forecasting from backend
    }
    this.loadAlphabets(); // load alphabets for queue search
    this.bindStartDate(); // bind todays date to start date field
  }

  bindStartDate() {
    // To disable the start date and end date between the range
    this.startDate.minDate = new Date();

    let todaysDate = Date.now();
    let startDate = this.datePipe.transform(todaysDate, 'MM/dd/yyyy');
    this.forecastForm.get("startDate").setValue(startDate);
  }

  getEndDate() {
    this.forecastService.getEndDate().subscribe((data: any) => {
      if (data.Items[0]) {
        if (data.Items[0].endDate) {
          this.startDate.maxDate = new Date(data.Items[0].endDate);
          this.endDate.minDate = new Date();
          // this.endDate.minDate = new Date(data.Items[0].endDate);
          this.endDate.maxDate = new Date(data.Items[0].endDate);
          let endDate = this.datePipe.transform(this.endDate.maxDate, 'MM/dd/yyyy');
          this.forecastForm.get("endDate").setValue(endDate);
          this.forecastForm.get('endDate').enable();
        } else {
          this.forecastForm.get('endDate').disable();
          this.spinnerService.hide();
        }
      } else {
        this.forecastForm.get('endDate').disable();
        this.spinnerService.hide();
      }
    }, (error) => {
      this.forecastForm.get('endDate').disable();
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'End date is not available', detail:'Please try again later' });
      this.spinnerService.hide();
    })

  }

  initiateShrinkageAndOccupancy() {
    this.forecastForm.get('shrinkage').setValue('0'); // set default value as 80% for service level
    this.forecastForm.get('occupancy').setValue('85'); // set default value as 20 seconds for service level
  }

  checkIsValidInput(value, inputName){
    if(inputName == 'shrinkage'){
      if(parseInt(value) <= 100){
        this.isValidShrinkage = true
      }
    }
    if(inputName == 'occupancy'){
      if(parseInt(value) <= 100){
        this.isValidOccupancy = true
      }
    }
  }

  submitForecast(saveMode: string) {
    // To check wfm configs are available
    if (!this.wfmConfigs?.length || !this.forecastForm.get("endDate").value) {
      this.messageService.add({ severity: 'error', summary: this.successKpiErrorMsgSummary, detail:this.successKpiErrorMsgDetail });
      return
    }

    // formatting start date
    let fromDate = this.forecastForm.get('startDate').value;
    fromDate = this.datePipe.transform(fromDate, 'MM/dd/yyyy');

    // formatting end date
    let toDate = this.forecastForm.get('endDate').value;
    toDate = this.datePipe.transform(toDate, 'MM/dd/yyyy');
    
    // check end date is greater than start date
    if (toDate < fromDate) {
      if(!this.isAddMode){
        this.messageService.add({ severity: 'error', summary: 'End date should be greater than start date' });
      }
      this.scroll('forecast_traffic_group');
      return
    }

    // to check wfm config details are selected by user
    if (this.isAddMode) {
      let selectedConfigLength = Object.keys(this.selectedConfig).length;
      if (selectedConfigLength == 0) {
        this.messageService.add({ severity: 'error', summary: 'Choose any one option from Configuration' });
        if (this.wfmConfigs.length > 1) {
          $('#wfm_config_header').addClass('alert-text');
          this.scroll('wfm_configs_table');
        }
        return
      }
    }

    // checking form is valid
    this.isSubmitted = true;
    if (this.forecastForm.invalid) {
      // set focus on invalid controls
      for (const key of Object.keys(this.forecastForm.controls)) {
        if (this.forecastForm.controls[key].invalid) {
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

    // validate service level
    if (!this.serviceLevelOption) {
      this.scroll('service_level_group');
      return;
    }

    let shrinkage = this.forecastForm.get('shrinkage').value;
    if(parseInt(shrinkage) > 100){
      this.isValidShrinkage = false;
      this.scroll('shrinkage_occupancy_section');
      return;
    }else{
      this.isValidShrinkage = true
    }

    let occupancy = this.forecastForm.get('occupancy').value;
    if(parseInt(occupancy) > 100){
      this.isValidOccupancy = false;
      this.scroll('shrinkage_occupancy_section');
      return;
    }else{
      this.isValidOccupancy = true;
    }

    // to check queues are selected by user
    if (this.selectedQueues.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Please select queues from the list below' });
      $('#queue_header').addClass('alert-text');
      this.scroll('queue_set');
      return
    }

    let staffingReqName = this.forecastForm.get('staffingRequestName').value;
    this.forecastForm.get('staffingRequestName').setValue(staffingReqName);

    if (!this.forecastForm.get('shrinkage').value) {
      this.forecastForm.get('shrinkage').setValue(0);
    }
    if (!this.forecastForm.get('occupancy').value) {
      this.forecastForm.get('occupancy').setValue(85);
    }

    // assign new properties to queue object using loop
    let queueObj = {};
    let queueArray = [];
    // $('.chip-added').each(function () {
    //     let obj = $(this).attr('id').split('_');
    //     let key = obj[0];
    //     let value = obj[1];
    //     queueObj[key] = value;
    // })
    $('.chip-added').each(function () {
      let obj = $(this).attr('id').split('_');
      let key = obj[0];
      let value = obj[1];
      queueArray.push(key);
    })

    // condition for media type
    let media_type = null;
    if (this.mediaType !== undefined) {
      media_type = (this.mediaType) ? this.mediaType : null;
      // media_type = (this.mediaType.value) ? this.mediaType.value : null;
    }

    // condition for service level based on dropdown and textbox
    let serviceLevelName = null;
    if (this.serviceLevelOption !== undefined) {
      serviceLevelName = (this.serviceLevelOption.Key) ? this.serviceLevelOption.Key : null;
    }

    let updateObj = {};
    if (!this.isAddMode) {
      updateObj = {
        createdBy: this.forecastData[0].createdBy,
        createdTimestamp: this.forecastData[0].createdTimestamp
      }
    }

    // // assigning data for backend
    let dataForBackend = [{
      configId: this.selectedConfig.configId,
      wfmConfigId: this.selectedConfig.wfmConfigId,
      platformId: this.selectedConfig.platformId,
      platformName: this.selectedConfig.platformName,
      interval: this.selectedConfig.interval,
      term: this.selectedConfig.term,
      queueId: queueArray,
      ...this.forecastForm.value,
      channel: media_type,
      service_level_id: serviceLevelName,
      startDate: fromDate,
      endDate: toDate,
      isSave: saveMode,
      ...updateObj
    }]
    // console.log('dataForBackend:', dataForBackend);
    if (this.isAddMode) {
      // Create forecast payload request
      this.spinnerService.show();
      this.forecastService.createForecast(dataForBackend[0]).subscribe((data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Forecast has been created successfully' });
        setTimeout(() => {
          this.router.navigate(['wfm/forecast/list']);
          this.spinnerService.hide();
        }, 2000);
      }, (error) => {
        console.log('error:', error.error.message);
        this.messageService.add({ severity: 'error', summary: error.error.message });
        this.spinnerService.hide();
      })
    } else {
      const valuesToOmitForModificationCheck = [...Object.keys(this.wfmConfigs.length ? this.wfmConfigs[0] : this.wfmConfigs), 
      'isNotified', 'isSave', 'createdBy', 'createdTimestamp', 'updatedBy', 'updatedTimestamp', 'status', 
      'staffingRequestId', 'queueId', 'serviceLevelId', 'service_level_id', 'startDate', 'endDate', '']

      const filteredPayload = omit(dataForBackend[0], valuesToOmitForModificationCheck)
      const filteredForecastData = omit(this.forecastData[0], valuesToOmitForModificationCheck)

      const isModified = !isEqual(filteredPayload, filteredForecastData);
      const isQueueModified = !isEqual(dataForBackend[0].queueId, Array.isArray(this.forecastData[0].queueId) ? this.forecastData[0].queueId : [this.forecastData[0].queueId])
      const isServiceLevelModified = !isEqual(dataForBackend[0].service_level_id, this.forecastData[0].serviceLevelId)

      if (isModified || isQueueModified || isServiceLevelModified) {
        //  Update forecast payload request
        this.spinnerService.show();
        dataForBackend.push({ staffingRequestId: this.staffingRequestId });
        this.forecastService.updateForecast(dataForBackend).subscribe((data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Forecast has been updated successfully' });
          setTimeout(() => {
            this.router.navigate(['wfm/forecast/list']);
            this.spinnerService.hide();
          }, 2000);
        }, (error) => {
          console.log('error:', error.error.message);
          this.messageService.add({ severity: 'error', summary: error.error.message });
          this.spinnerService.hide();
        })
      } else {
        this.router.navigate(['wfm/forecast/list']);
      }
    }
  }

  showServiceLevelDialog() {
    // validate media type and service level
    this.isServiceButtonClicked = true;
    if (!this.mediaType) {
      this.messageService.add({ severity: 'error', summary: 'Select a Media Type' });
      return;
    }

    this.showDialog();
    // this.channel = 'Voice';
    this.serviceLevelFormDialog.get('serviceLevel').setValue('80'); // set default value as 80% for service level
    
    // initiating values for service level
    this.svcLvlHours = this.serviceLevelService.hourOptions;
    this.svcLvlMinutes = this.serviceLevelService.timeOptions;
    this.svcLvlSeconds = this.serviceLevelService.timeOptions;

    this.svcLvlHour = {value:'00'}
    this.svcLvlMinute = {value:'00'}
    this.svcLvlSecond = {value:'20'}

    // // initiating values for avg speed of answer
    this.avgSpeedHours = this.serviceLevelService.hourOptions;
    this.avgSpeedMinutes = this.serviceLevelService.timeOptions;
    this.avgSpeedSeconds = this.serviceLevelService.timeOptions;
  }

  submitServiceLevelDialog() {
    this.isServiceLevelDialogSubmitted = true;
    if (this.serviceLevelFormDialog.invalid) {
      // set focus on invalid controls
      for (const key of Object.keys(this.serviceLevelFormDialog.controls)) {
        if (this.serviceLevelFormDialog.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      return;
    }

    // condition for media type
    let media_type = null;
    if (this.mediaType !== undefined) {
      media_type = (this.mediaType) ? this.mediaType : null;
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
    let dataForBackend = {
      wfmConfigId: this.selectedConfig.wfmConfigId,
      configId: this.selectedConfig.configId,
      ...this.serviceLevelFormDialog.value,
      targetAnswerTime: targetAnsTime,
      avgSpeedToAnswer: avgSpeedofAnswer,
      channel: media_type
    }
    
    // console.log('Service level dialog payload:', dataForBackend);
    // Create service level payload request
    this.spinnerService.show();
    this.serviceLevelService.createServiceLevel(dataForBackend).subscribe((data: any) => {
      if (data) {
        this.forecastService.getServiceLevelOptions(this.selectedConfig.wfmConfigId).subscribe((data: any) => {
          if (data) {
            // console.log('service level dialog data:', data);
            this.serviceLevels = data;
            this.serviceLevelOption = { Key: data[0].Key };
            // this.serviceLevelOptionId = data[0].Key;
            // console.log('serviceLevelOptionId 1:', this.serviceLevelOptionId);
            this.closeDialog();
            this.spinnerService.hide();
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Service Quality Objective has been created successfully!' });
            }, 200);
          }
        }, (error) => {
          console.log('error:', error.error.message);
          this.spinnerService.hide();
        })
      }
      this.spinnerService.hide();
    }, (error) => {
      console.log('error:', error.error.message);
      this.messageService.add({ severity: 'error', summary: error.error.message });
      this.spinnerService.hide();
    })
  }

  // To reset the service level dialog form and close the dialog
  cancelServiceLevelDialog() {
    $('#service_level_form_dialog input,textarea').val('');
    this.serviceLevelFormDialog.get('serviceLevelDescription').setValue('');
    // this.serviceLevelFormDialog.reset(); // error will occur in characters remaining, if we use this.
    this.closeDialog();
  }

  onFrequentQueueChange(event){
    this.selectedQueues = this.selectedFrequentQueues;
    $('.q-list .chip').removeClass('chip-sel');
    this.selectedQueues.forEach(element => {
      $('#chip_' + element.queueId).addClass('chip-sel');
    });
    if(this.selectedFrequentQueues.length){
      $('#queue_header').removeClass('alert-text');
    }else{
      $('#queue_header').addClass('alert-text');
    }
  }

  //Edit mode
  getForecastData() {
    this.forecastService.getForecast(this.staffingRequestId).subscribe((data: any) => {
      if (data[0]) {
        this.forecastData = data // store the response data to forecastData variable
        this.forecastForm.patchValue(this.forecastData[0]) // bind the response data to forecast form
        this.startDate.maxDate = new Date(this.forecastData[0].endDate);
        this.endDate.minDate = new Date(this.forecastData[0].endDate);
        this.endDate.maxDate = new Date(this.forecastData[0].endDate);
        this.mediaType = this.forecastData[0].channel // preset media type value in dropdown 
        // this.mediaType = { value: this.forecastData[0].channel } // preset media type value in dropdown 
        this.getWfmConfigs(this.forecastData[0].wfmConfigId); // get wfm config list based on wfm config id
      }else{
        this.messageService.add({ severity: 'info', summary: 'Forecast detail is not available for Id: ' + this.staffingRequestId });
        setTimeout(() => {
          this.router.navigate(['wfm/forecast/list']);
          this.spinnerService.hide();
        }, 2000);
      }
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Forecast details are not available', detail:'Please try again later' });
      this.spinnerService.hide();
    })
  }

  // Page load -get wfm config details
  getWfmConfigs(wfmConfigId) {
    this.forecastService.getWfmConfigId().subscribe((data: any) => {
      if (data.Items[0]) {
        this.wfmConfigs = data.Items;
        if (this.wfmConfigs.length > 1) {
          this.wfmConfigs.forEach(item => {
            if (this.isAddMode && item.wfmConfigId == 'c1') {
              setTimeout(() => {
                $('input:radio[name="configOptions"]').filter('[value="' + item.wfmConfigId + '"]').prop('checked', true);
                this.selectedConfig = item;
                this.selectedConfiglength = Object.keys(this.selectedConfig).length;
                this.getServiceLevelOptions(item.wfmConfigId);
                this.getQueues(item.wfmConfigId)
              }, 100);
            }
            if (item.wfmConfigId == wfmConfigId) {
              this.selectedConfig = item;
              this.selectedConfiglength = Object.keys(this.selectedConfig).length;
            }
          })
          if (this.isAddMode) {
            this.spinnerService.hide();
          }
        }
        if (this.wfmConfigs.length == 1) {
          this.selectedConfig = this.wfmConfigs[0];
          this.selectedConfiglength = Object.keys(this.selectedConfig).length;
          setTimeout(() => {
            $('.wfm-table #table_row_'+ this.selectedConfig.wfmConfigId).addClass('row-highlight');
          }, 1000);
        }
        if (this.isAddMode) {
          if (this.wfmConfigs.length == 1) {
            this.spinnerService.show();
            this.getServiceLevelOptions(this.selectedConfig.wfmConfigId);
            this.getQueues(this.selectedConfig.wfmConfigId);
            this.getMostFrequentQueues(this.selectedConfig.wfmConfigId)
            $('#wfm_config_header').removeClass('alert-text');
          }
        } else {
          setTimeout(() => {
            this.preSelectWfmConfig(wfmConfigId);
          }, 1000);
        }
      } else {
        this.wfmConfigs = [];
        this.spinnerService.hide();
        this.messageService.add({ severity: 'error', summary: 'Wfm config is not available', detail:'Please try again later' });
      }
    }, (error) => {
      console.log('error:', error.error.message);
      this.messageService.add({ severity: 'error', summary: 'Wfm config is not available', detail:'Please try again later' });
      this.spinnerService.hide();
    })
  }

  onChangeMediaType() {
    this.isSubmitted = false;
  }

  // to set the overlay panel position to the top
  manageMediaType(mediaType){
    this.isSubmitted = false;
    if(this.mediaType){
      this.messageService.add({ severity:'info', summary: 'You have changed your media type to ' + mediaType });
    }
    this.mediaType = mediaType;
    this.panel.hide();
    if(this.mediaType){
      this.manageMediaTypeEvent = true;
      this.spinnerService.show();
      this.getServiceLevelOptions(this.selectedConfig.wfmConfigId);
    }
  }

  setMenuItemTop(){
    setTimeout(() => {
      let menuItemTop = $('.mt-overlaypanel').css('top').replace('px','');
      if (parseInt(menuItemTop) < 800) {
        $('.mt-overlaypanel').css('margin-top', '-9px');
      }
    }, 100);
  }

  removeServiceLevelSection() {
    this.isSubmitted = false;
    this.mediaType = '';
    this.serviceLevelOption = '';
  }

  getServiceLevelOptions(wfmConfigId) {
    let model = {wfmConfigId: wfmConfigId, mediaType: this.mediaType}
    this.forecastService.getServiceLevelOptions(model).subscribe((data: any) => {
      // console.log('service level options:', data);
      if (data.length > 0) {
        this.serviceLevels = data;
        if (!this.isAddMode) {
          this.serviceLevelOption = { Key: this.forecastData[0].serviceLevelId };
        }
      }
      if(this.manageMediaTypeEvent){
        this.manageMediaTypeEvent = false;
        this.spinnerService.hide();
      }
    }, (error) => {
      console.log('error:', error.error.message);
      this.messageService.add({ severity: 'error', summary: 'Please try again later' });
      this.spinnerService.hide();
    })
  }

  // Wfm config onchange to get selected config and queue list
  onChangeConfig(config) {
    // console.log('selected config:', config);
    this.selectedQueues = [];
    this.selectedConfig = config;
    this.selectedConfiglength = Object.keys(this.selectedConfig).length;
    this.spinnerService.show();
    this.getServiceLevelOptions(config.wfmConfigId);
    this.getQueues(config.wfmConfigId)
    $('#wfm_config_header').removeClass('alert-text');
  }

  // To get queue list based on wfm config id
  getQueues(wfmConfigId) {
    let model = {wfmConfigId:wfmConfigId, isFrequent: false}
    this.forecastService.getQueueList(model).subscribe((data: any) => {
      this.queues = data;
      this.queues = this.queues.sort((n1, n2) => {
        if (n1.queueName > n2.queueName) {
          return 1;
        }
        if (n1.queueName < n2.queueName) {
          return -1;
        }
        return 0;
      });
      this.queuesList = this.queues; // to store the queues in another variable-queuesList to avoid api request
      if (!this.isAddMode) {
        if (this.forecastData[0].wfmConfigId == wfmConfigId) {
          this.preSelectedQueues()
        } else {
          this.selectedQueues = [];
        }
      } else {
        this.spinnerService.hide();
      }
    }, (error) => {
      console.log('error:', error.error.message);
      this.messageService.add({ severity: 'error', summary: 'Queues are not available', detail:'Please try again later' });
      this.spinnerService.hide();
    })
  }

  getMostFrequentQueues(wfmConfigId){
    let model = {wfmConfigId:wfmConfigId, isFrequent: true}
    this.forecastService.getQueueList(model).subscribe((data: any) => {
      this.frequentQueues = data;
    });
  }

  preSelectWfmConfig(wfmConfigId) {
    $('input:radio[name="configOptions"]').filter('[value="' + wfmConfigId + '"]').prop('checked', true);
    $('input:radio[name="configOptions"]').filter('[value!="' + wfmConfigId + '"]').prop('disabled', true);
    this.getServiceLevelOptions(wfmConfigId);
    this.getQueues(wfmConfigId);
  }

  // Pre-select the queues for edit mode
  preSelectedQueues() {
    // let queue  = [];
    // this.forecastData.forEach(element => {
    //   queue.push(element.queueId)
    // });
    // console.log('queue queue:', queue);
    setTimeout(() => {
      // if (queue) {
      let queueArray = [];
      this.forecastData.forEach(element => {
        $('#chip_' + element.queueId).addClass('chip-sel')
        let obj = {}
        obj['queueId'] = element.queueId;
        obj['queueName'] = $('#chip_' + element.queueId).addClass('chip-sel').text();
        queueArray.push(obj);
      });
      // for (var key in queue) {
      //   if (queue.hasOwnProperty(key)) {
      //     let obj = {}
      //     obj['queueId'] = key;
      //     obj['queueName'] = queue[key];
      //     $('#chip_' + key).addClass('chip-sel')
      //     queueArray.push(obj);
      //   }
      // }
      // console.log('queueArray:', queueArray);
      this.selectedQueues = queueArray;
      this.spinnerService.hide();
      // }
    }, 1000);
  }

  applyFilter() {
    this.queues = this.queuesList;
    if (this.searchKey) {
      this.queues = this.queues.filter((item: any) => {
        return item.queueName.toLocaleLowerCase().includes(this.searchKey.toLocaleLowerCase())
      })
    }
  }

  loadAlphabets() {
    this.alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  }

  getAlphabeticalQueues(alpha) {
    this.queues = this.queuesList;
    $('.alpha a').removeClass('alpha-sel')
    this.queues = this.queues.filter(queue => {
      $('#alpha_' + alpha).addClass('alpha-sel')
      return queue.queueName.toLocaleLowerCase().startsWith(alpha.toLocaleLowerCase())
    })
    setTimeout(() => {
      this.selectedQueues.forEach(element => {
        $('#chip_' + element.queueId).addClass('chip-sel')
      })
    }, 100);
  }

  addQueues(q) {
    const isQueueExisting = this.selectedQueues.filter(x => x.queueId == q.queueId);
    if (isQueueExisting == 0) {
      this.selectedQueues.push(q);
      $('#chip_' + q.queueId).addClass('chip-sel');
      $('#queue_header').removeClass('alert-text');
    } else {
      this.messageService.add({ severity: 'error', summary: 'The queue - ' + q.queueName + ' is already selected' });
    }
  }

  selectAllQueues() {
    this.selectedQueues = this.queues;
    $('.q-list li').addClass('chip-sel');
  }

  seeAllQueues() {
    $('.alpha a').removeClass('alpha-sel')
    this.queues = this.queuesList;
    setTimeout(() => {
      this.selectedQueues.forEach(element => {
        $('#chip_' + element.queueId).addClass('chip-sel')
      })
    }, 200);
  }

  resetQueues() {
    this.selectedQueues = [];
    this.selectedFrequentQueues = [];
    this.queues = this.queuesList;
    $('.alpha a').removeClass('alpha-sel');
    $('.q-list .chip').removeClass('chip-sel');
  }

  removeQueue(queue) {
    this.selectedQueues = this.selectedQueues.filter(item => {
      $('#chip_' + queue.queueId).removeClass('chip-sel')
      return item.queueId !== queue.queueId
    })
  }

  cancelForecast() {
    if (this.isAddMode) {
      this.forecastForm.reset();
      this.router.navigate(['wfm/forecast/list']);
    } else {
      this.router.navigate(['wfm/forecast/list']);
    }
  }

  // validation rules for start and end date
  checkDates(group: FormGroup) {

    let startDate: any = null;
    let endDate: any = null;
    let currentDate = new Date(new Date().toDateString());
    startDate = new Date(group.controls.startDate.value);
    endDate = new Date(group.controls.endDate.value);

    // to check start date is less than current date
    if (startDate !== null) {
      if (startDate < currentDate) {
        return { startDateNotValid: true }
      }
    }

    if (endDate !== null && startDate !== null) {
      // to check end date is greater than start date
      if (endDate < startDate) {
        return { endDateNotValid: true }
      }
      // to check end date is less than or equal to 4 weeks
      let time = endDate - startDate;
      // let time = endDate.getTime() - startDate.getTime();
      let days = time / (1000 * 3600 * 24); //Diference in Days
      if (days > 28) {
        return { daysDiffNotValid: true }
      }
      return null;
    }
  }

  // validation rules for service level, target answer time and avg speed of answer
  validateTime(group: FormGroup) {

    // let serviceLvl = group.controls.serviceLevel.value;
    // let targetAnsTime = group.controls.targetAnswerTime.value;
    // let avgSpeedAnswer = group.controls.avgSpeedToAnswer.value;

    // // Validate service level
    // if (serviceLvl !== '' && serviceLvl != null) {
    //   if (parseInt(serviceLvl) > 100) {
    //     return { serviceLevel_invalid: true }
    //   }
    //   if (parseInt(serviceLvl) < 1) {
    //     return { serviceLevel_invalid: true }
    //   }
    // }

    // // Validate target answer time
    // if (targetAnsTime !== '' && targetAnsTime != null) {
    //   if (parseInt(targetAnsTime) < 1) {
    //     return { targetAnsTime_invalid: true }
    //   }
    // }

    // // Validate avg speed of answer
    // if (avgSpeedAnswer !== '' && avgSpeedAnswer != null) {
    //   if (parseInt(avgSpeedAnswer) < 1) {
    //     return { avgSpeedAnswer_invalid: true }
    //   }
    // }
  }

  scroll(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }

  // Show message to user in dialog
  showDialog() {
    this.display = true;
  }

  // Hide the dialog
  closeDialog() {
    this.display = false;
  }

}