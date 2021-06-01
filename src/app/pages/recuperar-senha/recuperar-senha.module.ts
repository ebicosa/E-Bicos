import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarSenhaPageRoutingModule } from './recuperar-senha-routing.module';

import { RecuperarSenhaPage } from './recuperar-senha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarSenhaPageRoutingModule
  ],
  declarations: [RecuperarSenhaPage]
})
export class RecuperarSenhaPageModule {}
