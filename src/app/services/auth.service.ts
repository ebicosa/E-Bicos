import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { User } from './../interface/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa : AngularFireAuth) { }

  register(user : User){
    return this.afa.createUserWithEmailAndPassword(user.email,user.password);
  }

  login(user : User){
    return this.afa.signInWithEmailAndPassword(user.email,user.password);
  }

  logout(){
    return this.afa.signOut();
  }
  getAuth(){
    return this.afa;
  }


}
