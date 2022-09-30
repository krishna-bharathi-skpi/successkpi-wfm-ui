import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, HostListener } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
let NavDropdownDirective = class NavDropdownDirective {
    constructor(el) {
        this.el = el;
    }
    toggle() {
        this.el.nativeElement.classList.toggle('open');
    }
};
NavDropdownDirective.ɵfac = function NavDropdownDirective_Factory(t) { return new (t || NavDropdownDirective)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
NavDropdownDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: NavDropdownDirective, selectors: [["", "appNavDropdown", ""]] });
NavDropdownDirective.ctorParameters = () => [
    { type: ElementRef }
];
NavDropdownDirective = __decorate([ __metadata("design:paramtypes", [ElementRef])
], NavDropdownDirective);
export { NavDropdownDirective };
/**
 * Allows the dropdown to be toggled via click.
 */
let NavDropdownToggleDirective = class NavDropdownToggleDirective {
    constructor(dropdown) {
        this.dropdown = dropdown;
    }
    toggleOpen($event) {
        $event.preventDefault();
        this.dropdown.toggle();
    }
};
NavDropdownToggleDirective.ɵfac = function NavDropdownToggleDirective_Factory(t) { return new (t || NavDropdownToggleDirective)(ɵngcc0.ɵɵdirectiveInject(NavDropdownDirective)); };
NavDropdownToggleDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: NavDropdownToggleDirective, selectors: [["", "appNavDropdownToggle", ""]], hostBindings: function NavDropdownToggleDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function NavDropdownToggleDirective_click_HostBindingHandler($event) { return ctx.toggleOpen($event); });
    } } });
NavDropdownToggleDirective.ctorParameters = () => [
    { type: NavDropdownDirective }
];
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NavDropdownToggleDirective.prototype, "toggleOpen", null);
NavDropdownToggleDirective = __decorate([ __metadata("design:paramtypes", [NavDropdownDirective])
], NavDropdownToggleDirective);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NavDropdownDirective, [{
        type: Directive,
        args: [{
                selector: '[appNavDropdown]'
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NavDropdownToggleDirective, [{
        type: Directive,
        args: [{
                selector: '[appNavDropdownToggle]'
            }]
    }], function () { return [{ type: NavDropdownDirective }]; }, { toggleOpen: [{
            type: HostListener,
            args: ['click', ['$event']]
        }] }); })();
export { NavDropdownToggleDirective };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LmRpcmVjdGl2ZS5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1uYXYuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBS2xFLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBRS9CLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUksQ0FBQztJQUV2QyxNQUFNO1FBQ0osSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0Y7OzhIQUFBOztZQUx5QixVQUFVOztBQUZ2QixvQkFBb0IsZUFFdEIsS0FMVixTQUFTLENBQUMsVUFDVCxRQUFRLEVBQUUsbkNBRVIsa0NBRXNCLFVBQVU7TUFKTixNQUM3QixDQUFDLFZBQ1csb0JBQW9CLENBT2hDO1NBUFksb0JBQW9CO0FBU2pDOztHQUVHO0FBSUgsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFDckMsWUFBb0IsUUFBOEI7UUFBOUIsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7SUFBRyxDQUFDO0lBR3RELFVBQVUsQ0FBQyxNQUFXO1FBQ3BCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7Q0FDRjs7OztXQUFBOztZQVArQixvQkFBb0I7O0FBR2xEO0lBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OzREQUlqQztBQVBVLDBCQUEwQixlQUMzQixLQUpYLFNBQVMsQ0FBQyxVQUNULFFBQVEsRUFBRSxuQ0FFUixrQ0FDNEIsb0JBQW9CO0VBSGhCLE1BQ25DLENBQUMsTkFDVywwQkFBMEIsQ0FRdEM7Ozs7Ozs7Ozs7Ozs7OztvQkFDRDtTQVRhLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXBwTmF2RHJvcGRvd25dJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmF2RHJvcGRvd25EaXJlY3RpdmUge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7IH1cclxuXHJcbiAgdG9nZ2xlKCkge1xyXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBbGxvd3MgdGhlIGRyb3Bkb3duIHRvIGJlIHRvZ2dsZWQgdmlhIGNsaWNrLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXBwTmF2RHJvcGRvd25Ub2dnbGVdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmF2RHJvcGRvd25Ub2dnbGVEaXJlY3RpdmUge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZHJvcGRvd246IE5hdkRyb3Bkb3duRGlyZWN0aXZlKSB7fVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgdG9nZ2xlT3BlbigkZXZlbnQ6IGFueSkge1xyXG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLmRyb3Bkb3duLnRvZ2dsZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=