import { __decorate, __metadata, __param } from "tslib";
import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { asideMenuCssClasses, sidebarCssClasses } from '../classes';
import { ClassToggler } from '../toggle-classes';
/**
 * Allows the sidebar to be toggled via click.
 */
import * as ɵngcc0 from '@angular/core';
let SidebarToggleDirective = class SidebarToggleDirective {
    constructor(classToggler) {
        this.classToggler = classToggler;
    }
    ngOnInit() {
        this.bp = this.breakpoint;
    }
    toggleOpen($event) {
        $event.preventDefault();
        const cssClass = this.bp ? `sidebar-${this.bp}-show` : sidebarCssClasses[0];
        this.classToggler.toggleClasses(cssClass, sidebarCssClasses);
    }
};
SidebarToggleDirective.ɵfac = function SidebarToggleDirective_Factory(t) { return new (t || SidebarToggleDirective)(ɵngcc0.ɵɵdirectiveInject(ClassToggler)); };
SidebarToggleDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: SidebarToggleDirective, selectors: [["", "appSidebarToggler", ""]], hostBindings: function SidebarToggleDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function SidebarToggleDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } }, inputs: { breakpoint: ["appSidebarToggler", "breakpoint"] }, features: [ɵngcc0.ɵɵProvidersFeature([ClassToggler])] });
SidebarToggleDirective.ctorParameters = () => [
    { type: ClassToggler }
];
__decorate([
    Input('appSidebarToggler'),
    __metadata("design:type", String)
], SidebarToggleDirective.prototype, "breakpoint", void 0);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SidebarToggleDirective.prototype, "toggleOpen", null);
SidebarToggleDirective = __decorate([ __metadata("design:paramtypes", [ClassToggler])
], SidebarToggleDirective);
export { SidebarToggleDirective };
let SidebarMinimizeDirective = class SidebarMinimizeDirective {
    constructor(document, renderer) {
        this.document = document;
        this.renderer = renderer;
    }
    toggleOpen($event) {
        $event.preventDefault();
        const body = this.document.body;
        body.classList.contains('sidebar-minimized') ?
            this.renderer.removeClass(body, 'sidebar-minimized') :
            this.renderer.addClass(body, 'sidebar-minimized');
    }
};
SidebarMinimizeDirective.ɵfac = function SidebarMinimizeDirective_Factory(t) { return new (t || SidebarMinimizeDirective)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
SidebarMinimizeDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: SidebarMinimizeDirective, selectors: [["", "appSidebarMinimizer", ""]], hostBindings: function SidebarMinimizeDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function SidebarMinimizeDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } } });
SidebarMinimizeDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Renderer2 }
];
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SidebarMinimizeDirective.prototype, "toggleOpen", null);
SidebarMinimizeDirective = __decorate([ __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object, Renderer2])
], SidebarMinimizeDirective);
export { SidebarMinimizeDirective };
let MobileSidebarToggleDirective = class MobileSidebarToggleDirective {
    constructor(document, renderer) {
        this.document = document;
        this.renderer = renderer;
    }
    toggleOpen($event) {
        $event.preventDefault();
        const body = this.document.body;
        body.classList.contains('sidebar-show') ?
            this.renderer.removeClass(body, 'sidebar-show') :
            this.renderer.addClass(body, 'sidebar-show');
    }
};
MobileSidebarToggleDirective.ɵfac = function MobileSidebarToggleDirective_Factory(t) { return new (t || MobileSidebarToggleDirective)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
MobileSidebarToggleDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: MobileSidebarToggleDirective, selectors: [["", "appMobileSidebarToggler", ""]], hostBindings: function MobileSidebarToggleDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function MobileSidebarToggleDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } } });
MobileSidebarToggleDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Renderer2 }
];
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MobileSidebarToggleDirective.prototype, "toggleOpen", null);
MobileSidebarToggleDirective = __decorate([ __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object, Renderer2])
], MobileSidebarToggleDirective);
export { MobileSidebarToggleDirective };
/**
 * Allows the off-canvas sidebar to be closed via click.
 */
let SidebarOffCanvasCloseDirective = class SidebarOffCanvasCloseDirective {
    constructor(document, renderer) {
        this.document = document;
        this.renderer = renderer;
    }
    toggleOpen($event) {
        $event.preventDefault();
        const body = this.document.body;
        if (body.classList.contains('sidebar-off-canvas')) {
            body.classList.contains('sidebar-show') ?
                this.renderer.removeClass(body, 'sidebar-show') :
                this.renderer.addClass(body, 'sidebar-show');
        }
    }
};
SidebarOffCanvasCloseDirective.ɵfac = function SidebarOffCanvasCloseDirective_Factory(t) { return new (t || SidebarOffCanvasCloseDirective)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
SidebarOffCanvasCloseDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: SidebarOffCanvasCloseDirective, selectors: [["", "appSidebarClose", ""]], hostBindings: function SidebarOffCanvasCloseDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function SidebarOffCanvasCloseDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } } });
SidebarOffCanvasCloseDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Renderer2 }
];
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SidebarOffCanvasCloseDirective.prototype, "toggleOpen", null);
SidebarOffCanvasCloseDirective = __decorate([ __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object, Renderer2])
], SidebarOffCanvasCloseDirective);
export { SidebarOffCanvasCloseDirective };
let BrandMinimizeDirective = class BrandMinimizeDirective {
    constructor(document, renderer) {
        this.document = document;
        this.renderer = renderer;
    }
    toggleOpen($event) {
        $event.preventDefault();
        const body = this.document.body;
        body.classList.contains('brand-minimized') ?
            this.renderer.removeClass(body, 'brand-minimized') :
            this.renderer.addClass(body, 'brand-minimized');
    }
};
BrandMinimizeDirective.ɵfac = function BrandMinimizeDirective_Factory(t) { return new (t || BrandMinimizeDirective)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
BrandMinimizeDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: BrandMinimizeDirective, selectors: [["", "appBrandMinimizer", ""]], hostBindings: function BrandMinimizeDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function BrandMinimizeDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } } });
BrandMinimizeDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Renderer2 }
];
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BrandMinimizeDirective.prototype, "toggleOpen", null);
BrandMinimizeDirective = __decorate([ __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object, Renderer2])
], BrandMinimizeDirective);
export { BrandMinimizeDirective };
/**
 * Allows the aside to be toggled via click.
 */
let AsideToggleDirective = class AsideToggleDirective {
    constructor(classToggler) {
        this.classToggler = classToggler;
    }
    ngOnInit() {
        this.bp = this.breakpoint;
    }
    toggleOpen($event) {
        $event.preventDefault();
        const cssClass = this.bp ? `aside-menu-${this.bp}-show` : asideMenuCssClasses[0];
        this.classToggler.toggleClasses(cssClass, asideMenuCssClasses);
    }
};
AsideToggleDirective.ɵfac = function AsideToggleDirective_Factory(t) { return new (t || AsideToggleDirective)(ɵngcc0.ɵɵdirectiveInject(ClassToggler)); };
AsideToggleDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: AsideToggleDirective, selectors: [["", "appAsideMenuToggler", ""]], hostBindings: function AsideToggleDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function AsideToggleDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } }, inputs: { breakpoint: ["appAsideMenuToggler", "breakpoint"] }, features: [ɵngcc0.ɵɵProvidersFeature([ClassToggler])] });
AsideToggleDirective.ctorParameters = () => [
    { type: ClassToggler }
];
__decorate([
    Input('appAsideMenuToggler'),
    __metadata("design:type", String)
], AsideToggleDirective.prototype, "breakpoint", void 0);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AsideToggleDirective.prototype, "toggleOpen", null);
AsideToggleDirective = __decorate([ __metadata("design:paramtypes", [ClassToggler])
], AsideToggleDirective);
export { AsideToggleDirective };
let HtmlAttributesDirective = class HtmlAttributesDirective {
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    ngOnInit() {
        const attribs = this.appHtmlAttr;
        for (const attr in attribs) {
            if (attr === 'style' && typeof (attribs[attr]) === 'object') {
                this.setStyle(attribs[attr]);
            }
            else if (attr === 'class') {
                this.addClass(attribs[attr]);
            }
            else {
                this.setAttrib(attr, attribs[attr]);
            }
        }
    }
    setStyle(styles) {
        for (const style in styles) {
            this.renderer.setStyle(this.el.nativeElement, style, styles[style]);
        }
    }
    addClass(classes) {
        const classArray = (Array.isArray(classes) ? classes : classes.split(' '));
        classArray.filter((element) => element.length > 0).forEach(element => {
            this.renderer.addClass(this.el.nativeElement, element);
        });
    }
    setAttrib(key, value) {
        value !== null ?
            this.renderer.setAttribute(this.el.nativeElement, key, value) :
            this.renderer.removeAttribute(this.el.nativeElement, key);
    }
};
HtmlAttributesDirective.ɵfac = function HtmlAttributesDirective_Factory(t) { return new (t || HtmlAttributesDirective)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
HtmlAttributesDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: HtmlAttributesDirective, selectors: [["", "appHtmlAttr", ""]], inputs: { appHtmlAttr: "appHtmlAttr" } });
HtmlAttributesDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], HtmlAttributesDirective.prototype, "appHtmlAttr", void 0);
HtmlAttributesDirective = __decorate([ __metadata("design:paramtypes", [Renderer2,
        ElementRef])
], HtmlAttributesDirective);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SidebarToggleDirective, [{
        type: Directive,
        args: [{
                selector: '[appSidebarToggler]',
                providers: [ClassToggler]
            }]
    }], function () { return [{ type: ClassToggler }]; }, { toggleOpen: [{
            type: HostListener,
            args: ['click', ['$event']]
        }], breakpoint: [{
            type: Input,
            args: ['appSidebarToggler']
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SidebarMinimizeDirective, [{
        type: Directive,
        args: [{
                selector: '[appSidebarMinimizer]'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, { toggleOpen: [{
            type: HostListener,
            args: ['click', ['$event']]
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(MobileSidebarToggleDirective, [{
        type: Directive,
        args: [{
                selector: '[appMobileSidebarToggler]'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, { toggleOpen: [{
            type: HostListener,
            args: ['click', ['$event']]
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SidebarOffCanvasCloseDirective, [{
        type: Directive,
        args: [{
                selector: '[appSidebarClose]'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, { toggleOpen: [{
            type: HostListener,
            args: ['click', ['$event']]
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BrandMinimizeDirective, [{
        type: Directive,
        args: [{
                selector: '[appBrandMinimizer]'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, { toggleOpen: [{
            type: HostListener,
            args: ['click', ['$event']]
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AsideToggleDirective, [{
        type: Directive,
        args: [{
                selector: '[appAsideMenuToggler]',
                providers: [ClassToggler]
            }]
    }], function () { return [{ type: ClassToggler }]; }, { toggleOpen: [{
            type: HostListener,
            args: ['click', ['$event']]
        }], breakpoint: [{
            type: Input,
            args: ['appAsideMenuToggler']
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HtmlAttributesDirective, [{
        type: Directive,
        args: [{
                selector: '[appHtmlAttr]'
            }]
    }], function () { return [{ type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ElementRef }]; }, { appHtmlAttr: [{
            type: Input
        }] }); })();
export { HtmlAttributesDirective };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2hhcmVkL2xheW91dC9sYXlvdXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWpEOztHQUVHOztBQUtILElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBR2pDLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQUcsQ0FBQztJQUNsRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzVCLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBVztRQUNwQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDRjs7OzsrSEFBQTs7WUFWbUMsWUFBWTs7QUFGbEI7SUFBM0IsS0FBSyxDQUFDLG1CQUFtQixDQUFDOzswREFBb0I7QUFPL0M7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7d0RBS2pDO0FBWlUsc0JBQXNCLGVBQWUsS0FKakQsU0FBUyxDQUFDLFVBQ1QsUUFBUSxFQUFFLG5DQUdSLGtDQUdnQyxZQUFZO09BTmYsVUFDL0IsU0FBUyx2QkFFRSxzQkFBc0IsQ0FhbEM7QUFmWSxDQUFDLFlBQVksQ0FBQyxNQUMxQixDQUFDLFpBQ1csc0JBQXNCO0FBa0JuQyxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQUNuQyxZQUM0QixRQUFhLEVBQy9CLFFBQW1CO1FBREQsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUMvQixhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQ3pCLENBQUM7SUFHTCxVQUFVLENBQUMsTUFBVztRQUNwQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUNGOzs7O1dBQUE7OzRDQVpJLE1BQU0sU0FBQyxRQUFRO1lBQ0UsU0FBUzs7QUFJN0I7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7MERBT2pDO0FBYlUsd0JBQXdCLGVBQ3pCLEtBSlgsU0FBUyxDQUFDLFVBQ1QsekJBRUUsQ0FFQyxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtFQUpYLEVBQUUsdUJBQXVCLE1BQ2xDLENBQUMsV0FJb0IsU0FBUztHQUhsQix3QkFBd0IsQ0FjcEM7U0FkWSx3QkFBd0I7QUFtQnJDLElBQWEsNEJBQTRCLEdBQXpDLE1BQWEsNEJBQTRCO0lBQ3ZDLFlBQzRCLFFBQWEsRUFDL0IsUUFBbUI7UUFERCxhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQVc7SUFDekIsQ0FBQztJQUdMLFVBQVUsQ0FBQyxNQUFXO1FBQ3BCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0Y7Ozs7V0FBQTs7NENBWkksTUFBTSxTQUFDLFFBQVE7WUFDRSxTQUFTOztBQUk3QjtJQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs4REFPakM7QUFiVSw0QkFBNEIsZUFDN0IsS0FKWCxTQUFTLENBQUMsVUFDVCx6QkFFRSxDQUVDLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBSlgsRUFBRSwyQkFBMkIsTUFDdEMsQ0FBQyxPQUlvQixTQUFTO0dBSGxCLDRCQUE0QixDQWN4QztTQWRZLDRCQUE0QjtBQWdCekM7O0dBRUc7QUFJSCxJQUFhLDhCQUE4QixHQUEzQyxNQUFhLDhCQUE4QjtJQUN6QyxZQUM0QixRQUFhLEVBQy9CLFFBQW1CO1FBREQsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUMvQixhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQ3pCLENBQUM7SUFHTCxVQUFVLENBQUMsTUFBVztRQUNwQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDaEMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1lBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0NBQ0Y7Ozs7V0FBQTs7NENBZkksTUFBTSxTQUFDLFFBQVE7WUFDRSxTQUFTOztBQUk3QjtJQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztnRUFVakM7QUFoQlUsOEJBQThCLGVBQy9CLEtBSlgsU0FBUyxDQUFDLFVBQ1QsekJBRUUsQ0FFQyxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtFQUpYLEVBQUUsbUJBQW1CLE1BQzlCLENBQUMsZUFJb0IsU0FBUztHQUhsQiw4QkFBOEIsQ0FpQjFDO1NBakJZLDhCQUE4QjtBQXNCM0MsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFDakMsWUFDNEIsUUFBYSxFQUMvQixRQUFtQjtRQURELGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0IsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUN6QixDQUFDO0lBR0wsVUFBVSxDQUFDLE1BQVc7UUFDcEIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDRjs7OztXQUFBOzs0Q0FaSSxNQUFNLFNBQUMsUUFBUTtZQUNFLFNBQVM7O0FBSTdCO0lBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O3dEQU9qQztBQWJVLHNCQUFzQixlQUN2QixLQUpYLFNBQVMsQ0FBQyxVQUNULHpCQUVFLENBRUMsV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7RUFKWCxFQUFFLHFCQUFxQixNQUNoQyxDQUFDLGFBSW9CLFNBQVM7R0FIbEIsc0JBQXNCLENBY2xDO1NBZFksc0JBQXNCO0FBaUJuQzs7R0FFRztBQUtILElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBRy9CLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQUcsQ0FBQztJQUNsRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzVCLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBVztRQUNwQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FDRjs7OztpSUFBQTs7WUFWbUMsWUFBWTs7QUFGaEI7SUFBN0IsS0FBSyxDQUFDLHFCQUFxQixDQUFDOzt3REFBb0I7QUFPakQ7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7c0RBS2pDO0FBWlUsb0JBQW9CLGVBQWUsS0FKL0MsU0FBUyxDQUFDLFVBQ1QsUUFBUSxFQUFFLG5DQUdSLGtDQUdnQyxZQUFZO1NBTmIsVUFDakMsaEJBRVcsb0JBQW9CLENBYWhDO0VBZlUsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUMxQixDQUFDLGhCQUNXLG9CQUFvQjtBQWtCakMsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFHbEMsWUFDVSxRQUFtQixFQUNuQixFQUFjO1FBRGQsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQ3JCLENBQUM7SUFFSixRQUFRO1FBQ04sTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNqQyxLQUFLLE1BQU0sSUFBSSxJQUFJLE9BQU8sRUFBRTtZQUMxQixJQUFJLElBQUksS0FBSyxPQUFPLElBQUksT0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRztnQkFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUM5QjtpQkFBTSxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDckM7U0FDRjtJQUNILENBQUM7SUFFTyxRQUFRLENBQUMsTUFBTTtRQUNyQixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFFLENBQUM7U0FDdEU7SUFDSCxDQUFDO0lBRU8sUUFBUSxDQUFDLE9BQU87UUFDdEIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUUsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxTQUFTLENBQUMsR0FBRyxFQUFFLEtBQUs7UUFDMUIsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBRSxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUNGOzt5S0FBQTs7WUFuQ3FCLFNBQVM7WUFDZixVQUFVOztBQUpmO0lBQVIsS0FBSyxFQUFFOzs0REFBdUM7QUFEcEMsdUJBQXVCLGVBQWUsS0FIbEQsU0FBUyxDQUFDLFVBQ1QsUUFBUSxFQUFFLG5DQUVSLGtDQUlrQixTQUFTO0tBTkosTUFDMUIsQ0FBQyxKQU1jLFVBQVU7R0FMYix1QkFBdUIsQ0F1Q25DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUNEO1NBeENhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIEluamVjdCwgSW5wdXQsIE9uSW5pdCwgUmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IGFzaWRlTWVudUNzc0NsYXNzZXMsIHNpZGViYXJDc3NDbGFzc2VzIH0gZnJvbSAnLi4vY2xhc3Nlcyc7XHJcbmltcG9ydCB7IENsYXNzVG9nZ2xlciB9IGZyb20gJy4uL3RvZ2dsZS1jbGFzc2VzJztcclxuXHJcbi8qKlxyXG4gKiBBbGxvd3MgdGhlIHNpZGViYXIgdG8gYmUgdG9nZ2xlZCB2aWEgY2xpY2suXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thcHBTaWRlYmFyVG9nZ2xlcl0nLFxyXG4gIHByb3ZpZGVyczogW0NsYXNzVG9nZ2xlcl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpZGViYXJUb2dnbGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgnYXBwU2lkZWJhclRvZ2dsZXInKSBicmVha3BvaW50OiBzdHJpbmc7XHJcbiAgcHVibGljIGJwO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xhc3NUb2dnbGVyOiBDbGFzc1RvZ2dsZXIpIHt9XHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmJwID0gdGhpcy5icmVha3BvaW50O1xyXG4gIH1cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgdG9nZ2xlT3BlbigkZXZlbnQ6IGFueSkge1xyXG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBjc3NDbGFzcyA9IHRoaXMuYnAgPyBgc2lkZWJhci0ke3RoaXMuYnB9LXNob3dgIDogc2lkZWJhckNzc0NsYXNzZXNbMF07XHJcbiAgICB0aGlzLmNsYXNzVG9nZ2xlci50b2dnbGVDbGFzc2VzKGNzc0NsYXNzLCBzaWRlYmFyQ3NzQ2xhc3Nlcyk7XHJcbiAgfVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thcHBTaWRlYmFyTWluaW1pemVyXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNpZGViYXJNaW5pbWl6ZURpcmVjdGl2ZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gIHRvZ2dsZU9wZW4oJGV2ZW50OiBhbnkpIHtcclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgYm9keSA9IHRoaXMuZG9jdW1lbnQuYm9keTtcclxuICAgIGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlYmFyLW1pbmltaXplZCcpID9cclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhib2R5LCAnc2lkZWJhci1taW5pbWl6ZWQnKSA6XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYm9keSwgJ3NpZGViYXItbWluaW1pemVkJyk7XHJcbiAgfVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thcHBNb2JpbGVTaWRlYmFyVG9nZ2xlcl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNb2JpbGVTaWRlYmFyVG9nZ2xlRGlyZWN0aXZlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICApIHsgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgdG9nZ2xlT3BlbigkZXZlbnQ6IGFueSkge1xyXG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBib2R5ID0gdGhpcy5kb2N1bWVudC5ib2R5O1xyXG4gICAgYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3NpZGViYXItc2hvdycpID9cclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhib2R5LCAnc2lkZWJhci1zaG93JykgOlxyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGJvZHksICdzaWRlYmFyLXNob3cnKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBbGxvd3MgdGhlIG9mZi1jYW52YXMgc2lkZWJhciB0byBiZSBjbG9zZWQgdmlhIGNsaWNrLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXBwU2lkZWJhckNsb3NlXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNpZGViYXJPZmZDYW52YXNDbG9zZURpcmVjdGl2ZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gIHRvZ2dsZU9wZW4oJGV2ZW50OiBhbnkpIHtcclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSB0aGlzLmRvY3VtZW50LmJvZHk7XHJcbiAgICBpZiAoYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3NpZGViYXItb2ZmLWNhbnZhcycpKSB7XHJcbiAgICAgIGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlYmFyLXNob3cnKSA/XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhib2R5LCAnc2lkZWJhci1zaG93JykgOlxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYm9keSwgJ3NpZGViYXItc2hvdycpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXBwQnJhbmRNaW5pbWl6ZXJdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQnJhbmRNaW5pbWl6ZURpcmVjdGl2ZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gIHRvZ2dsZU9wZW4oJGV2ZW50OiBhbnkpIHtcclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgYm9keSA9IHRoaXMuZG9jdW1lbnQuYm9keTtcclxuICAgIGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdicmFuZC1taW5pbWl6ZWQnKSA/XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoYm9keSwgJ2JyYW5kLW1pbmltaXplZCcpIDpcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhib2R5LCAnYnJhbmQtbWluaW1pemVkJyk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEFsbG93cyB0aGUgYXNpZGUgdG8gYmUgdG9nZ2xlZCB2aWEgY2xpY2suXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thcHBBc2lkZU1lbnVUb2dnbGVyXScsXHJcbiAgcHJvdmlkZXJzOiBbQ2xhc3NUb2dnbGVyXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXNpZGVUb2dnbGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgnYXBwQXNpZGVNZW51VG9nZ2xlcicpIGJyZWFrcG9pbnQ6IHN0cmluZztcclxuICBwdWJsaWMgYnA7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGFzc1RvZ2dsZXI6IENsYXNzVG9nZ2xlcikge31cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuYnAgPSB0aGlzLmJyZWFrcG9pbnQ7XHJcbiAgfVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICB0b2dnbGVPcGVuKCRldmVudDogYW55KSB7XHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGNzc0NsYXNzID0gdGhpcy5icCA/IGBhc2lkZS1tZW51LSR7dGhpcy5icH0tc2hvd2AgOiBhc2lkZU1lbnVDc3NDbGFzc2VzWzBdO1xyXG4gICAgdGhpcy5jbGFzc1RvZ2dsZXIudG9nZ2xlQ2xhc3Nlcyhjc3NDbGFzcywgYXNpZGVNZW51Q3NzQ2xhc3Nlcyk7XHJcbiAgfVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thcHBIdG1sQXR0cl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIdG1sQXR0cmlidXRlc0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgYXBwSHRtbEF0dHI6IHtba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGF0dHJpYnMgPSB0aGlzLmFwcEh0bWxBdHRyO1xyXG4gICAgZm9yIChjb25zdCBhdHRyIGluIGF0dHJpYnMpIHtcclxuICAgICAgaWYgKGF0dHIgPT09ICdzdHlsZScgJiYgdHlwZW9mKGF0dHJpYnNbYXR0cl0pID09PSAnb2JqZWN0JyApIHtcclxuICAgICAgICB0aGlzLnNldFN0eWxlKGF0dHJpYnNbYXR0cl0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGF0dHIgPT09ICdjbGFzcycpIHtcclxuICAgICAgICB0aGlzLmFkZENsYXNzKGF0dHJpYnNbYXR0cl0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2V0QXR0cmliKGF0dHIsIGF0dHJpYnNbYXR0cl0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFN0eWxlKHN0eWxlcykge1xyXG4gICAgZm9yIChjb25zdCBzdHlsZSBpbiBzdHlsZXMpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHN0eWxlLCBzdHlsZXNbc3R5bGVdICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZENsYXNzKGNsYXNzZXMpIHtcclxuICAgIGNvbnN0IGNsYXNzQXJyYXkgPSAoQXJyYXkuaXNBcnJheShjbGFzc2VzKSA/IGNsYXNzZXMgOiBjbGFzc2VzLnNwbGl0KCcgJykpO1xyXG4gICAgY2xhc3NBcnJheS5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQubGVuZ3RoID4gMCkuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGVsZW1lbnQgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRBdHRyaWIoa2V5LCB2YWx1ZSkge1xyXG4gICAgdmFsdWUgIT09IG51bGwgP1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGtleSwgdmFsdWUgKSA6XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwga2V5KTtcclxuICB9XHJcbn1cclxuIl19