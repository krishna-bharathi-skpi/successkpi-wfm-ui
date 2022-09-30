import { OnInit, OnDestroy, Renderer2 } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class AppHeaderComponent implements OnInit, OnDestroy {
    private document;
    private renderer;
    fixed: boolean;
    navbarBrand: any;
    navbarBrandFull: any;
    navbarBrandMinimized: any;
    navbarBrandText: any;
    navbarBrandHref: '';
    navbarBrandRouterLink: any[] | string;
    sidebarToggler: string | boolean;
    mobileSidebarToggler: boolean;
    asideMenuToggler: string | boolean;
    mobileAsideMenuToggler: boolean;
    private readonly fixedClass;
    appHeaderClass: boolean;
    navbarClass: boolean;
    navbarBrandImg: boolean;
    private readonly breakpoints;
    sidebarTogglerClass: string;
    sidebarTogglerMobileClass: string;
    asideTogglerClass: string;
    asideTogglerMobileClass: string;
    constructor(document: any, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isFixed(fixed?: boolean): void;
    setToggerBreakpointClass(breakpoint?: string): string;
    setToggerMobileBreakpointClass(breakpoint?: string): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AppHeaderComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<AppHeaderComponent, "app-header, cui-header", never, { "navbarBrandText": "navbarBrandText"; "navbarBrandRouterLink": "navbarBrandRouterLink"; "fixed": "fixed"; "navbarBrand": "navbarBrand"; "navbarBrandFull": "navbarBrandFull"; "navbarBrandMinimized": "navbarBrandMinimized"; "navbarBrandHref": "navbarBrandHref"; "sidebarToggler": "sidebarToggler"; "mobileSidebarToggler": "mobileSidebarToggler"; "asideMenuToggler": "asideMenuToggler"; "mobileAsideMenuToggler": "mobileAsideMenuToggler"; }, {}, never, ["*"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWhlYWRlci5jb21wb25lbnQuZC50cyIsInNvdXJjZXMiOlsiYXBwLWhlYWRlci5jb21wb25lbnQuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9uSW5pdCwgT25EZXN0cm95LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgQXBwSGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgcHJpdmF0ZSBkb2N1bWVudDtcclxuICAgIHByaXZhdGUgcmVuZGVyZXI7XHJcbiAgICBmaXhlZDogYm9vbGVhbjtcclxuICAgIG5hdmJhckJyYW5kOiBhbnk7XHJcbiAgICBuYXZiYXJCcmFuZEZ1bGw6IGFueTtcclxuICAgIG5hdmJhckJyYW5kTWluaW1pemVkOiBhbnk7XHJcbiAgICBuYXZiYXJCcmFuZFRleHQ6IGFueTtcclxuICAgIG5hdmJhckJyYW5kSHJlZjogJyc7XHJcbiAgICBuYXZiYXJCcmFuZFJvdXRlckxpbms6IGFueVtdIHwgc3RyaW5nO1xyXG4gICAgc2lkZWJhclRvZ2dsZXI6IHN0cmluZyB8IGJvb2xlYW47XHJcbiAgICBtb2JpbGVTaWRlYmFyVG9nZ2xlcjogYm9vbGVhbjtcclxuICAgIGFzaWRlTWVudVRvZ2dsZXI6IHN0cmluZyB8IGJvb2xlYW47XHJcbiAgICBtb2JpbGVBc2lkZU1lbnVUb2dnbGVyOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBmaXhlZENsYXNzO1xyXG4gICAgYXBwSGVhZGVyQ2xhc3M6IGJvb2xlYW47XHJcbiAgICBuYXZiYXJDbGFzczogYm9vbGVhbjtcclxuICAgIG5hdmJhckJyYW5kSW1nOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBicmVha3BvaW50cztcclxuICAgIHNpZGViYXJUb2dnbGVyQ2xhc3M6IHN0cmluZztcclxuICAgIHNpZGViYXJUb2dnbGVyTW9iaWxlQ2xhc3M6IHN0cmluZztcclxuICAgIGFzaWRlVG9nZ2xlckNsYXNzOiBzdHJpbmc7XHJcbiAgICBhc2lkZVRvZ2dsZXJNb2JpbGVDbGFzczogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnQ6IGFueSwgcmVuZGVyZXI6IFJlbmRlcmVyMik7XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcclxuICAgIGlzRml4ZWQoZml4ZWQ/OiBib29sZWFuKTogdm9pZDtcclxuICAgIHNldFRvZ2dlckJyZWFrcG9pbnRDbGFzcyhicmVha3BvaW50Pzogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgc2V0VG9nZ2VyTW9iaWxlQnJlYWtwb2ludENsYXNzKGJyZWFrcG9pbnQ/OiBzdHJpbmcpOiBzdHJpbmc7XHJcbn1cclxuIl19