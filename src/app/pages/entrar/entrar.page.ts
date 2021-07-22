import { User } from './../../interface/user';
import { AuthService } from './../../services/auth.service';
import { AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.page.html',
  styleUrls: ['./entrar.page.scss'],
})
export class EntrarPage implements OnInit {


  public usuario: User = {};
  public loading: any;

  constructor(private navCtrl : NavController ,
    private loadingCtrl : LoadingController,
    private tostctrl: ToastController,
    private authservice : AuthService) {}

  ngOnInit() {
  }

  showPageCadastrar(){
    this.navCtrl.navigateForward("cadastro");
  }

  returnPagehome(){
    this.navCtrl.navigateBack("home");
  }

  async onSubmitTemplate(){
    console.log(this.usuario);
    await this.presentLoading();
    try{
      await this.authservice.login(this.usuario);
    } catch(error){
      let message: string;
      switch(error.code){
        case 'auth/user-not-found':
        message = "E-mail não cadastrado no sistema !";
        break;
        case 'auth/invalid-email':
        message = "E-mail no formato Invalido !\nFormato correto: exemple@exemple.com";
        break;
        case 'auth/wrong-password':
        message = "Senha invalida !";
        break;
      }
      this.presentToast(message);
    } finally{
      this.loading.dismiss();
    }
  }

  async presentLoading(){
    this.loading = await this.loadingCtrl.create({message:"Por favor, aguarde ..."});
    await this.loading.present();
  }

  async presentToast(message:string){
    const toast = await this.tostctrl.create({message, duration:2000,mode: 'ios',color: 'dark'});
    toast.present();
  }

}
