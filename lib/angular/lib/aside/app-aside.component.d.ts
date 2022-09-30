import { OnInit, OnDestroy, Renderer2 } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class AppAsideComponent implements OnInit, OnDestroy {
    private document;
    private renderer;
    display: any;
    fixed: boolean;
    offCanvas: boolean;
    private readonly fixedClass;
    asideMenuClass: boolean;
    constructor(document: any, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isFixed(fixed?: boolean): void;
    isOffCanvas(offCanvas?: boolean): void;
    displayBreakpoint(display?: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AppAsideComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<AppAsideComponent, "app-aside, cui-aside", never, { "display": "display"; "fixed": "fixed"; "offCanvas": "offCanvas"; }, {}, never, ["*"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWFzaWRlLmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJhcHAtYXNpZGUuY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9uSW5pdCwgT25EZXN0cm95LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgQXBwQXNpZGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBwcml2YXRlIGRvY3VtZW50O1xyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjtcclxuICAgIGRpc3BsYXk6IGFueTtcclxuICAgIGZpeGVkOiBib29sZWFuO1xyXG4gICAgb2ZmQ2FudmFzOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBmaXhlZENsYXNzO1xyXG4gICAgYXNpZGVNZW51Q2xhc3M6IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudDogYW55LCByZW5kZXJlcjogUmVuZGVyZXIyKTtcclxuICAgIG5nT25Jbml0KCk6IHZvaWQ7XHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG4gICAgaXNGaXhlZChmaXhlZD86IGJvb2xlYW4pOiB2b2lkO1xyXG4gICAgaXNPZmZDYW52YXMob2ZmQ2FudmFzPzogYm9vbGVhbik6IHZvaWQ7XHJcbiAgICBkaXNwbGF5QnJlYWtwb2ludChkaXNwbGF5PzogYW55KTogdm9pZDtcclxufVxyXG4iXX0=