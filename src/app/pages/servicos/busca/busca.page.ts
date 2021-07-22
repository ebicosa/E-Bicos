import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private alertController: AlertController, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        this.opcaoSelecionada = getNav.extras.state.valorParaEnviar;
      }
    });
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

  selectChanged(event: any) {
    this.estadoSelecionado = event.detail.value;
    this.cidades = this.estadoSelecionado.cidades;
  }

}
