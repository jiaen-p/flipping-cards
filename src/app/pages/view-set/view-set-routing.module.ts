import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSetPage } from './view-set.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSetPageRoutingModule {}
