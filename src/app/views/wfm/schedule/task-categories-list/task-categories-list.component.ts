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
    selector: 'app-task-categories-list',
    templateUrl: './task-categories-list.component.html',
    styleUrls: ['./task-categories-list.component.css'],
    providers: [MessageService]
})

export class TaskCategoriesListComponent implements OnInit {

    @ViewChild('dt') table: Table; // to perform all the operations of datatable
    @ViewChild('p', { static: false }) paginator?: Paginator; // To reset the paginator

    categories: any = []; // to fetch the category list
    category: any; // to show specific details of workgrouping 
    isLoading: boolean = true; // to show/hide the message - no records found
    selectedTaskCategories: any = []; // to delete multiple items in a datatable

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
        pageNo:1,
        pageSize:10,
        globalText:"",
        orderBy:"Asc",
        orderColumn:"category_id",
        categoryName:"",
        categoryDescription:"",
        catagoryColorCode:"",
        isSchedulable:"",
        isPaid:"",
        isAdherenceRelated:"",
        colorName:"",
        categoryId:"",
        updateDate:"",
        updateBy:""
    }
    sortOrder: number = -1; // to initiate sort order as desc during page load

    display: boolean = false; // confirm dialog - show/hide
    isViewDetail: boolean = false; // dialog to show/hide the details of specific service level
    isDeleteConfirm: boolean = false; // dialog for delete records confirmation
    isDeleteAllConfirm: boolean = false; // dialog for delete all records confirmation
    categoryId = null; // to delete category using this variable in dialog
    categoryName = null // to show category name in dialog

    cols = [
        { field: 'colorName', header: 'Color', enabled: true },
        { field: 'isSchedulable', header: 'Is Schedulable', enabled: true },
        { field: 'isPaid', header: 'Is Paid', enabled: true },
        { field: 'isAdherenceRelated', header: 'Is Adherence Related', enabled: true },
        { field: 'updatedTimestamp', header: 'Updated On', enabled: true},
        { field: 'updatedBy', header: 'Updated By', enabled: true }
    ];
    col = {
        colorName: 'colorName',
        isSchedulable: 'isSchedulable',
        isPaid: 'isPaid',
        isAdherenceRelated: 'isAdherenceRelated',
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
                    this.getTaskCategories(this.params,this.wfmConfigId);
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

    // To fetch the category list data
    getTaskCategories(params, wfmConfigId) {
        this.loading = true;
        if (wfmConfigId) {
            this.scheduleService.getTaskCategoriesList(params, wfmConfigId).subscribe((data: any) => {
                // console.log('category list:', data);
                if (data) {
                    this.categories = data.items;
                    this.isLoading = false;
                    this.totalRecords = data.totalCount // To get total records count
                    setTimeout(() => {
                        if (!this.totalRecords) {
                            this.first = 0
                        }
                    }, 500);
                    this.last = this.firstPage + this.categories.length;

                    // enable checkbox selection while navigating from page 1 to page 2
                    if ($(".select-all-chkbox .ui-chkbox-box").hasClass("ui-state-active")) {
                        this.selectedTaskCategories = data.items;
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

    loadTaskCategories(event: LazyLoadEvent) {
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
        this.params.categoryName = (event.filters.categoryName) ? event.filters.categoryName.value : '' // Searching for category name
        this.params.colorName = (event.filters.colorName) ? event.filters.colorName.value : 0 // Searching for color name
        this.params.isSchedulable = (event.filters.isSchedulable) ? event.filters.isSchedulable.value : 0 // Searching for isSchedulable
        this.params.isPaid = (event.filters.isPaid) ? event.filters.isPaid.value : 0 // Searching for isPaid
        this.params.isAdherenceRelated = (event.filters.isAdherenceRelated) ? event.filters.isAdherenceRelated.value : 0 // Searching for isAdherenceRelated
        this.params.updateDate = (event.filters.updatedTimestamp) ? event.filters.updatedTimestamp.value : '' // Searching for updated date
        this.params.updateBy = (event.filters.updatedBy) ? event.filters.updatedBy.value : '' // Searching for updated by
       
        this.getTaskCategories(this.params, this.wfmConfigId)
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
        this.getTaskCategories(this.params, this.wfmConfigId);
    }

    resetParams() {
        this.params = {
            pageNo:1,
            pageSize:10,
            globalText:"",
            orderBy:"Asc",
            orderColumn:"category_id",
            categoryName:"",
            categoryDescription:"",
            catagoryColorCode:"",
            isSchedulable:"",
            isPaid:"",
            isAdherenceRelated:"",
            colorName:"",
            categoryId:"",
            updateDate:"",
            updateBy:""
        }
    }

    // To perform the operations of generate, publish, view, edit & delete
    manageTaskCategory(category, mode) {
        this.categoryId = category.categoryId;
        this.categoryName = category.categoryName;
        let model = {categoryId: this.categoryId, wfmConfigId: this.wfmConfigId}
        if (mode == 'view') {
            this.isDeleteConfirm = false;
            this.isDeleteAllConfirm = false;
            this.isViewDetail = true;
            this.getTaskCategoryDetail(model);
        }
        if (mode == 'delete') {
            this.isViewDetail = false;
            this.isDeleteAllConfirm = false;
            this.isDeleteConfirm = true;
        }
    }

    manageSelectedTaskCategories(mode){
        if(mode == 'delete'){
            this.isViewDetail = false;
            this.isDeleteConfirm = false;
            this.isDeleteAllConfirm = true;
            this.showDialog();
        }
    }

    deleteRecord() {
        this.spinnerService.show();
        let deleteParams = {
            categoryId: this.categoryId,
            wfmConfigId: this.wfmConfigId
        } 
        this.scheduleService.deleteTaskCategory(deleteParams).subscribe((data: any) => {
            this.spinnerService.hide();
            this.messageService.add({ severity: 'success', summary: this.categoryName + ' has been deleted successfully!' });
            this.closeDialog();
            this.getTaskCategories(this.params, this.wfmConfigId);
        }, (error) => {
            console.log(error.error.message);
            this.messageService.add({ severity: 'error', summary: 'Please try again later' });
            this.spinnerService.hide();
        })
    }

    deleteAllRecords() {
        this.spinnerService.show();
        this.selectedTaskCategories.forEach(element => {
            let deleteParams = {
                categoryId: element.categoryId,
                wfmConfigId: element.wfmConfigId
            } 
            this.scheduleService.deleteTaskCategory(deleteParams).subscribe((data: any) => {
                this.selectedTaskCategories = this.selectedTaskCategories.filter(({ categoryId }) => categoryId !== element.categoryId);
                if (!this.selectedTaskCategories.length) {
                    this.spinnerService.hide();
                    this.messageService.add({ severity: 'success', summary: 'Selected records has been deleted successfully!' });
                    this.closeDialog();
                    this.getTaskCategories(this.params, this.wfmConfigId);
                }
            }, (error) => {
                console.log(error.error.message);
                this.messageService.add({ severity: 'error', summary: 'Please try again later' });
                this.spinnerService.hide();
            })
        })
    }

    getTaskCategoryDetail(params) {
        // this.spinnerService.show();
        // this.scheduleService.getWorkgroup(params).subscribe((data: any) => {
        //     if (data) {
        //         this.category = data // store the response data to workgroupData variable
        //         if(this.isViewDetail || this.isDeleteConfirm || this.isDeleteAllConfirm){
        //             this.showDialog();
        //         }
        //         this.spinnerService.hide();
        //     } else {
        //         this.messageService.add({ severity: 'error', summary: 'Please try again later' });
        //     }
        // }, (error) => {
        //     console.log('error:', error.error);
        //     this.spinnerService.hide();
        // })
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
        this.getTaskCategories(this.params, this.wfmConfigId);
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