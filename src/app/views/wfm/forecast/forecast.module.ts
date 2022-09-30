import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastRoutingModule, forecastRoutes } from './forecast.routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePipe } from '@angular/common'
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CommonMethods } from '../../../common/common.components';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';
import {RadioButtonModule} from 'primeng/radiobutton';

@NgModule({
  declarations: [
    forecastRoutes
  ],
  imports: [
    CommonModule,
    ForecastRoutingModule,
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
    ConfirmDialogModule,
    DialogModule,
    MultiSelectModule,
    KeyFilterModule,
    PaginatorModule,
    ToastModule,
    OverlayPanelModule,
    AccordionModule,
    ListboxModule,
    RadioButtonModule
  ],
  providers: [
    CommonMethods,
    DatePipe,
  ],
})
export class ForecastModule { }