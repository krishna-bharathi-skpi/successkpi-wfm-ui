import { EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AppSidebarService } from './app-sidebar.service';
import * as ɵngcc0 from '@angular/core';
export declare class AppSidebarComponent implements OnInit, OnDestroy {
    private document;
    private renderer;
    private sidebarService;
    private subscriptionEvents;
    private _minimized;
    compact: boolean;
    display: any;
    fixed: boolean;
    offCanvas: boolean;
    minimized: boolean;
    /**
     * Emits whenever the minimized state of the sidebar changes.
     * Primarily used to facilitate two-way binding.
     */
    minimizedChange: EventEmitter<boolean>;
    sidebarClass: boolean;
    constructor(document: any, renderer: Renderer2, sidebarService: AppSidebarService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isCompact(compact?: boolean): void;
    isFixed(fixed?: boolean): void;
    toggleMinimized(): void;
    isOffCanvas(offCanvas?: boolean): void;
    displayBreakpoint(display?: any): void;
    private _updateMinimized;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AppSidebarComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<AppSidebarComponent, "app-sidebar, cui-sidebar", never, { "minimized": "minimized"; "compact": "compact"; "display": "display"; "fixed": "fixed"; "offCanvas": "offCanvas"; }, { "minimizedChange": "minimizedChange"; }, never, ["*"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXIuY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbImFwcC1zaWRlYmFyLmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBcHBTaWRlYmFyU2VydmljZSB9IGZyb20gJy4vYXBwLXNpZGViYXIuc2VydmljZSc7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEFwcFNpZGViYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBwcml2YXRlIGRvY3VtZW50O1xyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjtcclxuICAgIHByaXZhdGUgc2lkZWJhclNlcnZpY2U7XHJcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbkV2ZW50cztcclxuICAgIHByaXZhdGUgX21pbmltaXplZDtcclxuICAgIGNvbXBhY3Q6IGJvb2xlYW47XHJcbiAgICBkaXNwbGF5OiBhbnk7XHJcbiAgICBmaXhlZDogYm9vbGVhbjtcclxuICAgIG9mZkNhbnZhczogYm9vbGVhbjtcclxuICAgIG1pbmltaXplZDogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogRW1pdHMgd2hlbmV2ZXIgdGhlIG1pbmltaXplZCBzdGF0ZSBvZiB0aGUgc2lkZWJhciBjaGFuZ2VzLlxyXG4gICAgICogUHJpbWFyaWx5IHVzZWQgdG8gZmFjaWxpdGF0ZSB0d28td2F5IGJpbmRpbmcuXHJcbiAgICAgKi9cclxuICAgIG1pbmltaXplZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xyXG4gICAgc2lkZWJhckNsYXNzOiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnQ6IGFueSwgcmVuZGVyZXI6IFJlbmRlcmVyMiwgc2lkZWJhclNlcnZpY2U6IEFwcFNpZGViYXJTZXJ2aWNlKTtcclxuICAgIG5nT25Jbml0KCk6IHZvaWQ7XHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG4gICAgaXNDb21wYWN0KGNvbXBhY3Q/OiBib29sZWFuKTogdm9pZDtcclxuICAgIGlzRml4ZWQoZml4ZWQ/OiBib29sZWFuKTogdm9pZDtcclxuICAgIHRvZ2dsZU1pbmltaXplZCgpOiB2b2lkO1xyXG4gICAgaXNPZmZDYW52YXMob2ZmQ2FudmFzPzogYm9vbGVhbik6IHZvaWQ7XHJcbiAgICBkaXNwbGF5QnJlYWtwb2ludChkaXNwbGF5PzogYW55KTogdm9pZDtcclxuICAgIHByaXZhdGUgX3VwZGF0ZU1pbmltaXplZDtcclxufVxyXG4iXX0=