import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {

  cards = [
    {
      categoria:"Construção civil",
      subcategoria: "Pedreiro",
      descricao: "Preciso de pedreiro para construir duas paredes.",
      cidade: "Campina Grande",
      estado: "PB",
      data: "24/01/2021",
      favorito: false,
      id: 1
    },
    {
      categoria:"Serviços domésticos",
      subcategoria: "Babá",
      descricao: "Preciso de babá para cuidar de criança hoje a noite.",
      cidade: "Esperança",
      estado: "PB",
      data: "26/01/2021",
      favorito: false,
      id: 2
    },
    {
      categoria:"Assistência técnica",
      subcategoria: "Geladeira",
      descricao: "Preciso de técnico para consertar geladeira com defeito.",
      cidade: "Campina Grande",
      estado: "PB",
      data: "28/01/2021",
      favorito: false,
      id: 3
    },
    {
      categoria:"Eventos",
      subcategoria: "Segurança",
      descricao: "Preciso de segurança para trabalhar em festa privada.",
      cidade: "Remígio",
      estado: "PB",
      data: "26/01/2021",
      favorito: false,
      id: 4
    },
  ];

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
    if(!(localStorage.getItem("nova_postagem") === null)){
      this.cards.push(JSON.parse(localStorage.getItem("nova_postagem")));
    }
  }

  showPageFiltros() {
    this.navCtrl.navigateForward('filtros');
  }

  alteraFavorito(card : any) {
    this.cards.forEach(element => {
      if (element.id == card.id) {
        element.favorito = !element.favorito;
      }
    });
  }


}
