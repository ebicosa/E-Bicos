import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.page.html',
  styleUrls: ['./contatos.page.scss'],
})
export class ContatosPage implements OnInit {

  usuario  = {

    email: 'teste@gmail.com',
    emailSec:'',
    insta: '',
    celular: '',
    fixo: ''

  };

  constructor() { }

  ngOnInit() {
  }

  onSubmitTemplate(){
    console.log('Form submit');
    console.log(this.usuario);
  }
}
