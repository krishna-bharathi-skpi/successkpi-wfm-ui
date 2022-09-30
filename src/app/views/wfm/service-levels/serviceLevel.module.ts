import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceLevelRoutingModule, ServiceLevelRoutes } from './serviceLevel.routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePipe } from '@angular/common'
import { AlertModule } from 'ngx-bootstrap/alert';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DynamicDialogModule } from 'primeng/dynamicdialog'
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  declarations: [
    ServiceLevelRoutes
  ],
  imports: [
    CommonModule,
    ServiceLevelRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    AlertModule.forRoot(),
    ConfirmDialogModule,
    DialogModule,
    DynamicDialogModule,
    MultiSelectModule,
    KeyFilterModule,
    PaginatorModule,
    ToastModule,
    OverlayPanelModule
  ],
  providers: [
    DatePipe
  ],
})
export class ServiceLevelModule { }