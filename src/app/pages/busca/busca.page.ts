import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage implements OnInit {

  opcaoSelecionada = 'localizacao';
  estadoSelecionado = {
    nome: '',
    cidades: []
  };

  estados = [
    {
      nome: 'Paraíba',
      cidades: ['Campina Grande', 'João Pessoa']
    },
    {
      nome: 'Pernambuco',
      cidades: ['Recife', 'Caruaru']
    },
  ];
  cidades = [];

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async alert(mensagem: string) {
    const alert = await this.alertController.create({
      message: mensagem,
      buttons: ['OK']
    });

    alert.present();
  }

  selectChanged(event: any) {
    this.estadoSelecionado = event.detail.value;
    this.cidades = this.estadoSelecionado.cidades;
  }

}
