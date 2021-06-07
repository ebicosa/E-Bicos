import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
})
export class MeusDadosPage implements OnInit {

  genero:String = "Masculino";
  public generos : Array<any> = [
    { id: "M", text: "Masculino" },
    { id: "F", text: "Feminino" },
    { id: "O", text: "Outro" }
  ]


  onChange(event){
    this.usuario.genero = (event.target.value);
    console.log(this.usuario);
  }

  usuario  = {
    nome: 'Usuario teste',
    genero:'Masculino',
    data: '2012-12-15T13:47:20.789',
    cpf: '135.135.135-55'

  };

  constructor() { }

  ngOnInit() {
  }

  onSubmitTemplate(){
    console.log('Form submit');
    console.log(this.usuario);
  }
}
