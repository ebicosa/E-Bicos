import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'filtros.page.html',
  styleUrls: ['filtros.page.scss'],
})
export class FiltrosPage {
  private subcategorias:JSON[];
  private estados:JSON[];
  private cidades:JSON[];
  private faixasPrecos:JSON[];
  private selected:Array<Object>;
  constructor() {
    if(localStorage.getItem("subcategorias") === null){
      localStorage.setItem("subcategorias", JSON.stringify([{nome: "Eletricista"},{nome: "Encanador"}]));
    }
    if(localStorage.getItem("estados") === null){
      localStorage.setItem("estados", JSON.stringify( [{nome: "Paraíba"}, { nome: "Acre"}]));
    }
    if(localStorage.getItem("cidades") === null){
      localStorage.setItem("cidades", JSON.stringify([{nome: "Campina Grande"}, { nome: "Rio Branco"}]));
    }
    if(localStorage.getItem("faixasPrecos") === null){
      localStorage.setItem("faixasPrecos", JSON.stringify( [{minimo: 100, maximo: 1000},{minimo: 1000, maximo:5000}]));
    }
    this.subcategorias = JSON.parse(localStorage.getItem("subcategorias"));
    this.estados = JSON.parse(localStorage.getItem("estados"));
    this.cidades = JSON.parse(localStorage.getItem("cidades"));
    this.faixasPrecos = JSON.parse(localStorage.getItem("faixasPrecos"));
    localStorage.setItem("selected_filtrosPage", JSON.stringify([{},{},{},{},]));
    this.selected = JSON.parse(localStorage.getItem("selected_filtrosPage"));
  }

  selectChanged(obj, indice:number){
    if(indice === 4){
      obj = new DatePipe('en-US').transform(Date.parse(obj.toString()), 'MM/dd/YYYY');
    }
    this.selected[indice] = obj;
  }

  onFiltrar(){
    this.selected.forEach(element => {
      console.log(element);
    });
    localStorage.setItem("selected_filtrosPage", JSON.stringify(this.selected));
    alert("Filtrado com sucesso!");
  }
}