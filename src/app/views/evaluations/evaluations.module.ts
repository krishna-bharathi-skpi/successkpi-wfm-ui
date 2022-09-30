import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// import {DropdownModule} from 'primeng/dropdown';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
// Import Components
import { EvaluationWorkspaceComponent } from './evaluation-workspace/evaluation-workspace.component';
import { EvaluationFormsComponent } from './evaluation-forms/evaluation-forms.component';
import { HelpComponent } from './help/help.component';
// import { InteractionsComponent } from './interactions/interactions.component';
// Components Routing
import { EvaluationRoutingModule } from './evaluations.routing.module';
import{CommonMethods} from '../../common/common.components';
import { PipeModule } from '../../pipes/pipe.modules';
// primeNG
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ToastyModule} from 'ng2-toasty';


import {DropdownModule} from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import {TabMenuModule} from 'primeng/tabmenu';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NgxSpinnerModule } from "ngx-spinner";
// import {MenuItem} from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import {MultiSelectModule} from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';

import { MyEvaluationComponent } from './my-evaluation/my-evaluation.component';
import { MyteamEvaluationComponent } from './myteam-evaluation/myteam-evaluation.component';
import { NewInteractionsComponent } from './new-interactions/new-interactions.component';
import { TableModule } from 'primeng/table';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CoachingWorkspaceComponent } from './coaching-workspace/coaching-workspace.component';
import { ClipboardModule } from 'ngx-clipboard';
import { AiMlScoringComponent } from './ai-ml-scoring/ai-ml-scoring.component';
import { MyCoachingSessionsComponent } from './my-coaching-sessions/my-coaching-sessions.component';
import {RadioButtonModule} from 'primeng/radiobutton';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { ManageDisputeComponent } from './manage-dispute/manage-dispute.component';
import { EvaluationWorkspaceNacdComponent } from './evaluation-workspace-nacd/evaluation-workspace-nacd.component';
import {ButtonModule} from 'primeng/button';
import {SelectButtonModule} from 'primeng/selectbutton';
import { MessageService, ToastModule } from 'primeng';
import {AccordionModule} from 'primeng/accordion';
import { PopoverModule } from 'ngx-bootstrap/popover';


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      // DropdownModule,
      EvaluationRoutingModule,
      ToastyModule.forRoot(),
      TooltipModule.forRoot(), 
      PipeModule,
      AutoCompleteModule,
      ReactiveFormsModule,
      DropdownModule,
      TabMenuModule,
      CalendarModule,
      ProgressSpinnerModule,
      NgxSpinnerModule,
      TabViewModule,
      MultiSelectModule,
      CheckboxModule,
      InputSwitchModule,
      TableModule,
      DragDropModule,
      ClipboardModule,
      RadioButtonModule,
      OverlayPanelModule,
      ButtonModule,
		  SelectButtonModule,
      ToastModule,
      AccordionModule,
      PopoverModule.forRoot(),

      // TranslateModule
    ],
    declarations: [
        EvaluationWorkspaceComponent,
        EvaluationFormsComponent,
        HelpComponent,
        // InteractionsComponent,
        MyEvaluationComponent,
        MyteamEvaluationComponent,
        NewInteractionsComponent,
        CoachingWorkspaceComponent,
        AiMlScoringComponent,
        MyCoachingSessionsComponent,
        ManageDisputeComponent,
        EvaluationWorkspaceNacdComponent

    ],
    providers: [
      CommonMethods,
      MessageService
    ]
  })
  export class EvaluationsModule { }