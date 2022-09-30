import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditWorkGroupComponent } from './add-edit-workgroup/add-edit-workgroup.component';
import { AgentsListComponent } from './agents-list/agents-list.component';
import { ScheduleComponent } from './schedule.component';
import { TaskCategoriesListComponent } from './task-categories-list/task-categories-list.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { workGroupListComponent } from './workgroup-list/workgroup-list.component';
import { AddEditWorkgroupRuleComponent } from './workgroup-rules/add-edit-workgroup-rule/add-edit-workgroup-rule.component';
import { WorkGroupRulesListComponent } from './workgroup-rules/workgroup-rules-list/workgroup-rules-list.component';
import { AddEditWorkplanComponent } from './workplan/add-edit-workplan/add-edit-workplan.component';
import { OrganizeTasksComponent } from './workplan/organize-tasks/organize-tasks.component';
import { WorkplansListComponent } from './workplan/workplan-list/workplan-list.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Schedule'
        },
        children: [
            {
                path: '',
                redirectTo: 'workgroup/list'
            },
            {
                path: 'setup',
                component: ScheduleComponent,
                data: {
                    title: 'Setup'
                }
            },
            {
                path: 'workgroup/list',
                component: workGroupListComponent,
                data: {
                    title: 'List'
                }
            },
            {
                path: 'workgroup/create',
                component: AddEditWorkGroupComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: 'workgroup/edit/:id',
                component: AddEditWorkGroupComponent,
                data: {
                    title: 'Edit'
                }
            },
            {
                path: 'agents/list',
                component: AgentsListComponent,
                data: {
                    title: 'Agents'
                }
            },
            {
                path: 'agents/list/:id',
                component: AgentsListComponent,
                data: {
                    title: 'Agents'
                }
            },
            {
                path: 'tasks/list',
                component: TasksListComponent,
                data: {
                    title: 'Tasks'
                }
            },
            {
                path: 'tasks/list/:id',
                component: TasksListComponent,
                data: {
                    title: 'Tasks'
                }
            },
            {
                path: 'task_categories/list',
                component: TaskCategoriesListComponent,
                data: {
                    title: 'Tasks'
                }
            },
            {
                path: 'workgroup_rules/list/:workgroupId',
                component: WorkGroupRulesListComponent,
                data: {
                    title: 'Workgroup Rules'
                }
            },
            {
                path: 'workgroup_rules/create/:workgroupId',
                component: AddEditWorkgroupRuleComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: 'workgroup_rules/edit/:wfmConfigId/:workgroupId/:workgroupRuleId',
                component: AddEditWorkgroupRuleComponent,
                data: {
                    title: 'Edit'
                }
            },
            // {
            //     path: 'workplan/list/:workgroupId',
            //     component: WorkplansListComponent,
            //     data: {
            //         title: 'Workplans'
            //     }
            // },
            // {
            //     path: 'workplan/create',
            //     component: AddEditWorkplanComponent,
            //     data: {
            //         title: 'Create'
            //     }
            // },
            {
                path: 'workplan/list',
                component: WorkplansListComponent,
                data: {
                    title: 'Workplans'
                }
            },
            {
                path: 'workplan/create',
                component: AddEditWorkplanComponent,
                data: {
                    title: 'Create'
                }
            },
            {
                path: 'workplan/edit/:wfmConfigId/:workplanId',
                component: AddEditWorkplanComponent,
                data: {
                    title: 'Edit'
                }
            },
            {
                path: 'workplan/organize_tasks/:workplanId',
                component: OrganizeTasksComponent,
                data: {
                    title: 'Organize Tasks'
                }
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScheduleRoutingModule { }

export const scheduleRoutes = [ 
    ScheduleComponent,
    AddEditWorkGroupComponent,
    workGroupListComponent,
    AgentsListComponent,
    TasksListComponent,
    TaskCategoriesListComponent,
    WorkGroupRulesListComponent,
    AddEditWorkgroupRuleComponent,
    WorkplansListComponent,
    AddEditWorkplanComponent,
    OrganizeTasksComponent
]