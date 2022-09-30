import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonMethods } from '../../../../common/common.components';
import { ActivatedRoute, Router } from '@angular/router';
import UserData from '../../../../user';
import { Table } from 'primeng/table';
import { Parser } from 'json2csv';
import { DatePipe } from '@angular/common';
import * as $ from "jquery";
import { ForecastService } from '../forecast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { KeyQuestionsService } from '../../../analyze/key-questions/key-questions.service';
import { GlobalComponent } from '../../../../global/global.component';
import { environment } from '../../../../../environments/environment';
import { MstrTokenService } from '../../../../services/mstrtoken.service';
import { serviceLevelService } from '../../service-levels/serviceLevel.service';
import { EvaluationWorkspaceNacdService } from '../../../evaluations/evaluation-workspace-nacd/evaluation-workspace-nacd.service';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { InteractionService } from '../../../interaction-details/interaction-details.service';

declare var microstrategy: any;

@Component({
  selector: 'app-forecast-detail',
  templateUrl: './forecast-detail.component.html',
  styleUrls: ['./forecast-detail.component.css'],
  providers: [MessageService]
})

export class ForecastDetailComponent implements OnInit {

  @ViewChild('dt') table: Table; // to perform all the operations of datatable
  @ViewChild('p', { static: false }) paginator?: Paginator; // To reset the paginator

  @ViewChild('opFilter',{static:true}) panel: OverlayPanel;
  // @ViewChild('elm',{static:true}) elm: ElementRef;

  staffingRequestId!: any; // to get the specific forecast detail
  forecast: any; // to show specific details of forecasting 
  serviceLevelName = null // to show service level name in info tab
  service:any // to store specific service level details

  // mstr configs
  mstrIdToken: any;
  mstrAuthToken: any;
  idToken: any;
  projectId: any;
  public chartDataUrl: SafeResourceUrl;
  public gridDataUrl: SafeResourceUrl;
  mstrBaseUrl: string = "https://analytics-qa.successkpis.com/AnalyticsLibrary/app/";
  chartDossierId = '6329DCA98D4D2F476555DB84D8D91009'; // tab 1 - aggregate
  gridDossierId = 'AF7D0730A34DA4439A27E4AD0D2EBF16'; // tab 2 - grid
  forecastDossierId = 'F3A6574D4BBD2A20E90EB0920A6ACAD7'; // page 1 - chart and page 2 - grid
  dossier1:any = null;
  dossier2:any = null;

  wsClose: any = ""; // websocket

  // for testing
  forecastDetail: any = [];
  forecastData: any = [];
  selectedForecastData: any = [];
  constforecastData: any = [];
  isEditModeEnabled: boolean = false;
  editedData: any = [];
  fromDate: any;
  toDate: any;
  isLoading: boolean = true; // to show/hide the message - no records found
  grid_mode: boolean = false;
  isGridUIUpdateModeEnabled: boolean = false;
  MSTR_mode:boolean = false;

  wfmConfigs: any = [];
  wfmConfigId: string;

  // server side actions - searching, sorting
  params = {
    pageNo: 1,
    pageSize: 500,
    orderBy: "desc",
    orderColumn: "target_timestamp",
    queue: "",
    forecastType: "",
    mediaType: "",
    startDate: "",
    endDate: "",
    interval: ""
  }
  sortOrder: number = -1; // to initiate sort order as desc during page load

  // to config pagination
  currentPage: any = 1;
  totalRecords: any;
  pageNo: any = 1;
  pageSize: any = 500;
  first: any = 0;
  firstPage: any = 0;
  last: any = 0;
  loading: boolean;

  forecastGridModel = {
    wfmConfigId: null,
    staffingRequestId: this.route.snapshot.params['id']
  }

  cols = [
    { field: 'agentsReq', header: 'Agents Req.' },
    { field: 'offered', header: 'Offered' },
    { field: 'aht', header: 'AHT' },
    { field: 'noShrinkage', header: 'Agents Required No Shrinkage' },
    { field: 'serviceLevel', header: 'serviceLevel' },
    { field: 'avgSpeedOfAnswer', header: 'Avg Speed of Answer' },
    { field: 'occupancy', header: 'Occupancy' },
    { field: 'mediaType', header: 'Media Type' },
    { field: 'quantile', header: 'Quantile' },
    { field: 'queue', header: 'Queue' },
  ];
  col = {
      agentsReq: 'agentsReq',
      offered: 'offered',
      aht: 'aht',
      noShrinkage: 'noShrinkage',
      serviceLevel: 'serviceLevel',
      avgSpeedOfAnswer: 'avgSpeedOfAnswer',
      occupancy: 'occupancy',
      mediaType: 'mediaType',
      quantile: 'quantile',
      queue: 'queue'
  }
  selectedColumns: any;

  // UI Grid Filters
  forecastTypes:any = [];
  selectedForecastType:any;

  mediaTypes = [
    { value: 'Voice', label: 'Voice' },
    { value: 'Chat', label: 'Chat' },
    { value: 'Email', label: 'Email' },
    { value: 'Social', label: 'Social' }
  ]
  selectedMediaType: any;

  queues:any = [];
  selectedQueue:any;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private el: ElementRef,
    private commonMethods: CommonMethods,
    public global: GlobalComponent,
    private forecastService: ForecastService,
    private serviceLevelService: serviceLevelService,
    private keyQuestionService: KeyQuestionsService,
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    public sanitizer: DomSanitizer,
    private mstrTokenService: MstrTokenService,
    public evService: EvaluationWorkspaceNacdService,
    private keyQuestionsService: KeyQuestionsService,
    private interactionService: InteractionService
  ) {
    this.commonMethods.dynamicBackgroundColorChange('white');
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.forecastService.alignWfmContainer();
    this.staffingRequestId = this.route.snapshot.params['id'];
    this.getForecastDetail(this.staffingRequestId);
    this.getWfmConfigs(); // to get forecast UI grid
    this.selectedColumns = this.cols;
  }

  // Page load -get wfm config details
  getWfmConfigs() {
    this.forecastService.getWfmConfigId().subscribe((data: any) => {
        if (data.Items[0]) {
            this.wfmConfigs = data.Items;
            if (this.wfmConfigs.length) {
                this.wfmConfigId = this.wfmConfigs[0].wfmConfigId;
                this.forecastGridModel.wfmConfigId = this.wfmConfigs[0].wfmConfigId;
                this.getForecastData(this.params, this.forecastGridModel); // for testing
            }
        } else {
            this.wfmConfigs = [];
            this.wfmConfigId = null;
            this.spinnerService.hide();
            this.messageService.add({ severity: 'error', summary: 'Wfm config is not available', detail: 'Please try again later' });
        }
    }, (error) => {
        console.log('error:', error.error.message);
        this.messageService.add({ severity: 'error', summary: 'Wfm config is not available', detail: 'Please try again later' });
        this.spinnerService.hide();
    })
}

  applySearch(){
    this.params.forecastType = (this.selectedForecastType) ? this.selectedForecastType : "";
    this.params.mediaType = (this.selectedMediaType) ? this.selectedMediaType : "";
    this.params.queue = (this.selectedQueue) ? this.selectedQueue : "";
    
    if(this.params.startDate && this.params.endDate){
      this.params.interval = "yes";
    }
    if(!this.params.startDate || !this.params.endDate){
      this.params.interval = "";
    }
    this.panel.hide();
    this.getForecastData(this.params, this.forecastGridModel); // for testing
    // console.log('params:', this.params);
  }

  clearAdvancedFilter(dt){
    dt.reset();
    this.params = {
      pageNo: 1,
      pageSize: 500,
      orderBy: "desc",
      orderColumn: "target_timestamp",
      queue: "",
      forecastType: "",
      mediaType: "",
      startDate: "",
      endDate: "",
      interval: ""
    }
    this.getForecastData(this.params,this.forecastGridModel);
    $('input:radio[name="forecast_type"]').prop('checked', false);
    $('input:radio[name="media_type"]').prop('checked', false);
    $('input:radio[name="queue_name"]').prop('checked', false);
    this.panel.hide();
    this.resetFilterAccordionTabs();
  }

  onChangeFromDate(value){
    this.params.startDate = (value) ? this.datePipe.transform(value, 'yyyy-MM-dd') + ' 12:00:00' : "";
  }

  onChangeToDate(value){
    this.params.endDate = (value) ? this.datePipe.transform(value, 'yyyy-MM-dd') + ' 12:00:00' : "";
  }

  // Get specific forecast detail
  getForecastDetail(staffingRequestId) {
    this.mstrBaseUrl = environment.mstr_Url;
    this.forecastService.getForecast(staffingRequestId).subscribe((data: any) => {
      if (data) {
        this.forecast = data[0];
        this.getMstrConfigs();
        this.getServiceLevelOptions(this.forecast.wfmConfigId);
        this.getServiceLevelDetail(this.forecast.serviceLevelId);
        // let customerId = UserData.customerId;
      }
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: 'Forecast details are not available', detail:'Please try again later' });
      this.spinnerService.hide();
    })
  }

  // To get forecasting data from backend
  getForecastData(params, model) {
    this.loading = true;
    if(model.wfmConfigId && model.staffingRequestId){
      this.forecastService.getForecastingData(params, model).subscribe((data: any) => {
        if (data) {
          this.forecastData = data.items;
          this.forecastData.forEach(element => {
            let avgSpeedHms = this.serviceLevelService.secondsToHms(element.WJXBFS3) // for avg speed of answser
            let avgSpeedTime = avgSpeedHms.split(':'); // split hours, minutes and seconds
            element.WJXBFS3 = avgSpeedTime[0] + ':' + avgSpeedTime[1] + ':' + avgSpeedTime[2]; // concatenate hours, minutes and seconds
            // this.queues.push({queue_id: element.queue_id, queue_name: element.queue_name});
          })  
          
          // getting distinct values from forecast data response for filters
          if(!this.forecastTypes.length){
            this.forecastTypes = this.forecastData.filter((a, i) => this.forecastData.findIndex((s) => a.forecast_type === s.forecast_type) === i)
          }
          if(!this.queues.length){
            this.queues = this.forecastData.filter((a, i) => this.forecastData.findIndex((s) => a.queue_name === s.queue_name) === i)
          }

          if (this.first == 1) {
            for (let i = 0; i < this.forecastData.length; i++) {
              this.forecastData[i]["SERIAL_NO"] = i + 1;
            }
          }else{
            for (let i = 0; i < this.forecastData.length; i++) {
              this.forecastData[i]["SERIAL_NO"] = this.first + i;
            }
          }
          this.isLoading = false;
          this.totalRecords = data.totalCount // To get total records count
          setTimeout(() => {
            if (!this.totalRecords) {
              this.first = 0
            }
          }, 500);
          this.last = this.firstPage + this.forecastData.length;

          // enable checkbox selection while navigating from page 1 to page 2
          if ($(".select-all-chkbox .ui-chkbox-box").hasClass("ui-state-active")) {
            this.selectedForecastData = data.items;
          }
          this.getConstForecastData(params, model); // for comparing values between actual values and edited values
        }
        // this.spinnerService.hide();
        this.loading = false;
      }, (error) => {
        console.log(error);
        // this.spinnerService.hide();
        this.loading = false;
      })
    }
  }

  // To get forecasting data for comparing values between actual and edited 
  getConstForecastData(params, model) {
    this.loading = true;
    if(model.wfmConfigId && model.staffingRequestId){
      this.forecastService.getForecastingData(params, model).subscribe((data: any) => {
        if (data) {
          this.constforecastData = data.items;
          if (this.first == 1) {
            for (let i = 0; i < this.constforecastData.length; i++) {
              this.constforecastData[i]["SERIAL_NO"] = i + 1;
            }
          }else{
            for (let i = 0; i < this.constforecastData.length; i++) {
              this.constforecastData[i]["SERIAL_NO"] = this.first + i;
            }
          }
          this.isLoading = false;
        }
        this.loading = false;
      }, (error) => {
        console.log(error);
        this.loading = false;
      })
    }
  }

  loadForecastData(event: LazyLoadEvent) {
    // console.log('lazy load event:', event);
    this.panel.hide();
    if (!event.sortField) {
      event.sortOrder = this.sortOrder;
      this.sortOrder = null;
    }
    let orderByType = (event.sortOrder == 1) ? 'asc' : 'desc'
    this.params.pageNo = 1;
    this.params.orderBy = orderByType;
    // sorting
    if (event.sortField != undefined) {
      this.params.orderColumn = event.sortField;
      // this.params.orderColumn = event.sortField.split(/(?=[A-Z])/).join('_').toLowerCase();
    }
    this.getForecastData(this.params, this.forecastGridModel)
    setTimeout(() => {
      this.paginator?.changePage(this.params.pageNo - 1);
    });
  }

  public paginate(paginationData): void {
    this.currentPage = paginationData.page + 1;
    this.params.pageNo = this.currentPage;
    this.params.pageSize = paginationData.rows;
    this.first = paginationData.first + 1;
    this.firstPage = paginationData.first;
    this.getForecastData(this.params, this.forecastGridModel);
  }

  // To get project_id, chart_dossierId and grid_dossierId
  getMstrConfigs() {
    this.keyQuestionService.getMstrConfig().subscribe((data: any) => {
      if (data) {
        this.projectId = data.project_id;
        this.forecastDossierId = data.wfm_forecast_dossierId;
        this.getTokens(); // get tokens for Mstr 

        // To check mstr report Id is valid
        this.validateMstrReportId().then((validIdRes: any) => {
          if (validIdRes['isSuccess'].toLowerCase() == 'success') {
            // To check mstr token Id is valid
            this.mstrValidToken().then((isTrue) => {
              this.renderData(); // Generate the forecasting chart data with UI
            })
          }
        })
        this.MSTR_mode = true;
      }
    }, (error) => {
      console.log('error:', error.error);
      this.messageService.add({ severity: 'error', summary: error.error.message });
      this.spinnerService.hide();
    })
  }

  // To render the Mstr data with UI
  async renderData(){
    this.idToken = "?idToken=" + this.mstrIdToken['x-mstr-identitytoken'];
    let dossierUrl = this.mstrBaseUrl + this.projectId + '/' + this.forecastDossierId + '/W148--K46' + this.idToken;
    const mstrIdToken = JSON.parse(localStorage.getItem("mstrIdToken"))['x-mstr-identitytoken'];
    let promptsList = {
      'Staffing Request ID Value': this.forecast.staffingRequestId,
      'WFM ConfigID Value': this.forecast.wfmConfigId
    }
    await this.interactionService.dossierPromptWorkflow(mstrIdToken, this.projectId, this.forecastDossierId, promptsList).then(jsonRes => {
      microstrategy.dossier.create({
        placeholder: document.getElementById('dossierContainer1'),
        url: dossierUrl,
        instance: jsonRes['instance'],
        enableResponsive: true, 
        navigationBar: {
          edit: false,
          enabled: true,
          gotoLibrary: false,
          title: false,
          toc: false,
          reset: false,
          reprompt: false,
          share: false,
          comment: false,
          notification: false,
          filter: true,
          options: false,
          search: false,
          bookmark: false
      },
      dockedFilter: {
          dockedPosition: "left",
          canClose: true,
          dockChangeable: false,
          isDocked: true
      },
        errorHandler: function () {
          this.spinnerService.hide()
        }.bind(this),
        filterFeature: {
          enabled: true
        },
      }).then(function (dossier) {
        this.dossier2 = dossier;
      }.bind(this));
    });
    this.spinnerService.hide();
  }

  mstrValidToken(){
    const idToken = JSON.parse(localStorage.getItem("mstrIdToken"))['x-mstr-identitytoken'];
    const authToken = JSON.parse(localStorage.getItem('mstrAuthToken'))
    let params ={
      ID_TOKEN: idToken,
      AUTH_TOKEN: authToken
    }
    return new Promise((resolve,reject)=>{
      this.evService.mstrValidToken(params).subscribe(
        (data:any)=>{
          // console.log(data)
          if(data.isSuccess.toLowerCase() === 'success' && data.result !== 'valid identity token'){
            localStorage.removeItem('mstrIdToken');
            const setIdToken = {
              'x-mstr-identitytoken': data.result
            }
            localStorage.setItem('mstrIdToken',JSON.stringify(setIdToken))
          }
          else if(data.isSuccess.toLowerCase() === 'success' && data.result === 'NA'){
            // this.reloadWorkspace();
          }
          else{
            if(data.isSuccess.toLowerCase() === 'failed' && (data.result.toLowerCase() === 'invalid access token' || data.result === "The user's session has expired, please reauthenticate")){
              // this.commonMethods.addToastforlongtime(false,'Mstr session has Expired,Please wait for a moment...')
              // this.reloadWorkspace()
            }
          }
          resolve(true)
        },
        (error)=>{
          console.log(error)
          reject(error)
          this.spinnerService.hide();
        })
    })
    
  }

  validateMstrReportId() {
    let params = {
      dossierId: this.forecastDossierId,
      reportType: "55",
      AuthToken: JSON.parse(localStorage.getItem('mstrAuthToken')),
      projectId: this.projectId
    }
    return new Promise((resolve, reject) => {
      this.keyQuestionsService.validateMstrReportId(params).subscribe(
        (data: any) => {
          if (data['isSuccess'].toLowerCase() == 'failed') {
            this.messageService.add({ severity: 'error', summary: 'There is an error in configuration. Please connect with support team to correct the configuration error' });
          }
          resolve(data)
        },
        (error) => {
          console.log(error);
          if (error.error['isSuccess'].toLowerCase() == 'failed') {
            this.messageService.add({ severity: 'error', summary: 'There is an error in configuration. Please connect with support team to correct the configuration error' });
          }
          reject(error);
          this.spinnerService.hide();
        })
    })
  }

  // Refresh the session of Mstr data
  refreshSession() {
    this.mstrTokenService.refreshMSTRSession();
    // this.spinnerService.show();
    // this.mstrTokenService.ReloadWorkspace().subscribe(
    //   (data: any) => {
    //     // console.log(data)
    //     this.mstrTokenService.recreateMSTRsession(data);
    //     window.location.reload();
    //     // this.spinnerService.hide();
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.spinnerService.hide();
    //   }
    // )
  }

  // Event change of Aggregate and Grid tab
  onChangeTab(event){
    this.panel.hide();
    if(event.index == 0){
      this.dossier2.goToPrevPage()
      this.grid_mode = false;
      this.MSTR_mode = true;
    }if(event.index == 1){
      this.spinnerService.hide();
      this.MSTR_mode = false;
      this.grid_mode = true;
    }if(event.index == 2){
      this.spinnerService.hide();
      this.MSTR_mode = false;
      this.grid_mode = false;
    }
  }

  // Get tokens of Mstr 
  getTokens(){
    this.mstrIdToken = localStorage.getItem("mstrIdToken");
    this.mstrIdToken = JSON.parse(this.mstrIdToken);
    this.idToken = this.mstrIdToken['x-mstr-identitytoken'];
    this.mstrAuthToken = localStorage.getItem("mstrAuthToken");
    this.mstrAuthToken = JSON.parse(this.mstrAuthToken);
  }

  // To get service quality objectives list and bind the particular one
  getServiceLevelOptions(wfmConfigId) {
    this.forecastService.getServiceLevelOptions(wfmConfigId).subscribe((data: any) => {
      if (data.length > 0) {
        let serviceLevels = data;
        let serviceLevel = serviceLevels.find(x => x.Key == this.forecast.serviceLevelId);
        this.serviceLevelName = (serviceLevel != undefined) ? serviceLevel.Value : '';
      }
      this.spinnerService.hide();
    }, (error) => {
      console.log('error:', error.error.message);
      this.spinnerService.hide();
    })
  }

  getServiceLevelDetail(serviceLevelId) {
    this.spinnerService.show();
    this.serviceLevelService.getServiceLevelDetail(serviceLevelId).subscribe((data: any) => {
        if (data) {
            this.service = data // store the response data to service data variable

            let svclvlHms = this.serviceLevelService.secondsToHms(this.service.targetAnswerTime) // for service level
            let svclvlTime = svclvlHms.split(':'); // split hours, minutes and seconds
            this.service.targetAnswerTime = svclvlTime[0] + ':' + svclvlTime[1] + ':' + svclvlTime[2]; // concatenate hours, minutes and seconds

            let avgSpeedHms = this.serviceLevelService.secondsToHms(this.service.avgSpeedToAnswer) // for avg speed of answser
            let avgSpeedTime = avgSpeedHms.split(':'); // split hours, minutes and seconds
            this.service.avgSpeedToAnswer = avgSpeedTime[0] + ':' + avgSpeedTime[1] + ':' + avgSpeedTime[2]; // concatenate hours, minutes and seconds
        }
        this.spinnerService.hide();
    }, (error) => {
        console.log('error:', error.error);
        this.messageService.add({ severity: 'error', summary: 'Please try again later' });
        this.spinnerService.hide();
    })
  }

  enableEditMode(){
    this.isEditModeEnabled = true;
    this.isGridUIUpdateModeEnabled = true;
  }

  updateForecastData(){
    this.spinnerService.show();
    const updatedData = [];
    for(let i = 0; i < this.editedData.length; i++){
      // this.editedData[i].offered = +this.editedData[i].offered
      // this.editedData[i].avgHandleTime = +this.editedData[i].avgHandleTime
      updatedData.push({
        staffingRequestId: this.editedData[i].staffing_request_id,
        forecastType: this.editedData[i].forecast_type,
        channel: this.editedData[i].channel,
        queueId: this.editedData[i].queue_id,
        targetTimestamp: this.editedData[i].target_timestamp,
        customer_id: this.editedData[i].customer_id,
        configId: this.editedData[i].config_id,
        wfmConfigId: this.editedData[i].wfm_config_id,
        callsAnswered: +this.editedData[i].WJXBFS1,
        avgHandleTime: +this.editedData[i].WJXBFS2
      })
    }
    // console.log('edited data:', this.editedData);
    // console.log('foreacsting updated data:', updatedData);
    this.forecastService.updateForecastingData(updatedData).subscribe((data: any) => {
      if (data) {
        this.messageService.add({ severity: 'success', summary: data.message });
      }
      this.resetForecastData();
      this.spinnerService.hide();
    }, (error) => {
      console.log(error);
      this.spinnerService.hide();
    })
  }

  onColumnChange(event){
    this.panel.hide();
    this.col.agentsReq = this.selectedColumns.filter(x => x.field == 'agentsReq');
    this.col.offered = this.selectedColumns.filter(x => x.field == 'offered');
    this.col.aht = this.selectedColumns.filter(x => x.field == 'aht');
    this.col.noShrinkage = this.selectedColumns.filter(x => x.field == 'noShrinkage');
    this.col.serviceLevel = this.selectedColumns.filter(x => x.field == 'serviceLevel');
    this.col.avgSpeedOfAnswer = this.selectedColumns.filter(x => x.field == 'avgSpeedOfAnswer');
    this.col.occupancy = this.selectedColumns.filter(x => x.field == 'occupancy');
    this.col.mediaType = this.selectedColumns.filter(x => x.field == 'mediaType');
    this.col.quantile = this.selectedColumns.filter(x => x.field == 'quantile');
    this.col.queue = this.selectedColumns.filter(x => x.field == 'queue');
  }

  onChangeInput(data){
    this.isEditModeEnabled = true;
    let newData = data;
    // if(!data.WJXBFS1 || !data.WJXBFS2){
    //   return
    // }

    let aht = this.constforecastData.filter(a => a.SERIAL_NO == newData.SERIAL_NO && a.WJXBFS2 == newData.WJXBFS2);
    let offered = this.constforecastData.filter(a => a.SERIAL_NO == newData.SERIAL_NO && a.WJXBFS1 == newData.WJXBFS1);

    // condition for override the values of aht and offered
    if(!aht.length){
      this.editedData.find(c => c.SERIAL_NO === newData.SERIAL_NO) !== undefined ? this.editedData.find(c => c.SERIAL_NO === newData.SERIAL_NO).WJXBFS2 = newData.WJXBFS2 : this.editedData.push(newData);
    }
    else if(!offered.length){
      this.editedData.find(c => c.SERIAL_NO === newData.SERIAL_NO) !== undefined ? this.editedData.find(c => c.SERIAL_NO === newData.SERIAL_NO).WJXBFS1 = newData.WJXBFS1 : this.editedData.push(newData);
    }
    else{
      // to remove the object from array, if any values are gets roll back
      this.editedData.splice(this.editedData.findIndex(item => item.SERIAL_NO === newData.SERIAL_NO),1);
    }

    // for testing
    // let aht = this.constforecastData.filter(a => {
    //   a.SERIAL_NO == newData.SERIAL_NO && a.WJXBFS2 == newData.WJXBFS2
    //   console.log('a.SERIAL_NO:', a.SERIAL_NO);
    //   console.log('newData.SERIAL_NO:', newData.SERIAL_NO);
    //   console.log('a.WJXBFS2:', a.WJXBFS2);
    //   console.log('newData.WJXBFS2:', newData.WJXBFS2);
    // } );
  }

  // To clear the inputs of filters in datatable
  clearFilters(dt) {
    // this.table.reset();
    dt.reset();
    $('input:text').val('');
    this.resetParams();
    this.getForecastData(this.params, this.forecastGridModel);
    this.resetFilterAccordionTabs();
  }

  resetParams(){
    this.params = {
      pageNo: 1,
      pageSize: 500,
      orderBy: "desc",
      orderColumn: "target_timestamp",
      queue: "",
      forecastType: "",
      mediaType: "",
      startDate: "",
      endDate: "",
      interval: ""
    }
  }

  resetFilterAccordionTabs(){
    $('.cust-accordion .item .collapse').removeClass('show');
    $('.cust-accordion .item-header button').addClass('collapsed');

  }

  resetForecastData(){
    this.getForecastData(this.params, this.forecastGridModel);
    this.isEditModeEnabled = false;
    this.isGridUIUpdateModeEnabled = false;
    this.editedData = [];
  }

}