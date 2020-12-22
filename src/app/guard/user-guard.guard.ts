import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {RestapiService} from '../service/restapi.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  constructor(private restApi: RestapiService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('we are in canActivate method');

    if (!this.restApi.isUserLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
