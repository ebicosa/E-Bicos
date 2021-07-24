import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(private navController: NavController) {
  }

  ngOnInit() {
  }

  onClickCategoria(categoria: string) {
    this.navController.navigateForward(`servicos?categoria=${categoria}`);
  }

}
