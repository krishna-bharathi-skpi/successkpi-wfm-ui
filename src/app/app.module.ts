import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { HomeLayoutComponent } from './containers/sidebars/home';
import { HeaderLayoutComponent } from './containers/header';
import { PlaybooksLayoutComponent } from './containers/sidebars/playbooks';
import { AnalyzeLayoutComponent } from './containers/sidebars/analyze';
import { EvaluateLayoutComponent } from './containers/sidebars/evaluate'
import { SettingsLayoutComponent } from './containers/sidebars/settings';
import { AgentsLayoutComponent } from './containers/sidebars/agents';
import { WfmLayoutComponent } from './containers/sidebars/wfm';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './views/register/register.component';

import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import {HttpClient, HttpClientModule} from '@angular/common/http';
// import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
// import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
const APP_CONTAINERS = [
  HomeLayoutComponent,
  HeaderLayoutComponent,
  PlaybooksLayoutComponent,
  AnalyzeLayoutComponent,
  EvaluateLayoutComponent,
  SettingsLayoutComponent,
  AgentsLayoutComponent,
  WfmLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,

} from '@coreui/angular';


// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';


//services
import { AuthService } from './services/auth.service'
import { PagerService } from './services/pager.service'
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS, HttpBackend } from '@angular/common/http';
import { CommonMethods } from '../app/common/common.components';
import { ToastyModule } from 'ng2-toasty';
// import { TimeConvertPipe } from './pipes/time-convert.pipe';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { from } from 'rxjs';
import { GlobalComponent } from './global/global.component';

import { DatePipe } from './pipes/date.pipe';
// import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSpinnerModule } from "ngx-spinner";
import { InteractionDetailsComponent } from './views/interaction-details/interaction-details.component';
import { PipeModule } from './pipes/pipe.modules';
import { BnNgIdleService } from 'bn-ng-idle';
import { appInitializer, mstrInitializer } from './_helpers';
import { RefreshTokenService } from './services/refreshtoken.service';
import { MstrTokenService } from './services/mstrtoken.service';
import { TempreloadComponent } from './tempreload/tempreload.component';
import { AnalyticsMsgComponent } from './views/error/analytics-msg.component';
import { AwsMarketplaceRegisterComponent } from './views/aws-marketplace-register/aws-marketplace-register.component';
import { PlatformRegistersComponent } from './views/platform-registers/platform-registers.component';
import { SsoAzureLoginComponent } from './views/sso-azure-login/sso-azure-login.component';
import { SsoAzureRedirectComponent } from './views/sso-azure-redirect/sso-azure-redirect.component';
import { SidebarModule } from 'primeng/sidebar';
import { ProfileComponent } from './views/settings/profile/profile.component';
import { TabViewModule } from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccordionModule, MessageService, ToastModule } from 'primeng';

// import { AgentsComponent } from './views/agents/agents.component';
// import { DispositionCodingComponent } from './views/agents/disposition-coding/disposition-coding.component';
// import { AgentsComponent } from './views/agents/agents.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastyModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule.forRoot(),
    // Ng4LoadingSpinnerModule.forRoot(),
    NgxSpinnerModule,
    PipeModule,
    SidebarModule,
    TabViewModule,
    ProgressSpinnerModule,
    ToastModule,
    AccordionModule

    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: httpTranslateLoader,
    //     deps: [HttpClient]
    //   }
    // })

  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    // TimeConvertPipe,
    ResetPasswordComponent,
    GlobalComponent,
    InteractionDetailsComponent,
    DatePipe,
    TempreloadComponent,
    AnalyticsMsgComponent,
    AwsMarketplaceRegisterComponent,
    PlatformRegistersComponent,
    SsoAzureLoginComponent,
    SsoAzureRedirectComponent,
    ProfileComponent
    // DispositionCodingComponent,
    // AgentsComponent,












  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,

  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthService,
    multi: true

  },
  { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [RefreshTokenService] },
  { provide: APP_INITIALIZER, useFactory: mstrInitializer, multi: true, deps: [MstrTokenService] },

    CommonMethods,
    PagerService,
    GlobalComponent,
    DatePipe,
    BnNgIdleService,
    MessageService

    // TranslateStore,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// export function httpTranslateLoader(http: HttpBackend) {
//   console.log("http",http);
//   let httpLocal = new HttpClient(http);
//   console.log("httplocal",httpLocal);
//   return new TranslateHttpLoader(httpLocal);
// }
// export function httpTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }