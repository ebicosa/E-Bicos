import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
})
export class EnderecoPage implements OnInit {

  constructor(private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async Cep() {
    const toast = await this.toastCtrl.create({
      message: 'Digite Somente Números !',
      mode: "ios",
      color: "dark",
      duration: 2000
    });
    toast.present();
  }

  onChangeCEP(event){
    this.endereco.CEP = (event.target.value);
  }

  onChangeRua(event){
    this.endereco.Rua = (event.target.value);
  }

  onChangeNumero(event){
    this.endereco.numero = (event.target.value);
  }

  onChangeComplemento(event){
    this.endereco.Complemento = (event.target.value);
  }

  async onChangeBairro(event){
    this.endereco.Bairro = (event.target.value);
  }

  endereco  = {
    CEP: '',
    Rua:'',
    numero: '',
    Complemento: '',
    Bairro: ''

  };


  teste(){
    console.log(this.endereco);
  }
}
