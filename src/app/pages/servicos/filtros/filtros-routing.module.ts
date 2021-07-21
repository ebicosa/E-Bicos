import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltrosPage } from './filtros.page';

const routes: Routes = [
  {
    path: '',
    component: FiltrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltrosPageRoutingModule {}
