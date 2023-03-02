import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from "@angular/material/menu";
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Action, RootStoreConfig, Store, StoreModule } from '@ngrx/store';
import {
  BaseRouterStoreState,
  RouterState,
  SerializedRouterStateSnapshot,
  StoreRouterConfig,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { TypedAction } from '@ngrx/store/src/models';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Observable, tap } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppState, metaReducers, reducers } from './reducers';
import { MenuComponent } from './menu/menu.component';
import { initMenuAction } from './menu/menu.actions';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { menuFeatureKey, menuMetaReducers, menuReducers, MenuState } from './menu/reducers';
import * as fromNavigation from './navigation/reducers';
import * as fromHome from './home/reducers';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NavigationComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    CdkDrag,
    MatCardModule,
    NgApexchartsModule,
    StoreModule.forRoot<AppState, Action>(reducers, AppModule.STORE_MODULE_FOR_ROOT_CONFIG),
    StoreModule.forFeature<MenuState, Action>(menuFeatureKey, menuReducers, {metaReducers: menuMetaReducers}),
    StoreModule.forFeature(fromNavigation.navigationFeatureKey, fromNavigation.reducers, {metaReducers: fromNavigation.metaReducers}),
    StoreModule.forFeature(fromHome.homeFeatureKey, fromHome.reducers, {metaReducers: fromHome.metaReducers}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    StoreRouterConnectingModule.forRoot(AppModule.STORE_ROUTER_CONNECTING_MODULE_FOR_ROOT_CONFIG),
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: AppModule.initializeAppFactory,
    deps: [ HttpClient, Store ],
    multi: true
  }]
})
export class AppModule {
  private static readonly STORE_MODULE_FOR_ROOT_CONFIG: RootStoreConfig<AppState> = {
    metaReducers,
    runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
      strictActionSerializability: true,
      strictStateSerializability: true
    }
  };
  private static readonly STORE_ROUTER_CONNECTING_MODULE_FOR_ROOT_CONFIG: StoreRouterConfig<BaseRouterStoreState> = {
    stateKey: 'router',
    routerState: RouterState.Minimal
  };

  constructor() {}

  private static initializeAppFactory(httpClient: HttpClient, store: Store<AppState>): () => Observable<MenuState> {
    return () => httpClient.get<MenuState>('api/menu')
      .pipe(
        tap((payload: MenuState) => {
          const action: MenuState & TypedAction<'[Init] Menu RouterLinks'> =
            initMenuAction(payload);

          store.dispatch(action)
        })
      );
  }
}
