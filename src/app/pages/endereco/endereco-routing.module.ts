import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnderecoPage } from './endereco.page';

const routes: Routes = [
  {
    path: '',
    component: EnderecoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnderecoPageRoutingModule {}
