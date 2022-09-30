import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { GlobalComponent } from '../../../global/global.component';
import { CommonMethods } from '../../../common/common.components';
import { ScheduleService } from './schedule.service';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css'],
    providers: [MessageService]
})

export class ScheduleComponent implements OnInit {

    constructor(
        public global: GlobalComponent,
        private route: Router,
        private commonMethods: CommonMethods,
        private scheduleService: ScheduleService,
        private spinnerService: NgxSpinnerService,
        private messageService: MessageService,
    ) {
        this.commonMethods.dynamicBackgroundColorChange('white');
    }

    ngOnInit() {
        
    }
}