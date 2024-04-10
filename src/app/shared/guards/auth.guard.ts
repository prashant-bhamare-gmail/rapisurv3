import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import {
  AuthService,
  WebStorageService,
  EStorageTarget,
} from '../services/public-api';

/**
 * Simple guard to project all routes for authenticated users.
 * Supports canActivate and redirects to login if user is not authenticated.
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private storageService: WebStorageService,
    private router: Router,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = this.authService.authenticated;
    console.log('isAuthenticated', isAuthenticated);
    if (!isAuthenticated) {
      const originalPath = next.url[0].path;
      this.storageService.setItem(
        'original_route_path',
        originalPath,
        { target: EStorageTarget.Memory },
      );
      this.router.navigate(['/login']);
      return false;
    }
    // We will refractor this when we add roles

    if (isAuthenticated) {
      const routeRole = next.data['role'];
      const userRole = Number(this.authService.permissions.viewPermissions.find((element) => {
        return element.pageName === routeRole
      }).actionStatus) === 1 ? true : false;;
      if (!userRole) {
        this.router.navigate(['404']);
        return false;
      }
    }
    return true;
  }
}
