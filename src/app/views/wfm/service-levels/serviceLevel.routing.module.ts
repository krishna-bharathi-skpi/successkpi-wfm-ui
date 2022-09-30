import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditServiceLevelComponent } from './add-edit-service-level/add-edit-service-level.component';
import { ServiceLevelDetailComponent } from './service-level-details/service-level-detail.component';
import { ServiceLevelListComponent } from './service-level-list/service-level-list.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Service Levels'
        },
        children: [
            {
                path: '',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: ServiceLevelListComponent,
                data: {
                    title: 'List'
                }
            },
            {
                path: 'create',
                component: AddEditServiceLevelComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: 'edit/:id',
                component: AddEditServiceLevelComponent,
                data: {
                    title: 'Edit'
                }
            },
            {
                path: 'detail/:id',
                component: ServiceLevelDetailComponent,
                data: {
                    title: 'Details'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServiceLevelRoutingModule { }

export const ServiceLevelRoutes = [ 
    ServiceLevelListComponent,
    AddEditServiceLevelComponent,
    ServiceLevelDetailComponent
]