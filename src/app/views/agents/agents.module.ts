import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// primeNg
import {InputSwitchModule} from 'primeng/inputswitch';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {KeyFilterModule} from 'primeng/keyfilter';
import {MessageModule} from 'primeng/message';
import {CheckboxModule} from 'primeng/checkbox';


// tooltip
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ToastyModule} from 'ng2-toasty';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NgxSpinnerModule } from "ngx-spinner";
import { AccordionModule } from 'ngx-bootstrap/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { DispositionCodingComponent } from './disposition-coding/disposition-coding.component';
import { AgentsRoutingModule } from './agents.routing.module';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { MyPerformanceComponent } from './my-performance/my-performance.component';
import { CommonMethods } from '../../common/common.components';
import { PipeModule } from '../../pipes/pipe.modules';
import { MyEvaluationsComponent } from './my-evaluations/my-evaluations.component';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';



@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      AccordionModule.forRoot(),
      ToastyModule.forRoot(),
      InputSwitchModule,
      RadioButtonModule,
      DropdownModule,
      InputMaskModule,
      CheckboxModule,
      KeyFilterModule,
      MessageModule,
      ReactiveFormsModule,
      TooltipModule.forRoot(), 
      ProgressSpinnerModule,
      NgxSpinnerModule,
      AutoCompleteModule,
      // TranslateModule,
      AgentsRoutingModule,
      CalendarModule,
      TableModule,
      OverlayPanelModule,
      PipeModule
    ],
    declarations: [
      DispositionCodingComponent,
      MyPerformanceComponent,
      MyEvaluationsComponent,
      MyScheduleComponent
    ],
    providers: [
      CommonMethods
    ]
  })
  export class AgentsModule { }