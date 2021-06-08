import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuemSomosPage } from './quem-somos.page';

const routes: Routes = [
  {
    path: '',
    component: QuemSomosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuemSomosPageRoutingModule {}
