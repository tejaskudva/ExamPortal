import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginserviceService } from './loginservice.service';

@Injectable({
  providedIn: 'root'
})

export class NormalGuard implements CanActivate {

  constructor(private login: LoginserviceService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      if(this.login.isLoggedIn() && this.login.getUserRole() == "NORMAL"){
        return true
      } else{
        this.router.navigate(['login'])
        return false
      }      
  }

}
