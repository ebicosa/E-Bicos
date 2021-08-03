import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController, NavController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interface/post';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-inserir-servico',
  templateUrl: './inserir-servico.page.html',
  styleUrls: ['./inserir-servico.page.scss'],
})
export class InserirServicoPage implements OnInit {

  private postId: string = null;
  public post: Post = {};
  private valor: string; //Usada no HTML, não apagar!
  private postSubscription: Subscription;
  public loading:any;
  public buttonName: string;

  faixasPrecos;
  categorias;
  subcategorias;
  croppedImagePath = "";

  

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(private camera: Camera,
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostService,
    public actionSheetController: ActionSheetController,
    private navCtrl : NavController,
    private loadingCtrl : LoadingController,
    private tostctrl: ToastController,
    private afs: AngularFirestore,
    private authservice: AuthService) {

      this.route.queryParams.subscribe(params => {
        let getNav = this.router.getCurrentNavigation();
        if (getNav.extras.state) {
          let val = getNav.extras.state.valorParaEnviar;
          this.postId = getNav.extras.state.postId;
          if(this.postId){
            this.buttonName = "Salvar Alterações";
            this.loadPost();
          }
          else{
            this.buttonName = "Postar";
          }
        }else{
          this.buttonName = "Postar";
        }
      });


      if(localStorage.getItem("categorias") === null){
        localStorage.setItem("categorias", JSON.stringify([{nome: "Construção Civil"},{nome: "Serviços domésticos"}]));
      }
      if(localStorage.getItem("subcategorias") === null){
        localStorage.setItem("subcategorias", JSON.stringify([{nome: "Eletricista"},{nome: "Encanador"}]));
      }
      if(localStorage.getItem("faixasPrecos") === null){
        localStorage.setItem("faixasPrecos", JSON.stringify( [{minimo: 100, maximo: 1000},{minimo: 1000, maximo:5000}]));
      }
      this.faixasPrecos= JSON.parse(localStorage.getItem("faixasPrecos"));
      this.subcategorias=JSON.parse(localStorage.getItem("subcategorias"));
      this.categorias=JSON.parse(localStorage.getItem("categorias"));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.postSubscription) this.postSubscription.unsubscribe();
  }

  async loadPost() {
    this.postSubscription = (await this.postsService.getPost(this.postId)).subscribe(dados => {this.post = dados;});
  }


    pickImage(sourceType) {
      const options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Handle error
      });
    }

    async selectImage() {
      const actionSheet = await this.actionSheetController.create({
        header: "Selecione uma opção",
        buttons: [{
          text: 'Carregar foto da galeria',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar Câmera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
        ]
      });
      await actionSheet.present();
    }

  
  async onEditar(){
    await this.postsService.updatePost(this.postId, this.post);
    this.navCtrl.navigateBack('servicos');
  }

  async onPostar(){
    if(this.post.titulo && this.post.descricao && this.post.valorMinimo && this.post.categoria &&
      this.post.subcategoria){

      await this.presentLoading();
      let user: User;
      const dado = this.authservice.getUser();
      Promise.resolve(dado).then(async result => {
          this.post.userId = result;
          //Utilizando afs do AngularFirestore para retornar informaçoes do usuario logado no sistema
          this.afs.collection('Users').doc(this.post.userId).valueChanges().subscribe(async result => {
          user = result;
          if(this.postId){
            try{
              this.onEditar();
            } catch(error){
              this.presentToast('Erro ao tentar editar');
            } finally{
              this.loading.dismiss();
            }
          } else{
            this.post.data = new Date().toLocaleString();
            if (user.cep) this.post.cep = user.cep;
            if (user.bairro) this.post.bairro = user.bairro;
            //Faltando cidade, estado, logradouro
            try{
              await this.postsService.addPost(this.post);
              this.navCtrl.navigateBack('servicos');
            } catch(error){
              console.log(error.code);
              this.presentToast('Erro ao tentar postar');
            } finally{
              this.loading.dismiss();
            }
          }
        });
      });
      
    }
  }

  onChange(obj:any){
    this.post.valorMinimo = obj.minimo;
    this.post.valorMaximo = obj.maximo;
  }

  async presentLoading(){
    this.loading = await this.loadingCtrl.create({message:"Por favor, aguarde ..."});
    await this.loading.present();
  }

  async presentToast(message: string){
    const toast = await this.tostctrl.create({message, duration:2000,mode: 'ios',color: 'dark'});
    toast.present();
  }
}
