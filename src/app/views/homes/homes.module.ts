import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Import Components
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { HelpComponent } from './help/help.component';

// Components Routing
import { HomesRoutingModule } from './homes.routing.module';
import{PipeModule} from '../../pipes/pipe.modules'
import { CustomizeDashboardComponent } from './customize-dashboard/customize-dashboard.component';
import { CommonMethods } from '../../common/common.components';
import {ToastyModule} from 'ng2-toasty';
import { CommandCenterComponent } from './command-center/command-center.component';
import {AutoCompleteModule} from 'primeng/autocomplete'



@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      HomesRoutingModule,
      ToastyModule,
      PipeModule,
      AutoCompleteModule
    ],
    declarations: [
        HomeDashboardComponent,
        HelpComponent,
        CustomizeDashboardComponent,
        CommandCenterComponent
    ],
    providers: [
      CommonMethods
    ]
  })
  export class HomesModule { }