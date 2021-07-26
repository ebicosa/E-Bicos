import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  private profile_name:string;

  constructor(private router: Router, private navCtrl:NavController) {
    if (localStorage.getItem("profile_name") === null){
      this.profile_name = "Aryelson Gonçalves";
      localStorage.setItem("profile_name", this.profile_name);
    }
    else{
      this.profile_name = localStorage.getItem("profile_name");
    }
  }

  ngOnInit() {
  }

  onDadosPessoais(obj){
    this.navCtrl.navigateForward("meus-dados");
  }

  onEndereco(obj){
    this.navCtrl.navigateForward("endereco");
  }

  onMeusAnuncios(obj){
    const navigationExtras: NavigationExtras = {
    state: {
      valorParaEnviar: "userId=?",
     }
    };
    this.router.navigate(['servicos'], navigationExtras);
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
