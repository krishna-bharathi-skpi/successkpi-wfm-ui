import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
var AppSidebarNavIconPipe = /** @class */ (function () {
    function AppSidebarNavIconPipe() {
    }
    AppSidebarNavIconPipe.prototype.transform = function (item, args) {
        var classes = {
            'nav-icon': true
        };
        var icon = item.icon;
        classes[icon] = !!item.icon;
        return classes;
    };
AppSidebarNavIconPipe.ɵfac = function AppSidebarNavIconPipe_Factory(t) { return new (t || AppSidebarNavIconPipe)(); };
AppSidebarNavIconPipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "appSidebarNavIcon", type: AppSidebarNavIconPipe, pure: true });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavIconPipe, [{
        type: Pipe,
        args: [{
                name: 'appSidebarNavIcon'
            }]
    }], function () { return []; }, null); })();
    return AppSidebarNavIconPipe;
}());
export { AppSidebarNavIconPipe };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LWljb24ucGlwZS5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1uYXYvYXBwLXNpZGViYXItbmF2LWljb24ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBS3BEO0lBQUE7SUFVQSxDQUFDO0lBUkMseUNBQVMsR0FBVCxVQUFVLElBQVMsRUFBRSxJQUFVO1FBQzdCLElBQU0sT0FBTyxHQUFHO1lBQ2QsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQztRQUNGLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzVCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUMsQ0FDSDtJQVZhLHFCQUFxQix3QkFIakMsSUFBSSxDQUFDLGNBQ0osSUFBSSxFQUFFLG1CQUFtQixVQUMxQixDQUFDLFFBQ1c7Y0FBcUIsQ0FVakM7Ozs7OztnREFDRDtJQURBLDRCQUFDO0NBQUEsQUFWRCxJQVVDO1NBVlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdhcHBTaWRlYmFyTmF2SWNvbidcclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcFNpZGViYXJOYXZJY29uUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICB0cmFuc2Zvcm0oaXRlbTogYW55LCBhcmdzPzogYW55KTogYW55IHtcclxuICAgIGNvbnN0IGNsYXNzZXMgPSB7XHJcbiAgICAgICduYXYtaWNvbic6IHRydWVcclxuICAgIH07XHJcbiAgICBjb25zdCBpY29uID0gaXRlbS5pY29uO1xyXG4gICAgY2xhc3Nlc1tpY29uXSA9ICEhaXRlbS5pY29uO1xyXG4gICAgcmV0dXJuIGNsYXNzZXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==