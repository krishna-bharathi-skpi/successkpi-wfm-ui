import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { LazyLoadEvent } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { GlobalComponent } from '../../../../../global/global.component';
import { CommonMethods } from '../../../../../common/common.components';
import { ScheduleService } from '../../schedule.service';
import { ForecastService } from '../../../forecast/forecast.service';

@Component({
    selector: 'app-workplan-list',
    templateUrl: './workplan-list.component.html',
    styleUrls: ['./workplan-list.component.css'],
    providers: [MessageService]
})

export class WorkplansListComponent implements OnInit {

    @ViewChild('dt') table: Table; // to perform all the operations of datatable
    @ViewChild('p', { static: false }) paginator?: Paginator; // To reset the paginator

    workplans: any = []; // to fetch the workplan list
    workplan: any; // to show specific details of workgrouping 
    isLoading: boolean = true; // to show/hide the message - no records found
    selectedWorkplans: any = []; // to delete multiple items in a datatable
    wfmConfigs: any = [];
    
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
        pageNo:1,
        pageSize:10,
        orderBy:"desc",
        orderColumn:"workplanId",
        globalText:"",
        workplanName:"",
        workplanDescription:"",
        status: "",
        updateDate:"",
        updateBy:""
    }
    sortOrder: number = -1; // to initiate sort order as desc during page load

    // dialog models
    display: boolean = false; // confirm dialog - show/hide
    isViewDetail: boolean = false; // dialog to show/hide the details of specific service level
    isDeleteConfirm: boolean = false; // dialog for delete records confirmation
    isDeleteAllConfirm: boolean = false; // dialog for delete all records confirmation
    workplanId = null; // to delete workplan using this variable in dialog
    workplanName = null // to show workplan name in dialog

    selectedWorkgroupNames: any = [];

    // To show/hide the table columns
    cols = [
        { field: 'workgroups_assigned', header: 'Workgroups Assigned', enabled: true },
        { field: 'status', header: 'Status', enabled: true },
        { field: 'updatedTimestamp', header: 'Updated On', enabled: true},
        { field: 'updatedBy', header: 'Updated By', enabled: true }
    ];
    col = {
        workgroups_assigned: 'workgroups_assigned',
        status: 'status',
        updatedTimestamp: 'updatedTimestamp',
        updatedBy: 'updatedBy',
    }
    selectedColumns: any;

    model={
        wfmConfigId:null,
        workgroupId:null,
        workplanId: null
      }
    workgroupName: string // To display workgroup name on topbar

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
        this.model.workgroupId = this.route.snapshot.params['workgroupId'];
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
                    this.model.wfmConfigId = this.wfmConfigs[0].wfmConfigId;
                    this.getWorkplans(this.params, this.model);
                }
            } else {
                this.wfmConfigs = [];
                this.model.wfmConfigId = null;
                this.spinnerService.hide();
                this.messageService.add({ severity: 'error', summary: 'Wfm config is not available', detail: 'Please try again later' });
            }
        }, (error) => {
            console.log('error:', error.error.message);
            this.messageService.add({ severity: 'error', summary: 'Wfm config is not available', detail: 'Please try again later' });
            this.spinnerService.hide();
        })
    }

    // To fetch the workplan list data
    getWorkplans(params, model) {
        this.loading = true;
        if (model.wfmConfigId) {
            this.scheduleService.getWorkplanList(params, model).subscribe((data: any) => {
                // console.log('workplan list:', data);
                if (data) {
                    this.workplans = data.items;
                    this.isLoading = false;
                    this.totalRecords = data.totalCount // To get total records count
                    setTimeout(() => {
                        if (!this.totalRecords) {
                            this.first = 0
                        }
                    }, 500);
                    this.last = this.firstPage + this.workplans.length;

                    // enable checkbox selection while navigating from page 1 to page 2
                    if ($(".select-all-chkbox .ui-chkbox-box").hasClass("ui-state-active")) {
                        this.selectedWorkplans = data.items;
                    }
                }
                this.loading = false;
                this.spinnerService.hide();
            }, (error) => {
                console.log(error);
                this.spinnerService.hide();
                this.loading = false;
            })
        }
    }

    loadWorkplans(event: LazyLoadEvent) {
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
        this.params.workplanName = (event.filters.workplanName) ? event.filters.workplanName.value : '' // Searching for workplan name
        this.params.status = (event.filters.status) ? event.filters.status.value : '' // Searching for workplan name
        this.params.updateDate = (event.filters.updatedTimestamp) ? event.filters.updatedTimestamp.value : '' // Searching for updated date
        this.params.updateBy = (event.filters.updatedBy) ? event.filters.updatedBy.value : '' // Searching for updated by
       
        this.getWorkplans(this.params, this.model)
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
    }

    public paginate(paginationData): void {
        this.currentPage = paginationData.page + 1;
        this.params.pageNo = this.currentPage;
        this.params.pageSize = paginationData.rows;
        this.first = paginationData.first + 1;
        this.firstPage = paginationData.first;
        this.getWorkplans(this.params, this.model);
    }

    resetParams() {
        this.params = {
            pageNo:1,
            pageSize:10,
            orderBy:"desc",
            orderColumn:"workplanId",
            globalText:"",
            workplanName:"",
            workplanDescription:"",
            status: "",
            updateDate:"",
            updateBy:""
        }
    }

    // To perform the operations of generate, publish, view, edit & delete
    manageWorkplan(workplan, mode) {
        this.workplanId = workplan.workplanId;
        this.workplanName = workplan.workplanName;
        this.model.wfmConfigId = workplan.wfmConfigId
        this.model.workplanId = workplan.workplanId
        // if (mode == 'view') {
        //     this.isDeleteConfirm = false;
        //     this.isDeleteAllConfirm = false;
        //     this.isViewDetail = true;
        //     this.getWorkplanDetail(this.model);
        // }
        if (mode == 'edit') {
            this.router.navigate([`/wfm/schedule/workplan/edit/${this.model.wfmConfigId}/${this.model.workplanId}`]);
        }
        if (mode == 'delete') {
            this.isViewDetail = false;
            this.isDeleteAllConfirm = false;
            this.isDeleteConfirm = true;
            this.showDialog();
        }
    }

    manageSelectedWorkplans(mode){
        if(mode == 'delete'){
            this.isViewDetail = false;
            this.isDeleteConfirm = false;
            this.isDeleteAllConfirm = true;
            this.showDialog();
        }
    }

    deleteRecord() {
        this.spinnerService.show();
        this.scheduleService.deleteWorkplan(this.model).subscribe((data: any) => {
            this.spinnerService.hide();
            this.messageService.add({ severity: 'success', summary: this.workplanName + ' has been deleted successfully!' });
            this.closeDialog();
            this.getWorkplans(this.params, this.model);
        }, (error) => {
            console.log(error.error.message);
            this.messageService.add({ severity: 'error', summary: 'Please try again later' });
            this.spinnerService.hide();
        })
    }

    deleteAllRecords() {
        this.spinnerService.show();
        this.selectedWorkplans.forEach(element => {
            this.model.workplanId = element.workplanId;
            this.scheduleService.deleteWorkplan(this.model).subscribe((data: any) => {
                this.selectedWorkplans = this.selectedWorkplans.filter(({ workplanId }) => workplanId !== element.workplanId);
                if (!this.selectedWorkplans.length) {
                    this.spinnerService.hide();
                    this.messageService.add({ severity: 'success', summary: 'Selected records has been deleted successfully!' });
                    this.closeDialog();
                    this.getWorkplans(this.params, this.model);
                }
            }, (error) => {
                console.log(error.error.message);
                this.messageService.add({ severity: 'error', summary: 'Please try again later' });
                this.spinnerService.hide();
            })
        })
    }

    getWorkplanDetail(params) {
        this.spinnerService.show();
        this.scheduleService.getWorkplan(params).subscribe((data: any) => {
            if (data) {
                this.workplan = data[0] // store the response data to workgroupData variable
                if(this.isViewDetail){
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

    // Getting specific workgroup detail to display workroup name in top bar
    getWorkgroupDetail() {
        this.spinnerService.show();
        this.scheduleService.getWorkgroup(this.model).subscribe((data: any) => {
        if (data) {
            this.workgroupName = data.workgroupName;
            this.spinnerService.hide();
        }
        }, (error) => {
        console.log('error:', error.error);
        this.messageService.add({ severity: 'error', summary: 'Workgroup details are not available', detail: 'Please try again later' });
        this.spinnerService.hide();
        })
    }

    // Delete multiple items from datatable
    deleteSelectedWorkplans() {
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
        this.getWorkplans(this.params, this.model);
    }

    redirectToCreate(){
        this.router.navigate([`/wfm/schedule/workplan/create`]);
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