import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
let AppSidebarNavLinkPipe = class AppSidebarNavLinkPipe {
    transform(item) {
        const classes = { 'nav-link': true };
        const disabled = item.attributes && item.attributes.disabled;
        classes['disabled'] = disabled;
        classes['btn-link'] = disabled;
        classes[`nav-link-${item.variant}`] = !!item.variant;
        return classes;
    }
};
AppSidebarNavLinkPipe.ɵfac = function AppSidebarNavLinkPipe_Factory(t) { return new (t || AppSidebarNavLinkPipe)(); };
AppSidebarNavLinkPipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "appSidebarNavLink", type: AppSidebarNavLinkPipe, pure: true });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavLinkPipe, [{
        type: Pipe,
        args: [{
                name: 'appSidebarNavLink'
            }]
    }], null, null); })();
export { AppSidebarNavLinkPipe };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LWxpbmsucGlwZS5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1uYXYvYXBwLXNpZGViYXItbmF2LWxpbmsucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBS3BELElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBRWhDLFNBQVMsQ0FBQyxJQUFTO1FBRWpCLE1BQU0sT0FBTyxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO1FBRXJDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDN0QsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUMvQixPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxZQUFZLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3JELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjs7RUFBQSxDQVpZLHFCQUFxQixvQkFIakMsSUFBSSxDQUFDLFVBQ0osSUFBSSxFQUFFLG1CQUFtQixNQUMxQixDQUFDLElBQ1cscUJBQXFCLENBWWpDOzs7Ozs7MEJBQ0Q7U0FiYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2FwcFNpZGViYXJOYXZMaW5rJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwU2lkZWJhck5hdkxpbmtQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gIHRyYW5zZm9ybShpdGVtOiBhbnkpOiBhbnkge1xyXG5cclxuICAgIGNvbnN0IGNsYXNzZXMgPSB7ICduYXYtbGluayc6IHRydWUgfTtcclxuXHJcbiAgICBjb25zdCBkaXNhYmxlZCA9IGl0ZW0uYXR0cmlidXRlcyAmJiBpdGVtLmF0dHJpYnV0ZXMuZGlzYWJsZWQ7XHJcbiAgICBjbGFzc2VzWydkaXNhYmxlZCddID0gZGlzYWJsZWQ7XHJcbiAgICBjbGFzc2VzWydidG4tbGluayddID0gZGlzYWJsZWQ7XHJcbiAgICBjbGFzc2VzW2BuYXYtbGluay0ke2l0ZW0udmFyaWFudH1gXSA9ICEhaXRlbS52YXJpYW50O1xyXG4gICAgcmV0dXJuIGNsYXNzZXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==