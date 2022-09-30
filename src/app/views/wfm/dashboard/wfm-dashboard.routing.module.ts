import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WfmDashboardComponent } from './wfm-dashboard.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: '',
                component: WfmDashboardComponent,
                data: {
                    title: 'Dashboard'
                }
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WfmDashboardRoutingModule { }

export const wfmDashboardRoutes = [ 
    WfmDashboardComponent

]