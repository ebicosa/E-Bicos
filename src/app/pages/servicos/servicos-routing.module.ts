import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicosPage } from './servicos.page';

const routes: Routes = [
  {
    path: '',
    component: ServicosPage,
  },
  {
    path: 'localizacao',
    loadChildren: () => import('./localizacao/localizacao.module').then(m => m.LocalizacaoPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasPageModule)
  },
  {
    path: 'filtros',
    loadChildren: () => import('./filtros/filtros.module').then(m => m.FiltrosPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicosPageRoutingModule {}
