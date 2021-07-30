import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './../interface/user';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore) {}


  register(user: User){
    return this.afa.createUserWithEmailAndPassword(user.email,user.password);

  }

  login(user: User){
    return this.afa.signInWithEmailAndPassword(user.email,user.password);
  }

  logout(){
    return this.afa.signOut();
  }

  getAuth(){
    return this.afa;
  }

  update(user: User, id: any){
    return this.afs.collection('Users').doc(id).update({nome: user.nome,genero: user.genero,data: user.data});
  }

  updateContato(user: User, id: any){
    return this.afs.collection('Users').doc(id).update({emailSec: user.emailSec,insta: user.insta,celular: user.celular});
  }
  updateEndereco(user: User, id: any){
    this.afs.collection('Users').doc(id).update({cep: user.cep,rua: user.rua});
    return this.afs.collection('Users').doc(id).update({numero: user.numero,complemento: user.complemento, bairro: user.bairro});
  }

  async getUser(){
    return (await this.afa.currentUser).uid;
  }

}
