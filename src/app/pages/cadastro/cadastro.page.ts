import { AngularFirestore } from '@angular/fire/firestore';
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




  constructor( private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private tostctrl: ToastController,
    private authservice: AuthService,
    private afs: AngularFirestore) { }

  ngOnInit() {
  }

  onChange(event){
    this.usuario.genero = (event.target.value);
  }
  returnPageHome(){
    this.navCtrl.navigateBack("home");
  }

  async onSubmitTemplate(){
    await this.presentLoading();

    try{
      const newuser = await this.authservice.register(this.usuario);
      const newuserObj = Object.assign({},this.usuario);
      delete newuserObj.password;
      await this.afs.collection('Users').doc(newuser.user.uid).set(newuserObj);
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
