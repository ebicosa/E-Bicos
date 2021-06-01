import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarSenhaPage } from './recuperar-senha.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarSenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarSenhaPageRoutingModule {}
