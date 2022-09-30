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
import { DialogModule } from 'primeng/dialog';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CommonMethods } from '../../../common/common.components';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ScheduleRoutingModule, scheduleRoutes } from './schedule.routing.module';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';
import { ColorPickerModule } from 'primeng/colorpicker';

@NgModule({
  declarations: [
    scheduleRoutes
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
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
    DialogModule,
    KeyFilterModule,
    PaginatorModule,
    ToastModule,
    MultiSelectModule,
    OverlayPanelModule,
    AccordionModule,
    ListboxModule,
    ColorPickerModule
  ],
  providers: [
    CommonMethods,
    DatePipe,
  ],
})
export class ScheduleModule { }