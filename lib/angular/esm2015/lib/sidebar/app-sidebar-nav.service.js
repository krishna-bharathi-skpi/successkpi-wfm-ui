import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
let SidebarNavService = class SidebarNavService {
};
SidebarNavService.ɵfac = function SidebarNavService_Factory(t) { return new (t || SidebarNavService)(); };
SidebarNavService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: SidebarNavService, factory: SidebarNavService.ɵfac });
export { SidebarNavService };
let SidebarNavHelper = class SidebarNavHelper {
    constructor() {
        this.hasBadge = (item) => Boolean(item.badge);
        this.hasIcon = (item) => Boolean(item.icon);
    }
    itemType(item) {
        if (item.divider) {
            return 'divider';
        }
        else if (item.title) {
            return 'title';
        }
        else if (item.children) {
            return 'dropdown';
        }
        else if (item.label) {
            return 'label';
        }
        else if (!Object.keys(item).length) {
            return 'empty';
        }
        else {
            return 'link';
        }
    }
    isActive(router, item) {
        return router.isActive(item.url, false);
    }
    getIconClass(item) {
        const classes = {
            'nav-icon': true
        };
        const icon = item.icon;
        classes[icon] = this.hasIcon(item);
        return classes;
    }
};
SidebarNavHelper.ɵfac = function SidebarNavHelper_Factory(t) { return new (t || SidebarNavHelper)(); };
SidebarNavHelper.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: SidebarNavHelper, factory: SidebarNavHelper.ɵfac });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SidebarNavService, [{
        type: Injectable
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SidebarNavHelper, [{
        type: Injectable
    }], function () { return []; }, null); })();
export { SidebarNavHelper };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LnNlcnZpY2UuanMiLCJzb3VyY2VzIjpbIm5nOi9AY29yZXVpL2FuZ3VsYXIvbGliL3NpZGViYXIvYXBwLXNpZGViYXItbmF2LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSzNDLElBQXNCLGlCQUFpQixHQUF2QyxNQUFzQixpQkFBaUI7Q0FLdEM7O0VBQUEsQ0FMcUIsaUJBQWlCLG9CQUR0QyxVQUFVLEVBQUUsSUFDUyxpQkFBaUIsQ0FLdEMseUNBQ0Q7U0FOc0IsaUJBQWlCO0FBUXZDLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBQTdCO1FBc0JTLGFBQVEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxZQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFVaEQsQ0FBQztJQS9CUSxRQUFRLENBQUMsSUFBSTtRQUNsQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsT0FBTyxTQUFTLENBQUM7U0FDbEI7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckIsT0FBTyxPQUFPLENBQUM7U0FDaEI7YUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDeEIsT0FBTyxVQUFVLENBQUM7U0FDbkI7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckIsT0FBTyxPQUFPLENBQUM7U0FDaEI7YUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDcEMsT0FBTyxPQUFPLENBQUM7U0FDaEI7YUFBTTtZQUNMLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJO1FBQzFCLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFLTSxZQUFZLENBQUMsSUFBSTtRQUN0QixNQUFNLE9BQU8sR0FBRztZQUNkLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFDRixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjs7RUFBQSxDQWpDWSxnQkFBZ0Isb0JBRDVCLFVBQVUsRUFBRSxJQUNBLGdCQUFnQixDQWlDNUI7Ozs7OztnREFDRDtTQWxDYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IElOYXZEYXRhIH0gZnJvbSAnLi9hcHAtc2lkZWJhci1uYXYnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU2lkZWJhck5hdlNlcnZpY2Uge1xuICAvKipcbiAgICogUmV0dXJucyBhIHNpZGViYXItbmF2IGl0ZW1zIGNvbmZpZyBOYXZEYXRhXG4gICAqL1xuICBhYnN0cmFjdCBnZXRTaWRlYmFyTmF2SXRlbXNDb25maWcoKTogSU5hdkRhdGFbXTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNpZGViYXJOYXZIZWxwZXIge1xuXG4gIHB1YmxpYyBpdGVtVHlwZShpdGVtKSB7XG4gICAgaWYgKGl0ZW0uZGl2aWRlcikge1xuICAgICAgcmV0dXJuICdkaXZpZGVyJztcbiAgICB9IGVsc2UgaWYgKGl0ZW0udGl0bGUpIHtcbiAgICAgIHJldHVybiAndGl0bGUnO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgcmV0dXJuICdkcm9wZG93bic7XG4gICAgfSBlbHNlIGlmIChpdGVtLmxhYmVsKSB7XG4gICAgICByZXR1cm4gJ2xhYmVsJztcbiAgICB9IGVsc2UgaWYgKCFPYmplY3Qua2V5cyhpdGVtKS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAnZW1wdHknO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ2xpbmsnO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0FjdGl2ZShyb3V0ZXIsIGl0ZW0pIHtcbiAgICByZXR1cm4gcm91dGVyLmlzQWN0aXZlKGl0ZW0udXJsLCBmYWxzZSk7XG4gIH1cblxuICBwdWJsaWMgaGFzQmFkZ2UgPSAoaXRlbSkgPT4gQm9vbGVhbihpdGVtLmJhZGdlKTtcbiAgcHVibGljIGhhc0ljb24gPSAoaXRlbSkgPT4gQm9vbGVhbihpdGVtLmljb24pO1xuXG4gIHB1YmxpYyBnZXRJY29uQ2xhc3MoaXRlbSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSB7XG4gICAgICAnbmF2LWljb24nOiB0cnVlXG4gICAgfTtcbiAgICBjb25zdCBpY29uID0gaXRlbS5pY29uO1xuICAgIGNsYXNzZXNbaWNvbl0gPSB0aGlzLmhhc0ljb24oaXRlbSk7XG4gICAgcmV0dXJuIGNsYXNzZXM7XG4gIH1cbn1cbiJdfQ==