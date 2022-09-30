import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsideToggleDirective, BrandMinimizeDirective, MobileSidebarToggleDirective, SidebarToggleDirective, SidebarMinimizeDirective, SidebarOffCanvasCloseDirective, HtmlAttributesDirective } from './layout.directive';
import { ClassToggler } from '../toggle-classes';
import * as ɵngcc0 from '@angular/core';
let LayoutModule = class LayoutModule {
};
LayoutModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: LayoutModule });
LayoutModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function LayoutModule_Factory(t) { return new (t || LayoutModule)(); }, providers: [
        ClassToggler
    ], imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(LayoutModule, { declarations: function () { return [AsideToggleDirective,
        BrandMinimizeDirective,
        MobileSidebarToggleDirective,
        SidebarToggleDirective,
        SidebarMinimizeDirective,
        SidebarOffCanvasCloseDirective,
        HtmlAttributesDirective]; }, imports: function () { return [CommonModule]; }, exports: function () { return [AsideToggleDirective,
        BrandMinimizeDirective,
        MobileSidebarToggleDirective,
        SidebarToggleDirective,
        SidebarMinimizeDirective,
        SidebarOffCanvasCloseDirective,
        HtmlAttributesDirective]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(LayoutModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    AsideToggleDirective,
                    BrandMinimizeDirective,
                    MobileSidebarToggleDirective,
                    SidebarToggleDirective,
                    SidebarMinimizeDirective,
                    SidebarOffCanvasCloseDirective,
                    HtmlAttributesDirective
                ],
                declarations: [
                    AsideToggleDirective,
                    BrandMinimizeDirective,
                    MobileSidebarToggleDirective,
                    SidebarToggleDirective,
                    SidebarMinimizeDirective,
                    SidebarOffCanvasCloseDirective,
                    HtmlAttributesDirective
                ],
                providers: [
                    ClassToggler
                ]
            }]
    }], null, null); })();
export { LayoutModule };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2hhcmVkL2xheW91dC9sYXlvdXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLHNCQUFzQixFQUN0Qiw0QkFBNEIsRUFDNUIsc0JBQXNCLEVBQ3RCLHdCQUF3QixFQUN4Qiw4QkFBOEIsRUFDOUIsdUJBQXVCLEVBQ3hCLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQTRCakQsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtDQUFJOzs7Ozs7RUFBQSxDQUFoQjtBQUFZLG9CQTFCeEIsUUFBUSxDQUFDLFVBQ1IsT0FBTyxFQUFFLGNBQ1AsWUFBWSxVQUNiLFVBQ0QsT0FBTyxFQUFFLGNBQ1Asb0JBQW9CLGNBQ3BCO09BQXNCLGNBQ3RCO2lCQUE0QixjQUM1QjtlQUFzQixjQUN0QjtxQkFBd0I7Q0FDeEIsOEJBQThCO0tBQzlCLHVCQUF1QixVQUN4QixVQUNELFlBQVksRUFBRSxjQUNaLG9CQUFvQixjQUNwQixzQkFBc0I7T0FDdEI7R0FBNEIsY0FDNUI7Q0FBc0IsY0FDdEI7T0FBd0IsY0FDeEI7aUJBQThCLGNBQzlCO2NBQXVCLFVBQ3hCLFVBQ0QsU0FBUyxFQUFFO2FBQ1QsWUFBWSxVQUNiLE1BQ0YsQ0FBQyxJQUNXLFlBQVksQ0FBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFDN0I7U0FEYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEFzaWRlVG9nZ2xlRGlyZWN0aXZlLFxyXG4gIEJyYW5kTWluaW1pemVEaXJlY3RpdmUsXHJcbiAgTW9iaWxlU2lkZWJhclRvZ2dsZURpcmVjdGl2ZSxcclxuICBTaWRlYmFyVG9nZ2xlRGlyZWN0aXZlLFxyXG4gIFNpZGViYXJNaW5pbWl6ZURpcmVjdGl2ZSxcclxuICBTaWRlYmFyT2ZmQ2FudmFzQ2xvc2VEaXJlY3RpdmUsXHJcbiAgSHRtbEF0dHJpYnV0ZXNEaXJlY3RpdmVcclxufSBmcm9tICcuL2xheW91dC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBDbGFzc1RvZ2dsZXIgfSBmcm9tICcuLi90b2dnbGUtY2xhc3Nlcyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgQXNpZGVUb2dnbGVEaXJlY3RpdmUsXHJcbiAgICBCcmFuZE1pbmltaXplRGlyZWN0aXZlLFxyXG4gICAgTW9iaWxlU2lkZWJhclRvZ2dsZURpcmVjdGl2ZSxcclxuICAgIFNpZGViYXJUb2dnbGVEaXJlY3RpdmUsXHJcbiAgICBTaWRlYmFyTWluaW1pemVEaXJlY3RpdmUsXHJcbiAgICBTaWRlYmFyT2ZmQ2FudmFzQ2xvc2VEaXJlY3RpdmUsXHJcbiAgICBIdG1sQXR0cmlidXRlc0RpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBBc2lkZVRvZ2dsZURpcmVjdGl2ZSxcclxuICAgIEJyYW5kTWluaW1pemVEaXJlY3RpdmUsXHJcbiAgICBNb2JpbGVTaWRlYmFyVG9nZ2xlRGlyZWN0aXZlLFxyXG4gICAgU2lkZWJhclRvZ2dsZURpcmVjdGl2ZSxcclxuICAgIFNpZGViYXJNaW5pbWl6ZURpcmVjdGl2ZSxcclxuICAgIFNpZGViYXJPZmZDYW52YXNDbG9zZURpcmVjdGl2ZSxcclxuICAgIEh0bWxBdHRyaWJ1dGVzRGlyZWN0aXZlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENsYXNzVG9nZ2xlclxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIExheW91dE1vZHVsZSB7IH1cclxuIl19