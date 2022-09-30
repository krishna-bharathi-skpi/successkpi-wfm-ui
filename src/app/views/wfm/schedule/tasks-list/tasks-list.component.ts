import { Component, OnInit, ViewChild, Input, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { GlobalComponent } from '../../../../global/global.component';
import { CommonMethods } from '../../../../common/common.components';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { LazyLoadEvent } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { ScheduleService } from '../schedule.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ForecastService } from '../../forecast/forecast.service';
import { timeStamp } from 'console';
import { serviceLevelService } from '../../service-levels/serviceLevel.service';

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.css'],
    providers: [MessageService]
})

export class TasksListComponent implements OnInit {

    @HostListener('document:click', ['$event'])
    documentClick(event: MouseEvent) {}

    // To validate a form
    isTaskSubmitted: boolean = false;
    taskForm: FormGroup;
    task_description = ''; // to show the task description count to user

    taskCategoryForm: FormGroup;
    isCategoryFormSubmitted: boolean = false;

    categoryColorForm: FormGroup;
    isCategoryColorFormSubmitted: boolean = false;

    @ViewChild('dt') table: Table; // to perform all the operations of datatable
    @ViewChild('p', { static: false }) paginator?: Paginator; // To reset the paginator
    @ViewChild('opFilter', { static: true }) panel: OverlayPanel;

    tasks: any = []; // to fetch the tasks list
    task: any; // to show specific details of task 
    isLoading: boolean = true; // to show/hide the message - no records found
    selectedTasks: any = []; // to delete multiple items in a datatable
    selectedTaskCategory: any;
    selectedTaskCategory2: any;
    selectedColorTaskCategory: any;
    selectedCategory: any;
    selectedCategory2: any;
    selectedCategoryColor: any;
    wfmConfigs: any = [];
    selectedConfig: any = [];

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
        orderBy:"desc",
        orderColumn:"task_id",
        taskName:"",
        taskDescription:"",
        taskLength:0,
        isPaid: false,
        colorCode:"",
        colorName:"",
        categoryId:0,
        categoryName:"",
        updateDate:"",
        updateBy:""
    }
    sortOrder: number = -1; // to initiate sort order as desc during page load

    model = {
        wfmConfigId: null,
        workgroupId: null,
    }

    display: boolean = false; // confirm dialog - show/hide
    isViewDetail: boolean = false; // dialog to show/hide the details of specific task
    isDeleteConfirm: boolean = false; // dialog for delete records confirmation
    isDeleteAllConfirm: boolean = false; // dialog for delete all records confirmation
    isAddNewTaskEnabled: boolean = false; // dialog to add new task to a workgroup
    isUpdateTaskEnabled: boolean = false; // dialog to add new task to a workgroup
    isAddNewCategoryEnabled: boolean = false; // dialog to add new category
    isAddNewCategoryColorEnabled: boolean = false; // dialog to add category color
    taskId = null; // to delete task using this variable in dialog
    taskName = null // to show task name in dialog
    colorName: string // to save color name to backend
    public newTitleElem: any;

    cols = [
        { field: 'categoryName', header: 'Category', enabled: true },
        { field: 'taskLength', header: 'Duration', enabled: true },
        { field: 'isPaid', header: 'Is Paid', enabled: true },
        { field: 'updatedTimestamp', header: 'Updated On', enabled: true },
        { field: 'updatedBy', header: 'Updated By', enabled: true },
    ];
    col = {
        categoryName: 'categoryName',
        taskLength: 'taskLength',
        isPaid: 'isPaid',
        updatedTimestamp: 'updatedTimestamp',
        updatedBy: 'updatedBy'
    }
    selectedColumns: any;

    categories: any = [];
    category: string;
    isCategoryListEnabled: boolean = false;
    isTaskCategoryListEnabled: boolean = false;

    colors: any = [];
    color: string
    isCategoryColorListEnabled: boolean = false;
    isTaskCreatedSuccess:boolean = false;

    taskDurationHours:any; // contains hours
    taskDurationHour:any; // ngModel
    taskDurationMinutes:any; // contains minutes
    taskDurationMinute:any; // ngModel

    constructor(
        private formBuilder: FormBuilder,
        public global: GlobalComponent,
        private route: Router,
        private commonMethods: CommonMethods,
        private scheduleService: ScheduleService,
        private spinnerService: NgxSpinnerService,
        private messageService: MessageService,
        private datePipe: DatePipe,
        private forecastService: ForecastService,
        private serviceLevelService: serviceLevelService,
        private el: ElementRef,
    ) {
        this.commonMethods.dynamicBackgroundColorChange('white');

        this.taskForm = this.formBuilder.group({
            taskName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9-_ ]*$')]],
            taskDescription: [null, [Validators.maxLength(400), Validators.pattern('^[a-zA-Z0-9-_,. ]*$')]],
            isPaid: [false],
            isSchedulable: [false],
            isAdherenceRelated: [false],
            isAvailableInteraction: [false]
        });
    }

    ngOnInit() {
        this.spinnerService.show();
        this.getWfmConfigs();
        this.selectedColumns = this.cols;
    }

    getTasks(params, wfmConfigId) {
        this.loading = true;
        if (wfmConfigId) {
            this.scheduleService.getTasksList(params, wfmConfigId).subscribe((data: any) => {
                // console.log('tasks list:', data);
                if (data) {
                    this.tasks = data.items;

                    // convert task timing - seconds to hours and minutes to display in grid
                    this.tasks.forEach(element => {
                        let hms = this.serviceLevelService.secondsToHms(element.taskLength) // for service level
                        let time = hms.split(':'); // split hours, minutes and seconds
                        element.taskLength = time[0] + ':' + time[1]; // concatenate hours, minutes and seconds
                    })

                    this.isLoading = false;
                    this.totalRecords = data.totalCount // To get total records count
                    setTimeout(() => {
                        if (!this.totalRecords) {
                            this.first = 0
                        }
                    }, 500);
                    this.last = this.firstPage + this.tasks.length;

                    // enable checkbox selection while navigating from page 1 to page 2
                    if ($(".select-all-chkbox .ui-chkbox-box").hasClass("ui-state-active")) {
                        this.selectedTasks = data.items;
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

    loadTasks(event: LazyLoadEvent) {
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
            // this.params.orderColumn = event.sortField;
            this.params.orderColumn = event.sortField.split(/(?=[A-Z])/).join('_').toLowerCase();
        }
        
        this.params.globalText = (event.globalFilter) ? event.filters.global.value : '' // Global search
        this.params.taskName = (event.filters.taskName) ? event.filters.taskName.value : '' // Searching for task name
        
        // Searching for task duration length
        if (event.filters.taskLength) {
            let result = event.filters.taskLength.value.split(':');
            if (result.length > 1) {
                // convert task duration time - hours, minutes to seconds 
                let taskTime = event.filters.taskLength.value.split(':'); // split hours, minutes and seconds
                let targetAnsTimeHoursToSeconds = (taskTime[0]) ? Math.floor(taskTime[0] * 60 * 60) : 0;
                let targetAnsTimeMinutesToSeconds = (taskTime[1]) ? Math.floor(taskTime[1] * 60) : 0;
                this.params.taskLength = Math.floor(targetAnsTimeHoursToSeconds + targetAnsTimeMinutesToSeconds);
            } else {
                this.params.taskLength = parseInt(event.filters.taskLength.value);
            }
        } else {
            this.params.taskLength = 0;
        }
        
        this.params.updateDate = (event.filters.updatedTimestamp) ? event.filters.updatedTimestamp.value : '' // Searching for updated date
        this.params.updateBy = (event.filters.updatedBy) ? event.filters.updatedBy.value : '' // Searching for updated by
        
        this.getTasks(this.params, this.model.wfmConfigId)
        setTimeout(() => {
            this.paginator?.changePage(this.params.pageNo - 1);
        });
    }

    getTaskCategories(wfmConfigId){
        this.scheduleService.getTaskCategoryOptions(wfmConfigId).subscribe((data: any) => {
            // console.log('tasks list:', data);
            if (data) {
                this.categories = data;
                this.getColors();

                if(this.isTaskCreatedSuccess){
                    this.selectedTaskCategory = { categoryName: data[0].categoryName };
                    this.selectedTaskCategory2 = { categoryName: data[0].categoryName };
                    this.selectedColorTaskCategory = { categoryName: data[0].categoryName };
                    this.isTaskCreatedSuccess = false; // set create task category mode to default
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

    onChangeCategory(category) {
        this.isCategoryListEnabled = false;
        this.selectedTaskCategory = category;
        $('#category_listbox .list-group-item').removeClass('selected');
        $('#category_'+ category.categoryId).addClass('selected');
        $('#category_listbox').css('display','none');
    }
    
    onChangeTaskCategory(category) {
        this.isTaskCategoryListEnabled = false;
        this.selectedTaskCategory2 = category;
        $('#task_category_listbox .list-group-item').removeClass('selected');
        $('#task_category_'+ category.categoryId).addClass('selected');
        $('#task_category_listbox').css('display','none');
    }

    onChangeCategoryColor(categoryColor) {
        this.isCategoryColorListEnabled = false;
        this.selectedCategory = categoryColor;
        this.selectedCategoryColor = categoryColor;
        $('#category_color_listbox .list-group-item').removeClass('selected');
        $('#'+ categoryColor.value).addClass('selected');
        $('#category_color_listbox').css('display','none');
    }

    // Filter the records according to selection of updated date
    onDateSelect(value, date) {
        let dateVal = this.datePipe.transform(value, 'MM/dd/yyyy');
        this.table.filter(dateVal, date, 'equals')
    }

    // to show the modal dialogs based on type - task/category/category color
    showModalDialog(mode) {
        this.resetDialogFlags();
        if (mode == 'task') {
            this.isAddNewTaskEnabled = true;
            // initiating values for task duration
            this.taskDurationHours = this.serviceLevelService.hourOptions;
            this.taskDurationMinutes = this.serviceLevelService.timeOptions;
        } if (mode == 'category') {
            this.isAddNewCategoryEnabled = true;
        } if (mode == 'category_color') {

            this.isTaskSubmitted = true;
            this.isAddNewTaskEnabled = true;
            
            // validate create task form before opening color dialog
            if (this.taskForm.invalid) {
                // set focus on invalid controls
                for (const key of Object.keys(this.taskForm.controls)) {
                    if (this.taskForm.controls[key].invalid) {
                        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
                        invalidControl.focus();
                        break;
                    }
                }
                return;
            }

            (this.taskForm.get('isPaid').value) ? this.taskForm.get('isPaid').value : this.taskForm.get('isPaid').setValue(false);

            // validate task duration - hours/minutes/seconds has no value
            if (!this.taskDurationHour && !this.taskDurationMinute) {
                return;
            }

            if (this.taskDurationHour && !this.taskDurationMinute) {
                this.taskDurationMinute = { value: '00' }
            } else if (!this.taskDurationHour && this.taskDurationMinute) {
                this.taskDurationHour = { value: '00' }
            }

            if (this.taskDurationHour && this.taskDurationMinute) {
                if (this.taskDurationHour.value == '00' && this.taskDurationMinute.value == '00') {
                    this.messageService.add({ severity: 'error', summary: 'Please select valid time', detail: 'Both Hours and Minutes will not be zero' });
                    return;
                }
            }

            if(!this.selectedTaskCategory){
                this.messageService.add({ severity:'error', summary: 'Please select task category and pick your own color' });
                return
            }
            this.isAddNewTaskEnabled = false;
            this.isAddNewCategoryColorEnabled = true;
            this.selectedCategoryColor = this.selectedTaskCategory.catagoryColorCode
        }
        this.showDialog();
    }

    // to close the modal dialogs based on type - task/category/category color
    closeModalDialog(mode) {
        if (mode == 'task') {
            this.isAddNewTaskEnabled = false;
            this.isTaskSubmitted = false;
            this.taskForm.reset();
            this.selectedTaskCategory = null;
            this.taskDurationHour = {value: '00'}
            this.taskDurationMinute = {value: '00'}
            this.closeDialog();
        } if (mode == 'category') {
            this.isAddNewCategoryEnabled = false;
            this.isAddNewCategoryColorEnabled = false;
            this.isAddNewTaskEnabled = true;
            this.taskCategoryForm.reset();
            this.selectedCategoryColor = null;
        } if (mode == 'category_color') {
            this.isAddNewCategoryColorEnabled = false;
            this.isAddNewCategoryEnabled = true;
        }
    }

    showCustomDrodownOptions(mode) {
        this.resetCustomDrodownFlags();
        if (mode == 'category') {
            this.isCategoryListEnabled = true;
            $('#category_listbox').css('display','block');
        }if (mode == 'task_category') {
            this.isTaskCategoryListEnabled = true;
            $('#task_category_listbox').css('display','block');
        }if (mode == 'category_color') {
            this.isCategoryColorListEnabled = true;
            $('#category_color_listbox').css('display','block');
        }
    }

    hideCustomDropdownOptions(mode) {
        if (mode == 'category') {
            this.isCategoryListEnabled = false;
        }if (mode == 'task_category') {
            this.isTaskCategoryListEnabled = false;
        }if (mode == 'category_color') {
            this.isCategoryColorListEnabled = false;
        }
    }

    resetCustomDrodownFlags() {
        this.isCategoryListEnabled = false;
        this.isTaskCategoryListEnabled = false;
        this.isCategoryColorListEnabled = false;
    }

    // create new task
    createNewTask() {
        this.isTaskSubmitted = true;
        if (this.taskForm.invalid) {
            // set focus on invalid controls
            for (const key of Object.keys(this.taskForm.controls)) {
                if (this.taskForm.controls[key].invalid) {
                    const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
                    invalidControl.focus();
                    break;
                }
            }
            return;
        }

        if(!this.selectedTaskCategory){
            return
        }

        (this.taskForm.get('isPaid').value) ? this.taskForm.get('isPaid').value : this.taskForm.get('isPaid').setValue(false);

        // validate task duration - hours/minutes/seconds has no value
        if (!this.taskDurationHour && !this.taskDurationMinute) {
            return;
        }

        if(this.taskDurationHour && !this.taskDurationMinute){
            this.taskDurationMinute = {value: '00'}
        }else if(!this.taskDurationHour && this.taskDurationMinute){
            this.taskDurationHour = {value: '00'}
        }

        if(this.taskDurationHour && this.taskDurationMinute){
            if (this.taskDurationHour.value == '00' && this.taskDurationMinute.value == '00') {
                this.messageService.add({ severity:'error', summary: 'Please select valid time', detail:'Both Hours and Minutes will not be zero' });
                return;
            }
        }
        
        const taskDurationHoursToSeconds = (this.taskDurationHour) ? Math.floor(this.taskDurationHour.value * 60 * 60) : 0;  
        const taskDurationMinutesToSeconds = (this.taskDurationMinute) ? Math.floor(this.taskDurationMinute.value * 60) : 0;
        const taskLength = Math.floor(taskDurationHoursToSeconds + taskDurationMinutesToSeconds);

        const {
            isAdherenceRelated,
            isSchedulable, 
            isAvailableInteraction,
            ...taskCreationFields
        } = this.taskForm.value;

        const {
            categoryId,
            categoryName,
            catagoryColorCode: categoryColorCode,
            colorName,
            categoryDescription,
        } = this.selectedTaskCategory;

        const taskCreationPayload = [{
            wfmConfigId: this.selectedConfig.wfmConfigId,
            ...taskCreationFields,
            categoryId,
            categoryName,
            colorCode: categoryColorCode,
            taskLength,
            isAvailableInteraction,
        }]

        const taskCategoryUpdatePayload = {
            wfmConfigId: this.selectedConfig.wfmConfigId,
            categoryName,
            categoryDescription,
            categoryId,
            categoryColorCode,
            // colorName,
            // isAdherenceRelated,
            isAvailableInteraction,
            // isSchedulable
        }

        this.spinnerService.show();
        if(this.isAddNewTaskEnabled){
            this.scheduleService.updateTaskCategory(taskCategoryUpdatePayload).subscribe();
            this.scheduleService.createTask(taskCreationPayload[0]).subscribe((data: any) => {
                if(data.iscreated == 1){
                    this.messageService.add({ severity: 'success', summary: 'Task has been created successfully' });
                }
                this.getTasks(this.params,this.model.wfmConfigId);
                this.resetTask();
                this.spinnerService.hide();
            }, (error) => {
                console.log('error:', error.error.message);
                this.messageService.add({ severity: 'error', summary: error.error.message });
                this.spinnerService.hide();
            })
        } else {
            taskCreationPayload.push({ taskId: this.taskId });
            this.scheduleService.updateTask(taskCreationPayload).subscribe((data: any) => {
                if(data.isupdated == 1){
                    this.messageService.add({ severity: 'success', summary: 'Task has been updated successfully' });
                }
                this.getTasks(this.params,this.model.wfmConfigId);
                this.resetTask();
                this.spinnerService.hide();
            }, (error) => {
                console.log('error:', error.error.message);
                this.messageService.add({ severity: 'error', summary: error.error.message });
                this.spinnerService.hide();
            })
        }
    }

    resetTask(){
        this.resetDialogFlags();
        this.closeDialog();
        this.taskForm.reset();
        this.taskDurationHour = {value: '00'}
        this.taskDurationMinute = {value: '00'}
        this.isTaskSubmitted = false;
        this.selectedTaskCategory = null;
        this.isCategoryColorFormSubmitted = false;
        this.colorName = null;
    }

    // create new task category
    createNewTaskCategory() {
        this.isCategoryFormSubmitted = true
        if (this.taskCategoryForm.invalid) {
            // set focus on invalid controls
            for (const key of Object.keys(this.taskCategoryForm.controls)) {
                if (this.taskCategoryForm.controls[key].invalid) {
                    const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
                    invalidControl.focus();
                    break;
                }
            }
            return;
        }

        if(!this.selectedTaskCategory2){
            return
        }

        if(!this.selectedCategoryColor){
            return
        }

        (this.taskCategoryForm.get('isSchedulable').value) ? this.taskCategoryForm.get('isSchedulable').value : this.taskCategoryForm.get('isSchedulable').setValue(false);
        // (this.taskCategoryForm.get('isAdherenceRelated').value) ? this.taskCategoryForm.get('isAdherenceRelated').value : this.taskCategoryForm.get('isAdherenceRelated').setValue(false);

        // // assigning data for backend
        let dataForBackend = [{
            wfmConfigId: this.selectedConfig.wfmConfigId,
            ...this.taskCategoryForm.value,
            categoryName: this.selectedTaskCategory2.categoryName,
            categoryDescription: '',
            categoryColorCode: this.selectedCategoryColor.color,
            isAdherenceRelated: false,
            colorName: this.selectedCategoryColor.value
        }]
        // console.log('dataForBackend:', dataForBackend);
        this.spinnerService.show();
        this.scheduleService.createTaskCategory(dataForBackend[0]).subscribe((data: any) => {
            if(data.iscreated == 1){
                this.messageService.add({ severity: 'success', summary: 'Task Category has been created successfully' });
                this.isTaskCreatedSuccess = true;
                this.getTaskCategories(this.model.wfmConfigId);
            }
            this.showModalDialog('task');
            this.taskCategoryForm.reset();
            this.isCategoryFormSubmitted = false;
            // this.selectedCategoryColor = {}
            this.spinnerService.hide();
        }, (error) => {
            console.log('error:', error.error.message);
            this.messageService.add({ severity: 'error', summary: error.error.message });
            this.spinnerService.hide();
        })
    }

    // create new category color
    createNewCategoryColor() {
        this.isCategoryColorFormSubmitted = true;

        // if(!this.colorName){
        //     return;
        // }
        
        const taskDurationHoursToSeconds = (this.taskDurationHour) ? Math.floor(this.taskDurationHour.value * 60 * 60) : 0;
        const taskDurationMinutesToSeconds = (this.taskDurationMinute) ? Math.floor(this.taskDurationMinute.value * 60) : 0;
        const taskLength = Math.floor(taskDurationHoursToSeconds + taskDurationMinutesToSeconds);


        const {
            isAdherenceRelated,
            isSchedulable, 
            isAvailableInteraction,
            ...taskCreationFields
        } = this.taskForm.value;

        const {
            categoryId,
            categoryName,
            catagoryColorCode: categoryColorCode,
            // colorName,
            categoryDescription,
        } = this.selectedTaskCategory;

        const taskCreationPayload = {
            wfmConfigId: this.selectedConfig.wfmConfigId,
            ...taskCreationFields,
            categoryId,
            categoryName,
            colorCode: this.selectedCategoryColor,
            // colorName: this.colorName,
            taskLength,
            isAvailableInteraction,
        }

        const taskCategoryUpdatePayload = {
            wfmConfigId: this.selectedConfig.wfmConfigId,
            categoryName,
            categoryDescription,
            categoryId,
            categoryColorCode,
            // colorName,
            // isAdherenceRelated,
            isAvailableInteraction,
            // isSchedulable
        }

        this.spinnerService.show();
        this.scheduleService.updateTaskCategory(taskCategoryUpdatePayload).subscribe();
        this.scheduleService.createTask(taskCreationPayload).subscribe((data: any) => {
            if(data.iscreated == 1){
                this.messageService.add({ severity: 'success', summary: 'Task has been created successfully' });
            }
            this.getTasks(this.params,this.model.wfmConfigId);
            this.resetTask();
            this.spinnerService.hide();
        }, (error) => {
            console.log('error:', error.error.message);
            this.messageService.add({ severity: 'error', summary: error.error.message });
            this.spinnerService.hide();
        })
    }

    // Page load -get wfm config details
    getWfmConfigs() {
        this.forecastService.getWfmConfigId().subscribe((data: any) => {
            if (data.Items[0]) {
                this.wfmConfigs = data.Items;
                if (this.wfmConfigs.length) {
                    this.selectedConfig = this.wfmConfigs[0];
                    this.model.wfmConfigId = this.selectedConfig.wfmConfigId;
                    this.getTasks(this.params, this.model.wfmConfigId);
                    this.getTaskCategories(this.model.wfmConfigId);
                }
            } else {
                this.wfmConfigs = [];
                this.spinnerService.hide();
                this.messageService.add({ severity: 'error', summary: 'Wfm config is not available', detail: 'Please try again later' });
            }
        }, (error) => {
            console.log('error:', error.error.message);
            this.messageService.add({ severity: 'error', summary: 'Wfm config is not available', detail: 'Please try again later' });
            this.spinnerService.hide();
        })
    }

    getCategories() {
        this.categories = [
            { categoryName: 'category1', label: 'Category 1', color: '#ff0000' },
            { categoryName: 'category2', label: 'Category 2', color: '#0000ff' },
            { categoryName: 'category3', label: 'Category 3', color: '#008000' },
            { categoryName: 'category4', label: 'Category 4', color: '#ffff00' },
            { categoryName: 'category5', label: 'Category 5', color: '#800080' },
        ]
        this.getColors();
    }

    getColors() {
        this.colors = [
            { value: 'Red', label: 'Red', color: '#ff0000' },
            { value: 'Blue', label: 'Blue', color: '#0000ff' },
            { value: 'Green', label: 'Green', color: '#008000' },
            { value: 'Yellow', label: 'Yellow', color: '#ffff00' },
            { value: 'Purple', label: 'Purple', color: '#800080' },
        ]
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
    }

    // To perform the operations of generate, publish, view, edit & delete
    manageTask(task, mode) {
        this.taskId = task.taskId;
        this.taskName = task.taskName;
        let model = {taskId: this.taskId, wfmConfigId: this.model.wfmConfigId}
        this.resetDialogFlags();
        if (mode == 'view') {
            this.task = task;
            this.isViewDetail = true;
            this.showDialog();
            // this.getTaskDetail(model);
        }
        if (mode == 'edit') {
            this.isAddNewTaskEnabled = false;
            this.isUpdateTaskEnabled = true;
            this.taskDurationHours = this.serviceLevelService.hourOptions;
            this.taskDurationMinutes = this.serviceLevelService.timeOptions;
            this.getTaskDetail(model);
            // this.route.navigate(['/wfm/schedule/tasks/edit/' + this.taskId]);
        }
        if (mode == 'delete') {
            this.isDeleteConfirm = true;
            this.showDialog();
        }
    }

    manageSelectedTasks(mode) {
        if (mode == 'delete') {
            this.isViewDetail = false;
            this.isAddNewTaskEnabled = false;
            this.isDeleteConfirm = false;
            this.isDeleteAllConfirm = true;
            this.showDialog();
        }
    }

    deleteRecord() {
        let model = {taskId: this.taskId, wfmConfigId: this.model.wfmConfigId}
        this.spinnerService.show();
        this.scheduleService.deleteTask(model).subscribe((data: any) => {
            this.spinnerService.hide();
            this.messageService.add({ severity: 'success', summary: this.taskName + ' has been deleted successfully!' });
            this.closeDialog();
            this.getTasks(this.params, this.model.wfmConfigId);
        }, (error) => {
            console.log(error.error.message);
            this.messageService.add({ severity: 'error', summary: 'Please try again later' });
            this.spinnerService.hide();
        })
    }

    deleteAllRecords() {
        this.spinnerService.show();
        this.selectedTasks.forEach(element => {
            let model = {taskId: element.taskId, wfmConfigId: element.wfmConfigId}
            this.scheduleService.deleteTask(model).subscribe((data: any) => {
                this.selectedTasks = this.selectedTasks.filter(({ taskId }) => taskId !== element.taskId);
                if (!this.selectedTasks.length) {
                    this.spinnerService.hide();
                    this.messageService.add({ severity: 'success', summary: 'Selected records has been deleted successfully!' });
                    this.closeDialog();
                    this.getTasks(this.params, this.model.wfmConfigId);
                }
            }, (error) => {
                console.log(error.error.message);
                this.messageService.add({ severity: 'error', summary: 'Please try again later' });
                this.spinnerService.hide();
            })
        })
    }
    
    getTaskDetail(params) {
        this.spinnerService.show();
        this.scheduleService.getTask(params).subscribe((data: any) => {
            if (data[0]) {
                this.task = data[0] // store the response data to taskData variable
                if(this.isUpdateTaskEnabled){
                    this.taskForm.patchValue(this.task);

                    // console.log('edit task duration:', this.task.taskLength);

                    // bind hours and minutes for task duration
                    // let hm = this.scheduleService.timeConvert(this.task.taskLength)
                    let hm = this.serviceLevelService.secondsToHms(this.task.taskLength)
                    // console.log('edit hms:', hm);
                    
                    let time = hm.split(':'); // split hours and minutes
                    // console.log('edit time:', time);

                    this.taskDurationHour = (time[0] !== '0') ? {value: time[0]} : {value: '00'}; // bind hours
                    // console.log('edit taskDurationHour:', this.taskDurationHour);

                    this.taskDurationMinute = (time[1] !== '0') ? {value: time[1]} : {value:'00'}; // bind minutes
                    // console.log('edit taskDurationMinute:', this.taskDurationMinute);

                    this.selectedTaskCategory = {
                        categoryName: this.task.categoryName, 
                        categoryId: this.task.categoryId,
                        catagoryColorCode: this.task.colorCode,
                        colorName: this.task.colorName,
                    }
                    this.showDialog();
                }
                // if(this.isViewDetail){
                //     this.showDialog();
                // }
                this.spinnerService.hide();
            } else {
                this.messageService.add({ severity: 'error', summary: 'Please try again later' });
            }
        }, (error) => {
            console.log('error:', error.error);
            this.spinnerService.hide();
        })
    }

    // advance filter search
    applySearch() {
        // let divisions:any = []
        // let workgroups:any = []
        // if(this.selectedDivisions){
        //     this.selectedDivisions.map(element => {
        //         divisions.push(element.divisionName)
        //     })
        // }
        // if(this.selectedWorkgroups){
        //     this.selectedWorkgroups.map(element => {
        //         workgroups.push(element.workgroupName)
        //     })
        // }
        // this.params.divisionName = divisions;
        // this.params.workgroupName = workgroups;
        this.panel.hide();
        this.getTasks(this.params, this.model.wfmConfigId)
    }

    // To clear the inputs of filters in datatable
    clearFilters(dt) {
        dt.reset();
        $('input:text').val('');
        this.resetParams();
        this.getTasks(this.params, this.model.wfmConfigId);
        this.panel.hide();
    }

    public paginate(paginationData): void {
        this.currentPage = paginationData.page + 1;
        this.params.pageNo = this.currentPage;
        this.params.pageSize = paginationData.rows;
        this.first = paginationData.first + 1;
        this.firstPage = paginationData.first;
        this.getTasks(this.params, this.model.wfmConfigId);
    }

    resetParams() {
        this.params = {
            pageNo:1,
            pageSize:10,
            globalText:"",
            orderBy:"desc",
            orderColumn:"task_id",
            taskName:"",
            taskDescription:"",
            taskLength:0,
            isPaid: false,
            colorCode:"",
            colorName:"",
            categoryId:0,
            categoryName:"",
            updateDate:"",
            updateBy:""
        }
    }

    resetDialogFlags() {
        this.isViewDetail = false;
        this.isDeleteConfirm = false;
        this.isDeleteAllConfirm = false;
        this.isAddNewTaskEnabled = false;
        this.isUpdateTaskEnabled = false;
        this.isAddNewCategoryEnabled = false;
        this.isAddNewCategoryColorEnabled = false;
    }

    hideCustomDropdown(mode){
        if($('#category_listbox').css('display') === 'block'){
            $('#category_listbox').removeClass('active-input-box');
            $('#category_listbox').css('display','none');
            this.isCategoryListEnabled = false;
        }
        if(mode == "taskCategory" || mode == undefined){
            if($('#task_category_listbox').css('display') === 'block'){
                $('#task_category_listbox').removeClass('active-input-box');
                $('#task_category_listbox').css('display','none');
                this.isTaskCategoryListEnabled = false;
            }
        }
        if(mode == "categoryColor" || mode == undefined){
            if($('#category_color_listbox').css('display') === 'block'){
                $('#category_color_listbox').removeClass('active-input-box');
                $('#category_color_listbox').css('display','none');
                this.isCategoryColorListEnabled = false;
            }
        }
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