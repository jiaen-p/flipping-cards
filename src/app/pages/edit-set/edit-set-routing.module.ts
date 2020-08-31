import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSetPage } from './edit-set.page';

const routes: Routes = [
  {
    path: '',
    component: EditSetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSetPageRoutingModule {}
