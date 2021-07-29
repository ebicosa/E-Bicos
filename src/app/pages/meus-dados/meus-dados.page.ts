import { LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './../../interface/user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
})
export class MeusDadosPage implements OnInit {

  public generos: Array<any> = [
    { id: "M", text: "Masculino" },
    { id: "F", text: "Feminino" },
    { id: "O", text: "Outro" }
  ];
  public loading: any;
  public usuario  = {
    nome: '',
    genero:'',
    data: '',
    cpf: ''
  };

  private id: any;
  private user: User;

  constructor( private authservice: AuthService, private afs: AngularFirestore,
    private loadingCtrl: LoadingController, private navCtrl: NavController ) {
    const dado = this.authservice.getUser();
    Promise.resolve(dado).then(result => {
        this.id = result;
        this.afs.collection('Users').doc(this.id).valueChanges().subscribe(result => {
          this.user = result;
          this.usuario.nome = this.user.nome;
          this.usuario.genero = this.user.genero;
          this.usuario.data = this.user.data;
          this.usuario.cpf = this.user.cpf;
        });
    });
   }




  onChange(event){
    this.usuario.genero = (event.target.value);
  }


  ngOnInit() {
  }

  async onSubmitTemplate(){
    await this.presentLoading();
    try{
      this.authservice.update(this.usuario, this.id);
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
