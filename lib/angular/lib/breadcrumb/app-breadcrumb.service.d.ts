import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
export declare class AppBreadcrumbService {
    private router;
    private route;
    breadcrumbs: Observable<Array<any>>;
    private breadcrumbSubject;
    constructor(router: Router, route: ActivatedRoute);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AppBreadcrumbService, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJyZWFkY3J1bWIuc2VydmljZS5kLnRzIiwic291cmNlcyI6WyJhcHAtYnJlYWRjcnVtYi5zZXJ2aWNlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUVBOzs7Ozs7O0FBTUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBBcHBCcmVhZGNydW1iU2VydmljZSB7XHJcbiAgICBwcml2YXRlIHJvdXRlcjtcclxuICAgIHByaXZhdGUgcm91dGU7XHJcbiAgICBicmVhZGNydW1iczogT2JzZXJ2YWJsZTxBcnJheTxhbnk+PjtcclxuICAgIHByaXZhdGUgYnJlYWRjcnVtYlN1YmplY3Q7XHJcbiAgICBjb25zdHJ1Y3Rvcihyb3V0ZXI6IFJvdXRlciwgcm91dGU6IEFjdGl2YXRlZFJvdXRlKTtcclxufVxyXG4iXX0=