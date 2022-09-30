import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { HomeLayoutComponent } from './containers/sidebars/home';
import { PlaybooksLayoutComponent } from './containers/sidebars/playbooks';
import { SettingsLayoutComponent } from './containers/sidebars/settings';
import { HeaderLayoutComponent } from './containers/header';
import { AnalyzeLayoutComponent } from './containers/sidebars/analyze';
import { EvaluateLayoutComponent } from './containers/sidebars/evaluate'
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { AdminAuthGuard } from './auth_guard/admin-auth.guard';
import { InteractionDetailsComponent } from './views/interaction-details/interaction-details.component';
import { TempreloadComponent } from './tempreload/tempreload.component';
import { AnalyticsMsgComponent } from './views/error/analytics-msg.component';
import { AwsMarketplaceRegisterComponent } from './views/aws-marketplace-register/aws-marketplace-register.component';
import { PlatformRegistersComponent } from './views/platform-registers/platform-registers.component';
import { SsoAzureLoginComponent } from './views/sso-azure-login/sso-azure-login.component';
import { SsoAzureRedirectComponent } from './views/sso-azure-redirect/sso-azure-redirect.component';
import { AgentsLayoutComponent } from './containers/sidebars/agents';
import { WfmLayoutComponent } from './containers/sidebars/wfm';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/command-center',
    pathMatch: 'full'
  },
  {
    path: '_reload',
    component: TempreloadComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'not-found',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'access-denied',
    component: P500Component,
    data: {
      title: 'Page 500'
    },
    canActivate: [AdminAuthGuard]
  },
  
  {
    path: 'analytics-message',
    component: AnalyticsMsgComponent,
    data: {
      title: 'TimeOut Msg'
    },
    // canActivate: [AdminAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'analytics/interaction-details',
    component: InteractionDetailsComponent,
    data: {
      title: 'Interaction',
    }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password Page'
    }
  },
  {
    path: 'sso/azure-login',
    component: SsoAzureLoginComponent,
    data: {
      title: 'Azure AD login page'
    }
  },
  {
    path: 'sso/redirect',
    component: SsoAzureRedirectComponent,
    data: {
      title: 'Azure redirect page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'aws-marketplace/cci-signup',
    component: AwsMarketplaceRegisterComponent
  },
  {
    path: 'aws-marketplace/platform/signup',
    component: PlatformRegistersComponent
  },
  {
    path: '',
    component: PlaybooksLayoutComponent,
    data: {
      title: 'Playbooks'
    },
    children: [
      {
        path: 'playbooks',
        loadChildren: () => import('./views/playbooks/playbooks.module').then(m => m.PlaybooksModule)
      }
    ]
  },
  {
    path: '',
    component: AnalyzeLayoutComponent,
    data: {
      title: 'Analytics',
      rolePath: 'key-questions'
    },
    children: [
      {
        path: 'analytics',
        loadChildren: () => import('./views/analyze/analyze.module').then(m => m.AnalyzeModule)
      }
    ]
  },
  {
    path: '',
    component: EvaluateLayoutComponent,
    data: {
      title: 'Evaluations'
    },
    children: [
      {
        path: 'evaluations',
        loadChildren: () => import('./views/evaluations/evaluations.module').then(m => m.EvaluationsModule)
      }
    ]
  },
  {
    path: '',
    component: SettingsLayoutComponent,
    data: {
      title: 'Settings'
    },
    children: [
      {
        path: 'settings',
        loadChildren: () => import('./views/settings/settings.module').then(m => m.SettingsModule)
      }
    ]
  },
  {
    path: '',
    component: AgentsLayoutComponent,
    data: {
      title: 'Agents'
    },
    children: [
      {
        path: 'agents',
        loadChildren: () => import('./views/agents/agents.module').then(m => m.AgentsModule)
      }
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('./views/homes/homes.module').then(m => m.HomesModule)
      }
    ]
  },
  {
    path: '',
    component: WfmLayoutComponent,
    data: {
      title: 'WFM'
    },
    children: [
      {
        path: 'wfm',
        loadChildren: () => import('./views/wfm/wfm.module').then(m => m.WfmModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
