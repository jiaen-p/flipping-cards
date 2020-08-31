import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateLabelPageRoutingModule } from './create-label-routing.module';

import { CreateLabelPage } from './create-label.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateLabelPageRoutingModule
  ],
  declarations: [CreateLabelPage]
})
export class CreateLabelPageModule {}
