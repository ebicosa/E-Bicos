import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  private profile_name:string;

  constructor() { 
    if (localStorage.getItem("profile_name") === null){
      this.profile_name = "Victor Emanuel";
      localStorage.setItem("profile_name", this.profile_name);
    }
    else{
      this.profile_name = localStorage.getItem("profile_name");
    }
  }

  ngOnInit() {
  }

  onDadosPessoais(obj){
    alert("Dados pessoais está em construção!");
  }
  
  onEndereco(obj){
    alert("Endereço está em construção!");
  }

  onMeusAnuncios(obj){
    alert("Meus anúncios está em construção!");
  }

  onContatos(obj){
    alert("Contatos está em construção!");
  }

  onFavoritos(obj){
    alert("Favoritos está em construção!");
  }

  onCertificados(obj){
    alert("Certificados está em construção!");
  }
}
