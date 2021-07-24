import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.page.html',
  styleUrls: ['./localizacao.page.scss'],
})
export class LocalizacaoPage implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

  selectChanged(event: any) {
    this.estadoSelecionado = event.detail.value;
    this.cidades = this.estadoSelecionado.cidades;
  }

}
