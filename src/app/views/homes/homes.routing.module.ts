import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { HelpComponent } from './help/help.component';
import { CustomizeDashboardComponent } from './customize-dashboard/customize-dashboard.component';
import { HomeGuard } from '../../auth_guard/home.guard'
import { CommandCenterComponent } from './command-center/command-center.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        redirectTo: 'command-center',
        data: {
          // rolePath: 'home-dashboard'
        },
        // canActivate: [HomeGuard]
      },
      {
        path: 'command-center',
        component: CommandCenterComponent,
        data: {
          title: 'Command Center',
          rolePath: 'command-center'
        },
        canActivate: [HomeGuard]
      },
      {
        path: 'home-dashboard',
        component: HomeDashboardComponent,
        data: {
          title: 'Home dashboard',
          rolePath: 'home-dashboard'
        },
        canActivate: [HomeGuard]
      },
      {
        path: 'customize-dashboard',
        component: CustomizeDashboardComponent,
        data: {
          title: 'Customize dashboard',
          rolePath: 'customize-dashboard'
        },
        canActivate: [HomeGuard]
      },
      {
        path: 'help',
        component: HelpComponent,
        data: {
          title: 'Help',
          rolePath: 'help'
        },
        canActivate: [HomeGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomesRoutingModule { }
