import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuemSomosPageRoutingModule } from './quem-somos-routing.module';

import { QuemSomosPage } from './quem-somos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuemSomosPageRoutingModule
  ],
  declarations: [QuemSomosPage]
})
export class QuemSomosPageModule {}
