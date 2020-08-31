import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateLabelPage } from './create-label.page';

const routes: Routes = [
  {
    path: '',
    component: CreateLabelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateLabelPageRoutingModule {}
