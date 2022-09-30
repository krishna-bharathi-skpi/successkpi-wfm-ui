import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { GlobalComponent } from '../../../../global/global.component';
import { CommonMethods } from '../../../../common/common.components';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { LazyLoadEvent } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { ScheduleService } from '../schedule.service';
import { ForecastService } from '../../forecast/forecast.service';

@Component({
    selector: 'app-workgroup-list',
    templateUrl: './workgroup-list.component.html',
    styleUrls: ['./workgroup-list.component.css'],
    providers: [MessageService]
})

export class workGroupListComponent implements OnInit {

    @ViewChild('dt') table: Table; // to perform all the operations of datatable
    @ViewChild('p', { static: false }) paginator?: Paginator; // To reset the paginator

    workgroups: any = []; // to fetch the workgroup list
    workgroup: any; // to show specific details of workgrouping 
    isLoading: boolean = true; // to show/hide the message - no records found
    selectedWorkgroups: any = []; // to delete multiple items in a datatable

    wfmConfigs: any = [];
    wfmConfigId: string;
    
    // to config pagination
    currentPage: any = 1;
    totalRecords: any;
    pageNo: any = 1;
    pageSize: any = 10;
    first: any = 1;
    firstPage: any = 0;
    last: any = 0;
    loading: boolean;

    // server side actions - searching, sorting
    params = {
        pageNo: 1,
        pageSize: 10,
        globalText: "",
        orderBy: "desc",
        orderColumn: "workgroupId",
        workgroupName: "",
        adherThreshold: 0,
        adherTarget: 0,
        excepThreshold:0,
        updateDate: "",
        updateBy: ""
    }
    sortOrder: number = -1; // to initiate sort order as desc during page load

    display: boolean = false; // confirm dialog - show/hide
    isViewDetail: boolean = false; // dialog to show/hide the details of specific service level
    isDeleteConfirm: boolean = false; // dialog for delete records confirmation
    isDeleteAllConfirm: boolean = false; // dialog for delete all records confirmation
    workgroupId = null; // to delete workgroup using this variable in dialog
    workgroupName = null // to show workgroup name in dialog

    displayPosition: boolean;
    position: string;

    selectedWorkgroupNames: any = [];
    agentAssignedToWorkgroup:any = [];
    agentName: any;

    cols = [
        { field: 'severeAdherenceThreshold', header: 'Adherence Threshold', enabled: true },
        { field: 'adherenceTarget', header: 'Adherence Target', enabled: true },
        { field: 'adherenceExceptionThreshold', header: 'Exception Threshold', enabled: true },
        { field: 'updatedTimestamp', header: 'Updated On', enabled: true},
        { field: 'updatedBy', header: 'Updated By', enabled: true }
    ];
    col = {
        severeAdherenceThreshold: 'severeAdherenceThreshold',
        adherenceTarget: 'adherenceTarget',
        adherenceExceptionThreshold: 'adherenceExceptionThreshold',
        updatedTimestamp: 'updatedTimestamp',
        updatedBy: 'updatedBy',
    }
    selectedColumns: any;

    constructor(
        public global: GlobalComponent,
        private route: ActivatedRoute,
        private router: Router,
        private commonMethods: CommonMethods,
        private scheduleService: ScheduleService,
        private spinnerService: NgxSpinnerService,
        private messageService: MessageService,
        private datePipe: DatePipe,
        private forecastService: ForecastService
    ) {
        this.commonMethods.dynamicBackgroundColorChange('white');
        this.workgroupId = this.route.snapshot.params['workgroupId'];
    }

    ngOnInit() {
        this.scheduleService.alignWfmContainer();
        this.selectedColumns = this.cols;
        this.getWfmConfigs();
    }

    // Page load -get wfm config details
    getWfmConfigs() {
        this.forecastService.getWfmConfigId().subscribe((data: any) => {
            if (data.Items[0]) {
                this.wfmConfigs = data.Items;
                if (this.wfmConfigs.length) {
                    this.wfmConfigId = this.wfmConfigs[0].wfmConfigId;
                    this.getworkgroups(this.params,this.wfmConfigId);
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

    // To fetch the workgroup list data
    getworkgroups(params, wfmConfigId) {
        this.loading = true;
        if (wfmConfigId) {
            this.scheduleService.getWorkgroupList(params, wfmConfigId).subscribe((data: any) => {
                // console.log('workgroup list:', data);
                if (data) {
                    this.workgroups = data.items;

                    // filtering records based on hidden columns
                    let hiddenColumns = this.cols.filter(x => { return x.enabled == false });
                    let hiddenColumnsData = [];
                    if(hiddenColumns.length && this.params.globalText){
                        hiddenColumns.forEach(element => {
                            data.items.forEach(childElement => {
                                if(childElement[element.field]){
                                    if(('' + element.field && '' + childElement[element.field]).toLocaleLowerCase().includes(this.params.globalText)
                                    && !childElement.workgroupName.toLocaleLowerCase().includes(this.params.globalText)){
                                        hiddenColumnsData.push(childElement)
                                    }
                                }
                            })
                        })
                    }
                    if(hiddenColumnsData.length){
                        this.workgroups = [];
                        this.firstPage = 0;
                        this.totalRecords = 0;
                    }else{
                        this.workgroups = data.items;
                        this.totalRecords = data.totalCount // To get total records count
                    }

                    this.isLoading = false;
                    // this.totalRecords = data.totalCount // To get total records count
                    setTimeout(() => {
                        if (!this.totalRecords) {
                            this.first = 0
                        }
                    }, 500);
                    this.last = this.firstPage + this.workgroups.length;

                    // enable checkbox selection while navigating from page 1 to page 2
                    if ($(".select-all-chkbox .ui-chkbox-box").hasClass("ui-state-active")) {
                        this.selectedWorkgroups = data.items;
                    }
                }
                this.loading = false;
            }, (error) => {
                console.log(error);
                this.spinnerService.hide();
                this.loading = false;
            })
        }
    }

    loadWorkGroups(event: LazyLoadEvent) {
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
            this.params.orderColumn = event.sortField;
            // this.params.orderColumn = event.sortField.split(/(?=[A-Z])/).join('_').toLowerCase();
        }
        
        this.params.globalText = (event.globalFilter) ? event.filters.global.value : '' // Global search
        this.params.workgroupName = (event.filters.workgroupName) ? event.filters.workgroupName.value : '' // Searching for workgroup name
        this.params.adherThreshold = (event.filters.severeAdherenceThreshold) ? event.filters.severeAdherenceThreshold.value : 0 // Searching for severe adherence threshold
        this.params.adherTarget = (event.filters.adherenceTarget) ? event.filters.adherenceTarget.value : 0 // Searching for adherence target
        this.params.excepThreshold = (event.filters.adherenceExceptionThreshold) ? event.filters.adherenceExceptionThreshold.value : 0 // Searching for adherence exception threshold
        this.params.updateDate = (event.filters.updatedTimestamp) ? event.filters.updatedTimestamp.value : '' // Searching for updated date
        this.params.updateBy = (event.filters.updatedBy) ? event.filters.updatedBy.value : '' // Searching for updated by
       
        this.getworkgroups(this.params, this.wfmConfigId)
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

    public paginate(paginationData): void {
        this.currentPage = paginationData.page + 1;
        this.params.pageNo = this.currentPage;
        this.params.pageSize = paginationData.rows;
        this.first = paginationData.first + 1;
        this.firstPage = paginationData.first;
        this.getworkgroups(this.params, this.wfmConfigId);
    }

    resetParams() {
        this.params = {
            pageNo: 1,
            pageSize: 10,
            globalText: "",
            orderBy: "desc",
            orderColumn: "workgroupId",
            workgroupName: "",
            adherThreshold: 0,
            adherTarget: 0,
            excepThreshold:0,
            updateDate: "",
            updateBy: ""
        }
    }

    // To perform the operations of generate, publish, view, edit & delete
    manageWorkgroup(workgroup, mode) {
        this.workgroupId = workgroup.workgroupId;
        this.workgroupName = workgroup.workgroupName;

        if (mode == 'view') {
            this.isDeleteConfirm = false;
            this.isDeleteAllConfirm = false;
            this.isViewDetail = true;
    
            this.workgroup = workgroup;
            this.showDialog();
        }
        if (mode == 'edit') {
            this.router.navigate(['/wfm/schedule/workgroup/edit/' + this.workgroupId]);
        }
        if (mode == 'view_workplans') {
            this.router.navigate([`/wfm/schedule/workgroup/workplan/list/${this.workgroupId}`]);
        }
        if (mode == 'add_workplan') {
            this.router.navigate([`/wfm/schedule/workgroup/workplan/create/${this.workgroupId}`]);
        }
        if (mode == 'delete') {
            this.isViewDetail = false;
            this.isDeleteAllConfirm = false;
            this.isDeleteConfirm = true;
            // this.getworkgroupDetail(model);
            // To check whether agent exists in specific workgroup
            this.agentAssignedToWorkgroup = []; // reset the array
            if(workgroup.agentsName){
                // workgroup.agentsList.forEach(item => {
                //     if(item.agentsName){
                //         this.agentName = item.agentsName;
                //         this.agentAssignedToWorkgroup.push({agentName: item.agentsName})
                //     }
                // })
                this.agentAssignedToWorkgroup.push({agentName: workgroup.agentsName})
            }
            this.showDialog();
        }
    }

    manageSelectedWorkgroups(mode){
        this.agentAssignedToWorkgroup = [];
        if(mode == 'delete'){
            this.isViewDetail = false;
            this.isDeleteConfirm = false;
            this.isDeleteAllConfirm = true;
            // To check whether agent exists in workgroups
            this.selectedWorkgroups.forEach(element => {
                this.workgroupName = element.workgroupName;
                if(element.agentsName){
                    // element.agentsList.forEach(item => {
                    //     if(item.agentsName){
                    //         this.agentName = item.agentsName;
                    //         this.agentAssignedToWorkgroup.push({agentsName: item.agentsName})
                    //     }
                    // })
                    this.agentAssignedToWorkgroup.push({agentName: element.agentsName})
                }
            })
            this.showDialog();
        }
        
    }

    deleteRecord() {
        this.spinnerService.show();
        let deleteParams = {
            workgroupId: this.workgroupId,
            wfmConfigId: this.wfmConfigId
        } 
        this.scheduleService.deleteWorkgroup(deleteParams).subscribe((data: any) => {
            // this.commonMethods.addToastforlongtime(true, data.message);
            this.spinnerService.hide();
            this.messageService.add({ severity: 'success', summary: this.workgroupName + ' has been deleted successfully!' });
            this.closeDialog();
            this.getworkgroups(this.params, this.wfmConfigId);
        }, (error) => {
            console.log(error.error.message);
            this.messageService.add({ severity: 'error', summary: 'Please try again later' });
            this.spinnerService.hide();
        })
    }

    deleteAllRecords() {
        this.spinnerService.show();
        this.selectedWorkgroups.forEach(element => {
            let deleteParams = {
                workgroupId: element.workgroupId,
                wfmConfigId: element.wfmConfigId
            } 
            this.scheduleService.deleteWorkgroup(deleteParams).subscribe((data: any) => {
                this.selectedWorkgroups = this.selectedWorkgroups.filter(({ workgroupId }) => workgroupId !== element.workgroupId);
                if (!this.selectedWorkgroups.length) {
                    this.spinnerService.hide();
                    this.messageService.add({ severity: 'success', summary: 'Selected records has been deleted successfully!' });
                    this.closeDialog();
                    this.getworkgroups(this.params, this.wfmConfigId);
                }
            }, (error) => {
                console.log(error.error.message);
                this.messageService.add({ severity: 'error', summary: 'Please try again later' });
                this.spinnerService.hide();
            })
        })
    }

    getworkgroupDetail(params) {
        this.spinnerService.show();
        this.scheduleService.getWorkgroup(params).subscribe((data: any) => {
            if (data) {
                this.workgroup = data // store the response data to workgroupData variable
                if(this.isViewDetail || this.isDeleteConfirm || this.isDeleteAllConfirm){
                    this.showDialog();
                }
                this.spinnerService.hide();
            } else {
                this.messageService.add({ severity: 'error', summary: 'Please try again later' });
            }
        }, (error) => {
            console.log('error:', error.error);
            this.spinnerService.hide();
        })
    }

    // Delete multiple items from datatable
    deleteselectedWorkgroups() {
        this.isViewDetail = false;
        this.isDeleteConfirm = false;
        this.isDeleteAllConfirm = true;
        this.showDialog();
    }

    // Filter the records according to selection of updated date
    onDateSelect(value, date) {
        let dateVal = this.datePipe.transform(value, 'MM/dd/yyyy');
        this.table.filter(dateVal, date, 'equals')
    }

    // To clear the inputs of filters in datatable
    clearFilters(dt) {
        // this.table.reset();
        dt.reset();
        $('input:text').val('');

        this.resetParams();
        this.getworkgroups(this.params, this.wfmConfigId);
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