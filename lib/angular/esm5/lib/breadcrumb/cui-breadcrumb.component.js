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
    var breadcrumb_r1 = ɵngcc0.ɵɵnextContext(2).$implicit;
    ɵngcc0.ɵɵproperty("routerLink", breadcrumb_r1.url);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(breadcrumb_r1.label.title);
} }
function CuiBreadcrumbComponent_ng_template_1_li_0_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 5);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var breadcrumb_r1 = ɵngcc0.ɵɵnextContext(2).$implicit;
    ɵngcc0.ɵɵproperty("routerLink", breadcrumb_r1.url);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(breadcrumb_r1.label.title);
} }
var _c0 = function (a0) { return { active: a0 }; };
function CuiBreadcrumbComponent_ng_template_1_li_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "li", 3);
    ɵngcc0.ɵɵtemplate(1, CuiBreadcrumbComponent_ng_template_1_li_0_a_1_Template, 2, 2, "a", 4);
    ɵngcc0.ɵɵtemplate(2, CuiBreadcrumbComponent_ng_template_1_li_0_span_2_Template, 2, 2, "span", 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var last_r2 = ɵngcc0.ɵɵnextContext().last;
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(3, _c0, last_r2));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !last_r2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", last_r2);
} }
function CuiBreadcrumbComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵtemplate(0, CuiBreadcrumbComponent_ng_template_1_li_0_Template, 3, 5, "li", 2);
} if (rf & 2) {
    var breadcrumb_r1 = ctx.$implicit;
    var last_r2 = ctx.last;
    ɵngcc0.ɵɵproperty("ngIf", breadcrumb_r1.label.title && (breadcrumb_r1.url.slice(0 - 1) == "/" || last_r2));
} }
var _c1 = ["*"];
var CuiBreadcrumbComponent = /** @class */ (function () {
    function CuiBreadcrumbComponent(document, renderer, service) {
        this.document = document;
        this.renderer = renderer;
        this.service = service;
        this.fixedClass = 'breadcrumb-fixed';
    }
    CuiBreadcrumbComponent.prototype.ngOnInit = function () {
        this.isFixed(this.fixed);
        this.breadcrumbs = this.service.breadcrumbs;
    };
    CuiBreadcrumbComponent.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(this.document.body, this.fixedClass);
    };
    CuiBreadcrumbComponent.prototype.isFixed = function (fixed) {
        if (fixed === void 0) { fixed = this.fixed; }
        if (fixed) {
            this.renderer.addClass(this.document.body, this.fixedClass);
        }
    };
    CuiBreadcrumbComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: Renderer2 },
        { type: AppBreadcrumbService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CuiBreadcrumbComponent.prototype, "fixed", void 0);
    CuiBreadcrumbComponent = __decorate([ __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object, Renderer2,
            AppBreadcrumbService])
    ], CuiBreadcrumbComponent);
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
    return CuiBreadcrumbComponent;
}());
export { CuiBreadcrumbComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VpLWJyZWFkY3J1bWIuY29tcG9uZW50LmpzIiwic291cmNlcyI6WyJuZzovQGNvcmV1aS9hbmd1bGFyL2xpYi9icmVhZGNydW1iL2N1aS1icmVhZGNydW1iLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTzlEO0lBTUUsZ0NBQzRCLFFBQWEsRUFDL0IsUUFBbUIsRUFDcEIsT0FBNkI7UUFGVixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFMckIsZUFBVSxHQUFHLGtCQUFrQixDQUFDO0lBTTdDLENBQUM7SUFFRSx5Q0FBUSxHQUFmO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUM5QyxDQUFDO0lBRUQsNENBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsd0NBQU8sR0FBUCxVQUFRLEtBQTJCO1FBQTNCLHNCQUFBLEVBQUEsUUFBaUIsSUFBSSxDQUFDLEtBQUs7UUFDakMsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDOztnREFsQkUsTUFBTSxTQUFDLFFBQVE7Z0JBQ0UsU0FBUztnQkFDWCxvQkFBb0I7O0lBUjdCO1FBQVIsS0FBSyxFQUFFOzt5REFBZ0I7SUFEYixzQkFBc0IsZUFBZSxTQUxqRCxTQUFTLENBQUMsbkJBS0gsQ0FPSCxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtFQVhuQiw4Q0FBOEMsQ0FZMUIsU0FBUztDQVg3QixRQUFRLEVBQUUsZ0JBQWdCLGZBWVIsb0JBQW9CO01BWHRDLENBRVcsc0JBQXNCLENBMEJsQzs7NFJBNUIrQyxVQUMvQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkE0QkY7SUFEQSw2QkFBQztDQUFBLEFBMUJELElBMEJDO1NBMUJZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgUmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7QXBwQnJlYWRjcnVtYlNlcnZpY2V9IGZyb20gJy4vYXBwLWJyZWFkY3J1bWIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXHJcbiAgc2VsZWN0b3I6ICdjdWktYnJlYWRjcnVtYicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2N1aS1icmVhZGNydW1iLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ3VpQnJlYWRjcnVtYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBmaXhlZDogYm9vbGVhbjtcclxuXHJcbiAgcHVibGljIGJyZWFkY3J1bWJzO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZml4ZWRDbGFzcyA9ICdicmVhZGNydW1iLWZpeGVkJztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwdWJsaWMgc2VydmljZTogQXBwQnJlYWRjcnVtYlNlcnZpY2UsXHJcbiAgKSB7IH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc0ZpeGVkKHRoaXMuZml4ZWQpO1xyXG4gICAgdGhpcy5icmVhZGNydW1icyA9IHRoaXMuc2VydmljZS5icmVhZGNydW1icztcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksIHRoaXMuZml4ZWRDbGFzcyk7XHJcbiAgfVxyXG5cclxuICBpc0ZpeGVkKGZpeGVkOiBib29sZWFuID0gdGhpcy5maXhlZCk6IHZvaWQge1xyXG4gICAgaWYgKGZpeGVkKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCB0aGlzLmZpeGVkQ2xhc3MpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=