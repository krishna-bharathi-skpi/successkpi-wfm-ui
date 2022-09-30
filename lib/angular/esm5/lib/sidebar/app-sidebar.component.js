import { __decorate, __metadata, __param } from "tslib";
import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, HostBinding, Inject, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { sidebarCssClasses } from '../shared';
import { AppSidebarService } from './app-sidebar.service';
import * as ɵngcc0 from '@angular/core';

var _c0 = ["*"];
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
        this.minimizedChange = new EventEmitter();
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
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: Renderer2 },
        { type: AppSidebarService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AppSidebarComponent.prototype, "compact", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AppSidebarComponent.prototype, "display", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AppSidebarComponent.prototype, "fixed", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AppSidebarComponent.prototype, "offCanvas", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AppSidebarComponent.prototype, "minimized", null);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AppSidebarComponent.prototype, "minimizedChange", void 0);
    __decorate([
        HostBinding('class.sidebar'),
        __metadata("design:type", Object)
    ], AppSidebarComponent.prototype, "sidebarClass", void 0);
    AppSidebarComponent = __decorate([ __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object, Renderer2,
            AppSidebarService])
    ], AppSidebarComponent);
AppSidebarComponent.ɵfac = function AppSidebarComponent_Factory(t) { return new (t || AppSidebarComponent)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(AppSidebarService)); };
AppSidebarComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarComponent, selectors: [["app-sidebar"], ["cui-sidebar"]], hostVars: 2, hostBindings: function AppSidebarComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("sidebar", ctx.sidebarClass);
    } }, inputs: { minimized: "minimized", compact: "compact", display: "display", fixed: "fixed", offCanvas: "offCanvas" }, outputs: { minimizedChange: "minimizedChange" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function AppSidebarComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarComponent, [{
        type: Component,
        args: [{
                selector: 'app-sidebar, cui-sidebar',
                template: "<ng-content></ng-content>"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }, { type: AppSidebarService }]; }, { minimizedChange: [{
            type: Output
        }], sidebarClass: [{
            type: HostBinding,
            args: ['class.sidebar']
        }], minimized: [{
            type: Input
        }], compact: [{
            type: Input
        }], display: [{
            type: Input
        }], fixed: [{
            type: Input
        }], offCanvas: [{
            type: Input
        }] }); })();
    return AppSidebarComponent;
}());
export { AppSidebarComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXIuY29tcG9uZW50LmpzIiwic291cmNlcyI6WyJuZzovQGNvcmV1aS9hbmd1bGFyL2xpYi9zaWRlYmFyL2FwcC1zaWRlYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFNMUQ7SUFnQ0UsNkJBQzRCLFFBQWEsRUFDL0IsUUFBbUIsRUFDbkIsY0FBaUM7UUFGZixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBaENuQyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBcUIzQjs7O1dBR0c7UUFDTyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFFMUIsaUJBQVksR0FBRyxJQUFJLENBQUM7SUFNOUMsQ0FBQztJQXpCTCxzQkFBSSwwQ0FBUzthQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7YUFDRCxVQUFjLEtBQWM7WUFDMUIsbURBQW1EO1lBQ25ELElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxD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Ozs7Ozs7b0JBQ0Q7SUFEQSwwQkFBQztDQUFBLEFBbEdELElBa0dDO1NBbEdZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBzaWRlYmFyQ3NzQ2xhc3NlcyB9IGZyb20gJy4uL3NoYXJlZCc7XHJcbmltcG9ydCB7IEFwcFNpZGViYXJTZXJ2aWNlIH0gZnJvbSAnLi9hcHAtc2lkZWJhci5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXNpZGViYXIsIGN1aS1zaWRlYmFyJyxcclxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBTaWRlYmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbkV2ZW50czogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX21pbmltaXplZCA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBjb21wYWN0OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGRpc3BsYXk6IGFueTtcclxuICBASW5wdXQoKSBmaXhlZDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBvZmZDYW52YXM6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1pbmltaXplZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9taW5pbWl6ZWQ7XHJcbiAgfVxyXG4gIHNldCBtaW5pbWl6ZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIC8vIG9ubHkgdXBkYXRlIC8gZW1pdCBldmVudHMgd2hlbiB0aGUgdmFsdWUgY2hhbmdlc1xyXG4gICAgaWYgKHRoaXMuX21pbmltaXplZCAhPT0gdmFsdWUpIHtcclxuICAgICAgdGhpcy5fbWluaW1pemVkID0gdmFsdWU7XHJcbiAgICAgIHRoaXMuX3VwZGF0ZU1pbmltaXplZCh2YWx1ZSk7XHJcbiAgICAgIHRoaXMubWluaW1pemVkQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgICB0aGlzLnNpZGViYXJTZXJ2aWNlLnRvZ2dsZSh7IG1pbmltaXplOiB2YWx1ZSB9ICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyB3aGVuZXZlciB0aGUgbWluaW1pemVkIHN0YXRlIG9mIHRoZSBzaWRlYmFyIGNoYW5nZXMuXHJcbiAgICogUHJpbWFyaWx5IHVzZWQgdG8gZmFjaWxpdGF0ZSB0d28td2F5IGJpbmRpbmcuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1pbmltaXplZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaWRlYmFyJykgc2lkZWJhckNsYXNzID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIHNpZGViYXJTZXJ2aWNlOiBBcHBTaWRlYmFyU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5kaXNwbGF5QnJlYWtwb2ludCh0aGlzLmRpc3BsYXkpO1xyXG4gICAgdGhpcy5pc0NvbXBhY3QodGhpcy5jb21wYWN0KTtcclxuICAgIHRoaXMuaXNGaXhlZCh0aGlzLmZpeGVkKTtcclxuICAgIHRoaXMuaXNPZmZDYW52YXModGhpcy5vZmZDYW52YXMpO1xyXG4gICAgdGhpcy5zaWRlYmFyU2VydmljZS50b2dnbGUoeyBtaW5pbWl6ZTogdGhpcy5taW5pbWl6ZWQgfSApO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25FdmVudHMgPSB0aGlzLnNpZGViYXJTZXJ2aWNlLmV2ZW50cyQuc3Vic2NyaWJlKGFjdGlvbiA9PiB7XHJcbiAgICAgIGlmIChhY3Rpb24ubWluaW1pemUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGFjdGlvbi5taW5pbWl6ZSA9PT0gJ3RvZ2dsZScgPyB0aGlzLnRvZ2dsZU1pbmltaXplZCgpIDogdGhpcy5taW5pbWl6ZWQgPSAhIWFjdGlvbi5taW5pbWl6ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uRXZlbnRzLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLm1pbmltaXplZENoYW5nZS5jb21wbGV0ZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksICdzaWRlYmFyLWZpeGVkJyk7XHJcbiAgICB0aGlzLl91cGRhdGVNaW5pbWl6ZWQoZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgaXNDb21wYWN0KGNvbXBhY3Q6IGJvb2xlYW4gPSB0aGlzLmNvbXBhY3QpOiB2b2lkIHtcclxuICAgIGlmIChjb21wYWN0KSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAnc2lkZWJhci1jb21wYWN0Jyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc0ZpeGVkKGZpeGVkOiBib29sZWFuID0gdGhpcy5maXhlZCk6IHZvaWQge1xyXG4gICAgaWYgKGZpeGVkKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAnc2lkZWJhci1maXhlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTWluaW1pemVkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5taW5pbWl6ZWQgPSAhdGhpcy5fbWluaW1pemVkO1xyXG4gIH1cclxuXHJcbiAgaXNPZmZDYW52YXMob2ZmQ2FudmFzOiBib29sZWFuID0gdGhpcy5vZmZDYW52YXMpOiB2b2lkIHtcclxuICAgIGlmIChvZmZDYW52YXMpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksICdzaWRlYmFyLW9mZi1jYW52YXMnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpc3BsYXlCcmVha3BvaW50KGRpc3BsYXk6IGFueSA9IHRoaXMuZGlzcGxheSk6IHZvaWQge1xyXG4gICAgaWYgKGRpc3BsYXkgIT09IGZhbHNlKSB7XHJcbiAgICAgIGNvbnN0IGNzc0NsYXNzID0gZGlzcGxheSA/IGBzaWRlYmFyLSR7ZGlzcGxheX0tc2hvd2AgOiBzaWRlYmFyQ3NzQ2xhc3Nlc1swXTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksIGNzc0NsYXNzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZU1pbmltaXplZChtaW5pbWl6ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGNvbnN0IGJvZHkgPSB0aGlzLmRvY3VtZW50LmJvZHk7XHJcblxyXG4gICAgaWYgKG1pbmltaXplZCkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGJvZHksICdzaWRlYmFyLW1pbmltaXplZCcpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGJvZHksICdicmFuZC1taW5pbWl6ZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoYm9keSwgJ3NpZGViYXItbWluaW1pemVkJyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoYm9keSwgJ2JyYW5kLW1pbmltaXplZCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=