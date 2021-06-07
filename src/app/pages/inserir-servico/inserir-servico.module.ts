import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InserirServicoPageRoutingModule } from './inserir-servico-routing.module';

import { InserirServicoPage } from './inserir-servico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InserirServicoPageRoutingModule
  ],
  declarations: [InserirServicoPage]
})
export class InserirServicoPageModule {}
