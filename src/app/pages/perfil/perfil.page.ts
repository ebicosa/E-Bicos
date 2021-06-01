import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  profile_name = "Victor Emanuel";
  constructor() { }

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
