import { __decorate, __metadata } from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/router';
import * as ɵngcc2 from './app-sidebar-nav/app-sidebar-nav-items.component';
let AppSidebarNavComponent = class AppSidebarNavComponent {
    constructor(router) {
        this.router = router;
        this.navItems = [];
        this.sidebarNavClass = true;
        this.role = 'nav';
        this.navItemsArray = [];
    }
    ngOnChanges(changes) {
        this.navItemsArray = Array.isArray(this.navItems) ? this.navItems.slice() : [];
    }
};
AppSidebarNavComponent.ɵfac = function AppSidebarNavComponent_Factory(t) { return new (t || AppSidebarNavComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.Router)); };
AppSidebarNavComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarNavComponent, selectors: [["app-sidebar-nav"], ["cui-sidebar-nav"]], hostVars: 3, hostBindings: function AppSidebarNavComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵattribute("role", ctx.role);
        ɵngcc0.ɵɵclassProp("sidebar-nav", ctx.sidebarNavClass);
    } }, inputs: { navItems: "navItems", role: "role" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[1, "nav", 3, "items"]], template: function AppSidebarNavComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "app-sidebar-nav-items", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("items", ctx.navItemsArray);
    } }, directives: [ɵngcc2.AppSidebarNavItemsComponent], encapsulation: 2 });
AppSidebarNavComponent.ctorParameters = () => [
    { type: Router }
];
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
export { AppSidebarNavComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LmNvbXBvbmVudC5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1uYXYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQVF6QyxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQVFqQyxZQUNTLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBUmQsYUFBUSxHQUFlLEVBQUUsQ0FBQztRQUVELG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLFNBQUksR0FBRyxLQUFLLENBQUM7UUFFekMsa0JBQWEsR0FBZSxFQUFFLENBQUM7SUFJbEMsQ0FBQztJQUVFLFdBQVcsQ0FBQyxPQUFzQjtRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDakYsQ0FBQztDQUNGOzs7Ozs7Ozs7K0VBQUE7O1lBTmtCLE1BQU07O0FBUmQ7SUFBUixLQUFLLEVBQUU7O3dEQUEyQjtBQUVEO0lBQWpDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQzs7K0RBQXdCO0FBQ3RCO0lBQWxDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUU7O29EQUFjO0FBSnJDLHNCQUFzQixlQUFlLEtBSmpELFNBQVMsQ0FBQyxVQUNULFFBQVEsRUFBRSxuQ0FHUixrQ0FTZSxNQUFNOzBCQVpxQix2QkFHakMsc0JBQXNCLENBZWxDO1FBakJDOztXQUErQztBQUNoRCxDQUFDOzs7Ozs7Ozs7Ozs7O29CQWlCRjtTQWhCYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBJTmF2RGF0YSB9IGZyb20gJy4vYXBwLXNpZGViYXItbmF2JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXNpZGViYXItbmF2LCBjdWktc2lkZWJhci1uYXYnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAtc2lkZWJhci1uYXYuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBTaWRlYmFyTmF2Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBuYXZJdGVtczogSU5hdkRhdGFbXSA9IFtdO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpZGViYXItbmF2Jykgc2lkZWJhck5hdkNsYXNzID0gdHJ1ZTtcclxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpIEBJbnB1dCgpIHJvbGUgPSAnbmF2JztcclxuXHJcbiAgcHVibGljIG5hdkl0ZW1zQXJyYXk6IElOYXZEYXRhW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXIsXHJcbiAgKSB7IH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMubmF2SXRlbXNBcnJheSA9IEFycmF5LmlzQXJyYXkodGhpcy5uYXZJdGVtcykgPyB0aGlzLm5hdkl0ZW1zLnNsaWNlKCkgOiBbXTtcclxuICB9XHJcbn1cclxuIl19