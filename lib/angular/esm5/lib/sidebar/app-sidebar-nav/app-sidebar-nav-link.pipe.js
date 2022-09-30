import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
var AppSidebarNavLinkPipe = /** @class */ (function () {
    function AppSidebarNavLinkPipe() {
    }
    AppSidebarNavLinkPipe.prototype.transform = function (item) {
        var classes = { 'nav-link': true };
        var disabled = item.attributes && item.attributes.disabled;
        classes['disabled'] = disabled;
        classes['btn-link'] = disabled;
        classes["nav-link-" + item.variant] = !!item.variant;
        return classes;
    };
AppSidebarNavLinkPipe.ɵfac = function AppSidebarNavLinkPipe_Factory(t) { return new (t || AppSidebarNavLinkPipe)(); };
AppSidebarNavLinkPipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "appSidebarNavLink", type: AppSidebarNavLinkPipe, pure: true });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavLinkPipe, [{
        type: Pipe,
        args: [{
                name: 'appSidebarNavLink'
            }]
    }], function () { return []; }, null); })();
    return AppSidebarNavLinkPipe;
}());
export { AppSidebarNavLinkPipe };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LWxpbmsucGlwZS5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1uYXYvYXBwLXNpZGViYXItbmF2LWxpbmsucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBS3BEO0lBQUE7SUFZQSxDQUFDO0lBVkMseUNBQVMsR0FBVCxVQUFVLElBQVM7UUFFakIsSUFBTSxPQUFPLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFckMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUM3RCxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDL0IsT0FBTyxDQUFDLGNBQVksSUFBSSxDQUFDLE9BQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3JELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUMsQ0FDSDtJQVphLHFCQUFxQix3QkFIakMsSUFBSSxDQUFDLGNBQ0osSUFBSSxFQUFFLG1CQUFtQixVQUMxQixDQUFDLFFBQ1c7Y0FBcUIsQ0FZakM7Ozs7OztnREFDRDtJQURBLDRCQUFDO0NBQUEsQUFaRCxJQVlDO1NBWlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdhcHBTaWRlYmFyTmF2TGluaydcclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcFNpZGViYXJOYXZMaW5rUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICB0cmFuc2Zvcm0oaXRlbTogYW55KTogYW55IHtcclxuXHJcbiAgICBjb25zdCBjbGFzc2VzID0geyAnbmF2LWxpbmsnOiB0cnVlIH07XHJcblxyXG4gICAgY29uc3QgZGlzYWJsZWQgPSBpdGVtLmF0dHJpYnV0ZXMgJiYgaXRlbS5hdHRyaWJ1dGVzLmRpc2FibGVkO1xyXG4gICAgY2xhc3Nlc1snZGlzYWJsZWQnXSA9IGRpc2FibGVkO1xyXG4gICAgY2xhc3Nlc1snYnRuLWxpbmsnXSA9IGRpc2FibGVkO1xyXG4gICAgY2xhc3Nlc1tgbmF2LWxpbmstJHtpdGVtLnZhcmlhbnR9YF0gPSAhIWl0ZW0udmFyaWFudDtcclxuICAgIHJldHVybiBjbGFzc2VzO1xyXG4gIH1cclxufVxyXG4iXX0=