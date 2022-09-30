import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarNavHelper } from '../app-sidebar-nav.service';
import { INavData } from '../app-sidebar-nav';
import * as ɵngcc0 from '@angular/core';
export declare class AppSidebarNavLinkContentComponent implements OnInit, OnDestroy {
    helper: SidebarNavHelper;
    item: any;
    constructor(helper: SidebarNavHelper);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AppSidebarNavLinkContentComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<AppSidebarNavLinkContentComponent, "app-sidebar-nav-link-content, cui-sidebar-nav-link-content", never, { "item": "item"; }, {}, never, never>;
}
export declare class AppSidebarNavLinkComponent implements OnInit, OnDestroy {
    router: Router;
    protected _Item: INavData;
    item: INavData;
    linkClick: EventEmitter<any>;
    linkType: string;
    href: string;
    linkActive: boolean;
    private url;
    private navigationEndObservable;
    private navSubscription;
    constructor(router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    getLinkType(): "disabled" | "link" | "external";
    isDisabled(): boolean;
    isExternalLink(): boolean;
    linkClicked(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AppSidebarNavLinkComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<AppSidebarNavLinkComponent, "app-sidebar-nav-link, cui-sidebar-nav-link", never, { "item": "item"; }, { "linkClick": "linkClick"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LWxpbmsuY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbImFwcC1zaWRlYmFyLW5hdi1saW5rLmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQUlBOzs7Ozs7OztBQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFNpZGViYXJOYXZIZWxwZXIgfSBmcm9tICcuLi9hcHAtc2lkZWJhci1uYXYuc2VydmljZSc7XHJcbmltcG9ydCB7IElOYXZEYXRhIH0gZnJvbSAnLi4vYXBwLXNpZGViYXItbmF2JztcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgQXBwU2lkZWJhck5hdkxpbmtDb250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgaGVscGVyOiBTaWRlYmFyTmF2SGVscGVyO1xyXG4gICAgaXRlbTogYW55O1xyXG4gICAgY29uc3RydWN0b3IoaGVscGVyOiBTaWRlYmFyTmF2SGVscGVyKTtcclxuICAgIG5nT25Jbml0KCk6IHZvaWQ7XHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG59XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEFwcFNpZGViYXJOYXZMaW5rQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgcm91dGVyOiBSb3V0ZXI7XHJcbiAgICBwcm90ZWN0ZWQgX0l0ZW06IElOYXZEYXRhO1xyXG4gICAgaXRlbTogSU5hdkRhdGE7XHJcbiAgICBsaW5rQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gICAgbGlua1R5cGU6IHN0cmluZztcclxuICAgIGhyZWY6IHN0cmluZztcclxuICAgIGxpbmtBY3RpdmU6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHVybDtcclxuICAgIHByaXZhdGUgbmF2aWdhdGlvbkVuZE9ic2VydmFibGU7XHJcbiAgICBwcml2YXRlIG5hdlN1YnNjcmlwdGlvbjtcclxuICAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyKTtcclxuICAgIG5nT25Jbml0KCk6IHZvaWQ7XHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG4gICAgZ2V0TGlua1R5cGUoKTogXCJkaXNhYmxlZFwiIHwgXCJsaW5rXCIgfCBcImV4dGVybmFsXCI7XHJcbiAgICBpc0Rpc2FibGVkKCk6IGJvb2xlYW47XHJcbiAgICBpc0V4dGVybmFsTGluaygpOiBib29sZWFuO1xyXG4gICAgbGlua0NsaWNrZWQoKTogdm9pZDtcclxufVxyXG4iXX0=