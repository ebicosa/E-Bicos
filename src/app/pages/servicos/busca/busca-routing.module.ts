import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscaPage } from './busca.page';

const routes: Routes = [
  {
    path: '',
    component: BuscaPage,
    children: [
      {
        path: 'localizacao',
        children : [
          {
            path: '',
            loadChildren: () => import('../localizacao/localizacao.module').then(m => m.LocalizacaoPageModule)
          }
        ]
      },
      {
        path: 'categorias',
        children : [
          {
            path: '',
            loadChildren: () => import('../categorias/categorias.module').then(m => m.CategoriasPageModule)
          }
        ]
      },
      {
        path: 'filtros',
        children : [
          {
            path: '',
            loadChildren: () => import('../filtros/filtros.module').then(m => m.FiltrosPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'servicos/busca/localizacao',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BuscaPageRoutingModule {}
