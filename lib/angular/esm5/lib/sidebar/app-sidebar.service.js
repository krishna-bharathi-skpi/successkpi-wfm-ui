import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as ɵngcc0 from '@angular/core';
var AppSidebarService = /** @class */ (function () {
    function AppSidebarService() {
        this.events = new BehaviorSubject({});
        this.events$ = this.events.asObservable();
    }
    AppSidebarService.prototype.toggle = function (action) {
        this.events.next(action);
    };
    AppSidebarService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AppSidebarService_Factory() { return new AppSidebarService(); }, token: AppSidebarService, providedIn: "root" });
    AppSidebarService = __decorate([ __metadata("design:paramtypes", [])
    ], AppSidebarService);
AppSidebarService.ɵfac = function AppSidebarService_Factory(t) { return new (t || AppSidebarService)(); };
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
    return AppSidebarService;
}());
export { AppSidebarService };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXIuc2VydmljZS5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQVN2QztJQUtFO1FBSFEsV0FBTSxHQUFHLElBQUksZUFBZSxDQUFpQixFQUFFLENBQUMsQ0FBQztRQUN6RCxZQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUV0QixDQUFDO0lBRWhCLGtDQUFNLEdBQU4sVUFBTyxNQUFzQjtRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQixDQUFDOztJQVRVLGlCQUFpQixlQUVuQixTQUxWLFVBQVUsQ0FBQyxjQUNWLGxDQUVNO09BRkksRUFBRSxNQUFNLFVBQ25CLENBQUMsbkJBQ1csaUJBQWlCLENBVTdCOzs7Ozs7O2dEQUNEOzRCQXJCQTtDQW9CQyxBQVZELElBVUM7U0FWWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2lkZWJhckFjdGlvbiB7XHJcbiAgbWluaW1pemU/OiBib29sZWFuIHwgJ3RvZ2dsZSc7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcFNpZGViYXJTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBldmVudHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PElTaWRlYmFyQWN0aW9uPih7fSk7XHJcbiAgZXZlbnRzJCA9IHRoaXMuZXZlbnRzLmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHRvZ2dsZShhY3Rpb246IElTaWRlYmFyQWN0aW9uKSB7XHJcbiAgICB0aGlzLmV2ZW50cy5uZXh0KGFjdGlvbik7XHJcbiAgfVxyXG59XHJcbiJdfQ==