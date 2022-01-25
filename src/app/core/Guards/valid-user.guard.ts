import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidUserGuard implements CanActivate {
  /**
   *
   */
  constructor(private _AuthService:AuthService,private _Router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this._AuthService.user.getValue() != null){
        return true
      }
      else{
        this._Router.navigate(['/login']
        // ,{ queryParams: { returnUrl: state.url } }
        );
        return false;
      }
  }

}
