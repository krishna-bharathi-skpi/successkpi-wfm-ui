import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
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
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { serviceLevelService } from '../../../service-levels/serviceLevel.service';
import * as moment from 'moment';
import { element } from 'protractor';

@Component({
    selector: 'app-organize-tasks',
    templateUrl: './organize-tasks.component.html',
    styleUrls: ['./organize-tasks.component.css'],
    providers: [MessageService]
})

export class OrganizeTasksComponent implements OnInit {

    @ViewChild('dt') table: Table; // to perform all the operations of datatable
    @ViewChild('p', { static: false }) paginator?: Paginator; // To reset the paginator

    wfmConfigs: any = [];
    selectedConfig: any = [];
    
    shift:any = [];
    days:any = [];

    tasks: any = []; // to fetch the tasks list
    task: any; // to show specific details of task 
    selectedTasks: any = [];
    isLoading: boolean = true; // to show/hide the message - no records found

    workgroups: any = []; // to fetch the workgroup list
    workgroup: any; // to show specific details of workgrouping 
    selectedWorkgroups: any = []; // to delete multiple items in a datatable

    workplanData: any = [];
    workplanId = ''; 
    workplanName = ''; 

    //edit mode
    continueToAddInWorkplanId!: any; // to get the specific workplan detail
    isContinueToAddInWorkplan!: boolean;

    display: boolean = false; // confirm dialog - show/hide

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
    taskParams = {
        pageNo: 1,
        pageSize: 1000,
        globalText: "",
        orderBy: "desc",
        orderColumn: "task_id",
        taskName: "",
        taskDescription: "",
        taskLength: 0,
        isPaid: false,
        colorCode: "",
        colorName:"",
        categoryId: 0,
        categoryName:"",
        updateDate: "",
        updateBy: ""
    }
    taskSortOrder: number = -1; // to initiate sort order as desc during page load

    // server side actions - searching, sorting
    workgroupParams = {
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
    workgroupSortOrder: number = -1; // to initiate sort order as desc during page load

    model = {
        wfmConfigId: null,
        tab: "tabular" // for filtering the agent types 
    }

    sidebarTasks: any = [];

    // To validate a form
    isShiftSubmitted: boolean = false;
    shiftForm: FormGroup;
    shift_description = ''; // to show the task description count to user

    shiftStartHours:any; // contains hours
    shiftStartHour:any; // ngModel
    shiftStartMinutes:any; // contains minutes
    shiftStartMinute:any; // ngModel

    shiftDurationHours:any; // contains hours
    shiftDurationHour:any; // ngModel
    shiftDurationMinutes:any; // contains minutes
    shiftDurationMinute:any; // ngModel

    isValidStartTimeandTaskDuration: boolean = true;
    shiftEndTime:any; // to display shift endtime in create shift dialog

    timeModes = [
        {value: 'AM'},
        {value: 'PM'}
    ];
    timeMode: any = {value: 'AM'};
    isShiftAddMode: boolean = true;
    confirmDeleteShift: boolean = false;
    shiftData:any = [];
    shiftDataOfEdit: any = [];

    constructor(
        private formBuilder: FormBuilder,
        public global: GlobalComponent,
        private route: ActivatedRoute,
        private router: Router,
        private commonMethods: CommonMethods,
        private scheduleService: ScheduleService,
        private spinnerService: NgxSpinnerService,
        private messageService: MessageService,
        private datePipe: DatePipe,
        private forecastService: ForecastService,
        private el: ElementRef,
        private serviceLevelService: serviceLevelService
    ) {
        this.commonMethods.dynamicBackgroundColorChange('white');
        this.continueToAddInWorkplanId = this.route.snapshot.params['workplanId'];
        this.isContinueToAddInWorkplan = this.route.snapshot.params['workplanId'];
        this.workplanName = localStorage.getItem('workplanName');

        this.shiftForm = this.formBuilder.group({
            shiftName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9-_ ]*$')]],
            shiftDescription: [null, [Validators.maxLength(400), Validators.pattern('^[a-zA-Z0-9-_,. ]*$')]],
            // startTime: ['', [Validators.required]],
            // shiftLength: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.scheduleService.alignWfmContainer();
        this.spinnerService.show();
        this.getWfmConfigs();
        this.getDays();
        this.initiateShiftHoursMinutes();
    }

    initiateShiftHoursMinutes(){
        this.shiftDurationHours = this.serviceLevelService.hourOptions;
        this.shiftDurationMinutes = this.serviceLevelService.timeOptions;

        this.shiftStartHours = this.serviceLevelService.TwelvehourOptions;
        this.shiftStartMinutes = this.serviceLevelService.timeOptions;
    }

    onChangeTab(mode){
        this.model.tab = mode;
    }

    getShifts(){
        let shift_params = {
            pageNo:1,
            pageSize:100,
            globalText:"",
            orderBy:"asc",
            orderColumn:"shift_id",
            shiftName:"",
            shiftDescription:"",
            shiftLength:0,
            workplanId: this.continueToAddInWorkplanId,
            absoluteStartTime:"",
            absoluteEndTime:"",
            shiftDayOfWeek:[0],
            updateDate:"",
            updateBy:""
        }
        if (this.model.wfmConfigId) {
            let params = {wfmConfigId: this.model.wfmConfigId, workplanId: this.continueToAddInWorkplanId}
            this.scheduleService.getShiftsList(shift_params, params).subscribe((data: any) => {
                if (data) {
                    this.shiftData = data;
                    this.shift = data;
                    this.model.wfmConfigId = this.shift.wfmConfigId;

                    this.shift.shifts.forEach(element => {
                        if(element.days){
                            // console.log('element:', element);
                            
                            // assign the days as selected according to specific shift detail
                            element['custDays'] = [
                                { value: 'MON', label: 'M', selected: false },
                                { value: 'TUE', label: 'T', selected: false },
                                { value: 'WED', label: 'W', selected: false },
                                { value: 'THU', label: 'T', selected: false },
                                { value: 'FRI', label: 'F', selected: false },
                                { value: 'SAT', label: 'S', selected: false },
                                { value: 'SUN', label: 'S', selected: false },
                            ]

                            // assign the days as selected according to specific shift detail
                            let custDay = null;
                            Object.keys(element.days).forEach(day => {
                                element.custDays.filter(x => {
                                    if(x.value == day){
                                        x.selected = true;
                                        custDay = element.days[day]
                                    }
                                })
                            })

                            // element['startTime'] = this.scheduleService.convertTime24to12(custDay.absoluteStartTime);
                            // element['endTime'] = this.scheduleService.convertTime24to12(custDay.absoluteEndTime);
                            element['startTime'] = moment(custDay.absoluteStartTime, ["HH.mm"]).format("h:mm a")
                            element['endTime'] = moment(custDay.absoluteEndTime, ["HH.mm"]).format("h:mm a")
                        }
                    });
                }
                // this.spinnerService.hide();
            }, (error) => {
                console.log(error);
                this.spinnerService.hide();
            })
        }

        // this.shifts = [
        //     { shiftName: 'Early Morning' },
        //     { shiftName: 'Afternoon' },
        // ]

        // this.getTasks(this.taskParams, this.model.wfmConfigId);
    }

    onChangeTime(){
        
        // this.validateStartTimeandTaskDuration();
        // if(this.isValidStartTimeandTaskDuration){
            
            let shiftDurationHoursToMinutes = (this.shiftDurationHour) ? Math.floor(this.shiftDurationHour.value * 60) : 0;
            let shiftDurationMinutes = (this.shiftDurationMinute) ? Math.floor(this.shiftDurationMinute.value) : 0;

            // concatenating hours and minutes using colon. Format - 12:00
            let shiftStartTime = this.shiftStartHour.value + ':' + this.shiftStartMinute.value;

            // converting 12 hour format to 24 format to save in backend
            shiftStartTime = moment(shiftStartTime +  ' ' + this.timeMode.value, ["h:mm A"]).format("HH:mm");
            let shiftDuration = Math.floor(shiftDurationHoursToMinutes + shiftDurationMinutes);;

            if(shiftStartTime && shiftDuration){
                // converting 24 hour format to 12 format to display shift end time in UI
                this.shiftEndTime = moment(shiftStartTime, 'HHmm ' + this.timeMode.value).add(shiftDuration, 'minute').format('h:mm A');
            }
        // }
    }

    getSidebarTasksList(){
        this.sidebarTasks = [
            {
                category: 'Break',
                tasks: [
                    {id: 1, name: 'Coffee Break', colorCode: 'rgb(0, 255, 0)'},
                    {id: 2, name: 'Lunch Break', colorCode: 'rgb(0, 0, 0)'},
                    {id: 3, name: 'Tea Break', colorCode: 'rgb(255, 0, 0)'}
                ]
            },{
                category: 'Training',
                tasks: [
                    {id: 1, name: 'Training 1', colorCode: 'rgb(0, 255, 0)'},
                    {id: 2, name: 'Training 2', colorCode: 'rgb(0, 0, 0)'},
                ]
            }
        ]
    }

    getDays(){
        this.days = [
            { value: 'MON', label: 'M', selected: true },
            { value: 'TUE', label: 'T', selected: true },
            { value: 'WED', label: 'W', selected: true },
            { value: 'THU', label: 'T', selected: true },
            { value: 'FRI', label: 'F', selected: true },
            { value: 'SAT', label: 'S', selected: false },
            { value: 'SUN', label: 'S', selected: false },
        ]
    }

    selectDay(day){
        if(day.selected == true){
            day.selected = false;
        }else{
            day.selected = true;
        }
    }

    getTasks(params, wfmConfigId) {
        this.loading = true;
        if (wfmConfigId) {
            this.scheduleService.getTasksList(params, wfmConfigId).subscribe((data: any) => {
                // console.log('tasks list:', data);
                if (data) {
                    // this.tasks = data.items;
                    // let sidebarCategories = this.unique(data.items, ['categoryName']);
                    let sidebarCategories = data.items.filter((a, i) => data.items.findIndex((s) => a.categoryName == s.categoryName) === i)

                    let sidebarTasks:any = [];
                    sidebarCategories.forEach(category => {
                        sidebarTasks = data.items.filter(task => task.categoryName == category.categoryName)
                        this.sidebarTasks.push({
                            category: category.categoryName,
                            tasks: sidebarTasks
                        })
                    });
                    
                    // convert task timing - seconds to hours and minutes to display in grid
                    this.tasks.forEach(element => {
                        let hms = this.serviceLevelService.secondsToHms(element.taskLength) // for service level
                        let time = hms.split(':'); // split hours, minutes and seconds
                        element.taskLength = time[0] + ':' + time[1]; // concatenate hours, minutes and seconds
                    })
                    // this.shifts.forEach(element => {
                    //     element["tasks"] = data.items
                    //     element["selectedTasks"] = [];
                    // });
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
                // this.spinnerService.hide();
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
            event.sortOrder = this.taskSortOrder;
            this.taskSortOrder = null;
        }
        let orderByType = (event.sortOrder == 1) ? 'asc' : 'desc'
        this.taskParams.pageNo = 1;
        this.taskParams.orderBy = orderByType;

        // sorting
        if (event.sortField != undefined) {
            // this.params.orderColumn = event.sortField;
            this.taskParams.orderColumn = event.sortField.split(/(?=[A-Z])/).join('_').toLowerCase();
        }
        
        this.taskParams.globalText = (event.globalFilter) ? event.filters.global.value : '' // Global search
        this.taskParams.taskName = (event.filters.taskName) ? event.filters.taskName.value : '' // Searching for task name
        this.taskParams.taskLength = (event.filters.taskLength) ? event.filters.taskLength.value : 0 // Searching for task length
        this.taskParams.updateDate = (event.filters.updatedTimestamp) ? event.filters.updatedTimestamp.value : '' // Searching for updated date
        this.taskParams.updateBy = (event.filters.updatedBy) ? event.filters.updatedBy.value : '' // Searching for updated by
        
        this.getTasks(this.taskParams, this.model.wfmConfigId)
        setTimeout(() => {
            this.paginator?.changePage(this.taskParams.pageNo - 1);
        });
    }

    addTaskToShift(task){
        this.tasks.push(task)
    }

    enableShift(shift){
        console.log('enable shift:', shift);
        
    }
    
    // To fetch the workgroup list data
    getworkgroups(params, wfmConfigId) {
        this.loading = true;
        if (wfmConfigId) {
            this.scheduleService.getWorkgroupList(params, wfmConfigId).subscribe((data: any) => {
                // console.log('workgroup list:', data);
                if (data) {
                    this.workgroups = data.items;
                    // this.shifts.forEach(element => {
                    //     element["workgroups"] = data.items
                    //     element["selectedWorkgroups"] = []
                    // });
                    this.isLoading = false;
                    this.totalRecords = data.totalCount // To get total records count
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
                this.spinnerService.hide();
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
            event.sortOrder = this.workgroupSortOrder;
            this.workgroupSortOrder = null;
        }
        let orderByType = (event.sortOrder == 1) ? 'asc' : 'desc'
        this.workgroupParams.pageNo = 1;
        this.workgroupParams.orderBy = orderByType;

        // sorting
        if (event.sortField != undefined) {
            this.workgroupParams.orderColumn = event.sortField;
            // this.params.orderColumn = event.sortField.split(/(?=[A-Z])/).join('_').toLowerCase();
        }
        
        this.workgroupParams.globalText = (event.globalFilter) ? event.filters.global.value : '' // Global search
        this.workgroupParams.workgroupName = (event.filters.workgroupName) ? event.filters.workgroupName.value : '' // Searching for workgroup name
        this.workgroupParams.adherThreshold = (event.filters.severeAdherenceThreshold) ? event.filters.severeAdherenceThreshold.value : 0 // Searching for severe adherence threshold
        this.workgroupParams.adherTarget = (event.filters.adherenceTarget) ? event.filters.adherenceTarget.value : 0 // Searching for adherence target
        this.workgroupParams.excepThreshold = (event.filters.adherenceExceptionThreshold) ? event.filters.adherenceExceptionThreshold.value : 0 // Searching for adherence exception threshold
        this.workgroupParams.updateDate = (event.filters.updatedTimestamp) ? event.filters.updatedTimestamp.value : '' // Searching for updated date
        this.workgroupParams.updateBy = (event.filters.updatedBy) ? event.filters.updatedBy.value : '' // Searching for updated by
       
        // this.getworkgroups(this.workgroupParams, this.model.wfmConfigId)
        setTimeout(() => {
            this.paginator?.changePage(this.workgroupParams.pageNo - 1);
        });
        this.getworkgroups(this.workgroupParams, this.model.wfmConfigId)
    }

    public paginate(paginationData): void {
        this.currentPage = paginationData.page + 1;
        this.workgroupParams.pageNo = this.currentPage;
        this.workgroupParams.pageSize = paginationData.rows;
        this.first = paginationData.first + 1;
        this.firstPage = paginationData.first;
        this.getworkgroups(this.workgroupParams,this.model.wfmConfigId);
    }

    // Page load -get wfm config details
    getWfmConfigs() {
        this.forecastService.getWfmConfigId().subscribe((data: any) => {
            if (data.Items[0]) {
                this.wfmConfigs = data.Items;
                if (this.wfmConfigs.length) {
                    this.selectedConfig = this.wfmConfigs[0];
                    this.model.wfmConfigId = this.selectedConfig.wfmConfigId;
                    this.getShifts();
                    this.getTasks(this.taskParams, this.model.wfmConfigId);
                    this.getworkgroups(this.workgroupParams, this.model.wfmConfigId);
                    // this.getWorkplanDetail();
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

    getWorkplanDetail() {
        this.spinnerService.show();
        let model = {wfmConfigId: this.model.wfmConfigId, workplanId: this.continueToAddInWorkplanId}
        this.scheduleService.getWorkplan(model).subscribe((data: any) => {
          if (data[0]) {
            this.workplanData = data[0] // store the response data to forecastData variable
            this.workplanName = this.workplanData.workplanName;
            this.selectedConfig = {
              wfmConfigId: this.workplanData.wfmConfigId,
              configId: this.workplanData.configId
            }
            this.getShifts();
          }
        }, (error) => {
          console.log('error:', error.error);
          this.messageService.add({ severity: 'error', summary: 'Workplan details are not available', detail: 'Please try again later' });
          this.spinnerService.hide();
        })
    }

    showShiftModalDialog(){
        this.confirmDeleteShift = false;
        this.isShiftAddMode = true;
        this.isShiftSubmitted = false;
        this.resetShiftFields();
        this.showDialog();
    }

    addShift(){

        // checking form is valid
        this.isShiftSubmitted = true;
        if (this.shiftForm.invalid) {
        // set focus on invalid controls
        for (const key of Object.keys(this.shiftForm.controls)) {
            if (this.shiftForm.controls[key].invalid) {
            const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            invalidControl.focus();
            break;
            }
        }
        return;
        }

        // validate shift start time - hours/minutes
        if (!this.shiftStartHour && !this.shiftStartMinute) {
            return;
        }

        if(this.shiftStartHour && !this.shiftStartMinute){
            this.shiftStartMinute = {value: '00'}
        }else if(!this.shiftStartHour && this.shiftStartMinute){
            this.shiftStartHour = {value: '00'}
        }

        if(this.shiftStartHour && this.shiftStartMinute){
            if (this.shiftStartHour.value == '00' && this.shiftStartMinute.value == '00' && this.timeMode.value == 'PM') {
                this.messageService.add({ severity:'error', summary: 'Please select valid start time of shift', detail:'Both Hours and Minutes will not be zero' });
                return;
            }
        }

        if(this.shiftStartHour && this.shiftStartMinute ){
            if (!this.timeMode) {
                return;
            }
        }

        // validate task duration - hours/minutes
        if (!this.shiftDurationHour && !this.shiftDurationMinute) {
            return;
        }

        if(this.shiftDurationHour && !this.shiftDurationMinute){
            this.shiftDurationMinute = {value: '00'}
        }else if(!this.shiftDurationHour && this.shiftDurationMinute){
            this.shiftDurationHour = {value: '00'}
        }

        if(this.shiftDurationHour && this.shiftDurationMinute){
            if (this.shiftDurationHour.value == '00' && this.shiftDurationMinute.value == '00') {
                this.messageService.add({ severity:'error', summary: 'Please select valid time of duration', detail:'Both Hours and Minutes will not be zero' });
                return;
            }
        }

        let shiftDurationHoursToMinutes = (this.shiftDurationHour) ? Math.floor(this.shiftDurationHour.value * 60) : 0;
        let shiftDurationMinutes = (this.shiftDurationMinute) ? Math.floor(this.shiftDurationMinute.value) : 0;
        let shiftDurationTotalMinutes = Math.floor(shiftDurationHoursToMinutes + shiftDurationMinutes);

        let selected_days = []
        this.days.map(item => {
            if(item.selected){
                selected_days.push(item.value)
            }
        })

        if(!selected_days.length){
            this.messageService.add({ severity:'error', summary: 'Please select atleast one day to create a Shift' });
            return;
        }

        // To check whether the days are already selected for another shift
        let isDaysAssignedToAnotherShift = [];
        this.shift.shifts.forEach(element => {
            if(this.isShiftAddMode){
                if(element.days){
                    Object.keys(element.days).forEach(day => {
                        selected_days.filter(currentSelectedDay => { 
                            if(currentSelectedDay == day){
                                isDaysAssignedToAnotherShift.push(currentSelectedDay)
                            }
                        });
                    })
                }
            }else{
                // checking array of all shifts except current one for update mode
                if(element.shiftProfileId !== this.shiftDataOfEdit.shiftProfileId){
                    if(element.days){
                        Object.keys(element.days).forEach(day => {
                            selected_days.filter(currentSelectedDay => { 
                                if(currentSelectedDay == day){
                                    isDaysAssignedToAnotherShift.push(currentSelectedDay)
                                }
                            });
                        })
                    }
                }
            }
        });
        if(isDaysAssignedToAnotherShift.length){
            let errorMsg = (isDaysAssignedToAnotherShift.length > 1) ? isDaysAssignedToAnotherShift.join(', ') + ' are already selected for another shift' : isDaysAssignedToAnotherShift.join(', ') + ' is already selected for another shift'; 
            this.messageService.add({severity:'error', summary: errorMsg});
            return;
        }
        
        let shiftStartTime = this.shiftStartHour.value + this.shiftStartMinute.value
        shiftStartTime = moment(shiftStartTime +  ' ' + this.timeMode.value, ["h:mm A"]).format("HHmm");

        let shiftEndTime = moment(this.shiftEndTime +  ' ' + this.timeMode.value, ["h:mm A"]).format("HHmm");
        
        let dataForBackend = [];
        // // assigning data for backend
        if(this.isShiftAddMode){
            dataForBackend = [{
                ...this.shiftForm.value,
                wfmConfigId: this.selectedConfig.wfmConfigId,
                workplanId: this.continueToAddInWorkplanId,
                absoluteStartTime: shiftStartTime,
                shiftLength: shiftDurationTotalMinutes,
                absoluteEndTime: shiftEndTime,
                shiftDayofWeek: selected_days
            }]
            // console.log('dataForBackend:', dataForBackend);
            this.spinnerService.show();
            this.scheduleService.createShift(dataForBackend[0]).subscribe((data: any) => {
                this.messageService.add({ severity: 'success', summary: 'Shift has been created successfully' });
                this.getShifts();
                this.resetShiftFields();
                this.spinnerService.hide();
            }, (error) => {
                this.resetShiftFields();
                console.log('error:', error.error.message);
                this.messageService.add({ severity: 'error', summary: error.error.message });
                this.spinnerService.hide();
            })
        }else{
            let shiftData = this.shift;
            let shiftDays = this.shift.shifts[0].days;
            let revised_days = {};
            selected_days.forEach(element => {
                let shiftDayIdObj = {};
                Object.keys(shiftDays).filter(day => {
                    if(element == day){
                        shiftDayIdObj = {
                            shiftdayid: shiftDays[day].shiftDayId
                        }
                    }
                    revised_days = {...revised_days,
                        ...{
                            [element]:{
                                ...shiftDayIdObj,
                                absolute_start_time: shiftStartTime,
                                shift_length: shiftDurationTotalMinutes,
                                absolute_end_time: shiftEndTime
                            }
                        }
                    }
                })
            })
            dataForBackend = [{
                ...this.shiftForm.value,
                workplanId: this.continueToAddInWorkplanId,
                shifts: [{
                    shiftProfileId: shiftData.shifts[0].shiftProfileId,
                    days: revised_days
                }]
            }]
            
            // console.log('dataForBackend:', dataForBackend);
            this.spinnerService.show();
            let model = {shiftProfileId: shiftData.shifts[0].shiftProfileId, wfmConfigId: this.shiftData.wfmConfigId}
            this.scheduleService.updateShift(dataForBackend, model).subscribe((data: any) => {
                this.messageService.add({ severity: 'success', summary: 'Shift has been updated successfully' });
                this.getShifts();
                this.resetShiftFields();
                this.spinnerService.hide();
            }, (error) => {
                this.resetShiftFields();
                console.log('error:', error.error.message);
                this.messageService.add({ severity: 'error', summary: error.error.message });
                this.spinnerService.hide();
            })
        }
        
    }

    validateStartTimeandTaskDuration(){
        this.isValidStartTimeandTaskDuration = true;
         // validate shift start time - hours/minutes
         if (!this.shiftStartHour && !this.shiftStartMinute) {
            this.isValidStartTimeandTaskDuration = false;
            return;
        }

        if(this.shiftStartHour && !this.shiftStartMinute){
            this.shiftStartMinute = {value: '00'}
        }else if(!this.shiftStartHour && this.shiftStartMinute){
            this.shiftStartHour = {value: '00'}
        }

        if(this.shiftStartHour && this.shiftStartMinute){
            if (this.shiftStartHour.value == '00' && this.shiftStartMinute.value == '00') {
                this.messageService.add({ severity:'error', summary: 'Please select valid start time', detail:'Both Hours and Minutes will not be zero' });
                this.isValidStartTimeandTaskDuration = false;
                return;
            }
        }

        // validate task duration - hours/minutes
        if (!this.shiftDurationHour && !this.shiftDurationMinute) {
            this.isValidStartTimeandTaskDuration = false;
            return;
        }

        if(this.shiftDurationHour && !this.shiftDurationMinute){
            this.shiftDurationMinute = {value: '00'}
        }else if(!this.shiftDurationHour && this.shiftDurationMinute){
            this.shiftDurationHour = {value: '00'}
        }

        if(this.shiftDurationHour && this.shiftDurationMinute){
            if (this.shiftDurationHour.value == '00' && this.shiftDurationMinute.value == '00') {
                this.messageService.add({ severity:'error', summary: 'Please select valid time for duration', detail:'Both Hours and Minutes will not be zero' });
                this.isValidStartTimeandTaskDuration = false;
                return;
            }
        }
    }

    resetShiftFields(){
        this.getDays();
        this.shiftForm.reset();
        this.shiftStartHour = {value: '00'}
        this.shiftStartMinute = {value: '00'}
        this.shiftDurationHour = {value: '00'}
        this.shiftDurationMinute = {value: '00'}
        this.shiftEndTime = "";
        this.isShiftSubmitted = false;
        this.closeDialog();
    }

    getShiftDetail(shift){
        this.shiftDataOfEdit = shift;
        // console.log('shift detail:', shift);
        // console.log('shift details:', this.shiftData);
        this.isShiftAddMode = false;
        this.selectedConfig = {
          wfmConfigId: shift.wfmConfigId,
          configId: shift.configId
        }
        this.model.wfmConfigId = shift.wfmConfigId;
        this.shiftForm.patchValue(shift) // bind the response data to shift form
        
        // bind start time to dropdown
        let day = null;
        if(shift.days.MON){
            day = shift.days.MON
        }else if(shift.days.TUE){
            day = shift.days.TUE
        }else if(shift.days.WED){
            day = shift.days.WED
        }else if(shift.days.THU){
            day = shift.days.THU
        }else if(shift.days.FRI){
            day = shift.days.FRI
        }else if(shift.days.SAT){
            day = shift.days.SAT
        }else if(shift.days.SUN){
            day = shift.days.SUN
        }

        // set all the days as unselected for edit shift mode
        this.days = [
            { value: 'MON', label: 'M', selected: false },
            { value: 'TUE', label: 'T', selected: false },
            { value: 'WED', label: 'W', selected: false },
            { value: 'THU', label: 'T', selected: false },
            { value: 'FRI', label: 'F', selected: false },
            { value: 'SAT', label: 'S', selected: false },
            { value: 'SUN', label: 'S', selected: false },
        ]

        // assign the days as selected according to specific shift detail
        Object.keys(shift.days).forEach(day => {
            this.days.filter(x => {
                if(x.value == day){
                    x.selected = true;
                }
            })
        })
        
        // let startTime = day.absoluteStartTime.split(':');
        let startTime = moment(day.absoluteStartTime, ["HH.mm"]).format("hh:mm").split(':');
        this.shiftStartHour = {value: startTime[0]};
        this.shiftStartMinute = {value: startTime[1]};

        // bind shift duration to dropdown
        // let shiftLength = this.scheduleService.timeConvert(day.shiftLength);
        let shiftHour = (Math.floor(day.shiftLength / 60));
        let shiftHours = (('' + shiftHour).length == 1) ? '0' + shiftHour : shiftHour;
        this.shiftDurationHour = {value: shiftHours};

        let shiftMinute = (day.shiftLength % 60);
        let shiftMinutes = (('' + shiftMinute).length == 1) ? '0' + shiftMinute : shiftMinute;
        this.shiftDurationMinute = {value: shiftMinutes};

        // convert secs to minutes
        // const shiftDurationMinutes = Math.floor( day.shiftLength / 60 ); 
        
        // display shift end time 
        this.shiftEndTime = moment(startTime[0] + ':' + startTime[1], 'HHmm ' + this.timeMode.value).add(day.shiftLength, 'minute').format('h:mm A');
        
        this.showDialog();
    }

    confirmShiftDelete(shift){
        this.shift = shift;
        // console.log('this shift:', this.shift);
        this.confirmDeleteShift = true;
        this.showDialog();
    }

    cancelDeleteShift(){
        this.confirmDeleteShift = false;
        this.closeDialog();
    }

    deleteShift(){
        this.spinnerService.show();
        let deleteParams = {
            wfmConfigId: this.shiftData.wfmConfigId,
            workplanId: this.continueToAddInWorkplanId,
            shiftProfileId: this.shift.shiftProfileId
        } 
        this.scheduleService.deleteShift(deleteParams).subscribe((data: any) => {
            // this.commonMethods.addToastforlongtime(true, data.message);
            this.spinnerService.hide();
            this.messageService.add({ severity: 'success', summary: 'Shift has been deleted successfully!' });
            this.confirmDeleteShift = false;
            this.closeDialog();
            this.getShifts();
        }, (error) => {
            console.log(error.error.message);
            this.messageService.add({ severity: 'error', summary: 'Please try again later' });
            this.spinnerService.hide();
        })
    }

    // Show message to user in dialog
    showDialog() {
        this.display = true;
    }

    // Hide the dialog
    closeDialog() {
        this.display = false;
    }

    saveWorkplan(){
        let backendData = {
            customerId:"",
            wfmConfigId:"",
            shiftProfileId:"",
                shiftDayId: [101,102,103,104,105],
                taskList: [
                {
                    taskId:"",
                    taskEarliestRelativeStartTime:"",
                    taskLatestRelativeStartTime:"",
                    windowStartTime:"",
                    windowEndTime:""
                },
                {
                    taskId:"",
                    taskEarliestRelativeStartTime:"",
                    taskLatestRelativeStartTime:"",
                    windowStartTime:"",
                    windowEndTime:""
                },
                {
                    taskId:"",
                    taskEarliestRelativeStartTime:"",
                    taskLatestRelativeStartTime:"",
                    windowStartTime:"",
                    windowEndTime:""
                }
            ]
        }
    }

}