import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.page.html',
  styleUrls: ['./entrar.page.scss'],
})
export class EntrarPage implements OnInit {

  usuario  = {
    email: '',
    password: ''
  };
  usuarios: any[] = [];

  constructor(private navCtrl : NavController ,
    private alertCtrl : AlertController) {
    let userJson = localStorage.getItem("user");

    if (userJson != null){
      this.usuarios = JSON.parse(userJson);
    }

   }

  ngOnInit() {
  }

  showPageCadastrar(){
    this.navCtrl.navigateForward("cadastro");
  }

  returnPagehome(){
    this.navCtrl.navigateBack("home");
  }

  onSubmitTemplate(){
    console.log('Form submit');
    console.log(this.usuario);
    this.navCtrl.navigateForward("servicos");
  }

  async alert(){
    const alert = await this.alertCtrl.create({
      header: 'Informação',
      message: 'No momento essa pagina está em construção !',
      mode: "ios"
    });
    await alert.present();

  }

}
