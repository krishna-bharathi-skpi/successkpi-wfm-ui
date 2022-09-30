import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { CommonMethods } from '../../../../common/common.components';
// import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-service-level-detail',
    templateUrl: './service-level-detail.component.html',
    styleUrls: ['./service-level-detail.component.css'],
    // providers: [ConfirmationService]
})

export class ServiceLevelDetailComponent implements OnInit {

    @ViewChild('dt') table: Table; // to perform all the operations of datatable
    forecastData: any = [];
    serviceLevelId!: any;

    display: boolean = false; // confirm dialog - show/hide

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private commonMethods: CommonMethods,
        private spinnerService: NgxSpinnerService,
        // private confirmationService: ConfirmationService,
        private datePipe: DatePipe,
    ) {
        this.commonMethods.dynamicBackgroundColorChange('white');
    }

    ngOnInit(): void {
        this.serviceLevelId = this.route.snapshot.params['id'];
        this.getForecastData();
    }

    getForecastData() {
        this.forecastData = [
            {
                id: 1,
                interval: 'Monday 12 2021 12:00 AM',
                offered: '3.5',
                aht: 0,
                queue: '-'
            },
            {
                id: 2,
                interval: 'Monday 12 2021 12:15 AM',
                offered: '3.5',
                aht: 0,
                queue: '-'
            },
            {
                id: 3,
                interval: 'Monday 12 2021 12:30 AM',
                offered: '5',
                aht: 0,
                queue: '-'
            },
            {
                id: 4,
                interval: 'Monday 12 2021 12:15 AM',
                offered: '3.5',
                aht: 0,
                queue: '-'
            },
            {
                id: 5,
                interval: 'Monday 12 2021 12:30 AM',
                offered: '5',
                aht: 0,
                queue: '-'
            },
            {
                id: 6,
                interval: 'Monday 12 2021 12:00 AM',
                offered: '3.5',
                aht: 0,
                queue: '-'
            },
            {
                id: 7,
                interval: 'Monday 12 2021 12:15 AM',
                offered: '3.5',
                aht: 0,
                queue: '-'
            },
            {
                id: 8,
                interval: 'Monday 12 2021 12:30 AM',
                offered: '5',
                aht: 0,
                queue: '-'
            }
        ]
    }

    onRowEditInit(forecastData, index: number) {
        // console.log('edit:', forecastData);
        // console.log('edit index:', index);
    }

    onRowEditSave(forecastData, index: number) {
        // console.log('save:', forecastData);
        // console.log('save index:', index);
    }

    onRowEditCancel(forecastData, index: number) {
        // console.log('cancel:', index);
    }

}