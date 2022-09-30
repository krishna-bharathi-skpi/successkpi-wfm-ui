import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../shared/layout/layout.module';
import { AppHeaderComponent } from './app-header.component';
import * as ɵngcc0 from '@angular/core';
var AppHeaderModule = /** @class */ (function () {
    function AppHeaderModule() {
    }
AppHeaderModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: AppHeaderModule });
AppHeaderModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function AppHeaderModule_Factory(t) { return new (t || AppHeaderModule)(); }, imports: [[
            CommonModule,
            RouterModule,
            LayoutModule
        ],
        LayoutModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(AppHeaderModule, { declarations: function () { return [AppHeaderComponent]; }, imports: function () { return [CommonModule,
        RouterModule,
        LayoutModule]; }, exports: function () { return [AppHeaderComponent,
        LayoutModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppHeaderModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    RouterModule,
                    LayoutModule
                ],
                exports: [
                    AppHeaderComponent,
                    LayoutModule
                ],
                declarations: [
                    AppHeaderComponent
                ]
            }]
    }], function () { return []; }, null); })();
    return AppHeaderModule;
}());
export { AppHeaderModule };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWhlYWRlci5tb2R1bGUuanMiLCJzb3VyY2VzIjpbIm5nOi9AY29yZXVpL2FuZ3VsYXIvbGliL2hlYWRlci9hcHAtaGVhZGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFnQjVEO0lBQUE7SUFBOEIsQ0FBQztJQUFsQixlQUFlLHdCQWQzQixRQUFRLENBQUMsY0FDUixPQUFPO0FBQUUsa0JBQ1AsWUFBWSxrQkFDWixZQUFZLGtCQUNaLFlBQVksY0FDYixjQUNELE9BQU8sRUFBRSxrQkFDUDtlQUFrQjtPQUNsQixZQUFZO09BQ2IsY0FDRDtRQUFZLEVBQUU7aUJBQ1o7U0FBa0IsY0FDbkIsVUFDRixDQUFDLFFBQ1csZUFBZSxDQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnREFDL0I7SUFEOEIsc0JBQUM7Q0FBQSxBQUEvQixJQUErQjtTQUFsQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IExheW91dE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9sYXlvdXQvbGF5b3V0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IEFwcEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vYXBwLWhlYWRlci5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUsXHJcbiAgICBMYXlvdXRNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEFwcEhlYWRlckNvbXBvbmVudCxcclxuICAgIExheW91dE1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBBcHBIZWFkZXJDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBIZWFkZXJNb2R1bGUge31cclxuIl19