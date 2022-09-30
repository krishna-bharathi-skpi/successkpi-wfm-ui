import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
import { SidebarNavHelper } from '../app-sidebar-nav.service';
import * as ɵngcc0 from '@angular/core';
var AppSidebarNavItemClassPipe = /** @class */ (function () {
    function AppSidebarNavItemClassPipe(helper) {
        this.helper = helper;
    }
    AppSidebarNavItemClassPipe.prototype.transform = function (item) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var itemType = this.helper.itemType(item);
        var itemClass;
        if (['divider', 'title'].includes(itemType)) {
            itemClass = "nav-" + itemType;
        }
        else if (itemType === 'dropdown') {
            itemClass = 'nav-item nav-dropdown';
        }
        else {
            itemClass = 'nav-item';
        }
        return item.class ? itemClass + " " + item.class : itemClass;
    };
    AppSidebarNavItemClassPipe.ctorParameters = function () { return [
        { type: SidebarNavHelper }
    ]; };
    AppSidebarNavItemClassPipe = __decorate([ __metadata("design:paramtypes", [SidebarNavHelper])
    ], AppSidebarNavItemClassPipe);
AppSidebarNavItemClassPipe.ɵfac = function AppSidebarNavItemClassPipe_Factory(t) { return new (t || AppSidebarNavItemClassPipe)(ɵngcc0.ɵɵdirectiveInject(SidebarNavHelper)); };
AppSidebarNavItemClassPipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "appSidebarNavItemClass", type: AppSidebarNavItemClassPipe, pure: true });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavItemClassPipe, [{
        type: Pipe,
        args: [{
                name: 'appSidebarNavItemClass'
            }]
    }], function () { return [{ type: SidebarNavHelper }]; }, null); })();
    return AppSidebarNavItemClassPipe;
}());
export { AppSidebarNavItemClassPipe };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LWl0ZW0tY2xhc3MucGlwZS5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1uYXYvYXBwLXNpZGViYXItbmF2LWl0ZW0tY2xhc3MucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFcEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7O0FBSzVEO0lBRUUsb0NBQ1MsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFDOUIsQ0FBQztJQUVKLDhDQUFTLEdBQVQsVUFBVSxJQUFTO1FBQUUsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCw2QkFBYzs7UUFDL0IsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxTQUFTLENBQUM7UUFDZCxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMzQyxTQUFTLEdBQUcsU0FBTyxRQUFVLENBQUM7U0FDL0I7YUFBTSxJQUFJLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDbEMsU0FBUyxHQUFHLHVCQUF1QixDQUFFO1NBQ3RDO2FBQU07WUFDTCxTQUFTLEdBQUcsVUFBVSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBSSxTQUFTLFNBQUksSUFBSSxDQUFDLEtBQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQy9ELENBQUM7O2dCQWRjLGdCQUFnQjs7SUFIdEIsMEJBQTBCLGVBQWUsU0FIckQsSUFBSSxDQUFDLGNBQ0osSUFBSSxFQUFFLGxDQUVBLGtDQUdXLGdCQUFnQjtLQUxILFVBQy9CLENBQUMsVEFDVywwQkFBMEIsQ0FrQnRDOzs7Ozs7OzswRUFDRDtJQURBLGlDQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FsQlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtTaWRlYmFyTmF2SGVscGVyfSBmcm9tICcuLi9hcHAtc2lkZWJhci1uYXYuc2VydmljZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2FwcFNpZGViYXJOYXZJdGVtQ2xhc3MnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBTaWRlYmFyTmF2SXRlbUNsYXNzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBoZWxwZXI6IFNpZGViYXJOYXZIZWxwZXJcclxuICApIHt9XHJcblxyXG4gIHRyYW5zZm9ybShpdGVtOiBhbnksIC4uLmFyZ3M6IGFueVtdKTogYW55IHtcclxuICAgICAgY29uc3QgaXRlbVR5cGUgPSB0aGlzLmhlbHBlci5pdGVtVHlwZShpdGVtKTtcclxuICAgICAgbGV0IGl0ZW1DbGFzcztcclxuICAgICAgaWYgKFsnZGl2aWRlcicsICd0aXRsZSddLmluY2x1ZGVzKGl0ZW1UeXBlKSkge1xyXG4gICAgICAgIGl0ZW1DbGFzcyA9IGBuYXYtJHtpdGVtVHlwZX1gO1xyXG4gICAgICB9IGVsc2UgaWYgKGl0ZW1UeXBlID09PSAnZHJvcGRvd24nKSB7XHJcbiAgICAgICAgaXRlbUNsYXNzID0gJ25hdi1pdGVtIG5hdi1kcm9wZG93bicgO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGl0ZW1DbGFzcyA9ICduYXYtaXRlbSc7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGl0ZW0uY2xhc3MgPyBgJHtpdGVtQ2xhc3N9ICR7aXRlbS5jbGFzc31gIDogaXRlbUNsYXNzO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==