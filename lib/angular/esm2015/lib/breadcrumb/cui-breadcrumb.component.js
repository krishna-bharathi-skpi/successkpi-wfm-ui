import { __decorate, __metadata, __param } from "tslib";
import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AppBreadcrumbService } from './app-breadcrumb.service';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/router';

function CuiBreadcrumbComponent_ng_template_1_li_0_a_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "a", 5);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const breadcrumb_r1 = ɵngcc0.ɵɵnextContext(2).$implicit;
    ɵngcc0.ɵɵproperty("routerLink", breadcrumb_r1.url);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(breadcrumb_r1.label.title);
} }
function CuiBreadcrumbComponent_ng_template_1_li_0_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 5);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const breadcrumb_r1 = ɵngcc0.ɵɵnextContext(2).$implicit;
    ɵngcc0.ɵɵproperty("routerLink", breadcrumb_r1.url);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(breadcrumb_r1.label.title);
} }
const _c0 = function (a0) { return { active: a0 }; };
function CuiBreadcrumbComponent_ng_template_1_li_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "li", 3);
    ɵngcc0.ɵɵtemplate(1, CuiBreadcrumbComponent_ng_template_1_li_0_a_1_Template, 2, 2, "a", 4);
    ɵngcc0.ɵɵtemplate(2, CuiBreadcrumbComponent_ng_template_1_li_0_span_2_Template, 2, 2, "span", 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const last_r2 = ɵngcc0.ɵɵnextContext().last;
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(3, _c0, last_r2));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !last_r2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", last_r2);
} }
function CuiBreadcrumbComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵtemplate(0, CuiBreadcrumbComponent_ng_template_1_li_0_Template, 3, 5, "li", 2);
} if (rf & 2) {
    const breadcrumb_r1 = ctx.$implicit;
    const last_r2 = ctx.last;
    ɵngcc0.ɵɵproperty("ngIf", breadcrumb_r1.label.title && (breadcrumb_r1.url.slice(0 - 1) == "/" || last_r2));
} }
const _c1 = ["*"];
let CuiBreadcrumbComponent = class CuiBreadcrumbComponent {
    constructor(document, renderer, service) {
        this.document = document;
        this.renderer = renderer;
        this.service = service;
        this.fixedClass = 'breadcrumb-fixed';
    }
    ngOnInit() {
        this.isFixed(this.fixed);
        this.breadcrumbs = this.service.breadcrumbs;
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
CuiBreadcrumbComponent.ɵfac = function CuiBreadcrumbComponent_Factory(t) { return new (t || CuiBreadcrumbComponent)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(AppBreadcrumbService)); };
CuiBreadcrumbComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: CuiBreadcrumbComponent, selectors: [["cui-breadcrumb"]], inputs: { fixed: "fixed" }, ngContentSelectors: _c1, decls: 4, vars: 3, consts: [[1, "breadcrumb"], ["ngFor", "", 3, "ngForOf"], ["class", "breadcrumb-item", 3, "ngClass", 4, "ngIf"], [1, "breadcrumb-item", 3, "ngClass"], [3, "routerLink", 4, "ngIf"], [3, "routerLink"]], template: function CuiBreadcrumbComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵelementStart(0, "ol", 0);
        ɵngcc0.ɵɵtemplate(1, CuiBreadcrumbComponent_ng_template_1_Template, 1, 1, "ng-template", 1);
        ɵngcc0.ɵɵpipe(2, "async");
        ɵngcc0.ɵɵprojection(3);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(2, 1, ctx.breadcrumbs));
    } }, directives: [ɵngcc1.NgForOf, ɵngcc1.NgIf, ɵngcc1.NgClass, ɵngcc2.RouterLinkWithHref, ɵngcc2.RouterLink], pipes: [ɵngcc1.AsyncPipe], encapsulation: 2 });
CuiBreadcrumbComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Renderer2 },
    { type: AppBreadcrumbService }
];
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], CuiBreadcrumbComponent.prototype, "fixed", void 0);
CuiBreadcrumbComponent = __decorate([ __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object, Renderer2,
        AppBreadcrumbService])
], CuiBreadcrumbComponent);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(CuiBreadcrumbComponent, [{
        type: Component,
        args: [{
                // tslint:disable-next-line:component-selector
                selector: 'cui-breadcrumb',
                template: "<ol class=\"breadcrumb\">\r\n  <ng-template ngFor let-breadcrumb [ngForOf]=\"breadcrumbs | async\" let-last = last>\r\n    <li class=\"breadcrumb-item\"\r\n        *ngIf=\"breadcrumb.label.title && (breadcrumb.url.slice(-1) == '/' || last)\"\r\n        [ngClass]=\"{active: last}\">\r\n      <a *ngIf=\"!last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label.title}}</a>\r\n      <span *ngIf=\"last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label.title}}</span>\r\n    </li>\r\n  </ng-template>\r\n  <ng-content></ng-content>\r\n</ol>\r\n"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }, { type: AppBreadcrumbService }]; }, { fixed: [{
            type: Input
        }] }); })();
export { CuiBreadcrumbComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VpLWJyZWFkY3J1bWIuY29tcG9uZW50LmpzIiwic291cmNlcyI6WyJuZzovQGNvcmV1aS9hbmd1bGFyL2xpYi9icmVhZGNydW1iL2N1aS1icmVhZGNydW1iLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTzlELElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBTWpDLFlBQzRCLFFBQWEsRUFDL0IsUUFBbUIsRUFDcEIsT0FBNkI7UUFGVixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFMckIsZUFBVSxHQUFHLGtCQUFrQixDQUFDO0lBTTdDLENBQUM7SUFFRSxRQUFRO1FBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUM5QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsT0FBTyxDQUFDLFFBQWlCLElBQUksQ0FBQyxLQUFLO1FBQ2pDLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzdEO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7aUtBQUE7OzRDQW5CSSxNQUFNLFNBQUMsUUFBUTtZQUNFLFNBQVM7WUFDWCxvQkFBb0I7O0FBUjdCO0lBQVIsS0FBSyxFQUFFOztxREFBZ0I7QUFEYixzQkFBc0IsZUFBZSxLQUxqRCxTQUFTLENBQUMsVUFDVCx6QkFJRSxDQU9DLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO3dDQVgyQixTQUM5QyxKQVdvQixTQUFTO0NBWHJCLEVBQUUsZ0JBQWdCLFVBQzFCLHJCQVdrQixvQkFBb0I7R0FUM0Isc0JBQXNCLENBMEJsQzs7Ozs7OzBTQTVCK0MsTUFDL0MsQ0FBQzs7Ozs7OztvQkE0QkY7U0EzQmEsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtBcHBCcmVhZGNydW1iU2VydmljZX0gZnJvbSAnLi9hcHAtYnJlYWRjcnVtYi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ2N1aS1icmVhZGNydW1iJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY3VpLWJyZWFkY3J1bWIuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDdWlCcmVhZGNydW1iQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIGZpeGVkOiBib29sZWFuO1xyXG5cclxuICBwdWJsaWMgYnJlYWRjcnVtYnM7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBmaXhlZENsYXNzID0gJ2JyZWFkY3J1bWItZml4ZWQnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHB1YmxpYyBzZXJ2aWNlOiBBcHBCcmVhZGNydW1iU2VydmljZSxcclxuICApIHsgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzRml4ZWQodGhpcy5maXhlZCk7XHJcbiAgICB0aGlzLmJyZWFkY3J1bWJzID0gdGhpcy5zZXJ2aWNlLmJyZWFkY3J1bWJzO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5maXhlZENsYXNzKTtcclxuICB9XHJcblxyXG4gIGlzRml4ZWQoZml4ZWQ6IGJvb2xlYW4gPSB0aGlzLmZpeGVkKTogdm9pZCB7XHJcbiAgICBpZiAoZml4ZWQpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksIHRoaXMuZml4ZWRDbGFzcyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==