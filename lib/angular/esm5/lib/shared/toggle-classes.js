import { __decorate, __metadata, __param } from "tslib";
import { Inject, Injectable, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as ɵngcc0 from '@angular/core';
var RemoveClasses = function (NewClassNames) {
    var MatchClasses = NewClassNames.map(function (Class) { return document.body.classList.contains(Class); });
    return MatchClasses.indexOf(true) !== -1;
};
var ɵ0 = RemoveClasses;
export var ToggleClasses = function (Toggle, ClassNames) {
    var Level = ClassNames.indexOf(Toggle);
    var NewClassNames = ClassNames.slice(0, Level + 1);
    if (RemoveClasses(NewClassNames)) {
        NewClassNames.map(function (Class) { return document.body.classList.remove(Class); });
    }
    else {
        document.body.classList.add(Toggle);
    }
};
var ClassToggler = /** @class */ (function () {
    function ClassToggler(document, renderer) {
        this.document = document;
        this.renderer = renderer;
    }
    ClassToggler.prototype.removeClasses = function (NewClassNames) {
        var _this = this;
        var MatchClasses = NewClassNames.map(function (Class) { return _this.document.body.classList.contains(Class); });
        return MatchClasses.indexOf(true) !== -1;
    };
    ClassToggler.prototype.toggleClasses = function (Toggle, ClassNames) {
        var _this = this;
        var Level = ClassNames.indexOf(Toggle);
        var NewClassNames = ClassNames.slice(0, Level + 1);
        if (this.removeClasses(NewClassNames)) {
            NewClassNames.map(function (Class) { return _this.renderer.removeClass(_this.document.body, Class); });
        }
        else {
            this.renderer.addClass(this.document.body, Toggle);
        }
    };
    ClassToggler.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: Renderer2 }
    ]; };
    ClassToggler = __decorate([ __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object, Renderer2])
    ], ClassToggler);
ClassToggler.ɵfac = function ClassToggler_Factory(t) { return new (t || ClassToggler)(ɵngcc0.ɵɵinject(DOCUMENT), ɵngcc0.ɵɵinject(ɵngcc0.Renderer2)); };
ClassToggler.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ClassToggler, factory: function (t) { return ClassToggler.ɵfac(t); } });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ClassToggler, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, null); })();
    return ClassToggler;
}());
export { ClassToggler };
export { ɵ0 };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWNsYXNzZXMuanMiLCJzb3VyY2VzIjpbIm5nOi9AY29yZXVpL2FuZ3VsYXIvbGliL3NoYXJlZC90b2dnbGUtY2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFekMsSUFBTSxhQUFhLEdBQUcsVUFBQyxhQUFhO0lBQ2xDLElBQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQXZDLENBQXVDLENBQUMsQ0FBQztJQUMzRixPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDOztBQUVGLE1BQU0sQ0FBQyxJQUFNLGFBQWEsR0FBRyxVQUFDLE1BQU0sRUFBRSxVQUFVO0lBQzlDLElBQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsSUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRXJELElBQUksYUFBYSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ2hDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQztLQUNyRTtTQUFNO1FBQ0wsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3JDO0FBQ0gsQ0FBQyxDQUFDO0FBR0Y7SUFFRSxzQkFDNEIsUUFBYSxFQUMvQixRQUFtQjtRQURELGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0IsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUMxQixDQUFDO0lBRUosb0NBQWEsR0FBYixVQUFjLGFBQWE7UUFBM0IsaUJBR0M7UUFGQyxJQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFDO1FBQ2hHLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsb0NBQWEsR0FBYixVQUFjLE1BQU0sRUFBRSxVQUFVO1FBQWhDLGlCQVNDO1FBUkMsSUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxJQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFckQsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3JDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBcEQsQ0FBb0QsQ0FBQyxDQUFDO1NBQ3BGO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNwRDtJQUNILENBQUM7O2dEQWxCRSxNQUFNLFNBQUMsUUFBUTtnQkFDRSxTQUFTOztJQUpsQixZQUFZLGVBRWQsU0FIVixVQUFVLEVBQUUsckJBQ0wsQ0FHSCxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtpREFDQyxTQUFTO09BSmxCLFlBQVksQ0FzQnhCOzs7Ozs7Ozs4REFDRDtJQURBLG1CQUFDO0NBQUEsQUF0QkQsSUFzQkM7U0F0QlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuY29uc3QgUmVtb3ZlQ2xhc3NlcyA9IChOZXdDbGFzc05hbWVzKSA9PiB7XHJcbiAgY29uc3QgTWF0Y2hDbGFzc2VzID0gTmV3Q2xhc3NOYW1lcy5tYXAoKENsYXNzKSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhDbGFzcykpO1xyXG4gIHJldHVybiBNYXRjaENsYXNzZXMuaW5kZXhPZih0cnVlKSAhPT0gLTE7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgVG9nZ2xlQ2xhc3NlcyA9IChUb2dnbGUsIENsYXNzTmFtZXMpID0+IHtcclxuICBjb25zdCBMZXZlbCA9IENsYXNzTmFtZXMuaW5kZXhPZihUb2dnbGUpO1xyXG4gIGNvbnN0IE5ld0NsYXNzTmFtZXMgPSBDbGFzc05hbWVzLnNsaWNlKDAsIExldmVsICsgMSk7XHJcblxyXG4gIGlmIChSZW1vdmVDbGFzc2VzKE5ld0NsYXNzTmFtZXMpKSB7XHJcbiAgICBOZXdDbGFzc05hbWVzLm1hcCgoQ2xhc3MpID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShDbGFzcykpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoVG9nZ2xlKTtcclxuICB9XHJcbn07XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDbGFzc1RvZ2dsZXIge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICApIHt9XHJcblxyXG4gIHJlbW92ZUNsYXNzZXMoTmV3Q2xhc3NOYW1lcykge1xyXG4gICAgY29uc3QgTWF0Y2hDbGFzc2VzID0gTmV3Q2xhc3NOYW1lcy5tYXAoKENsYXNzKSA9PiB0aGlzLmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKENsYXNzKSk7XHJcbiAgICByZXR1cm4gTWF0Y2hDbGFzc2VzLmluZGV4T2YodHJ1ZSkgIT09IC0xO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQ2xhc3NlcyhUb2dnbGUsIENsYXNzTmFtZXMpIHtcclxuICAgIGNvbnN0IExldmVsID0gQ2xhc3NOYW1lcy5pbmRleE9mKFRvZ2dsZSk7XHJcbiAgICBjb25zdCBOZXdDbGFzc05hbWVzID0gQ2xhc3NOYW1lcy5zbGljZSgwLCBMZXZlbCArIDEpO1xyXG5cclxuICAgIGlmICh0aGlzLnJlbW92ZUNsYXNzZXMoTmV3Q2xhc3NOYW1lcykpIHtcclxuICAgICAgTmV3Q2xhc3NOYW1lcy5tYXAoKENsYXNzKSA9PiB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgQ2xhc3MpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCBUb2dnbGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=