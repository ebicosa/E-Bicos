import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Estado, Cidade } from 'src/app/interface/localidade';

@Component({
  selector: 'app-home',
  templateUrl: 'filtros.page.html',
  styleUrls: ['filtros.page.scss'],
})

export class FiltrosPage implements OnInit {
  private subcategorias: Array<any>;
  public estados: Array<Estado>;
  public estado: Estado;
  public cidades: Array<Cidade>;
  public cidade: Cidade;
  public baseURL = 'https://servicodados.ibge.gov.br/api/v1/localidades';
  public data:Date;
  private faixasPrecos:JSON[];
  private selected:JSON[];

  constructor(private router: Router, private http: HttpClient) {
    this.subcategorias = new Array<any>();
    this.http.get('https://raw.githubusercontent.com/Isaiasdd/utils/master/profissoes.json')
      .subscribe(data => {
        const subcategorias = JSON.parse(JSON.stringify(data)).profissoes;
        subcategorias.forEach(elemento => {
          this.subcategorias.push({ nome: elemento });
        });
      }
    )
    this.faixasPrecos = JSON.parse(localStorage.getItem("faixasPrecos"));
    localStorage.setItem("selected_filtrosPage", JSON.stringify([{},{},{},{},]));
    this.selected = JSON.parse(localStorage.getItem("selected_filtrosPage"));
  }

  ngOnInit(){}

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
    if(this.router.url.endsWith("meusAnuncios"))
      this.router.navigate(['servicos/meusAnuncios'], navigationExtras);
    else
      this.router.navigate(['servicos'], navigationExtras);
  }
}