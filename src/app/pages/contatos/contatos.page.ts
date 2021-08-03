import { User } from './../../interface/user';
import { NavController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.page.html',
  styleUrls: ['./contatos.page.scss'],
})
export class ContatosPage implements OnInit {

  usuario  = {
    email: '',
    emailSec:'',
    insta: '',
    celular: ''

  };
  public loading: any;
  private id: any;
  private user: User;

  constructor(private authservice: AuthService, private afs: AngularFirestore,
    private loadingCtrl: LoadingController, private navCtrl: NavController) {
      const dado = this.authservice.getUser();
    Promise.resolve(dado).then(result => {
        this.id = result;
        this.afs.collection('Users').doc(this.id).valueChanges().subscribe(result => {
          this.user = result;
          this.usuario.email = this.user.email;
          this.usuario.emailSec = this.user.emailSec;
          this.usuario.insta = this.user.insta;
          this.usuario.celular = this.user.celular;
        });
    });
    }

  ngOnInit() {
  }

  async onSubmitTemplate(){
    await this.presentLoading();
    try{
      this.authservice.updateContato(this.usuario, this.id);
      this.navCtrl.navigateForward('perfil');
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
