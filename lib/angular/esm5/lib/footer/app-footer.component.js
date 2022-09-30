import { __decorate, __metadata, __param } from "tslib";
import { Component, HostBinding, Inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as ɵngcc0 from '@angular/core';

var _c0 = ["*"];
var AppFooterComponent = /** @class */ (function () {
    function AppFooterComponent(document, renderer) {
        this.document = document;
        this.renderer = renderer;
        this.fixedClass = 'footer-fixed';
        this.appFooterClass = true;
    }
    AppFooterComponent.prototype.ngOnInit = function () {
        this.isFixed(this.fixed);
    };
    AppFooterComponent.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(this.document.body, this.fixedClass);
    };
    AppFooterComponent.prototype.isFixed = function (fixed) {
        if (fixed === void 0) { fixed = this.fixed; }
        if (fixed) {
            this.renderer.addClass(this.document.body, this.fixedClass);
        }
    };
    AppFooterComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: Renderer2 }
    ]; };
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
AppFooterComponent.ɵfac = function AppFooterComponent_Factory(t) { return new (t || AppFooterComponent)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
AppFooterComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppFooterComponent, selectors: [["app-footer"], ["cui-footer"]], hostVars: 2, hostBindings: function AppFooterComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("app-footer", ctx.appFooterClass);
    } }, inputs: { fixed: "fixed" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function AppFooterComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppFooterComponent, [{
        type: Component,
        args: [{
                selector: 'app-footer, cui-footer',
                template: "<ng-content></ng-content>"
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
    return AppFooterComponent;
}());
export { AppFooterComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWZvb3Rlci5jb21wb25lbnQuanMiLCJzb3VyY2VzIjpbIm5nOi9AY29yZXVpL2FuZ3VsYXIvbGliL2Zvb3Rlci9hcHAtZm9vdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFNekM7SUFPRSw0QkFDNEIsUUFBYSxFQUMvQixRQUFtQjtRQURELGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0IsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQU5aLGVBQVUsR0FBRyxjQUFjLENBQUM7UUFFWixtQkFBYyxHQUFHLElBQUksQ0FBQztJQUtuRCxDQUFDO0lBRUwscUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxvQ0FBTyxHQUFQLFVBQVEsS0FBMkI7UUFBM0Isc0JBQUEsRUFBQSxRQUFpQixJQUFJLENBQUMsS0FBSztRQUNqQyxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7O2dEQWhCRSxNQUFNLFNBQUMsUUFBUTtnQkFDRSxTQUFTOztJQVJwQjtRQUFSLEtBQUssRUFBRTs7cURBQWdCO0lBSVM7UUFBaEMsV0FBVyxDQUFDLGtCQUFrQixDQUFDOzs4REFBdUI7SUFMNUMsa0JBQWtCLGVBQWUsU0FKN0MsU0FBUyxDQUFDLG5CQUlILENBUUgsV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7RUFYbkIsUUFBUSxFQUFFLHdCQUF3QixjQUNsQyxRQUFRLEVBQUUsWEFXVSxTQUFTOzBCQVhRLG5CQUUxQixrQkFBa0IsQ0F5QjlCO1FBMUJBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkEyQkY7SUFEQSx5QkFBQztDQUFBLEFBekJELElBeUJDO1NBekJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBIb3N0QmluZGluZywgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1mb290ZXIsIGN1aS1mb290ZXInLFxyXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcEZvb3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBmaXhlZDogYm9vbGVhbjtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBmaXhlZENsYXNzID0gJ2Zvb3Rlci1maXhlZCc7XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYXBwLWZvb3RlcicpIGFwcEZvb3RlckNsYXNzID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzRml4ZWQodGhpcy5maXhlZCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCB0aGlzLmZpeGVkQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgaXNGaXhlZChmaXhlZDogYm9vbGVhbiA9IHRoaXMuZml4ZWQpOiB2b2lkIHtcclxuICAgIGlmIChmaXhlZCkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5maXhlZENsYXNzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19