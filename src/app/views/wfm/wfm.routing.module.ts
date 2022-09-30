import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WfmGuard } from '../../auth_guard/wfm.guard';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'WFM'
        },
        children: [
            {
                path: '',
                redirectTo: 'service_levels',
                canActivate: [WfmGuard],
                data: {
                    rolePath: 'service-quality'
                }
            },{
                path: 'service_levels',
                loadChildren: () => import('./service-levels/serviceLevel.module').then(m => m.ServiceLevelModule),
                canActivate: [WfmGuard],
                data: {
                    rolePath: 'service-quality'
                }
            },{
                path: 'forecast',
                loadChildren: () => import('./forecast/forecast.module').then(m => m.ForecastModule),
                canActivate: [WfmGuard],
                data: {
                    rolePath: 'forecasting'
                }
            },{
                path: 'schedule',
                loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule),
                canActivate: [WfmGuard],
                data: {
                    rolePath: 'schedule'
                }
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WfmRoutingModule { }