import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ClassToggler } from '../toggle-classes';
/**
 * Allows the sidebar to be toggled via click.
 */
import * as ɵngcc0 from '@angular/core';
export declare class SidebarToggleDirective implements OnInit {
    private classToggler;
    breakpoint: string;
    bp: any;
    constructor(classToggler: ClassToggler);
    ngOnInit(): void;
    toggleOpen($event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SidebarToggleDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<SidebarToggleDirective, "[appSidebarToggler]", never, { "breakpoint": "appSidebarToggler"; }, {}, never>;
}
export declare class SidebarMinimizeDirective {
    private document;
    private renderer;
    constructor(document: any, renderer: Renderer2);
    toggleOpen($event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SidebarMinimizeDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<SidebarMinimizeDirective, "[appSidebarMinimizer]", never, {}, {}, never>;
}
export declare class MobileSidebarToggleDirective {
    private document;
    private renderer;
    constructor(document: any, renderer: Renderer2);
    toggleOpen($event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MobileSidebarToggleDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<MobileSidebarToggleDirective, "[appMobileSidebarToggler]", never, {}, {}, never>;
}
/**
 * Allows the off-canvas sidebar to be closed via click.
 */
export declare class SidebarOffCanvasCloseDirective {
    private document;
    private renderer;
    constructor(document: any, renderer: Renderer2);
    toggleOpen($event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SidebarOffCanvasCloseDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<SidebarOffCanvasCloseDirective, "[appSidebarClose]", never, {}, {}, never>;
}
export declare class BrandMinimizeDirective {
    private document;
    private renderer;
    constructor(document: any, renderer: Renderer2);
    toggleOpen($event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<BrandMinimizeDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<BrandMinimizeDirective, "[appBrandMinimizer]", never, {}, {}, never>;
}
/**
 * Allows the aside to be toggled via click.
 */
export declare class AsideToggleDirective implements OnInit {
    private classToggler;
    breakpoint: string;
    bp: any;
    constructor(classToggler: ClassToggler);
    ngOnInit(): void;
    toggleOpen($event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AsideToggleDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<AsideToggleDirective, "[appAsideMenuToggler]", never, { "breakpoint": "appAsideMenuToggler"; }, {}, never>;
}
export declare class HtmlAttributesDirective implements OnInit {
    private renderer;
    private el;
    appHtmlAttr: {
        [key: string]: string;
    };
    constructor(renderer: Renderer2, el: ElementRef);
    ngOnInit(): void;
    private setStyle;
    private addClass;
    private setAttrib;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<HtmlAttributesDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<HtmlAttributesDirective, "[appHtmlAttr]", never, { "appHtmlAttr": "appHtmlAttr"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmRpcmVjdGl2ZS5kLnRzIiwic291cmNlcyI6WyJsYXlvdXQuZGlyZWN0aXZlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUtBOzs7Ozs7Ozs7QUFPQTs7Ozs7Ozs7QUFNQTs7Ozs7Ozs7QUFNQTs7Ozs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFNQTs7Ozs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7Ozs7OztBQVlBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgT25Jbml0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2xhc3NUb2dnbGVyIH0gZnJvbSAnLi4vdG9nZ2xlLWNsYXNzZXMnO1xyXG4vKipcclxuICogQWxsb3dzIHRoZSBzaWRlYmFyIHRvIGJlIHRvZ2dsZWQgdmlhIGNsaWNrLlxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgU2lkZWJhclRvZ2dsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIGNsYXNzVG9nZ2xlcjtcclxuICAgIGJyZWFrcG9pbnQ6IHN0cmluZztcclxuICAgIGJwOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihjbGFzc1RvZ2dsZXI6IENsYXNzVG9nZ2xlcik7XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xyXG4gICAgdG9nZ2xlT3BlbigkZXZlbnQ6IGFueSk6IHZvaWQ7XHJcbn1cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgU2lkZWJhck1pbmltaXplRGlyZWN0aXZlIHtcclxuICAgIHByaXZhdGUgZG9jdW1lbnQ7XHJcbiAgICBwcml2YXRlIHJlbmRlcmVyO1xyXG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnQ6IGFueSwgcmVuZGVyZXI6IFJlbmRlcmVyMik7XHJcbiAgICB0b2dnbGVPcGVuKCRldmVudDogYW55KTogdm9pZDtcclxufVxyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNb2JpbGVTaWRlYmFyVG9nZ2xlRGlyZWN0aXZlIHtcclxuICAgIHByaXZhdGUgZG9jdW1lbnQ7XHJcbiAgICBwcml2YXRlIHJlbmRlcmVyO1xyXG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnQ6IGFueSwgcmVuZGVyZXI6IFJlbmRlcmVyMik7XHJcbiAgICB0b2dnbGVPcGVuKCRldmVudDogYW55KTogdm9pZDtcclxufVxyXG4vKipcclxuICogQWxsb3dzIHRoZSBvZmYtY2FudmFzIHNpZGViYXIgdG8gYmUgY2xvc2VkIHZpYSBjbGljay5cclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFNpZGViYXJPZmZDYW52YXNDbG9zZURpcmVjdGl2ZSB7XHJcbiAgICBwcml2YXRlIGRvY3VtZW50O1xyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjtcclxuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50OiBhbnksIHJlbmRlcmVyOiBSZW5kZXJlcjIpO1xyXG4gICAgdG9nZ2xlT3BlbigkZXZlbnQ6IGFueSk6IHZvaWQ7XHJcbn1cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgQnJhbmRNaW5pbWl6ZURpcmVjdGl2ZSB7XHJcbiAgICBwcml2YXRlIGRvY3VtZW50O1xyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjtcclxuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50OiBhbnksIHJlbmRlcmVyOiBSZW5kZXJlcjIpO1xyXG4gICAgdG9nZ2xlT3BlbigkZXZlbnQ6IGFueSk6IHZvaWQ7XHJcbn1cclxuLyoqXHJcbiAqIEFsbG93cyB0aGUgYXNpZGUgdG8gYmUgdG9nZ2xlZCB2aWEgY2xpY2suXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBBc2lkZVRvZ2dsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIGNsYXNzVG9nZ2xlcjtcclxuICAgIGJyZWFrcG9pbnQ6IHN0cmluZztcclxuICAgIGJwOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihjbGFzc1RvZ2dsZXI6IENsYXNzVG9nZ2xlcik7XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xyXG4gICAgdG9nZ2xlT3BlbigkZXZlbnQ6IGFueSk6IHZvaWQ7XHJcbn1cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgSHRtbEF0dHJpYnV0ZXNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjtcclxuICAgIHByaXZhdGUgZWw7XHJcbiAgICBhcHBIdG1sQXR0cjoge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcclxuICAgIH07XHJcbiAgICBjb25zdHJ1Y3RvcihyZW5kZXJlcjogUmVuZGVyZXIyLCBlbDogRWxlbWVudFJlZik7XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBzZXRTdHlsZTtcclxuICAgIHByaXZhdGUgYWRkQ2xhc3M7XHJcbiAgICBwcml2YXRlIHNldEF0dHJpYjtcclxufVxyXG4iXX0=