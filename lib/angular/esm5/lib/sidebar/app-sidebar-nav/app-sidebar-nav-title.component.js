import { __decorate, __metadata } from "tslib";
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
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
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AppSidebarNavTitleComponent.prototype, "item", void 0);
    AppSidebarNavTitleComponent = __decorate([ __metadata("design:paramtypes", [ElementRef,
            Renderer2])
    ], AppSidebarNavTitleComponent);
AppSidebarNavTitleComponent.ɵfac = function AppSidebarNavTitleComponent_Factory(t) { return new (t || AppSidebarNavTitleComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
AppSidebarNavTitleComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AppSidebarNavTitleComponent, selectors: [["app-sidebar-nav-title"], ["cui-sidebar-nav-title"]], inputs: { item: "item" }, decls: 0, vars: 0, template: function AppSidebarNavTitleComponent_Template(rf, ctx) { }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AppSidebarNavTitleComponent, [{
        type: Component,
        args: [{
                selector: 'app-sidebar-nav-title, cui-sidebar-nav-title',
                template: ''
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }]; }, { item: [{
            type: Input
        }] }); })();
    return AppSidebarNavTitleComponent;
}());
export { AppSidebarNavTitleComponent };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGViYXItbmF2LXRpdGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZXMiOlsibmc6L0Bjb3JldWkvYW5ndWxhci9saWIvc2lkZWJhci9hcHAtc2lkZWJhci1uYXYvYXBwLXNpZGViYXItbmF2LXRpdGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBTTlFO0lBR0UscUNBQ1UsRUFBYyxFQUNkLFFBQW1CO1FBRG5CLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQzFCLENBQUM7SUFFSiw4Q0FBUSxHQUFSO1FBQ0UsSUFBTSxhQUFhLEdBQWdCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBQ3pELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEQsSUFBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRztZQUNyQixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDaEQ7UUFFRCxJQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFHO1lBQ3ZCLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDbkQ7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7SUFFTyxnREFBVSxHQUFsQixVQUFtQixPQUFPLEVBQUUsT0FBTztRQUNqQyxJQUFJLE9BQU8sRUFBRTtZQUNYLEtBQUssSUFBTSxJQUFJLElBQUksT0FBTyxFQUFFO2dCQUMxQixJQUFJLElBQUksS0FBSyxPQUFPLElBQUksT0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRztvQkFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ3ZDO3FCQUFNLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtvQkFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ3ZDO3FCQUFNO29CQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDOUM7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVPLDhDQUFRLEdBQWhCLFVBQWlCLE1BQU0sRUFBRSxFQUFFO1FBQ3pCLEtBQUssSUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFFLENBQUM7U0FDbkQ7SUFDSCxDQUFDO0lBRU8sOENBQVEsR0FBaEIsVUFBaUIsT0FBTyxFQUFFLEVBQUU7UUFBNUIsaUJBS0M7UUFKQyxJQUFNLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNFLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87WUFDaEUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBRSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLCtDQUFTLEdBQWpCLFVBQWtCLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBRSxDQUFDO0lBQzlDLENBQUM7O2dCQXBEYSxVQUFVO2dCQUNKLFNBQVM7O0lBSnBCO1FBQVIsS0FBSyxFQUFFOzs2REFBVztJQURSLDJCQUEyQixlQUFlLFNBSnRELFNBQVMsQ0FBQyxjQUNULFFBQVEsRUFBRSwzQ0FHSixrQ0FJUSxVQUFVO1lBQ0osU0FBUzttQkFSMkIsY0FDeEQsMUJBRVcsMkJBQTJCLENBeUR2QztJQTNEUyxFQUFFLEVBQUUsVUFDYixDQUFDOzs7Ozs7Ozs7O29CQTJERjtJQURBLGtDQUFDO0NBQUEsQUF6REQsSUF5REM7U0F6RFksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zaWRlYmFyLW5hdi10aXRsZSwgY3VpLXNpZGViYXItbmF2LXRpdGxlJyxcclxuICB0ZW1wbGF0ZTogJycsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBTaWRlYmFyTmF2VGl0bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGl0ZW06IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBuYXRpdmVFbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQodGhpcy5pdGVtLm5hbWUpO1xyXG5cclxuICAgIGlmICggdGhpcy5pdGVtLmNsYXNzICkge1xyXG4gICAgICBjb25zdCBjbGFzc2VzID0gdGhpcy5pdGVtLmNsYXNzO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG5hdGl2ZUVsZW1lbnQsIGNsYXNzZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggdGhpcy5pdGVtLndyYXBwZXIgKSB7XHJcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQodGhpcy5pdGVtLndyYXBwZXIuZWxlbWVudCk7XHJcbiAgICAgIHRoaXMuYWRkQXR0cmlicyh0aGlzLml0ZW0ud3JhcHBlci5hdHRyaWJ1dGVzLCB3cmFwcGVyKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh3cmFwcGVyLCBuYW1lKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChuYXRpdmVFbGVtZW50LCB3cmFwcGVyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobmF0aXZlRWxlbWVudCwgbmFtZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZEF0dHJpYnMoYXR0cmlicywgZWxlbWVudCkge1xyXG4gICAgaWYgKGF0dHJpYnMpIHtcclxuICAgICAgZm9yIChjb25zdCBhdHRyIGluIGF0dHJpYnMpIHtcclxuICAgICAgICBpZiAoYXR0ciA9PT0gJ3N0eWxlJyAmJiB0eXBlb2YoYXR0cmlic1thdHRyXSkgPT09ICdvYmplY3QnICkge1xyXG4gICAgICAgICAgdGhpcy5zZXRTdHlsZShhdHRyaWJzW2F0dHJdLCBlbGVtZW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGF0dHIgPT09ICdjbGFzcycpIHtcclxuICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoYXR0cmlic1thdHRyXSwgZWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc2V0QXR0cmliKGF0dHIsIGF0dHJpYnNbYXR0cl0sIGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRTdHlsZShzdHlsZXMsIGVsKSB7XHJcbiAgICBmb3IgKGNvbnN0IHN0eWxlIGluIHN0eWxlcykge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsLCBzdHlsZSwgc3R5bGVzW3N0eWxlXSApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRDbGFzcyhjbGFzc2VzLCBlbCkge1xyXG4gICAgY29uc3QgY2xhc3NBcnJheSA9IChBcnJheS5pc0FycmF5KGNsYXNzZXMpID8gY2xhc3NlcyA6IGNsYXNzZXMuc3BsaXQoJyAnKSk7XHJcbiAgICBjbGFzc0FycmF5LmZpbHRlcigoZWxlbWVudCkgPT4gZWxlbWVudC5sZW5ndGggPiAwKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsLCBlbGVtZW50ICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0QXR0cmliKGtleSwgdmFsdWUsIGVsKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbCwga2V5LCB2YWx1ZSApO1xyXG4gIH1cclxufVxyXG4iXX0=