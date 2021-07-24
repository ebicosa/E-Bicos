import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Estado, Cidade } from '../../../interface/localidade';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.page.html',
  styleUrls: ['./localizacao.page.scss'],
})
export class LocalizacaoPage implements OnInit {

  estados: Array<Estado>;
  estado: Estado;

  cidades: Array<Cidade>;
  cidade: Cidade;

  baseURL = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private navController: NavController, private alertController: AlertController) { }

  ngOnInit() {
    fetch(`${this.baseURL}/estados?orderBy=nome`)
      .then(response => response.json())
      .then(result => this.estados = result);
  }

  selectChanged(event: any) {
    const { id } = event.detail.value;
    this.cidade = undefined;

    fetch(`${this.baseURL}/estados/${id}/municipios`)
      .then(response => response.json())
      .then(result => this.cidades = result);
  }

  async alert() {
    const alert = await this.alertController.create({
      message: 'Selecione uma cidade!',
      buttons: ['OK']
    });

    alert.present();
  }

  onSubmit() {
    if (!this.cidade) {
      this.alert();
    } else {
      this.navController.navigateForward(`servicos?estado=${this.estado.nome}&cidade=${this.cidade.nome}`);
    }
  }

}
