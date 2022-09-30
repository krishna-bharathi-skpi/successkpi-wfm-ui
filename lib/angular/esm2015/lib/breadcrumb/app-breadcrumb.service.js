import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/router';
let AppBreadcrumbService = class AppBreadcrumbService {
    constructor(router, route) {
        this.router = router;
        this.route = route;
        this.breadcrumbSubject = new BehaviorSubject(new Array());
        this.breadcrumbs = this.breadcrumbSubject.asObservable();
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event) => {
            const breadcrumbs = [];
            let currentRoute = this.route.root;
            let url = '';
            do {
                const childrenRoutes = currentRoute.children;
                currentRoute = null;
                // tslint:disable-next-line:no-shadowed-variable
                childrenRoutes.forEach(route => {
                    if (route.outlet === 'primary') {
                        const routeSnapshot = route.snapshot;
                        url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
                        breadcrumbs.push({
                            label: route.snapshot.data,
                            url
                        });
                        currentRoute = route;
                    }
                });
            } while (currentRoute);
            this.breadcrumbSubject.next(Object.assign([], breadcrumbs));
            return breadcrumbs;
        });
    }
};
AppBreadcrumbService.ɵfac = function AppBreadcrumbService_Factory(t) { return new (t || AppBreadcrumbService)(ɵngcc0.ɵɵinject(ɵngcc1.Router), ɵngcc0.ɵɵinject(ɵngcc1.ActivatedRoute)); };
AppBreadcrumbService.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute }
];
AppBreadcrumbService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AppBreadcrumbService_Factory() { return new AppBreadcrumbService(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i1.ActivatedRoute)); }, token: AppBreadcrumbService, providedIn: "root" });
AppBreadcrumbService = __decorate([ __metadata("design:paramtypes", [Router, ActivatedRoute])
], AppBreadcrumbService);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppBreadcrumbService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: ɵngcc1.Router }, { type: ɵngcc1.ActivatedRoute }]; }, null); })();
export { AppBreadcrumbService };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJyZWFkY3J1bWIuc2VydmljZS5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvYnJlYWRjcnVtYi9hcHAtYnJlYWRjcnVtYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQU14QyxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQU0vQixZQUFvQixNQUFjLEVBQVUsS0FBcUI7UUFBN0MsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBRS9ELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBUSxJQUFJLEtBQUssRUFBTyxDQUFDLENBQUM7UUFFdEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssWUFBWSxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzNGLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUN2QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNuQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDYixHQUFHO2dCQUNELE1BQU0sY0FBYyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7Z0JBQzdDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLGdEQUFnRDtnQkFDaEQsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDN0IsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTt3QkFDOUIsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQzt3QkFDckMsR0FBRyxJQUFJLEdBQUcsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3RFLFdBQVcsQ0FBQyxJQUFJLENBQUM7NEJBQ2YsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSTs0QkFDMUIsR0FBRzt5QkFDSixDQUFDLENBQUM7d0JBQ0gsWUFBWSxHQUFHLEtBQUssQ0FBQztxQkFDdEI7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSixRQUFRLFlBQVksRUFBRTtZQUV2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFNUQsT0FBTyxXQUFXLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7eUxBQUE7O1lBaEM2QixNQUFNO1lBQWlCLGNBQWM7OztBQU50RCxvQkFBb0IsZUFFdEIsS0FOVixVQUFVLENBQUMsVUFDUixVQUFVLEVBQUUsTUFBTSxNQUNuQixDQUNGLG5EQUNHLGtDQU0wQixNQUFNLEVBQWlCLGNBQWM7R0FOdEQsb0JBQW9CLENBc0NoQzs7Ozs7O3dHQUNEO1NBdkNhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxuICB9XHJcbilcclxuZXhwb3J0IGNsYXNzIEFwcEJyZWFkY3J1bWJTZXJ2aWNlIHtcclxuXHJcbiAgYnJlYWRjcnVtYnM6IE9ic2VydmFibGU8QXJyYXk8YW55Pj47XHJcblxyXG4gIHByaXZhdGUgYnJlYWRjcnVtYlN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxBcnJheTxhbnk+PjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuXHJcbiAgICB0aGlzLmJyZWFkY3J1bWJTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnlbXT4obmV3IEFycmF5PGFueT4oKSk7XHJcblxyXG4gICAgdGhpcy5icmVhZGNydW1icyA9IHRoaXMuYnJlYWRjcnVtYlN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgYnJlYWRjcnVtYnMgPSBbXTtcclxuICAgICAgbGV0IGN1cnJlbnRSb3V0ZSA9IHRoaXMucm91dGUucm9vdDtcclxuICAgICAgbGV0IHVybCA9ICcnO1xyXG4gICAgICBkbyB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW5Sb3V0ZXMgPSBjdXJyZW50Um91dGUuY2hpbGRyZW47XHJcbiAgICAgICAgY3VycmVudFJvdXRlID0gbnVsbDtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc2hhZG93ZWQtdmFyaWFibGVcclxuICAgICAgICBjaGlsZHJlblJvdXRlcy5mb3JFYWNoKHJvdXRlID0+IHtcclxuICAgICAgICAgIGlmIChyb3V0ZS5vdXRsZXQgPT09ICdwcmltYXJ5Jykge1xyXG4gICAgICAgICAgICBjb25zdCByb3V0ZVNuYXBzaG90ID0gcm91dGUuc25hcHNob3Q7XHJcbiAgICAgICAgICAgIHVybCArPSAnLycgKyByb3V0ZVNuYXBzaG90LnVybC5tYXAoc2VnbWVudCA9PiBzZWdtZW50LnBhdGgpLmpvaW4oJy8nKTtcclxuICAgICAgICAgICAgYnJlYWRjcnVtYnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgbGFiZWw6IHJvdXRlLnNuYXBzaG90LmRhdGEsXHJcbiAgICAgICAgICAgICAgdXJsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjdXJyZW50Um91dGUgPSByb3V0ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSB3aGlsZSAoY3VycmVudFJvdXRlKTtcclxuXHJcbiAgICAgIHRoaXMuYnJlYWRjcnVtYlN1YmplY3QubmV4dChPYmplY3QuYXNzaWduKFtdLCBicmVhZGNydW1icykpO1xyXG5cclxuICAgICAgcmV0dXJuIGJyZWFkY3J1bWJzO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==