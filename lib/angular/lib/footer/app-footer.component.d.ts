import { OnDestroy, OnInit, Renderer2 } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class AppFooterComponent implements OnInit, OnDestroy {
    private document;
    private renderer;
    fixed: boolean;
    private readonly fixedClass;
    appFooterClass: boolean;
    constructor(document: any, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isFixed(fixed?: boolean): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AppFooterComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<AppFooterComponent, "app-footer, cui-footer", never, { "fixed": "fixed"; }, {}, never, ["*"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWZvb3Rlci5jb21wb25lbnQuZC50cyIsInNvdXJjZXMiOlsiYXBwLWZvb3Rlci5jb21wb25lbnQuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBVUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbkRlc3Ryb3ksIE9uSW5pdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEFwcEZvb3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIHByaXZhdGUgZG9jdW1lbnQ7XHJcbiAgICBwcml2YXRlIHJlbmRlcmVyO1xyXG4gICAgZml4ZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZpeGVkQ2xhc3M7XHJcbiAgICBhcHBGb290ZXJDbGFzczogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50OiBhbnksIHJlbmRlcmVyOiBSZW5kZXJlcjIpO1xyXG4gICAgbmdPbkluaXQoKTogdm9pZDtcclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XHJcbiAgICBpc0ZpeGVkKGZpeGVkPzogYm9vbGVhbik6IHZvaWQ7XHJcbn1cclxuIl19