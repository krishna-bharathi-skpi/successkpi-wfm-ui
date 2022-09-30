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
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ctx_r0.getLabelIconClass());
} }
function AppSidebarNavLabelComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 2);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavBadge");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 2, ctx_r1.item));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r1.item.badge.text);
} }
let AppSidebarNavLabelComponent = class AppSidebarNavLabelComponent {
    constructor(helper) {
        this.helper = helper;
        this.classes = {
            'nav-label': true,
            active: true
        };
        this.iconClasses = {};
    }
    ngOnInit() {
        this.iconClasses = this.helper.getIconClass(this.item);
    }
    getItemClass() {
        const itemClass = this.item.class;
        this.classes[itemClass] = !!itemClass;
        return this.classes;
    }
    getLabelIconClass() {
        const variant = `text-${this.item.label.variant}`;
        this.iconClasses[variant] = !!this.item.label.variant;
        const labelClass = this.item.label.class;
        this.iconClasses[labelClass] = !!labelClass;
        return this.iconClasses;
    }
};
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
AppSidebarNavLabelComponent.ctorParameters = () => [
    { type: SidebarNavHelper }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], AppSidebarNavLabelComponent.prototype, "item", void 0);
AppSidebarNavLabelComponent = __decorate([ __metadata("design:paramtypes", [SidebarNavHelper])
], AppSidebarNavLabelComponent);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavLabelComponent, [{
        type: Component,
        args: [{
                selector: 'app-sidebar-nav-label, cui-sidebar-nav-label',
                template: "<a [ngClass]=\"getItemClass()\"\r\n   href=\"{{item.url}}\"\r\n   [appHtmlAttr]=\"item.attributes\">\r\n  <i *ngIf=\"helper.hasIcon(item)\" [ngClass]=\"getLabelIconClass()\"></i>\r\n  <ng-container>{{item.name}}</ng-container>\r\n  <span *ngIf=\"helper.hasBadge(item)\" [ngClass]=\"item | appSidebarNavBadge\">{{ item.badge.text }}</span>\r\n</a>\r\n"
            }]
    }], function () { return [{ type: SidebarNavHelper }]; }, { item: [{
            type: Input
        }] }); })();
export { AppSidebarNavLabelComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1uYXYvYXBwLXNpZGViYXItbmF2LWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTTVELElBQWEsMkJBQTJCLEdBQXhDLE1BQWEsMkJBQTJCO0lBU3RDLFlBQ1MsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFQekIsWUFBTyxHQUFHO1lBQ2hCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQztRQUNNLGdCQUFXLEdBQUcsRUFBRSxDQUFDO0lBSXJCLENBQUM7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELFlBQVk7UUFDVixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDdEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxpQkFBaUI7UUFDZixNQUFNLE9BQU8sR0FBRyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUN0RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQzVDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0pBQUE7O1lBbkJrQixnQkFBZ0I7O0FBVHhCO0lBQVIsS0FBSyxFQUFFOzt5REFBVztBQURSLDJCQUEyQixlQUFlLEtBSnRELFNBQVMsQ0FBQyxVQUNULFFBQVEsRUFBRSxuQ0FHUixrQ0FVZSxnQkFBZ0I7NEJBYnVCLHpCQUc3QywyQkFBMkIsQ0E2QnZDO0tBL0JDOzs7O3FLQUFxRCxNQUN0RCxDQUFDOzs7O29CQStCRjtTQTlCYSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7U2lkZWJhck5hdkhlbHBlcn0gZnJvbSAnLi4vYXBwLXNpZGViYXItbmF2LnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc2lkZWJhci1uYXYtbGFiZWwsIGN1aS1zaWRlYmFyLW5hdi1sYWJlbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC1zaWRlYmFyLW5hdi1sYWJlbC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcFNpZGViYXJOYXZMYWJlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgaXRlbTogYW55O1xyXG5cclxuICBwcml2YXRlIGNsYXNzZXMgPSB7XHJcbiAgICAnbmF2LWxhYmVsJzogdHJ1ZSxcclxuICAgIGFjdGl2ZTogdHJ1ZVxyXG4gIH07XHJcbiAgcHJpdmF0ZSBpY29uQ2xhc3NlcyA9IHt9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBoZWxwZXI6IFNpZGViYXJOYXZIZWxwZXJcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuaWNvbkNsYXNzZXMgPSB0aGlzLmhlbHBlci5nZXRJY29uQ2xhc3ModGhpcy5pdGVtKTtcclxuICB9XHJcblxyXG4gIGdldEl0ZW1DbGFzcygpIHtcclxuICAgIGNvbnN0IGl0ZW1DbGFzcyA9IHRoaXMuaXRlbS5jbGFzcztcclxuICAgIHRoaXMuY2xhc3Nlc1tpdGVtQ2xhc3NdID0gISFpdGVtQ2xhc3M7XHJcbiAgICByZXR1cm4gdGhpcy5jbGFzc2VzO1xyXG4gIH1cclxuICBnZXRMYWJlbEljb25DbGFzcygpIHtcclxuICAgIGNvbnN0IHZhcmlhbnQgPSBgdGV4dC0ke3RoaXMuaXRlbS5sYWJlbC52YXJpYW50fWA7XHJcbiAgICB0aGlzLmljb25DbGFzc2VzW3ZhcmlhbnRdID0gISF0aGlzLml0ZW0ubGFiZWwudmFyaWFudDtcclxuICAgIGNvbnN0IGxhYmVsQ2xhc3MgPSB0aGlzLml0ZW0ubGFiZWwuY2xhc3M7XHJcbiAgICB0aGlzLmljb25DbGFzc2VzW2xhYmVsQ2xhc3NdID0gISFsYWJlbENsYXNzO1xyXG4gICAgcmV0dXJuIHRoaXMuaWNvbkNsYXNzZXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==