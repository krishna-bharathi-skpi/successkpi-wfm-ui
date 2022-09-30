import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
let AppSidebarNavBadgePipe = class AppSidebarNavBadgePipe {
    transform(item, args) {
        const classes = {
            badge: true
        };
        const variant = `badge-${item.badge.variant}`;
        classes[variant] = !!item.badge.variant;
        classes[item.badge.class] = !!item.badge.class;
        return classes;
    }
};
AppSidebarNavBadgePipe.ɵfac = function AppSidebarNavBadgePipe_Factory(t) { return new (t || AppSidebarNavBadgePipe)(); };
AppSidebarNavBadgePipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "appSidebarNavBadge", type: AppSidebarNavBadgePipe, pure: true });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavBadgePipe, [{
        type: Pipe,
        args: [{
                name: 'appSidebarNavBadge'
            }]
    }], null, null); })();
export { AppSidebarNavBadgePipe };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LWJhZGdlLnBpcGUuanMiLCJzb3VyY2VzIjpbIm5nOi9AY29yZXVpL2FuZ3VsYXIvbGliL3NpZGViYXIvYXBwLXNpZGViYXItbmF2L2FwcC1zaWRlYmFyLW5hdi1iYWRnZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFLcEQsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFFakMsU0FBUyxDQUFDLElBQVMsRUFBRSxJQUFVO1FBQzdCLE1BQU0sT0FBTyxHQUFHO1lBQ2QsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDO1FBQ0YsTUFBTSxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQy9DLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FFRjs7RUFBQSxDQVpZLHNCQUFzQixvQkFIbEMsSUFBSSxDQUFDLFVBQ0osSUFBSSxFQUFFLG9CQUFvQixNQUMzQixDQUFDLElBQ1csc0JBQXNCLENBWWxDOzs7Ozs7MEJBQ0Q7U0FiYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2FwcFNpZGViYXJOYXZCYWRnZSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcFNpZGViYXJOYXZCYWRnZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgdHJhbnNmb3JtKGl0ZW06IGFueSwgYXJncz86IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBjbGFzc2VzID0ge1xyXG4gICAgICBiYWRnZTogdHJ1ZVxyXG4gICAgfTtcclxuICAgIGNvbnN0IHZhcmlhbnQgPSBgYmFkZ2UtJHtpdGVtLmJhZGdlLnZhcmlhbnR9YDtcclxuICAgIGNsYXNzZXNbdmFyaWFudF0gPSAhIWl0ZW0uYmFkZ2UudmFyaWFudDtcclxuICAgIGNsYXNzZXNbaXRlbS5iYWRnZS5jbGFzc10gPSAhIWl0ZW0uYmFkZ2UuY2xhc3M7XHJcbiAgICByZXR1cm4gY2xhc3NlcztcclxuICB9XHJcblxyXG59XHJcbiJdfQ==