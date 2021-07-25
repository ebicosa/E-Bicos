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

  constructor(private loadingCtrl : LoadingController,
    private authservice : AuthService) { }

   ngOnInit() {
  }


  async Descadastar(){
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
