import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Favourite } from 'src/app/interface/favourite';
import { Post } from 'src/app/interface/post';
import { AuthService } from 'src/app/services/auth.service';
import { FavouriteService } from 'src/app/services/favourites.service';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.page.html',
  styleUrls: ['./anuncio.page.scss'],
})
export class AnuncioPage implements OnInit {

  card: any;
  public favourites = new Array<Favourite>();
  public favourite: Favourite = {};
  private idUserLogado: string;
  private favouritesSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private favouriteService: FavouriteService,
    private authservice: AuthService,
    ) {

    Promise.resolve(this.authservice.getUser()).then(result => {this.idUserLogado = result });

    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        this.card = getNav.extras.state.valorParaEnviar;
      }
    });

    this.atualizaListaDeFavoritos();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.favouritesSubscription)
      this.favouritesSubscription.unsubscribe();
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
        this.card.favorito = !this.card.favorito;

        return;
      }
    }

    this.favourite.idUser = this.idUserLogado;
    this.favourite.idPost = post.id;
    this.favouriteService.addFavourite(this.favourite);

    this.card.favorito = !this.card.favorito;

    this.atualizaListaDeFavoritos();
  }
  
  existeFavorito(idFav: string) {
    for (let favourite of this.favourites) {
      if (favourite.idPost == idFav && favourite.idUser == this.idUserLogado) {
        return true;
      }
    }
    return false;
  }

  /**
   * Antiga lógica para alterar o favorito
   */
  /*
  alteraFavorito(card : any) {
    this.card.favorito = !this.card.favorito;
  }
  */

  private atualizaListaDeFavoritos() {
    this.favouritesSubscription = this.favouriteService.getFavourites().subscribe(dados => {
      this.favourites = dados;
    })
  }
}
