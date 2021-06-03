import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CentralAjudaPageRoutingModule } from './central-ajuda-routing.module';

import { CentralAjudaPage } from './central-ajuda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CentralAjudaPageRoutingModule
  ],
  declarations: [CentralAjudaPage]
})
export class CentralAjudaPageModule {}
