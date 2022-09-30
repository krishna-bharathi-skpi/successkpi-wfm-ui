import { __decorate, __metadata, __param } from "tslib";
import { Component, Input, OnInit, OnDestroy, Inject, Renderer2, HostBinding } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { asideMenuCssClasses } from '../shared';
import * as ɵngcc0 from '@angular/core';

var _c0 = ["*"];
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
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AppAsideComponent.prototype, "display", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AppAsideComponent.prototype, "fixed", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AppAsideComponent.prototype, "offCanvas", void 0);
    __decorate([
        HostBinding('class.aside-menu'),
        __metadata("design:type", Object)
    ], AppAsideComponent.prototype, "asideMenuClass", void 0);
    AppAsideComponent = __decorate([ __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object, Renderer2])
    ], AppAsideComponent);
AppAsideComponent.ɵfac = function AppAsideComponent_Factory(t) { return new (t || AppAsideComponent)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
AppAsideComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppAsideComponent, selectors: [["app-aside"], ["cui-aside"]], hostVars: 2, hostBindings: function AppAsideComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("aside-menu", ctx.asideMenuClass);
    } }, inputs: { display: "display", fixed: "fixed", offCanvas: "offCanvas" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function AppAsideComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppAsideComponent, [{
        type: Component,
        args: [{
                selector: 'app-aside, cui-aside',
                template: "<ng-content></ng-content>"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, { asideMenuClass: [{
            type: HostBinding,
            args: ['class.aside-menu']
        }], display: [{
            type: Input
        }], fixed: [{
            type: Input
        }], offCanvas: [{
            type: Input
        }] }); })();
    return AppAsideComponent;
}());
export { AppAsideComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWFzaWRlLmNvbXBvbmVudC5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvYXNpZGUvYXBwLWFzaWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7O0FBTWhEO0lBU0UsMkJBQzRCLFFBQWEsRUFDL0IsUUFBbUI7UUFERCxhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFOWixlQUFVLEdBQUcsa0JBQWtCLENBQUM7UUFFaEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7SUFLbkQsQ0FBQztJQUVMLG9DQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCx1Q0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxtQ0FBTyxHQUFQLFVBQVEsS0FBMkI7UUFBM0Isc0JBQUEsRUFBQSxRQUFpQixJQUFJLENBQUMsS0FBSztRQUNqQyxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7SUFFRCx1Q0FBVyxHQUFYLFVBQVksU0FBbUM7UUFBbkMsMEJBQUEsRUFBQSxZQUFxQixJQUFJLENBQUMsU0FBUztRQUM3QyxJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLHVCQUF1QixDQUFDLENBQUM7U0FDckU7SUFDSCxDQUFDO0lBRUQsNkNBQWlCLEdBQWpCLFVBQWtCLE9BQTJCO1FBQTNCLHdCQUFBLEVBQUEsVUFBZSxJQUFJLENBQUMsT0FBTztRQUMzQyxJQUFJLE9BQU8sS0FBSyxLQUFLLEVBQUc7WUFDdEIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZ0JBQWMsSUFBSSxDQUFDLE9BQU8sVUFBTyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN0RDtJQUNILENBQUM7O2dEQS9CRSxNQUFNLFNBQUMsUUFBUTtnQkFDRSxTQUFTOztJQVZwQjtRQUFSLEtBQUssRUFBRTs7c0RBQWM7SUFDYjtRQUFSLEtBQUssRUFBRTs7b0RBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7O3dEQUFvQjtJQUlLO1FBQWhDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQzs7NkRBQXVCO0lBUDVDLGlCQUFpQixlQUFlLFNBSjVDLFNBQVMsQ0FBQyxuQkFJSCxDQVVILFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBYm5CLFFBQVEsRUFBRSxzQkFBc0IsY0FDaEMsUUFBUSxFQUFFLFRBYVUsU0FBUzt3QkFiUSxqQkFFMUIsaUJBQWlCLENBMEM3QjtPQTNDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQTRDRjtJQURBLHdCQUFDO0NBQUEsQUExQ0QsSUEwQ0M7U0ExQ1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSwgSW5qZWN0LCBSZW5kZXJlcjIsIEhvc3RCaW5kaW5nfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IGFzaWRlTWVudUNzc0NsYXNzZXMgfSBmcm9tICcuLi9zaGFyZWQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtYXNpZGUsIGN1aS1hc2lkZScsXHJcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwQXNpZGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgZGlzcGxheTogYW55O1xyXG4gIEBJbnB1dCgpIGZpeGVkOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIG9mZkNhbnZhczogYm9vbGVhbjtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBmaXhlZENsYXNzID0gJ2FzaWRlLW1lbnUtZml4ZWQnO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFzaWRlLW1lbnUnKSBhc2lkZU1lbnVDbGFzcyA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc0ZpeGVkKHRoaXMuZml4ZWQpO1xyXG4gICAgdGhpcy5pc09mZkNhbnZhcyh0aGlzLm9mZkNhbnZhcyk7XHJcbiAgICB0aGlzLmRpc3BsYXlCcmVha3BvaW50KHRoaXMuZGlzcGxheSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCB0aGlzLmZpeGVkQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgaXNGaXhlZChmaXhlZDogYm9vbGVhbiA9IHRoaXMuZml4ZWQpOiB2b2lkIHtcclxuICAgIGlmIChmaXhlZCkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5maXhlZENsYXNzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzT2ZmQ2FudmFzKG9mZkNhbnZhczogYm9vbGVhbiA9IHRoaXMub2ZmQ2FudmFzKTogdm9pZCB7XHJcbiAgICBpZiAob2ZmQ2FudmFzKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAnYXNpZGUtbWVudS1vZmYtY2FudmFzJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5QnJlYWtwb2ludChkaXNwbGF5OiBhbnkgPSB0aGlzLmRpc3BsYXkpOiB2b2lkIHtcclxuICAgIGlmIChkaXNwbGF5ICE9PSBmYWxzZSApIHtcclxuICAgICAgY29uc3QgY3NzQ2xhc3MgPSB0aGlzLmRpc3BsYXkgPyBgYXNpZGUtbWVudS0ke3RoaXMuZGlzcGxheX0tc2hvd2AgOiBhc2lkZU1lbnVDc3NDbGFzc2VzWzBdO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgY3NzQ2xhc3MpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=