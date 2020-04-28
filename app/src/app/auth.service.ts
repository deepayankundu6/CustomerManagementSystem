import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  valid;
  constructor(private _router: Router) {
    this.valid = false;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {

    if (!this.valid) {
      alert("Please Login First");
      this._router.navigateByUrl('')
    }
    return this.valid;
  }
  login() {
    this.valid = true;
  }
  logout() {
    this.valid = false;
  }
}
