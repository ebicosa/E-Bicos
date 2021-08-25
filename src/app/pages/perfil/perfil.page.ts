import { promise } from 'protractor';
import { resolve } from 'dns';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './../../interface/user';
import { AuthService } from './../../services/auth.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  private profile_name: any;
  private id: any;
  private user: User;

  constructor(private router: Router, private navCtrl: NavController,
    private authservice: AuthService, private afs: AngularFirestore) {
      //Utilizando funçao getUser() para retornar Promise com ID do usuario logado no sistema
    const dado = this.authservice.getUser();
    Promise.resolve(dado).then(result => {
        this.id = result;
        //Utilizando afs do AngularFirestore para retornar informaçoes do usuario logado no sistema
        this.afs.collection('Users').doc(this.id).valueChanges().subscribe(result => {
          this.user = result;
          this.profile_name = this.user.nome;
        });
    });

    }

  ngOnInit() {
  }


  onDadosPessoais(obj){
    this.navCtrl.navigateForward("meus-dados");
  }

  onEndereco(obj){
    this.navCtrl.navigateForward("endereco");
  }

  async onMeusAnuncios(obj){
    const navigationExtras: NavigationExtras = {
    state: {
      valorParaEnviar: `${this.id}`,
     }
    };
    this.router.navigate(['servicos/meusAnuncios'], navigationExtras);
  }

  onContatos(obj){
    this.navCtrl.navigateForward("contatos");
  }

  onFavoritos(obj){
    this.navCtrl.navigateForward("favoritos");
  }

  onCertificados(obj){
    alert("Certificados está em construção!");
  }
}
