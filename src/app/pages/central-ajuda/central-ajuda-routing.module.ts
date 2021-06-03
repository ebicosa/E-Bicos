import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CentralAjudaPage } from './central-ajuda.page';

const routes: Routes = [
  {
    path: '',
    component: CentralAjudaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CentralAjudaPageRoutingModule {}
