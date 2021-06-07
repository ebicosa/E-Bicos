import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InserirServicoPage } from './inserir-servico.page';

const routes: Routes = [
  {
    path: '',
    component: InserirServicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InserirServicoPageRoutingModule {}
