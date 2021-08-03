import { AuthService } from './../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './../../interface/user';
import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
})
export class EnderecoPage implements OnInit {

  usuario  = {
    cep: '',
    uf: '',
    cidade: '',
    rua:'',
    numero: '',
    complemento: '',
    bairro: ''

  };

  public loading: any;
  private id: any;
  private user: User;

  constructor(private authservice: AuthService, private afs: AngularFirestore,
    private loadingCtrl: LoadingController, private navCtrl: NavController, private toastCtrl: ToastController) {
    const dado = this.authservice.getUser();
    Promise.resolve(dado).then(result => {
        this.id = result;
        this.afs.collection('Users').doc(this.id).valueChanges().subscribe(result => {
          this.user = result;
          this.usuario.cep = this.user.cep;
          this.usuario.uf = this.user.uf;
          this.usuario.cidade = this.user.cidade;
          this.usuario.rua = this.user.rua;
          this.usuario.numero = this.user.numero;
          this.usuario.complemento = this.user.complemento;
          this.usuario.bairro = this.user.bairro;
        });
    });
   }

  ngOnInit() {
  }

  async toastCep() {
    const toast = await this.toastCtrl.create({
      message: 'Digite Somente Números !',
      mode: "ios",
      color: "dark",
      duration: 2000
    });
    toast.present();
  }

  onChangeCEP(event){
    this.usuario.cep = (event.target.value);
  }

  onChangeRua(event){
    this.usuario.rua = (event.target.value);
  }

  onChangeNumero(event){
    this.usuario.numero = (event.target.value);
  }

  onChangeComplemento(event){
    this.usuario.complemento = (event.target.value);
  }
  onChangeEstado(event){
    this.usuario.uf = (event.target.value);
  }
  onChangeCidade(event){
    this.usuario.cidade = (event.target.value);
  }

  async onChangeBairro(event){
    this.usuario.bairro = (event.target.value);
  }




  async salvarDados(){
    await this.presentLoading();
    try{
      this.authservice.updateEndereco(this.usuario, this.id);
      this.navCtrl.navigateForward("perfil");
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
