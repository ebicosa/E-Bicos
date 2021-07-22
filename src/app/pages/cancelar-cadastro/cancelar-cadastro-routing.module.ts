import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelarCadastroPage } from './cancelar-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: CancelarCadastroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelarCadastroPageRoutingModule {}
