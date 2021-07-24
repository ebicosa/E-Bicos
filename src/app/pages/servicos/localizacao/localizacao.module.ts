import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalizacaoPageRoutingModule } from './localizacao-routing.module';

import { LocalizacaoPage } from './localizacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalizacaoPageRoutingModule
  ],
  declarations: [LocalizacaoPage]
})
export class LocalizacaoPageModule {}
