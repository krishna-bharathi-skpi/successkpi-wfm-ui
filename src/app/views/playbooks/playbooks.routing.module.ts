import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MyplaybookComponent } from './myplaybook/myplaybook.component';
import { TopicsComponent } from './topics/topics.component';
import { ThemesComponent } from './themes/themes.component';
import { ActionsComponent } from './actions/actions.component';
import { RedactionsComponent } from './redactions/redactions.component';
import { CustomPhrasesComponent } from './custom-phrases/custom-phrases.component';
import { HelpComponent } from './help/help.component';
import { PlaybooksGuard } from '../../auth_guard/playbooks.guard';
import { PhraseRecommendationComponent } from './phrase-recommendation/phrase-recommendation.component';
import { MomentsComponent } from './moments/moments.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Playbooks'
    },
    children: [
      {
        path: '',
        redirectTo: 'my-playbooks',
        data: {
          rolePath: 'my-playbooks'
        },
        canActivate: [PlaybooksGuard]
      },
      {
        path: 'my-playbooks',
        component: MyplaybookComponent,
        data: {
          title: 'My Playbooks',
          rolePath: 'my-playbooks'
        },
        canActivate: [PlaybooksGuard]
      },
      {
        path: 'topics',
        component: TopicsComponent,
        data: {
          title: 'Topics',
          rolePath: 'topics'
        },
        canActivate: [PlaybooksGuard]
      },
      {
        path: 'moments',
        component: MomentsComponent,
        data: {
          title: 'Moments',
          rolePath: 'moments'
        },
        canActivate: [PlaybooksGuard]
      },
      {
        path: 'themes',
        component: ThemesComponent,
        data: {
          title: 'Themes',
          rolePath: 'themes'
        },
        canActivate: [PlaybooksGuard]
      },
      {
        path: 'actions',
        component: ActionsComponent,
        data: {
          title: 'Actions',
          rolePath: 'actions'
        },
        canActivate: [PlaybooksGuard]
      },
      {
        path: 'phrase-recommmendation',
        component: PhraseRecommendationComponent,
        data: {
          title: 'Phrase recommendation',
          rolePath: 'phrase-recommmendation'
        },
        canActivate: [PlaybooksGuard]
      },
      {
        path: 'redactions',
        component: RedactionsComponent,
        data: {
          title: 'Redactions',
          rolePath: 'redactions'
        },
        canActivate: [PlaybooksGuard]
      },
      {
        path: 'custom-phrases',
        component: CustomPhrasesComponent,
        data: {
          title: 'Custom phrases',
          rolePath: 'custom-phrases'
        },
        canActivate: [PlaybooksGuard]
      },
      {
        path: 'help',
        component: HelpComponent,
        data: {
          title: 'Help',
          rolePath: 'help'
        },
        canActivate: [PlaybooksGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PlaybookRoutingModule { }
