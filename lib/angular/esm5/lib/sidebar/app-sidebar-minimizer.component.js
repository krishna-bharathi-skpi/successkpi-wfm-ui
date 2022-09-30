import { __decorate, __metadata } from "tslib";
import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { AppSidebarService } from './app-sidebar.service';
import * as ɵngcc0 from '@angular/core';
var AppSidebarMinimizerComponent = /** @class */ (function () {
    function AppSidebarMinimizerComponent(sidebarService) {
        this.sidebarService = sidebarService;
        this.role = 'button';
        this.sidebarMinimizerClass = true;
    }
    AppSidebarMinimizerComponent.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        this.sidebarService.toggle({ minimize: 'toggle' });
    };
    AppSidebarMinimizerComponent.ctorParameters = function () { return [
        { type: AppSidebarService }
    ]; };
    __decorate([
        HostBinding('attr.role'), Input(),
        __metadata("design:type", Object)
    ], AppSidebarMinimizerComponent.prototype, "role", void 0);
    __decorate([
        HostBinding('class.sidebar-minimizer'),
        __metadata("design:type", Object)
    ], AppSidebarMinimizerComponent.prototype, "sidebarMinimizerClass", void 0);
    __decorate([
        HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppSidebarMinimizerComponent.prototype, "toggleOpen", null);
    AppSidebarMinimizerComponent = __decorate([ __metadata("design:paramtypes", [AppSidebarService])
    ], AppSidebarMinimizerComponent);
AppSidebarMinimizerComponent.ɵfac = function AppSidebarMinimizerComponent_Factory(t) { return new (t || AppSidebarMinimizerComponent)(ɵngcc0.ɵɵdirectiveInject(AppSidebarService)); };
AppSidebarMinimizerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarMinimizerComponent, selectors: [["app-sidebar-minimizer"], ["cui-sidebar-minimizer"]], hostVars: 3, hostBindings: function AppSidebarMinimizerComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function AppSidebarMinimizerComponent_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } if (rf & 2) {
        ɵngcc0.ɵɵattribute("role", ctx.role);
        ɵngcc0.ɵɵclassProp("sidebar-minimizer", ctx.sidebarMinimizerClass);
    } }, inputs: { role: "role" }, decls: 0, vars: 0, template: function AppSidebarMinimizerComponent_Template(rf, ctx) { }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarMinimizerComponent, [{
        type: Component,
        args: [{
                selector: 'app-sidebar-minimizer, cui-sidebar-minimizer',
                template: ""
            }]
    }], function () { return [{ type: AppSidebarService }]; }, { role: [{
            type: HostBinding,
            args: ['attr.role']
        }, {
            type: Input
        }], sidebarMinimizerClass: [{
            type: HostBinding,
            args: ['class.sidebar-minimizer']
        }], toggleOpen: [{
            type: HostListener,
            args: ['click', ['$event']]
        }] }); })();
    return AppSidebarMinimizerComponent;
}());
export { AppSidebarMinimizerComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbWluaW1pemVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1taW5pbWl6ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQU0xRDtJQVdFLHNDQUNVLGNBQWlDO1FBQWpDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQVZSLFNBQUksR0FBRyxRQUFRLENBQUM7UUFDWCwwQkFBcUIsR0FBRyxJQUFJLENBQUM7SUFVakUsQ0FBQztJQVBMLGlEQUFVLEdBQVYsVUFBVyxNQUFXO1FBQ3BCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7O2dCQUd5QixpQkFBaUI7O0lBVlI7UUFBbEMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRTs7OERBQWlCO0lBQ1g7UUFBdkMsV0FBVyxDQUFDLHlCQUF5QixDQUFDOzsrRUFBOEI7SUFHckU7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7a0VBSWpDO0lBVFUsNEJBQTRCLGVBRTlCLFNBTlYsU0FBUyxDQUFDLGNBQ1QsUUFBUSxFQUFFLDNDQUdKLGtDQVlvQixpQkFBaUI7bUNBZmEsNUJBRzdDLDRCQUE0QixDQWN4QztXQWhCQyxRQUFRLEVBQUUsRUFBRSxVQUNiLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkFnQkY7SUFEQSxtQ0FBQztDQUFBLEFBZEQsSUFjQztTQWRZLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBBcHBTaWRlYmFyU2VydmljZSB9IGZyb20gJy4vYXBwLXNpZGViYXIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zaWRlYmFyLW1pbmltaXplciwgY3VpLXNpZGViYXItbWluaW1pemVyJyxcclxuICB0ZW1wbGF0ZTogYGBcclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcFNpZGViYXJNaW5pbWl6ZXJDb21wb25lbnQge1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpIEBJbnB1dCgpIHJvbGUgPSAnYnV0dG9uJztcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpZGViYXItbWluaW1pemVyJykgc2lkZWJhck1pbmltaXplckNsYXNzID0gdHJ1ZTtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gIHRvZ2dsZU9wZW4oJGV2ZW50OiBhbnkpIHtcclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5zaWRlYmFyU2VydmljZS50b2dnbGUoe21pbmltaXplOiAndG9nZ2xlJ30pO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHNpZGViYXJTZXJ2aWNlOiBBcHBTaWRlYmFyU2VydmljZVxyXG4gICkgeyB9XHJcbn1cclxuIl19