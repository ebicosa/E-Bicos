import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interface/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {

  public posts = new Array<Post>();
  private postsSubscription: Subscription;

  title = "Serviços";

  constructor(
    private postsService: PostService,
    private route: ActivatedRoute, 
    private router: Router,
    private navController: NavController,
    private tostctrl: ToastController) {

    this.postsSubscription = this.postsService.getPosts().subscribe(dados => {
      this.posts = dados;
    })
    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        let val = getNav.extras.state.valorParaEnviar;
        if(!(Array.isArray(val))){
          this.posts.forEach(element =>{
            if(!(element.userId === val)) this.posts.splice(this.posts.indexOf(element), 1);
          })
          this.title = "Meus Anúncios";
        } else{
          this.mostraServicosFiltrados(val);
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
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

  abreAnuncio(post: Post) {
    this.posts.forEach(element => {
      if (element.id === post.id) {
        if(element.userId === post.userId){
          const navigationExtras: NavigationExtras = {
            state: {
              valorParaEnviar: element,
              postId: element.id,
            }
          };
          this.router.navigate(['inserir-servico'], navigationExtras);
        } else{
          const navigationExtras: NavigationExtras = {
            state: {
              valorParaEnviar: element,
            }
          };
          this.router.navigate(['anuncio'], navigationExtras);
        }
      }
    });
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
      if(element === undefined){
        filtrados.push('');
      }
      else{
        filtrados.push(element);
      }
    });
    let getOptions = {
      subcategoria: filtrados[0],
      estado: filtrados[1],
      cidade: filtrados[2],
      valorMinimo: filtrados[3].minimo,
      valorMaximo: filtrados[3].maximo,
      data: filtrados[4]
    };
    this.postsService.getPostWithOptions(getOptions).subscribe(element => {
      console.log(element.docChanges.toString())
    })
  }

  async presentToast(message: string){
    const toast = await this.tostctrl.create({message, duration:2000,mode: 'ios',color: 'dark'});
    toast.present();
  }
}
