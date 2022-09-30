(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@angular/core'),require('@angular/common'),require('@angular/router'),exports, require('@angular/core'), require('@angular/common'), require('@angular/router'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@coreui/angular', ['@angular/core','@angular/common','@angular/router','exports', '@angular/core', '@angular/common', '@angular/router', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory(global.ng.core,global.ng.common,global.ng.router,(global.coreui = global.coreui || {}, global.coreui.angular = {}), global.ng.core, global.ng.common, global.ng.router, global.rxjs, global.rxjs.operators));
}(this, (function (ɵngcc0,ɵngcc1,ɵngcc2,exports, core, common, router, rxjs, operators) { 
var _c0 = ["*"];
function AppBreadcrumbComponent_ng_template_0_li_0_a_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "a", 4);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var breadcrumb_r1 = ɵngcc0.ɵɵnextContext(2).$implicit;
    ɵngcc0.ɵɵproperty("routerLink", breadcrumb_r1.url);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(breadcrumb_r1.label.title);
} }
function AppBreadcrumbComponent_ng_template_0_li_0_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 4);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var breadcrumb_r1 = ɵngcc0.ɵɵnextContext(2).$implicit;
    ɵngcc0.ɵɵproperty("routerLink", breadcrumb_r1.url);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(breadcrumb_r1.label.title);
} }
var _c1 = function (a0) { return { active: a0 }; };
function AppBreadcrumbComponent_ng_template_0_li_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "li", 2);
    ɵngcc0.ɵɵtemplate(1, AppBreadcrumbComponent_ng_template_0_li_0_a_1_Template, 2, 2, "a", 3);
    ɵngcc0.ɵɵtemplate(2, AppBreadcrumbComponent_ng_template_0_li_0_span_2_Template, 2, 2, "span", 3);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var last_r2 = ɵngcc0.ɵɵnextContext().last;
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(3, _c1, last_r2));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !last_r2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", last_r2);
} }
function AppBreadcrumbComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵtemplate(0, AppBreadcrumbComponent_ng_template_0_li_0_Template, 3, 5, "li", 1);
} if (rf & 2) {
    var breadcrumb_r1 = ctx.$implicit;
    var last_r2 = ctx.last;
    ɵngcc0.ɵɵproperty("ngIf", breadcrumb_r1.label.title && (breadcrumb_r1.url.slice(0 - 1) == "/" || last_r2));
} }
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
function CuiBreadcrumbComponent_ng_template_1_li_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "li", 3);
    ɵngcc0.ɵɵtemplate(1, CuiBreadcrumbComponent_ng_template_1_li_0_a_1_Template, 2, 2, "a", 4);
    ɵngcc0.ɵɵtemplate(2, CuiBreadcrumbComponent_ng_template_1_li_0_span_2_Template, 2, 2, "span", 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var last_r2 = ɵngcc0.ɵɵnextContext().last;
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(3, _c1, last_r2));
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
function AppSidebarNavDropdownComponent_i_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "i", 3);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavIcon");
} if (rf & 2) {
    var ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 1, ctx_r0.item));
} }
function AppSidebarNavDropdownComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 3);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavBadge");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 2, ctx_r1.item));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r1.item.badge.text);
} }
function AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_dropdown_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "app-sidebar-nav-dropdown", 7);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavItemClass");
} if (rf & 2) {
    var item_r1 = ɵngcc0.ɵɵnextContext().$implicit;
    var ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassProp("open", ctx_r2.helper.isActive(ctx_r2.router, item_r1));
    ɵngcc0.ɵɵproperty("item", item_r1)("ngClass", ɵngcc0.ɵɵpipeBind1(1, 4, item_r1));
} }
function AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_divider_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "app-sidebar-nav-divider", 8);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavItemClass");
} if (rf & 2) {
    var item_r1 = ɵngcc0.ɵɵnextContext().$implicit;
    ɵngcc0.ɵɵproperty("item", item_r1)("ngClass", ɵngcc0.ɵɵpipeBind1(1, 3, item_r1))("appHtmlAttr", item_r1.attributes);
} }
function AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_title_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "app-sidebar-nav-title", 8);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavItemClass");
} if (rf & 2) {
    var item_r1 = ɵngcc0.ɵɵnextContext().$implicit;
    ɵngcc0.ɵɵproperty("item", item_r1)("ngClass", ɵngcc0.ɵɵpipeBind1(1, 3, item_r1))("appHtmlAttr", item_r1.attributes);
} }
function AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_label_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "app-sidebar-nav-label", 9);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavItemClass");
} if (rf & 2) {
    var item_r1 = ɵngcc0.ɵɵnextContext().$implicit;
    ɵngcc0.ɵɵproperty("item", item_r1)("ngClass", ɵngcc0.ɵɵpipeBind1(1, 2, item_r1));
} }
function AppSidebarNavItemsComponent_ng_container_0_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_link_7_Template(rf, ctx) { if (rf & 1) {
    var _r13 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "app-sidebar-nav-link", 10);
    ɵngcc0.ɵɵlistener("linkClick", function AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_link_7_Template_app_sidebar_nav_link_linkClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r13); var ctx_r12 = ɵngcc0.ɵɵnextContext(2); return ctx_r12.hideMobile(); });
    ɵngcc0.ɵɵpipe(1, "appSidebarNavItemClass");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var item_r1 = ɵngcc0.ɵɵnextContext().$implicit;
    ɵngcc0.ɵɵproperty("item", item_r1)("ngClass", ɵngcc0.ɵɵpipeBind1(1, 2, item_r1));
} }
function AppSidebarNavItemsComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementContainerStart(1, 1);
    ɵngcc0.ɵɵtemplate(2, AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_dropdown_2_Template, 2, 6, "app-sidebar-nav-dropdown", 2);
    ɵngcc0.ɵɵtemplate(3, AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_divider_3_Template, 2, 5, "app-sidebar-nav-divider", 3);
    ɵngcc0.ɵɵtemplate(4, AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_title_4_Template, 2, 5, "app-sidebar-nav-title", 3);
    ɵngcc0.ɵɵtemplate(5, AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_label_5_Template, 2, 4, "app-sidebar-nav-label", 4);
    ɵngcc0.ɵɵtemplate(6, AppSidebarNavItemsComponent_ng_container_0_ng_container_6_Template, 1, 0, "ng-container", 5);
    ɵngcc0.ɵɵtemplate(7, AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_link_7_Template, 2, 4, "app-sidebar-nav-link", 6);
    ɵngcc0.ɵɵelementContainerEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    var item_r1 = ctx.$implicit;
    var ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitch", ctx_r0.helper.itemType(item_r1));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "dropdown");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "divider");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "title");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "label");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "empty");
} }
function AppSidebarNavLinkContentComponent_ng_container_0_i_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "i", 2);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavIcon");
} if (rf & 2) {
    var ctx_r1 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 1, ctx_r1.item));
} }
function AppSidebarNavLinkContentComponent_ng_container_0_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 2);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavBadge");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r2 = ɵngcc0.ɵɵnextContext(2);
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
    var ctx_r0 = ɵngcc0.ɵɵnextContext();
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
    var ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 3, ctx_r0.item))("appHtmlAttr", ctx_r0.item.attributes);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("item", ctx_r0.item);
} }
function AppSidebarNavLinkComponent_a_2_Template(rf, ctx) { if (rf & 1) {
    var _r4 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "a", 6);
    ɵngcc0.ɵɵlistener("click", function AppSidebarNavLinkComponent_a_2_Template_a_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r4); var ctx_r3 = ɵngcc0.ɵɵnextContext(); return ctx_r3.linkClicked(); });
    ɵngcc0.ɵɵpipe(1, "appSidebarNavLink");
    ɵngcc0.ɵɵelement(2, "app-sidebar-nav-link-content", 5);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 4, ctx_r1.item))("href", ctx_r1.href, ɵngcc0.ɵɵsanitizeUrl)("appHtmlAttr", ctx_r1.item.attributes);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("item", ctx_r1.item);
} }
function AppSidebarNavLinkComponent_a_3_Template(rf, ctx) { if (rf & 1) {
    var _r6 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "a", 7);
    ɵngcc0.ɵɵlistener("click", function AppSidebarNavLinkComponent_a_3_Template_a_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r6); var ctx_r5 = ɵngcc0.ɵɵnextContext(); return ctx_r5.linkClicked(); });
    ɵngcc0.ɵɵpipe(1, "appSidebarNavLink");
    ɵngcc0.ɵɵelement(2, "app-sidebar-nav-link-content", 5);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassProp("active", ctx_r2.linkActive);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 14, ctx_r2.item))("appHtmlAttr", ctx_r2.item.attributes)("target", ctx_r2.item.attributes == null ? null : ctx_r2.item.attributes.target)("queryParams", ctx_r2.item.linkProps == null ? null : ctx_r2.item.linkProps.queryParams)("fragment", ctx_r2.item.linkProps == null ? null : ctx_r2.item.linkProps.fragment)("queryParamsHandling", ctx_r2.item.linkProps == null ? null : ctx_r2.item.linkProps.queryParamsHandling)("preserveFragment", ctx_r2.item.linkProps == null ? null : ctx_r2.item.linkProps.preserveFragment)("skipLocationChange", ctx_r2.item.linkProps == null ? null : ctx_r2.item.linkProps.skipLocationChange)("replaceUrl", ctx_r2.item.linkProps == null ? null : ctx_r2.item.linkProps.replaceUrl)("state", ctx_r2.item.linkProps == null ? null : ctx_r2.item.linkProps.state)("routerLink", ctx_r2.item.url);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("item", ctx_r2.item);
} }
function AppSidebarNavLabelComponent_i_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "i", 2);
} if (rf & 2) {
    var ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ctx_r0.getLabelIconClass());
} }
function AppSidebarNavLabelComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 2);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavBadge");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpipeBind1(1, 2, ctx_r1.item));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r1.item.badge.text);
} }
'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var sidebarCssClasses = [
        'sidebar-show',
        'sidebar-sm-show',
        'sidebar-md-show',
        'sidebar-lg-show',
        'sidebar-xl-show'
    ];
    var asideMenuCssClasses = [
        'aside-menu-show',
        'aside-menu-sm-show',
        'aside-menu-md-show',
        'aside-menu-lg-show',
        'aside-menu-xl-show'
    ];

    var RemoveClasses = function (NewClassNames) {
        var MatchClasses = NewClassNames.map(function (Class) { return document.body.classList.contains(Class); });
        return MatchClasses.indexOf(true) !== -1;
    };
    var ɵ0 = RemoveClasses;
    var ToggleClasses = function (Toggle, ClassNames) {
        var Level = ClassNames.indexOf(Toggle);
        var NewClassNames = ClassNames.slice(0, Level + 1);
        if (RemoveClasses(NewClassNames)) {
            NewClassNames.map(function (Class) { return document.body.classList.remove(Class); });
        }
        else {
            document.body.classList.add(Toggle);
        }
    };
    var ClassToggler = /** @class */ (function () {
        function ClassToggler(document, renderer) {
            this.document = document;
            this.renderer = renderer;
        }
        ClassToggler.prototype.removeClasses = function (NewClassNames) {
            var _this = this;
            var MatchClasses = NewClassNames.map(function (Class) { return _this.document.body.classList.contains(Class); });
            return MatchClasses.indexOf(true) !== -1;
        };
        ClassToggler.prototype.toggleClasses = function (Toggle, ClassNames) {
            var _this = this;
            var Level = ClassNames.indexOf(Toggle);
            var NewClassNames = ClassNames.slice(0, Level + 1);
            if (this.removeClasses(NewClassNames)) {
                NewClassNames.map(function (Class) { return _this.renderer.removeClass(_this.document.body, Class); });
            }
            else {
                this.renderer.addClass(this.document.body, Toggle);
            }
        };
        ClassToggler.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.Renderer2 }
        ]; };
        ClassToggler = __decorate([ __param(0, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [Object, core.Renderer2])
        ], ClassToggler);
ClassToggler.ɵfac = function ClassToggler_Factory(t) { return new (t || ClassToggler)(ɵngcc0.ɵɵinject(common.DOCUMENT), ɵngcc0.ɵɵinject(ɵngcc0.Renderer2)); };
ClassToggler.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ClassToggler, factory: function (t) { return ClassToggler.ɵfac(t); } });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ClassToggler, [{
        type: core.Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: core.Inject,
                args: [common.DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, null); })();
        return ClassToggler;
    }());

    /**
     * Allows the sidebar to be toggled via click.
     */
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
            core.Input('appSidebarToggler'),
            __metadata("design:type", String)
        ], SidebarToggleDirective.prototype, "breakpoint", void 0);
        __decorate([
            core.HostListener('click', ['$event']),
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
        type: core.Directive,
        args: [{
                selector: '[appSidebarToggler]',
                providers: [ClassToggler]
            }]
    }], function () { return [{ type: ClassToggler }]; }, { toggleOpen: [{
            type: core.HostListener,
            args: ['click', ['$event']]
        }], breakpoint: [{
            type: core.Input,
            args: ['appSidebarToggler']
        }] }); })();
        return SidebarToggleDirective;
    }());
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
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.HostListener('click', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], SidebarMinimizeDirective.prototype, "toggleOpen", null);
        SidebarMinimizeDirective = __decorate([ __param(0, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [Object, core.Renderer2])
        ], SidebarMinimizeDirective);
SidebarMinimizeDirective.ɵfac = function SidebarMinimizeDirective_Factory(t) { return new (t || SidebarMinimizeDirective)(ɵngcc0.ɵɵdirectiveInject(common.DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
SidebarMinimizeDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: SidebarMinimizeDirective, selectors: [["", "appSidebarMinimizer", ""]], hostBindings: function SidebarMinimizeDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function SidebarMinimizeDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } } });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SidebarMinimizeDirective, [{
        type: core.Directive,
        args: [{
                selector: '[appSidebarMinimizer]'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: core.Inject,
                args: [common.DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, { toggleOpen: [{
            type: core.HostListener,
            args: ['click', ['$event']]
        }] }); })();
        return SidebarMinimizeDirective;
    }());
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
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.HostListener('click', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], MobileSidebarToggleDirective.prototype, "toggleOpen", null);
        MobileSidebarToggleDirective = __decorate([ __param(0, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [Object, core.Renderer2])
        ], MobileSidebarToggleDirective);
MobileSidebarToggleDirective.ɵfac = function MobileSidebarToggleDirective_Factory(t) { return new (t || MobileSidebarToggleDirective)(ɵngcc0.ɵɵdirectiveInject(common.DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
MobileSidebarToggleDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: MobileSidebarToggleDirective, selectors: [["", "appMobileSidebarToggler", ""]], hostBindings: function MobileSidebarToggleDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function MobileSidebarToggleDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } } });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(MobileSidebarToggleDirective, [{
        type: core.Directive,
        args: [{
                selector: '[appMobileSidebarToggler]'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: core.Inject,
                args: [common.DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, { toggleOpen: [{
            type: core.HostListener,
            args: ['click', ['$event']]
        }] }); })();
        return MobileSidebarToggleDirective;
    }());
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
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.HostListener('click', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], SidebarOffCanvasCloseDirective.prototype, "toggleOpen", null);
        SidebarOffCanvasCloseDirective = __decorate([ __param(0, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [Object, core.Renderer2])
        ], SidebarOffCanvasCloseDirective);
SidebarOffCanvasCloseDirective.ɵfac = function SidebarOffCanvasCloseDirective_Factory(t) { return new (t || SidebarOffCanvasCloseDirective)(ɵngcc0.ɵɵdirectiveInject(common.DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
SidebarOffCanvasCloseDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: SidebarOffCanvasCloseDirective, selectors: [["", "appSidebarClose", ""]], hostBindings: function SidebarOffCanvasCloseDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function SidebarOffCanvasCloseDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } } });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SidebarOffCanvasCloseDirective, [{
        type: core.Directive,
        args: [{
                selector: '[appSidebarClose]'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: core.Inject,
                args: [common.DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, { toggleOpen: [{
            type: core.HostListener,
            args: ['click', ['$event']]
        }] }); })();
        return SidebarOffCanvasCloseDirective;
    }());
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
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.HostListener('click', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], BrandMinimizeDirective.prototype, "toggleOpen", null);
        BrandMinimizeDirective = __decorate([ __param(0, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [Object, core.Renderer2])
        ], BrandMinimizeDirective);
BrandMinimizeDirective.ɵfac = function BrandMinimizeDirective_Factory(t) { return new (t || BrandMinimizeDirective)(ɵngcc0.ɵɵdirectiveInject(common.DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
BrandMinimizeDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: BrandMinimizeDirective, selectors: [["", "appBrandMinimizer", ""]], hostBindings: function BrandMinimizeDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function BrandMinimizeDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } } });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BrandMinimizeDirective, [{
        type: core.Directive,
        args: [{
                selector: '[appBrandMinimizer]'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: core.Inject,
                args: [common.DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, { toggleOpen: [{
            type: core.HostListener,
            args: ['click', ['$event']]
        }] }); })();
        return BrandMinimizeDirective;
    }());
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
            core.Input('appAsideMenuToggler'),
            __metadata("design:type", String)
        ], AsideToggleDirective.prototype, "breakpoint", void 0);
        __decorate([
            core.HostListener('click', ['$event']),
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
        type: core.Directive,
        args: [{
                selector: '[appAsideMenuToggler]',
                providers: [ClassToggler]
            }]
    }], function () { return [{ type: ClassToggler }]; }, { toggleOpen: [{
            type: core.HostListener,
            args: ['click', ['$event']]
        }], breakpoint: [{
            type: core.Input,
            args: ['appAsideMenuToggler']
        }] }); })();
        return AsideToggleDirective;
    }());
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
            { type: core.Renderer2 },
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], HtmlAttributesDirective.prototype, "appHtmlAttr", void 0);
        HtmlAttributesDirective = __decorate([ __metadata("design:paramtypes", [core.Renderer2,
                core.ElementRef])
        ], HtmlAttributesDirective);
HtmlAttributesDirective.ɵfac = function HtmlAttributesDirective_Factory(t) { return new (t || HtmlAttributesDirective)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
HtmlAttributesDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: HtmlAttributesDirective, selectors: [["", "appHtmlAttr", ""]], inputs: { appHtmlAttr: "appHtmlAttr" } });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HtmlAttributesDirective, [{
        type: core.Directive,
        args: [{
                selector: '[appHtmlAttr]'
            }]
    }], function () { return [{ type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ElementRef }]; }, { appHtmlAttr: [{
            type: core.Input
        }] }); })();
        return HtmlAttributesDirective;
    }());

    var LayoutModule = /** @class */ (function () {
        function LayoutModule() {
        }
LayoutModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: LayoutModule });
LayoutModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function LayoutModule_Factory(t) { return new (t || LayoutModule)(); }, providers: [
        ClassToggler
    ], imports: [[
            common.CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(LayoutModule, { declarations: [AsideToggleDirective,
        BrandMinimizeDirective,
        MobileSidebarToggleDirective,
        SidebarToggleDirective,
        SidebarMinimizeDirective,
        SidebarOffCanvasCloseDirective,
        HtmlAttributesDirective], imports: [ɵngcc1.CommonModule], exports: [AsideToggleDirective,
        BrandMinimizeDirective,
        MobileSidebarToggleDirective,
        SidebarToggleDirective,
        SidebarMinimizeDirective,
        SidebarOffCanvasCloseDirective,
        HtmlAttributesDirective] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(LayoutModule, [{
        type: core.NgModule,
        args: [{
                imports: [
                    common.CommonModule
                ],
                exports: [
                    AsideToggleDirective,
                    BrandMinimizeDirective,
                    MobileSidebarToggleDirective,
                    SidebarToggleDirective,
                    SidebarMinimizeDirective,
                    SidebarOffCanvasCloseDirective,
                    HtmlAttributesDirective
                ],
                declarations: [
                    AsideToggleDirective,
                    BrandMinimizeDirective,
                    MobileSidebarToggleDirective,
                    SidebarToggleDirective,
                    SidebarMinimizeDirective,
                    SidebarOffCanvasCloseDirective,
                    HtmlAttributesDirective
                ],
                providers: [
                    ClassToggler
                ]
            }]
    }], function () { return []; }, null); })();
        return LayoutModule;
    }());

    function Replace(el) {
        var nativeElement = el.nativeElement;
        var parentElement = nativeElement.parentElement;
        // move all children out of the element
        while (nativeElement.firstChild) {
            parentElement.insertBefore(nativeElement.firstChild, nativeElement);
        }
        // remove the empty element(the host)
        parentElement.removeChild(nativeElement);
    }

    var AppAsideComponent = /** @class */ (function () {
        function AppAsideComponent(document, renderer) {
            this.document = document;
            this.renderer = renderer;
            this.fixedClass = 'aside-menu-fixed';
            this.asideMenuClass = true;
        }
        AppAsideComponent.prototype.ngOnInit = function () {
            this.isFixed(this.fixed);
            this.isOffCanvas(this.offCanvas);
            this.displayBreakpoint(this.display);
        };
        AppAsideComponent.prototype.ngOnDestroy = function () {
            this.renderer.removeClass(this.document.body, this.fixedClass);
        };
        AppAsideComponent.prototype.isFixed = function (fixed) {
            if (fixed === void 0) { fixed = this.fixed; }
            if (fixed) {
                this.renderer.addClass(this.document.body, this.fixedClass);
            }
        };
        AppAsideComponent.prototype.isOffCanvas = function (offCanvas) {
            if (offCanvas === void 0) { offCanvas = this.offCanvas; }
            if (offCanvas) {
                this.renderer.addClass(this.document.body, 'aside-menu-off-canvas');
            }
        };
        AppAsideComponent.prototype.displayBreakpoint = function (display) {
            if (display === void 0) { display = this.display; }
            if (display !== false) {
                var cssClass = this.display ? "aside-menu-" + this.display + "-show" : asideMenuCssClasses[0];
                this.renderer.addClass(this.document.body, cssClass);
            }
        };
        AppAsideComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AppAsideComponent.prototype, "display", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AppAsideComponent.prototype, "fixed", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AppAsideComponent.prototype, "offCanvas", void 0);
        __decorate([
            core.HostBinding('class.aside-menu'),
            __metadata("design:type", Object)
        ], AppAsideComponent.prototype, "asideMenuClass", void 0);
        AppAsideComponent = __decorate([ __param(0, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [Object, core.Renderer2])
        ], AppAsideComponent);
AppAsideComponent.ɵfac = function AppAsideComponent_Factory(t) { return new (t || AppAsideComponent)(ɵngcc0.ɵɵdirectiveInject(common.DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
AppAsideComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppAsideComponent, selectors: [["app-aside"], ["cui-aside"]], hostVars: 2, hostBindings: function AppAsideComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("aside-menu", ctx.asideMenuClass);
    } }, inputs: { display: "display", fixed: "fixed", offCanvas: "offCanvas" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function AppAsideComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppAsideComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-aside, cui-aside',
                template: "<ng-content></ng-content>"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: core.Inject,
                args: [common.DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, { asideMenuClass: [{
            type: core.HostBinding,
            args: ['class.aside-menu']
        }], display: [{
            type: core.Input
        }], fixed: [{
            type: core.Input
        }], offCanvas: [{
            type: core.Input
        }] }); })();
        return AppAsideComponent;
    }());

    var AppAsideModule = /** @class */ (function () {
        function AppAsideModule() {
        }
AppAsideModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: AppAsideModule });
AppAsideModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function AppAsideModule_Factory(t) { return new (t || AppAsideModule)(); }, imports: [[
            common.CommonModule,
            LayoutModule
        ],
        LayoutModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(AppAsideModule, { declarations: [AppAsideComponent], imports: [ɵngcc1.CommonModule, LayoutModule], exports: [AppAsideComponent,
        LayoutModule] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppAsideModule, [{
        type: core.NgModule,
        args: [{
                imports: [
                    common.CommonModule,
                    LayoutModule
                ],
                exports: [
                    AppAsideComponent,
                    LayoutModule
                ],
                declarations: [
                    AppAsideComponent
                ]
            }]
    }], function () { return []; }, null); })();
        return AppAsideModule;
    }());

    var AppBreadcrumbService = /** @class */ (function () {
        function AppBreadcrumbService(router$1, route) {
            var _this = this;
            this.router = router$1;
            this.route = route;
            this.breadcrumbSubject = new rxjs.BehaviorSubject(new Array());
            this.breadcrumbs = this.breadcrumbSubject.asObservable();
            this.router.events.pipe(operators.filter(function (event) { return event instanceof router.NavigationEnd; })).subscribe(function (event) {
                var breadcrumbs = [];
                var currentRoute = _this.route.root;
                var url = '';
                do {
                    var childrenRoutes = currentRoute.children;
                    currentRoute = null;
                    // tslint:disable-next-line:no-shadowed-variable
                    childrenRoutes.forEach(function (route) {
                        if (route.outlet === 'primary') {
                            var routeSnapshot = route.snapshot;
                            url += '/' + routeSnapshot.url.map(function (segment) { return segment.path; }).join('/');
                            breadcrumbs.push({
                                label: route.snapshot.data,
                                url: url
                            });
                            currentRoute = route;
                        }
                    });
                } while (currentRoute);
                _this.breadcrumbSubject.next(Object.assign([], breadcrumbs));
                return breadcrumbs;
            });
        }
        AppBreadcrumbService.ctorParameters = function () { return [
            { type: router.Router },
            { type: router.ActivatedRoute }
        ]; };
        AppBreadcrumbService.ɵprov = core["ɵɵdefineInjectable"]({ factory: function AppBreadcrumbService_Factory() { return new AppBreadcrumbService(core["ɵɵinject"](router.Router), core["ɵɵinject"](router.ActivatedRoute)); }, token: AppBreadcrumbService, providedIn: "root" });
        AppBreadcrumbService = __decorate([ __metadata("design:paramtypes", [router.Router, router.ActivatedRoute])
        ], AppBreadcrumbService);
AppBreadcrumbService.ɵfac = function AppBreadcrumbService_Factory(t) { return new (t || AppBreadcrumbService)(ɵngcc0.ɵɵinject(ɵngcc2.Router), ɵngcc0.ɵɵinject(ɵngcc2.ActivatedRoute)); };
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppBreadcrumbService, [{
        type: core.Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: ɵngcc2.Router }, { type: ɵngcc2.ActivatedRoute }]; }, null); })();
        return AppBreadcrumbService;
    }());

    var AppBreadcrumbComponent = /** @class */ (function () {
        function AppBreadcrumbComponent(document, renderer, service, el) {
            this.document = document;
            this.renderer = renderer;
            this.service = service;
            this.el = el;
            this.fixedClass = 'breadcrumb-fixed';
        }
        AppBreadcrumbComponent.prototype.ngOnInit = function () {
            Replace(this.el);
            this.isFixed(this.fixed);
            this.breadcrumbs = this.service.breadcrumbs;
        };
        AppBreadcrumbComponent.prototype.ngOnDestroy = function () {
            this.renderer.removeClass(this.document.body, this.fixedClass);
        };
        AppBreadcrumbComponent.prototype.isFixed = function (fixed) {
            if (fixed === void 0) { fixed = this.fixed; }
            if (fixed) {
                this.renderer.addClass(this.document.body, this.fixedClass);
            }
        };
        AppBreadcrumbComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.Renderer2 },
            { type: AppBreadcrumbService },
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AppBreadcrumbComponent.prototype, "fixed", void 0);
        AppBreadcrumbComponent = __decorate([ __param(0, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [Object, core.Renderer2,
                AppBreadcrumbService,
                core.ElementRef])
        ], AppBreadcrumbComponent);
AppBreadcrumbComponent.ɵfac = function AppBreadcrumbComponent_Factory(t) { return new (t || AppBreadcrumbComponent)(ɵngcc0.ɵɵdirectiveInject(common.DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(AppBreadcrumbService), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
AppBreadcrumbComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppBreadcrumbComponent, selectors: [["app-breadcrumb"]], inputs: { fixed: "fixed" }, decls: 2, vars: 3, consts: [["ngFor", "", 3, "ngForOf"], ["class", "breadcrumb-item", 3, "ngClass", 4, "ngIf"], [1, "breadcrumb-item", 3, "ngClass"], [3, "routerLink", 4, "ngIf"], [3, "routerLink"]], template: function AppBreadcrumbComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, AppBreadcrumbComponent_ng_template_0_Template, 1, 1, "ng-template", 0);
        ɵngcc0.ɵɵpipe(1, "async");
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(1, 1, ctx.breadcrumbs));
    } }, directives: [ɵngcc1.NgForOf, ɵngcc1.NgIf, ɵngcc1.NgClass, ɵngcc2.RouterLinkWithHref, ɵngcc2.RouterLink], pipes: [ɵngcc1.AsyncPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppBreadcrumbComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-breadcrumb',
                template: "\n    <ng-template ngFor let-breadcrumb [ngForOf]=\"breadcrumbs | async\" let-last = last>\n      <li class=\"breadcrumb-item\"\n          *ngIf=\"breadcrumb.label.title && (breadcrumb.url.slice(-1) == '/' || last)\"\n          [ngClass]=\"{active: last}\">\n        <a *ngIf=\"!last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label.title}}</a>\n        <span *ngIf=\"last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label.title}}</span>\n      </li>\n    </ng-template>\n  "
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: core.Inject,
                args: [common.DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }, { type: AppBreadcrumbService }, { type: ɵngcc0.ElementRef }]; }, { fixed: [{
            type: core.Input
        }] }); })();
        return AppBreadcrumbComponent;
    }());

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
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.Renderer2 },
            { type: AppBreadcrumbService }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], CuiBreadcrumbComponent.prototype, "fixed", void 0);
        CuiBreadcrumbComponent = __decorate([ __param(0, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [Object, core.Renderer2,
                AppBreadcrumbService])
        ], CuiBreadcrumbComponent);
CuiBreadcrumbComponent.ɵfac = function CuiBreadcrumbComponent_Factory(t) { return new (t || CuiBreadcrumbComponent)(ɵngcc0.ɵɵdirectiveInject(common.DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(AppBreadcrumbService)); };
CuiBreadcrumbComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: CuiBreadcrumbComponent, selectors: [["cui-breadcrumb"]], inputs: { fixed: "fixed" }, ngContentSelectors: _c0, decls: 4, vars: 3, consts: [[1, "breadcrumb"], ["ngFor", "", 3, "ngForOf"], ["class", "breadcrumb-item", 3, "ngClass", 4, "ngIf"], [1, "breadcrumb-item", 3, "ngClass"], [3, "routerLink", 4, "ngIf"], [3, "routerLink"]], template: function CuiBreadcrumbComponent_Template(rf, ctx) { if (rf & 1) {
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
        type: core.Component,
        args: [{
                // tslint:disable-next-line:component-selector
                selector: 'cui-breadcrumb',
                template: "<ol class=\"breadcrumb\">\r\n  <ng-template ngFor let-breadcrumb [ngForOf]=\"breadcrumbs | async\" let-last = last>\r\n    <li class=\"breadcrumb-item\"\r\n        *ngIf=\"breadcrumb.label.title && (breadcrumb.url.slice(-1) == '/' || last)\"\r\n        [ngClass]=\"{active: last}\">\r\n      <a *ngIf=\"!last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label.title}}</a>\r\n      <span *ngIf=\"last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label.title}}</span>\r\n    </li>\r\n  </ng-template>\r\n  <ng-content></ng-content>\r\n</ol>\r\n"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: core.Inject,
                args: [common.DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }, { type: AppBreadcrumbService }]; }, { fixed: [{
            type: core.Input
        }] }); })();
        return CuiBreadcrumbComponent;
    }());

    // @dynamic
    var AppBreadcrumbModule = /** @class */ (function () {
        function AppBreadcrumbModule() {
        }
        AppBreadcrumbModule_1 = AppBreadcrumbModule;
        AppBreadcrumbModule.forRoot = function (config) {
            return {
                ngModule: AppBreadcrumbModule_1,
                providers: [
                    AppBreadcrumbService
                ]
            };
        };
        var AppBreadcrumbModule_1;
AppBreadcrumbModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: AppBreadcrumbModule });
AppBreadcrumbModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function AppBreadcrumbModule_Factory(t) { return new (t || AppBreadcrumbModule)(); }, imports: [[common.CommonModule, router.RouterModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(AppBreadcrumbModule, { declarations: [AppBreadcrumbComponent,
        CuiBreadcrumbComponent], imports: [ɵngcc1.CommonModule, ɵngcc2.RouterModule], exports: [AppBreadcrumbComponent,
        CuiBreadcrumbComponent] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppBreadcrumbModule, [{
        type: core.NgModule,
        args: [{
                imports: [common.CommonModule, router.RouterModule],
                exports: [AppBreadcrumbComponent, CuiBreadcrumbComponent],
                declarations: [AppBreadcrumbComponent, CuiBreadcrumbComponent]
            }]
    }], function () { return []; }, null); })();
        return AppBreadcrumbModule;
    }());

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
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AppFooterComponent.prototype, "fixed", void 0);
        __decorate([
            core.HostBinding('class.app-footer'),
            __metadata("design:type", Object)
        ], AppFooterComponent.prototype, "appFooterClass", void 0);
        AppFooterComponent = __decorate([ __param(0, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [Object, core.Renderer2])
        ], AppFooterComponent);
AppFooterComponent.ɵfac = function AppFooterComponent_Factory(t) { return new (t || AppFooterComponent)(ɵngcc0.ɵɵdirectiveInject(common.DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
AppFooterComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppFooterComponent, selectors: [["app-footer"], ["cui-footer"]], hostVars: 2, hostBindings: function AppFooterComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("app-footer", ctx.appFooterClass);
    } }, inputs: { fixed: "fixed" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function AppFooterComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppFooterComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-footer, cui-footer',
                template: "<ng-content></ng-content>"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: core.Inject,
                args: [common.DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, { appFooterClass: [{
            type: core.HostBinding,
            args: ['class.app-footer']
        }], fixed: [{
            type: core.Input
        }] }); })();
        return AppFooterComponent;
    }());

    var AppFooterModule = /** @class */ (function () {
        function AppFooterModule() {
        }
AppFooterModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: AppFooterModule });
AppFooterModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function AppFooterModule_Factory(t) { return new (t || AppFooterModule)(); }, imports: [[common.CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(AppFooterModule, { declarations: [AppFooterComponent], imports: [ɵngcc1.CommonModule], exports: [AppFooterComponent] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppFooterModule, [{
        type: core.NgModule,
        args: [{
                imports: [common.CommonModule],
                exports: [AppFooterComponent],
                declarations: [AppFooterComponent]
            }]
    }], function () { return []; }, null); })();
        return AppFooterModule;
    }());

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
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AppHeaderComponent.prototype, "fixed", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AppHeaderComponent.prototype, "navbarBrand", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AppHeaderComponent.prototype, "navbarBrandFull", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AppHeaderComponent.prototype, "navbarBrandMinimized", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AppHeaderComponent.prototype, "navbarBrandText", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AppHeaderComponent.prototype, "navbarBrandHref", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AppHeaderComponent.prototype, "navbarBrandRouterLink", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AppHeaderComponent.prototype, "sidebarToggler", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AppHeaderComponent.prototype, "mobileSidebarToggler", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AppHeaderComponent.prototype, "asideMenuToggler", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AppHeaderComponent.prototype, "mobileAsideMenuToggler", void 0);
        __decorate([
            core.HostBinding('class.app-header'),
            __metadata("design:type", Object)
        ], AppHeaderComponent.prototype, "appHeaderClass", void 0);
        __decorate([
            core.HostBinding('class.navbar'),
            __metadata("design:type", Object)
        ], AppHeaderComponent.prototype, "navbarClass", void 0);
        AppHeaderComponent = __decorate([ __param(0, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [Object, core.Renderer2])
        ], AppHeaderComponent);
AppHeaderComponent.ɵfac = function AppHeaderComponent_Factory(t) { return new (t || AppHeaderComponent)(ɵngcc0.ɵɵdirectiveInject(common.DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
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
    } }, directives: [ɵngcc1.NgIf, ɵngcc2.RouterLinkWithHref, SidebarToggleDirective,
        HtmlAttributesDirective, ɵngcc1.NgClass, AsideToggleDirective], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppHeaderComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-header, cui-header',
                template: "<ng-template [ngIf]=\"mobileSidebarToggler != false\">\r\n  <button class=\"navbar-toggler {{sidebarTogglerMobileClass}}\" type=\"button\" appSidebarToggler>\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n</ng-template>\r\n<a class=\"navbar-brand\" [routerLink]=\"navbarBrandRouterLink\">\r\n  <ng-template [ngIf]=\"navbarBrandImg\">\r\n    <img *ngIf=\"navbarBrand\"\r\n         [appHtmlAttr]=\"navbarBrand\"\r\n         [ngClass]=\"'navbar-brand'\">\r\n    <img *ngIf=\"navbarBrandFull\"\r\n         [appHtmlAttr]=\"navbarBrandFull\"\r\n         [ngClass]=\"'navbar-brand-full'\">\r\n    <img *ngIf=\"navbarBrandMinimized\"\r\n         [appHtmlAttr]=\"navbarBrandMinimized\"\r\n         [ngClass]=\"'navbar-brand-minimized'\">\r\n  </ng-template>\r\n  <ng-template [ngIf]=\"!navbarBrandImg\">\r\n    <div class=\"navbar-brand-full\" [innerHTML]=\"navbarBrandText.text\"></div>\r\n    <div class=\"navbar-brand-minimized\" [innerHTML]=\"navbarBrandText.icon\"></div>\r\n  </ng-template>\r\n</a>\r\n<ng-template [ngIf]=\"sidebarToggler != false\">\r\n  <button class=\"navbar-toggler {{sidebarTogglerClass}}\" type=\"button\" [appSidebarToggler]=\"sidebarToggler\">\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n</ng-template>\r\n<ng-content></ng-content>\r\n<ng-template [ngIf]=\"asideMenuToggler != false\">\r\n  <button class=\"navbar-toggler {{asideTogglerClass}}\" type=\"button\" [appAsideMenuToggler]=\"asideMenuToggler\">\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n</ng-template>\r\n<ng-template [ngIf]=\"mobileAsideMenuToggler != false\">\r\n  <button class=\"navbar-toggler {{asideTogglerMobileClass}}\" type=\"button\" appAsideMenuToggler>\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n</ng-template>\r\n"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: core.Inject,
                args: [common.DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, { navbarBrandText: [{
            type: core.Input
        }], navbarBrandRouterLink: [{
            type: core.Input
        }], appHeaderClass: [{
            type: core.HostBinding,
            args: ['class.app-header']
        }], navbarClass: [{
            type: core.HostBinding,
            args: ['class.navbar']
        }], fixed: [{
            type: core.Input
        }], navbarBrand: [{
            type: core.Input
        }], navbarBrandFull: [{
            type: core.Input
        }], navbarBrandMinimized: [{
            type: core.Input
        }], navbarBrandHref: [{
            type: core.Input
        }], sidebarToggler: [{
            type: core.Input
        }], mobileSidebarToggler: [{
            type: core.Input
        }], asideMenuToggler: [{
            type: core.Input
        }], mobileAsideMenuToggler: [{
            type: core.Input
        }] }); })();
        return AppHeaderComponent;
    }());

    var AppHeaderModule = /** @class */ (function () {
        function AppHeaderModule() {
        }
AppHeaderModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: AppHeaderModule });
AppHeaderModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function AppHeaderModule_Factory(t) { return new (t || AppHeaderModule)(); }, imports: [[
            common.CommonModule,
            router.RouterModule,
            LayoutModule
        ],
        LayoutModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(AppHeaderModule, { declarations: [AppHeaderComponent], imports: [ɵngcc1.CommonModule, ɵngcc2.RouterModule, LayoutModule], exports: [AppHeaderComponent,
        LayoutModule] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppHeaderModule, [{
        type: core.NgModule,
        args: [{
                imports: [
                    common.CommonModule,
                    router.RouterModule,
                    LayoutModule
                ],
                exports: [
                    AppHeaderComponent,
                    LayoutModule
                ],
                declarations: [
                    AppHeaderComponent
                ]
            }]
    }], function () { return []; }, null); })();
        return AppHeaderModule;
    }());

    var AppSidebarService = /** @class */ (function () {
        function AppSidebarService() {
            this.events = new rxjs.BehaviorSubject({});
            this.events$ = this.events.asObservable();
        }
        AppSidebarService.prototype.toggle = function (action) {
            this.events.next(action);
        };
        AppSidebarService.ɵprov = core["ɵɵdefineInjectable"]({ factory: function AppSidebarService_Factory() { return new AppSidebarService(); }, token: AppSidebarService, providedIn: "root" });
        AppSidebarService = __decorate([ __metadata("design:paramtypes", [])
        ], AppSidebarService);
AppSidebarService.ɵfac = function AppSidebarService_Factory(t) { return new (t || AppSidebarService)(); };
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarService, [{
        type: core.Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
        return AppSidebarService;
    }());

    var AppSidebarComponent = /** @class */ (function () {
        function AppSidebarComponent(document, renderer, sidebarService) {
            this.document = document;
            this.renderer = renderer;
            this.sidebarService = sidebarService;
            this._minimized = false;
            /**
             * Emits whenever the minimized state of the sidebar changes.
             * Primarily used to facilitate two-way binding.
             */
            this.minimizedChange = new core.EventEmitter();
            this.sidebarClass = true;
        }
        Object.defineProperty(AppSidebarComponent.prototype, "minimized", {
            get: function () {
                return this._minimized;
            },
            set: function (value) {
                // only update / emit events when the value changes
                if (this._minimized !== value) {
                    this._minimized = value;
                    this._updateMinimized(value);
                    this.minimizedChange.emit(value);
                    this.sidebarService.toggle({ minimize: value });
                }
            },
            enumerable: true,
            configurable: true
        });
        AppSidebarComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.displayBreakpoint(this.display);
            this.isCompact(this.compact);
            this.isFixed(this.fixed);
            this.isOffCanvas(this.offCanvas);
            this.sidebarService.toggle({ minimize: this.minimized });
            this.subscriptionEvents = this.sidebarService.events$.subscribe(function (action) {
                if (action.minimize !== undefined) {
                    action.minimize === 'toggle' ? _this.toggleMinimized() : _this.minimized = !!action.minimize;
                }
            });
        };
        AppSidebarComponent.prototype.ngOnDestroy = function () {
            this.subscriptionEvents.unsubscribe();
            this.minimizedChange.complete();
            this.renderer.removeClass(this.document.body, 'sidebar-fixed');
            this._updateMinimized(false);
        };
        AppSidebarComponent.prototype.isCompact = function (compact) {
            if (compact === void 0) { compact = this.compact; }
            if (compact) {
                this.renderer.addClass(this.document.body, 'sidebar-compact');
            }
        };
        AppSidebarComponent.prototype.isFixed = function (fixed) {
            if (fixed === void 0) { fixed = this.fixed; }
            if (fixed) {
                this.renderer.addClass(this.document.body, 'sidebar-fixed');
            }
        };
        AppSidebarComponent.prototype.toggleMinimized = function () {
            this.minimized = !this._minimized;
        };
        AppSidebarComponent.prototype.isOffCanvas = function (offCanvas) {
            if (offCanvas === void 0) { offCanvas = this.offCanvas; }
            if (offCanvas) {
                this.renderer.addClass(this.document.body, 'sidebar-off-canvas');
            }
        };
        AppSidebarComponent.prototype.displayBreakpoint = function (display) {
            if (display === void 0) { display = this.display; }
            if (display !== false) {
                var cssClass = display ? "sidebar-" + display + "-show" : sidebarCssClasses[0];
                this.renderer.addClass(this.document.body, cssClass);
            }
        };
        AppSidebarComponent.prototype._updateMinimized = function (minimized) {
            var body = this.document.body;
            if (minimized) {
                this.renderer.addClass(body, 'sidebar-minimized');
                this.renderer.addClass(body, 'brand-minimized');
            }
            else {
                this.renderer.removeClass(body, 'sidebar-minimized');
                this.renderer.removeClass(body, 'brand-minimized');
            }
        };
        AppSidebarComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.Renderer2 },
            { type: AppSidebarService }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AppSidebarComponent.prototype, "compact", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AppSidebarComponent.prototype, "display", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AppSidebarComponent.prototype, "fixed", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AppSidebarComponent.prototype, "offCanvas", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Boolean])
        ], AppSidebarComponent.prototype, "minimized", null);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AppSidebarComponent.prototype, "minimizedChange", void 0);
        __decorate([
            core.HostBinding('class.sidebar'),
            __metadata("design:type", Object)
        ], AppSidebarComponent.prototype, "sidebarClass", void 0);
        AppSidebarComponent = __decorate([ __param(0, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [Object, core.Renderer2,
                AppSidebarService])
        ], AppSidebarComponent);
AppSidebarComponent.ɵfac = function AppSidebarComponent_Factory(t) { return new (t || AppSidebarComponent)(ɵngcc0.ɵɵdirectiveInject(common.DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(AppSidebarService)); };
AppSidebarComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarComponent, selectors: [["app-sidebar"], ["cui-sidebar"]], hostVars: 2, hostBindings: function AppSidebarComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("sidebar", ctx.sidebarClass);
    } }, inputs: { minimized: "minimized", compact: "compact", display: "display", fixed: "fixed", offCanvas: "offCanvas" }, outputs: { minimizedChange: "minimizedChange" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function AppSidebarComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-sidebar, cui-sidebar',
                template: "<ng-content></ng-content>"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: core.Inject,
                args: [common.DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }, { type: AppSidebarService }]; }, { minimizedChange: [{
            type: core.Output
        }], sidebarClass: [{
            type: core.HostBinding,
            args: ['class.sidebar']
        }], minimized: [{
            type: core.Input
        }], compact: [{
            type: core.Input
        }], display: [{
            type: core.Input
        }], fixed: [{
            type: core.Input
        }], offCanvas: [{
            type: core.Input
        }] }); })();
        return AppSidebarComponent;
    }());

    var SidebarNavService = /** @class */ (function () {
        function SidebarNavService() {
        }
SidebarNavService.ɵfac = function SidebarNavService_Factory(t) { return new (t || SidebarNavService)(); };
SidebarNavService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: SidebarNavService, factory: function (t) { return SidebarNavService.ɵfac(t); } });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SidebarNavService, [{
        type: core.Injectable
    }], function () { return []; }, null); })();
        return SidebarNavService;
    }());
    var SidebarNavHelper = /** @class */ (function () {
        function SidebarNavHelper() {
            this.hasBadge = function (item) { return Boolean(item.badge); };
            this.hasIcon = function (item) { return Boolean(item.icon); };
        }
        SidebarNavHelper.prototype.itemType = function (item) {
            if (item.divider) {
                return 'divider';
            }
            else if (item.title) {
                return 'title';
            }
            else if (item.children) {
                return 'dropdown';
            }
            else if (item.label) {
                return 'label';
            }
            else if (!Object.keys(item).length) {
                return 'empty';
            }
            else {
                return 'link';
            }
        };
        SidebarNavHelper.prototype.isActive = function (router, item) {
            return router.isActive(item.url, false);
        };
        SidebarNavHelper.prototype.getIconClass = function (item) {
            var classes = {
                'nav-icon': true
            };
            var icon = item.icon;
            classes[icon] = this.hasIcon(item);
            return classes;
        };
SidebarNavHelper.ɵfac = function SidebarNavHelper_Factory(t) { return new (t || SidebarNavHelper)(); };
SidebarNavHelper.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: SidebarNavHelper, factory: function (t) { return SidebarNavHelper.ɵfac(t); } });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SidebarNavHelper, [{
        type: core.Injectable
    }], function () { return []; }, null); })();
        return SidebarNavHelper;
    }());

    var AppSidebarFooterComponent = /** @class */ (function () {
        function AppSidebarFooterComponent() {
            this.sidebarFooterClass = true;
        }
        __decorate([
            core.HostBinding('class.sidebar-footer'),
            __metadata("design:type", Object)
        ], AppSidebarFooterComponent.prototype, "sidebarFooterClass", void 0);
        AppSidebarFooterComponent = __decorate([ __metadata("design:paramtypes", [])
        ], AppSidebarFooterComponent);
AppSidebarFooterComponent.ɵfac = function AppSidebarFooterComponent_Factory(t) { return new (t || AppSidebarFooterComponent)(); };
AppSidebarFooterComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarFooterComponent, selectors: [["app-sidebar-footer"], ["cui-sidebar-footer"]], hostVars: 2, hostBindings: function AppSidebarFooterComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("sidebar-footer", ctx.sidebarFooterClass);
    } }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function AppSidebarFooterComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarFooterComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-sidebar-footer, cui-sidebar-footer',
                template: "<ng-content></ng-content>"
            }]
    }], function () { return []; }, { sidebarFooterClass: [{
            type: core.HostBinding,
            args: ['class.sidebar-footer']
        }] }); })();
        return AppSidebarFooterComponent;
    }());

    var AppSidebarFormComponent = /** @class */ (function () {
        function AppSidebarFormComponent() {
            this.sidebarFormClass = true;
        }
        __decorate([
            core.HostBinding('class.sidebar-form'),
            __metadata("design:type", Object)
        ], AppSidebarFormComponent.prototype, "sidebarFormClass", void 0);
        AppSidebarFormComponent = __decorate([ __metadata("design:paramtypes", [])
        ], AppSidebarFormComponent);
AppSidebarFormComponent.ɵfac = function AppSidebarFormComponent_Factory(t) { return new (t || AppSidebarFormComponent)(); };
AppSidebarFormComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarFormComponent, selectors: [["app-sidebar-form"], ["cui-sidebar-form"]], hostVars: 2, hostBindings: function AppSidebarFormComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("sidebar-form", ctx.sidebarFormClass);
    } }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function AppSidebarFormComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarFormComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-sidebar-form, cui-sidebar-form',
                template: "<ng-content></ng-content>"
            }]
    }], function () { return []; }, { sidebarFormClass: [{
            type: core.HostBinding,
            args: ['class.sidebar-form']
        }] }); })();
        return AppSidebarFormComponent;
    }());

    var AppSidebarHeaderComponent = /** @class */ (function () {
        function AppSidebarHeaderComponent() {
            this.sidebarHeaderClass = true;
        }
        __decorate([
            core.HostBinding('class.sidebar-header'),
            __metadata("design:type", Object)
        ], AppSidebarHeaderComponent.prototype, "sidebarHeaderClass", void 0);
        AppSidebarHeaderComponent = __decorate([ __metadata("design:paramtypes", [])
        ], AppSidebarHeaderComponent);
AppSidebarHeaderComponent.ɵfac = function AppSidebarHeaderComponent_Factory(t) { return new (t || AppSidebarHeaderComponent)(); };
AppSidebarHeaderComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarHeaderComponent, selectors: [["app-sidebar-header"], ["cui-sidebar-header"]], hostVars: 2, hostBindings: function AppSidebarHeaderComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("sidebar-header", ctx.sidebarHeaderClass);
    } }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function AppSidebarHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarHeaderComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-sidebar-header, cui-sidebar-header',
                template: "<ng-content></ng-content>"
            }]
    }], function () { return []; }, { sidebarHeaderClass: [{
            type: core.HostBinding,
            args: ['class.sidebar-header']
        }] }); })();
        return AppSidebarHeaderComponent;
    }());

    var AppSidebarMinimizerComponent = /** @class */ (function () {
        function AppSidebarMinimizerComponent(sidebarService) {
            this.sidebarService = sidebarService;
            this.role = 'button';
            this.sidebarMinimizerClass = true;
        }
        AppSidebarMinimizerComponent.prototype.toggleOpen = function ($event) {
            $event.preventDefault();
            this.sidebarService.toggle({ minimize: 'toggle' });
        };
        AppSidebarMinimizerComponent.ctorParameters = function () { return [
            { type: AppSidebarService }
        ]; };
        __decorate([
            core.HostBinding('attr.role'), core.Input(),
            __metadata("design:type", Object)
        ], AppSidebarMinimizerComponent.prototype, "role", void 0);
        __decorate([
            core.HostBinding('class.sidebar-minimizer'),
            __metadata("design:type", Object)
        ], AppSidebarMinimizerComponent.prototype, "sidebarMinimizerClass", void 0);
        __decorate([
            core.HostListener('click', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], AppSidebarMinimizerComponent.prototype, "toggleOpen", null);
        AppSidebarMinimizerComponent = __decorate([ __metadata("design:paramtypes", [AppSidebarService])
        ], AppSidebarMinimizerComponent);
AppSidebarMinimizerComponent.ɵfac = function AppSidebarMinimizerComponent_Factory(t) { return new (t || AppSidebarMinimizerComponent)(ɵngcc0.ɵɵdirectiveInject(AppSidebarService)); };
AppSidebarMinimizerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarMinimizerComponent, selectors: [["app-sidebar-minimizer"], ["cui-sidebar-minimizer"]], hostVars: 3, hostBindings: function AppSidebarMinimizerComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function AppSidebarMinimizerComponent_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } if (rf & 2) {
        ɵngcc0.ɵɵattribute("role", ctx.role);
        ɵngcc0.ɵɵclassProp("sidebar-minimizer", ctx.sidebarMinimizerClass);
    } }, inputs: { role: "role" }, decls: 0, vars: 0, template: function AppSidebarMinimizerComponent_Template(rf, ctx) { }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarMinimizerComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-sidebar-minimizer, cui-sidebar-minimizer',
                template: ""
            }]
    }], function () { return [{ type: AppSidebarService }]; }, { role: [{
            type: core.HostBinding,
            args: ['attr.role']
        }, {
            type: core.Input
        }], sidebarMinimizerClass: [{
            type: core.HostBinding,
            args: ['class.sidebar-minimizer']
        }], toggleOpen: [{
            type: core.HostListener,
            args: ['click', ['$event']]
        }] }); })();
        return AppSidebarMinimizerComponent;
    }());

    var NavDropdownDirective = /** @class */ (function () {
        function NavDropdownDirective(el) {
            this.el = el;
        }
        NavDropdownDirective.prototype.toggle = function () {
            this.el.nativeElement.classList.toggle('open');
        };
        NavDropdownDirective.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        NavDropdownDirective = __decorate([ __metadata("design:paramtypes", [core.ElementRef])
        ], NavDropdownDirective);
NavDropdownDirective.ɵfac = function NavDropdownDirective_Factory(t) { return new (t || NavDropdownDirective)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
NavDropdownDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: NavDropdownDirective, selectors: [["", "appNavDropdown", ""]] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NavDropdownDirective, [{
        type: core.Directive,
        args: [{
                selector: '[appNavDropdown]'
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }]; }, null); })();
        return NavDropdownDirective;
    }());
    /**
     * Allows the dropdown to be toggled via click.
     */
    var NavDropdownToggleDirective = /** @class */ (function () {
        function NavDropdownToggleDirective(dropdown) {
            this.dropdown = dropdown;
        }
        NavDropdownToggleDirective.prototype.toggleOpen = function ($event) {
            $event.preventDefault();
            this.dropdown.toggle();
        };
        NavDropdownToggleDirective.ctorParameters = function () { return [
            { type: NavDropdownDirective }
        ]; };
        __decorate([
            core.HostListener('click', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], NavDropdownToggleDirective.prototype, "toggleOpen", null);
        NavDropdownToggleDirective = __decorate([ __metadata("design:paramtypes", [NavDropdownDirective])
        ], NavDropdownToggleDirective);
NavDropdownToggleDirective.ɵfac = function NavDropdownToggleDirective_Factory(t) { return new (t || NavDropdownToggleDirective)(ɵngcc0.ɵɵdirectiveInject(NavDropdownDirective)); };
NavDropdownToggleDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: NavDropdownToggleDirective, selectors: [["", "appNavDropdownToggle", ""]], hostBindings: function NavDropdownToggleDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function NavDropdownToggleDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } } });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NavDropdownToggleDirective, [{
        type: core.Directive,
        args: [{
                selector: '[appNavDropdownToggle]'
            }]
    }], function () { return [{ type: NavDropdownDirective }]; }, { toggleOpen: [{
            type: core.HostListener,
            args: ['click', ['$event']]
        }] }); })();
        return NavDropdownToggleDirective;
    }());

    var AppSidebarNavComponent = /** @class */ (function () {
        function AppSidebarNavComponent(router) {
            this.router = router;
            this.navItems = [];
            this.sidebarNavClass = true;
            this.role = 'nav';
            this.navItemsArray = [];
        }
        AppSidebarNavComponent.prototype.ngOnChanges = function (changes) {
            this.navItemsArray = Array.isArray(this.navItems) ? this.navItems.slice() : [];
        };
        AppSidebarNavComponent.ctorParameters = function () { return [
            { type: router.Router }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], AppSidebarNavComponent.prototype, "navItems", void 0);
        __decorate([
            core.HostBinding('class.sidebar-nav'),
            __metadata("design:type", Object)
        ], AppSidebarNavComponent.prototype, "sidebarNavClass", void 0);
        __decorate([
            core.HostBinding('attr.role'), core.Input(),
            __metadata("design:type", Object)
        ], AppSidebarNavComponent.prototype, "role", void 0);
        AppSidebarNavComponent = __decorate([ __metadata("design:paramtypes", [router.Router])
        ], AppSidebarNavComponent);
AppSidebarNavComponent.ɵfac = function AppSidebarNavComponent_Factory(t) { return new (t || AppSidebarNavComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc2.Router)); };
AppSidebarNavComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarNavComponent, selectors: [["app-sidebar-nav"], ["cui-sidebar-nav"]], hostVars: 3, hostBindings: function AppSidebarNavComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵattribute("role", ctx.role);
        ɵngcc0.ɵɵclassProp("sidebar-nav", ctx.sidebarNavClass);
    } }, inputs: { navItems: "navItems", role: "role" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[1, "nav", 3, "items"]], template: function AppSidebarNavComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "app-sidebar-nav-items", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("items", ctx.navItemsArray);
    } }, directives: function () { return [AppSidebarNavItemsComponent]; }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-sidebar-nav, cui-sidebar-nav',
                template: "<app-sidebar-nav-items\n  class=\"nav\"\n  [items]=\"navItemsArray\">\n</app-sidebar-nav-items>\n"
            }]
    }], function () { return [{ type: ɵngcc2.Router }]; }, { navItems: [{
            type: core.Input
        }], sidebarNavClass: [{
            type: core.HostBinding,
            args: ['class.sidebar-nav']
        }], role: [{
            type: core.HostBinding,
            args: ['attr.role']
        }, {
            type: core.Input
        }] }); })();
        return AppSidebarNavComponent;
    }());

    var AppSidebarNavDividerComponent = /** @class */ (function () {
        function AppSidebarNavDividerComponent() {
        }
        AppSidebarNavDividerComponent.prototype.ngOnInit = function () { };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AppSidebarNavDividerComponent.prototype, "item", void 0);
        AppSidebarNavDividerComponent = __decorate([ __metadata("design:paramtypes", [])
        ], AppSidebarNavDividerComponent);
AppSidebarNavDividerComponent.ɵfac = function AppSidebarNavDividerComponent_Factory(t) { return new (t || AppSidebarNavDividerComponent)(); };
AppSidebarNavDividerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarNavDividerComponent, selectors: [["app-sidebar-nav-divider"], ["cui-sidebar-nav-divider"]], inputs: { item: "item" }, decls: 0, vars: 0, template: function AppSidebarNavDividerComponent_Template(rf, ctx) { }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavDividerComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-sidebar-nav-divider, cui-sidebar-nav-divider',
                template: ""
            }]
    }], function () { return []; }, { item: [{
            type: core.Input
        }] }); })();
        return AppSidebarNavDividerComponent;
    }());

    var AppSidebarNavDropdownComponent = /** @class */ (function () {
        function AppSidebarNavDropdownComponent(helper) {
            this.helper = helper;
        }
        AppSidebarNavDropdownComponent.ctorParameters = function () { return [
            { type: SidebarNavHelper }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AppSidebarNavDropdownComponent.prototype, "item", void 0);
        AppSidebarNavDropdownComponent = __decorate([ __metadata("design:paramtypes", [SidebarNavHelper])
        ], AppSidebarNavDropdownComponent);
AppSidebarNavDropdownComponent.ɵfac = function AppSidebarNavDropdownComponent_Factory(t) { return new (t || AppSidebarNavDropdownComponent)(ɵngcc0.ɵɵdirectiveInject(SidebarNavHelper)); };
AppSidebarNavDropdownComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarNavDropdownComponent, selectors: [["app-sidebar-nav-dropdown"], ["cui-sidebar-nav-dropdown"]], inputs: { item: "item" }, features: [ɵngcc0.ɵɵProvidersFeature([SidebarNavHelper])], decls: 6, vars: 5, consts: [["appNavDropdownToggle", "", 1, "nav-link", "nav-dropdown-toggle", 3, "appHtmlAttr"], [3, "ngClass", 4, "ngIf"], [1, "nav-dropdown-items", 3, "items"], [3, "ngClass"]], template: function AppSidebarNavDropdownComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "a", 0);
        ɵngcc0.ɵɵtemplate(1, AppSidebarNavDropdownComponent_i_1_Template, 2, 3, "i", 1);
        ɵngcc0.ɵɵelementContainerStart(2);
        ɵngcc0.ɵɵtext(3);
        ɵngcc0.ɵɵelementContainerEnd();
        ɵngcc0.ɵɵtemplate(4, AppSidebarNavDropdownComponent_span_4_Template, 3, 4, "span", 1);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelement(5, "app-sidebar-nav-items", 2);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("appHtmlAttr", ctx.item.attributes);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.helper.hasIcon(ctx.item));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵtextInterpolate(ctx.item.name);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.helper.hasBadge(ctx.item));
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("items", ctx.item.children);
    } }, directives: function () { return [NavDropdownToggleDirective,
        HtmlAttributesDirective, ɵngcc1.NgIf, AppSidebarNavItemsComponent, ɵngcc1.NgClass]; }, pipes: function () { return [AppSidebarNavIconPipe,
        AppSidebarNavBadgePipe]; }, styles: [".nav-dropdown-toggle[_ngcontent-%COMP%] { cursor: pointer; }", ".nav-dropdown-items[_ngcontent-%COMP%] { display: block; }"] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavDropdownComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-sidebar-nav-dropdown, cui-sidebar-nav-dropdown',
                template: "\n    <a class=\"nav-link nav-dropdown-toggle\"\n       appNavDropdownToggle\n       [appHtmlAttr]=\"item.attributes\">\n      <i *ngIf=\"helper.hasIcon(item)\" [ngClass]=\"item | appSidebarNavIcon\"></i>\n      <ng-container>{{item.name}}</ng-container>\n      <span *ngIf=\"helper.hasBadge(item)\" [ngClass]=\"item | appSidebarNavBadge\">{{ item.badge.text }}</span>\n    </a>\n    <app-sidebar-nav-items\n      class=\"nav-dropdown-items\"\n      [items]=\"item.children\">\n    </app-sidebar-nav-items>\n  ",
                providers: [SidebarNavHelper],
                styles: ['.nav-dropdown-toggle { cursor: pointer; }',
                    '.nav-dropdown-items { display: block; }']
            }]
    }], function () { return [{ type: SidebarNavHelper }]; }, { item: [{
            type: core.Input
        }] }); })();
        return AppSidebarNavDropdownComponent;
    }());

    var AppSidebarNavItemsComponent = /** @class */ (function () {
        function AppSidebarNavItemsComponent(document, renderer, router, helper) {
            this.document = document;
            this.renderer = renderer;
            this.router = router;
            this.helper = helper;
        }
        Object.defineProperty(AppSidebarNavItemsComponent.prototype, "items", {
            get: function () {
                return this._items;
            },
            set: function (items) {
                this._items = __spread(items);
            },
            enumerable: true,
            configurable: true
        });
        AppSidebarNavItemsComponent.prototype.hideMobile = function () {
            if (this.document.body.classList.contains('sidebar-show')) {
                this.renderer.removeClass(this.document.body, 'sidebar-show');
            }
        };
        AppSidebarNavItemsComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.Renderer2 },
            { type: router.Router },
            { type: SidebarNavHelper }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Array),
            __metadata("design:paramtypes", [Array])
        ], AppSidebarNavItemsComponent.prototype, "items", null);
        AppSidebarNavItemsComponent = __decorate([ __param(0, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [Object, core.Renderer2,
                router.Router,
                SidebarNavHelper])
        ], AppSidebarNavItemsComponent);
AppSidebarNavItemsComponent.ɵfac = function AppSidebarNavItemsComponent_Factory(t) { return new (t || AppSidebarNavItemsComponent)(ɵngcc0.ɵɵdirectiveInject(common.DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc2.Router), ɵngcc0.ɵɵdirectiveInject(SidebarNavHelper)); };
AppSidebarNavItemsComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarNavItemsComponent, selectors: [["app-sidebar-nav-items"], ["cui-sidebar-nav-items"]], inputs: { items: "items" }, decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], [3, "ngSwitch"], ["appNavDropdown", "", "routerLinkActive", "open", 3, "item", "open", "ngClass", 4, "ngSwitchCase"], [3, "item", "ngClass", "appHtmlAttr", 4, "ngSwitchCase"], ["class", "nav-item", 3, "item", "ngClass", 4, "ngSwitchCase"], [4, "ngSwitchCase"], ["class", "nav-item", 3, "item", "ngClass", "linkClick", 4, "ngSwitchDefault"], ["appNavDropdown", "", "routerLinkActive", "open", 3, "item", "ngClass"], [3, "item", "ngClass", "appHtmlAttr"], [1, "nav-item", 3, "item", "ngClass"], [1, "nav-item", 3, "item", "ngClass", "linkClick"]], template: function AppSidebarNavItemsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, AppSidebarNavItemsComponent_ng_container_0_Template, 8, 6, "ng-container", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngForOf", ctx.items);
    } }, directives: function () { return [ɵngcc1.NgForOf, ɵngcc1.NgSwitch, ɵngcc1.NgSwitchCase, ɵngcc1.NgSwitchDefault, AppSidebarNavDropdownComponent,
        NavDropdownDirective, ɵngcc2.RouterLinkActive, ɵngcc1.NgClass, AppSidebarNavDividerComponent,
        HtmlAttributesDirective,
        AppSidebarNavTitleComponent,
        AppSidebarNavLabelComponent,
        AppSidebarNavLinkComponent]; }, pipes: function () { return [AppSidebarNavItemClassPipe]; }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavItemsComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-sidebar-nav-items, cui-sidebar-nav-items',
                template: "\n    <ng-container *ngFor=\"let item of items\">\n      <ng-container [ngSwitch]=\"helper.itemType(item)\">\n        <app-sidebar-nav-dropdown\n          *ngSwitchCase=\"'dropdown'\"\n          [item]=\"item\"\n          [class.open]=\"helper.isActive(router, item)\"\n          [ngClass]=\"item | appSidebarNavItemClass\"\n          appNavDropdown\n          routerLinkActive=\"open\">\n        </app-sidebar-nav-dropdown>\n        <app-sidebar-nav-divider\n          *ngSwitchCase=\"'divider'\"\n          [item]=\"item\"\n          [ngClass]=\"item | appSidebarNavItemClass\"\n          [appHtmlAttr]=\"item.attributes\">\n        </app-sidebar-nav-divider>\n        <app-sidebar-nav-title\n          *ngSwitchCase=\"'title'\"\n          [item]=\"item\"\n          [ngClass]=\"item | appSidebarNavItemClass\"\n          [appHtmlAttr]=\"item.attributes\">\n        </app-sidebar-nav-title>\n        <app-sidebar-nav-label\n          *ngSwitchCase=\"'label'\"\n          [item]=\"item\"\n          class=\"nav-item\"\n          [ngClass]=\"item | appSidebarNavItemClass\">\n        </app-sidebar-nav-label>\n        <ng-container\n          *ngSwitchCase=\"'empty'\">\n        </ng-container>\n        <app-sidebar-nav-link\n          *ngSwitchDefault\n          [item]=\"item\"\n          class=\"nav-item\"\n          [ngClass]=\"item | appSidebarNavItemClass\"\n          (linkClick)=\"hideMobile()\"\n        >\n        </app-sidebar-nav-link>\n      </ng-container>\n    </ng-container>\n  "
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: core.Inject,
                args: [common.DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc2.Router }, { type: SidebarNavHelper }]; }, { items: [{
            type: core.Input
        }] }); })();
        return AppSidebarNavItemsComponent;
    }());

    var AppSidebarNavLinkContentComponent = /** @class */ (function () {
        function AppSidebarNavLinkContentComponent(helper) {
            this.helper = helper;
        }
        AppSidebarNavLinkContentComponent.prototype.ngOnInit = function () { };
        AppSidebarNavLinkContentComponent.prototype.ngOnDestroy = function () { };
        AppSidebarNavLinkContentComponent.ctorParameters = function () { return [
            { type: SidebarNavHelper }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AppSidebarNavLinkContentComponent.prototype, "item", void 0);
        AppSidebarNavLinkContentComponent = __decorate([ __metadata("design:paramtypes", [SidebarNavHelper])
        ], AppSidebarNavLinkContentComponent);
AppSidebarNavLinkContentComponent.ɵfac = function AppSidebarNavLinkContentComponent_Factory(t) { return new (t || AppSidebarNavLinkContentComponent)(ɵngcc0.ɵɵdirectiveInject(SidebarNavHelper)); };
AppSidebarNavLinkContentComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarNavLinkContentComponent, selectors: [["app-sidebar-nav-link-content"], ["cui-sidebar-nav-link-content"]], inputs: { item: "item" }, features: [ɵngcc0.ɵɵProvidersFeature([SidebarNavHelper])], decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "ngClass", 4, "ngIf"], [3, "ngClass"]], template: function AppSidebarNavLinkContentComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, AppSidebarNavLinkContentComponent_ng_container_0_Template, 5, 3, "ng-container", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", true);
    } }, directives: function () { return [ɵngcc1.NgIf, ɵngcc1.NgClass]; }, pipes: function () { return [AppSidebarNavIconPipe,
        AppSidebarNavBadgePipe]; }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavLinkContentComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-sidebar-nav-link-content, cui-sidebar-nav-link-content',
                template: "\n    <ng-container *ngIf=\"true\">\n      <i *ngIf=\"helper.hasIcon(item)\" [ngClass]=\"item | appSidebarNavIcon\"></i>\n      <ng-container>{{item.name}}</ng-container>\n      <span *ngIf=\"helper.hasBadge(item)\" [ngClass]=\"item | appSidebarNavBadge\">{{ item.badge.text }}</span>\n    </ng-container>\n  ",
                providers: [SidebarNavHelper]
            }]
    }], function () { return [{ type: SidebarNavHelper }]; }, { item: [{
            type: core.Input
        }] }); })();
        return AppSidebarNavLinkContentComponent;
    }());
    var AppSidebarNavLinkComponent = /** @class */ (function () {
        function AppSidebarNavLinkComponent(router$1) {
            this.router = router$1;
            this.linkClick = new core.EventEmitter();
            this.navigationEndObservable = router$1.events.pipe(operators.filter(function (event) {
                return event instanceof router.NavigationEnd;
            }));
        }
        Object.defineProperty(AppSidebarNavLinkComponent.prototype, "item", {
            get: function () {
                return this._Item;
            },
            set: function (item) {
                this._Item = JSON.parse(JSON.stringify(item));
            },
            enumerable: true,
            configurable: true
        });
        AppSidebarNavLinkComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.url = typeof this.item.url === 'string' ? this.item.url : this.router.serializeUrl(this.router.createUrlTree(this.item.url));
            this.linkType = this.getLinkType();
            this.href = this.isDisabled() ? '' : (this.item.href || this.url);
            this.linkActive = this.router.url.split(/[?#(;]/)[0] === this.href.split(/[?#(;]/)[0];
            this.navSubscription = this.navigationEndObservable.subscribe(function (event) {
                var itemUrlArray = _this.href.split(/[?#(;]/)[0].split('/');
                var urlArray = event.urlAfterRedirects.split(/[?#(;]/)[0].split('/');
                _this.linkActive = itemUrlArray.every(function (value, index) { return value === urlArray[index]; });
            });
        };
        AppSidebarNavLinkComponent.prototype.ngOnDestroy = function () {
            this.navSubscription.unsubscribe();
        };
        AppSidebarNavLinkComponent.prototype.getLinkType = function () {
            return this.isDisabled() ? 'disabled' : this.isExternalLink() ? 'external' : 'link';
        };
        AppSidebarNavLinkComponent.prototype.isDisabled = function () {
            return (this.item.attributes && this.item.attributes.disabled) ? true : null;
        };
        AppSidebarNavLinkComponent.prototype.isExternalLink = function () {
            return !!this.item.href || this.url.substring(0, 4) === 'http';
        };
        AppSidebarNavLinkComponent.prototype.linkClicked = function () {
            this.linkClick.emit();
        };
        AppSidebarNavLinkComponent.ctorParameters = function () { return [
            { type: router.Router }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], AppSidebarNavLinkComponent.prototype, "item", null);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AppSidebarNavLinkComponent.prototype, "linkClick", void 0);
        AppSidebarNavLinkComponent = __decorate([ __metadata("design:paramtypes", [router.Router])
        ], AppSidebarNavLinkComponent);
AppSidebarNavLinkComponent.ɵfac = function AppSidebarNavLinkComponent_Factory(t) { return new (t || AppSidebarNavLinkComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc2.Router)); };
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
    } }, directives: function () { return [ɵngcc1.NgSwitch, ɵngcc1.NgSwitchCase, ɵngcc1.NgSwitchDefault, ɵngcc1.NgClass, HtmlAttributesDirective,
        AppSidebarNavLinkContentComponent, ɵngcc2.RouterLinkWithHref]; }, pipes: function () { return [AppSidebarNavLinkPipe]; }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavLinkComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-sidebar-nav-link, cui-sidebar-nav-link',
                template: "<ng-container [ngSwitch]=\"linkType\">\r\n  <a *ngSwitchCase=\"'disabled'\"\r\n     [ngClass]=\"item | appSidebarNavLink\"\r\n     [appHtmlAttr]=\"item.attributes\"\r\n  >\r\n    <app-sidebar-nav-link-content [item]=\"item\"></app-sidebar-nav-link-content>\r\n  </a>\r\n  <a *ngSwitchCase=\"'external'\"\r\n     [ngClass]=\"item | appSidebarNavLink\"\r\n     [href]=\"href\"\r\n     [appHtmlAttr]=\"item.attributes\"\r\n     (click)=\"linkClicked()\"\r\n  >\r\n    <app-sidebar-nav-link-content [item]=\"item\"></app-sidebar-nav-link-content>\r\n  </a>\r\n  <a *ngSwitchDefault\r\n     [ngClass]=\"item | appSidebarNavLink\"\r\n     [appHtmlAttr]=\"item.attributes\"\r\n     [target]=\"item.attributes?.target\"\r\n     [queryParams]=\"item.linkProps?.queryParams\"\r\n     [fragment]=\"item.linkProps?.fragment\"\r\n     [queryParamsHandling]=\"item.linkProps?.queryParamsHandling\"\r\n     [preserveFragment]=\"item.linkProps?.preserveFragment\"\r\n     [skipLocationChange]=\"item.linkProps?.skipLocationChange\"\r\n     [replaceUrl]=\"item.linkProps?.replaceUrl\"\r\n     [state]=\"item.linkProps?.state\"\r\n     [routerLink]=\"item.url\"\r\n     [class.active]=\"linkActive\"\r\n     (click)=\"linkClicked()\"\r\n  >\r\n    <app-sidebar-nav-link-content [item]=\"item\"></app-sidebar-nav-link-content>\r\n  </a>\r\n</ng-container>\r\n",
                providers: [SidebarNavHelper]
            }]
    }], function () { return [{ type: ɵngcc2.Router }]; }, { linkClick: [{
            type: core.Output
        }], item: [{
            type: core.Input
        }] }); })();
        return AppSidebarNavLinkComponent;
    }());

    var AppSidebarNavTitleComponent = /** @class */ (function () {
        function AppSidebarNavTitleComponent(el, renderer) {
            this.el = el;
            this.renderer = renderer;
        }
        AppSidebarNavTitleComponent.prototype.ngOnInit = function () {
            var nativeElement = this.el.nativeElement;
            var name = this.renderer.createText(this.item.name);
            if (this.item.class) {
                var classes = this.item.class;
                this.renderer.addClass(nativeElement, classes);
            }
            if (this.item.wrapper) {
                var wrapper = this.renderer.createElement(this.item.wrapper.element);
                this.addAttribs(this.item.wrapper.attributes, wrapper);
                this.renderer.appendChild(wrapper, name);
                this.renderer.appendChild(nativeElement, wrapper);
            }
            else {
                this.renderer.appendChild(nativeElement, name);
            }
        };
        AppSidebarNavTitleComponent.prototype.addAttribs = function (attribs, element) {
            if (attribs) {
                for (var attr in attribs) {
                    if (attr === 'style' && typeof (attribs[attr]) === 'object') {
                        this.setStyle(attribs[attr], element);
                    }
                    else if (attr === 'class') {
                        this.addClass(attribs[attr], element);
                    }
                    else {
                        this.setAttrib(attr, attribs[attr], element);
                    }
                }
            }
        };
        AppSidebarNavTitleComponent.prototype.setStyle = function (styles, el) {
            for (var style in styles) {
                this.renderer.setStyle(el, style, styles[style]);
            }
        };
        AppSidebarNavTitleComponent.prototype.addClass = function (classes, el) {
            var _this = this;
            var classArray = (Array.isArray(classes) ? classes : classes.split(' '));
            classArray.filter(function (element) { return element.length > 0; }).forEach(function (element) {
                _this.renderer.addClass(el, element);
            });
        };
        AppSidebarNavTitleComponent.prototype.setAttrib = function (key, value, el) {
            this.renderer.setAttribute(el, key, value);
        };
        AppSidebarNavTitleComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AppSidebarNavTitleComponent.prototype, "item", void 0);
        AppSidebarNavTitleComponent = __decorate([ __metadata("design:paramtypes", [core.ElementRef,
                core.Renderer2])
        ], AppSidebarNavTitleComponent);
AppSidebarNavTitleComponent.ɵfac = function AppSidebarNavTitleComponent_Factory(t) { return new (t || AppSidebarNavTitleComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
AppSidebarNavTitleComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarNavTitleComponent, selectors: [["app-sidebar-nav-title"], ["cui-sidebar-nav-title"]], inputs: { item: "item" }, decls: 0, vars: 0, template: function AppSidebarNavTitleComponent_Template(rf, ctx) { }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavTitleComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-sidebar-nav-title, cui-sidebar-nav-title',
                template: ''
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }]; }, { item: [{
            type: core.Input
        }] }); })();
        return AppSidebarNavTitleComponent;
    }());

    var AppSidebarNavLabelComponent = /** @class */ (function () {
        function AppSidebarNavLabelComponent(helper) {
            this.helper = helper;
            this.classes = {
                'nav-label': true,
                active: true
            };
            this.iconClasses = {};
        }
        AppSidebarNavLabelComponent.prototype.ngOnInit = function () {
            this.iconClasses = this.helper.getIconClass(this.item);
        };
        AppSidebarNavLabelComponent.prototype.getItemClass = function () {
            var itemClass = this.item.class;
            this.classes[itemClass] = !!itemClass;
            return this.classes;
        };
        AppSidebarNavLabelComponent.prototype.getLabelIconClass = function () {
            var variant = "text-" + this.item.label.variant;
            this.iconClasses[variant] = !!this.item.label.variant;
            var labelClass = this.item.label.class;
            this.iconClasses[labelClass] = !!labelClass;
            return this.iconClasses;
        };
        AppSidebarNavLabelComponent.ctorParameters = function () { return [
            { type: SidebarNavHelper }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AppSidebarNavLabelComponent.prototype, "item", void 0);
        AppSidebarNavLabelComponent = __decorate([ __metadata("design:paramtypes", [SidebarNavHelper])
        ], AppSidebarNavLabelComponent);
AppSidebarNavLabelComponent.ɵfac = function AppSidebarNavLabelComponent_Factory(t) { return new (t || AppSidebarNavLabelComponent)(ɵngcc0.ɵɵdirectiveInject(SidebarNavHelper)); };
AppSidebarNavLabelComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarNavLabelComponent, selectors: [["app-sidebar-nav-label"], ["cui-sidebar-nav-label"]], inputs: { item: "item" }, decls: 5, vars: 6, consts: [[3, "ngClass", "href", "appHtmlAttr"], [3, "ngClass", 4, "ngIf"], [3, "ngClass"]], template: function AppSidebarNavLabelComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "a", 0);
        ɵngcc0.ɵɵtemplate(1, AppSidebarNavLabelComponent_i_1_Template, 1, 1, "i", 1);
        ɵngcc0.ɵɵelementContainerStart(2);
        ɵngcc0.ɵɵtext(3);
        ɵngcc0.ɵɵelementContainerEnd();
        ɵngcc0.ɵɵtemplate(4, AppSidebarNavLabelComponent_span_4_Template, 3, 4, "span", 1);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵpropertyInterpolate("href", ctx.item.url, ɵngcc0.ɵɵsanitizeUrl);
        ɵngcc0.ɵɵproperty("ngClass", ctx.getItemClass())("appHtmlAttr", ctx.item.attributes);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.helper.hasIcon(ctx.item));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵtextInterpolate(ctx.item.name);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.helper.hasBadge(ctx.item));
    } }, directives: function () { return [ɵngcc1.NgClass, HtmlAttributesDirective, ɵngcc1.NgIf]; }, pipes: function () { return [AppSidebarNavBadgePipe]; }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavLabelComponent, [{
        type: core.Component,
        args: [{
                selector: 'app-sidebar-nav-label, cui-sidebar-nav-label',
                template: "<a [ngClass]=\"getItemClass()\"\r\n   href=\"{{item.url}}\"\r\n   [appHtmlAttr]=\"item.attributes\">\r\n  <i *ngIf=\"helper.hasIcon(item)\" [ngClass]=\"getLabelIconClass()\"></i>\r\n  <ng-container>{{item.name}}</ng-container>\r\n  <span *ngIf=\"helper.hasBadge(item)\" [ngClass]=\"item | appSidebarNavBadge\">{{ item.badge.text }}</span>\r\n</a>\r\n"
            }]
    }], function () { return [{ type: SidebarNavHelper }]; }, { item: [{
            type: core.Input
        }] }); })();
        return AppSidebarNavLabelComponent;
    }());

    var AppSidebarNavIconPipe = /** @class */ (function () {
        function AppSidebarNavIconPipe() {
        }
        AppSidebarNavIconPipe.prototype.transform = function (item, args) {
            var classes = {
                'nav-icon': true
            };
            var icon = item.icon;
            classes[icon] = !!item.icon;
            return classes;
        };
AppSidebarNavIconPipe.ɵfac = function AppSidebarNavIconPipe_Factory(t) { return new (t || AppSidebarNavIconPipe)(); };
AppSidebarNavIconPipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "appSidebarNavIcon", type: AppSidebarNavIconPipe, pure: true });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavIconPipe, [{
        type: core.Pipe,
        args: [{
                name: 'appSidebarNavIcon'
            }]
    }], function () { return []; }, null); })();
        return AppSidebarNavIconPipe;
    }());

    var AppSidebarNavBadgePipe = /** @class */ (function () {
        function AppSidebarNavBadgePipe() {
        }
        AppSidebarNavBadgePipe.prototype.transform = function (item, args) {
            var classes = {
                badge: true
            };
            var variant = "badge-" + item.badge.variant;
            classes[variant] = !!item.badge.variant;
            classes[item.badge.class] = !!item.badge.class;
            return classes;
        };
AppSidebarNavBadgePipe.ɵfac = function AppSidebarNavBadgePipe_Factory(t) { return new (t || AppSidebarNavBadgePipe)(); };
AppSidebarNavBadgePipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "appSidebarNavBadge", type: AppSidebarNavBadgePipe, pure: true });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavBadgePipe, [{
        type: core.Pipe,
        args: [{
                name: 'appSidebarNavBadge'
            }]
    }], function () { return []; }, null); })();
        return AppSidebarNavBadgePipe;
    }());

    var AppSidebarNavLinkPipe = /** @class */ (function () {
        function AppSidebarNavLinkPipe() {
        }
        AppSidebarNavLinkPipe.prototype.transform = function (item) {
            var classes = { 'nav-link': true };
            var disabled = item.attributes && item.attributes.disabled;
            classes['disabled'] = disabled;
            classes['btn-link'] = disabled;
            classes["nav-link-" + item.variant] = !!item.variant;
            return classes;
        };
AppSidebarNavLinkPipe.ɵfac = function AppSidebarNavLinkPipe_Factory(t) { return new (t || AppSidebarNavLinkPipe)(); };
AppSidebarNavLinkPipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "appSidebarNavLink", type: AppSidebarNavLinkPipe, pure: true });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavLinkPipe, [{
        type: core.Pipe,
        args: [{
                name: 'appSidebarNavLink'
            }]
    }], function () { return []; }, null); })();
        return AppSidebarNavLinkPipe;
    }());

    var AppSidebarNavItemClassPipe = /** @class */ (function () {
        function AppSidebarNavItemClassPipe(helper) {
            this.helper = helper;
        }
        AppSidebarNavItemClassPipe.prototype.transform = function (item) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var itemType = this.helper.itemType(item);
            var itemClass;
            if (['divider', 'title'].includes(itemType)) {
                itemClass = "nav-" + itemType;
            }
            else if (itemType === 'dropdown') {
                itemClass = 'nav-item nav-dropdown';
            }
            else {
                itemClass = 'nav-item';
            }
            return item.class ? itemClass + " " + item.class : itemClass;
        };
        AppSidebarNavItemClassPipe.ctorParameters = function () { return [
            { type: SidebarNavHelper }
        ]; };
        AppSidebarNavItemClassPipe = __decorate([ __metadata("design:paramtypes", [SidebarNavHelper])
        ], AppSidebarNavItemClassPipe);
AppSidebarNavItemClassPipe.ɵfac = function AppSidebarNavItemClassPipe_Factory(t) { return new (t || AppSidebarNavItemClassPipe)(ɵngcc0.ɵɵdirectiveInject(SidebarNavHelper)); };
AppSidebarNavItemClassPipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "appSidebarNavItemClass", type: AppSidebarNavItemClassPipe, pure: true });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavItemClassPipe, [{
        type: core.Pipe,
        args: [{
                name: 'appSidebarNavItemClass'
            }]
    }], function () { return [{ type: SidebarNavHelper }]; }, null); })();
        return AppSidebarNavItemClassPipe;
    }());

    var AppSidebarModule = /** @class */ (function () {
        function AppSidebarModule() {
        }
AppSidebarModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: AppSidebarModule });
AppSidebarModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function AppSidebarModule_Factory(t) { return new (t || AppSidebarModule)(); }, providers: [
        SidebarNavHelper,
        AppSidebarService
    ], imports: [[
            common.CommonModule,
            router.RouterModule,
            LayoutModule
        ],
        LayoutModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(AppSidebarModule, { declarations: [AppSidebarFooterComponent,
        AppSidebarFormComponent,
        AppSidebarHeaderComponent,
        AppSidebarMinimizerComponent, AppSidebarMinimizerComponent,
        AppSidebarComponent,
        AppSidebarNavItemsComponent,
        AppSidebarNavComponent,
        AppSidebarNavDividerComponent,
        AppSidebarNavDropdownComponent,
        AppSidebarNavLinkComponent,
        AppSidebarNavLinkContentComponent,
        AppSidebarNavTitleComponent,
        NavDropdownDirective,
        NavDropdownToggleDirective,
        AppSidebarNavLabelComponent,
        AppSidebarNavIconPipe,
        AppSidebarNavBadgePipe,
        AppSidebarNavLinkPipe,
        AppSidebarNavItemClassPipe], imports: [ɵngcc1.CommonModule, ɵngcc2.RouterModule, LayoutModule], exports: [AppSidebarFooterComponent,
        AppSidebarFormComponent,
        AppSidebarHeaderComponent,
        AppSidebarMinimizerComponent,
        AppSidebarComponent,
        AppSidebarNavItemsComponent,
        AppSidebarNavComponent,
        AppSidebarNavDividerComponent,
        AppSidebarNavDropdownComponent,
        AppSidebarNavLabelComponent,
        AppSidebarNavLinkComponent,
        AppSidebarNavLinkContentComponent,
        AppSidebarNavTitleComponent,
        NavDropdownDirective,
        NavDropdownToggleDirective,
        LayoutModule] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarModule, [{
        type: core.NgModule,
        args: [{
                imports: [
                    common.CommonModule,
                    router.RouterModule,
                    LayoutModule
                ],
                exports: [
                    AppSidebarFooterComponent,
                    AppSidebarFormComponent,
                    AppSidebarHeaderComponent,
                    AppSidebarMinimizerComponent,
                    AppSidebarComponent,
                    AppSidebarNavItemsComponent,
                    AppSidebarNavComponent,
                    AppSidebarNavDividerComponent,
                    AppSidebarNavDropdownComponent,
                    AppSidebarNavLabelComponent,
                    AppSidebarNavLinkComponent,
                    AppSidebarNavLinkContentComponent,
                    AppSidebarNavTitleComponent,
                    NavDropdownDirective,
                    NavDropdownToggleDirective,
                    LayoutModule
                ],
                declarations: [
                    AppSidebarFooterComponent,
                    AppSidebarFormComponent,
                    AppSidebarHeaderComponent,
                    AppSidebarMinimizerComponent,
                    AppSidebarMinimizerComponent,
                    AppSidebarComponent,
                    AppSidebarNavItemsComponent,
                    AppSidebarNavComponent,
                    AppSidebarNavDividerComponent,
                    AppSidebarNavDropdownComponent,
                    AppSidebarNavLinkComponent,
                    AppSidebarNavLinkContentComponent,
                    AppSidebarNavTitleComponent,
                    NavDropdownDirective,
                    NavDropdownToggleDirective,
                    AppSidebarNavLabelComponent,
                    AppSidebarNavIconPipe,
                    AppSidebarNavBadgePipe,
                    AppSidebarNavLinkPipe,
                    AppSidebarNavItemClassPipe
                ],
                providers: [
                    SidebarNavHelper,
                    AppSidebarService
                ]
            }]
    }], function () { return []; }, null); })();
        return AppSidebarModule;
    }());

    exports.AppAsideComponent = AppAsideComponent;
    exports.AppAsideModule = AppAsideModule;
    exports.AppBreadcrumbComponent = AppBreadcrumbComponent;
    exports.AppBreadcrumbModule = AppBreadcrumbModule;
    exports.AppFooterComponent = AppFooterComponent;
    exports.AppFooterModule = AppFooterModule;
    exports.AppHeaderComponent = AppHeaderComponent;
    exports.AppHeaderModule = AppHeaderModule;
    exports.AppSidebarComponent = AppSidebarComponent;
    exports.AppSidebarModule = AppSidebarModule;
    exports.CuiBreadcrumbComponent = CuiBreadcrumbComponent;
    exports.SidebarNavHelper = SidebarNavHelper;
    exports.ɵa = LayoutModule;
    exports.ɵb = SidebarToggleDirective;
    exports.ɵba = AppSidebarNavBadgePipe;
    exports.ɵbb = AppSidebarNavLinkPipe;
    exports.ɵbc = AppSidebarNavItemClassPipe;
    exports.ɵc = SidebarMinimizeDirective;
    exports.ɵd = MobileSidebarToggleDirective;
    exports.ɵe = SidebarOffCanvasCloseDirective;
    exports.ɵf = BrandMinimizeDirective;
    exports.ɵg = AsideToggleDirective;
    exports.ɵh = HtmlAttributesDirective;
    exports.ɵi = ClassToggler;
    exports.ɵj = AppBreadcrumbService;
    exports.ɵk = AppSidebarService;
    exports.ɵl = AppSidebarFooterComponent;
    exports.ɵm = AppSidebarFormComponent;
    exports.ɵn = AppSidebarHeaderComponent;
    exports.ɵo = AppSidebarMinimizerComponent;
    exports.ɵp = AppSidebarNavItemsComponent;
    exports.ɵq = AppSidebarNavComponent;
    exports.ɵr = AppSidebarNavDividerComponent;
    exports.ɵs = AppSidebarNavDropdownComponent;
    exports.ɵt = AppSidebarNavLabelComponent;
    exports.ɵu = AppSidebarNavLinkContentComponent;
    exports.ɵv = AppSidebarNavLinkComponent;
    exports.ɵw = AppSidebarNavTitleComponent;
    exports.ɵx = NavDropdownDirective;
    exports.ɵy = NavDropdownToggleDirective;
    exports.ɵz = AppSidebarNavIconPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=coreui-angular.umd.js.map