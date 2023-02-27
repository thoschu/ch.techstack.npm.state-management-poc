import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    RouterModule.forChild(LoginRoutingModule.ROUTES),
    ...LoginRoutingModule.MODULES
  ],
  exports: [
    RouterModule,
    ...LoginRoutingModule.MODULES
  ]
})
export class LoginRoutingModule {
  private static ROUTES: Routes = [
    {
      path: '',
      component: LoginComponent
    }
  ];

  private static MODULES: typeof MatCardModule[] = [
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ];
}
