import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
import { SidebarNavHelper } from '../app-sidebar-nav.service';
import * as ɵngcc0 from '@angular/core';
let AppSidebarNavItemClassPipe = class AppSidebarNavItemClassPipe {
    constructor(helper) {
        this.helper = helper;
    }
    transform(item, ...args) {
        const itemType = this.helper.itemType(item);
        let itemClass;
        if (['divider', 'title'].includes(itemType)) {
            itemClass = `nav-${itemType}`;
        }
        else if (itemType === 'dropdown') {
            itemClass = 'nav-item nav-dropdown';
        }
        else {
            itemClass = 'nav-item';
        }
        return item.class ? `${itemClass} ${item.class}` : itemClass;
    }
};
AppSidebarNavItemClassPipe.ɵfac = function AppSidebarNavItemClassPipe_Factory(t) { return new (t || AppSidebarNavItemClassPipe)(ɵngcc0.ɵɵdirectiveInject(SidebarNavHelper)); };
AppSidebarNavItemClassPipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "appSidebarNavItemClass", type: AppSidebarNavItemClassPipe, pure: true });
AppSidebarNavItemClassPipe.ctorParameters = () => [
    { type: SidebarNavHelper }
];
AppSidebarNavItemClassPipe = __decorate([ __metadata("design:paramtypes", [SidebarNavHelper])
], AppSidebarNavItemClassPipe);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavItemClassPipe, [{
        type: Pipe,
        args: [{
                name: 'appSidebarNavItemClass'
            }]
    }], function () { return [{ type: SidebarNavHelper }]; }, null); })();
export { AppSidebarNavItemClassPipe };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LWl0ZW0tY2xhc3MucGlwZS5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1uYXYvYXBwLXNpZGViYXItbmF2LWl0ZW0tY2xhc3MucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFcEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7O0FBSzVELElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTBCO0lBRXJDLFlBQ1MsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFDOUIsQ0FBQztJQUVKLFNBQVMsQ0FBQyxJQUFTLEVBQUUsR0FBRyxJQUFXO1FBQy9CLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLElBQUksU0FBUyxDQUFDO1FBQ2QsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0MsU0FBUyxHQUFHLE9BQU8sUUFBUSxFQUFFLENBQUM7U0FDL0I7YUFBTSxJQUFJLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDbEMsU0FBUyxHQUFHLHVCQUF1QixDQUFFO1NBQ3RDO2FBQU07WUFDTCxTQUFTLEdBQUcsVUFBVSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUMvRCxDQUFDO0NBQ0o7O3lJQUFBOztZQWZrQixnQkFBZ0I7O0FBSHRCLDBCQUEwQixlQUFlLEtBSHJELElBQUksQ0FBQyxVQUNKLElBQUksRUFBRSx3QkFBd0IsbERBRTVCLGtDQUdlLGdCQUFnQjtHQUpsQyxDQUFDLERBQ1csMEJBQTBCLENBa0J0Qzs7Ozs7OzBFQUNEO1NBbkJhLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7U2lkZWJhck5hdkhlbHBlcn0gZnJvbSAnLi4vYXBwLXNpZGViYXItbmF2LnNlcnZpY2UnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdhcHBTaWRlYmFyTmF2SXRlbUNsYXNzJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwU2lkZWJhck5hdkl0ZW1DbGFzc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgaGVscGVyOiBTaWRlYmFyTmF2SGVscGVyXHJcbiAgKSB7fVxyXG5cclxuICB0cmFuc2Zvcm0oaXRlbTogYW55LCAuLi5hcmdzOiBhbnlbXSk6IGFueSB7XHJcbiAgICAgIGNvbnN0IGl0ZW1UeXBlID0gdGhpcy5oZWxwZXIuaXRlbVR5cGUoaXRlbSk7XHJcbiAgICAgIGxldCBpdGVtQ2xhc3M7XHJcbiAgICAgIGlmIChbJ2RpdmlkZXInLCAndGl0bGUnXS5pbmNsdWRlcyhpdGVtVHlwZSkpIHtcclxuICAgICAgICBpdGVtQ2xhc3MgPSBgbmF2LSR7aXRlbVR5cGV9YDtcclxuICAgICAgfSBlbHNlIGlmIChpdGVtVHlwZSA9PT0gJ2Ryb3Bkb3duJykge1xyXG4gICAgICAgIGl0ZW1DbGFzcyA9ICduYXYtaXRlbSBuYXYtZHJvcGRvd24nIDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpdGVtQ2xhc3MgPSAnbmF2LWl0ZW0nO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBpdGVtLmNsYXNzID8gYCR7aXRlbUNsYXNzfSAke2l0ZW0uY2xhc3N9YCA6IGl0ZW1DbGFzcztcclxuICAgIH1cclxufVxyXG4iXX0=