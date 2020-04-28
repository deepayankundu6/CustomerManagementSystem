import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminCheckService implements CanActivate {
  admin
  constructor(private _router: Router) {
    this.admin = false;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {

    if (!this.admin) {
      alert("Please Login as Admin First");
      this._router.navigateByUrl('')
    }

    return this.admin;
  }
  setAdmin() {
    this.admin = true;
  }
}
