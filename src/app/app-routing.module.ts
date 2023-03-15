import { importProvidersFrom, ModuleWithProviders, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, NoPreloading, ExtraOptions } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './home/home.component';
import { detailsFeatureKey, reducers, metaReducers } from './details/reducers';
import { DetailsGuard } from './details/details.guard';

@NgModule({
  imports: [
    RouterModule.forRoot(
      AppRoutingModule.ROUTES,
      AppRoutingModule.ROUTES_CONFIG
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  private static ROUTES_CONFIG: ExtraOptions = {
    useHash: false,
    enableTracing: true,
    preloadingStrategy: NoPreloading
  };
  private static ROUTES: Routes = [{
    path: 'login',
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule),
  }, {
    path: 'details',
    loadComponent: () => import('./details/details.component').then(component => component.DetailsComponent),
    title: 'Details',
    providers: [
      importProvidersFrom(StoreModule.forFeature(detailsFeatureKey, reducers, {metaReducers})),
      DetailsGuard
    ],
    canActivate: [DetailsGuard]
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, {
    path: '**',
    redirectTo: '/home'
  }];

  public static forRoot(): ModuleWithProviders<AppRoutingModule> {
    return {
      ngModule: AppRoutingModule,
      providers: []
    }
  }
}


