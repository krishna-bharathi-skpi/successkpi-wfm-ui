import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../shared/layout/layout.module';
// App Sidebar Component
import { AppSidebarComponent } from './app-sidebar.component';
import { AppSidebarFooterComponent } from './app-sidebar-footer.component';
import { AppSidebarFormComponent } from './app-sidebar-form.component';
import { AppSidebarHeaderComponent } from './app-sidebar-header.component';
import { AppSidebarMinimizerComponent } from './app-sidebar-minimizer.component';
import { AppSidebarService } from './app-sidebar.service';
// App SidebarNav Component
import { NavDropdownDirective, NavDropdownToggleDirective } from './app-sidebar-nav.directive';
import { AppSidebarNavComponent } from './app-sidebar-nav.component';
import { AppSidebarNavDividerComponent } from './app-sidebar-nav/app-sidebar-nav-divider.component';
import { AppSidebarNavDropdownComponent } from './app-sidebar-nav/app-sidebar-nav-dropdown.component';
import { AppSidebarNavItemsComponent } from './app-sidebar-nav/app-sidebar-nav-items.component';
import { AppSidebarNavLinkComponent, AppSidebarNavLinkContentComponent } from './app-sidebar-nav/app-sidebar-nav-link.component';
import { AppSidebarNavTitleComponent } from './app-sidebar-nav/app-sidebar-nav-title.component';
import { SidebarNavHelper } from './app-sidebar-nav.service';
import { AppSidebarNavLabelComponent } from './app-sidebar-nav/app-sidebar-nav-label.component';
import { AppSidebarNavIconPipe } from './app-sidebar-nav/app-sidebar-nav-icon.pipe';
import { AppSidebarNavBadgePipe } from './app-sidebar-nav/app-sidebar-nav-badge.pipe';
import { AppSidebarNavLinkPipe } from './app-sidebar-nav/app-sidebar-nav-link.pipe';
import { AppSidebarNavItemClassPipe } from './app-sidebar-nav/app-sidebar-nav-item-class.pipe';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/router';
import * as ɵngcc3 from '../shared/layout/layout.directive';
var AppSidebarModule = /** @class */ (function () {
    function AppSidebarModule() {
    }
AppSidebarModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: AppSidebarModule });
AppSidebarModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function AppSidebarModule_Factory(t) { return new (t || AppSidebarModule)(); }, providers: [
        SidebarNavHelper,
        AppSidebarService
    ], imports: [[
            CommonModule,
            RouterModule,
            LayoutModule
        ],
        LayoutModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(AppSidebarModule, { declarations: function () { return [AppSidebarFooterComponent,
        AppSidebarFormComponent,
        AppSidebarHeaderComponent,
        AppSidebarMinimizerComponent,
        AppSidebarMinimizerComponent,
        AppSidebarComponent,
        AppSidebarNavItemsComponent,
        AppSidebarNavComponent,
        AppSidebarNavDividerComponent,
        AppSidebarNavDropdownComponent,
        AppSidebarNavLinkComponent,
        AppSidebarNavLinkContentComponent,
        AppSidebarNavTitleComponent,
        NavDropdownDirective,
        NavDropdownToggleDirective,
        AppSidebarNavLabelComponent,
        AppSidebarNavIconPipe,
        AppSidebarNavBadgePipe,
        AppSidebarNavLinkPipe,
        AppSidebarNavItemClassPipe]; }, imports: function () { return [CommonModule,
        RouterModule,
        LayoutModule]; }, exports: function () { return [AppSidebarFooterComponent,
        AppSidebarFormComponent,
        AppSidebarHeaderComponent,
        AppSidebarMinimizerComponent,
        AppSidebarComponent,
        AppSidebarNavItemsComponent,
        AppSidebarNavComponent,
        AppSidebarNavDividerComponent,
        AppSidebarNavDropdownComponent,
        AppSidebarNavLabelComponent,
        AppSidebarNavLinkComponent,
        AppSidebarNavLinkContentComponent,
        AppSidebarNavTitleComponent,
        NavDropdownDirective,
        NavDropdownToggleDirective,
        LayoutModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    RouterModule,
                    LayoutModule
                ],
                exports: [
                    AppSidebarFooterComponent,
                    AppSidebarFormComponent,
                    AppSidebarHeaderComponent,
                    AppSidebarMinimizerComponent,
                    AppSidebarComponent,
                    AppSidebarNavItemsComponent,
                    AppSidebarNavComponent,
                    AppSidebarNavDividerComponent,
                    AppSidebarNavDropdownComponent,
                    AppSidebarNavLabelComponent,
                    AppSidebarNavLinkComponent,
                    AppSidebarNavLinkContentComponent,
                    AppSidebarNavTitleComponent,
                    NavDropdownDirective,
                    NavDropdownToggleDirective,
                    LayoutModule
                ],
                declarations: [
                    AppSidebarFooterComponent,
                    AppSidebarFormComponent,
                    AppSidebarHeaderComponent,
                    AppSidebarMinimizerComponent,
                    AppSidebarMinimizerComponent,
                    AppSidebarComponent,
                    AppSidebarNavItemsComponent,
                    AppSidebarNavComponent,
                    AppSidebarNavDividerComponent,
                    AppSidebarNavDropdownComponent,
                    AppSidebarNavLinkComponent,
                    AppSidebarNavLinkContentComponent,
                    AppSidebarNavTitleComponent,
                    NavDropdownDirective,
                    NavDropdownToggleDirective,
                    AppSidebarNavLabelComponent,
                    AppSidebarNavIconPipe,
                    AppSidebarNavBadgePipe,
                    AppSidebarNavLinkPipe,
                    AppSidebarNavItemClassPipe
                ],
                providers: [
                    SidebarNavHelper,
                    AppSidebarService
                ]
            }]
    }], function () { return []; }, null); })();
ɵngcc0.ɵɵsetComponentScope(AppSidebarNavItemsComponent, [ɵngcc1.NgClass, ɵngcc1.NgComponentOutlet, ɵngcc1.NgForOf, ɵngcc1.NgIf, ɵngcc1.NgTemplateOutlet, ɵngcc1.NgStyle, ɵngcc1.NgSwitch, ɵngcc1.NgSwitchCase, ɵngcc1.NgSwitchDefault, ɵngcc1.NgPlural, ɵngcc1.NgPluralCase, ɵngcc2.RouterOutlet, ɵngcc2.RouterLink, ɵngcc2.RouterLinkWithHref, ɵngcc2.RouterLinkActive, ɵngcc2.ɵangular_packages_router_router_l, ɵngcc3.AsideToggleDirective, ɵngcc3.BrandMinimizeDirective, ɵngcc3.MobileSidebarToggleDirective, ɵngcc3.SidebarToggleDirective, ɵngcc3.SidebarMinimizeDirective, ɵngcc3.SidebarOffCanvasCloseDirective, ɵngcc3.HtmlAttributesDirective, AppSidebarFooterComponent,
    AppSidebarFormComponent,
    AppSidebarHeaderComponent,
    AppSidebarMinimizerComponent,
    AppSidebarComponent,
    AppSidebarNavItemsComponent,
    AppSidebarNavComponent,
    AppSidebarNavDividerComponent,
    AppSidebarNavDropdownComponent,
    AppSidebarNavLinkComponent,
    AppSidebarNavLinkContentComponent,
    AppSidebarNavTitleComponent,
    NavDropdownDirective,
    NavDropdownToggleDirective,
    AppSidebarNavLabelComponent], [ɵngcc1.AsyncPipe, ɵngcc1.UpperCasePipe, ɵngcc1.LowerCasePipe, ɵngcc1.JsonPipe, ɵngcc1.SlicePipe, ɵngcc1.DecimalPipe, ɵngcc1.PercentPipe, ɵngcc1.TitleCasePipe, ɵngcc1.CurrencyPipe, ɵngcc1.DatePipe, ɵngcc1.I18nPluralPipe, ɵngcc1.I18nSelectPipe, ɵngcc1.KeyValuePipe, AppSidebarNavIconPipe,
    AppSidebarNavBadgePipe,
    AppSidebarNavLinkPipe,
    AppSidebarNavItemClassPipe]);
    return AppSidebarModule;
}());
export { AppSidebarModule };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXIubW9kdWxlLmpzIiwic291cmNlcyI6WyJuZzovQGNvcmV1aS9hbmd1bGFyL2xpYi9zaWRlYmFyL2FwcC1zaWRlYmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCx3QkFBd0I7QUFDeEIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakYsT0FBTyxFQUFFLGlCQUFpQixFQUFHLE1BQU0sdUJBQXVCLENBQUM7QUFFM0QsMkJBQTJCO0FBQzNCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ3RHLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2hHLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ2pJLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDOzs7OztBQXFEL0Y7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGdCQUFnQix3QkFuRDVCLFFBQVEsQ0FBQyxjQUNSLE9BQU8sRUFBRTtpQkFDUCxZQUFZLGtCQUNaLFlBQVksa0JBQ1osWUFBWSxjQUNiLGNBQ0QsT0FBTyxFQUFFLGtCQUNQO2lCQUF5QjtTQUN6QjtNQUF1QjtLQUN2QjtJQUF5QixrQkFDekI7d0JBQTRCOztNQUM1QixtQkFBbUI7aUJBQ25CLDJCQUEyQixrQkFDM0Isc0JBQXNCLGtCQUN0Qiw2QkFBNkIsa0JBQzdCO0lBQThCLGtCQUM5QjtnQkFBMkIsa0JBQzNCO3lCQUEwQjtLQUMxQjtBQUFpQyxrQkFDakM7Z0JBQTJCLGtCQUMzQjtpQkFBb0I7R0FDcEIsMEJBQTBCO1FBQzFCLFlBQVksY0FDYjtRQUNELFlBQVksRUFBRTtJQUNaLHlCQUF5QjtJQUN6Qix1QkFBdUI7UUFDdkI7R0FBeUIsa0JBQ3pCO2FBQTRCLGtCQUM1QjtzQkFBNEI7U0FDNUIsbUJBQW1CO2NBQ25CO1VBQTJCLGtCQUMzQixzQkFBc0Isa0JBQ3RCO1lBQTZCO1FBQzdCLDhCQUE4QixrQkFDOUIsMEJBQTBCO2dCQUMxQjtnQkFBaUMsa0JBQ2pDOzBCQUEyQjtNQUMzQixvQkFBb0I7ZUFDcEI7SUFBMEIsa0JBQzFCO2lCQUEyQixrQkFDM0I7aUJBQXFCLGtCQUNyQjtpQkFBc0Isa0JBQ3RCO21CQUFxQjtDQUNyQiwwQkFBMEIsY0FDM0I7WUFDRCxTQUFTLEVBQUU7SUFDVCxnQkFBZ0I7UUFDaEIsaUJBQWlCO0dBQ2xCLFVBQ0YsQ0FBQyxRQUNXO0dBQWdCLENBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQUNqQztJQURnQyx1QkFBQztDQUFBLEFBQWpDLElBQWlDO1NBQXBCLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBMYXlvdXRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvbGF5b3V0L2xheW91dC5tb2R1bGUnO1xyXG4vLyBBcHAgU2lkZWJhciBDb21wb25lbnRcclxuaW1wb3J0IHsgQXBwU2lkZWJhckNvbXBvbmVudCB9IGZyb20gJy4vYXBwLXNpZGViYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXBwU2lkZWJhckZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vYXBwLXNpZGViYXItZm9vdGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFwcFNpZGViYXJGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAtc2lkZWJhci1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFwcFNpZGViYXJIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2FwcC1zaWRlYmFyLWhlYWRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBcHBTaWRlYmFyTWluaW1pemVyQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAtc2lkZWJhci1taW5pbWl6ZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXBwU2lkZWJhclNlcnZpY2UgIH0gZnJvbSAnLi9hcHAtc2lkZWJhci5zZXJ2aWNlJztcclxuXHJcbi8vIEFwcCBTaWRlYmFyTmF2IENvbXBvbmVudFxyXG5pbXBvcnQgeyBOYXZEcm9wZG93bkRpcmVjdGl2ZSwgTmF2RHJvcGRvd25Ub2dnbGVEaXJlY3RpdmUgfSBmcm9tICcuL2FwcC1zaWRlYmFyLW5hdi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBBcHBTaWRlYmFyTmF2Q29tcG9uZW50IH0gZnJvbSAnLi9hcHAtc2lkZWJhci1uYXYuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXBwU2lkZWJhck5hdkRpdmlkZXJDb21wb25lbnQgfSBmcm9tICcuL2FwcC1zaWRlYmFyLW5hdi9hcHAtc2lkZWJhci1uYXYtZGl2aWRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBcHBTaWRlYmFyTmF2RHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL2FwcC1zaWRlYmFyLW5hdi9hcHAtc2lkZWJhci1uYXYtZHJvcGRvd24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXBwU2lkZWJhck5hdkl0ZW1zQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAtc2lkZWJhci1uYXYvYXBwLXNpZGViYXItbmF2LWl0ZW1zLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFwcFNpZGViYXJOYXZMaW5rQ29tcG9uZW50LCBBcHBTaWRlYmFyTmF2TGlua0NvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2FwcC1zaWRlYmFyLW5hdi9hcHAtc2lkZWJhci1uYXYtbGluay5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBcHBTaWRlYmFyTmF2VGl0bGVDb21wb25lbnQgfSBmcm9tICcuL2FwcC1zaWRlYmFyLW5hdi9hcHAtc2lkZWJhci1uYXYtdGl0bGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2lkZWJhck5hdkhlbHBlciB9IGZyb20gJy4vYXBwLXNpZGViYXItbmF2LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBcHBTaWRlYmFyTmF2TGFiZWxDb21wb25lbnQgfSBmcm9tICcuL2FwcC1zaWRlYmFyLW5hdi9hcHAtc2lkZWJhci1uYXYtbGFiZWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXBwU2lkZWJhck5hdkljb25QaXBlIH0gZnJvbSAnLi9hcHAtc2lkZWJhci1uYXYvYXBwLXNpZGViYXItbmF2LWljb24ucGlwZSc7XHJcbmltcG9ydCB7IEFwcFNpZGViYXJOYXZCYWRnZVBpcGUgfSBmcm9tICcuL2FwcC1zaWRlYmFyLW5hdi9hcHAtc2lkZWJhci1uYXYtYmFkZ2UucGlwZSc7XHJcbmltcG9ydCB7IEFwcFNpZGViYXJOYXZMaW5rUGlwZSB9IGZyb20gJy4vYXBwLXNpZGViYXItbmF2L2FwcC1zaWRlYmFyLW5hdi1saW5rLnBpcGUnO1xyXG5pbXBvcnQgeyBBcHBTaWRlYmFyTmF2SXRlbUNsYXNzUGlwZSB9IGZyb20gJy4vYXBwLXNpZGViYXItbmF2L2FwcC1zaWRlYmFyLW5hdi1pdGVtLWNsYXNzLnBpcGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUsXHJcbiAgICBMYXlvdXRNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEFwcFNpZGViYXJGb290ZXJDb21wb25lbnQsXHJcbiAgICBBcHBTaWRlYmFyRm9ybUNvbXBvbmVudCxcclxuICAgIEFwcFNpZGViYXJIZWFkZXJDb21wb25lbnQsXHJcbiAgICBBcHBTaWRlYmFyTWluaW1pemVyQ29tcG9uZW50LFxyXG4gICAgQXBwU2lkZWJhckNvbXBvbmVudCxcclxuICAgIEFwcFNpZGViYXJOYXZJdGVtc0NvbXBvbmVudCxcclxuICAgIEFwcFNpZGViYXJOYXZDb21wb25lbnQsXHJcbiAgICBBcHBTaWRlYmFyTmF2RGl2aWRlckNvbXBvbmVudCxcclxuICAgIEFwcFNpZGViYXJOYXZEcm9wZG93bkNvbXBvbmVudCxcclxuICAgIEFwcFNpZGViYXJOYXZMYWJlbENvbXBvbmVudCxcclxuICAgIEFwcFNpZGViYXJOYXZMaW5rQ29tcG9uZW50LFxyXG4gICAgQXBwU2lkZWJhck5hdkxpbmtDb250ZW50Q29tcG9uZW50LFxyXG4gICAgQXBwU2lkZWJhck5hdlRpdGxlQ29tcG9uZW50LFxyXG4gICAgTmF2RHJvcGRvd25EaXJlY3RpdmUsXHJcbiAgICBOYXZEcm9wZG93blRvZ2dsZURpcmVjdGl2ZSxcclxuICAgIExheW91dE1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBBcHBTaWRlYmFyRm9vdGVyQ29tcG9uZW50LFxyXG4gICAgQXBwU2lkZWJhckZvcm1Db21wb25lbnQsXHJcbiAgICBBcHBTaWRlYmFySGVhZGVyQ29tcG9uZW50LFxyXG4gICAgQXBwU2lkZWJhck1pbmltaXplckNvbXBvbmVudCxcclxuICAgIEFwcFNpZGViYXJNaW5pbWl6ZXJDb21wb25lbnQsXHJcbiAgICBBcHBTaWRlYmFyQ29tcG9uZW50LFxyXG4gICAgQXBwU2lkZWJhck5hdkl0ZW1zQ29tcG9uZW50LFxyXG4gICAgQXBwU2lkZWJhck5hdkNvbXBvbmVudCxcclxuICAgIEFwcFNpZGViYXJOYXZEaXZpZGVyQ29tcG9uZW50LFxyXG4gICAgQXBwU2lkZWJhck5hdkRyb3Bkb3duQ29tcG9uZW50LFxyXG4gICAgQXBwU2lkZWJhck5hdkxpbmtDb21wb25lbnQsXHJcbiAgICBBcHBTaWRlYmFyTmF2TGlua0NvbnRlbnRDb21wb25lbnQsXHJcbiAgICBBcHBTaWRlYmFyTmF2VGl0bGVDb21wb25lbnQsXHJcbiAgICBOYXZEcm9wZG93bkRpcmVjdGl2ZSxcclxuICAgIE5hdkRyb3Bkb3duVG9nZ2xlRGlyZWN0aXZlLFxyXG4gICAgQXBwU2lkZWJhck5hdkxhYmVsQ29tcG9uZW50LFxyXG4gICAgQXBwU2lkZWJhck5hdkljb25QaXBlLFxyXG4gICAgQXBwU2lkZWJhck5hdkJhZGdlUGlwZSxcclxuICAgIEFwcFNpZGViYXJOYXZMaW5rUGlwZSxcclxuICAgIEFwcFNpZGViYXJOYXZJdGVtQ2xhc3NQaXBlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIFNpZGViYXJOYXZIZWxwZXIsXHJcbiAgICBBcHBTaWRlYmFyU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcFNpZGViYXJNb2R1bGUgeyB9XHJcbiJdfQ==