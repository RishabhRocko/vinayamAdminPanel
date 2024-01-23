import { Injectable } from '@angular/core';
import { CanActivateFn , } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/admin']);
        return false;
      }
    return true;
  }
}
export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
