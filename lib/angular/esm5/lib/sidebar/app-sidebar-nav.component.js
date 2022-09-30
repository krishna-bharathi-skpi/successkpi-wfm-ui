import { __decorate, __metadata } from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/router';
import * as ɵngcc2 from './app-sidebar-nav/app-sidebar-nav-items.component';
var AppSidebarNavComponent = /** @class */ (function () {
    function AppSidebarNavComponent(router) {
        this.router = router;
        this.navItems = [];
        this.sidebarNavClass = true;
        this.role = 'nav';
        this.navItemsArray = [];
    }
    AppSidebarNavComponent.prototype.ngOnChanges = function (changes) {
        this.navItemsArray = Array.isArray(this.navItems) ? this.navItems.slice() : [];
    };
    AppSidebarNavComponent.ctorParameters = function () { return [
        { type: Router }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AppSidebarNavComponent.prototype, "navItems", void 0);
    __decorate([
        HostBinding('class.sidebar-nav'),
        __metadata("design:type", Object)
    ], AppSidebarNavComponent.prototype, "sidebarNavClass", void 0);
    __decorate([
        HostBinding('attr.role'), Input(),
        __metadata("design:type", Object)
    ], AppSidebarNavComponent.prototype, "role", void 0);
    AppSidebarNavComponent = __decorate([ __metadata("design:paramtypes", [Router])
    ], AppSidebarNavComponent);
AppSidebarNavComponent.ɵfac = function AppSidebarNavComponent_Factory(t) { return new (t || AppSidebarNavComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.Router)); };
AppSidebarNavComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarNavComponent, selectors: [["app-sidebar-nav"], ["cui-sidebar-nav"]], hostVars: 3, hostBindings: function AppSidebarNavComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵattribute("role", ctx.role);
        ɵngcc0.ɵɵclassProp("sidebar-nav", ctx.sidebarNavClass);
    } }, inputs: { navItems: "navItems", role: "role" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[1, "nav", 3, "items"]], template: function AppSidebarNavComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "app-sidebar-nav-items", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("items", ctx.navItemsArray);
    } }, directives: [ɵngcc2.AppSidebarNavItemsComponent], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavComponent, [{
        type: Component,
        args: [{
                selector: 'app-sidebar-nav, cui-sidebar-nav',
                template: "<app-sidebar-nav-items\n  class=\"nav\"\n  [items]=\"navItemsArray\">\n</app-sidebar-nav-items>\n"
            }]
    }], function () { return [{ type: ɵngcc1.Router }]; }, { navItems: [{
            type: Input
        }], sidebarNavClass: [{
            type: HostBinding,
            args: ['class.sidebar-nav']
        }], role: [{
            type: HostBinding,
            args: ['attr.role']
        }, {
            type: Input
        }] }); })();
    return AppSidebarNavComponent;
}());
export { AppSidebarNavComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LmNvbXBvbmVudC5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1uYXYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQVF6QztJQVFFLGdDQUNTLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBUmQsYUFBUSxHQUFlLEVBQUUsQ0FBQztRQUVELG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLFNBQUksR0FBRyxLQUFLLENBQUM7UUFFekMsa0JBQWEsR0FBZSxFQUFFLENBQUM7SUFJbEMsQ0FBQztJQUVFLDRDQUFXLEdBQWxCLFVBQW1CLE9BQXNCO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNqRixDQUFDOztnQkFMZ0IsTUFBTTs7SUFSZDtRQUFSLEtBQUssRUFBRTs7NERBQTJCO0lBRUQ7UUFBakMsV0FBVyxDQUFDLG1CQUFtQixDQUFDOzttRUFBd0I7SUFDdEI7UUFBbEMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRTs7d0RBQWM7SUFKckMsc0JBQXNCLGVBQWUsU0FKakQsU0FBUyxDQUFDLGNBQ1QsUUFBUSx6Q0FHRixrQ0FTVyxNQUFNO0FBWmIsT0FHQyxzQkFBc0IsQ0FlbEM7RUFsQjZDLGNBQzVDLDZHQUErQyxVQUNoRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQWlCRjtJQURBLDZCQUFDO0NBQUEsQUFmRCxJQWVDO1NBZlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgSU5hdkRhdGEgfSBmcm9tICcuL2FwcC1zaWRlYmFyLW5hdic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zaWRlYmFyLW5hdiwgY3VpLXNpZGViYXItbmF2JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwLXNpZGViYXItbmF2LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwU2lkZWJhck5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgbmF2SXRlbXM6IElOYXZEYXRhW10gPSBbXTtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaWRlYmFyLW5hdicpIHNpZGViYXJOYXZDbGFzcyA9IHRydWU7XHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKSBASW5wdXQoKSByb2xlID0gJ25hdic7XHJcblxyXG4gIHB1YmxpYyBuYXZJdGVtc0FycmF5OiBJTmF2RGF0YVtdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHJvdXRlcjogUm91dGVyLFxyXG4gICkgeyB9XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLm5hdkl0ZW1zQXJyYXkgPSBBcnJheS5pc0FycmF5KHRoaXMubmF2SXRlbXMpID8gdGhpcy5uYXZJdGVtcy5zbGljZSgpIDogW107XHJcbiAgfVxyXG59XHJcbiJdfQ==