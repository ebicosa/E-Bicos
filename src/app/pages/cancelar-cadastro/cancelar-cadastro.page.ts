import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancelar-cadastro',
  templateUrl: './cancelar-cadastro.page.html',
  styleUrls: ['./cancelar-cadastro.page.scss'],
})
export class CancelarCadastroPage implements OnInit {


  motivo = {
    tempo: String,
    descricao: String
  }

  public motivos : Array<any> = [
    { text: "Permanente" },
    { text: "Não sei" },
    { text: "Indefinido" }
  ];

   onChange(event){
    this.motivo.tempo = (event.target.value);
    console.log(this.motivo);
  }

  constructor() { }

   ngOnInit() {
  }

}
