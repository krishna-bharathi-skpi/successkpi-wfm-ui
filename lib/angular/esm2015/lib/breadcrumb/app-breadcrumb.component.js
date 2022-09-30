import { __decorate, __metadata, __param } from "tslib";
import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AppBreadcrumbService } from './app-breadcrumb.service';
import { Replace } from '../shared';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/router';

function AppBreadcrumbComponent_ng_template_0_li_0_a_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "a", 4);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const breadcrumb_r1 = ɵngcc0.ɵɵnextContext(2).$implicit;
    ɵngcc0.ɵɵproperty("routerLink", breadcrumb_r1.url);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(breadcrumb_r1.label.title);
} }
function AppBreadcrumbComponent_ng_template_0_li_0_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 4);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const breadcrumb_r1 = ɵngcc0.ɵɵnextContext(2).$implicit;
    ɵngcc0.ɵɵproperty("routerLink", breadcrumb_r1.url);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(breadcrumb_r1.label.title);
} }
const _c0 = function (a0) { return { active: a0 }; };
function AppBreadcrumbComponent_ng_template_0_li_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "li", 2);
    ɵngcc0.ɵɵtemplate(1, AppBreadcrumbComponent_ng_template_0_li_0_a_1_Template, 2, 2, "a", 3);
    ɵngcc0.ɵɵtemplate(2, AppBreadcrumbComponent_ng_template_0_li_0_span_2_Template, 2, 2, "span", 3);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const last_r2 = ɵngcc0.ɵɵnextContext().last;
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(3, _c0, last_r2));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !last_r2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", last_r2);
} }
function AppBreadcrumbComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵtemplate(0, AppBreadcrumbComponent_ng_template_0_li_0_Template, 3, 5, "li", 1);
} if (rf & 2) {
    const breadcrumb_r1 = ctx.$implicit;
    const last_r2 = ctx.last;
    ɵngcc0.ɵɵproperty("ngIf", breadcrumb_r1.label.title && (breadcrumb_r1.url.slice(0 - 1) == "/" || last_r2));
} }
let AppBreadcrumbComponent = class AppBreadcrumbComponent {
    constructor(document, renderer, service, el) {
        this.document = document;
        this.renderer = renderer;
        this.service = service;
        this.el = el;
        this.fixedClass = 'breadcrumb-fixed';
    }
    ngOnInit() {
        Replace(this.el);
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
AppBreadcrumbComponent.ɵfac = function AppBreadcrumbComponent_Factory(t) { return new (t || AppBreadcrumbComponent)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(AppBreadcrumbService), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
AppBreadcrumbComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppBreadcrumbComponent, selectors: [["app-breadcrumb"]], inputs: { fixed: "fixed" }, decls: 2, vars: 3, consts: [["ngFor", "", 3, "ngForOf"], ["class", "breadcrumb-item", 3, "ngClass", 4, "ngIf"], [1, "breadcrumb-item", 3, "ngClass"], [3, "routerLink", 4, "ngIf"], [3, "routerLink"]], template: function AppBreadcrumbComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, AppBreadcrumbComponent_ng_template_0_Template, 1, 1, "ng-template", 0);
        ɵngcc0.ɵɵpipe(1, "async");
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(1, 1, ctx.breadcrumbs));
    } }, directives: [ɵngcc1.NgForOf, ɵngcc1.NgIf, ɵngcc1.NgClass, ɵngcc2.RouterLinkWithHref, ɵngcc2.RouterLink], pipes: [ɵngcc1.AsyncPipe], encapsulation: 2 });
AppBreadcrumbComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Renderer2 },
    { type: AppBreadcrumbService },
    { type: ElementRef }
];
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], AppBreadcrumbComponent.prototype, "fixed", void 0);
AppBreadcrumbComponent = __decorate([ __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object, Renderer2,
        AppBreadcrumbService,
        ElementRef])
], AppBreadcrumbComponent);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppBreadcrumbComponent, [{
        type: Component,
        args: [{
                selector: 'app-breadcrumb',
                template: `
    <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs | async" let-last = last>
      <li class="breadcrumb-item"
          *ngIf="breadcrumb.label.title && (breadcrumb.url.slice(-1) == '/' || last)"
          [ngClass]="{active: last}">
        <a *ngIf="!last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</a>
        <span *ngIf="last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</span>
      </li>
    </ng-template>
  `
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }, { type: AppBreadcrumbService }, { type: ɵngcc0.ElementRef }]; }, { fixed: [{
            type: Input
        }] }); })();
export { AppBreadcrumbComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJyZWFkY3J1bWIuY29tcG9uZW50LmpzIiwic291cmNlcyI6WyJuZzovQGNvcmV1aS9hbmd1bGFyL2xpYi9icmVhZGNydW1iL2FwcC1icmVhZGNydW1iLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDOUQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVsQyxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQUtqQyxZQUM0QixRQUFhLEVBQy9CLFFBQW1CLEVBQ3BCLE9BQTZCLEVBQzdCLEVBQWM7UUFISyxhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFDN0IsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQU5OLGVBQVUsR0FBRyxrQkFBa0IsQ0FBQztJQU83QyxDQUFDO0lBRUUsUUFBUTtRQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUM5QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsT0FBTyxDQUFDLFFBQWlCLElBQUksQ0FBQyxLQUFLO1FBQ2pDLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzdEO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7O2lLQUFBOzs0Q0FyQkksTUFBTSxTQUFDLFFBQVE7WUFDRSxTQUFTO1lBQ1gsb0JBQW9CO1lBQ3pCLFVBQVU7O0FBUmQ7SUFBUixLQUFLLEVBQUU7O3FEQUFnQjtBQURiLHNCQUFzQixlQUFlLEtBYmpELFNBQVMsQ0FBQyxVQUNULHpCQVlFLENBTUMsV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7RUFsQlgsRUFBRSxnQkFBZ0IsVUFDMUIsUUFBUSxFQUFFLEtBa0JVLFNBQVM7UUFDWCxvQkFBb0I7UUFDekIsVUFBVTtHQVRaLHNCQUFzQixDQTJCbEM7Ozs7Ozs7OytDQTdCRSxNQUNGLENBQUM7Ozs7Ozs7Ozs7Ozs7b0JBNkJGO1NBNUJhLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgUmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7QXBwQnJlYWRjcnVtYlNlcnZpY2V9IGZyb20gJy4vYXBwLWJyZWFkY3J1bWIuc2VydmljZSc7XG5pbXBvcnQge1JlcGxhY2V9IGZyb20gJy4uL3NoYXJlZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1icmVhZGNydW1iJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWJyZWFkY3J1bWIgW25nRm9yT2ZdPVwiYnJlYWRjcnVtYnMgfCBhc3luY1wiIGxldC1sYXN0ID0gbGFzdD5cbiAgICAgIDxsaSBjbGFzcz1cImJyZWFkY3J1bWItaXRlbVwiXG4gICAgICAgICAgKm5nSWY9XCJicmVhZGNydW1iLmxhYmVsLnRpdGxlICYmIChicmVhZGNydW1iLnVybC5zbGljZSgtMSkgPT0gJy8nIHx8IGxhc3QpXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7YWN0aXZlOiBsYXN0fVwiPlxuICAgICAgICA8YSAqbmdJZj1cIiFsYXN0XCIgW3JvdXRlckxpbmtdPVwiYnJlYWRjcnVtYi51cmxcIj57e2JyZWFkY3J1bWIubGFiZWwudGl0bGV9fTwvYT5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJsYXN0XCIgW3JvdXRlckxpbmtdPVwiYnJlYWRjcnVtYi51cmxcIj57e2JyZWFkY3J1bWIubGFiZWwudGl0bGV9fTwvc3Bhbj5cbiAgICAgIDwvbGk+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBBcHBCcmVhZGNydW1iQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBmaXhlZDogYm9vbGVhbjtcbiAgcHVibGljIGJyZWFkY3J1bWJzO1xuICBwcml2YXRlIHJlYWRvbmx5IGZpeGVkQ2xhc3MgPSAnYnJlYWRjcnVtYi1maXhlZCc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwdWJsaWMgc2VydmljZTogQXBwQnJlYWRjcnVtYlNlcnZpY2UsXG4gICAgcHVibGljIGVsOiBFbGVtZW50UmVmXG4gICkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIFJlcGxhY2UodGhpcy5lbCk7XG4gICAgdGhpcy5pc0ZpeGVkKHRoaXMuZml4ZWQpO1xuICAgIHRoaXMuYnJlYWRjcnVtYnMgPSB0aGlzLnNlcnZpY2UuYnJlYWRjcnVtYnM7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5maXhlZENsYXNzKTtcbiAgfVxuXG4gIGlzRml4ZWQoZml4ZWQ6IGJvb2xlYW4gPSB0aGlzLmZpeGVkKTogdm9pZCB7XG4gICAgaWYgKGZpeGVkKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5maXhlZENsYXNzKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==