import { __decorate, __metadata, __param } from "tslib";
import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, HostBinding, Inject, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { sidebarCssClasses } from '../shared';
import { AppSidebarService } from './app-sidebar.service';
import * as ɵngcc0 from '@angular/core';

const _c0 = ["*"];
let AppSidebarComponent = class AppSidebarComponent {
    constructor(document, renderer, sidebarService) {
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
    get minimized() {
        return this._minimized;
    }
    set minimized(value) {
        // only update / emit events when the value changes
        if (this._minimized !== value) {
            this._minimized = value;
            this._updateMinimized(value);
            this.minimizedChange.emit(value);
            this.sidebarService.toggle({ minimize: value });
        }
    }
    ngOnInit() {
        this.displayBreakpoint(this.display);
        this.isCompact(this.compact);
        this.isFixed(this.fixed);
        this.isOffCanvas(this.offCanvas);
        this.sidebarService.toggle({ minimize: this.minimized });
        this.subscriptionEvents = this.sidebarService.events$.subscribe(action => {
            if (action.minimize !== undefined) {
                action.minimize === 'toggle' ? this.toggleMinimized() : this.minimized = !!action.minimize;
            }
        });
    }
    ngOnDestroy() {
        this.subscriptionEvents.unsubscribe();
        this.minimizedChange.complete();
        this.renderer.removeClass(this.document.body, 'sidebar-fixed');
        this._updateMinimized(false);
    }
    isCompact(compact = this.compact) {
        if (compact) {
            this.renderer.addClass(this.document.body, 'sidebar-compact');
        }
    }
    isFixed(fixed = this.fixed) {
        if (fixed) {
            this.renderer.addClass(this.document.body, 'sidebar-fixed');
        }
    }
    toggleMinimized() {
        this.minimized = !this._minimized;
    }
    isOffCanvas(offCanvas = this.offCanvas) {
        if (offCanvas) {
            this.renderer.addClass(this.document.body, 'sidebar-off-canvas');
        }
    }
    displayBreakpoint(display = this.display) {
        if (display !== false) {
            const cssClass = display ? `sidebar-${display}-show` : sidebarCssClasses[0];
            this.renderer.addClass(this.document.body, cssClass);
        }
    }
    _updateMinimized(minimized) {
        const body = this.document.body;
        if (minimized) {
            this.renderer.addClass(body, 'sidebar-minimized');
            this.renderer.addClass(body, 'brand-minimized');
        }
        else {
            this.renderer.removeClass(body, 'sidebar-minimized');
            this.renderer.removeClass(body, 'brand-minimized');
        }
    }
};
AppSidebarComponent.ɵfac = function AppSidebarComponent_Factory(t) { return new (t || AppSidebarComponent)(ɵngcc0.ɵɵdirectiveInject(DOCUMENT), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(AppSidebarService)); };
AppSidebarComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarComponent, selectors: [["app-sidebar"], ["cui-sidebar"]], hostVars: 2, hostBindings: function AppSidebarComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("sidebar", ctx.sidebarClass);
    } }, inputs: { minimized: "minimized", compact: "compact", display: "display", fixed: "fixed", offCanvas: "offCanvas" }, outputs: { minimizedChange: "minimizedChange" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function AppSidebarComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
AppSidebarComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Renderer2 },
    { type: AppSidebarService }
];
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
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarComponent, [{
        type: Component,
        args: [{
                selector: 'app-sidebar, cui-sidebar',
                template: `<ng-content></ng-content>`
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
export { AppSidebarComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXIuY29tcG9uZW50LmpzIiwic291cmNlcyI6WyJuZzovQGNvcmV1aS9hbmd1bGFyL2xpYi9zaWRlYmFyL2FwcC1zaWRlYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFNMUQsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFnQzlCLFlBQzRCLFFBQWEsRUFDL0IsUUFBbUIsRUFDbkIsY0FBaUM7UUFGZixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBaENuQyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBcUIzQjs7O1dBR0c7UUFDTyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFFMUIsaUJBQVksR0FBRyxJQUFJLENBQUM7SUFNOUMsQ0FBQztJQXpCTCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUNELElBQUksU0FBUyxDQUFDLEtBQWM7UUFDMUIsbURBQW1EO1FBQ25ELElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxl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QUFJLENBQUM7UUFFaEMsSUFBSSxTQUFTLEVBQUU7WUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUNqRDthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7U0FDcEQ7SUFDSCxDQUFDO0NBQ0Y7Ozs7Ozs7NkJBQUE7OzRDQWpFSSxNQUFNLFNBQUMsUUFBUTtZQUNFLFNBQVM7WUFDSCxpQkFBaUI7O0FBOUJsQztJQUFSLEtBQUssRUFBRTs7b0RBQWtCO0FBQ2pCO0lBQVIsS0FBSyxFQUFFOztvREFBYztBQUNiO0lBQVIsS0FBSyxFQUFFOztrREFBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTs7c0RBQW9CO0FBRzVCO0lBREMsS0FBSyxFQUFFOzs7b0RBR1A7QUFlUztJQUFULE1BQU0sRUFBRTs7NERBQStDO0FBRTFCO0lBQTdCLFdBQVcsQ0FBQyxlQUFlLENBQUM7O3lEQUFxQjtBQTlCdkMsbUJBQW1CLGVBQWUsS0FKOUMsU0FBUyxDQUFDLFVBQ1QsekJBR0UsQ0FpQ0MsV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7RUFwQ1gsRUFBRSwwQkFBMEIsVUFDcEMsUUFBUSxFQUFFLExBb0NVLFNBQVM7cUJBcENRLE1BQ3RDLG5CQW9DMkIsaUJBQWlCO0FBcEMzQyxHQUNXLG1CQUFtQixDQWtHL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBQ0Q7U0FuR2EsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IHNpZGViYXJDc3NDbGFzc2VzIH0gZnJvbSAnLi4vc2hhcmVkJztcclxuaW1wb3J0IHsgQXBwU2lkZWJhclNlcnZpY2UgfSBmcm9tICcuL2FwcC1zaWRlYmFyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc2lkZWJhciwgY3VpLXNpZGViYXInLFxyXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcFNpZGViYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uRXZlbnRzOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBfbWluaW1pemVkID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGNvbXBhY3Q6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgZGlzcGxheTogYW55O1xyXG4gIEBJbnB1dCgpIGZpeGVkOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIG9mZkNhbnZhczogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgbWluaW1pemVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX21pbmltaXplZDtcclxuICB9XHJcbiAgc2V0IG1pbmltaXplZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgLy8gb25seSB1cGRhdGUgLyBlbWl0IGV2ZW50cyB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzXHJcbiAgICBpZiAodGhpcy5fbWluaW1pemVkICE9PSB2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9taW5pbWl6ZWQgPSB2YWx1ZTtcclxuICAgICAgdGhpcy5fdXBkYXRlTWluaW1pemVkKHZhbHVlKTtcclxuICAgICAgdGhpcy5taW5pbWl6ZWRDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICAgIHRoaXMuc2lkZWJhclNlcnZpY2UudG9nZ2xlKHsgbWluaW1pemU6IHZhbHVlIH0gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXRzIHdoZW5ldmVyIHRoZSBtaW5pbWl6ZWQgc3RhdGUgb2YgdGhlIHNpZGViYXIgY2hhbmdlcy5cclxuICAgKiBQcmltYXJpbHkgdXNlZCB0byBmYWNpbGl0YXRlIHR3by13YXkgYmluZGluZy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbWluaW1pemVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpZGViYXInKSBzaWRlYmFyQ2xhc3MgPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgc2lkZWJhclNlcnZpY2U6IEFwcFNpZGViYXJTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmRpc3BsYXlCcmVha3BvaW50KHRoaXMuZGlzcGxheSk7XHJcbiAgICB0aGlzLmlzQ29tcGFjdCh0aGlzLmNvbXBhY3QpO1xyXG4gICAgdGhpcy5pc0ZpeGVkKHRoaXMuZml4ZWQpO1xyXG4gICAgdGhpcy5pc09mZkNhbnZhcyh0aGlzLm9mZkNhbnZhcyk7XHJcbiAgICB0aGlzLnNpZGViYXJTZXJ2aWNlLnRvZ2dsZSh7IG1pbmltaXplOiB0aGlzLm1pbmltaXplZCB9ICk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbkV2ZW50cyA9IHRoaXMuc2lkZWJhclNlcnZpY2UuZXZlbnRzJC5zdWJzY3JpYmUoYWN0aW9uID0+IHtcclxuICAgICAgaWYgKGFjdGlvbi5taW5pbWl6ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgYWN0aW9uLm1pbmltaXplID09PSAndG9nZ2xlJyA/IHRoaXMudG9nZ2xlTWluaW1pemVkKCkgOiB0aGlzLm1pbmltaXplZCA9ICEhYWN0aW9uLm1pbmltaXplO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25FdmVudHMudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMubWluaW1pemVkQ2hhbmdlLmNvbXBsZXRlKCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgJ3NpZGViYXItZml4ZWQnKTtcclxuICAgIHRoaXMuX3VwZGF0ZU1pbmltaXplZChmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBpc0NvbXBhY3QoY29tcGFjdDogYm9vbGVhbiA9IHRoaXMuY29tcGFjdCk6IHZvaWQge1xyXG4gICAgaWYgKGNvbXBhY3QpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksICdzaWRlYmFyLWNvbXBhY3QnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzRml4ZWQoZml4ZWQ6IGJvb2xlYW4gPSB0aGlzLmZpeGVkKTogdm9pZCB7XHJcbiAgICBpZiAoZml4ZWQpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksICdzaWRlYmFyLWZpeGVkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b2dnbGVNaW5pbWl6ZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm1pbmltaXplZCA9ICF0aGlzLl9taW5pbWl6ZWQ7XHJcbiAgfVxyXG5cclxuICBpc09mZkNhbnZhcyhvZmZDYW52YXM6IGJvb2xlYW4gPSB0aGlzLm9mZkNhbnZhcyk6IHZvaWQge1xyXG4gICAgaWYgKG9mZkNhbnZhcykge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgJ3NpZGViYXItb2ZmLWNhbnZhcycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzcGxheUJyZWFrcG9pbnQoZGlzcGxheTogYW55ID0gdGhpcy5kaXNwbGF5KTogdm9pZCB7XHJcbiAgICBpZiAoZGlzcGxheSAhPT0gZmFsc2UpIHtcclxuICAgICAgY29uc3QgY3NzQ2xhc3MgPSBkaXNwbGF5ID8gYHNpZGViYXItJHtkaXNwbGF5fS1zaG93YCA6IHNpZGViYXJDc3NDbGFzc2VzWzBdO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgY3NzQ2xhc3MpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlTWluaW1pemVkKG1pbmltaXplZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgY29uc3QgYm9keSA9IHRoaXMuZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgICBpZiAobWluaW1pemVkKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYm9keSwgJ3NpZGViYXItbWluaW1pemVkJyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYm9keSwgJ2JyYW5kLW1pbmltaXplZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhib2R5LCAnc2lkZWJhci1taW5pbWl6ZWQnKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhib2R5LCAnYnJhbmQtbWluaW1pemVkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==