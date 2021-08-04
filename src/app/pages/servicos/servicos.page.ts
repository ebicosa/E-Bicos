import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interface/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {

  public posts = new Array<Post>();
  private postsSubscription: Subscription;
  private postFromUser:boolean;
  private idUserLogado:string;

  title = "Serviços";

  constructor(
    private postsService: PostService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private authservice: AuthService,
    private router: Router,
    private navController: NavController,
    private tostctrl: ToastController,
    private actionSheetController: ActionSheetController) {

    Promise.resolve(this.authservice.getUser()).then(result => {this.idUserLogado = result });

    this.route.queryParams.subscribe(async params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        let val = getNav.extras.state.valorParaEnviar;
        if(!(Array.isArray(val))){
          this.posts = await this.postsService.getPostWithOptions({userId:val});
          this.title = "Meus Anúncios";
        } else{
          this.mostraServicosFiltrados(val);
        }
      } else{
        this.postsSubscription = this.postsService.getPosts().subscribe(dados => {
          this.posts = dados;
        })
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.postsSubscription)
      this.postsSubscription.unsubscribe();
  }

  

  async deletaAnuncio(id: string) {
    try {
      await this.postsService.deletePost(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  alteraFavorito(post: Post) {
    this.posts.forEach(element => {if (element.id === post.id) element.favorito = !element.favorito;});
  }

  abreAnuncioEdicao(post:Post){
    const navigationExtras: NavigationExtras = {
      state: {
        valorParaEnviar: post,
        postId: post.id,
      }
    };
    this.router.navigate(['inserir-servico'], navigationExtras);
  }

  abreAnuncioVisualizacao(post:Post){
    const navigationExtras: NavigationExtras = {
      state: {
        valorParaEnviar: post,
      }
    };
    this.router.navigate(['anuncio'], navigationExtras);
  }

  abreAnuncio(post: Post) {
    if(this.isFromThisUser(post)) this.presentActionSheet(post);
    else this.abreAnuncioVisualizacao(post);
  }

  buscarServicos() {
    this.navController.navigateForward('servicos/busca/localizacao');
  }

  filtrarServicos() {
    this.navController.navigateForward('servicos/filtros');
  }

  mostraServicosFiltrados(array:Array<any>){
    const filtrados = [];
    array.forEach(element => {
      if(element === undefined) filtrados.push('');
      else filtrados.push(element);
    });
    let getOptions = {
      subcategoria: filtrados[0],
      estado: filtrados[1],
      cidade: filtrados[2],
      valorMinimo: filtrados[3].minimo,
      valorMaximo: filtrados[3].maximo,
      data: filtrados[4]
    };
    try {
      getOptions.data = getOptions.data.toLocaleString().split(" ")[0]
    } catch (error) {}
    finally{
      if(this.title == "Meus Anúncios")
        getOptions = JSON.parse(JSON.stringify(getOptions).substring(0, JSON.stringify(getOptions).length-1) + "," +  (JSON.stringify({userId:this.idUserLogado}).substring(1)));
      let posts = this.postsService.getPostWithOptions(getOptions);
      if(!(posts === undefined)){
        this.posts = posts;
      }
      else{
        if(this.title == "Meus Anúncios")
          this.posts = this.postsService.getPostWithOptions({userId:this.idUserLogado});
        else
          this.postsService.getPosts().subscribe(dados => {
            this.posts = dados;
          })
      }
        
    }
  }

  isFromThisUser(post:Post){
    return this.idUserLogado === post.userId;
  }

  async presentToast(message: string){
    const toast = await this.tostctrl.create({message, duration:2000,mode: 'ios',color: 'dark'});
    toast.present();
  }

  async presentActionSheet(post:Post) {
    const actionSheet = await this.actionSheetController.create({
      header: "Selecione uma opção",
      buttons: [{
        text: 'Editar Anúncio',
        handler: () => {
          this.abreAnuncioEdicao(post);
        }
      },
      {
        text: 'Visualizar Anúncio',
        handler: () => {
          this.abreAnuncioVisualizacao(post);
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

  async presentAlertConfirm(postId:string) {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: '<strong>Essa ação é irreversível</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Deletar mesmo assim',
          handler: () => {this.deletaAnuncio(postId);}
        }
      ]
    });

    await alert.present();
  }
}
