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
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMapInterpolate1("navbar-toggler ", ctx_r0.sidebarTogglerMobileClass, "");
} }
function AppHeaderComponent_ng_template_2_img_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "img", 5);
} if (rf & 2) {
    const ctx_r6 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("appHtmlAttr", ctx_r6.navbarBrand)("ngClass", "navbar-brand");
} }
function AppHeaderComponent_ng_template_2_img_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "img", 5);
} if (rf & 2) {
    const ctx_r7 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("appHtmlAttr", ctx_r7.navbarBrandFull)("ngClass", "navbar-brand-full");
} }
function AppHeaderComponent_ng_template_2_img_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "img", 5);
} if (rf & 2) {
    const ctx_r8 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("appHtmlAttr", ctx_r8.navbarBrandMinimized)("ngClass", "navbar-brand-minimized");
} }
function AppHeaderComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵtemplate(0, AppHeaderComponent_ng_template_2_img_0_Template, 1, 2, "img", 4);
    ɵngcc0.ɵɵtemplate(1, AppHeaderComponent_ng_template_2_img_1_Template, 1, 2, "img", 4);
    ɵngcc0.ɵɵtemplate(2, AppHeaderComponent_ng_template_2_img_2_Template, 1, 2, "img", 4);
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
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
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("innerHTML", ctx_r2.navbarBrandText.text, ɵngcc0.ɵɵsanitizeHtml);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("innerHTML", ctx_r2.navbarBrandText.icon, ɵngcc0.ɵɵsanitizeHtml);
} }
function AppHeaderComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "button", 8);
    ɵngcc0.ɵɵelement(1, "span", 3);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMapInterpolate1("navbar-toggler ", ctx_r3.sidebarTogglerClass, "");
    ɵngcc0.ɵɵproperty("appSidebarToggler", ctx_r3.sidebarToggler);
} }
function AppHeaderComponent_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "button", 9);
    ɵngcc0.ɵɵelement(1, "span", 3);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMapInterpolate1("navbar-toggler ", ctx_r4.asideTogglerClass, "");
    ɵngcc0.ɵɵproperty("appAsideMenuToggler", ctx_r4.asideMenuToggler);
} }
function AppHeaderComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "button", 10);
    ɵngcc0.ɵɵelement(1, "span", 3);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMapInterpolate1("navbar-toggler ", ctx_r5.asideTogglerMobileClass, "");
} }
const _c0 = ["*"];
let AppHeaderComponent = class AppHeaderComponent {
    constructor(document, renderer) {
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
    ngOnInit() {
        this.isFixed(this.fixed);
        this.navbarBrandImg = Boolean(this.navbarBrand || this.navbarBrandFull || this.navbarBrandMinimized);
        this.navbarBrandRouterLink = this.navbarBrandRouterLink[0] ? this.navbarBrandRouterLink : this.navbarBrandHref;
        this.sidebarTogglerClass = this.setToggerBreakpointClass(this.sidebarToggler);
        this.sidebarTogglerMobileClass = this.setToggerMobileBreakpointClass(this.sidebarToggler);
        this.asideTogglerClass = this.setToggerBreakpointClass(this.asideMenuToggler);
        this.asideTogglerMobileClass = this.setToggerMobileBreakpointClass(this.asideMenuToggler);
    }
    ngOnDestroy() {
        this.renderer.removeClass(this.document.body, this.fixedClass);
    }
    isFixed(fixed = this.fixed) {
        if (fixed) {
            this.renderer.addClass(this.document.body, this.fixedClass);
        }
    }
    setToggerBreakpointClass(breakpoint = 'md') {
        let togglerClass = 'd-none d-md-block';
        if (this.breakpoints.includes(breakpoint)) {
            const breakpointIndex = this.breakpoints.indexOf(breakpoint);
            togglerClass = `d-none d-${breakpoint}-block`;
        }
        return togglerClass;
    }
    setToggerMobileBreakpointClass(breakpoint = 'lg') {
        let togglerClass = 'd-lg-none';
        if (this.breakpoints.includes(breakpoint)) {
            togglerClass = `d-${breakpoint}-none`;
        }
        return togglerClass;
    }
};
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
AppHeaderComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Renderer2 }
];
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
export { AppHeaderComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWhlYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VzIjpbIm5nOi9AY29yZXVpL2FuZ3VsYXIvbGliL2hlYWRlci9hcHAtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTTNDLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBOEI3QixZQUM0QixRQUFhLEVBQy9CLFFBQW1CO1FBREQsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUMvQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBekJwQixvQkFBZSxHQUFRLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFDLENBQUM7UUFFdkQsMEJBQXFCLEdBQW1CLEVBQUUsQ0FBQztRQVFuQyxlQUFVLEdBQUcsY0FBYyxDQUFDO1FBRVosbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDMUIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFJL0IsZ0JBQVcsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RCx3QkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztRQUMxQyw4QkFBeUIsR0FBRyxXQUFXLENBQUM7UUFDeEMsc0JBQWlCLEdBQUcsbUJBQW1CLENBQUM7UUFDeEMsNEJBQXVCLEdBQUcsV0FBVyxDQUFDO0lBS2xDLENBQUM7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENB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QUNULHpCQUdFLENBK0JDLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBbENYLEVBQUUsd0JBQXdCLFVBQ2xDLE9Ba0NvQixTQUFTO0dBaENsQixrQkFBa0IsQ0F1RTlCOzs7Ozt1a0RBekUyQyxNQUMzQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBeUVGO1NBeEVhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIEluamVjdCwgUmVuZGVyZXIyLCBIb3N0QmluZGluZ30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWhlYWRlciwgY3VpLWhlYWRlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC1oZWFkZXIuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIEBJbnB1dCgpIGZpeGVkOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKSBuYXZiYXJCcmFuZDogYW55O1xyXG4gIEBJbnB1dCgpIG5hdmJhckJyYW5kRnVsbDogYW55O1xyXG4gIEBJbnB1dCgpIG5hdmJhckJyYW5kTWluaW1pemVkOiBhbnk7XHJcbiAgQElucHV0KCkgbmF2YmFyQnJhbmRUZXh0OiBhbnkgPSB7aWNvbjogJ/CfhbInLCB0ZXh0OiAn8J+FsiBDb3JlVUknfTtcclxuICBASW5wdXQoKSBuYXZiYXJCcmFuZEhyZWY6ICcnOyAvLyBkZXByZWNhdGVkLCB1c2UgbmF2YmFyQnJhbmRSb3V0ZXJMaW5rIGluc3RlYWRcclxuICBASW5wdXQoKSBuYXZiYXJCcmFuZFJvdXRlckxpbms6IGFueVtdIHwgc3RyaW5nID0gJyc7XHJcblxyXG4gIEBJbnB1dCgpIHNpZGViYXJUb2dnbGVyOiBzdHJpbmcgfCBib29sZWFuO1xyXG4gIEBJbnB1dCgpIG1vYmlsZVNpZGViYXJUb2dnbGVyOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKSBhc2lkZU1lbnVUb2dnbGVyOiBzdHJpbmcgfCBib29sZWFuO1xyXG4gIEBJbnB1dCgpIG1vYmlsZUFzaWRlTWVudVRvZ2dsZXI6IGJvb2xlYW47XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZml4ZWRDbGFzcyA9ICdoZWFkZXItZml4ZWQnO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFwcC1oZWFkZXInKSBhcHBIZWFkZXJDbGFzcyA9IHRydWU7XHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uYXZiYXInKSBuYXZiYXJDbGFzcyA9IHRydWU7XHJcblxyXG4gIG5hdmJhckJyYW5kSW1nOiBib29sZWFuO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGJyZWFrcG9pbnRzID0gWyd4bCcsICdsZycsICdtZCcsICdzbScsICd4cyddO1xyXG4gIHNpZGViYXJUb2dnbGVyQ2xhc3MgPSAnZC1ub25lIGQtbWQtYmxvY2snO1xyXG4gIHNpZGViYXJUb2dnbGVyTW9iaWxlQ2xhc3MgPSAnZC1sZy1ub25lJztcclxuICBhc2lkZVRvZ2dsZXJDbGFzcyA9ICdkLW5vbmUgZC1tZC1ibG9jayc7XHJcbiAgYXNpZGVUb2dnbGVyTW9iaWxlQ2xhc3MgPSAnZC1sZy1ub25lJztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzRml4ZWQodGhpcy5maXhlZCk7XHJcbiAgICB0aGlzLm5hdmJhckJyYW5kSW1nID0gQm9vbGVhbih0aGlzLm5hdmJhckJyYW5kIHx8IHRoaXMubmF2YmFyQnJhbmRGdWxsIHx8IHRoaXMubmF2YmFyQnJhbmRNaW5pbWl6ZWQpO1xyXG4gICAgdGhpcy5uYXZiYXJCcmFuZFJvdXRlckxpbmsgPSB0aGlzLm5hdmJhckJyYW5kUm91dGVyTGlua1swXSA/IHRoaXMubmF2YmFyQnJhbmRSb3V0ZXJMaW5rIDogdGhpcy5uYXZiYXJCcmFuZEhyZWY7XHJcbiAgICB0aGlzLnNpZGViYXJUb2dnbGVyQ2xhc3MgPSB0aGlzLnNldFRvZ2dlckJyZWFrcG9pbnRDbGFzcyh0aGlzLnNpZGViYXJUb2dnbGVyIGFzIHN0cmluZyk7XHJcbiAgICB0aGlzLnNpZGViYXJUb2dnbGVyTW9iaWxlQ2xhc3MgPSB0aGlzLnNldFRvZ2dlck1vYmlsZUJyZWFrcG9pbnRDbGFzcyh0aGlzLnNpZGViYXJUb2dnbGVyIGFzIHN0cmluZyk7XHJcbiAgICB0aGlzLmFzaWRlVG9nZ2xlckNsYXNzID0gdGhpcy5zZXRUb2dnZXJCcmVha3BvaW50Q2xhc3ModGhpcy5hc2lkZU1lbnVUb2dnbGVyIGFzIHN0cmluZyk7XHJcbiAgICB0aGlzLmFzaWRlVG9nZ2xlck1vYmlsZUNsYXNzID0gdGhpcy5zZXRUb2dnZXJNb2JpbGVCcmVha3BvaW50Q2xhc3ModGhpcy5hc2lkZU1lbnVUb2dnbGVyIGFzIHN0cmluZyk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCB0aGlzLmZpeGVkQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgaXNGaXhlZChmaXhlZDogYm9vbGVhbiA9IHRoaXMuZml4ZWQpOiB2b2lkIHtcclxuICAgIGlmIChmaXhlZCkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5maXhlZENsYXNzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldFRvZ2dlckJyZWFrcG9pbnRDbGFzcyhicmVha3BvaW50ID0gJ21kJykge1xyXG4gICAgbGV0IHRvZ2dsZXJDbGFzcyA9ICdkLW5vbmUgZC1tZC1ibG9jayc7XHJcbiAgICBpZiAodGhpcy5icmVha3BvaW50cy5pbmNsdWRlcyhicmVha3BvaW50KSkge1xyXG4gICAgICBjb25zdCBicmVha3BvaW50SW5kZXggPSB0aGlzLmJyZWFrcG9pbnRzLmluZGV4T2YoYnJlYWtwb2ludCk7XHJcbiAgICAgIHRvZ2dsZXJDbGFzcyA9IGBkLW5vbmUgZC0ke2JyZWFrcG9pbnR9LWJsb2NrYDtcclxuICAgIH1cclxuICAgIHJldHVybiB0b2dnbGVyQ2xhc3M7XHJcbiAgfVxyXG5cclxuICBzZXRUb2dnZXJNb2JpbGVCcmVha3BvaW50Q2xhc3MoYnJlYWtwb2ludCA9ICdsZycpIHtcclxuICAgIGxldCB0b2dnbGVyQ2xhc3MgPSAnZC1sZy1ub25lJztcclxuICAgIGlmICh0aGlzLmJyZWFrcG9pbnRzLmluY2x1ZGVzKGJyZWFrcG9pbnQpKSB7XHJcbiAgICAgIHRvZ2dsZXJDbGFzcyA9IGBkLSR7YnJlYWtwb2ludH0tbm9uZWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG9nZ2xlckNsYXNzO1xyXG4gIH1cclxufVxyXG4iXX0=