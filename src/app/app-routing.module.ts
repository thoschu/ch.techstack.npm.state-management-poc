import { ComponentRef, importProvidersFrom, Injectable, ModuleWithProviders, NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule, Routes, NoPreloading, ExtraOptions,
  ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy
} from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './home/home.component';
import { detailsFeatureKey, reducers, metaReducers } from './details/reducers';
import { DetailsGuard } from './details/details.guard';

@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlers: Record<string, RootHandler> = {};

  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.isDetachable(route);
  }

  public store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle) {
    const storeKey =  this.getStoreKey(route);
    if (handler) {
      // I need to keep track of the time the route is stored so I added storeTime.

      this.handlers[storeKey] = {
        handle: handler,
        storeTime: +new Date()
      };
    }
  }

  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const storeKey =  this.getStoreKey(route);
    if (this.isAttachable(route, storeKey)) {
      // you can retrun true only
      // clearNewerHandlerOnAttach is optional
      // when load the snapshot (attach old route) I only want to keep routes stored before this route
      // and delete routes stored after this route.
      // for exmaple, if i go to product list and then product detail and then saler information
      // if product list, product detail and saler information are all detachable.
      // when I back from saler information to product detail I don't want to store saler information
      // and when I back from product detail to product list I don't want to store product detail route
      // because I when I go back to product list and then go to the same product detail again
      // I want to load new data. Why?
      // I think people rarely go back and fort 2 pages multiple time
      // by deleting unnecessary stored route we save memory.
      this.clearNewerHandlerOnAttach(this.handlers[storeKey].storeTime);

      return true;
    }

    return false;
  }

  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const storeKey =  this.getStoreKey(route);

    return this.handlers[storeKey]?.handle;
  }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === current.routeConfig;
  }

  private getResolvedUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map(v => v.url.map(segment => segment.toString()).join('/'))
      .join('/');
  }

  private getStoreKey(route: ActivatedRouteSnapshot): string {
    const baseUrl: string = this.getResolvedUrl(route);
    const childrenParts = [];
    let deepestChild = route;

    while(deepestChild.firstChild) {
      deepestChild = deepestChild.firstChild;
      childrenParts.push(deepestChild.url.join('/'));
    }

    return baseUrl + '////' + childrenParts.join('/');
  }

  // true if we mark this route shouldDetach:true
  // see it in route config
  private isDetachable(route: ActivatedRouteSnapshot) {
    return !!route?.routeConfig?.data?.['shouldDetach'];
  }

  private isAttachable(route: ActivatedRouteSnapshot, storeKey: string) {
    return !!(this.isDetachable(route) && this.handlers[storeKey]?.handle);
  }

  /*
  When the user goes back (attach a root)
  I want to clear newer stored roots.
  */
  private clearNewerHandlerOnAttach(storeTime: number) {
    const handlerKeys: string[] = Object.keys(this.handlers);

    handlerKeys.forEach((k: string) => {
      if (this.handlers[k].storeTime > storeTime) {
        const componentRef: ComponentRef<any> = (this.handlers[k].handle as any).componentRef;

        if (componentRef) {
          componentRef.destroy();
        }

        delete this.handlers[k];
      }
    });
  }
}

export interface RootHandler {
  handle: DetachedRouteHandle;
  storeTime: number;
}

@NgModule({
  imports: [
    RouterModule.forRoot(
      AppRoutingModule.ROUTES,
      AppRoutingModule.ROUTES_CONFIG
    )
  ],
  exports: [RouterModule],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: CustomRouteReuseStrategy
  }]
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
    component: HomeComponent,
    data: {
      shouldDetach: true
    }
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
