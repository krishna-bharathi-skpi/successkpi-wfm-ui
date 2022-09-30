import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as ɵngcc0 from '@angular/core';
let AppSidebarService = class AppSidebarService {
    constructor() {
        this.events = new BehaviorSubject({});
        this.events$ = this.events.asObservable();
    }
    toggle(action) {
        this.events.next(action);
    }
};
AppSidebarService.ɵfac = function AppSidebarService_Factory(t) { return new (t || AppSidebarService)(); };
AppSidebarService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AppSidebarService_Factory() { return new AppSidebarService(); }, token: AppSidebarService, providedIn: "root" });
AppSidebarService = __decorate([ __metadata("design:paramtypes", [])
], AppSidebarService);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
export { AppSidebarService };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXIuc2VydmljZS5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQVN2QyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUs1QjtRQUhRLFdBQU0sR0FBRyxJQUFJLGVBQWUsQ0FBaUIsRUFBRSxDQUFDLENBQUM7UUFDekQsWUFBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7SUFFdEIsQ0FBQztJQUVoQixNQUFNLENBQUMsTUFBc0I7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQztDQUNGOzBHQUFBOztBQVZZLGlCQUFpQixlQUVuQixLQUxWLFVBQVUsQ0FBQyxVQUNWLFVBQVUscENBRVI7Q0FGVSxNQUFNLE1BQ25CLENBQUMsWEFDVyxpQkFBaUIsQ0FVN0I7Ozs7OztnREFDRDtTQVhhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTaWRlYmFyQWN0aW9uIHtcclxuICBtaW5pbWl6ZT86IGJvb2xlYW4gfCAndG9nZ2xlJztcclxufVxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwU2lkZWJhclNlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIGV2ZW50cyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SVNpZGViYXJBY3Rpb24+KHt9KTtcclxuICBldmVudHMkID0gdGhpcy5ldmVudHMuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgdG9nZ2xlKGFjdGlvbjogSVNpZGViYXJBY3Rpb24pIHtcclxuICAgIHRoaXMuZXZlbnRzLm5leHQoYWN0aW9uKTtcclxuICB9XHJcbn1cclxuIl19