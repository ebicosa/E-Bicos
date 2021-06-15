import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  private nome_de_perfil:string;
  private e_mail:string;

  public appPages = [
    { title: 'Postar serviço', url: 'inserir-servico', icon: 'briefcase-outline' },
    { title: 'Minha conta', url: 'perfil', icon: 'person-circle-outline' },
    { title: 'Favoritos', url: 'favoritos', icon: 'heart-outline' },
    { title: 'Central de ajuda', url: 'central-ajuda', icon: '' },
    { title: 'Sobre o E-Bicos', url: '', icon: '' },
    { title: 'Dicas de segurança', url: '', icon: '' },
    { title: 'Termos de uso', url: '', icon: '' },
  ];
  
  constructor() {
    if(localStorage.getItem("profile_name") === null){
      localStorage.setItem("profile_name", "Victor Emanuel");
    }
    this.nome_de_perfil = localStorage.getItem("profile_name");
    if(localStorage.getItem("e_mail") === null){
      localStorage.setItem("e_mail", "nome.sobrenome@gmail.com");
    }
    this.e_mail = localStorage.getItem("e_mail");
  }
  ngOnInit() {
    localStorage.setItem("subcategorias", JSON.stringify([{nome: "Eletricista"},{nome: "Encanador"}]));
    localStorage.setItem("categorias", JSON.stringify([{nome: "Construção Civil"},{nome: "Serviços domésticos"}]));
    localStorage.setItem("estados", JSON.stringify( [{nome: "Paraíba"}, { nome: "Acre"}]));
    localStorage.setItem("cidades", JSON.stringify([{nome: "Campina Grande"}, { nome: "Rio Branco"}]));
    localStorage.setItem("faixasPrecos", JSON.stringify( [{minimo: 100, maximo: 1000},{minimo: 1000, maximo:5000}]));
  }
  
}
