import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditForecastComponent } from './add-edit-forecast/add-edit-forecast.component';
import { ForecastDetailComponent } from './forecast-details/forecast-detail.component';
import { ForecastListComponent } from './forecast-list/forecast-list.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Forecast'
        },
        children: [
            {
                path: '',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: ForecastListComponent,
                data: {
                    title: 'List'
                }
            },
            {
                path: 'create',
                component: AddEditForecastComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: 'edit/:id',
                component: AddEditForecastComponent,
                data: {
                    title: 'Edit'
                }
            },
            {
                path: 'detail/:id',
                component: ForecastDetailComponent,
                data: {
                    title: 'Details'
                }
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ForecastRoutingModule { }

export const forecastRoutes = [ 
    ForecastListComponent, 
    AddEditForecastComponent,
    ForecastDetailComponent,
]