import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePipe } from '@angular/common'
import { CommonMethods } from '../../../common/common.components';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { wfmDashboardRoutes, WfmDashboardRoutingModule } from './wfm-dashboard.routing.module';

@NgModule({
  declarations: [
    wfmDashboardRoutes
  ],
  imports: [
    CommonModule,
    WfmDashboardRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    TabViewModule,
    CheckboxModule,
    PaginatorModule,
    ToastModule
  ],
  providers: [
    CommonMethods,
    DatePipe,
  ],
})
export class WfmDashboardModule { }