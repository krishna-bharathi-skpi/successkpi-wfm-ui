import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, HostListener } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
var NavDropdownDirective = /** @class */ (function () {
    function NavDropdownDirective(el) {
        this.el = el;
    }
    NavDropdownDirective.prototype.toggle = function () {
        this.el.nativeElement.classList.toggle('open');
    };
    NavDropdownDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    NavDropdownDirective = __decorate([ __metadata("design:paramtypes", [ElementRef])
    ], NavDropdownDirective);
NavDropdownDirective.ɵfac = function NavDropdownDirective_Factory(t) { return new (t || NavDropdownDirective)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
NavDropdownDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: NavDropdownDirective, selectors: [["", "appNavDropdown", ""]] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NavDropdownDirective, [{
        type: Directive,
        args: [{
                selector: '[appNavDropdown]'
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }]; }, null); })();
    return NavDropdownDirective;
}());
export { NavDropdownDirective };
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
        HostListener('click', ['$event']),
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
        type: Directive,
        args: [{
                selector: '[appNavDropdownToggle]'
            }]
    }], function () { return [{ type: NavDropdownDirective }]; }, { toggleOpen: [{
            type: HostListener,
            args: ['click', ['$event']]
        }] }); })();
    return NavDropdownToggleDirective;
}());
export { NavDropdownToggleDirective };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LmRpcmVjdGl2ZS5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1uYXYuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBS2xFO0lBRUUsOEJBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUksQ0FBQztJQUV2QyxxQ0FBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxDQUFDOztnQkFKdUIsVUFBVTs7SUFGdkIsb0JBQW9CLGVBRXRCLFNBTFYsU0FBUyxDQUFDLGNBQ1QsUUFBUSxFQUFFLDNDQUVKLGtDQUVrQixVQUFVO2NBSk4sVUFDN0IsQ0FBQyxsQkFDVyxvQkFBb0IsQ0FPaEM7Ozs7Ozs7OzJFQUNEO0lBREEsMkJBQUM7Q0FBQSxBQVBELElBT0M7U0FQWSxvQkFBb0I7QUFTakM7O0dBRUc7QUFJSDtJQUNFLG9DQUFvQixRQUE4QjtRQUE5QixhQUFRLEdBQVIsUUFBUSxDQUFzQjtJQUFHLENBQUM7SUFHdEQsK0NBQVUsR0FBVixVQUFXLE1BQVc7UUFDcEIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7Z0JBTjZCLG9CQUFvQjs7SUFHbEQ7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7Z0VBSWpDO0lBUFUsMEJBQTBCLGVBQzNCLFNBSlgsU0FBUyxDQUFDLGNBQ1QsUUFBUSxFQUFFLDNDQUVKLGtDQUN3QixvQkFBb0I7VUFIaEIsVUFDbkMsQ0FBQyxkQUNXLDBCQUEwQixDQVF0Qzs7Ozs7Ozs7Ozs7OztvQkFDRDtJQURBLGlDQUFDO0NBQUEsQUFSRCxJQVFDO1NBUlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thcHBOYXZEcm9wZG93bl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOYXZEcm9wZG93bkRpcmVjdGl2ZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHsgfVxyXG5cclxuICB0b2dnbGUoKSB7XHJcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFsbG93cyB0aGUgZHJvcGRvd24gdG8gYmUgdG9nZ2xlZCB2aWEgY2xpY2suXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thcHBOYXZEcm9wZG93blRvZ2dsZV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOYXZEcm9wZG93blRvZ2dsZURpcmVjdGl2ZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkcm9wZG93bjogTmF2RHJvcGRvd25EaXJlY3RpdmUpIHt9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICB0b2dnbGVPcGVuKCRldmVudDogYW55KSB7XHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuZHJvcGRvd24udG9nZ2xlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==