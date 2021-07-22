import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { promise } from 'protractor';
import { resolve } from 'dns';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
      private authservice: AuthService,
      private router : Router
    ){}
  canActivate(): Promise<boolean>{
    return new Promise(resolve => {
      this.authservice.getAuth().onAuthStateChanged(user => {
        if (!user) this.router.navigate(['home']);

        resolve(user ? true : false);
      })
    });
  }

}
