import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { noop, Observable, tap } from 'rxjs';
import { LoginService, User } from './login.service';
import { loginAction } from './login.actions';
import { AppState } from '../reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private readonly horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private readonly verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  public isValid: boolean = false;
  public form: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly store: Store<AppState>,
    private readonly snackBar: MatSnackBar
  ) {
    this.form.valueChanges.subscribe(() => {
      this.isValid = this.form.valid;
    });
  }

  public get username() {
    return this.form.get('username')!;
  }

  public get password() {
    return this.form.get('password')!;
  }

  public submit(): void {
    if (this.form.valid) {
      const { username, password }: Record<'username' | 'password' , string> = this.form.value;
      const login$: Observable<User> | null = this.loginService.login(username, password);

      if (login$ === null) {
        this.openSnackBar();
      } else {
        login$.pipe(
          tap(console.log),
          tap(async (user: User) => {
            // this.store.dispatch({ type: 'Login Action', payload: { user } });
            const login: { user: User } & TypedAction<'[Login Page] User Login'> = loginAction({user});

            this.store.dispatch(login);

            await this.router.navigateByUrl('details');
          })
        ).subscribe(noop, (error: Error) => console.error(error));
      }
    }
  }

  public clearInput(): void {
    this.form.setValue({ username: '', password: '' });
  }

  private openSnackBar(): void {
    this.snackBar.open('❌ Error', '✕', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000
    });
  }
}
