import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AppBreadcrumbService } from './app-breadcrumb.service';
import * as ɵngcc0 from '@angular/core';
export declare class AppBreadcrumbComponent implements OnInit, OnDestroy {
    private document;
    private renderer;
    service: AppBreadcrumbService;
    el: ElementRef;
    fixed: boolean;
    breadcrumbs: any;
    private readonly fixedClass;
    constructor(document: any, renderer: Renderer2, service: AppBreadcrumbService, el: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isFixed(fixed?: boolean): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AppBreadcrumbComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<AppBreadcrumbComponent, "app-breadcrumb", never, { "fixed": "fixed"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJyZWFkY3J1bWIuY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbImFwcC1icmVhZGNydW1iLmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFZQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgT25Jbml0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQXBwQnJlYWRjcnVtYlNlcnZpY2UgfSBmcm9tICcuL2FwcC1icmVhZGNydW1iLnNlcnZpY2UnO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBBcHBCcmVhZGNydW1iQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgcHJpdmF0ZSBkb2N1bWVudDtcclxuICAgIHByaXZhdGUgcmVuZGVyZXI7XHJcbiAgICBzZXJ2aWNlOiBBcHBCcmVhZGNydW1iU2VydmljZTtcclxuICAgIGVsOiBFbGVtZW50UmVmO1xyXG4gICAgZml4ZWQ6IGJvb2xlYW47XHJcbiAgICBicmVhZGNydW1iczogYW55O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBmaXhlZENsYXNzO1xyXG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnQ6IGFueSwgcmVuZGVyZXI6IFJlbmRlcmVyMiwgc2VydmljZTogQXBwQnJlYWRjcnVtYlNlcnZpY2UsIGVsOiBFbGVtZW50UmVmKTtcclxuICAgIG5nT25Jbml0KCk6IHZvaWQ7XHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG4gICAgaXNGaXhlZChmaXhlZD86IGJvb2xlYW4pOiB2b2lkO1xyXG59XHJcbiJdfQ==