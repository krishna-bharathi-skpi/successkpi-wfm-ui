import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { EvaluationWorkspaceComponent } from './evaluation-workspace/evaluation-workspace.component';
import { EvaluationFormsComponent } from './evaluation-forms/evaluation-forms.component';
import { HelpComponent } from './help/help.component';
// import { InteractionsComponent } from './interactions/interactions.component';
import { EvaluateGuard } from '../../auth_guard/evaluate.guard';
import { MyEvaluationComponent } from './my-evaluation/my-evaluation.component';
import { MyteamEvaluationComponent } from './myteam-evaluation/myteam-evaluation.component';
import { NewInteractionsComponent } from './new-interactions/new-interactions.component';
import { CoachingWorkspaceComponent } from './coaching-workspace/coaching-workspace.component';
import { AiMlScoringComponent } from './ai-ml-scoring/ai-ml-scoring.component';
import { MyCoachingSessionsComponent } from './my-coaching-sessions/my-coaching-sessions.component';
import { ManageDisputeComponent } from './manage-dispute/manage-dispute.component';
import { EvaluationWorkspaceNacdComponent } from './evaluation-workspace-nacd/evaluation-workspace-nacd.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Evaluations'
    },
    children: [
      {
        path: '',
        redirectTo: 'evaluation-workspace-nacd',
        data: {
          title: 'Evaluation workspace',
          rolePath: 'evaluation-workspace-nacd'
        },
        canActivate: [EvaluateGuard]
      },
      // {
      //   path: 'evaluation-workspace',
      //   component: EvaluationWorkspaceComponent,
      //   data: {
      //     title: 'Evaluation workspace',
      //     rolePath: 'evaluation-workspace'
      //   },
      //   canActivate: [EvaluateGuard]
      // },
      {
        path: 'evaluation-workspace-nacd',
        component: EvaluationWorkspaceNacdComponent,
        data: {
          title: 'Evaluation workspace-Beta',
          rolePath: 'evaluation-workspace-nacd'
        },
        canActivate: [EvaluateGuard]
      },
      {
        path: 'coaching-workspace',
        component: CoachingWorkspaceComponent,
        data: {
          title: 'Coaching workspace',
          rolePath: 'coaching-workspace'
        },
        canActivate: [EvaluateGuard]
      },
      {
        path: 'manage-dispute',
        component: ManageDisputeComponent,
        data: {
          title: 'Manage Dispute',
          rolePath: 'manage-dispute'
        },
        canActivate: [EvaluateGuard]
      },
      {
        path: 'evaluation-forms',
        component: EvaluationFormsComponent,
        data: {
          title: 'Evaluation forms',
          rolePath: 'evaluation-forms'
        },
        canActivate: [EvaluateGuard]
      },
      {
        path: 'my-evaluation',
        component: MyEvaluationComponent,
        data: {
          title: 'My Evaluation',
          rolePath: 'my-evaluation'
        },
        canActivate: [EvaluateGuard]
      },
      {
        path: 'my-teams-evaluation',
        component: MyteamEvaluationComponent,
        data: {
          title: 'My Teams Evaluation',
          rolePath: 'my-teams-evaluation'
        },
        canActivate: [EvaluateGuard]
      },
      {
        path: 'my-coaching-sessions',
        component: MyCoachingSessionsComponent,
        data: {
          title: 'My Coaching Sessions',
          rolePath: 'my-coaching-sessions'
        },
        canActivate: [EvaluateGuard]
      },
      // {
      //   path: 'interactions',
      //   component: InteractionsComponent,
      //   data: {
      //     title: 'Interactions',
      //     rolePath: 'interactions'
      //   }, canActivate: [EvaluateGuard]
      // },
      {
        path: 'new-interactions',
        component: NewInteractionsComponent,
        data: {
          title: 'Interactions',
          rolePath: 'new-interactions'
        }, 
        canActivate: [EvaluateGuard]
      },
      {
        path: 'ai_ml-scoring',
        component: AiMlScoringComponent,
        data: {
          title: 'AI/ML Scoring',
          rolePath: 'ai-ml-scoring'
        }, 
        canActivate: [EvaluateGuard]
      },
      {
        path: 'help',
        component: HelpComponent,
        data: {
          title: 'Help',
          rolePath: 'help'
        }, canActivate: [EvaluateGuard]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule { }
