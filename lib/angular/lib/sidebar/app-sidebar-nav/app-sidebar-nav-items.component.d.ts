import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarNavHelper } from '../app-sidebar-nav.service';
import { INavData } from '../app-sidebar-nav';
import * as ɵngcc0 from '@angular/core';
export declare class AppSidebarNavItemsComponent {
    private document;
    private renderer;
    router: Router;
    helper: SidebarNavHelper;
    protected _items: INavData[];
    items: INavData[];
    constructor(document: any, renderer: Renderer2, router: Router, helper: SidebarNavHelper);
    hideMobile(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AppSidebarNavItemsComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<AppSidebarNavItemsComponent, "app-sidebar-nav-items, cui-sidebar-nav-items", never, { "items": "items"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LWl0ZW1zLmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJhcHAtc2lkZWJhci1uYXYtaXRlbXMuY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FBSUE7Ozs7Ozs7Ozs7O0FBU0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU2lkZWJhck5hdkhlbHBlciB9IGZyb20gJy4uL2FwcC1zaWRlYmFyLW5hdi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSU5hdkRhdGEgfSBmcm9tICcuLi9hcHAtc2lkZWJhci1uYXYnO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBBcHBTaWRlYmFyTmF2SXRlbXNDb21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBkb2N1bWVudDtcclxuICAgIHByaXZhdGUgcmVuZGVyZXI7XHJcbiAgICByb3V0ZXI6IFJvdXRlcjtcclxuICAgIGhlbHBlcjogU2lkZWJhck5hdkhlbHBlcjtcclxuICAgIHByb3RlY3RlZCBfaXRlbXM6IElOYXZEYXRhW107XHJcbiAgICBpdGVtczogSU5hdkRhdGFbXTtcclxuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50OiBhbnksIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHJvdXRlcjogUm91dGVyLCBoZWxwZXI6IFNpZGViYXJOYXZIZWxwZXIpO1xyXG4gICAgaGlkZU1vYmlsZSgpOiB2b2lkO1xyXG59XHJcbiJdfQ==