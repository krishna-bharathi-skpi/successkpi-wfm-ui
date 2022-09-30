import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

// Import Components
import { KeyQuestionsComponent } from './key-questions/key-questions.component';
import { SharedDashboardComponent } from './shared-dashboard/shared-dashboard.component';
import { CustomReportsComponent } from '../analyze/custom-reports/custom-reports.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { HelpComponent } from './help/help.component';
import { PipeModule } from '../../pipes/pipe.modules'


// Components Routing
import { AnalyzeRoutingModule } from './analyze.routing.module';

import { CommonMethods } from '../../common/common.components'
import { ToastyModule } from 'ng2-toasty';
import { NgxSpinnerModule } from "ngx-spinner";
import { TabMenuModule } from 'primeng/tabmenu';
import { ScheduleDeliveryComponent } from './schedule-delivery/schedule-delivery.component';
import { DropdownModule } from 'primeng/dropdown';;
import { TableModule } from 'primeng/table';
import { ScheduleImportComponent } from './schedule-import/schedule-import.component';
import { RealtimeQueueComponent } from './realtime-queue/realtime-queue.component';
import { RealtimeAgentComponent } from './realtime-agent/realtime-agent.component';
import {MultiSelectModule} from 'primeng/multiselect';
import { RealtimeAgentStatusComponent } from './realtime-agent-status/realtime-agent-status.component';
import { RealtimeQueueStatusComponent } from './realtime-queue-status/realtime-queue-status.component';
import { MyReportsComponent } from './my-reports/my-reports.component';
import { PublicReportsComponent } from './public-reports/public-reports.component';
import { SharedSubscriptionComponent } from './shared-subscription/shared-subscription.component';
import { ContactSubscriptionComponent } from './contact-subscription/contact-subscription.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AnalyzeRoutingModule,
    ToastyModule,
    PipeModule,
    TooltipModule.forRoot(),
    NgxSpinnerModule,
    TableModule,
    DropdownModule,
    TabMenuModule,
    ReactiveFormsModule,
    MultiSelectModule
  ],
  declarations: [
    KeyQuestionsComponent,
    SharedDashboardComponent,
    CustomReportsComponent,
    SubscriptionComponent,
    HelpComponent,
    ScheduleDeliveryComponent,
    ScheduleImportComponent,
    RealtimeQueueComponent,
    RealtimeAgentComponent,
    RealtimeAgentStatusComponent,
    RealtimeQueueStatusComponent,
    MyReportsComponent,
    PublicReportsComponent,
    SharedSubscriptionComponent,
    ContactSubscriptionComponent
  ],
  providers: [
    CommonMethods
  ]
})
export class AnalyzeModule { }