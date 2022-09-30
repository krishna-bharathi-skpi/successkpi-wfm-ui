import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarNavHelper } from '../app-sidebar-nav.service';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from './app-sidebar-nav-icon.pipe';
import * as ɵngcc3 from './app-sidebar-nav-badge.pipe';
import * as ɵngcc4 from '@angular/router';
import * as ɵngcc5 from '../../shared/layout/layout.directive';
import * as ɵngcc6 from './app-sidebar-nav-link.pipe';

function AppSidebarNavLinkContentComponent_ng_container_0_i_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "i", 2);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavIcon");
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 1, ctx_r1.item));
} }
function AppSidebarNavLinkContentComponent_ng_container_0_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 2);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavBadge");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 2, ctx_r2.item));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r2.item.badge.text);
} }
function AppSidebarNavLinkContentComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵtemplate(1, AppSidebarNavLinkContentComponent_ng_container_0_i_1_Template, 2, 3, "i", 1);
    ɵngcc0.ɵɵelementContainerStart(2);
    ɵngcc0.ɵɵtext(3);
    ɵngcc0.ɵɵelementContainerEnd();
    ɵngcc0.ɵɵtemplate(4, AppSidebarNavLinkContentComponent_ng_container_0_span_4_Template, 3, 4, "span", 1);
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.helper.hasIcon(ctx_r0.item));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r0.item.name);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.helper.hasBadge(ctx_r0.item));
} }
function AppSidebarNavLinkComponent_a_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "a", 4);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavLink");
    ɵngcc0.ɵɵelement(2, "app-sidebar-nav-link-content", 5);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 3, ctx_r0.item))("appHtmlAttr", ctx_r0.item.attributes);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("item", ctx_r0.item);
} }
function AppSidebarNavLinkComponent_a_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "a", 6);
    ɵngcc0.ɵɵlistener("click", function AppSidebarNavLinkComponent_a_2_Template_a_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r4); const ctx_r3 = ɵngcc0.ɵɵnextContext(); return ctx_r3.linkClicked(); });
    ɵngcc0.ɵɵpipe(1, "appSidebarNavLink");
    ɵngcc0.ɵɵelement(2, "app-sidebar-nav-link-content", 5);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 4, ctx_r1.item))("href", ctx_r1.href, ɵngcc0.ɵɵsanitizeUrl)("appHtmlAttr", ctx_r1.item.attributes);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("item", ctx_r1.item);
} }
function AppSidebarNavLinkComponent_a_3_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "a", 7);
    ɵngcc0.ɵɵlistener("click", function AppSidebarNavLinkComponent_a_3_Template_a_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r6); const ctx_r5 = ɵngcc0.ɵɵnextContext(); return ctx_r5.linkClicked(); });
    ɵngcc0.ɵɵpipe(1, "appSidebarNavLink");
    ɵngcc0.ɵɵelement(2, "app-sidebar-nav-link-content", 5);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassProp("active", ctx_r2.linkActive);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 14, ctx_r2.item))("appHtmlAttr", ctx_r2.item.attributes)("target", ctx_r2.item.attributes == null ? null : ctx_r2.item.attributes.target)("queryParams", ctx_r2.item.linkProps == null ? null : ctx_r2.item.linkProps.queryParams)("fragment", ctx_r2.item.linkProps == null ? null : ctx_r2.item.linkProps.fragment)("queryParamsHandling", ctx_r2.item.linkProps == null ? null : ctx_r2.item.linkProps.queryParamsHandling)("preserveFragment", ctx_r2.item.linkProps == null ? null : ctx_r2.item.linkProps.preserveFragment)("skipLocationChange", ctx_r2.item.linkProps == null ? null : ctx_r2.item.linkProps.skipLocationChange)("replaceUrl", ctx_r2.item.linkProps == null ? null : ctx_r2.item.linkProps.replaceUrl)("state", ctx_r2.item.linkProps == null ? null : ctx_r2.item.linkProps.state)("routerLink", ctx_r2.item.url);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("item", ctx_r2.item);
} }
let AppSidebarNavLinkContentComponent = class AppSidebarNavLinkContentComponent {
    constructor(helper) {
        this.helper = helper;
    }
    ngOnInit() { }
    ngOnDestroy() { }
};
AppSidebarNavLinkContentComponent.ɵfac = function AppSidebarNavLinkContentComponent_Factory(t) { return new (t || AppSidebarNavLinkContentComponent)(ɵngcc0.ɵɵdirectiveInject(SidebarNavHelper)); };
AppSidebarNavLinkContentComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarNavLinkContentComponent, selectors: [["app-sidebar-nav-link-content"], ["cui-sidebar-nav-link-content"]], inputs: { item: "item" }, features: [ɵngcc0.ɵɵProvidersFeature([SidebarNavHelper])], decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "ngClass", 4, "ngIf"], [3, "ngClass"]], template: function AppSidebarNavLinkContentComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, AppSidebarNavLinkContentComponent_ng_container_0_Template, 5, 3, "ng-container", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", true);
    } }, directives: [ɵngcc1.NgIf, ɵngcc1.NgClass], pipes: [ɵngcc2.AppSidebarNavIconPipe, ɵngcc3.AppSidebarNavBadgePipe], encapsulation: 2 });
AppSidebarNavLinkContentComponent.ctorParameters = () => [
    { type: SidebarNavHelper }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], AppSidebarNavLinkContentComponent.prototype, "item", void 0);
AppSidebarNavLinkContentComponent = __decorate([ __metadata("design:paramtypes", [SidebarNavHelper])
], AppSidebarNavLinkContentComponent);
export { AppSidebarNavLinkContentComponent };
let AppSidebarNavLinkComponent = class AppSidebarNavLinkComponent {
    constructor(router) {
        this.router = router;
        this.linkClick = new EventEmitter();
        this.navigationEndObservable = router.events.pipe(filter(event => {
            return event instanceof NavigationEnd;
        }));
    }
    set item(item) {
        this._Item = JSON.parse(JSON.stringify(item));
    }
    get item() {
        return this._Item;
    }
    ngOnInit() {
        this.url = typeof this.item.url === 'string' ? this.item.url : this.router.serializeUrl(this.router.createUrlTree(this.item.url));
        this.linkType = this.getLinkType();
        this.href = this.isDisabled() ? '' : (this.item.href || this.url);
        this.linkActive = this.router.url.split(/[?#(;]/)[0] === this.href.split(/[?#(;]/)[0];
        this.navSubscription = this.navigationEndObservable.subscribe(event => {
            const itemUrlArray = this.href.split(/[?#(;]/)[0].split('/');
            const urlArray = event.urlAfterRedirects.split(/[?#(;]/)[0].split('/');
            this.linkActive = itemUrlArray.every((value, index) => value === urlArray[index]);
        });
    }
    ngOnDestroy() {
        this.navSubscription.unsubscribe();
    }
    getLinkType() {
        return this.isDisabled() ? 'disabled' : this.isExternalLink() ? 'external' : 'link';
    }
    isDisabled() {
        return (this.item.attributes && this.item.attributes.disabled) ? true : null;
    }
    isExternalLink() {
        return !!this.item.href || this.url.substring(0, 4) === 'http';
    }
    linkClicked() {
        this.linkClick.emit();
    }
};
AppSidebarNavLinkComponent.ɵfac = function AppSidebarNavLinkComponent_Factory(t) { return new (t || AppSidebarNavLinkComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc4.Router)); };
AppSidebarNavLinkComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarNavLinkComponent, selectors: [["app-sidebar-nav-link"], ["cui-sidebar-nav-link"]], inputs: { item: "item" }, outputs: { linkClick: "linkClick" }, features: [ɵngcc0.ɵɵProvidersFeature([SidebarNavHelper])], decls: 4, vars: 3, consts: [[3, "ngSwitch"], [3, "ngClass", "appHtmlAttr", 4, "ngSwitchCase"], [3, "ngClass", "href", "appHtmlAttr", "click", 4, "ngSwitchCase"], [3, "ngClass", "appHtmlAttr", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "routerLink", "active", "click", 4, "ngSwitchDefault"], [3, "ngClass", "appHtmlAttr"], [3, "item"], [3, "ngClass", "href", "appHtmlAttr", "click"], [3, "ngClass", "appHtmlAttr", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "routerLink", "click"]], template: function AppSidebarNavLinkComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementContainerStart(0, 0);
        ɵngcc0.ɵɵtemplate(1, AppSidebarNavLinkComponent_a_1_Template, 3, 5, "a", 1);
        ɵngcc0.ɵɵtemplate(2, AppSidebarNavLinkComponent_a_2_Template, 3, 6, "a", 2);
        ɵngcc0.ɵɵtemplate(3, AppSidebarNavLinkComponent_a_3_Template, 3, 16, "a", 3);
        ɵngcc0.ɵɵelementContainerEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngSwitch", ctx.linkType);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngSwitchCase", "disabled");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngSwitchCase", "external");
    } }, directives: [ɵngcc1.NgSwitch, ɵngcc1.NgSwitchCase, ɵngcc1.NgSwitchDefault, ɵngcc1.NgClass, ɵngcc5.HtmlAttributesDirective, AppSidebarNavLinkContentComponent, ɵngcc4.RouterLinkWithHref], pipes: [ɵngcc6.AppSidebarNavLinkPipe], encapsulation: 2 });
AppSidebarNavLinkComponent.ctorParameters = () => [
    { type: Router }
];
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AppSidebarNavLinkComponent.prototype, "item", null);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AppSidebarNavLinkComponent.prototype, "linkClick", void 0);
AppSidebarNavLinkComponent = __decorate([ __metadata("design:paramtypes", [Router])
], AppSidebarNavLinkComponent);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavLinkContentComponent, [{
        type: Component,
        args: [{
                selector: 'app-sidebar-nav-link-content, cui-sidebar-nav-link-content',
                template: `
    <ng-container *ngIf="true">
      <i *ngIf="helper.hasIcon(item)" [ngClass]="item | appSidebarNavIcon"></i>
      <ng-container>{{item.name}}</ng-container>
      <span *ngIf="helper.hasBadge(item)" [ngClass]="item | appSidebarNavBadge">{{ item.badge.text }}</span>
    </ng-container>
  `,
                providers: [SidebarNavHelper]
            }]
    }], function () { return [{ type: SidebarNavHelper }]; }, { item: [{
            type: Input
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavLinkComponent, [{
        type: Component,
        args: [{
                selector: 'app-sidebar-nav-link, cui-sidebar-nav-link',
                template: "<ng-container [ngSwitch]=\"linkType\">\r\n  <a *ngSwitchCase=\"'disabled'\"\r\n     [ngClass]=\"item | appSidebarNavLink\"\r\n     [appHtmlAttr]=\"item.attributes\"\r\n  >\r\n    <app-sidebar-nav-link-content [item]=\"item\"></app-sidebar-nav-link-content>\r\n  </a>\r\n  <a *ngSwitchCase=\"'external'\"\r\n     [ngClass]=\"item | appSidebarNavLink\"\r\n     [href]=\"href\"\r\n     [appHtmlAttr]=\"item.attributes\"\r\n     (click)=\"linkClicked()\"\r\n  >\r\n    <app-sidebar-nav-link-content [item]=\"item\"></app-sidebar-nav-link-content>\r\n  </a>\r\n  <a *ngSwitchDefault\r\n     [ngClass]=\"item | appSidebarNavLink\"\r\n     [appHtmlAttr]=\"item.attributes\"\r\n     [target]=\"item.attributes?.target\"\r\n     [queryParams]=\"item.linkProps?.queryParams\"\r\n     [fragment]=\"item.linkProps?.fragment\"\r\n     [queryParamsHandling]=\"item.linkProps?.queryParamsHandling\"\r\n     [preserveFragment]=\"item.linkProps?.preserveFragment\"\r\n     [skipLocationChange]=\"item.linkProps?.skipLocationChange\"\r\n     [replaceUrl]=\"item.linkProps?.replaceUrl\"\r\n     [state]=\"item.linkProps?.state\"\r\n     [routerLink]=\"item.url\"\r\n     [class.active]=\"linkActive\"\r\n     (click)=\"linkClicked()\"\r\n  >\r\n    <app-sidebar-nav-link-content [item]=\"item\"></app-sidebar-nav-link-content>\r\n  </a>\r\n</ng-container>\r\n",
                providers: [SidebarNavHelper]
            }]
    }], function () { return [{ type: ɵngcc4.Router }]; }, { linkClick: [{
            type: Output
        }], item: [{
            type: Input
        }] }); })();
export { AppSidebarNavLinkComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LWxpbmsuY29tcG9uZW50LmpzIiwic291cmNlcyI6WyJuZzovQGNvcmV1aS9hbmd1bGFyL2xpYi9zaWRlYmFyL2FwcC1zaWRlYmFyLW5hdi9hcHAtc2lkZWJhci1uYXYtbGluay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hGLE9BQU8sRUFBQyxhQUFhLEVBQUUsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFdEQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYzVELElBQWEsaUNBQWlDLEdBQTlDLE1BQWEsaUNBQWlDO0lBRzVDLFlBQ1MsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFDN0IsQ0FBQztJQUVMLFFBQVEsS0FBSSxDQUFDO0lBQ2IsV0FBVyxLQUFJLENBQUM7Q0FDakI7Ozs7Ozs4SUFBQTs7WUFMa0IsZ0JBQWdCOztBQUh4QjtJQUFSLEtBQUssRUFBRTs7K0RBQVc7QUFEUixpQ0FBaUMsZUFBZSxLQVg1RCxTQUFTLENBQUMsVUFDVCxRQUFRLEVBQUUsbkNBVVIsa0NBSWUsZ0JBQWdCO0dBSnRCLGlDQUFpQyxDQVM3QztHQW5CdUUsVUFDdEUsUUFBUSxFQUFFLGRBU0MsaUNBQWlDO0FBZ0I5QyxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQXNCckMsWUFDUyxNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVhiLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBYXZD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QyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUM7SUFDakUsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7OFBBQUE7O1lBeENrQixNQUFNOztBQWxCdkI7SUFEQyxLQUFLLEVBQUU7OztzREFHUDtBQUtTO0lBQVQsTUFBTSxFQUFFOzs2REFBZ0M7QUFaOUIsMEJBQTBCLGVBQWUsS0FMckQsU0FBUyxDQUFDLFVBQ1QsUUFBUSxFQUFFLG5DQUlSLGtDQXVCZSxNQUFNO0dBdkJaLDBCQUEwQixDQStEdEM7SUFuRXVELFVBQ3REOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyYkFBb0QsVUFDcEQsU0FBUyxFQUFFLENBQUUsZ0JBQWdCLENBQUUsTUFDaEMsQ0FBQzs7Ozs7OztvQkFpRUY7U0FoRWEsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05hdmlnYXRpb25FbmQsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHtTaWRlYmFyTmF2SGVscGVyfSBmcm9tICcuLi9hcHAtc2lkZWJhci1uYXYuc2VydmljZSc7XHJcbmltcG9ydCB7SU5hdkRhdGF9IGZyb20gJy4uL2FwcC1zaWRlYmFyLW5hdic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zaWRlYmFyLW5hdi1saW5rLWNvbnRlbnQsIGN1aS1zaWRlYmFyLW5hdi1saW5rLWNvbnRlbnQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidHJ1ZVwiPlxyXG4gICAgICA8aSAqbmdJZj1cImhlbHBlci5oYXNJY29uKGl0ZW0pXCIgW25nQ2xhc3NdPVwiaXRlbSB8IGFwcFNpZGViYXJOYXZJY29uXCI+PC9pPlxyXG4gICAgICA8bmctY29udGFpbmVyPnt7aXRlbS5uYW1lfX08L25nLWNvbnRhaW5lcj5cclxuICAgICAgPHNwYW4gKm5nSWY9XCJoZWxwZXIuaGFzQmFkZ2UoaXRlbSlcIiBbbmdDbGFzc109XCJpdGVtIHwgYXBwU2lkZWJhck5hdkJhZGdlXCI+e3sgaXRlbS5iYWRnZS50ZXh0IH19PC9zcGFuPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgYCxcclxuICBwcm92aWRlcnM6IFsgU2lkZWJhck5hdkhlbHBlciBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBTaWRlYmFyTmF2TGlua0NvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgaXRlbTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBoZWxwZXI6IFNpZGViYXJOYXZIZWxwZXJcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcbiAgbmdPbkRlc3Ryb3koKSB7fVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zaWRlYmFyLW5hdi1saW5rLCBjdWktc2lkZWJhci1uYXYtbGluaycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC1zaWRlYmFyLW5hdi1saW5rLmNvbXBvbmVudC5odG1sJyxcclxuICBwcm92aWRlcnM6IFsgU2lkZWJhck5hdkhlbHBlciBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBTaWRlYmFyTmF2TGlua0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcHJvdGVjdGVkIF9JdGVtOiBJTmF2RGF0YTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgaXRlbShpdGVtOiBJTmF2RGF0YSkge1xyXG4gICAgdGhpcy5fSXRlbSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaXRlbSkpO1xyXG4gIH1cclxuICBnZXQgaXRlbSgpOiBJTmF2RGF0YSB7XHJcbiAgICByZXR1cm4gdGhpcy5fSXRlbTtcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBsaW5rQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHB1YmxpYyBsaW5rVHlwZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBocmVmOiBzdHJpbmc7XHJcbiAgcHVibGljIGxpbmtBY3RpdmU6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSB1cmw6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBuYXZpZ2F0aW9uRW5kT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxOYXZpZ2F0aW9uRW5kPjtcclxuICBwcml2YXRlIG5hdlN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyByb3V0ZXI6IFJvdXRlcixcclxuICApIHtcclxuICAgIHRoaXMubmF2aWdhdGlvbkVuZE9ic2VydmFibGUgPSByb3V0ZXIuZXZlbnRzLnBpcGUoXHJcbiAgICAgIGZpbHRlcihldmVudCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZDtcclxuICAgICAgfSlcclxuICAgICkgYXMgT2JzZXJ2YWJsZTxOYXZpZ2F0aW9uRW5kPjtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy51cmwgPSB0eXBlb2YgdGhpcy5pdGVtLnVybCA9PT0gJ3N0cmluZycgPyB0aGlzLml0ZW0udXJsIDogdGhpcy5yb3V0ZXIuc2VyaWFsaXplVXJsKHRoaXMucm91dGVyLmNyZWF0ZVVybFRyZWUodGhpcy5pdGVtLnVybCkpIDtcclxuICAgIHRoaXMubGlua1R5cGUgPSB0aGlzLmdldExpbmtUeXBlKCk7XHJcbiAgICB0aGlzLmhyZWYgPSB0aGlzLmlzRGlzYWJsZWQoKSA/ICcnIDogKHRoaXMuaXRlbS5ocmVmIHx8IHRoaXMudXJsKTtcclxuICAgIHRoaXMubGlua0FjdGl2ZSA9IHRoaXMucm91dGVyLnVybC5zcGxpdCgvWz8jKDtdLylbMF0gPT09IHRoaXMuaHJlZi5zcGxpdCgvWz8jKDtdLylbMF07XHJcbiAgICB0aGlzLm5hdlN1YnNjcmlwdGlvbiA9IHRoaXMubmF2aWdhdGlvbkVuZE9ic2VydmFibGUuc3Vic2NyaWJlKGV2ZW50ID0+IHtcclxuICAgICAgY29uc3QgaXRlbVVybEFycmF5ID0gdGhpcy5ocmVmLnNwbGl0KC9bPyMoO10vKVswXS5zcGxpdCgnLycpO1xyXG4gICAgICBjb25zdCB1cmxBcnJheSA9IGV2ZW50LnVybEFmdGVyUmVkaXJlY3RzLnNwbGl0KC9bPyMoO10vKVswXS5zcGxpdCgnLycpO1xyXG4gICAgICB0aGlzLmxpbmtBY3RpdmUgPSBpdGVtVXJsQXJyYXkuZXZlcnkoKHZhbHVlLCBpbmRleCkgPT4gdmFsdWUgPT09IHVybEFycmF5W2luZGV4XSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5uYXZTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMaW5rVHlwZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmlzRGlzYWJsZWQoKSA/ICdkaXNhYmxlZCcgOiB0aGlzLmlzRXh0ZXJuYWxMaW5rKCkgPyAnZXh0ZXJuYWwnIDogJ2xpbmsnO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzRGlzYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuaXRlbS5hdHRyaWJ1dGVzICYmIHRoaXMuaXRlbS5hdHRyaWJ1dGVzLmRpc2FibGVkKSA/IHRydWUgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzRXh0ZXJuYWxMaW5rKCkge1xyXG4gICAgcmV0dXJuICEhdGhpcy5pdGVtLmhyZWYgfHwgdGhpcy51cmwuc3Vic3RyaW5nKDAsIDQpID09PSAnaHR0cCc7XHJcbiAgfVxyXG5cclxuICBsaW5rQ2xpY2tlZCgpIHtcclxuICAgIHRoaXMubGlua0NsaWNrLmVtaXQoKTtcclxuICB9XHJcbn1cclxuIl19