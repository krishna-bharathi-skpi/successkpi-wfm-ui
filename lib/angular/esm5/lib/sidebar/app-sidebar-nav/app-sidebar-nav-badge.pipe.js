import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
var AppSidebarNavBadgePipe = /** @class */ (function () {
    function AppSidebarNavBadgePipe() {
    }
    AppSidebarNavBadgePipe.prototype.transform = function (item, args) {
        var classes = {
            badge: true
        };
        var variant = "badge-" + item.badge.variant;
        classes[variant] = !!item.badge.variant;
        classes[item.badge.class] = !!item.badge.class;
        return classes;
    };
AppSidebarNavBadgePipe.ɵfac = function AppSidebarNavBadgePipe_Factory(t) { return new (t || AppSidebarNavBadgePipe)(); };
AppSidebarNavBadgePipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "appSidebarNavBadge", type: AppSidebarNavBadgePipe, pure: true });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavBadgePipe, [{
        type: Pipe,
        args: [{
                name: 'appSidebarNavBadge'
            }]
    }], function () { return []; }, null); })();
    return AppSidebarNavBadgePipe;
}());
export { AppSidebarNavBadgePipe };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LWJhZGdlLnBpcGUuanMiLCJzb3VyY2VzIjpbIm5nOi9AY29yZXVpL2FuZ3VsYXIvbGliL3NpZGViYXIvYXBwLXNpZGViYXItbmF2L2FwcC1zaWRlYmFyLW5hdi1iYWRnZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFLcEQ7SUFBQTtJQVlBLENBQUM7SUFWQywwQ0FBUyxHQUFULFVBQVUsSUFBUyxFQUFFLElBQVU7UUFDN0IsSUFBTSxPQUFPLEdBQUc7WUFDZCxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUM7UUFDRixJQUFNLE9BQU8sR0FBRyxXQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBUyxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQy9DLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUMsQ0FDSDtJQVhhLHNCQUFzQix3QkFIbEMsSUFBSSxDQUFDLGNBQ0osSUFBSSxFQUFFLG9CQUFvQixVQUMzQixDQUFDLFFBQ1c7Y0FBc0IsQ0FZbEM7Ozs7OztnREFDRDtJQURBLDZCQUFDO0NBQUEsQUFaRCxJQVlDO1NBWlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdhcHBTaWRlYmFyTmF2QmFkZ2UnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBTaWRlYmFyTmF2QmFkZ2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gIHRyYW5zZm9ybShpdGVtOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xyXG4gICAgY29uc3QgY2xhc3NlcyA9IHtcclxuICAgICAgYmFkZ2U6IHRydWVcclxuICAgIH07XHJcbiAgICBjb25zdCB2YXJpYW50ID0gYGJhZGdlLSR7aXRlbS5iYWRnZS52YXJpYW50fWA7XHJcbiAgICBjbGFzc2VzW3ZhcmlhbnRdID0gISFpdGVtLmJhZGdlLnZhcmlhbnQ7XHJcbiAgICBjbGFzc2VzW2l0ZW0uYmFkZ2UuY2xhc3NdID0gISFpdGVtLmJhZGdlLmNsYXNzO1xyXG4gICAgcmV0dXJuIGNsYXNzZXM7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=