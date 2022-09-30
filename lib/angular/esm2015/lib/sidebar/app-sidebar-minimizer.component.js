import { __decorate, __metadata } from "tslib";
import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { AppSidebarService } from './app-sidebar.service';
import * as ɵngcc0 from '@angular/core';
let AppSidebarMinimizerComponent = class AppSidebarMinimizerComponent {
    constructor(sidebarService) {
        this.sidebarService = sidebarService;
        this.role = 'button';
        this.sidebarMinimizerClass = true;
    }
    toggleOpen($event) {
        $event.preventDefault();
        this.sidebarService.toggle({ minimize: 'toggle' });
    }
};
AppSidebarMinimizerComponent.ɵfac = function AppSidebarMinimizerComponent_Factory(t) { return new (t || AppSidebarMinimizerComponent)(ɵngcc0.ɵɵdirectiveInject(AppSidebarService)); };
AppSidebarMinimizerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarMinimizerComponent, selectors: [["app-sidebar-minimizer"], ["cui-sidebar-minimizer"]], hostVars: 3, hostBindings: function AppSidebarMinimizerComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function AppSidebarMinimizerComponent_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } if (rf & 2) {
        ɵngcc0.ɵɵattribute("role", ctx.role);
        ɵngcc0.ɵɵclassProp("sidebar-minimizer", ctx.sidebarMinimizerClass);
    } }, inputs: { role: "role" }, decls: 0, vars: 0, template: function AppSidebarMinimizerComponent_Template(rf, ctx) { }, encapsulation: 2 });
AppSidebarMinimizerComponent.ctorParameters = () => [
    { type: AppSidebarService }
];
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
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarMinimizerComponent, [{
        type: Component,
        args: [{
                selector: 'app-sidebar-minimizer, cui-sidebar-minimizer',
                template: ``
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
export { AppSidebarMinimizerComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbWluaW1pemVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1taW5pbWl6ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQU0xRCxJQUFhLDRCQUE0QixHQUF6QyxNQUFhLDRCQUE0QjtJQVd2QyxZQUNVLGNBQWlDO1FBQWpDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQVZSLFNBQUksR0FBRyxRQUFRLENBQUM7UUFDWCwwQkFBcUIsR0FBRyxJQUFJLENBQUM7SUFVakUsQ0FBQztJQVBMLFVBQVUsQ0FBQyxNQUFXO1FBQ3BCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FLRjs7Ozs7OztpSkFBQTs7WUFGMkIsaUJBQWlCOztBQVZSO0lBQWxDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUU7OzBEQUFpQjtBQUNYO0lBQXZDLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQzs7MkVBQThCO0FBR3JFO0lBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OzhEQUlqQztBQVRVLDRCQUE0QixlQUU5QixLQU5WLFNBQVMsQ0FBQyxVQUNULFFBQVEsRUFBRSxuQ0FHUixrQ0FZd0IsaUJBQWlCOzJCQWZhLHhCQUc3Qyw0QkFBNEIsQ0FjeEM7R0FoQkMsUUFBUSxFQUFFLEVBQUUsTUFDYixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztvQkFnQkY7U0FmYSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQXBwU2lkZWJhclNlcnZpY2UgfSBmcm9tICcuL2FwcC1zaWRlYmFyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc2lkZWJhci1taW5pbWl6ZXIsIGN1aS1zaWRlYmFyLW1pbmltaXplcicsXHJcbiAgdGVtcGxhdGU6IGBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBTaWRlYmFyTWluaW1pemVyQ29tcG9uZW50IHtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKSBASW5wdXQoKSByb2xlID0gJ2J1dHRvbic7XHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaWRlYmFyLW1pbmltaXplcicpIHNpZGViYXJNaW5pbWl6ZXJDbGFzcyA9IHRydWU7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICB0b2dnbGVPcGVuKCRldmVudDogYW55KSB7XHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuc2lkZWJhclNlcnZpY2UudG9nZ2xlKHttaW5pbWl6ZTogJ3RvZ2dsZSd9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBzaWRlYmFyU2VydmljZTogQXBwU2lkZWJhclNlcnZpY2VcclxuICApIHsgfVxyXG59XHJcbiJdfQ==