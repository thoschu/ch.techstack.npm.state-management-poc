import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { noop, tap } from "rxjs";
import { LoginService, User } from "./login.service";
import { loginAction } from "./login.actions";
import { AppState } from "../reducers";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
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
    private readonly store: Store<AppState>
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

      this.loginService.login(username, password)?.pipe(
        tap(async (user: User) => {
          // this.store.dispatch({ type: 'Login Action', payload: { user } });
          const login: { user: User } & TypedAction<'[Login Page] User Login'> = loginAction({user});
          this.store.dispatch(login);
          await this.router.navigateByUrl('details');
        })
      ).subscribe(noop, (error: Error) => console.error(error));
    }
  }

  public clearInput(): void {
    this.form.setValue({ username: '', password: '' });
  }
}
