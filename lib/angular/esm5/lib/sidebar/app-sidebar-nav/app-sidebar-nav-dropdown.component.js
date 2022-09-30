import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { SidebarNavHelper } from '../app-sidebar-nav.service';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '../app-sidebar-nav.directive';
import * as ɵngcc2 from '../../shared/layout/layout.directive';
import * as ɵngcc3 from '@angular/common';
import * as ɵngcc4 from './app-sidebar-nav-items.component';
import * as ɵngcc5 from './app-sidebar-nav-icon.pipe';
import * as ɵngcc6 from './app-sidebar-nav-badge.pipe';

function AppSidebarNavDropdownComponent_i_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "i", 3);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavIcon");
} if (rf & 2) {
    var ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 1, ctx_r0.item));
} }
function AppSidebarNavDropdownComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 3);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavBadge");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 2, ctx_r1.item));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r1.item.badge.text);
} }
var AppSidebarNavDropdownComponent = /** @class */ (function () {
    function AppSidebarNavDropdownComponent(helper) {
        this.helper = helper;
    }
    AppSidebarNavDropdownComponent.ctorParameters = function () { return [
        { type: SidebarNavHelper }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AppSidebarNavDropdownComponent.prototype, "item", void 0);
    AppSidebarNavDropdownComponent = __decorate([ __metadata("design:paramtypes", [SidebarNavHelper])
    ], AppSidebarNavDropdownComponent);
AppSidebarNavDropdownComponent.ɵfac = function AppSidebarNavDropdownComponent_Factory(t) { return new (t || AppSidebarNavDropdownComponent)(ɵngcc0.ɵɵdirectiveInject(SidebarNavHelper)); };
AppSidebarNavDropdownComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarNavDropdownComponent, selectors: [["app-sidebar-nav-dropdown"], ["cui-sidebar-nav-dropdown"]], inputs: { item: "item" }, features: [ɵngcc0.ɵɵProvidersFeature([SidebarNavHelper])], decls: 6, vars: 5, consts: [["appNavDropdownToggle", "", 1, "nav-link", "nav-dropdown-toggle", 3, "appHtmlAttr"], [3, "ngClass", 4, "ngIf"], [1, "nav-dropdown-items", 3, "items"], [3, "ngClass"]], template: function AppSidebarNavDropdownComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "a", 0);
        ɵngcc0.ɵɵtemplate(1, AppSidebarNavDropdownComponent_i_1_Template, 2, 3, "i", 1);
        ɵngcc0.ɵɵelementContainerStart(2);
        ɵngcc0.ɵɵtext(3);
        ɵngcc0.ɵɵelementContainerEnd();
        ɵngcc0.ɵɵtemplate(4, AppSidebarNavDropdownComponent_span_4_Template, 3, 4, "span", 1);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelement(5, "app-sidebar-nav-items", 2);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("appHtmlAttr", ctx.item.attributes);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.helper.hasIcon(ctx.item));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵtextInterpolate(ctx.item.name);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.helper.hasBadge(ctx.item));
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("items", ctx.item.children);
    } }, directives: [ɵngcc1.NavDropdownToggleDirective, ɵngcc2.HtmlAttributesDirective, ɵngcc3.NgIf, ɵngcc4.AppSidebarNavItemsComponent, ɵngcc3.NgClass], pipes: [ɵngcc5.AppSidebarNavIconPipe, ɵngcc6.AppSidebarNavBadgePipe], styles: [".nav-dropdown-toggle[_ngcontent-%COMP%] { cursor: pointer; }", ".nav-dropdown-items[_ngcontent-%COMP%] { display: block; }"] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavDropdownComponent, [{
        type: Component,
        args: [{
                selector: 'app-sidebar-nav-dropdown, cui-sidebar-nav-dropdown',
                template: "\n    <a class=\"nav-link nav-dropdown-toggle\"\n       appNavDropdownToggle\n       [appHtmlAttr]=\"item.attributes\">\n      <i *ngIf=\"helper.hasIcon(item)\" [ngClass]=\"item | appSidebarNavIcon\"></i>\n      <ng-container>{{item.name}}</ng-container>\n      <span *ngIf=\"helper.hasBadge(item)\" [ngClass]=\"item | appSidebarNavBadge\">{{ item.badge.text }}</span>\n    </a>\n    <app-sidebar-nav-items\n      class=\"nav-dropdown-items\"\n      [items]=\"item.children\">\n    </app-sidebar-nav-items>\n  ",
                providers: [SidebarNavHelper],
                styles: ['.nav-dropdown-toggle { cursor: pointer; }',
                    '.nav-dropdown-items { display: block; }']
            }]
    }], function () { return [{ type: SidebarNavHelper }]; }, { item: [{
            type: Input
        }] }); })();
    return AppSidebarNavDropdownComponent;
}());
export { AppSidebarNavDropdownComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1uYXYvYXBwLXNpZGViYXItbmF2LWRyb3Bkb3duLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFL0MsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCNUQ7SUFHRSx3Q0FDUyxNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUM3QixDQUFDOztnQkFEWSxnQkFBZ0I7O0lBSHhCO1FBQVIsS0FBSyxFQUFFOztnRUFBVztJQURSLDhCQUE4QixlQUMvQixTQXRCWCxTQUFTLENBQUMsY0FDVCxRQUFRLEVBQUUsM0NBb0JKLGtDQUlXLGdCQUFnQjtPQUp0Qiw4QkFBOEIsQ0FNMUM7RUExQitELGNBQzlELFFBQVEsRUFBRTs4VkFZVCxjQUtELFNBQVMsRUFBRSxDQUFFLGdCQUFnQixDQUFFLHVCQUg3QiwyQ0FBMkMsa0JBQzNDLHlDQUF5QyxXQUc1QyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQVFGO0lBREEscUNBQUM7Q0FBQSxBQU5ELElBTUM7U0FOWSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtTaWRlYmFyTmF2SGVscGVyfSBmcm9tICcuLi9hcHAtc2lkZWJhci1uYXYuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zaWRlYmFyLW5hdi1kcm9wZG93biwgY3VpLXNpZGViYXItbmF2LWRyb3Bkb3duJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGEgY2xhc3M9XCJuYXYtbGluayBuYXYtZHJvcGRvd24tdG9nZ2xlXCJcclxuICAgICAgIGFwcE5hdkRyb3Bkb3duVG9nZ2xlXHJcbiAgICAgICBbYXBwSHRtbEF0dHJdPVwiaXRlbS5hdHRyaWJ1dGVzXCI+XHJcbiAgICAgIDxpICpuZ0lmPVwiaGVscGVyLmhhc0ljb24oaXRlbSlcIiBbbmdDbGFzc109XCJpdGVtIHwgYXBwU2lkZWJhck5hdkljb25cIj48L2k+XHJcbiAgICAgIDxuZy1jb250YWluZXI+e3tpdGVtLm5hbWV9fTwvbmctY29udGFpbmVyPlxyXG4gICAgICA8c3BhbiAqbmdJZj1cImhlbHBlci5oYXNCYWRnZShpdGVtKVwiIFtuZ0NsYXNzXT1cIml0ZW0gfCBhcHBTaWRlYmFyTmF2QmFkZ2VcIj57eyBpdGVtLmJhZGdlLnRleHQgfX08L3NwYW4+XHJcbiAgICA8L2E+XHJcbiAgICA8YXBwLXNpZGViYXItbmF2LWl0ZW1zXHJcbiAgICAgIGNsYXNzPVwibmF2LWRyb3Bkb3duLWl0ZW1zXCJcclxuICAgICAgW2l0ZW1zXT1cIml0ZW0uY2hpbGRyZW5cIj5cclxuICAgIDwvYXBwLXNpZGViYXItbmF2LWl0ZW1zPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbXHJcbiAgICAnLm5hdi1kcm9wZG93bi10b2dnbGUgeyBjdXJzb3I6IHBvaW50ZXI7IH0nLFxyXG4gICAgJy5uYXYtZHJvcGRvd24taXRlbXMgeyBkaXNwbGF5OiBibG9jazsgfSdcclxuICBdLFxyXG4gIHByb3ZpZGVyczogWyBTaWRlYmFyTmF2SGVscGVyIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcFNpZGViYXJOYXZEcm9wZG93bkNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgaXRlbTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBoZWxwZXI6IFNpZGViYXJOYXZIZWxwZXJcclxuICApIHsgfVxyXG59XHJcbiJdfQ==