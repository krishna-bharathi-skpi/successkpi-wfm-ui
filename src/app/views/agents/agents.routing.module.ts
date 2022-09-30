import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentsGuard } from '../../auth_guard/agents.guard';
import { DispositionCodingComponent } from './disposition-coding/disposition-coding.component';
import { MyEvaluationsComponent } from './my-evaluations/my-evaluations.component';
import { MyPerformanceComponent } from './my-performance/my-performance.component';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';



const routes: Routes = [
    {
      path: '',
      data: {
        title: 'Agents'
      },
      children: [
        {
          path: '',
          redirectTo: 'disposition-coding',
          data: {
            rolePath: 'disposition-coding'
          },
          canActivate: [AgentsGuard]
        },
        {
          path: 'disposition-coding',
          component: DispositionCodingComponent,
          data: {
            title: 'Disposition Coding',
            rolePath: 'disposition-coding'
          },
          canActivate: [AgentsGuard]
        },
        {
          path: 'my-performance',
          component: MyPerformanceComponent,
          data: {
            title: 'My Performance',
            rolePath: 'my-performance'
          },
          canActivate: [AgentsGuard]
        },
        {
          path: 'my-evaluations',
          component: MyEvaluationsComponent,
          data: {
            title: 'My Evaluations',
            rolePath: 'my-evaluations'
          },
          canActivate: [AgentsGuard]
        },
        {
          path: 'my-schedule',
          component: MyScheduleComponent,
          data: {
            title: 'My Schedule',
            rolePath: 'my-schedule'
          },
          canActivate: [AgentsGuard]
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class AgentsRoutingModule { }