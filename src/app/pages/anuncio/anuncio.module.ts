import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnuncioPageRoutingModule } from './anuncio-routing.module';

import { AnuncioPage } from './anuncio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnuncioPageRoutingModule
  ],
  declarations: [AnuncioPage]
})
export class AnuncioPageModule {}
