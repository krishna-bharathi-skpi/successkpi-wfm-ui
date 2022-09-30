import * as ɵngcc0 from '@angular/core';
export interface ISidebarAction {
    minimize?: boolean | 'toggle';
}
export declare class AppSidebarService {
    private events;
    events$: import("rxjs").Observable<ISidebarAction>;
    constructor();
    toggle(action: ISidebarAction): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AppSidebarService, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXIuc2VydmljZS5kLnRzIiwic291cmNlcyI6WyJhcHAtc2lkZWJhci5zZXJ2aWNlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7QUFRQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSVNpZGViYXJBY3Rpb24ge1xyXG4gICAgbWluaW1pemU/OiBib29sZWFuIHwgJ3RvZ2dsZSc7XHJcbn1cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgQXBwU2lkZWJhclNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBldmVudHM7XHJcbiAgICBldmVudHMkOiBpbXBvcnQoXCJyeGpzXCIpLk9ic2VydmFibGU8SVNpZGViYXJBY3Rpb24+O1xyXG4gICAgY29uc3RydWN0b3IoKTtcclxuICAgIHRvZ2dsZShhY3Rpb246IElTaWRlYmFyQWN0aW9uKTogdm9pZDtcclxufVxyXG4iXX0=