import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnderecoPageRoutingModule } from './endereco-routing.module';

import { EnderecoPage } from './endereco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnderecoPageRoutingModule
  ],
  declarations: [EnderecoPage]
})
export class EnderecoPageModule {}
