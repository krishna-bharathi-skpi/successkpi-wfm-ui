import { __decorate, __metadata, __param } from "tslib";
import { Component, Inject, Input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { SidebarNavHelper } from '../app-sidebar-nav.service';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/router';

function AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_dropdown_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "app-sidebar-nav-dropdown", 7);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavItemClass");
} if (rf & 2) {
    const item_r1 = ɵngcc0.ɵɵnextContext().$implicit;
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassProp("open", ctx_r2.helper.isActive(ctx_r2.router, item_r1));
    ɵngcc0.ɵɵproperty("item", item_r1)("ngClass", ɵngcc0.ɵɵpipeBind1(1, 4, item_r1));
} }
function AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_divider_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "app-sidebar-nav-divider", 8);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavItemClass");
} if (rf & 2) {
    const item_r1 = ɵngcc0.ɵɵnextContext().$implicit;
    ɵngcc0.ɵɵproperty("item", item_r1)("ngClass", ɵngcc0.ɵɵpipeBind1(1, 3, item_r1))("appHtmlAttr", item_r1.attributes);
} }
function AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_title_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "app-sidebar-nav-title", 8);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavItemClass");
} if (rf & 2) {
    const item_r1 = ɵngcc0.ɵɵnextContext().$implicit;
    ɵngcc0.ɵɵproperty("item", item_r1)("ngClass", ɵngcc0.ɵɵpipeBind1(1, 3, item_r1))("appHtmlAttr", item_r1.attributes);
} }
function AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_label_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "app-sidebar-nav-label", 9);
    ɵngcc0.ɵɵpipe(1, "appSidebarNavItemClass");
} if (rf & 2) {
    const item_r1 = ɵngcc0.ɵɵnextContext().$implicit;
    ɵngcc0.ɵɵproperty("item", item_r1)("ngClass", ɵngcc0.ɵɵpipeBind1(1, 2, item_r1));
} }
function AppSidebarNavItemsComponent_ng_container_0_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_link_7_Template(rf, ctx) { if (rf & 1) {
    const _r13 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "app-sidebar-nav-link", 10);
    ɵngcc0.ɵɵlistener("linkClick", function AppSidebarNavItemsComponent_ng_container_0_app_sidebar_nav_link_7_Template_app_sidebar_nav_link_linkClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r13); const ctx_r12 = ɵngcc0.ɵɵnextContext(2); return ctx_r12.hideMobile(); });
    ɵngcc0.ɵɵpipe(1, "appSidebarNavItemClass");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ɵngcc0.ɵɵnextContext().$implicit;
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
    const item_r1 = ctx.$implicit;
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
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
let AppSidebarNavItemsComponent = class AppSidebarNavItemsComponent {
    constructor(document, renderer, router, helper) {
        this.document = document;
        this.renderer = renderer;
        this.router = router;
        this.helper = helper;
    }
    set items(items) {
        this._items = [...items];
    }
    get items() {
        return this._items;
    }
    hideMobile() {
        if (this.document.body.classList.contains('sidebar-show')) {
            this.renderer.removeClass(this.document.body, 'sidebar-show');
        }
    }
};
AppSidebarNavItemsComponent.ɵfac = function AppSidebarNavItemsComponent_Factory(t) { return new (t || AppSidebarNavItemsComponent)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.Router), ɵngcc0.ɵɵdirectiveInject(SidebarNavHelper)); };
AppSidebarNavItemsComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarNavItemsComponent, selectors: [["app-sidebar-nav-items"], ["cui-sidebar-nav-items"]], inputs: { items: "items" }, decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], [3, "ngSwitch"], ["appNavDropdown", "", "routerLinkActive", "open", 3, "item", "open", "ngClass", 4, "ngSwitchCase"], [3, "item", "ngClass", "appHtmlAttr", 4, "ngSwitchCase"], ["class", "nav-item", 3, "item", "ngClass", 4, "ngSwitchCase"], [4, "ngSwitchCase"], ["class", "nav-item", 3, "item", "ngClass", "linkClick", 4, "ngSwitchDefault"], ["appNavDropdown", "", "routerLinkActive", "open", 3, "item", "ngClass"], [3, "item", "ngClass", "appHtmlAttr"], [1, "nav-item", 3, "item", "ngClass"], [1, "nav-item", 3, "item", "ngClass", "linkClick"]], template: function AppSidebarNavItemsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, AppSidebarNavItemsComponent_ng_container_0_Template, 8, 6, "ng-container", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngForOf", ctx.items);
    } }, encapsulation: 2 });
AppSidebarNavItemsComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Renderer2 },
    { type: Router },
    { type: SidebarNavHelper }
];
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], AppSidebarNavItemsComponent.prototype, "items", null);
AppSidebarNavItemsComponent = __decorate([ __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object, Renderer2,
        Router,
        SidebarNavHelper])
], AppSidebarNavItemsComponent);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavItemsComponent, [{
        type: Component,
        args: [{
                selector: 'app-sidebar-nav-items, cui-sidebar-nav-items',
                template: `
    <ng-container *ngFor="let item of items">
      <ng-container [ngSwitch]="helper.itemType(item)">
        <app-sidebar-nav-dropdown
          *ngSwitchCase="'dropdown'"
          [item]="item"
          [class.open]="helper.isActive(router, item)"
          [ngClass]="item | appSidebarNavItemClass"
          appNavDropdown
          routerLinkActive="open">
        </app-sidebar-nav-dropdown>
        <app-sidebar-nav-divider
          *ngSwitchCase="'divider'"
          [item]="item"
          [ngClass]="item | appSidebarNavItemClass"
          [appHtmlAttr]="item.attributes">
        </app-sidebar-nav-divider>
        <app-sidebar-nav-title
          *ngSwitchCase="'title'"
          [item]="item"
          [ngClass]="item | appSidebarNavItemClass"
          [appHtmlAttr]="item.attributes">
        </app-sidebar-nav-title>
        <app-sidebar-nav-label
          *ngSwitchCase="'label'"
          [item]="item"
          class="nav-item"
          [ngClass]="item | appSidebarNavItemClass">
        </app-sidebar-nav-label>
        <ng-container
          *ngSwitchCase="'empty'">
        </ng-container>
        <app-sidebar-nav-link
          *ngSwitchDefault
          [item]="item"
          class="nav-item"
          [ngClass]="item | appSidebarNavItemClass"
          (linkClick)="hideMobile()"
        >
        </app-sidebar-nav-link>
      </ng-container>
    </ng-container>
  `
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc1.Router }, { type: SidebarNavHelper }]; }, { items: [{
            type: Input
        }] }); })();
export { AppSidebarNavItemsComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LWl0ZW1zLmNvbXBvbmVudC5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1uYXYvYXBwLXNpZGViYXItbmF2LWl0ZW1zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlENUQsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7SUFZdEMsWUFDNEIsUUFBYSxFQUMvQixRQUFtQixFQUNwQixNQUFjLEVBQ2QsTUFBd0I7UUFITCxhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQzlCLENBQUM7SUFaSixJQUFJLEtBQUssQ0FBQyxLQUFpQjtRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFTTSxVQUFVO1FBQ2YsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQy9EO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7NkJBQUE7OzRDQVhJLE1BQU0sU0FBQyxRQUFRO1lBQ0UsU0FBUztZQUNaLE1BQU07WUFDTixnQkFBZ0I7O0FBWGpDO0lBREMsS0FBSyxFQUFFOzs7d0RBR1A7QUFQVSwyQkFBMkIsZUFFN0IsS0FoRFYsU0FBUyxDQUFDLFVBQ1QsekJBNkNFLENBYUMsV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7RUExRFgsRUFBRSw4Q0FBOEMsTEEyRHBDLFNBQVM7SUExRDdCLFFBQVEsRUFBRSxOQTJETyxNQUFNO1FBQ04sZ0JBQWdCO0dBaEJ0QiwyQkFBMkIsQ0F3QnZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBMUJFO0FBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBMEJGO1NBekJhLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3QsIElucHV0LCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7U2lkZWJhck5hdkhlbHBlcn0gZnJvbSAnLi4vYXBwLXNpZGViYXItbmF2LnNlcnZpY2UnO1xyXG5pbXBvcnQge0lOYXZEYXRhfSBmcm9tICcuLi9hcHAtc2lkZWJhci1uYXYnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc2lkZWJhci1uYXYtaXRlbXMsIGN1aS1zaWRlYmFyLW5hdi1pdGVtcycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiaGVscGVyLml0ZW1UeXBlKGl0ZW0pXCI+XHJcbiAgICAgICAgPGFwcC1zaWRlYmFyLW5hdi1kcm9wZG93blxyXG4gICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidkcm9wZG93bidcIlxyXG4gICAgICAgICAgW2l0ZW1dPVwiaXRlbVwiXHJcbiAgICAgICAgICBbY2xhc3Mub3Blbl09XCJoZWxwZXIuaXNBY3RpdmUocm91dGVyLCBpdGVtKVwiXHJcbiAgICAgICAgICBbbmdDbGFzc109XCJpdGVtIHwgYXBwU2lkZWJhck5hdkl0ZW1DbGFzc1wiXHJcbiAgICAgICAgICBhcHBOYXZEcm9wZG93blxyXG4gICAgICAgICAgcm91dGVyTGlua0FjdGl2ZT1cIm9wZW5cIj5cclxuICAgICAgICA8L2FwcC1zaWRlYmFyLW5hdi1kcm9wZG93bj5cclxuICAgICAgICA8YXBwLXNpZGViYXItbmF2LWRpdmlkZXJcclxuICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCInZGl2aWRlcidcIlxyXG4gICAgICAgICAgW2l0ZW1dPVwiaXRlbVwiXHJcbiAgICAgICAgICBbbmdDbGFzc109XCJpdGVtIHwgYXBwU2lkZWJhck5hdkl0ZW1DbGFzc1wiXHJcbiAgICAgICAgICBbYXBwSHRtbEF0dHJdPVwiaXRlbS5hdHRyaWJ1dGVzXCI+XHJcbiAgICAgICAgPC9hcHAtc2lkZWJhci1uYXYtZGl2aWRlcj5cclxuICAgICAgICA8YXBwLXNpZGViYXItbmF2LXRpdGxlXHJcbiAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ3RpdGxlJ1wiXHJcbiAgICAgICAgICBbaXRlbV09XCJpdGVtXCJcclxuICAgICAgICAgIFtuZ0NsYXNzXT1cIml0ZW0gfCBhcHBTaWRlYmFyTmF2SXRlbUNsYXNzXCJcclxuICAgICAgICAgIFthcHBIdG1sQXR0cl09XCJpdGVtLmF0dHJpYnV0ZXNcIj5cclxuICAgICAgICA8L2FwcC1zaWRlYmFyLW5hdi10aXRsZT5cclxuICAgICAgICA8YXBwLXNpZGViYXItbmF2LWxhYmVsXHJcbiAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ2xhYmVsJ1wiXHJcbiAgICAgICAgICBbaXRlbV09XCJpdGVtXCJcclxuICAgICAgICAgIGNsYXNzPVwibmF2LWl0ZW1cIlxyXG4gICAgICAgICAgW25nQ2xhc3NdPVwiaXRlbSB8IGFwcFNpZGViYXJOYXZJdGVtQ2xhc3NcIj5cclxuICAgICAgICA8L2FwcC1zaWRlYmFyLW5hdi1sYWJlbD5cclxuICAgICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ2VtcHR5J1wiPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDxhcHAtc2lkZWJhci1uYXYtbGlua1xyXG4gICAgICAgICAgKm5nU3dpdGNoRGVmYXVsdFxyXG4gICAgICAgICAgW2l0ZW1dPVwiaXRlbVwiXHJcbiAgICAgICAgICBjbGFzcz1cIm5hdi1pdGVtXCJcclxuICAgICAgICAgIFtuZ0NsYXNzXT1cIml0ZW0gfCBhcHBTaWRlYmFyTmF2SXRlbUNsYXNzXCJcclxuICAgICAgICAgIChsaW5rQ2xpY2spPVwiaGlkZU1vYmlsZSgpXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgPC9hcHAtc2lkZWJhci1uYXYtbGluaz5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBTaWRlYmFyTmF2SXRlbXNDb21wb25lbnQge1xyXG5cclxuICBwcm90ZWN0ZWQgX2l0ZW1zOiBJTmF2RGF0YVtdO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBpdGVtcyhpdGVtczogSU5hdkRhdGFbXSkge1xyXG4gICAgdGhpcy5faXRlbXMgPSBbLi4uaXRlbXNdO1xyXG4gIH1cclxuICBnZXQgaXRlbXMoKTogSU5hdkRhdGFbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5faXRlbXM7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHB1YmxpYyByb3V0ZXI6IFJvdXRlcixcclxuICAgIHB1YmxpYyBoZWxwZXI6IFNpZGViYXJOYXZIZWxwZXJcclxuICApIHt9XHJcblxyXG4gIHB1YmxpYyBoaWRlTW9iaWxlKCkge1xyXG4gICAgaWYgKHRoaXMuZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3NpZGViYXItc2hvdycpKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAnc2lkZWJhci1zaG93Jyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==