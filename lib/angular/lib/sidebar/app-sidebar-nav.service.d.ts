import { INavData } from './app-sidebar-nav';
import * as ɵngcc0 from '@angular/core';
export declare abstract class SidebarNavService {
    /**
     * Returns a sidebar-nav items config NavData
     */
    abstract getSidebarNavItemsConfig(): INavData[];
}
export declare class SidebarNavHelper {
    itemType(item: any): "label" | "link" | "title" | "divider" | "dropdown" | "empty";
    isActive(router: any, item: any): any;
    hasBadge: (item: any) => boolean;
    hasIcon: (item: any) => boolean;
    getIconClass(item: any): {
        'nav-icon': boolean;
    };
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SidebarNavHelper, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<SidebarNavHelper>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LnNlcnZpY2UuZC50cyIsInNvdXJjZXMiOlsiYXBwLXNpZGViYXItbmF2LnNlcnZpY2UuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQWNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU5hdkRhdGEgfSBmcm9tICcuL2FwcC1zaWRlYmFyLW5hdic7XHJcbmV4cG9ydCBkZWNsYXJlIGFic3RyYWN0IGNsYXNzIFNpZGViYXJOYXZTZXJ2aWNlIHtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHNpZGViYXItbmF2IGl0ZW1zIGNvbmZpZyBOYXZEYXRhXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGdldFNpZGViYXJOYXZJdGVtc0NvbmZpZygpOiBJTmF2RGF0YVtdO1xyXG59XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFNpZGViYXJOYXZIZWxwZXIge1xyXG4gICAgaXRlbVR5cGUoaXRlbTogYW55KTogXCJsYWJlbFwiIHwgXCJsaW5rXCIgfCBcInRpdGxlXCIgfCBcImRpdmlkZXJcIiB8IFwiZHJvcGRvd25cIiB8IFwiZW1wdHlcIjtcclxuICAgIGlzQWN0aXZlKHJvdXRlcjogYW55LCBpdGVtOiBhbnkpOiBhbnk7XHJcbiAgICBoYXNCYWRnZTogKGl0ZW06IGFueSkgPT4gYm9vbGVhbjtcclxuICAgIGhhc0ljb246IChpdGVtOiBhbnkpID0+IGJvb2xlYW47XHJcbiAgICBnZXRJY29uQ2xhc3MoaXRlbTogYW55KToge1xyXG4gICAgICAgICduYXYtaWNvbic6IGJvb2xlYW47XHJcbiAgICB9O1xyXG59XHJcbiJdfQ==