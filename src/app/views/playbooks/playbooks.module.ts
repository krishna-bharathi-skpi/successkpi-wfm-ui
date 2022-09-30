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
// Import Components
import { MyplaybookComponent } from './myplaybook/myplaybook.component';
import {TopicsComponent} from './topics/topics.component';
import { ThemesComponent } from './themes/themes.component';
import { ActionsComponent } from './actions/actions.component';
import { RedactionsComponent } from './redactions/redactions.component';
import { CustomPhrasesComponent } from './custom-phrases/custom-phrases.component';
import { HelpComponent } from './help/help.component';

// Components Routing
import { PlaybookRoutingModule } from './playbooks.routing.module';

import { AccordionModule } from 'ngx-bootstrap/accordion';

//services
import { MyPlaybookService } from './myplaybook/myplaybook.service';
import { TopicService } from './topics/topics.service'
import{CommonMethods} from '../../common/common.components'
import {ToastyModule} from 'ng2-toasty';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NgxSpinnerModule } from "ngx-spinner";
import { PhraseRecommendationComponent } from './phrase-recommendation/phrase-recommendation.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { MomentsComponent } from './moments/moments.component';
import { CalendarModule, MultiSelectModule, OverlayPanelModule } from 'primeng';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS ,HttpBackend} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PlaybookRoutingModule,
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
    MultiSelectModule,
    CalendarModule,
    OverlayPanelModule
    // TranslateModule
  ],
  declarations: [
    MyplaybookComponent,
    TopicsComponent,
    ThemesComponent,
    ActionsComponent,
    RedactionsComponent,
    CustomPhrasesComponent,
    HelpComponent,
    PhraseRecommendationComponent,
    MomentsComponent

  ],
  providers: [
    MyPlaybookService,
    TopicService,
    CommonMethods
  ]
})
export class PlaybooksModule { }
