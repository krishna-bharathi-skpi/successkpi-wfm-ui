import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalComponent } from '../../../global/global.component';
import { CommonMethods } from '../../../common/common.components';
import { WfmDashboardService } from './wfm-dashboard.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-wfm-dashboard',
    templateUrl: './wfm-dashboard.component.html',
    styleUrls: ['./wfm-dashboard.component.css'],
})

export class WfmDashboardComponent implements OnInit {
    mstrIdToken: any;
    idToken: any;
    mstrWebURL: any;
    URL: any;
    public forecastingDataUrl: string = null
    url: string = "https://analytics-qa.successkpis.com/AnalyticsLibrary/app/BB6D6E1D11EAF5243EF60080EF95023D/295669EF11EAF820FA250080EFA5D491";
    urlSafe: SafeResourceUrl;

    //charts
    data: any;
    chartOptions: any;
    mergeOptions: any;
    conversationsData: any;
    avgHandlingData: any;
    fteData: any;

    //forecast data
    forecastDetail: any = [];
    forecastData: any = [];
    constforecastData: any = [];
    editedData: any = [];
    fromDate: any;
    toDate: any;

    constructor(
        public global: GlobalComponent,
        private route: Router,
        private commonMethods: CommonMethods,
        private spinnerService: NgxSpinnerService,
        private dashboardService: WfmDashboardService,
        public sanitizer: DomSanitizer
    ) {
        this.commonMethods.dynamicBackgroundColorChange('default');
    }

    ngOnInit() {
        // this.initiateTimelineData();
        this.mstrIdToken = localStorage.getItem("mstrIdToken");
        this.mstrIdToken = JSON.parse(this.mstrIdToken);
        // console.log('mstrIdToken:', this.mstrIdToken);
        this.idToken = this.mstrIdToken['x-mstr-identitytoken'];
        // this.idToken = "?idToken=" + this.mstrIdToken['x-mstr-identitytoken']
        this.URL = "https://analytics-qa.successkpis.com/AnalyticsLibrary/app/BB6D6E1D11EAF5243EF60080EF95023D/295669EF11EAF820FA250080EFA5D491";
        this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url + '?idToken=' + this.idToken + '&amp;app.embedded=true&amp;auth.freeLogin=false&amp;feature.filter=false&amp;ui.message=false');
        // console.log('urlSafe:', this.urlSafe);
    }

    initiateTimelineData() {
        let base = +new Date(1968, 9, 3);
        let oneDay = 24 * 3600 * 1000;
        let date = [];
        let date2 = [];

        let data = [Math.random() * 300];
        let data2 = [Math.random() * 10];

        for (let i = 1; i < 20000; i++) {
            var now = new Date((base += oneDay));
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data.push(Math.round((Math.random() - 0.5) * 30 + data[i - 1]));

            date2.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data2.push(Math.round((Math.random() - 7) * 10 + data[i - 1]));
        }
        this.loadTimelineData(date, data, data2);
    }


    loadTimelineData(timePeriod, conversationsData, ahtData) {
        this.chartOptions = {
            title: {
                // text: 'December Forecast',
                // subtext: 'Sub Title',
                left: 'center'
            },
            legend: {
                data: ['Conversations', 'Time (seconds)'],
                left: 30,
            },
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: timePeriod
            },
            yAxis: [
                {
                    type: 'value',
                    // name: 'Time (seconds)',
                    position: 'left',
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#bababa'
                        }
                    }
                },
                {
                    type: 'value',
                    // name: 'Time (seconds)',
                    position: 'right',
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#bababa'
                        }
                    },
                    // axisLabel: {
                    //   formatter: '{value} °C'
                    // }
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 10
                },
                {
                    start: 0,
                    end: 10
                }
            ],
            series: [
                {
                    name: 'Conversations',
                    type: 'line',
                    symbol: 'none',
                    sampling: 'lttb',
                    itemStyle: {
                        color: '#4eb64e'
                    },
                    data: conversationsData
                },
                {
                    name: 'Time (seconds)',
                    type: 'line',
                    symbol: 'none',
                    sampling: 'lttb',
                    itemStyle: {
                        color: '#dc930d'
                    },
                    data: ahtData
                }
            ]
        }
    }
}