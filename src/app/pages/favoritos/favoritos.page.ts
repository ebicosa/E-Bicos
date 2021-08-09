
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Favourite } from 'src/app/interface/favourite';
import { Post } from 'src/app/interface/post';
import { AuthService } from 'src/app/services/auth.service';
import { FavouriteService } from 'src/app/services/favourites.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  public posts = new Array<Post>();
  public favourites = new Array<Favourite>();
  public favourite: Favourite = {};
  private postsSubscription: Subscription;
  private favouritesSubscription: Subscription;
  private idUserLogado:string;

  title = "Favoritos";

  constructor(
    private postsService: PostService,
    private favouriteService: FavouriteService,
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

    this.atualizaListaDeFavoritos();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.postsSubscription)
      this.postsSubscription.unsubscribe();
    if(this.favouritesSubscription)
      this.favouritesSubscription.unsubscribe();
  }

  async deletaAnuncio(id: string) {
    try {
      await this.postsService.deletePost(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  /**
   * A função, quando chamada, altera o status de favorito do anúncio (post). Se ele não estiver favoritado
   * por aquele usuário, então ele não existe na lista de favoritos. Neste caso, ele adiciona o favorito.
   * Se ele estiver favoritado, então ele existe na lista de favoritos. Neste caso, ele remove o favorito.
   * O relacionamento é do tipo muitos para muitos, onde um usuário pode favoritas vários anúncios, e um anúncio
   * pode ser favoritado por vários usuários. A tabela Favourites relaciona os usuários com seus favoritos.
   * @param post - anúncio a ser favoritado ou desfavoritado
   */
  alteraFavorito(post: Post) {
    for (let favourite of this.favourites) {
      if (favourite.idPost == post.id && favourite.idUser == this.idUserLogado) {
        this.favouriteService.delFavourite(favourite.id);
        return;
      }
    }

    this.favourite.idUser = this.idUserLogado;
    this.favourite.idPost = post.id;
    this.favouriteService.addFavourite(this.favourite);

    this.atualizaListaDeFavoritos();
  }

  existeFavorito(idFav: string, idUser: string) {
    for (let favourite of this.favourites) {
      if (favourite.idPost == idFav && favourite.idUser == idUser) {
        return true;
      }
    }
    return false;
  }

  existeAlgumFavorito() {
    for (let favourite of this.favourites) {
      if (favourite.idUser == this.idUserLogado) {
        return true;
      }
    }
    return false;
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

  private atualizaListaDeFavoritos() {
    this.favouritesSubscription = this.favouriteService.getFavourites().subscribe(dados => {
      this.favourites = dados;
    })
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
