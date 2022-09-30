import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// App Breadcrumb Component
import { AppBreadcrumbService } from './app-breadcrumb.service';
import { AppBreadcrumbComponent } from './app-breadcrumb.component';
import { CuiBreadcrumbComponent } from './cui-breadcrumb.component';
// @dynamic
import * as ɵngcc0 from '@angular/core';
var AppBreadcrumbModule = /** @class */ (function () {
    function AppBreadcrumbModule() {
    }
    AppBreadcrumbModule_1 = AppBreadcrumbModule;
    AppBreadcrumbModule.forRoot = function (config) {
        return {
            ngModule: AppBreadcrumbModule_1,
            providers: [
                AppBreadcrumbService
            ]
        };
    };
    var AppBreadcrumbModule_1;
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
    }], function () { return []; }, null); })();
    return AppBreadcrumbModule;
}());
export { AppBreadcrumbModule };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJyZWFkY3J1bWIubW9kdWxlLmpzIiwic291cmNlcyI6WyJuZzovQGNvcmV1aS9hbmd1bGFyL2xpYi9icmVhZGNydW1iL2FwcC1icmVhZGNydW1iLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQywyQkFBMkI7QUFDM0IsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFcEUsV0FBVzs7QUFNWDtJQUFBO0lBU0EsQ0FBQzs0QkFUWSxtQkFBbUI7SUFDdkIsMkJBQU8sR0FBZCxVQUFlLE1BQVk7UUFDekIsT0FBTztZQUNMLFFBQVEsRUFBRSxxQkFBbUI7WUFDN0IsU0FBUyxFQUFFO2dCQUNULG9CQUFvQjthQUNyQjtTQUNGLENBQUM7SUFDSixDQUFDOzhCQUUwQjtJQVZoQixtQkFBbUIsZ0RBTC9CLFFBQVEsQ0FBQztXQUNSLE9BQU8sRUFBRSxDQUFFLFlBQVksRUFBRSxZQUFZLENBQUUsY0FDdkMsT0FBTyxFQUFFLENBQUUsc0JBQXNCLEVBQUUsc0JBQXNCLENBQUUsY0FDM0QsWUFBWSxFQUFFLENBQUUsc0JBQXNCLEVBQUU7RUFBc0IsQ0FBRSxVQUNqRSxDQUFDLFFBQ1csbUJBQW1CLENBUy9COzs7Ozs7OztnREFDRDtJQURBLDBCQUFDO0NBQUEsQUFURCxJQVNDO1NBVFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG4vLyBBcHAgQnJlYWRjcnVtYiBDb21wb25lbnRcclxuaW1wb3J0IHsgQXBwQnJlYWRjcnVtYlNlcnZpY2UgfSBmcm9tICcuL2FwcC1icmVhZGNydW1iLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBcHBCcmVhZGNydW1iQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAtYnJlYWRjcnVtYi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDdWlCcmVhZGNydW1iQ29tcG9uZW50IH0gZnJvbSAnLi9jdWktYnJlYWRjcnVtYi5jb21wb25lbnQnO1xyXG5cclxuLy8gQGR5bmFtaWNcclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlIF0sXHJcbiAgZXhwb3J0czogWyBBcHBCcmVhZGNydW1iQ29tcG9uZW50LCBDdWlCcmVhZGNydW1iQ29tcG9uZW50IF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbIEFwcEJyZWFkY3J1bWJDb21wb25lbnQsIEN1aUJyZWFkY3J1bWJDb21wb25lbnQgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwQnJlYWRjcnVtYk1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogYW55KTogTW9kdWxlV2l0aFByb3ZpZGVyczxBcHBCcmVhZGNydW1iTW9kdWxlPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogQXBwQnJlYWRjcnVtYk1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQXBwQnJlYWRjcnVtYlNlcnZpY2VcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19