import { __decorate, __metadata, __param } from "tslib";
import { Component, HostBinding, Inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as ɵngcc0 from '@angular/core';

const _c0 = ["*"];
let AppFooterComponent = class AppFooterComponent {
    constructor(document, renderer) {
        this.document = document;
        this.renderer = renderer;
        this.fixedClass = 'footer-fixed';
        this.appFooterClass = true;
    }
    ngOnInit() {
        this.isFixed(this.fixed);
    }
    ngOnDestroy() {
        this.renderer.removeClass(this.document.body, this.fixedClass);
    }
    isFixed(fixed = this.fixed) {
        if (fixed) {
            this.renderer.addClass(this.document.body, this.fixedClass);
        }
    }
};
AppFooterComponent.ɵfac = function AppFooterComponent_Factory(t) { return new (t || AppFooterComponent)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
AppFooterComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppFooterComponent, selectors: [["app-footer"], ["cui-footer"]], hostVars: 2, hostBindings: function AppFooterComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("app-footer", ctx.appFooterClass);
    } }, inputs: { fixed: "fixed" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function AppFooterComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
AppFooterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Renderer2 }
];
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], AppFooterComponent.prototype, "fixed", void 0);
__decorate([
    HostBinding('class.app-footer'),
    __metadata("design:type", Object)
], AppFooterComponent.prototype, "appFooterClass", void 0);
AppFooterComponent = __decorate([ __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object, Renderer2])
], AppFooterComponent);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppFooterComponent, [{
        type: Component,
        args: [{
                selector: 'app-footer, cui-footer',
                template: `<ng-content></ng-content>`
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, { appFooterClass: [{
            type: HostBinding,
            args: ['class.app-footer']
        }], fixed: [{
            type: Input
        }] }); })();
export { AppFooterComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWZvb3Rlci5jb21wb25lbnQuanMiLCJzb3VyY2VzIjpbIm5nOi9AY29yZXVpL2FuZ3VsYXIvbGliL2Zvb3Rlci9hcHAtZm9vdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFNekMsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFPN0IsWUFDNEIsUUFBYSxFQUMvQixRQUFtQjtRQURELGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0IsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQU5aLGVBQVUsR0FBRyxjQUFjLENBQUM7UUFFWixtQkFBYyxHQUFHLElBQUksQ0FBQztJQUtuRCxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxPQUFPLENBQUMsUUFBaUIsSUFBSSxDQUFDLEtBQUs7UUFDakMsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDO0NBQ0Y7Ozs7Ozs7NkJBQUE7OzRDQWpCSSxNQUFNLFNBQUMsUUFBUTtZQUNFLFNBQVM7O0FBUnBCO0lBQVIsS0FBSyxFQUFFOztpREFBZ0I7QUFJUztJQUFoQyxXQUFXLENBQUMsa0JBQWtCLENBQUM7OzBEQUF1QjtBQUw1QyxrQkFBa0IsZUFBZSxLQUo3QyxTQUFTLENBQUMsVUFDVCx6QkFHRSxDQVFDLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBWFgsRUFBRSx3QkFBd0IsVUFDbEMsUUFBUSxFQUFFLEhBV1UsU0FBUztrQkFYUSxmQUUxQixrQkFBa0IsQ0F5QjlCO0FBMUJBLENBQUM7Ozs7Ozs7Ozs7Ozs7O29CQTJCRjtTQTFCYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSG9zdEJpbmRpbmcsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtZm9vdGVyLCBjdWktZm9vdGVyJyxcclxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBGb290ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgZml4ZWQ6IGJvb2xlYW47XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZml4ZWRDbGFzcyA9ICdmb290ZXItZml4ZWQnO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFwcC1mb290ZXInKSBhcHBGb290ZXJDbGFzcyA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc0ZpeGVkKHRoaXMuZml4ZWQpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5maXhlZENsYXNzKTtcclxuICB9XHJcblxyXG4gIGlzRml4ZWQoZml4ZWQ6IGJvb2xlYW4gPSB0aGlzLmZpeGVkKTogdm9pZCB7XHJcbiAgICBpZiAoZml4ZWQpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksIHRoaXMuZml4ZWRDbGFzcyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==