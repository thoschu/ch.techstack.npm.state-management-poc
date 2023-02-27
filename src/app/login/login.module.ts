import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from '@ngrx/store';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginEffects } from "./login.effects";
import * as fromLogin from './reducers';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    LoginRoutingModule,
    StoreModule.forFeature(
      fromLogin.loginFeatureKey,
      fromLogin.reducers,
      { metaReducers: fromLogin.metaReducers }
    ),
    EffectsModule.forFeature([LoginEffects])
  ],
  exports: [LoginComponent]
})
export class LoginModule {
  public static forRoot(): ModuleWithProviders<LoginModule> {
    return {
      ngModule: LoginModule,
      providers: [ ]
    }
  }
}
