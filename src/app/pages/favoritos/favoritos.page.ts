import { Component, OnInit } from '@angular/core';
import { ServicosPage } from './../servicos/servicos.page';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  cards = [];

  constructor(private router : Router) {
    this.cards = JSON.parse(localStorage.getItem("cards"));
  }

  ngOnInit() {
  }

  alteraFavorito(card : any) {
    this.cards.forEach(element => {
      if (element.id == card.id) {
        element.favorito = !element.favorito;
        localStorage.setItem("cards", JSON.stringify(this.cards));
      }
    });
  }

  abreAnuncio(card : any) {
    this.cards.forEach(element => {
      if (element.id == card.id) {
        let navigationExtras: NavigationExtras = {
          state: {
            valorParaEnviar: element,
          }
        };
        this.router.navigate(['anuncio'], navigationExtras);
      }
    });
  }

}
