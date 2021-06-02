import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  nome_de_perfil = "Victor Emanuel";
  e_mail = "nome.sobrenome@servidor.com";

  public appPages = [
    { title: 'Postar serviço', url: '', icon: 'briefcase-outline' },
    { title: 'Minha conta', url: 'perfil', icon: 'person-circle-outline' },
    { title: 'Favoritos', url: '', icon: 'heart-outline' },
    { title: 'Central de ajuda', url: '', icon: '' },
    { title: 'Sobre o E-Bicos', url: '', icon: '' },
    { title: 'Dicas de segurança', url: '', icon: '' },
    { title: 'Termos de uso', url: '', icon: '' },
  ];
  
  constructor() {}
}
