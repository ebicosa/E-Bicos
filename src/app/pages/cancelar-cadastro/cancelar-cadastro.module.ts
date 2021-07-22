import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelarCadastroPageRoutingModule } from './cancelar-cadastro-routing.module';

import { CancelarCadastroPage } from './cancelar-cadastro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelarCadastroPageRoutingModule
  ],
  declarations: [CancelarCadastroPage]
})
export class CancelarCadastroPageModule {}
