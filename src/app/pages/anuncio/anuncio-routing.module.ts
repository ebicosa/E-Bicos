import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnuncioPage } from './anuncio.page';

const routes: Routes = [
  {
    path: '',
    component: AnuncioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnuncioPageRoutingModule {}
