import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'create-card',
    loadChildren: () => import('./pages/create-card/create-card.module').then( m => m.CreateCardPageModule)
  },
  {
    path: 'create-set',
    loadChildren: () => import('./pages/create-set/create-set.module').then( m => m.CreateSetPageModule)
  },
  {
    path: 'create-label',
    loadChildren: () => import('./pages/create-label/create-label.module').then( m => m.CreateLabelPageModule)
  },
  {
    path: 'edit-set',
    loadChildren: () => import('./pages/edit-set/edit-set.module').then( m => m.EditSetPageModule)
  },
  {
    path: 'view-set',
    loadChildren: () => import('./pages/view-set/view-set.module').then( m => m.ViewSetPageModule)
  },
  {
    path: 'slides',
    loadChildren: () => import('./pages/slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
