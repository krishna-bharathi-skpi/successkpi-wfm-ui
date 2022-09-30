import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { SidebarNavHelper } from '../app-sidebar-nav.service';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '../../shared/layout/layout.directive';
import * as ɵngcc3 from './app-sidebar-nav-badge.pipe';

function AppSidebarNavLabelComponent_i_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "i", 2);
} if (rf & 2) {
    var ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ctx_r0.getLabelIconClass());
} }
function AppSidebarNavLabelComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 2);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavBadge");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 2, ctx_r1.item));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r1.item.badge.text);
} }
var AppSidebarNavLabelComponent = /** @class */ (function () {
    function AppSidebarNavLabelComponent(helper) {
        this.helper = helper;
        this.classes = {
            'nav-label': true,
            active: true
        };
        this.iconClasses = {};
    }
    AppSidebarNavLabelComponent.prototype.ngOnInit = function () {
        this.iconClasses = this.helper.getIconClass(this.item);
    };
    AppSidebarNavLabelComponent.prototype.getItemClass = function () {
        var itemClass = this.item.class;
        this.classes[itemClass] = !!itemClass;
        return this.classes;
    };
    AppSidebarNavLabelComponent.prototype.getLabelIconClass = function () {
        var variant = "text-" + this.item.label.variant;
        this.iconClasses[variant] = !!this.item.label.variant;
        var labelClass = this.item.label.class;
        this.iconClasses[labelClass] = !!labelClass;
        return this.iconClasses;
    };
    AppSidebarNavLabelComponent.ctorParameters = function () { return [
        { type: SidebarNavHelper }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AppSidebarNavLabelComponent.prototype, "item", void 0);
    AppSidebarNavLabelComponent = __decorate([ __metadata("design:paramtypes", [SidebarNavHelper])
    ], AppSidebarNavLabelComponent);
AppSidebarNavLabelComponent.ɵfac = function AppSidebarNavLabelComponent_Factory(t) { return new (t || AppSidebarNavLabelComponent)(ɵngcc0.ɵɵdirectiveInject(SidebarNavHelper)); };
AppSidebarNavLabelComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarNavLabelComponent, selectors: [["app-sidebar-nav-label"], ["cui-sidebar-nav-label"]], inputs: { item: "item" }, decls: 5, vars: 6, consts: [[3, "ngClass", "href", "appHtmlAttr"], [3, "ngClass", 4, "ngIf"], [3, "ngClass"]], template: function AppSidebarNavLabelComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "a", 0);
        ɵngcc0.ɵɵtemplate(1, AppSidebarNavLabelComponent_i_1_Template, 1, 1, "i", 1);
        ɵngcc0.ɵɵelementContainerStart(2);
        ɵngcc0.ɵɵtext(3);
        ɵngcc0.ɵɵelementContainerEnd();
        ɵngcc0.ɵɵtemplate(4, AppSidebarNavLabelComponent_span_4_Template, 3, 4, "span", 1);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵpropertyInterpolate("href", ctx.item.url, ɵngcc0.ɵɵsanitizeUrl);
        ɵngcc0.ɵɵproperty("ngClass", ctx.getItemClass())("appHtmlAttr", ctx.item.attributes);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.helper.hasIcon(ctx.item));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵtextInterpolate(ctx.item.name);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.helper.hasBadge(ctx.item));
    } }, directives: [ɵngcc1.NgClass, ɵngcc2.HtmlAttributesDirective, ɵngcc1.NgIf], pipes: [ɵngcc3.AppSidebarNavBadgePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavLabelComponent, [{
        type: Component,
        args: [{
                selector: 'app-sidebar-nav-label, cui-sidebar-nav-label',
                template: "<a [ngClass]=\"getItemClass()\"\r\n   href=\"{{item.url}}\"\r\n   [appHtmlAttr]=\"item.attributes\">\r\n  <i *ngIf=\"helper.hasIcon(item)\" [ngClass]=\"getLabelIconClass()\"></i>\r\n  <ng-container>{{item.name}}</ng-container>\r\n  <span *ngIf=\"helper.hasBadge(item)\" [ngClass]=\"item | appSidebarNavBadge\">{{ item.badge.text }}</span>\r\n</a>\r\n"
            }]
    }], function () { return [{ type: SidebarNavHelper }]; }, { item: [{
            type: Input
        }] }); })();
    return AppSidebarNavLabelComponent;
}());
export { AppSidebarNavLabelComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1uYXYvYXBwLXNpZGViYXItbmF2LWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTTVEO0lBU0UscUNBQ1MsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFQekIsWUFBTyxHQUFHO1lBQ2hCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQztRQUNNLGdCQUFXLEdBQUcsRUFBRSxDQUFDO0lBSXJCLENBQUM7SUFFTCw4Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELGtEQUFZLEdBQVo7UUFDRSxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDdEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRCx1REFBaUIsR0FBakI7UUFDRSxJQUFNLE9BQU8sR0FBRyxVQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVMsQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDdEQsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQzs7Z0JBbEJnQixnQkFBZ0I7O0lBVHhCO1FBQVIsS0FBSyxFQUFFOzs2REFBVztJQURSLDJCQUEyQixlQUFlLFNBSnRELFNBQVMsQ0FBQyxjQUNULFFBQVEsRUFBRSwzQ0FHSixrQ0FVVyxnQkFBZ0I7b0NBYnVCLDdCQUc3QywyQkFBMkIsQ0E2QnZDO2FBL0JDO29NQUFxRCxVQUN0RCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkErQkY7SUFEQSxrQ0FBQztDQUFBLEFBN0JELElBNkJDO1NBN0JZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtTaWRlYmFyTmF2SGVscGVyfSBmcm9tICcuLi9hcHAtc2lkZWJhci1uYXYuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zaWRlYmFyLW5hdi1sYWJlbCwgY3VpLXNpZGViYXItbmF2LWxhYmVsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwLXNpZGViYXItbmF2LWxhYmVsLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwU2lkZWJhck5hdkxhYmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBpdGVtOiBhbnk7XHJcblxyXG4gIHByaXZhdGUgY2xhc3NlcyA9IHtcclxuICAgICduYXYtbGFiZWwnOiB0cnVlLFxyXG4gICAgYWN0aXZlOiB0cnVlXHJcbiAgfTtcclxuICBwcml2YXRlIGljb25DbGFzc2VzID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGhlbHBlcjogU2lkZWJhck5hdkhlbHBlclxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5pY29uQ2xhc3NlcyA9IHRoaXMuaGVscGVyLmdldEljb25DbGFzcyh0aGlzLml0ZW0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbUNsYXNzKCkge1xyXG4gICAgY29uc3QgaXRlbUNsYXNzID0gdGhpcy5pdGVtLmNsYXNzO1xyXG4gICAgdGhpcy5jbGFzc2VzW2l0ZW1DbGFzc10gPSAhIWl0ZW1DbGFzcztcclxuICAgIHJldHVybiB0aGlzLmNsYXNzZXM7XHJcbiAgfVxyXG4gIGdldExhYmVsSWNvbkNsYXNzKCkge1xyXG4gICAgY29uc3QgdmFyaWFudCA9IGB0ZXh0LSR7dGhpcy5pdGVtLmxhYmVsLnZhcmlhbnR9YDtcclxuICAgIHRoaXMuaWNvbkNsYXNzZXNbdmFyaWFudF0gPSAhIXRoaXMuaXRlbS5sYWJlbC52YXJpYW50O1xyXG4gICAgY29uc3QgbGFiZWxDbGFzcyA9IHRoaXMuaXRlbS5sYWJlbC5jbGFzcztcclxuICAgIHRoaXMuaWNvbkNsYXNzZXNbbGFiZWxDbGFzc10gPSAhIWxhYmVsQ2xhc3M7XHJcbiAgICByZXR1cm4gdGhpcy5pY29uQ2xhc3NlcztcclxuICB9XHJcbn1cclxuIl19