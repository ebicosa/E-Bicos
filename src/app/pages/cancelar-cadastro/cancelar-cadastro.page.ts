import { AuthService } from './../../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancelar-cadastro',
  templateUrl: './cancelar-cadastro.page.html',
  styleUrls: ['./cancelar-cadastro.page.scss'],
})
export class CancelarCadastroPage implements OnInit {


  public loading: any;
  public mensagem = {
    motivo: '',
    tempo: '',
    nota: '',
    comentario:''
  };
  constructor(private loadingCtrl: LoadingController,
    private authservice: AuthService) { }

   ngOnInit() {
  }

  onChangeMotivo(event){
    this.mensagem.motivo = (event.target.value);
  }
  onChangeTempo(event){
    this.mensagem.tempo = (event.target.value);
  }
  onChangeNota(event){
    this.mensagem.nota = (event.target.value);
  }
  onChangeComentario(event){
    this.mensagem.comentario = (event.target.value);
  }

  async descadastar(){
    await this.presentLoading();
    try{
      if(this.mensagem.tempo === "Permanente"){
        await this.authservice.delete();
      }else{
        await this.authservice.logout();
      }
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
