import { __decorate, __metadata, __param } from "tslib";
import { Component, Input, OnInit, OnDestroy, Inject, Renderer2, HostBinding } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/router';
import * as ɵngcc3 from '../shared/layout/layout.directive';

function AppHeaderComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "button", 2);
    ɵngcc0.ɵɵelement(1, "span", 3);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMapInterpolate1("navbar-toggler ", ctx_r0.sidebarTogglerMobileClass, "");
} }
function AppHeaderComponent_ng_template_2_img_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "img", 5);
} if (rf & 2) {
    var ctx_r6 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("appHtmlAttr", ctx_r6.navbarBrand)("ngClass", "navbar-brand");
} }
function AppHeaderComponent_ng_template_2_img_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "img", 5);
} if (rf & 2) {
    var ctx_r7 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("appHtmlAttr", ctx_r7.navbarBrandFull)("ngClass", "navbar-brand-full");
} }
function AppHeaderComponent_ng_template_2_img_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "img", 5);
} if (rf & 2) {
    var ctx_r8 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("appHtmlAttr", ctx_r8.navbarBrandMinimized)("ngClass", "navbar-brand-minimized");
} }
function AppHeaderComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵtemplate(0, AppHeaderComponent_ng_template_2_img_0_Template, 1, 2, "img", 4);
    ɵngcc0.ɵɵtemplate(1, AppHeaderComponent_ng_template_2_img_1_Template, 1, 2, "img", 4);
    ɵngcc0.ɵɵtemplate(2, AppHeaderComponent_ng_template_2_img_2_Template, 1, 2, "img", 4);
} if (rf & 2) {
    var ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngIf", ctx_r1.navbarBrand);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r1.navbarBrandFull);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r1.navbarBrandMinimized);
} }
function AppHeaderComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "div", 6);
    ɵngcc0.ɵɵelement(1, "div", 7);
} if (rf & 2) {
    var ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("innerHTML", ctx_r2.navbarBrandText.text, ɵngcc0.ɵɵsanitizeHtml);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("innerHTML", ctx_r2.navbarBrandText.icon, ɵngcc0.ɵɵsanitizeHtml);
} }
function AppHeaderComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "button", 8);
    ɵngcc0.ɵɵelement(1, "span", 3);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r3 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMapInterpolate1("navbar-toggler ", ctx_r3.sidebarTogglerClass, "");
    ɵngcc0.ɵɵproperty("appSidebarToggler", ctx_r3.sidebarToggler);
} }
function AppHeaderComponent_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "button", 9);
    ɵngcc0.ɵɵelement(1, "span", 3);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r4 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMapInterpolate1("navbar-toggler ", ctx_r4.asideTogglerClass, "");
    ɵngcc0.ɵɵproperty("appAsideMenuToggler", ctx_r4.asideMenuToggler);
} }
function AppHeaderComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "button", 10);
    ɵngcc0.ɵɵelement(1, "span", 3);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r5 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMapInterpolate1("navbar-toggler ", ctx_r5.asideTogglerMobileClass, "");
} }
var _c0 = ["*"];
var AppHeaderComponent = /** @class */ (function () {
    function AppHeaderComponent(document, renderer) {
        this.document = document;
        this.renderer = renderer;
        this.navbarBrandText = { icon: '🅲', text: '🅲 CoreUI' };
        this.navbarBrandRouterLink = '';
        this.fixedClass = 'header-fixed';
        this.appHeaderClass = true;
        this.navbarClass = true;
        this.breakpoints = ['xl', 'lg', 'md', 'sm', 'xs'];
        this.sidebarTogglerClass = 'd-none d-md-block';
        this.sidebarTogglerMobileClass = 'd-lg-none';
        this.asideTogglerClass = 'd-none d-md-block';
        this.asideTogglerMobileClass = 'd-lg-none';
    }
    AppHeaderComponent.prototype.ngOnInit = function () {
        this.isFixed(this.fixed);
        this.navbarBrandImg = Boolean(this.navbarBrand || this.navbarBrandFull || this.navbarBrandMinimized);
        this.navbarBrandRouterLink = this.navbarBrandRouterLink[0] ? this.navbarBrandRouterLink : this.navbarBrandHref;
        this.sidebarTogglerClass = this.setToggerBreakpointClass(this.sidebarToggler);
        this.sidebarTogglerMobileClass = this.setToggerMobileBreakpointClass(this.sidebarToggler);
        this.asideTogglerClass = this.setToggerBreakpointClass(this.asideMenuToggler);
        this.asideTogglerMobileClass = this.setToggerMobileBreakpointClass(this.asideMenuToggler);
    };
    AppHeaderComponent.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(this.document.body, this.fixedClass);
    };
    AppHeaderComponent.prototype.isFixed = function (fixed) {
        if (fixed === void 0) { fixed = this.fixed; }
        if (fixed) {
            this.renderer.addClass(this.document.body, this.fixedClass);
        }
    };
    AppHeaderComponent.prototype.setToggerBreakpointClass = function (breakpoint) {
        if (breakpoint === void 0) { breakpoint = 'md'; }
        var togglerClass = 'd-none d-md-block';
        if (this.breakpoints.includes(breakpoint)) {
            var breakpointIndex = this.breakpoints.indexOf(breakpoint);
            togglerClass = "d-none d-" + breakpoint + "-block";
        }
        return togglerClass;
    };
    AppHeaderComponent.prototype.setToggerMobileBreakpointClass = function (breakpoint) {
        if (breakpoint === void 0) { breakpoint = 'lg'; }
        var togglerClass = 'd-lg-none';
        if (this.breakpoints.includes(breakpoint)) {
            togglerClass = "d-" + breakpoint + "-none";
        }
        return togglerClass;
    };
    AppHeaderComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AppHeaderComponent.prototype, "fixed", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AppHeaderComponent.prototype, "navbarBrand", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AppHeaderComponent.prototype, "navbarBrandFull", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AppHeaderComponent.prototype, "navbarBrandMinimized", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AppHeaderComponent.prototype, "navbarBrandText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AppHeaderComponent.prototype, "navbarBrandHref", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AppHeaderComponent.prototype, "navbarBrandRouterLink", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AppHeaderComponent.prototype, "sidebarToggler", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AppHeaderComponent.prototype, "mobileSidebarToggler", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AppHeaderComponent.prototype, "asideMenuToggler", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AppHeaderComponent.prototype, "mobileAsideMenuToggler", void 0);
    __decorate([
        HostBinding('class.app-header'),
        __metadata("design:type", Object)
    ], AppHeaderComponent.prototype, "appHeaderClass", void 0);
    __decorate([
        HostBinding('class.navbar'),
        __metadata("design:type", Object)
    ], AppHeaderComponent.prototype, "navbarClass", void 0);
    AppHeaderComponent = __decorate([ __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object, Renderer2])
    ], AppHeaderComponent);
AppHeaderComponent.ɵfac = function AppHeaderComponent_Factory(t) { return new (t || AppHeaderComponent)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
AppHeaderComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppHeaderComponent, selectors: [["app-header"], ["cui-header"]], hostVars: 4, hostBindings: function AppHeaderComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("app-header", ctx.appHeaderClass)("navbar", ctx.navbarClass);
    } }, inputs: { navbarBrandText: "navbarBrandText", navbarBrandRouterLink: "navbarBrandRouterLink", fixed: "fixed", navbarBrand: "navbarBrand", navbarBrandFull: "navbarBrandFull", navbarBrandMinimized: "navbarBrandMinimized", navbarBrandHref: "navbarBrandHref", sidebarToggler: "sidebarToggler", mobileSidebarToggler: "mobileSidebarToggler", asideMenuToggler: "asideMenuToggler", mobileAsideMenuToggler: "mobileAsideMenuToggler" }, ngContentSelectors: _c0, decls: 8, vars: 7, consts: [[3, "ngIf"], [1, "navbar-brand", 3, "routerLink"], ["type", "button", "appSidebarToggler", ""], [1, "navbar-toggler-icon"], [3, "appHtmlAttr", "ngClass", 4, "ngIf"], [3, "appHtmlAttr", "ngClass"], [1, "navbar-brand-full", 3, "innerHTML"], [1, "navbar-brand-minimized", 3, "innerHTML"], ["type", "button", 3, "appSidebarToggler"], ["type", "button", 3, "appAsideMenuToggler"], ["type", "button", "appAsideMenuToggler", ""]], template: function AppHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵtemplate(0, AppHeaderComponent_ng_template_0_Template, 2, 3, "ng-template", 0);
        ɵngcc0.ɵɵelementStart(1, "a", 1);
        ɵngcc0.ɵɵtemplate(2, AppHeaderComponent_ng_template_2_Template, 3, 3, "ng-template", 0);
        ɵngcc0.ɵɵtemplate(3, AppHeaderComponent_ng_template_3_Template, 2, 2, "ng-template", 0);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(4, AppHeaderComponent_ng_template_4_Template, 2, 4, "ng-template", 0);
        ɵngcc0.ɵɵprojection(5);
        ɵngcc0.ɵɵtemplate(6, AppHeaderComponent_ng_template_6_Template, 2, 4, "ng-template", 0);
        ɵngcc0.ɵɵtemplate(7, AppHeaderComponent_ng_template_7_Template, 2, 3, "ng-template", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.mobileSidebarToggler != false);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("routerLink", ctx.navbarBrandRouterLink);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.navbarBrandImg);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.navbarBrandImg);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.sidebarToggler != false);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngIf", ctx.asideMenuToggler != false);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.mobileAsideMenuToggler != false);
    } }, directives: [ɵngcc1.NgIf, ɵngcc2.RouterLinkWithHref, ɵngcc3.SidebarToggleDirective, ɵngcc3.HtmlAttributesDirective, ɵngcc1.NgClass, ɵngcc3.AsideToggleDirective], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppHeaderComponent, [{
        type: Component,
        args: [{
                selector: 'app-header, cui-header',
                template: "<ng-template [ngIf]=\"mobileSidebarToggler != false\">\r\n  <button class=\"navbar-toggler {{sidebarTogglerMobileClass}}\" type=\"button\" appSidebarToggler>\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n</ng-template>\r\n<a class=\"navbar-brand\" [routerLink]=\"navbarBrandRouterLink\">\r\n  <ng-template [ngIf]=\"navbarBrandImg\">\r\n    <img *ngIf=\"navbarBrand\"\r\n         [appHtmlAttr]=\"navbarBrand\"\r\n         [ngClass]=\"'navbar-brand'\">\r\n    <img *ngIf=\"navbarBrandFull\"\r\n         [appHtmlAttr]=\"navbarBrandFull\"\r\n         [ngClass]=\"'navbar-brand-full'\">\r\n    <img *ngIf=\"navbarBrandMinimized\"\r\n         [appHtmlAttr]=\"navbarBrandMinimized\"\r\n         [ngClass]=\"'navbar-brand-minimized'\">\r\n  </ng-template>\r\n  <ng-template [ngIf]=\"!navbarBrandImg\">\r\n    <div class=\"navbar-brand-full\" [innerHTML]=\"navbarBrandText.text\"></div>\r\n    <div class=\"navbar-brand-minimized\" [innerHTML]=\"navbarBrandText.icon\"></div>\r\n  </ng-template>\r\n</a>\r\n<ng-template [ngIf]=\"sidebarToggler != false\">\r\n  <button class=\"navbar-toggler {{sidebarTogglerClass}}\" type=\"button\" [appSidebarToggler]=\"sidebarToggler\">\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n</ng-template>\r\n<ng-content></ng-content>\r\n<ng-template [ngIf]=\"asideMenuToggler != false\">\r\n  <button class=\"navbar-toggler {{asideTogglerClass}}\" type=\"button\" [appAsideMenuToggler]=\"asideMenuToggler\">\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n</ng-template>\r\n<ng-template [ngIf]=\"mobileAsideMenuToggler != false\">\r\n  <button class=\"navbar-toggler {{asideTogglerMobileClass}}\" type=\"button\" appAsideMenuToggler>\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n</ng-template>\r\n"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, { navbarBrandText: [{
            type: Input
        }], navbarBrandRouterLink: [{
            type: Input
        }], appHeaderClass: [{
            type: HostBinding,
            args: ['class.app-header']
        }], navbarClass: [{
            type: HostBinding,
            args: ['class.navbar']
        }], fixed: [{
            type: Input
        }], navbarBrand: [{
            type: Input
        }], navbarBrandFull: [{
            type: Input
        }], navbarBrandMinimized: [{
            type: Input
        }], navbarBrandHref: [{
            type: Input
        }], sidebarToggler: [{
            type: Input
        }], mobileSidebarToggler: [{
            type: Input
        }], asideMenuToggler: [{
            type: Input
        }], mobileAsideMenuToggler: [{
            type: Input
        }] }); })();
    return AppHeaderComponent;
}());
export { AppHeaderComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWhlYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VzIjpbIm5nOi9AY29yZXVpL2FuZ3VsYXIvbGliL2hlYWRlci9hcHAtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTTNDO0lBOEJFLDRCQUM0QixRQUFhLEVBQy9CLFFBQW1CO1FBREQsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUMvQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBekJwQixvQkFBZSxHQUFRLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFDLENBQUM7UUFFdkQsMEJBQXFCLEdBQW1CLEVBQUUsQ0FBQztRQVFuQyxlQUFVLEdBQUcsY0FBYyxDQUFDO1FBRVosbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDMUIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFJL0IsZ0JBQVcsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RCx3QkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztRQUMxQyw4QkFBeUIsR0FBRyxXQUFXLENBQUM7UUFDeEMsc0JBQWlCLEdBQUcsbUJBQW1CLENBQUM7UUFDeEMsNEJBQXVCLEdBQUcsV0FBVyxDQUFDO0lBS2xDLENBQUM7SUFFTCxxQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIs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U0FKN0MsU0FBUyxDQUFDLG5CQUlILENBK0JILFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBbENuQixRQUFRLEVBQUUsd0JBQXdCLGNBQ2xDLERBa0NvQixTQUFTO09BaENsQixrQkFBa0IsQ0F1RTlCOzs7Ozs7Ozs7a0NBekUyQyxVQUMzQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQXlFRjtJQURBLHlCQUFDO0NBQUEsQUF2RUQsSUF1RUM7U0F2RVksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSwgSW5qZWN0LCBSZW5kZXJlcjIsIEhvc3RCaW5kaW5nfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtaGVhZGVyLCBjdWktaGVhZGVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwLWhlYWRlci5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcEhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgQElucHV0KCkgZml4ZWQ6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIG5hdmJhckJyYW5kOiBhbnk7XHJcbiAgQElucHV0KCkgbmF2YmFyQnJhbmRGdWxsOiBhbnk7XHJcbiAgQElucHV0KCkgbmF2YmFyQnJhbmRNaW5pbWl6ZWQ6IGFueTtcclxuICBASW5wdXQoKSBuYXZiYXJCcmFuZFRleHQ6IGFueSA9IHtpY29uOiAn8J+FsicsIHRleHQ6ICfwn4WyIENvcmVVSSd9O1xyXG4gIEBJbnB1dCgpIG5hdmJhckJyYW5kSHJlZjogJyc7IC8vIGRlcHJlY2F0ZWQsIHVzZSBuYXZiYXJCcmFuZFJvdXRlckxpbmsgaW5zdGVhZFxyXG4gIEBJbnB1dCgpIG5hdmJhckJyYW5kUm91dGVyTGluazogYW55W10gfCBzdHJpbmcgPSAnJztcclxuXHJcbiAgQElucHV0KCkgc2lkZWJhclRvZ2dsZXI6IHN0cmluZyB8IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbW9iaWxlU2lkZWJhclRvZ2dsZXI6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIGFzaWRlTWVudVRvZ2dsZXI6IHN0cmluZyB8IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbW9iaWxlQXNpZGVNZW51VG9nZ2xlcjogYm9vbGVhbjtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBmaXhlZENsYXNzID0gJ2hlYWRlci1maXhlZCc7XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYXBwLWhlYWRlcicpIGFwcEhlYWRlckNsYXNzID0gdHJ1ZTtcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5hdmJhcicpIG5hdmJhckNsYXNzID0gdHJ1ZTtcclxuXHJcbiAgbmF2YmFyQnJhbmRJbWc6IGJvb2xlYW47XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgYnJlYWtwb2ludHMgPSBbJ3hsJywgJ2xnJywgJ21kJywgJ3NtJywgJ3hzJ107XHJcbiAgc2lkZWJhclRvZ2dsZXJDbGFzcyA9ICdkLW5vbmUgZC1tZC1ibG9jayc7XHJcbiAgc2lkZWJhclRvZ2dsZXJNb2JpbGVDbGFzcyA9ICdkLWxnLW5vbmUnO1xyXG4gIGFzaWRlVG9nZ2xlckNsYXNzID0gJ2Qtbm9uZSBkLW1kLWJsb2NrJztcclxuICBhc2lkZVRvZ2dsZXJNb2JpbGVDbGFzcyA9ICdkLWxnLW5vbmUnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNGaXhlZCh0aGlzLmZpeGVkKTtcclxuICAgIHRoaXMubmF2YmFyQnJhbmRJbWcgPSBCb29sZWFuKHRoaXMubmF2YmFyQnJhbmQgfHwgdGhpcy5uYXZiYXJCcmFuZEZ1bGwgfHwgdGhpcy5uYXZiYXJCcmFuZE1pbmltaXplZCk7XHJcbiAgICB0aGlzLm5hdmJhckJyYW5kUm91dGVyTGluayA9IHRoaXMubmF2YmFyQnJhbmRSb3V0ZXJMaW5rWzBdID8gdGhpcy5uYXZiYXJCcmFuZFJvdXRlckxpbmsgOiB0aGlzLm5hdmJhckJyYW5kSHJlZjtcclxuICAgIHRoaXMuc2lkZWJhclRvZ2dsZXJDbGFzcyA9IHRoaXMuc2V0VG9nZ2VyQnJlYWtwb2ludENsYXNzKHRoaXMuc2lkZWJhclRvZ2dsZXIgYXMgc3RyaW5nKTtcclxuICAgIHRoaXMuc2lkZWJhclRvZ2dsZXJNb2JpbGVDbGFzcyA9IHRoaXMuc2V0VG9nZ2VyTW9iaWxlQnJlYWtwb2ludENsYXNzKHRoaXMuc2lkZWJhclRvZ2dsZXIgYXMgc3RyaW5nKTtcclxuICAgIHRoaXMuYXNpZGVUb2dnbGVyQ2xhc3MgPSB0aGlzLnNldFRvZ2dlckJyZWFrcG9pbnRDbGFzcyh0aGlzLmFzaWRlTWVudVRvZ2dsZXIgYXMgc3RyaW5nKTtcclxuICAgIHRoaXMuYXNpZGVUb2dnbGVyTW9iaWxlQ2xhc3MgPSB0aGlzLnNldFRvZ2dlck1vYmlsZUJyZWFrcG9pbnRDbGFzcyh0aGlzLmFzaWRlTWVudVRvZ2dsZXIgYXMgc3RyaW5nKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksIHRoaXMuZml4ZWRDbGFzcyk7XHJcbiAgfVxyXG5cclxuICBpc0ZpeGVkKGZpeGVkOiBib29sZWFuID0gdGhpcy5maXhlZCk6IHZvaWQge1xyXG4gICAgaWYgKGZpeGVkKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCB0aGlzLmZpeGVkQ2xhc3MpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0VG9nZ2VyQnJlYWtwb2ludENsYXNzKGJyZWFrcG9pbnQgPSAnbWQnKSB7XHJcbiAgICBsZXQgdG9nZ2xlckNsYXNzID0gJ2Qtbm9uZSBkLW1kLWJsb2NrJztcclxuICAgIGlmICh0aGlzLmJyZWFrcG9pbnRzLmluY2x1ZGVzKGJyZWFrcG9pbnQpKSB7XHJcbiAgICAgIGNvbnN0IGJyZWFrcG9pbnRJbmRleCA9IHRoaXMuYnJlYWtwb2ludHMuaW5kZXhPZihicmVha3BvaW50KTtcclxuICAgICAgdG9nZ2xlckNsYXNzID0gYGQtbm9uZSBkLSR7YnJlYWtwb2ludH0tYmxvY2tgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvZ2dsZXJDbGFzcztcclxuICB9XHJcblxyXG4gIHNldFRvZ2dlck1vYmlsZUJyZWFrcG9pbnRDbGFzcyhicmVha3BvaW50ID0gJ2xnJykge1xyXG4gICAgbGV0IHRvZ2dsZXJDbGFzcyA9ICdkLWxnLW5vbmUnO1xyXG4gICAgaWYgKHRoaXMuYnJlYWtwb2ludHMuaW5jbHVkZXMoYnJlYWtwb2ludCkpIHtcclxuICAgICAgdG9nZ2xlckNsYXNzID0gYGQtJHticmVha3BvaW50fS1ub25lYDtcclxuICAgIH1cclxuICAgIHJldHVybiB0b2dnbGVyQ2xhc3M7XHJcbiAgfVxyXG59XHJcbiJdfQ==