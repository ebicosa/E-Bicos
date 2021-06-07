import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusDadosPageRoutingModule } from './meus-dados-routing.module';

import { MeusDadosPage } from './meus-dados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusDadosPageRoutingModule
  ],
  declarations: [MeusDadosPage]
})
export class MeusDadosPageModule {}
