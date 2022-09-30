import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { GlobalComponent } from '../../../../global/global.component';
import { CommonMethods } from '../../../../common/common.components';
import { ForecastService } from '../forecast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { LazyLoadEvent } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
    selector: 'app-forecast-list',
    templateUrl: './forecast-list.component.html',
    styleUrls: ['./forecast-list.component.css'],
    providers: [MessageService]
})

export class ForecastListComponent implements OnInit {

    @ViewChild('dt') table: Table; // to perform all the operations of datatable
    @ViewChild('p', { static: false }) paginator?: Paginator; // To reset the paginator
    @ViewChild('opFilter', {static:true}) panel: OverlayPanel;

    forecasts: any = []; // to fetch the forecast list
    forecast: any; // to show specific details of forecasting 
    publishForecastData: any; // contains data of publish forecast
    isLoading: boolean = true; // to show/hide the message - no records found
    selectedForecasts: any = []; // to delete multiple items in a datatable

    // to config pagination
    currentPage: any = 1;
    totalRecords: any;
    pageNo: any = 1;
    pageSize: any = 10;
    first: any = 0;
    firstPage: any = 0;
    last: any = 0;
    loading: boolean;

    // server side actions - searching, sorting
    params = {
        pageNo: 1,
        pageSize: 10,
        globalText: "",
        orderBy: "desc",
        orderColumn: "staffing_request_id",
        name: "",
        startDate: "",
        endDate: "",
        status: [],
        updateDate: "",
        updateBy: "",
        intervalStart: "",
        intervalEnd: "",
        interval: ""
    }
    sortOrder: number = -1; // to initiate sort order as desc during page load

    // Filters
    terms: any = []; // assigning values for filters
    term: any = { value: '' }; // ngModel - to clear the values

    // assigning values for filters
    statuses: any = [
        // { value: '', label: 'All' },
        { value: 'draft', label: 'Draft' },
        { value: 'in-progress', label: 'In progress' },
        { value: 'complete', label: 'Complete' },
        { value: 'published', label: 'Published' },
        { value: 'failure', label: 'Failure' }
    ];
    status: any = { value: '' }; // ngModel to clear the values

    display: boolean = false; // confirm dialog - show/hide
    isViewDetail: boolean = false; // dialog to show/hide the details of specific service level
    isDeleteConfirm: boolean = false; // dialog for delete records confirmation
    isDeleteAllConfirm: boolean = false; // dialog for delete all records confirmation
    isPublishConfirm: boolean = false; // dialog to confirm the forecast to publish
    staffingRequestId = null; // to delete service level using this variable in dialog
    staffingRequestName = null // to show forecast name in dialog
    serviceLevelName = null // to show service level name in dialog

    displayPosition: boolean;
    position: string;
    isSearchApplied:any; // Advance filters

    cols = [
        { field: 'startDate', header: 'Start Date', enabled: true },
        { field: 'endDate', header: 'End Date', enabled: true },
        { field: 'updatedTimestamp', header: 'Updated On', enabled: true },
        { field: 'updatedBy', header: 'Updated By', enabled: true },
        { field: 'status', header: 'Status', enabled: true }
    ];
    col = {
        startDate: 'startDate',
        endDate: 'endDate',
        updatedTimestamp: 'updatedTimestamp',
        updatedBy: 'updatedBy',
        status: 'status'
    }
    selectedColumns: any;
    selectedStatus: any;

    intervalStart:any;
    intervalEnd:any;

    constructor(
        public global: GlobalComponent,
        private route: Router,
        private commonMethods: CommonMethods,
        private forecastService: ForecastService,
        private spinnerService: NgxSpinnerService,
        private messageService: MessageService,
        private datePipe: DatePipe,
    ) {
        this.commonMethods.dynamicBackgroundColorChange('white');
    }

    ngOnInit() {
        this.forecastService.alignWfmContainer();
        this.getForecasts(this.params);
        this.loadTerms();
    }

    // To fetch the forecast list data
    getForecasts(params) {
        // this.spinnerService.show();
        this.loading = true;
        this.forecastService.getForecastList(params).subscribe((data: any) => {
            // console.log('forecast list:', data);
            if (data) {
                this.forecasts = data.items;

                // filtering records based on hidden columns
                let hiddenColumns = this.cols.filter(x => { return x.enabled == false });
                let hiddenColumnsData = [];
                if(hiddenColumns.length && this.params.globalText){
                    hiddenColumns.forEach(element => {
                        data.items.forEach(childElement => {
                            if(childElement[element.field]){
                                if(('' + element.field && '' + childElement[element.field]).toLocaleLowerCase().includes('' + this.params.globalText)
                                && !childElement.staffingRequestName.toLocaleLowerCase().includes(this.params.globalText)){
                                    hiddenColumnsData.push(childElement)
                                }
                            }
                        })
                    })
                }
                
                if(hiddenColumnsData.length){
                    this.forecasts = [];
                    this.firstPage = 0;
                    this.totalRecords = 0;
                }else{
                    this.forecasts = data.items;
                    this.totalRecords = data.totalCount // To get total records count
                }

                this.isLoading = false;
                // this.totalRecords = data.totalCount // To get total records count
                setTimeout(() => {
                    if (!this.totalRecords) {
                        this.first = 0
                    }
                }, 1000);
                this.last = this.firstPage + this.forecasts.length;

                // enable checkbox selection while navigating from page 1 to page 2
                if ($(".select-all-chkbox .ui-chkbox-box").hasClass("ui-state-active")) {
                    this.selectedForecasts = data.items;
                }
            }
            // this.spinnerService.hide();
            this.loading = false;
        }, (error) => {
            console.log(error);
            // this.spinnerService.hide();
            this.loading = false;
        })
    }

    loadForecasts(event: LazyLoadEvent) {
        // this.loading = true;
        // console.log('lazy load event:', event);
        if (!event.sortField) {
            event.sortOrder = this.sortOrder;
            this.sortOrder = null;
        }
        let orderByType = (event.sortOrder == 1) ? 'asc' : 'desc'
        this.params.pageNo = 1;
        this.params.orderBy = orderByType;

        // sorting
        if (event.sortField != undefined) {
            this.params.orderColumn = event.sortField.split(/(?=[A-Z])/).join('_').toLowerCase();
        }

        this.params.globalText = (event.globalFilter) ? event.filters.global.value : '' // Global search
        this.params.name = (event.filters.staffingRequestName) ? event.filters.staffingRequestName.value : '' // Searching for forecast name
        this.params.startDate = (event.filters.startDate) ? event.filters.startDate.value : '' // Searching for start date
        this.params.endDate = (event.filters.endDate) ? event.filters.endDate.value : '' // Searching for end date
        this.params.status = (event.filters.status) ? event.filters.status.value.value : '' // Searching for status
        this.params.updateDate = (event.filters.updatedTimestamp) ? event.filters.updatedTimestamp.value : '' // Searching for updated date
        this.params.updateBy = (event.filters.updatedBy) ? event.filters.updatedBy.value : '' // Searching for updated date

        this.getForecasts(this.params)
        setTimeout(() => {
            this.paginator?.changePage(this.params.pageNo - 1);
        });
    }

    onChangeColumn(column, enabled) {
        let index = this.cols.findIndex(x => x.field === column);
        if (enabled) {
            this.cols[index].enabled = false;
            this.col[column] = ''
        } else {
            this.cols[index].enabled = true;
            this.col[column] = column
        }
        $('input:text').val('');    
        this.table.reset();
    }

    public paginate(paginationData): void {
        this.currentPage = paginationData.page + 1;
        this.params.pageNo = this.currentPage;
        this.params.pageSize = paginationData.rows;
        this.first = paginationData.first + 1;
        this.firstPage = paginationData.first;
        this.getForecasts(this.params);
    }

    resetParams() {
        this.params = {
            pageNo: 1,
            pageSize: 10,
            globalText: "",
            orderBy: "desc",
            orderColumn: "staffing_request_id",
            name: "",
            startDate: "",
            endDate: "",
            status: [],
            updateDate: "",
            updateBy: "",
            intervalStart: "",
            intervalEnd: "",
            interval: ""
        }
    }

    // To perform the operations of generate, publish, view, edit & delete
    manageForecast(forecast, mode) {
        this.forecastService.forecastData = forecast;
        let staffingRequestId = forecast.staffingRequestId
        if (mode == 'view') {
            this.resetDialogFlags();
            this.isViewDetail = true;
            this.getForecastDetail(staffingRequestId);
        }
        if (mode == 'generate' || mode == 'regenerate' || mode == 'publish') {
            this.spinnerService.show();
            this.forecastService.getForecast(forecast.staffingRequestId).subscribe((data: any) => {
                if (data) {
                    let frcst = data // to store the response data for grouping all queue items
                    this.forecast = data[0] // to store specific forecast detail

                    let wfmConfigs = null // to store wfm configs
                    let wfmConfig = null; // to store specific wfm config
                    this.forecastService.getWfmConfigId().subscribe((data: any) => {
                        if (data.Items[0]) {
                            wfmConfigs = data.Items;
                            // To check specific wfm config is exists in forecast detail object
                            wfmConfig = wfmConfigs.filter(x => x.wfmConfigId == this.forecast.wfmConfigId);
                            if (wfmConfig) {
                                if (mode == 'publish') {
                                    let publishModel:any = [{
                                        status: 'published',
                                        wfmConfigId: this.forecast.wfmConfigId
                                    }]
                                    publishModel.push({ staffingRequestId: this.forecast.staffingRequestId });
                                    this.forecastService.publishForecast(publishModel).subscribe((data: any) => {
                                        this.messageService.add({ severity: 'success', summary: this.forecast.staffingRequestName + ' has been published successfully!' });
                                        this.getForecasts(this.params);
                                        this.spinnerService.hide();
                                    }, (error) => {
                                        console.log('error:', error.error.message);
                                        this.messageService.add({ severity: 'error', summary: 'Please try again later' });
                                        this.spinnerService.hide();
                                    })
                                    this.closeDialog();
                                }
                                else {
                                    // For feature use
                                    // let todaysDate = Date.now();
                                    // let startDate = this.datePipe.transform(todaysDate, 'MM/dd/yyyy');

                                    let updateObj = {};
                                    updateObj = {
                                        createdBy: this.forecast.createdBy,
                                        createdTimestamp: this.forecast.createdTimestamp
                                    }

                                    let queueArray = [];
                                    frcst.forEach(element => {
                                        queueArray.push(element.queueId)
                                    })

                                    let reGenerate = {};
                                    if (mode == 'regenerate') {
                                        reGenerate = { reforecast: 'yes' }
                                    }

                                    let dataForBackend: any = [{
                                        configId: this.forecast.configId,
                                        wfmConfigId: this.forecast.wfmConfigId,
                                        platformId: wfmConfig[0].platformId,
                                        platformName: wfmConfig[0].platformName,
                                        interval: wfmConfig[0].interval,
                                        term: wfmConfig[0].term,
                                        queueId: queueArray,
                                        staffingRequestName: this.forecast.staffingRequestName,
                                        startDate: this.forecast.startDate,
                                        endDate: this.forecast.endDate,
                                        staffingRequestDescription: this.forecast.staffingRequestDescription,
                                        shrinkage: this.forecast.shrinkage,
                                        occupancy: this.forecast.occupancy,
                                        isNotified: this.forecast.isNotified,
                                        channel: this.forecast.channel,
                                        service_level_id: this.forecast.serviceLevelId,
                                        isSave: 'save',
                                        ...updateObj,
                                        ...reGenerate
                                    }]
                                    //console.log('generate dataForBackend:', dataForBackend);
                                    // // Update forecast payload request
                                    dataForBackend.push({ staffingRequestId: this.forecast.staffingRequestId });
                                    this.forecastService.updateForecast(dataForBackend).subscribe((data: any) => {
                                        if (mode == 'regenerate') {
                                            this.messageService.add({ severity: 'success', summary: this.forecast.staffingRequestName + ' has been regenerated successfully!' });
                                        } else {
                                            this.messageService.add({ severity: 'success', summary: this.forecast.staffingRequestName + ' has been generated successfully!' });
                                        }
                                        this.getForecasts(this.params);
                                        this.spinnerService.hide();
                                    }, (error) => {
                                        console.log('error:', error.error.message);
                                        this.messageService.add({ severity: 'error', summary: 'Please try again later' });
                                        this.spinnerService.hide();
                                    })
                                }
                            }
                            else {
                                this.spinnerService.hide();
                                if (mode == 'regenerate') {
                                    this.messageService.add({ severity: 'error', summary: 'Unable to regenerate the Forecast', detail: 'Please try again later' });
                                } if (mode == 'publish') {
                                    this.messageService.add({ severity: 'error', summary: 'Unable to publish the Forecast', detail: 'Please try again later' });
                                } if (mode == 'generate') {
                                    this.messageService.add({ severity: 'error', summary: 'Unable to generate the Forecast', detail: 'Please try again later' });
                                }
                            }
                        }
                    }, (error) => {
                        console.log('error:', error.error.message);
                        this.messageService.add({ severity: 'error', summary: 'Please try again later' });
                        this.spinnerService.hide();
                    })
                }
            }, (error) => {
                console.log('error:', error.error);
                this.spinnerService.hide();
            })
        }
        if (mode == 'fcst_data') {
            this.route.navigate(['/wfm/forecast/detail/' + staffingRequestId]);
        }
        if (mode == 'edit') {
            this.route.navigate(['/wfm/forecast/edit/' + staffingRequestId]);
        }
        if (mode == 'delete') {
            this.resetDialogFlags();
            this.isDeleteConfirm = true;
            this.showDialog();
            this.staffingRequestId = forecast.staffingRequestId;
            this.staffingRequestName = forecast.staffingRequestName;
        }
    }

    publishForecast(){
        this.manageForecast(this.publishForecastData, 'publish');
    }

    confirmPublish(forecast){
        this.resetDialogFlags();
        this.staffingRequestName = forecast.staffingRequestName;
        this.publishForecastData = forecast
        this.isPublishConfirm = true;
        this.showDialog();
    }

    deleteRecord() {
        this.spinnerService.show();
        this.forecastService.deleteForecast(this.staffingRequestId).subscribe((data: any) => {
            // this.commonMethods.addToastforlongtime(true, data.message);
            this.spinnerService.hide();
            this.messageService.add({ severity: 'success', summary: this.staffingRequestName + ' has been deleted successfully!' });
            this.closeDialog();
            this.getForecasts(this.params);
        }, (error) => {
            console.log(error.error.message);
            this.messageService.add({ severity: 'error', summary: 'Please try again later' });
            this.spinnerService.hide();
        })
    }

    deleteAllRecords() {
        this.spinnerService.show();
        this.selectedForecasts.forEach(element => {
            this.forecastService.deleteForecast(element.staffingRequestId).subscribe((data: any) => {
                this.selectedForecasts = this.selectedForecasts.filter(({ staffingRequestId }) => staffingRequestId !== element.staffingRequestId);
                if (!this.selectedForecasts.length) {
                    this.spinnerService.hide();
                    this.messageService.add({ severity: 'success', summary: 'Selected records has been deleted successfully!' });
                    this.closeDialog();
                    this.getForecasts(this.params);
                }
            }, (error) => {
                console.log(error.error.message);
                this.messageService.add({ severity: 'error', summary: 'Please try again later' });
                this.spinnerService.hide();
            })
        })
    }

    getForecastDetail(staffingRequestId) {
        this.spinnerService.show();
        this.forecastService.getForecast(staffingRequestId).subscribe((data: any) => {
            if (data) {
                this.forecast = data[0] // store the response data to forecastData variable
                this.getServiceLevelOptions(this.forecast.wfmConfigId);
                // this.spinnerService.hide();
            } else {
                this.messageService.add({ severity: 'error', summary: 'Please try again later' });
            }
        }, (error) => {
            console.log('error:', error.error);
            this.spinnerService.hide();
        })
    }

    getServiceLevelOptions(wfmConfigId) {
        this.forecastService.getServiceLevelOptions(wfmConfigId).subscribe((data: any) => {
            // console.log('service level options:', data);
            if (data.length > 0) {
                let serviceLevels = data;
                // console.log('this.forecast.serviceLevelId:', this.forecast.serviceLevelId);
                // console.log('serviceLevels:', serviceLevels);
                let serviceLevel = serviceLevels.find(x => x.Key == this.forecast.serviceLevelId);
                // console.log('serviceLevel:', serviceLevel);
                this.serviceLevelName = (serviceLevel != undefined) ? serviceLevel.Value : '';
                this.showDialog();
            } else {
                this.messageService.add({ severity: 'error', summary: 'Please try again later' });
            }
            this.spinnerService.hide();
        }, (error) => {
            console.log('error:', error.error.message);
            this.spinnerService.hide();
            this.messageService.add({ severity: 'error', summary: 'Please try again later' });
        })
    }

    // Delete multiple items from datatable
    deleteSelectedForecasts() {
        this.resetDialogFlags();
        this.isDeleteAllConfirm = true;
        this.showDialog();
    }

    resetDialogFlags(){
        this.isViewDetail = false;
        this.isDeleteConfirm = false;
        this.isDeleteAllConfirm = false;
        this.isPublishConfirm = false;
    }

    // Bind terms for filters
    loadTerms() {
        this.terms = [
            { value: 'short', label: 'Short' },
            { value: 'long', label: 'Long' }
        ]
    }

    // Filter the records based on start & end date
    onDateSelect(value, date) {
        let dateVal = this.datePipe.transform(value, 'MM/dd/yyyy');
        this.table.filter(dateVal, date, 'equals')
    }

    applySearch(){
        this.isSearchApplied = true;
        let statuses:any = [];
        if(this.selectedStatus){
            this.selectedStatus.map(element => {
                statuses.push(element.value)
            })
        }
        this.params.status = statuses;

        if(!this.params.intervalStart && this.params.intervalEnd){
            return;
        }

        this.panel.hide();
        this.params.intervalStart = (this.params.intervalStart) ? this.datePipe.transform(this.params.intervalStart, 'yyyy-MM-dd') : "";
        this.params.intervalEnd = (this.params.intervalEnd) ? this.datePipe.transform(this.params.intervalEnd, 'yyyy-MM-dd') : null;
        this.params.interval = (this.params.intervalStart) ? 'yes' : "";
        this.getForecasts(this.params)
    }

    // To clear the inputs of filters in datatable
    clearFilters(dt) {
        // this.table.reset();
        dt.reset();
        $('input:text').val('');

        this.resetParams();
        this.getForecasts(this.params);
        this.selectedStatus = [];
        this.intervalStart = "";
        this.intervalEnd = "";
        this.panel.hide();
        
        // reset accordion tabs
        $('.cust-accordion .item .collapse').removeClass('show');
        $('.cust-accordion .item-header button').addClass('collapsed');
    }

    onChangeStartDate(value){
        this.params.intervalStart = (value) ? this.datePipe.transform(value, 'yyyy-MM-dd') : "";
        this.params.interval = "yes"
    }
    
    onChangeEndDate(value){
        this.params.intervalEnd = (value) ? this.datePipe.transform(value, 'yyyy-MM-dd') : null;
    }

    // Show message to user in dialog
    showDialog() {
        this.display = true;
    }

    // Hide the dialog
    closeDialog() {
        this.display = false;
    }

    // checkAllCheckBox(ev: any) { // Angular 13
    // 	this.forecasts.forEach(x => x.checked = ev.target.checked)
    // }

    // isAllCheckBoxChecked() {
    // 	return this.forecasts.every(f => f.checked);
    // }
}