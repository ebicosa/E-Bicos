import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(private alertController: AlertController) {
  }

  ngOnInit() {
  }

  async alert(mensagem: string) {
    const alert = await this.alertController.create({
      message: mensagem,
      buttons: ['OK']
    });

    alert.present();
  }

}
