import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { CommonMethods } from '../../../../common/common.components';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { serviceLevelService } from '../serviceLevel.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { MessageService } from 'primeng/api';
import { GlobalComponent } from '../../../../global/global.component';

@Component({
    selector: 'app-service-level-list',
    templateUrl: './service-level-list.component.html',
    styleUrls: ['./service-level-list.component.css'],
    providers: [MessageService],
    // encapsulation: ViewEncapsulation.None
})

export class ServiceLevelListComponent implements OnInit {

    @ViewChild('dt') table: Table; // to perform all the operations of datatable
    @ViewChild('p', { static: false }) paginator?: Paginator; // To reset the paginator

    serviceLevels: any = []; // to fetch the service level list
    service: any;  // to store specific service detail
    isLoading: boolean = true; // to show/hide the message - no records found
    selectedServiceLevels: any = []; // to delete multiple items in a datatable
    // To validate a form
    isSubmitted: boolean = false;
    serviceLevelForm: FormGroup;

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
        orderColumn: "service_level_id",
        name: "",
        mediaType: "",
        serviceLevel: "",
        targetAnswerTime: "",
        avgSpeed: "",
        updateDate: "",
        updateBy: ""
    }
    sortOrder: number = -1; // to initiate sort order as desc during page load

    display: boolean = false; // confirm dialog - show/hide
    isViewDetail: boolean = false; // dialog to show/hide the details of specific service level
    isDeleteConfirm: boolean = false; // dialog for delete records confirmation
    isDeleteAllConfirm: boolean = false; // dialog for delete all records confirmation
    serviceLevelId = null; // to delete service level using this variable in dialog
    serviceLevelName = null // to show service level name in dialog

    cols = [
        { field: 'channel', header: 'Media Type', enabled: true },
        { field: 'serviceLevel', header: 'Service Level', enabled: true },
        { field: 'avgSpeedToAnswer', header: 'Avg Speed of Answer', enabled: true },
        { field: 'updatedTimestamp', header: 'Updated On', enabled: true},
        { field: 'updatedBy', header: 'Updated By', enabled: true }
    ];
    col = {
        channel: 'channel',
        serviceLevel: 'serviceLevel',
        avgSpeedToAnswer: 'avgSpeedToAnswer',
        updatedTimestamp: 'updatedTimestamp',
        updatedBy: 'updatedBy',
    }
    selectedColumns: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private commonMethods: CommonMethods,
        public global: GlobalComponent,
        private serviceLevelService: serviceLevelService,
        private spinnerService: NgxSpinnerService,
        private messageService: MessageService,
        private datePipe: DatePipe,
    ) {
        this.commonMethods.dynamicBackgroundColorChange('white');
    }

    mediaTypes = [
        { value: '', label: 'All' },
        { value: 'Voice', label: 'Voice' },
        { value: 'Chat', label: 'Chat' },
        { value: 'Email', label: 'Email' },
        { value: 'Social', label: 'Social' },
        // { value: 'Channel', label: 'Channel' }
    ]
    mediaType: any = { value: '' } // ngModel

    ngOnInit() {
        this.serviceLevelService.alignWfmContainer();
        this.getServiceLevels(this.params);
    }

    // To fetch the forecast list data
    getServiceLevels(params) {
        // this.spinnerService.show();
        this.loading = true;
        this.serviceLevelService.getServiceLevelList(params).subscribe((data: any) => {
            // console.log('service levels data:', data);
            if (data) {
                this.serviceLevels = data.items

                // convert service level and avg speed of answer seconds to hours, minutes and seconds to display in grid
                this.serviceLevels.forEach(element => {
                    let svclvlHms = this.serviceLevelService.secondsToHms(element.targetAnswerTime) // for service level
                    let svclvlTime = svclvlHms.split(':'); // split hours, minutes and seconds
                    element.targetAnswerTime = svclvlTime[0] + ':' + svclvlTime[1] + ':' + svclvlTime[2]; // concatenate hours, minutes and seconds

                    let avgSpeedHms = this.serviceLevelService.secondsToHms(element.avgSpeedToAnswer) // for avg speed of answser
                    if(element.avgSpeedToAnswer !== null){
                        let avgSpeedTime = avgSpeedHms.split(':'); // split hours, minutes and seconds
                        element.avgSpeedToAnswer = avgSpeedTime[0] + ':' + avgSpeedTime[1] + ':' + avgSpeedTime[2]; // concatenate hours, minutes and seconds
                    }else{
                        element.avgSpeedToAnswer = '--'
                    }
                })

                // filtering records based on hidden columns
                let hiddenColumns = this.cols.filter(x => { return x.enabled == false });
                let hiddenColumnsData = [];
                if(hiddenColumns.length && this.params.globalText){
                    hiddenColumns.forEach(element => {
                        data.items.forEach(childElement => {
                            
                            if(childElement[element.field]){
                                if(element.field == 'serviceLevel' || element.field == 'avgSpeedToAnswer'){

                                    if(/^[a-zA-Z0-9- ]*$/.test(childElement[element.field]) == false){
                                        let time = childElement[element.field].split(':'); // split hours, minutes and seconds
                                        console.log('time:', time);
                                        
                                        let hrsToSecs = (time[0]) ? Math.floor(time[0] * 60 * 60) : 0;
                                        let minsToSecs = (time[1]) ? Math.floor(time[1] * 60) : 0;
                                        let totalSecs = (time[2]) ? Math.floor(time[2]) : 0;
                                        childElement[element.field] = "" + Math.floor(hrsToSecs + minsToSecs + totalSecs);
                                      } 
                                }

                                if(('' + element.field && '' + childElement[element.field]).toLocaleLowerCase().includes('' + this.params.globalText)
                                && !childElement.serviceLevelName.toLocaleLowerCase().includes(this.params.globalText)){
                                    hiddenColumnsData.push(childElement)
                                }
                            }
                        })
                    })
                }
                
                if(hiddenColumnsData.length){
                    this.serviceLevels = [];
                    this.firstPage = 0;
                    this.totalRecords = 0;
                }else{
                    this.serviceLevels = data.items;
                    this.totalRecords = data.totalCount // To get total records count
                }

                this.isLoading = false;
                // this.totalRecords = data.totalCount // To get total records count
                setTimeout(() => {
                    if (!this.totalRecords) {
                        this.first = 0
                    }
                }, 1000);
                this.last = this.firstPage + this.serviceLevels.length;

                // enable checkbox selection while navigating from page 1 to page 2
                if ($(".select-all-chkbox .ui-chkbox-box").hasClass("ui-state-active")) {
                    this.selectedServiceLevels = data.items;
                }
            }
            // this.spinnerService.hide();
            this.loading = false;
        }, (error) => {
            console.log(error);
            this.loading = false;
            // this.spinnerService.hide();
        })
    }

    loadServiceLevels(event: LazyLoadEvent) {
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

        // // Global search
        if (event.globalFilter) {
            let result = event.filters.global.value.split(':');
            if (result.length > 1) {
                // convert target answer time/avg speed of answer - hours, minutes and seconds to seconds 
                let time = event.filters.global.value.split(':'); // split hours, minutes and seconds
                let hoursToSeconds = (time[0]) ? Math.floor(time[0] * 60 * 60) : 0;
                let minutesToSeconds = (time[1]) ? Math.floor(time[1] * 60) : 0;
                let seconds = (time[2]) ? Math.floor(time[2]) : 0;
                this.params.globalText = "" + Math.floor(hoursToSeconds + minutesToSeconds + seconds);
            } else {
                this.params.globalText = event.filters.global.value;
            }
        } else {
            this.params.globalText = "";
        }

        this.params.name = (event.filters.serviceLevelName) ? event.filters.serviceLevelName.value : ''; // Searching for service level name
        this.params.mediaType = (event.filters.channel) ? event.filters.channel.value.value : ''; // Searching for channel

        // Searching for service level/target answer time
        if (event.filters.serviceLevel) {
            let result = event.filters.serviceLevel.value.split(':');
            if (result.length > 1) {
                // convert target answer time - hours, minutes and seconds to seconds 
                let targetAnsTime = event.filters.serviceLevel.value.split(':'); // split hours, minutes and seconds
                let targetAnsTimeHoursToSeconds = (targetAnsTime[0]) ? Math.floor(targetAnsTime[0] * 60 * 60) : 0;
                let targetAnsTimeMinutesToSeconds = (targetAnsTime[1]) ? Math.floor(targetAnsTime[1] * 60) : 0;
                let targetAnsTimeSeconds = (targetAnsTime[2]) ? Math.floor(targetAnsTime[2]) : 0;
                this.params.targetAnswerTime = "" + Math.floor(targetAnsTimeHoursToSeconds + targetAnsTimeMinutesToSeconds + targetAnsTimeSeconds);
            } else {
                this.params.serviceLevel = "" + parseInt(event.filters.serviceLevel.value);
            }
        } else {
            this.params.serviceLevel = "";
            this.params.targetAnswerTime = "";
        }

        // Searching for avg speed of answer by converting hms to seconds
        if (event.filters.avgSpeedToAnswer) {
            // convert avg speed of answer - hours, minutes and seconds to seconds 
            let avgSpeedTime = event.filters.avgSpeedToAnswer.value.split(':'); // split hours, minutes and seconds
            let avgSpeedHoursToSeconds = (avgSpeedTime[0]) ? Math.floor(avgSpeedTime[0] * 60 * 60) : 0;
            let avgSpeedMinutesToSeconds = (avgSpeedTime[1]) ? Math.floor(avgSpeedTime[1] * 60) : 0;
            let avgSpeedSeconds = (avgSpeedTime[2]) ? Math.floor(avgSpeedTime[2]) : 0;
            this.params.avgSpeed = "" + Math.floor(avgSpeedHoursToSeconds + avgSpeedMinutesToSeconds + avgSpeedSeconds);
        } else {
            this.params.avgSpeed = "";
        }

        this.params.updateDate = (event.filters.updatedTimestamp) ? event.filters.updatedTimestamp.value : '' // Searching for updated date
        this.params.updateBy = (event.filters.updatedBy) ? event.filters.updatedBy.value : '' // Searching for updated date

        this.getServiceLevels(this.params)
        setTimeout(() => {
            this.paginator?.changePage(this.params.pageNo - 1);
        });
    }

    onChangeColumn(column, enabled){
        let index = this.cols.findIndex(x => x.field === column);
        if(enabled){
            this.cols[index].enabled = false;
            this.col[column] = ''
        }else{
            this.cols[index].enabled = true;
            this.col[column] = column
        }
        $('input:text').val('');    
        this.table.reset();
    }

    manageServiceLevel(serviceLevel, mode) {
        // console.log('manage service level', serviceLevel);
        if (mode == 'create') {
            this.showDialog();
        }
        if (mode == 'edit') {
            this.router.navigate(['/wfm/service_levels/edit/' + serviceLevel.serviceLevelId]);
        }
        if (mode == 'view') {
            this.isDeleteConfirm = false;
            this.isDeleteAllConfirm = false;
            this.isViewDetail = true;
            // this.router.navigate(['/wfm/service_levels/detail/' + serviceLevel.serviceLevelId]);
            this.getServiceLevelDetail(serviceLevel.serviceLevelId);
        }
        if (mode == 'delete') {
            this.isViewDetail = false;
            this.isDeleteAllConfirm = false;
            this.isDeleteConfirm = true;
            this.showDialog();
            this.serviceLevelId = serviceLevel.serviceLevelId;
            this.serviceLevelName = serviceLevel.serviceLevelName;
        }
    }

    deleteRecord() {
        this.spinnerService.show();
        this.serviceLevelService.deleteServiceLevel(this.serviceLevelId).subscribe((data: any) => {
            // this.commonMethods.addToastforlongtime(true, data.message);
            this.messageService.add({ severity: 'success', summary: this.serviceLevelName + ' has been deleted successfully!' });
            this.spinnerService.hide();
            this.closeDialog();
            this.getServiceLevels(this.params);
        }, (error) => {
            this.spinnerService.hide();
            console.log(error.error.message);
            if(error.error.message == 'Service level mapped to forecast request'){
                this.messageService.add({ severity: 'error', summary: 'Cannot delete this Service quality record', detail: 'It is mapped to one or more forecast(s)' });
            }else{
                this.messageService.add({ severity: 'error', summary: error.error.message });
            }
        })
    }

    deleteAllRecords() {
        let isServiceLevelsNotDeleted: boolean = false;
        this.spinnerService.show();
        this.selectedServiceLevels.forEach(element => {
            this.serviceLevelService.deleteServiceLevel(element.serviceLevelId).subscribe((data: any) => {
                this.selectedServiceLevels = this.selectedServiceLevels.filter(({ serviceLevelId }) => serviceLevelId !== element.serviceLevelId);
                if (!this.selectedServiceLevels.length) {
                    this.spinnerService.hide();
                    this.messageService.add({ severity: 'success', summary: 'Selected records has been deleted successfully!' });
                    this.closeDialog();
                    this.getServiceLevels(this.params);
                }
            }, (error) => {
                this.spinnerService.hide();
                if (!isServiceLevelsNotDeleted) {
                    isServiceLevelsNotDeleted = true;
                    console.log(error.error.message);
                    if(error.error.message == 'Service level mapped to forecast request'){
                        this.messageService.add({ severity: 'error', summary: 'Cannot delete this Service quality records', detail: 'It is mapped to one or more forecast(s)' });
                    }else{
                        this.messageService.add({ severity: 'error', summary: error.error.message });
                    }
                }
            })
        })
    }

    public paginate(paginationData): void {
        this.currentPage = paginationData.page + 1;
        this.params.pageNo = this.currentPage;
        this.params.pageSize = paginationData.rows;
        this.first = paginationData.first + 1;
        this.firstPage = paginationData.first;
        this.getServiceLevels(this.params);
    }

    // Delete multiple items from datatable
    deleteSelectedRecords() {
        this.isViewDetail = false;
        this.isDeleteConfirm = false;
        this.isDeleteAllConfirm = true;
        this.showDialog();
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

                this.showDialog();
            }
            this.spinnerService.hide();
        }, (error) => {
            console.log('error:', error.error);
            this.messageService.add({ severity: 'error', summary: 'Please try again later' });
            this.spinnerService.hide();
        })
    }

    // Filter the records based on start & end date
    onDateSelect(value, date) {
        let dateVal = this.datePipe.transform(value, 'MM/dd/yyyy');
        this.table.filter(dateVal, date, 'equals')
    }

    // To clear the inputs of filters in datatable
    clearFilters(dt) {
        dt.reset();
        $('input:text').val('');

        this.params = {
            pageNo: 1,
            pageSize: 10,
            globalText: "",
            orderBy: "desc",
            orderColumn: "service_level_id",
            name: "",
            mediaType: "",
            serviceLevel: "",
            targetAnswerTime: "",
            avgSpeed: "",
            updateDate: "",
            updateBy: ""
        }
        this.mediaType = { value: '' }
        this.getServiceLevels(this.params);
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