import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSetPageRoutingModule } from './edit-set-routing.module';

import { EditSetPage } from './edit-set.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSetPageRoutingModule
  ],
  declarations: [EditSetPage]
})
export class EditSetPageModule {}
