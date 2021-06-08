import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermosDeUsoPage } from './termos-de-uso.page';

const routes: Routes = [
  {
    path: '',
    component: TermosDeUsoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermosDeUsoPageRoutingModule {}
