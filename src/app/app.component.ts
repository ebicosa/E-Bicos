import { AuthService } from './services/auth.service';
import {LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  public loading: any;

  public appPages = [
    { title: 'Serviços', url: 'servicos', icon: 'briefcase-outline' },
    { title: 'Postar serviço', url: 'inserir-servico', icon: 'medkit-outline' },
    { title: 'Minha conta', url: 'perfil', icon: 'person-circle-outline' },
    { title: 'Favoritos', url: 'favoritos', icon: 'heart-outline' },
    { title: 'Descadastrar', url : 'cancelar-cadastro',icon: 'close-outline'},
    { title: 'Central de ajuda', url: 'central-ajuda', icon: '' },
    { title: 'Sobre o E-Bicos', url: 'quem-somos', icon: '' },
    { title: 'Dicas de segurança', url: '', icon: '' },
    { title: 'Termos de uso', url: 'termos-de-uso', icon: '' },
  ];

  private nome_de_perfil: string;
  private e_mail: string;
  private subcategorias: Array<any> = new Array<any>();


  constructor(private loadingCtrl: LoadingController,
    private authservice: AuthService) {
    if(localStorage.getItem('profile_name') === null){
      localStorage.setItem('profile_name', 'Usuario Logado');
    }
    this.nome_de_perfil = localStorage.getItem('profile_name');
    if(localStorage.getItem('e_mail') === null){
      localStorage.setItem('e_mail', 'exemple@gmail.com');
    }
    this.e_mail = localStorage.getItem('e_mail');
  }
  ngOnInit() {
    localStorage.setItem('categorias', JSON.stringify([
      {nome: 'Assistência Técnica'},
      {nome: 'Aulas de reforço'},
      {nome: 'Automóveis'},
      {nome: 'Construção Civil'},
      {nome: 'Controle de Pragas'},
      {nome: 'Eventos'},
      {nome: 'Programação'},
      {nome: 'Serviços Domésticos'}]));
    localStorage.setItem('faixasPrecos', JSON.stringify([
      {minimo: "R$ 0,00", maximo: "R$ 100,00"},
      {minimo: "R$ 100,00", maximo: "R$ 1000,00"},
      {minimo: "R$ 1000,00", maximo: "R$ 5000,00"},
      {minimo: "A combinar", maximo: "A combinar"}
    ]));
  }

  async logout(){
    await this.presentLoading();
    try{
      await this.authservice.logout();
    } catch(error){
      console.log(error);
    } finally{
      this.loading.dismiss();
    }
  }

  async presentLoading(){
    this.loading = await this.loadingCtrl.create({message:"Por favor, aguarde ..."});
    await this.loading.present();
  }

}
