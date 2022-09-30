import { OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from './app-sidebar-nav';
import * as ɵngcc0 from '@angular/core';
export declare class AppSidebarNavComponent implements OnChanges {
    router: Router;
    navItems: INavData[];
    sidebarNavClass: boolean;
    role: string;
    navItemsArray: INavData[];
    constructor(router: Router);
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AppSidebarNavComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<AppSidebarNavComponent, "app-sidebar-nav, cui-sidebar-nav", never, { "navItems": "navItems"; "role": "role"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJhcHAtc2lkZWJhci1uYXYuY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUFHQTs7Ozs7Ozs7OztBQVFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IElOYXZEYXRhIH0gZnJvbSAnLi9hcHAtc2lkZWJhci1uYXYnO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBBcHBTaWRlYmFyTmF2Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICAgIHJvdXRlcjogUm91dGVyO1xyXG4gICAgbmF2SXRlbXM6IElOYXZEYXRhW107XHJcbiAgICBzaWRlYmFyTmF2Q2xhc3M6IGJvb2xlYW47XHJcbiAgICByb2xlOiBzdHJpbmc7XHJcbiAgICBuYXZJdGVtc0FycmF5OiBJTmF2RGF0YVtdO1xyXG4gICAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIpO1xyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQ7XHJcbn1cclxuIl19