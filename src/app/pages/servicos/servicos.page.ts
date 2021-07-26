import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {

  cards = [];
  title = "Serviços"

  constructor(private route: ActivatedRoute, private router: Router, private navController: NavController) {
    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        this.title = "Meus Anúncios";
      }
    });
    if(localStorage.getItem('cards') === null) {

    localStorage.setItem('cards', JSON.stringify([

    {
      autor: 'Carla Suelen',
      categoria:'Construção civil',
      subcategoria: 'Pedreiro',
      descricao: 'Preciso de pedreiro para construir duas paredes.',
      valor: '',
      cep: '58400001',
      cidade: 'Campina Grande',
      bairro: 'Centro',
      logradouro: 'Rua Marciel Pinheiro',
      estado: 'PB',
      data: '24/01/2021',
      favorito: false,
      id: 1
    },
    {
      autor: 'Marilene Sobral',
      categoria:'Serviços domésticos',
      subcategoria: 'Babá',
      descricao: 'Preciso de babá para cuidar de criança hoje a noite.',
      valor: 75,
      cep: '58400002',
      cidade: 'Esperança',
      bairro: 'Fictício1',
      logradouro: 'Projetada1',
      estado: 'PB',
      data: '26/01/2021',
      favorito: false,
      id: 2
    },
    {
      autor: 'Bruno Pereira',
      categoria:'Assistência técnica',
      subcategoria: 'Geladeira',
      descricao: 'Preciso de técnico para consertar geladeira com defeito.',
      valor: 100,
      cep: '58400003',
      cidade: 'Campina Grande',
      bairro: 'Dinamérica',
      logradouro: 'Rua Tranquilino Coelho Lemos',
      estado: 'PB',
      data: '28/01/2021',
      favorito: false,
      id: 3
    },
    {
      autor: 'Rodrigo Alves',
      categoria:'Eventos',
      subcategoria: 'Segurança',
      descricao: 'Preciso de segurança para trabalhar em festa privada.',
      valor: 200,
      cep: '58400004',
      cidade: 'Remígio',
      bairro: 'Fictício2',
      logradouro: 'Projetada2',
      estado: 'PB',
      data: '26/01/2021',
      favorito: false,
      id: 4

    }
  ]));

}

this.cards = JSON.parse(localStorage.getItem('cards'));


this.cards = JSON.parse(localStorage.getItem('cards'));

if(!(localStorage.getItem('nova_postagem') === null)){
  this.cards.push(JSON.parse(localStorage.getItem('nova_postagem')));
  localStorage.setItem('nova_postagem', null);
}
  }

  ngOnInit() {
  }

  adicionaServico() {
    if(!(localStorage.getItem('nova_postagem') === null)){
      this.cards.push(JSON.parse(localStorage.getItem('nova_postagem')));
    }
  }

  alteraFavorito(card: any) {
    this.cards.forEach(element => {
      if (element.id === card.id) {
        element.favorito = !element.favorito;
        localStorage.setItem('cards', JSON.stringify(this.cards));
      }
    });
  }

  abreAnuncio(card: any) {
    this.cards.forEach(element => {
      if (element.id === card.id) {
        const navigationExtras: NavigationExtras = {
          state: {
            valorParaEnviar: element,
          }
        };
        this.router.navigate(['anuncio'], navigationExtras);
      }
    });
  }

  buscarServicos() {
    this.navController.navigateForward('servicos/busca/localizacao');
  }

  filtrarServicos() {
    this.navController.navigateForward('servicos/filtros');
  }
}
