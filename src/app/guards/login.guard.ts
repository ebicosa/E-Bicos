import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authservice: AuthService,
    private router : Router
  ){}
canActivate(): Promise<boolean>{
  return new Promise(resolve => {
    this.authservice.getAuth().onAuthStateChanged(user => {
      if (user) this.router.navigate(['servicos']);

      resolve(!user ? true : false);
    })
  });
}

}
