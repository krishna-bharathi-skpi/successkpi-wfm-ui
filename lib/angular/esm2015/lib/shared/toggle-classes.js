import { __decorate, __metadata, __param } from "tslib";
import { Inject, Injectable, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as ɵngcc0 from '@angular/core';
const RemoveClasses = (NewClassNames) => {
    const MatchClasses = NewClassNames.map((Class) => document.body.classList.contains(Class));
    return MatchClasses.indexOf(true) !== -1;
};
const ɵ0 = RemoveClasses;
export const ToggleClasses = (Toggle, ClassNames) => {
    const Level = ClassNames.indexOf(Toggle);
    const NewClassNames = ClassNames.slice(0, Level + 1);
    if (RemoveClasses(NewClassNames)) {
        NewClassNames.map((Class) => document.body.classList.remove(Class));
    }
    else {
        document.body.classList.add(Toggle);
    }
};
let ClassToggler = class ClassToggler {
    constructor(document, renderer) {
        this.document = document;
        this.renderer = renderer;
    }
    removeClasses(NewClassNames) {
        const MatchClasses = NewClassNames.map((Class) => this.document.body.classList.contains(Class));
        return MatchClasses.indexOf(true) !== -1;
    }
    toggleClasses(Toggle, ClassNames) {
        const Level = ClassNames.indexOf(Toggle);
        const NewClassNames = ClassNames.slice(0, Level + 1);
        if (this.removeClasses(NewClassNames)) {
            NewClassNames.map((Class) => this.renderer.removeClass(this.document.body, Class));
        }
        else {
            this.renderer.addClass(this.document.body, Toggle);
        }
    }
};
ClassToggler.ɵfac = function ClassToggler_Factory(t) { return new (t || ClassToggler)(ɵngcc0.ɵɵinject(DOCUMENT), ɵngcc0.ɵɵinject(ɵngcc0.Renderer2)); };
ClassToggler.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ClassToggler, factory: ClassToggler.ɵfac });
ClassToggler.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Renderer2 }
];
ClassToggler = __decorate([ __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object, Renderer2])
], ClassToggler);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ClassToggler, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: ɵngcc0.Renderer2 }]; }, null); })();
export { ClassToggler };
export { ɵ0 };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWNsYXNzZXMuanMiLCJzb3VyY2VzIjpbIm5nOi9AY29yZXVpL2FuZ3VsYXIvbGliL3NoYXJlZC90b2dnbGUtY2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFekMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxhQUFhLEVBQUUsRUFBRTtJQUN0QyxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMzRixPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDOztBQUVGLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRTtJQUNsRCxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVyRCxJQUFJLGFBQWEsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUNoQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNyRTtTQUFNO1FBQ0wsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3JDO0FBQ0gsQ0FBQyxDQUFDO0FBR0YsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUV2QixZQUM0QixRQUFhLEVBQy9CLFFBQW1CO1FBREQsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUMvQixhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQzFCLENBQUM7SUFFSixhQUFhLENBQUMsYUFBYTtRQUN6QixNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDaEcsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxhQUFhLENBQUMsTUFBTSxFQUFFLFVBQVU7UUFDOUIsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFckQsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3JDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDcEY7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztDQUNGOztvR0FBQTs7NENBbkJJLE1BQU0sU0FBQyxRQUFRO1lBQ0UsU0FBUzs7QUFKbEIsWUFBWSxlQUVkLEtBSFYsVUFBVSxFQUFFLGpCQUNULENBR0MsV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7NkNBQ0MsU0FBUztHQUpsQixZQUFZLENBc0J4Qjs7Ozs7OzhEQUNEO1NBdkJhLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgUmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmNvbnN0IFJlbW92ZUNsYXNzZXMgPSAoTmV3Q2xhc3NOYW1lcykgPT4ge1xyXG4gIGNvbnN0IE1hdGNoQ2xhc3NlcyA9IE5ld0NsYXNzTmFtZXMubWFwKChDbGFzcykgPT4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoQ2xhc3MpKTtcclxuICByZXR1cm4gTWF0Y2hDbGFzc2VzLmluZGV4T2YodHJ1ZSkgIT09IC0xO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IFRvZ2dsZUNsYXNzZXMgPSAoVG9nZ2xlLCBDbGFzc05hbWVzKSA9PiB7XHJcbiAgY29uc3QgTGV2ZWwgPSBDbGFzc05hbWVzLmluZGV4T2YoVG9nZ2xlKTtcclxuICBjb25zdCBOZXdDbGFzc05hbWVzID0gQ2xhc3NOYW1lcy5zbGljZSgwLCBMZXZlbCArIDEpO1xyXG5cclxuICBpZiAoUmVtb3ZlQ2xhc3NlcyhOZXdDbGFzc05hbWVzKSkge1xyXG4gICAgTmV3Q2xhc3NOYW1lcy5tYXAoKENsYXNzKSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoQ2xhc3MpKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFRvZ2dsZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2xhc3NUb2dnbGVyIHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgKSB7fVxyXG5cclxuICByZW1vdmVDbGFzc2VzKE5ld0NsYXNzTmFtZXMpIHtcclxuICAgIGNvbnN0IE1hdGNoQ2xhc3NlcyA9IE5ld0NsYXNzTmFtZXMubWFwKChDbGFzcykgPT4gdGhpcy5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhDbGFzcykpO1xyXG4gICAgcmV0dXJuIE1hdGNoQ2xhc3Nlcy5pbmRleE9mKHRydWUpICE9PSAtMTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUNsYXNzZXMoVG9nZ2xlLCBDbGFzc05hbWVzKSB7XHJcbiAgICBjb25zdCBMZXZlbCA9IENsYXNzTmFtZXMuaW5kZXhPZihUb2dnbGUpO1xyXG4gICAgY29uc3QgTmV3Q2xhc3NOYW1lcyA9IENsYXNzTmFtZXMuc2xpY2UoMCwgTGV2ZWwgKyAxKTtcclxuXHJcbiAgICBpZiAodGhpcy5yZW1vdmVDbGFzc2VzKE5ld0NsYXNzTmFtZXMpKSB7XHJcbiAgICAgIE5ld0NsYXNzTmFtZXMubWFwKChDbGFzcykgPT4gdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksIENsYXNzKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgVG9nZ2xlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19