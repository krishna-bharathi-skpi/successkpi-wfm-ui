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
import { HttpClient } from '@angular/common/http';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
    selector: 'app-agents-list',
    templateUrl: './agents-list.component.html',
    styleUrls: ['./agents-list.component.css'],
    providers: [MessageService]
})

export class AgentsListComponent implements OnInit {

    @ViewChild('dt') table: Table; // to perform all the operations of datatable
    // @ViewChild('p', { static: false }) paginator?: Paginator; // To reset the paginator
    @ViewChild('opFilter', {static:true}) panel: OverlayPanel;

    workgroupAgents: any = []; // to fetch the workgroupAgents list
    workgroupAgent: any; // to show specific details of workgroupAgent 
    isLoading: boolean = true; // to show/hide the message - no records found
    selectedWorkgroupAgents: any = []; // to delete multiple items in a datatable
    wfmConfigs: any = [];
    selectedConfig: any = []; 
    wfmConfigId: string;

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
        orderBy: "asc",
        orderColumn: "agentName",
        agentName: "",
        divisionName: "",
        workgroupName: "",
        email: "",
        queueName: "",
        state:"",
        updateDate: "",
        updateBy: ""
    }
    sortOrder: number = 1; // to initiate sort order as desc during page load

    model = {
        wfmConfigId: null,
        workgroupId: null,
        agentType: "unassigned" // for filtering the agent types 
    }

    display: boolean = false; // confirm dialog - show/hide
    isViewDetail: boolean = false; // dialog to show/hide the details of specific workgroupAgent
    isDeleteConfirm: boolean = false; // dialog for delete records confirmation
    isDeleteAllConfirm: boolean = false; // dialog for delete all records confirmation
    isAddToWorkGroup:boolean = false; // dialog to add workgroupAgents to a workgroup
    isRemoveAgentFromWorkGroup:boolean = false; // dialog to remove workgroup agents from workgroup
    agentId = null; // to delete workgroupAgent using this variable in dialog
    agentName = null // to show workgroupAgent name in dialog

    workGroupData: any = [];
    workgroupId = ''; // to delete workgroup using this variable in dialog
    workgroupName = ''; // to show workgroup name in dialog
    otherWorkgroupId = '' // to remove agent from other workgroup 
    otherWorkgroupName = '' // to show other workgroup name in dialog
    agentsAssignedToOtherWorkgroup:any = []; // dialog to confirm that agent already assigned to other workgroup

    //edit mode
    continueToAddWorkgroupId!: any; // to get the specific workgroup detail
    isContinueToAddInWorkgroup!: boolean; // to check the mode add/update

    cols = [
        { field: 'divisionName', header: 'Division', enabled: true },
        { field: 'workgroupName', header: 'Workgroup', enabled: true },
        { field: 'queueName', header: 'Queue', enabled: true },
        { field: 'emailId', header: 'Email Address', enabled: true },
        { field: 'state', header: 'Status', enabled: true },
        { field: 'updatedTimestamp', header: 'Updated On', enabled: true },
    ];
    col = {
        divisionName: 'divisionName',
        workgroupName: 'workgroupName',
        queueName: 'queueName',
        emailId: 'emailId',
        state: 'state',
        updatedTimestamp: 'updatedTimestamp'
    }
    selectedColumns: any;

    
    divisions:any = [];
    selectedDivisions:any;
    workgroups:any = [];
    selectedWorkgroups:any;
    queues:any = [];
    selectedQueues:any = [];
    statuses:any = [];
    selectedStatuses: any = [];


    constructor(
        public global: GlobalComponent,
        private route: ActivatedRoute,
        private router: Router,
        private commonMethods: CommonMethods,
        private scheduleService: ScheduleService,
        private forecastService: ForecastService,
        private spinnerService: NgxSpinnerService,
        private messageService: MessageService,
        private datePipe: DatePipe,
        private http: HttpClient
    ) {
        this.commonMethods.dynamicBackgroundColorChange('white');
        this.continueToAddWorkgroupId = this.route.snapshot.params['id'];
        this.isContinueToAddInWorkgroup = this.continueToAddWorkgroupId;
    }

    ngOnInit() {
        this.getWfmConfigs();
        this.selectedColumns = this.cols;
    }

    // Page load -get wfm config details
    getWfmConfigs() {
        this.forecastService.getWfmConfigId().subscribe((data: any) => {
            if (data.Items[0]) {
                this.wfmConfigs = data.Items;
                if (this.wfmConfigs.length) {
                    this.selectedConfig = this.wfmConfigs[0];
                    this.wfmConfigId = this.selectedConfig.wfmConfigId;
                    this.model.wfmConfigId = this.selectedConfig.wfmConfigId;
                    this.getWorkgroupAgents(this.params);
                    this.getQueues(); // calling queues for searching
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

    getWorkgroupAgents(params) {
        this.loading = true;
        if(this.isContinueToAddInWorkgroup){
            let model = {workgroupId: this.continueToAddWorkgroupId, wfmConfigId: this.wfmConfigId}
            this.getWorkgroupDetail(model);
        }else{
            this.model.agentType = 'allAgents';
        }
        this.model.workgroupId = this.continueToAddWorkgroupId;
        if (this.model.wfmConfigId) {
            this.scheduleService.getWorkgroupAgentsList(params, this.model).subscribe((data: any) => {
                if (data) {
                    this.workgroupAgents = data.agentsList;
                    if(this.model.agentType == 'assigned'){
                        this.workgroupAgents = data.assignedAgentsList;
                    }else if(this.model.agentType == 'unassigned'){
                        this.workgroupAgents = data.unAssignedAgentsList;
                    }else if(this.model.agentType == 'all'){
                        this.workgroupAgents = data.allAgentsList;
                    }else if(!this.isContinueToAddInWorkgroup){
                        this.workgroupAgents = data.allAgentsList;
                    }
                
                    this.isLoading = false;
                    this.totalRecords = data.totalCount // To get total records count
                    this.last = this.firstPage + this.workgroupAgents.length;

                    // enable checkbox selection while navigating from page 1 to page 2
                    if ($(".select-all-chkbox .ui-chkbox-box").hasClass("ui-state-active")) {
                        this.selectedWorkgroupAgents = data.agentsList;
                    }

                    if(!this.divisions.length){
                        this.divisions = this.workgroupAgents.filter((a, i) => this.workgroupAgents.findIndex((s) => a.divisionName === s.divisionName) === i)
                        this.divisions.splice(this.divisions.findIndex(item => item.divisionName == null),1);
                    }
                    if(!this.workgroups.length){
                        this.workgroups = this.workgroupAgents.filter((a, i) => this.workgroupAgents.findIndex((s) => a.workgroupName === s.workgroupName) === i)
                        this.workgroups.splice(this.workgroups.findIndex(item => item.workgroupName == null),1);
                    }
                    if(!this.statuses.length){
                        this.statuses = this.workgroupAgents.filter((a, i) => this.workgroupAgents.findIndex((s) => a.state === s.state) === i)
                        this.statuses.splice(this.statuses.findIndex(item => item.state == null),1);
                    }

                    this.spinnerService.hide();
                }else{
                    setTimeout(() => {
                        if (!this.totalRecords) {
                            this.first = 0
                        }
                    }, 500);
                } 
                this.loading = false;
            }, (error) => {
                console.log(error);
                this.spinnerService.hide();
                this.loading = false;
            })
        }
    }

    loadWorkgroupAgents(event: LazyLoadEvent) {
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
        this.params.agentName = (this.params.agentName) ? this.params.agentName : '' // Searching for agent name
        this.params.divisionName = (this.params.divisionName) ? this.params.divisionName : '' // Searching for division
        this.params.workgroupName = (this.params.workgroupName) ? this.params.workgroupName : '' // Searching for workgroup 
        this.params.email = (this.params.email) ? this.params.email : '' // Searching for email
        this.params.updateDate = (this.params.updateDate) ? this.params.updateDate : '' // Searching for updated date
        
        this.getWorkgroupAgents(this.params)
        // setTimeout(() => {
        //     this.paginator?.changePage(this.params.pageNo - 1);
        // });
    }

    // getting queues for searching
    getQueues(){
        let model = {wfmConfigId:this.model.wfmConfigId, isFrequent: false}
        this.forecastService.getQueueList(model).subscribe((data: any) => {
            this.queues = data;
        }, (error) => {
            console.log('error:', error.error.message);
            // this.messageService.add({ severity: 'error', summary: 'Queues are not available', detail: 'Please try again later' });
            this.spinnerService.hide();
        })
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

    onChangeAgentType(mode) {
        this.resetDialogFlags();
        this.model.agentType = mode;
        this.selectedWorkgroupAgents = [];
        this.table.reset();
        this.clearAdvanceFilters();
        this.resetParams();
        this.getWorkgroupAgents(this.params);
    }

    getWorkgroupDetail(params) {
        this.loading = true;
        if(params.wfmConfigId){
            this.scheduleService.getWorkgroup(params).subscribe((data: any) => {
                if (data) {
                    this.workGroupData = data // store the response data to forecastData variable
                    this.workgroupName = this.workGroupData.workgroupName;
                    if(this.isDeleteConfirm){
                        this.loading = false;
                        this.showDialog();
                    }
                }
            }, (error) => {
                this.loading = false;
                console.log('error:', error.error);
                this.messageService.add({ severity: 'error', summary: 'Workgroup details are not available', detail: 'Please try again later' });
                
            })
        }
    }

    // To perform the operation of add agents to workgroup
    manageWorkgroupAgent(agent, mode) {
        // console.log('agent:',agent);
        if (mode == 'addToWorkgroup') {
            this.getWorkgroupDetail(this.model);
            this.agentId = agent.agentId;
            this.agentName = agent.agentName;
            this.isViewDetail = false;
            this.isDeleteAllConfirm = false;
            this.isRemoveAgentFromWorkGroup = false;
            this.isDeleteConfirm = true;
            this.isAddToWorkGroup = true;
        }
        if (mode == 'removeFromWorkgroup') {
            this.otherWorkgroupId = agent.workgroupId;
            this.otherWorkgroupName = agent.workgroupName;
            this.getWorkgroupDetail(this.model);
            this.agentId = agent.agentId;
            this.agentName = agent.agentName;
            this.isViewDetail = false;
            this.isDeleteAllConfirm = false;
            this.isDeleteConfirm = true;
            this.isAddToWorkGroup = false;
            this.agentsAssignedToOtherWorkgroup = [];
            this.isRemoveAgentFromWorkGroup = true
        }
        // if (mode == 'view') {
        //     this.isDeleteConfirm = false;
        //     this.isDeleteAllConfirm = false;
        //     this.isViewDetail = true;
        //     // this.getworkgroupDetail(this.workgroupId);
        //     this.showDialog();
        // }
    }

    manageSelectedWorkgroupAgents(mode) {
        this.agentsAssignedToOtherWorkgroup = [];
        if(mode == 'add'){
            // to check any agents assigned to other workgroups
            this.selectedWorkgroupAgents.forEach(element => {
                if(element.workgroupId){
                    this.agentsAssignedToOtherWorkgroup.push(element.workgroupId)
                }
            })
            // console.log('this.selectedWorkgroupAgents:', this.selectedWorkgroupAgents);
            // console.log('agentsAssignedToOtherWorkgroup:', this.agentsAssignedToOtherWorkgroup);
            this.isViewDetail = false;
            this.isDeleteConfirm = false;
            this.isDeleteAllConfirm = false;
            this.isRemoveAgentFromWorkGroup = false;
            this.isAddToWorkGroup = true;
            this.showDialog();
        }
        if(mode == 'remove'){
            this.isViewDetail = false;
            this.isDeleteConfirm = false;
            this.isDeleteAllConfirm = false;
            this.isAddToWorkGroup = false;
            this.isRemoveAgentFromWorkGroup = true;
            this.showDialog();
        }
        if(mode == 'gotoWorkgroups'){
            this.router.navigate(['wfm/schedule/workgroup/list']);
        }
    }

    addAgentsToWorkgroup(mode){
        let totalAgents = [];
        if(this.selectedWorkgroupAgents.length > 0){
            this.selectedWorkgroupAgents.map(element => {
                totalAgents.push(element.agentId)
            })
        }
        if(this.isDeleteConfirm){
            totalAgents.push(this.agentId)
        }
        let updateModel:any = [{
            wfmConfigId: this.selectedConfig.wfmConfigId,
            agentsId: totalAgents
        }];
        updateModel.push({workgroupId: this.continueToAddWorkgroupId})
        // console.log('updateModel:', updateModel);
        this.spinnerService.show();
        this.scheduleService.addAgentsToWorkGroup(updateModel).subscribe((data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Selected agents has been added to ' + this.workgroupName + ' successfully!' });
            this.resetDialogFlags();
            this.model.agentType = 'assigned';
            this.selectedWorkgroupAgents = [];
            this.getWorkgroupAgents(this.params);
            this.spinnerService.hide();
        }, (error) => {
            console.log(error.error.message);
            this.messageService.add({ severity: 'error', summary: 'Please try again later' });
            this.spinnerService.hide();
        })
    }

    // Filter the records according to selection of updated date
    onDateSelect(value, date) {
        let dateVal = this.datePipe.transform(value, 'MM/dd/yyyy');
        this.table.filter(dateVal, date, 'equals')
    }

    deleteRecord() {
        this.spinnerService.show();
        let deleteParams = {
            agentId: this.agentId,
            workgroupId: this.otherWorkgroupId,
            wfmConfigId: this.selectedConfig.wfmConfigId
        }
        this.scheduleService.deleteWorkgroupAgent(deleteParams).subscribe((data: any) => {
            this.spinnerService.hide();
            this.messageService.add({ severity: 'success', summary: this.agentName + ' has been removed from '+ this.otherWorkgroupName +' successfully!' });
            this.resetDialogFlags();
            this.getWorkgroupAgents(this.params);
        }, (error) => {
            console.log(error.error.message);
            this.messageService.add({ severity: 'error', summary: 'Please try again later' });
            this.spinnerService.hide();
        })
    }

    deleteAllRecords() {
        this.spinnerService.show();
        this.selectedWorkgroupAgents.forEach(element => {
            let deleteParams = {
                agentId: element.agentId,
                workgroupId: element.workgroupId,
                wfmConfigId: this.selectedConfig.wfmConfigId
            }
            this.scheduleService.deleteWorkgroupAgent(deleteParams).subscribe((data: any) => {
                this.selectedWorkgroupAgents = this.selectedWorkgroupAgents.filter(({ agentId }) => agentId !== element.agentId);
                if (!this.selectedWorkgroupAgents.length) {
                    this.spinnerService.hide();
                    this.messageService.add({ severity: 'success', summary: 'Selected agents has been removed from '+ this.workgroupName +' successfully!' });
                    this.resetDialogFlags();
                    this.selectedWorkgroupAgents = [];
                    this.getWorkgroupAgents(this.params);
                }
            }, (error) => {
                console.log(error.error.message);
                this.messageService.add({ severity: 'error', summary: 'Please try again later' });
                this.spinnerService.hide();
            })
        })
    }

    resetDialogFlags(){
        this.isViewDetail = false;
        this.isDeleteConfirm = false;
        this.isDeleteAllConfirm = false;
        this.isAddToWorkGroup = false;
        this.isRemoveAgentFromWorkGroup = false;
        this.closeDialog();
    }

    public paginate(paginationData): void {
        this.currentPage = paginationData.page + 1;
        this.params.pageNo = this.currentPage;
        this.params.pageSize = paginationData.rows;
        this.first = paginationData.first + 1;
        this.firstPage = paginationData.first;
        this.getWorkgroupAgents(this.params);
    }

    resetParams() {
        this.params = {
            pageNo: 1,
            pageSize: 10,
            globalText: "",
            orderBy: "desc",
            orderColumn: "agentId",
            agentName: "",
            divisionName: "",
            workgroupName: "",
            email: "",
            queueName: "",
            state:"",
            updateDate: "",
            updateBy: ""
        }
    }

    applySearch(){
        this.selectedWorkgroupAgents = [];
        let divisions:any = []
        let workgroups:any = []
        let queues: any = []
        let statuses: any = []

        if(this.selectedDivisions){
            this.selectedDivisions.map(element => {
                divisions.push(element.divisionName)
            })
        }
        if(this.selectedWorkgroups){
            this.selectedWorkgroups.map(element => {
                workgroups.push(element.workgroupName)
            })
        }
        if(this.selectedQueues){
            this.selectedQueues.map(element => {
                queues.push(element.queueName)
            })
        }
        if(this.selectedStatuses){
            this.selectedStatuses.map(element => {
                statuses.push(element.state)
            })
        }
        this.params.divisionName = divisions;
        this.params.workgroupName = workgroups;
        this.params.queueName = queues;
        this.params.state = statuses;
        this.panel.hide();
        this.getWorkgroupAgents(this.params)
    }

    // get updated date for advance filter search
    // onSelectUpdatedDate(value) {
    //     this.params.updateDate = (value) ? this.datePipe.transform(value, 'MM/dd/yyyy') : "";
    // }

    // To clear the inputs of filters in datatable
    clearFilters(dt) {
        // this.table.reset();
        dt.reset();
        $('input:text').val('');
        this.selectedWorkgroupAgents = [];
        this.selectedDivisions = [];
        this.selectedWorkgroups = [];
        this.selectedQueues = [];
        this.selectedStatuses = [];
        this.resetParams();
        setTimeout(() => {
            this.getWorkgroupAgents(this.params);
        }, 500);
        this.panel.hide();
        
        // reset accordion tabs
        $('.cust-accordion .item .collapse').removeClass('show');
        $('.cust-accordion .item-header button').addClass('collapsed');
    }

    clearAdvanceFilters(){
        $('input:text').val('');
        this.selectedDivisions = [];
        this.selectedWorkgroups = [];
        this.selectedQueues = [];
        this.selectedStatuses = [];
        this.panel.hide();
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