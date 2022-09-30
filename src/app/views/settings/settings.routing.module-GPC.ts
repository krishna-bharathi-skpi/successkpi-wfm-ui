import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//import Component
import { PlatformSettingComponent } from './platform-setting/platform-setting.component';
import { SuccesskpiSettingComponent } from './successkpi-setting/successkpi-setting.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
// import { ProfileComponent } from './profile/profile.component';
import { TopicDetectionComponent } from './topic-detection/topic-detection.component';
import { SettingsGuard } from '../../auth_guard/settings.guard';
import { PartitionComponent } from './partition/partition.component';
import { GenesysUsersComponent } from './genesys-users/genesys-users.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Settings'
    },
    children: [
      {
        path: '',
        redirectTo: 'platform-setting',
        data: {
          rolePath: 'platform-setting'
        },
        canActivate: [SettingsGuard]
      },
      // {
      //   path: 'profile',
      //   component: ProfileComponent,
      //   data: {
      //     title: 'Profile',
      //     rolePath: 'profile'
      //   },
      //   canActivate: [SettingsGuard]
      // },
      {
        path: 'platform-setting',
        component: PlatformSettingComponent,
        data: {
          title: 'Platform settings',
          rolePath: 'platform-setting'
        },
        canActivate: [SettingsGuard]
      },
      {
        path: 'preferences',
        component: SuccesskpiSettingComponent,
        data: {
          title: 'Preferences',
          rolePath: 'preferences'
        },
        canActivate: [SettingsGuard]
      },
      {
        path: 'partitions',
        component: PartitionComponent,
        data: {
          title: 'Partitions',
          rolePath: 'partitions'
        },
        canActivate: [SettingsGuard]
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          title: 'Roles',
          rolePath: 'roles'
        },
        canActivate: [SettingsGuard]
      },
      {
        path: 'genesys-users',
        component: GenesysUsersComponent,
        data: {
          title: 'User',
          rolePath: 'users'
        },
        canActivate: [SettingsGuard]
      },
      {
        path: 'topic-detection',
        component: TopicDetectionComponent,
        data: {
          title: 'Topic Detection',
          rolePath: 'topic-detection'
        },
        canActivate: [SettingsGuard]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
