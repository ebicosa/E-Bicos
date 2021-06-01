import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'filtros.page.html',
  styleUrls: ['filtros.page.scss'],
})
export class FiltrosPage {

  subcategorias = [{nome: "Eletricista"},{nome: "Encanador"}];
  estados = [{nome: "Paraíba"}, { nome: "Acre"}];
  cidades = [{nome: "Campina Grande"}, { nome: "Rio Branco"}];
  faixasPrecos = [{minimo: 100, maximo: 1000},{minimo: 1000, maximo:5000}];
  selected = [{},{},{},{}, {}];
  constructor() {}

  selectChanged(obj, indice:number){
    this.selected[indice] = obj;
  }

  onFiltrar(){
    this.selected.forEach(element => {
      console.log(element);
    });
    alert("Filtrado com sucesso!");
  }
}