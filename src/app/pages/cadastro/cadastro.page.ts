import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { User } from './../../interface/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public usuario: User = {};
  public loading: any;



  public generos : Array<any> = [
    { id: "M", text: "Masculino" },
    { id: "F", text: "Feminino" },
    { id: "O", text: "Outro" }
  ];

  onChange(event){
    this.usuario.genero = (event.target.value);
  }


  constructor( private navCtrl : NavController,
    private loadingCtrl : LoadingController,
    private tostctrl: ToastController,
    private authservice : AuthService ) { }

  ngOnInit() {
  }

  returnPageHome(){
    this.navCtrl.navigateBack("home");
  }

  async onSubmitTemplate(){
    console.log(this.usuario);
    await this.presentLoading();
    try{
      await this.authservice.register(this.usuario);
      this.navCtrl.navigateBack("entrar");
    } catch(error){
      let message: string;
      switch(error.code){
        case 'auth/email-already-in-use':
        message = "E-mail já cadastrado no sistema !";
        break;
        case 'auth/invalid-email':
        message = "E-mail no formato Invalido !\nFormato correto: exemple@exemple.com";
        break;
        case 'auth/weak-password':
        message = "Senha invalida !\nSenha deve ter no minimo 8 caracteres !";
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
