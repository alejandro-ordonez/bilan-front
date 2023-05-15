import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@application/auth/auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    try {
      if (this.authService.isLoggedIn()) {
        this.router.navigateByUrl('/home');
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return true;
    }
  }
}
