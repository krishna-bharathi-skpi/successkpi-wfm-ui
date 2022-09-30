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
import {TabViewModule} from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import {TableModule} from 'primeng/table';
// tooltip
import {TooltipModule} from 'ngx-bootstrap/tooltip';
// Import Components
import { PlatformSettingComponent } from './platform-setting/platform-setting.component';
import { SuccesskpiSettingComponent } from './successkpi-setting/successkpi-setting.component';//preferences
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
// import { ProfileComponent } from './profile/profile.component';
import { TopicDetectionComponent } from './topic-detection/topic-detection.component';
// Components Routing
import { SettingsRoutingModule } from './settings.routing.module';

import { AccordionModule } from 'ngx-bootstrap/accordion';

//services
import{CommonMethods} from '../../common/common.components'
import {ToastyModule} from 'ng2-toasty';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { NgxSpinnerModule } from "ngx-spinner";
import {AutoCompleteModule} from 'primeng/autocomplete';
import {MultiSelectModule} from 'primeng/multiselect';
import { PartitionComponent } from './partition/partition.component';
import { GenesysUsersComponent } from './genesys-users/genesys-users.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
    AccordionModule.forRoot(),
    ToastyModule.forRoot(),
    InputSwitchModule,
    RadioButtonModule,
    DropdownModule,
    InputMaskModule,
    CheckboxModule,
    KeyFilterModule,
    MessageModule,
    TabViewModule,
    ReactiveFormsModule,
    CalendarModule,
    TableModule,
    SidebarModule,
    TooltipModule.forRoot(), 
    NgxSpinnerModule,
    AutoCompleteModule,
    MultiSelectModule,
    OverlayPanelModule
    // TranslateModule
  ],
  declarations: [
    PlatformSettingComponent,
    SuccesskpiSettingComponent,
    UsersComponent,
    RolesComponent,
    // ProfileComponent,
    TopicDetectionComponent,
    PartitionComponent,
    GenesysUsersComponent
  ],
  providers: [
   
    CommonMethods
  ]
})
export class SettingsModule { }
