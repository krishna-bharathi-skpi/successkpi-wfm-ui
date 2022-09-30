import { __decorate, __metadata, __param } from "tslib";
import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { asideMenuCssClasses, sidebarCssClasses } from '../classes';
import { ClassToggler } from '../toggle-classes';
/**
 * Allows the sidebar to be toggled via click.
 */
import * as ɵngcc0 from '@angular/core';
var SidebarToggleDirective = /** @class */ (function () {
    function SidebarToggleDirective(classToggler) {
        this.classToggler = classToggler;
    }
    SidebarToggleDirective.prototype.ngOnInit = function () {
        this.bp = this.breakpoint;
    };
    SidebarToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        var cssClass = this.bp ? "sidebar-" + this.bp + "-show" : sidebarCssClasses[0];
        this.classToggler.toggleClasses(cssClass, sidebarCssClasses);
    };
    SidebarToggleDirective.ctorParameters = function () { return [
        { type: ClassToggler }
    ]; };
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
SidebarToggleDirective.ɵfac = function SidebarToggleDirective_Factory(t) { return new (t || SidebarToggleDirective)(ɵngcc0.ɵɵdirectiveInject(ClassToggler)); };
SidebarToggleDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: SidebarToggleDirective, selectors: [["", "appSidebarToggler", ""]], hostBindings: function SidebarToggleDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function SidebarToggleDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } }, inputs: { breakpoint: ["appSidebarToggler", "breakpoint"] }, features: [ɵngcc0.ɵɵProvidersFeature([ClassToggler])] });
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
    return SidebarToggleDirective;
}());
export { SidebarToggleDirective };
var SidebarMinimizeDirective = /** @class */ (function () {
    function SidebarMinimizeDirective(document, renderer) {
        this.document = document;
        this.renderer = renderer;
    }
    SidebarMinimizeDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        var body = this.document.body;
        body.classList.contains('sidebar-minimized') ?
            this.renderer.removeClass(body, 'sidebar-minimized') :
            this.renderer.addClass(body, 'sidebar-minimized');
    };
    SidebarMinimizeDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: Renderer2 }
    ]; };
    __decorate([
        HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SidebarMinimizeDirective.prototype, "toggleOpen", null);
    SidebarMinimizeDirective = __decorate([ __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object, Renderer2])
    ], SidebarMinimizeDirective);
SidebarMinimizeDirective.ɵfac = function SidebarMinimizeDirective_Factory(t) { return new (t || SidebarMinimizeDirective)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
SidebarMinimizeDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: SidebarMinimizeDirective, selectors: [["", "appSidebarMinimizer", ""]], hostBindings: function SidebarMinimizeDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function SidebarMinimizeDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } } });
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
    return SidebarMinimizeDirective;
}());
export { SidebarMinimizeDirective };
var MobileSidebarToggleDirective = /** @class */ (function () {
    function MobileSidebarToggleDirective(document, renderer) {
        this.document = document;
        this.renderer = renderer;
    }
    MobileSidebarToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        var body = this.document.body;
        body.classList.contains('sidebar-show') ?
            this.renderer.removeClass(body, 'sidebar-show') :
            this.renderer.addClass(body, 'sidebar-show');
    };
    MobileSidebarToggleDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: Renderer2 }
    ]; };
    __decorate([
        HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MobileSidebarToggleDirective.prototype, "toggleOpen", null);
    MobileSidebarToggleDirective = __decorate([ __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object, Renderer2])
    ], MobileSidebarToggleDirective);
MobileSidebarToggleDirective.ɵfac = function MobileSidebarToggleDirective_Factory(t) { return new (t || MobileSidebarToggleDirective)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
MobileSidebarToggleDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: MobileSidebarToggleDirective, selectors: [["", "appMobileSidebarToggler", ""]], hostBindings: function MobileSidebarToggleDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function MobileSidebarToggleDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } } });
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
    return MobileSidebarToggleDirective;
}());
export { MobileSidebarToggleDirective };
/**
 * Allows the off-canvas sidebar to be closed via click.
 */
var SidebarOffCanvasCloseDirective = /** @class */ (function () {
    function SidebarOffCanvasCloseDirective(document, renderer) {
        this.document = document;
        this.renderer = renderer;
    }
    SidebarOffCanvasCloseDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        var body = this.document.body;
        if (body.classList.contains('sidebar-off-canvas')) {
            body.classList.contains('sidebar-show') ?
                this.renderer.removeClass(body, 'sidebar-show') :
                this.renderer.addClass(body, 'sidebar-show');
        }
    };
    SidebarOffCanvasCloseDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: Renderer2 }
    ]; };
    __decorate([
        HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SidebarOffCanvasCloseDirective.prototype, "toggleOpen", null);
    SidebarOffCanvasCloseDirective = __decorate([ __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object, Renderer2])
    ], SidebarOffCanvasCloseDirective);
SidebarOffCanvasCloseDirective.ɵfac = function SidebarOffCanvasCloseDirective_Factory(t) { return new (t || SidebarOffCanvasCloseDirective)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
SidebarOffCanvasCloseDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: SidebarOffCanvasCloseDirective, selectors: [["", "appSidebarClose", ""]], hostBindings: function SidebarOffCanvasCloseDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function SidebarOffCanvasCloseDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } } });
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
    return SidebarOffCanvasCloseDirective;
}());
export { SidebarOffCanvasCloseDirective };
var BrandMinimizeDirective = /** @class */ (function () {
    function BrandMinimizeDirective(document, renderer) {
        this.document = document;
        this.renderer = renderer;
    }
    BrandMinimizeDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        var body = this.document.body;
        body.classList.contains('brand-minimized') ?
            this.renderer.removeClass(body, 'brand-minimized') :
            this.renderer.addClass(body, 'brand-minimized');
    };
    BrandMinimizeDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: Renderer2 }
    ]; };
    __decorate([
        HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BrandMinimizeDirective.prototype, "toggleOpen", null);
    BrandMinimizeDirective = __decorate([ __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object, Renderer2])
    ], BrandMinimizeDirective);
BrandMinimizeDirective.ɵfac = function BrandMinimizeDirective_Factory(t) { return new (t || BrandMinimizeDirective)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
BrandMinimizeDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: BrandMinimizeDirective, selectors: [["", "appBrandMinimizer", ""]], hostBindings: function BrandMinimizeDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function BrandMinimizeDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } } });
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
    return BrandMinimizeDirective;
}());
export { BrandMinimizeDirective };
/**
 * Allows the aside to be toggled via click.
 */
var AsideToggleDirective = /** @class */ (function () {
    function AsideToggleDirective(classToggler) {
        this.classToggler = classToggler;
    }
    AsideToggleDirective.prototype.ngOnInit = function () {
        this.bp = this.breakpoint;
    };
    AsideToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        var cssClass = this.bp ? "aside-menu-" + this.bp + "-show" : asideMenuCssClasses[0];
        this.classToggler.toggleClasses(cssClass, asideMenuCssClasses);
    };
    AsideToggleDirective.ctorParameters = function () { return [
        { type: ClassToggler }
    ]; };
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
AsideToggleDirective.ɵfac = function AsideToggleDirective_Factory(t) { return new (t || AsideToggleDirective)(ɵngcc0.ɵɵdirectiveInject(ClassToggler)); };
AsideToggleDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: AsideToggleDirective, selectors: [["", "appAsideMenuToggler", ""]], hostBindings: function AsideToggleDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function AsideToggleDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } }, inputs: { breakpoint: ["appAsideMenuToggler", "breakpoint"] }, features: [ɵngcc0.ɵɵProvidersFeature([ClassToggler])] });
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
    return AsideToggleDirective;
}());
export { AsideToggleDirective };
var HtmlAttributesDirective = /** @class */ (function () {
    function HtmlAttributesDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    HtmlAttributesDirective.prototype.ngOnInit = function () {
        var attribs = this.appHtmlAttr;
        for (var attr in attribs) {
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
    };
    HtmlAttributesDirective.prototype.setStyle = function (styles) {
        for (var style in styles) {
            this.renderer.setStyle(this.el.nativeElement, style, styles[style]);
        }
    };
    HtmlAttributesDirective.prototype.addClass = function (classes) {
        var _this = this;
        var classArray = (Array.isArray(classes) ? classes : classes.split(' '));
        classArray.filter(function (element) { return element.length > 0; }).forEach(function (element) {
            _this.renderer.addClass(_this.el.nativeElement, element);
        });
    };
    HtmlAttributesDirective.prototype.setAttrib = function (key, value) {
        value !== null ?
            this.renderer.setAttribute(this.el.nativeElement, key, value) :
            this.renderer.removeAttribute(this.el.nativeElement, key);
    };
    HtmlAttributesDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HtmlAttributesDirective.prototype, "appHtmlAttr", void 0);
    HtmlAttributesDirective = __decorate([ __metadata("design:paramtypes", [Renderer2,
            ElementRef])
    ], HtmlAttributesDirective);
HtmlAttributesDirective.ɵfac = function HtmlAttributesDirective_Factory(t) { return new (t || HtmlAttributesDirective)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
HtmlAttributesDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: HtmlAttributesDirective, selectors: [["", "appHtmlAttr", ""]], inputs: { appHtmlAttr: "appHtmlAttr" } });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HtmlAttributesDirective, [{
        type: Directive,
        args: [{
                selector: '[appHtmlAttr]'
            }]
    }], function () { return [{ type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ElementRef }]; }, { appHtmlAttr: [{
            type: Input
        }] }); })();
    return HtmlAttributesDirective;
}());
export { HtmlAttributesDirective };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2hhcmVkL2xheW91dC9sYXlvdXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWpEOztHQUVHOztBQUtIO0lBR0UsZ0NBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQUcsQ0FBQztJQUNsRCx5Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzVCLENBQUM7SUFFRCwyQ0FBVSxHQUFWLFVBQVcsTUFBVztRQUNwQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBVyxJQUFJLENBQUMsRUFBRSxVQUFPLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9ELENBQUM7O2dCQVRpQyxZQUFZOztJQUZsQjtRQUEzQixLQUFLLENBQUMsbUJBQW1CLENBQUM7OzhEQUFvQjtJQU8vQztRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs0REFLakM7SUFaVSxzQkFBc0IsZUFBZSxTQUpqRCxTQUFTLENBQUMsY0FDVCxRQUFRLEVBQUUsM0NBR0osa0NBRzRCLFlBQVk7ZUFOZixjQUMvQix0QkFFVyxzQkFBc0IsQ0FhbEM7TUFmVSxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQzFCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBZUY7SUFEQSw2QkFBQztDQUFBLEFBYkQsSUFhQztTQWJZLHNCQUFzQjtBQWtCbkM7SUFDRSxrQ0FDNEIsUUFBYSxFQUMvQixRQUFtQjtRQURELGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0IsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUN6QixDQUFDO0lBR0wsNkNBQVUsR0FBVixVQUFXLE1BQVc7UUFDcEIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7O2dEQVhFLE1BQU0sU0FBQyxRQUFRO2dCQUNFLFNBQVM7O0lBSTdCO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OzhEQU9qQztJQWJVLHdCQUF3QixlQUN6QixTQUpYLFNBQVMsQ0FBQyxuQkFHSCxDQUVILFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBSm5CLFFBQVEsRUFBRSx1QkFBdUIsVUFDbEMsQ0FBQyxHQUlvQixTQUFTO09BSGxCLHdCQUF3QixDQWNwQzs7Ozs7Ozs7Ozs7Ozs7OztvQkFDRDtJQURBLCtCQUFDO0NBQUEsQUFkRCxJQWNDO1NBZFksd0JBQXdCO0FBbUJyQztJQUNFLHNDQUM0QixRQUFhLEVBQy9CLFFBQW1CO1FBREQsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUMvQixhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQ3pCLENBQUM7SUFHTCxpREFBVSxHQUFWLFVBQVcsTUFBVztRQUNwQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Z0RBWEUsTUFBTSxTQUFDLFFBQVE7Z0JBQ0UsU0FBUzs7SUFJN0I7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7a0VBT2pDO0lBYlUsNEJBQTRCLGVBQzdCLFNBSlgsU0FBUyxDQUFDLG5CQUdILENBRUgsV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7RUFKbkIsUUFBUSxFQUFFLDJCQUEyQixVQUN0QyxDQUFDLERBSW9CLFNBQVM7T0FIbEIsNEJBQTRCLENBY3hDOzs7Ozs7Ozs7Ozs7Ozs7O29CQUNEO0lBREEsbUNBQUM7Q0FBQSxBQWRELElBY0M7U0FkWSw0QkFBNEI7QUFnQnpDOztHQUVHO0FBSUg7SUFDRSx3Q0FDNEIsUUFBYSxFQUMvQixRQUFtQjtRQURELGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0IsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUN6QixDQUFDO0lBR0wsbURBQVUsR0FBVixVQUFXLE1BQVc7UUFDcEIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXhCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ2hDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRTtZQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQzs7Z0RBZEUsTUFBTSxTQUFDLFFBQVE7Z0JBQ0UsU0FBUzs7SUFJN0I7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7b0VBVWpDO0lBaEJVLDhCQUE4QixlQUMvQixTQUpYLFNBQVMsQ0FBQyxuQkFHSCxDQUVILFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBSm5CLFFBQVEsRUFBRSxtQkFBbUIsVUFDOUIsQ0FBQyxPQUlvQixTQUFTO09BSGxCLDhCQUE4QixDQWlCMUM7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBQ0Q7SUFEQSxxQ0FBQztDQUFBLEFBakJELElBaUJDO1NBakJZLDhCQUE4QjtBQXNCM0M7SUFDRSxnQ0FDNEIsUUFBYSxFQUMvQixRQUFtQjtRQURELGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0IsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUN6QixDQUFDO0lBR0wsMkNBQVUsR0FBVixVQUFXLE1BQVc7UUFDcEIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3BELENBQUM7O2dEQVhFLE1BQU0sU0FBQyxRQUFRO2dCQUNFLFNBQVM7O0lBSTdCO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OzREQU9qQztJQWJVLHNCQUFzQixlQUN2QixTQUpYLFNBQVMsQ0FBQyxuQkFHSCxDQUVILFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBSm5CLFFBQVEsRUFBRSxxQkFBcUIsVUFDaEMsQ0FBQyxLQUlvQixTQUFTO09BSGxCLHNCQUFzQixDQWNsQzs7Ozs7Ozs7Ozs7Ozs7OztvQkFDRDtJQURBLDZCQUFDO0NBQUEsQUFkRCxJQWNDO1NBZFksc0JBQXNCO0FBaUJuQzs7R0FFRztBQUtIO0lBR0UsOEJBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQUcsQ0FBQztJQUNsRCx1Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzVCLENBQUM7SUFFRCx5Q0FBVSxHQUFWLFVBQVcsTUFBVztRQUNwQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWMsSUFBSSxDQUFDLEVBQUUsVUFBTyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUNqRSxDQUFDOztnQkFUaUMsWUFBWTs7SUFGaEI7UUFBN0IsS0FBSyxDQUFDLHFCQUFxQixDQUFDOzs0REFBb0I7SUFPakQ7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7MERBS2pDO0lBWlUsb0JBQW9CLGVBQWUsU0FKL0MsU0FBUyxDQUFDLGNBQ1QsUUFBUSxFQUFFLDNDQUdKLGtDQUc0QixZQUFZO2lCQU5iLFZBR3RCLG9CQUFvQixDQWFoQztDQWZDLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUMxQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O29CQWVGO0lBREEsMkJBQUM7Q0FBQSxBQWJELElBYUM7U0FiWSxvQkFBb0I7QUFrQmpDO0lBR0UsaUNBQ1UsUUFBbUIsRUFDbkIsRUFBYztRQURkLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUNyQixDQUFDO0lBRUosMENBQVEsR0FBUjtRQUNFLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDakMsS0FBSyxJQUFNLElBQUksSUFBSSxPQUFPLEVBQUU7WUFDMUIsSUFBSSxJQUFJLEtBQUssT0FBTyxJQUFJLE9BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUc7Z0JBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDOUI7aUJBQU0sSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFO2dCQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzlCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3JDO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sMENBQVEsR0FBaEIsVUFBaUIsTUFBTTtRQUNyQixLQUFLLElBQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFFLENBQUM7U0FDdEU7SUFDSCxDQUFDO0lBRU8sMENBQVEsR0FBaEIsVUFBaUIsT0FBTztRQUF4QixpQkFLQztRQUpDLElBQU0sVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0UsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztZQUNoRSxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUUsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTywyQ0FBUyxHQUFqQixVQUFrQixHQUFHLEVBQUUsS0FBSztRQUMxQixLQUFLLEtBQUssSUFBSSxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFFLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5RCxDQUFDOztnQkFsQ21CLFNBQVM7Z0JBQ2YsVUFBVTs7SUFKZjtRQUFSLEtBQUssRUFBRTs7Z0VBQXVDO0lBRHBDLHVCQUF1QixlQUFlLFNBSGxELFNBQVMsQ0FBQyxjQUNULFFBQVEsRUFBRSwzQ0FFSixrQ0FJYyxTQUFTO2FBTkosVUFDMUIsQ0FBQyxaQU1jLFVBQVU7T0FMYix1QkFBdUIsQ0F1Q25DOzs7Ozs7Ozs7O29CQUNEO0lBREEsOEJBQUM7Q0FBQSxBQXZDRCxJQXVDQztTQXZDWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPbkluaXQsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBhc2lkZU1lbnVDc3NDbGFzc2VzLCBzaWRlYmFyQ3NzQ2xhc3NlcyB9IGZyb20gJy4uL2NsYXNzZXMnO1xyXG5pbXBvcnQgeyBDbGFzc1RvZ2dsZXIgfSBmcm9tICcuLi90b2dnbGUtY2xhc3Nlcyc7XHJcblxyXG4vKipcclxuICogQWxsb3dzIHRoZSBzaWRlYmFyIHRvIGJlIHRvZ2dsZWQgdmlhIGNsaWNrLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXBwU2lkZWJhclRvZ2dsZXJdJyxcclxuICBwcm92aWRlcnM6IFtDbGFzc1RvZ2dsZXJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaWRlYmFyVG9nZ2xlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoJ2FwcFNpZGViYXJUb2dnbGVyJykgYnJlYWtwb2ludDogc3RyaW5nO1xyXG4gIHB1YmxpYyBicDtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsYXNzVG9nZ2xlcjogQ2xhc3NUb2dnbGVyKSB7fVxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5icCA9IHRoaXMuYnJlYWtwb2ludDtcclxuICB9XHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gIHRvZ2dsZU9wZW4oJGV2ZW50OiBhbnkpIHtcclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgY3NzQ2xhc3MgPSB0aGlzLmJwID8gYHNpZGViYXItJHt0aGlzLmJwfS1zaG93YCA6IHNpZGViYXJDc3NDbGFzc2VzWzBdO1xyXG4gICAgdGhpcy5jbGFzc1RvZ2dsZXIudG9nZ2xlQ2xhc3Nlcyhjc3NDbGFzcywgc2lkZWJhckNzc0NsYXNzZXMpO1xyXG4gIH1cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXBwU2lkZWJhck1pbmltaXplcl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaWRlYmFyTWluaW1pemVEaXJlY3RpdmUge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICkgeyB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICB0b2dnbGVPcGVuKCRldmVudDogYW55KSB7XHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGJvZHkgPSB0aGlzLmRvY3VtZW50LmJvZHk7XHJcbiAgICBib2R5LmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhci1taW5pbWl6ZWQnKSA/XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoYm9keSwgJ3NpZGViYXItbWluaW1pemVkJykgOlxyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGJvZHksICdzaWRlYmFyLW1pbmltaXplZCcpO1xyXG4gIH1cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXBwTW9iaWxlU2lkZWJhclRvZ2dsZXJdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTW9iaWxlU2lkZWJhclRvZ2dsZURpcmVjdGl2ZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgKSB7IH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gIHRvZ2dsZU9wZW4oJGV2ZW50OiBhbnkpIHtcclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgYm9keSA9IHRoaXMuZG9jdW1lbnQuYm9keTtcclxuICAgIGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlYmFyLXNob3cnKSA/XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoYm9keSwgJ3NpZGViYXItc2hvdycpIDpcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhib2R5LCAnc2lkZWJhci1zaG93Jyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQWxsb3dzIHRoZSBvZmYtY2FudmFzIHNpZGViYXIgdG8gYmUgY2xvc2VkIHZpYSBjbGljay5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FwcFNpZGViYXJDbG9zZV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaWRlYmFyT2ZmQ2FudmFzQ2xvc2VEaXJlY3RpdmUge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICkgeyB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICB0b2dnbGVPcGVuKCRldmVudDogYW55KSB7XHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCBib2R5ID0gdGhpcy5kb2N1bWVudC5ib2R5O1xyXG4gICAgaWYgKGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlYmFyLW9mZi1jYW52YXMnKSkge1xyXG4gICAgICBib2R5LmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhci1zaG93JykgP1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoYm9keSwgJ3NpZGViYXItc2hvdycpIDpcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGJvZHksICdzaWRlYmFyLXNob3cnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FwcEJyYW5kTWluaW1pemVyXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEJyYW5kTWluaW1pemVEaXJlY3RpdmUge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICkgeyB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICB0b2dnbGVPcGVuKCRldmVudDogYW55KSB7XHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGJvZHkgPSB0aGlzLmRvY3VtZW50LmJvZHk7XHJcbiAgICBib2R5LmNsYXNzTGlzdC5jb250YWlucygnYnJhbmQtbWluaW1pemVkJykgP1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGJvZHksICdicmFuZC1taW5pbWl6ZWQnKSA6XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYm9keSwgJ2JyYW5kLW1pbmltaXplZCcpO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBBbGxvd3MgdGhlIGFzaWRlIHRvIGJlIHRvZ2dsZWQgdmlhIGNsaWNrLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXBwQXNpZGVNZW51VG9nZ2xlcl0nLFxyXG4gIHByb3ZpZGVyczogW0NsYXNzVG9nZ2xlcl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFzaWRlVG9nZ2xlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoJ2FwcEFzaWRlTWVudVRvZ2dsZXInKSBicmVha3BvaW50OiBzdHJpbmc7XHJcbiAgcHVibGljIGJwO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xhc3NUb2dnbGVyOiBDbGFzc1RvZ2dsZXIpIHt9XHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmJwID0gdGhpcy5icmVha3BvaW50O1xyXG4gIH1cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgdG9nZ2xlT3BlbigkZXZlbnQ6IGFueSkge1xyXG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBjc3NDbGFzcyA9IHRoaXMuYnAgPyBgYXNpZGUtbWVudS0ke3RoaXMuYnB9LXNob3dgIDogYXNpZGVNZW51Q3NzQ2xhc3Nlc1swXTtcclxuICAgIHRoaXMuY2xhc3NUb2dnbGVyLnRvZ2dsZUNsYXNzZXMoY3NzQ2xhc3MsIGFzaWRlTWVudUNzc0NsYXNzZXMpO1xyXG4gIH1cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXBwSHRtbEF0dHJdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSHRtbEF0dHJpYnV0ZXNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGFwcEh0bWxBdHRyOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZlxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBhdHRyaWJzID0gdGhpcy5hcHBIdG1sQXR0cjtcclxuICAgIGZvciAoY29uc3QgYXR0ciBpbiBhdHRyaWJzKSB7XHJcbiAgICAgIGlmIChhdHRyID09PSAnc3R5bGUnICYmIHR5cGVvZihhdHRyaWJzW2F0dHJdKSA9PT0gJ29iamVjdCcgKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdHlsZShhdHRyaWJzW2F0dHJdKTtcclxuICAgICAgfSBlbHNlIGlmIChhdHRyID09PSAnY2xhc3MnKSB7XHJcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhhdHRyaWJzW2F0dHJdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNldEF0dHJpYihhdHRyLCBhdHRyaWJzW2F0dHJdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRTdHlsZShzdHlsZXMpIHtcclxuICAgIGZvciAoY29uc3Qgc3R5bGUgaW4gc3R5bGVzKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBzdHlsZSwgc3R5bGVzW3N0eWxlXSApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRDbGFzcyhjbGFzc2VzKSB7XHJcbiAgICBjb25zdCBjbGFzc0FycmF5ID0gKEFycmF5LmlzQXJyYXkoY2xhc3NlcykgPyBjbGFzc2VzIDogY2xhc3Nlcy5zcGxpdCgnICcpKTtcclxuICAgIGNsYXNzQXJyYXkuZmlsdGVyKChlbGVtZW50KSA9PiBlbGVtZW50Lmxlbmd0aCA+IDApLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBlbGVtZW50ICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0QXR0cmliKGtleSwgdmFsdWUpIHtcclxuICAgIHZhbHVlICE9PSBudWxsID9cclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBrZXksIHZhbHVlICkgOlxyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGtleSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==