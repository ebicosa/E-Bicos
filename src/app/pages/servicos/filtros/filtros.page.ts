import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Estado, Cidade } from 'src/app/interface/localidade';

@Component({
  selector: 'app-home',
  templateUrl: 'filtros.page.html',
  styleUrls: ['filtros.page.scss'],
})
export class FiltrosPage implements OnInit {
  private subcategorias:JSON[];
  public estados: Array<Estado>;
  public estado: Estado;
  public cidades: Array<Cidade>;
  public cidade: Cidade;
  public baseURL = 'https://servicodados.ibge.gov.br/api/v1/localidades';
  public data:Date;
  private faixasPrecos:JSON[];
  private selected:JSON[];
  constructor(private router: Router, private navController: NavController) {
    if(localStorage.getItem("subcategorias") === null){
      localStorage.setItem("subcategorias", JSON.stringify([{nome: "Eletricista"},{nome: "Encanador"}]));
    }
    if(localStorage.getItem("faixasPrecos") === null){
      localStorage.setItem("faixasPrecos", JSON.stringify( [{minimo: 100, maximo: 1000},{minimo: 1000, maximo:5000}]));
    }
    this.subcategorias = JSON.parse(localStorage.getItem("subcategorias"));
    this.faixasPrecos = JSON.parse(localStorage.getItem("faixasPrecos"));
    localStorage.setItem("selected_filtrosPage", JSON.stringify([{},{},{},{},]));
    this.selected = JSON.parse(localStorage.getItem("selected_filtrosPage"));
  }

  ngOnInit(){
    fetch(`${this.baseURL}/estados?orderBy=nome`)
      .then(response => response.json())
      .then(result => this.estados = result);
  }

  selectChanged(obj:any, indice:number){
    if(indice === 1){
      this.cidade = undefined;
      document.getElementById("select-cidades").removeAttribute("disabled");
      fetch(`${this.baseURL}/estados/${obj.id}/municipios`)
        .then(response => response.json())
        .then(result => this.cidades = result);
    }
    if(indice === 4) obj = new Date(this.data).toLocaleString();
    this.selected[indice] = obj;
  }

  onFiltrar(){
    localStorage.setItem("selected_filtrosPage", JSON.stringify(this.selected));
    let arraySelected = [];
    let val:any;
    for (let selecionados of this.selected){
      val = JSON.parse(JSON.stringify(selecionados)).nome;
      if(val === undefined){
        
        val = JSON.parse(JSON.stringify(selecionados));
        if(JSON.stringify(val) === "{}")
          val = "undefined";
      }
      arraySelected.push(val);
    }

    const navigationExtras: NavigationExtras = {
      state: {
        valorParaEnviar: arraySelected,
       }
      };
      this.router.navigate(['servicos'], navigationExtras);
  }
}