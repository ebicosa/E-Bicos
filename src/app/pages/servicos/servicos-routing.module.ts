import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicosPage } from './servicos.page';

const routes: Routes = [
  {
    path: '',
    component: ServicosPage,
  },
  {
    path: 'busca',
    loadChildren: () => import('./busca/busca.module').then(m => m.BuscaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicosPageRoutingModule {}
