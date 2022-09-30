import { ElementRef } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class NavDropdownDirective {
    private el;
    constructor(el: ElementRef);
    toggle(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NavDropdownDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NavDropdownDirective, "[appNavDropdown]", never, {}, {}, never>;
}
/**
 * Allows the dropdown to be toggled via click.
 */
export declare class NavDropdownToggleDirective {
    private dropdown;
    constructor(dropdown: NavDropdownDirective);
    toggleOpen($event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NavDropdownToggleDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NavDropdownToggleDirective, "[appNavDropdownToggle]", never, {}, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LmRpcmVjdGl2ZS5kLnRzIiwic291cmNlcyI6WyJhcHAtc2lkZWJhci1uYXYuZGlyZWN0aXZlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0E7Ozs7OztBQUlBOzs7Ozs7Ozs7O0FBUUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE5hdkRyb3Bkb3duRGlyZWN0aXZlIHtcclxuICAgIHByaXZhdGUgZWw7XHJcbiAgICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZik7XHJcbiAgICB0b2dnbGUoKTogdm9pZDtcclxufVxyXG4vKipcclxuICogQWxsb3dzIHRoZSBkcm9wZG93biB0byBiZSB0b2dnbGVkIHZpYSBjbGljay5cclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE5hdkRyb3Bkb3duVG9nZ2xlRGlyZWN0aXZlIHtcclxuICAgIHByaXZhdGUgZHJvcGRvd247XHJcbiAgICBjb25zdHJ1Y3Rvcihkcm9wZG93bjogTmF2RHJvcGRvd25EaXJlY3RpdmUpO1xyXG4gICAgdG9nZ2xlT3BlbigkZXZlbnQ6IGFueSk6IHZvaWQ7XHJcbn1cclxuIl19