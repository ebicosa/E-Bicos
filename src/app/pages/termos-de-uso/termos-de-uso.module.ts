import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermosDeUsoPageRoutingModule } from './termos-de-uso-routing.module';

import { TermosDeUsoPage } from './termos-de-uso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermosDeUsoPageRoutingModule
  ],
  declarations: [TermosDeUsoPage]
})
export class TermosDeUsoPageModule {}
