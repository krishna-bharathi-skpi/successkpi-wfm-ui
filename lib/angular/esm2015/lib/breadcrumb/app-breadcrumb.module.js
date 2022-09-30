import * as ɵngcc0 from '@angular/core';
var AppBreadcrumbModule_1;
import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// App Breadcrumb Component
import { AppBreadcrumbService } from './app-breadcrumb.service';
import { AppBreadcrumbComponent } from './app-breadcrumb.component';
import { CuiBreadcrumbComponent } from './cui-breadcrumb.component';
// @dynamic
let AppBreadcrumbModule = AppBreadcrumbModule_1 = class AppBreadcrumbModule {
    static forRoot(config) {
        return {
            ngModule: AppBreadcrumbModule_1,
            providers: [
                AppBreadcrumbService
            ]
        };
    }
};
AppBreadcrumbModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: AppBreadcrumbModule });
AppBreadcrumbModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function AppBreadcrumbModule_Factory(t) { return new (t || AppBreadcrumbModule)(); }, imports: [[CommonModule, RouterModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(AppBreadcrumbModule, { declarations: function () { return [AppBreadcrumbComponent, CuiBreadcrumbComponent]; }, imports: function () { return [CommonModule, RouterModule]; }, exports: function () { return [AppBreadcrumbComponent, CuiBreadcrumbComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppBreadcrumbModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, RouterModule],
                exports: [AppBreadcrumbComponent, CuiBreadcrumbComponent],
                declarations: [AppBreadcrumbComponent, CuiBreadcrumbComponent]
            }]
    }], null, null); })();
export { AppBreadcrumbModule };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJyZWFkY3J1bWIubW9kdWxlLmpzIiwic291cmNlcyI6WyJuZzovQGNvcmV1aS9hbmd1bGFyL2xpYi9icmVhZGNydW1iL2FwcC1icmVhZGNydW1iLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBc0IsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLDJCQUEyQjtBQUMzQixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVwRSxXQUFXO0FBTVgsSUFBYSxtQkFBbUIsMkJBQWhDLE1BQWEsbUJBQW1CO0lBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBWTtRQUN6QixPQUFPO1lBQ0wsUUFBUSxFQUFFLHFCQUFtQjtZQUM3QixTQUFTLEVBQUU7Z0JBQ1Qsb0JBQW9CO2FBQ3JCO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRjs7RUFBQSxDQVRZLG1CQUFtQiw0Q0FML0IsUUFBUSxDQUFDLFVBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLFlBQVksQ0FBRSxVQUN2QyxPQUFPLEVBQUUsQ0FBRSxzQkFBc0IsRUFBRSxzQkFBc0IsQ0FBRTtPQUMzRCxZQUFZLEVBQUUsQ0FBRSxzQkFBc0IsRUFBRSxzQkFBc0IsQ0FBRSxNQUNqRSxDQUFDLElBQ1csbUJBQW1CLENBUy9COzs7Ozs7OzswQkFDRDtTQVZhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuLy8gQXBwIEJyZWFkY3J1bWIgQ29tcG9uZW50XHJcbmltcG9ydCB7IEFwcEJyZWFkY3J1bWJTZXJ2aWNlIH0gZnJvbSAnLi9hcHAtYnJlYWRjcnVtYi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXBwQnJlYWRjcnVtYkNvbXBvbmVudCB9IGZyb20gJy4vYXBwLWJyZWFkY3J1bWIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ3VpQnJlYWRjcnVtYkNvbXBvbmVudCB9IGZyb20gJy4vY3VpLWJyZWFkY3J1bWIuY29tcG9uZW50JztcclxuXHJcbi8vIEBkeW5hbWljXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIFJvdXRlck1vZHVsZSBdLFxyXG4gIGV4cG9ydHM6IFsgQXBwQnJlYWRjcnVtYkNvbXBvbmVudCwgQ3VpQnJlYWRjcnVtYkNvbXBvbmVudCBdLFxyXG4gIGRlY2xhcmF0aW9uczogWyBBcHBCcmVhZGNydW1iQ29tcG9uZW50LCBDdWlCcmVhZGNydW1iQ29tcG9uZW50IF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcEJyZWFkY3J1bWJNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IGFueSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QXBwQnJlYWRjcnVtYk1vZHVsZT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IEFwcEJyZWFkY3J1bWJNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEFwcEJyZWFkY3J1bWJTZXJ2aWNlXHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==