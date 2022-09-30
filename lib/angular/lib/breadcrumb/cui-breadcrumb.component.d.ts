import { OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AppBreadcrumbService } from './app-breadcrumb.service';
import * as ɵngcc0 from '@angular/core';
export declare class CuiBreadcrumbComponent implements OnInit, OnDestroy {
    private document;
    private renderer;
    service: AppBreadcrumbService;
    fixed: boolean;
    breadcrumbs: any;
    private readonly fixedClass;
    constructor(document: any, renderer: Renderer2, service: AppBreadcrumbService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isFixed(fixed?: boolean): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<CuiBreadcrumbComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<CuiBreadcrumbComponent, "cui-breadcrumb", never, { "fixed": "fixed"; }, {}, never, ["*"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VpLWJyZWFkY3J1bWIuY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbImN1aS1icmVhZGNydW1iLmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFFQTs7Ozs7Ozs7Ozs7OztBQVdBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBcHBCcmVhZGNydW1iU2VydmljZSB9IGZyb20gJy4vYXBwLWJyZWFkY3J1bWIuc2VydmljZSc7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEN1aUJyZWFkY3J1bWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBwcml2YXRlIGRvY3VtZW50O1xyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjtcclxuICAgIHNlcnZpY2U6IEFwcEJyZWFkY3J1bWJTZXJ2aWNlO1xyXG4gICAgZml4ZWQ6IGJvb2xlYW47XHJcbiAgICBicmVhZGNydW1iczogYW55O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBmaXhlZENsYXNzO1xyXG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnQ6IGFueSwgcmVuZGVyZXI6IFJlbmRlcmVyMiwgc2VydmljZTogQXBwQnJlYWRjcnVtYlNlcnZpY2UpO1xyXG4gICAgbmdPbkluaXQoKTogdm9pZDtcclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XHJcbiAgICBpc0ZpeGVkKGZpeGVkPzogYm9vbGVhbik6IHZvaWQ7XHJcbn1cclxuIl19