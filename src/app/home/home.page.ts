import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl : NavController) {}


  showPageEntrar(){
    this.navCtrl.navigateForward('entrar');
  }
  showPageCadastro(){
    this.navCtrl.navigateForward('cadastro');
  }
}
