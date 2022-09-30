import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { KeyQuestionsComponent } from './key-questions/key-questions.component';
import { SharedDashboardComponent } from './shared-dashboard/shared-dashboard.component';
import { CustomReportsComponent } from '../analyze/custom-reports/custom-reports.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { HelpComponent } from './help/help.component';
import { AnalyticsGuard } from '../../auth_guard/analytics.guard';
import { ScheduleDeliveryComponent } from './schedule-delivery/schedule-delivery.component';
import { ScheduleImportComponent } from './schedule-import/schedule-import.component';
import { RealtimeQueueComponent } from './realtime-queue/realtime-queue.component';
import { RealtimeAgentComponent } from './realtime-agent/realtime-agent.component';
import { RealtimeAgentStatusComponent } from './realtime-agent-status/realtime-agent-status.component';
import { RealtimeQueueStatusComponent } from './realtime-queue-status/realtime-queue-status.component';
import { MyReportsComponent } from './my-reports/my-reports.component';
import { PublicReportsComponent } from './public-reports/public-reports.component';
import { SharedSubscriptionComponent } from './shared-subscription/shared-subscription.component';
import { ContactSubscriptionComponent } from './contact-subscription/contact-subscription.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: '',
        redirectTo: 'key-questions',
        data: {
          title: 'Key Questions',
          rolePath: 'key-questions'
        },
        canActivate: [AnalyticsGuard]
      },
      {
        path: 'key-questions',
        component: KeyQuestionsComponent,
        data: {
          title: 'Key Questions',
          rolePath: 'key-questions'
        },
        canActivate: [AnalyticsGuard]
      },
      // {
      //   path: 'customize-key-questions',
      //   component:KeyQuestionsComponent ,
      //   data: {
      //     title: 'Customize Key Questions'
      //   }
      // },
      {
        path: 'shared-dashboards',
        component: SharedDashboardComponent,
        data: {
          title: 'Shared Dashboards',
          rolePath: 'shared-dashboards'
        },
        canActivate: [AnalyticsGuard]
      },
      {
        path: 'custom-reports',
        component: CustomReportsComponent,
        data: {
          title: 'Custom Reports',
          rolePath: 'custom-reports'
        },
        canActivate: [AnalyticsGuard]
      },
      {
        path: 'public-reports',
        component: PublicReportsComponent,
        data: {
          title: 'Public Reports',
          rolePath: 'public-reports'
        },
        canActivate: [AnalyticsGuard]
      },
      {
        path: 'my-reports',
        component: MyReportsComponent,
        data: {
          title: 'My Reports',
          rolePath: 'my-reports'
        },
        canActivate: [AnalyticsGuard]
      },
      {
        path: 'subscriptions',
        component: SubscriptionComponent,
        data: {
          title: 'Subscriptions',
          rolePath: 'subscriptions'
        },
        canActivate: [AnalyticsGuard]
      },
      {
        path: 'shared-subscriptions',
        component: SharedSubscriptionComponent,
        data: {
          title: 'Shared Subscriptions',
          rolePath: 'shared-subscriptions'
        },
        canActivate: [AnalyticsGuard]
      },
      {
        path: 'contact-subscriptions',
        component: ContactSubscriptionComponent,
        data: {
          title: 'Contact Subscriptions',
          rolePath: 'contact-subscriptions'
        },
        canActivate: [AnalyticsGuard]
      },
      {
        path: 'schedule-delivery',
        component: ScheduleDeliveryComponent,
        data: {
          title: 'Schedule Delivery',
          rolePath: 'schedule-delivery'
        },
        canActivate: [AnalyticsGuard]
      },
      {
        path: 'schedule-import',
        component: ScheduleImportComponent,
        data: {
          title: 'Schedule Import',
          rolePath: 'schedule-import'
        },
        canActivate: [AnalyticsGuard]
      },
      {
        path: 'queue-stats',
        component: RealtimeQueueComponent,
        data: {
          title: 'Queue Stats',
          rolePath: 'queue-stats'
        },
        canActivate: [AnalyticsGuard]
      }, 
      {
        path: 'queue-status',
        component: RealtimeQueueStatusComponent,
        data: {
          title: 'Queue Status',
          rolePath: 'queue-status'
        },
        canActivate: [AnalyticsGuard]
      }, 
      {
        path: 'agent-stats',
        component: RealtimeAgentComponent,
        data: {
          title: 'Agent Stats',
          rolePath: 'agent-stats'
        },
        canActivate: [AnalyticsGuard]
      }, {
        path: 'agent-status',
        component: RealtimeAgentStatusComponent,
        data: {
          title: 'Agent Status',
          rolePath: 'agent-status'
        },
        canActivate: [AnalyticsGuard]
      },
      {
        path: 'help',
        component: HelpComponent,
        data: {
          title: 'Help',
          rolePath: 'help'
        },
        canActivate: [AnalyticsGuard]
      },
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyzeRoutingModule { }
