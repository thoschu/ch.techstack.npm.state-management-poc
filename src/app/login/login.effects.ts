import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TypedAction } from "@ngrx/store/src/models";
import { Prop, prop } from "ramda";
import { Observable, tap } from 'rxjs';
import { User } from "./login.service";
import { loginAction, logoutAction } from "./login.actions";

export declare namespace AppLocalStorage {
  interface LocalStorage<T = void> {
    setLocalStorage(user: User): T;
    removeLocalStorage(key: string): T
  }
}

@Injectable()
export class LoginEffects implements AppLocalStorage.LocalStorage {
  private static readonly CREATE_EFFECT_DISPATCH_FALSE_CONFIG = { dispatch: false };
  private readonly logoutEffect$: Observable<TypedAction<'[Menu Left] User Logout'>> & CreateEffectMetadata;
  private readonly loginEffect$: Observable<{user: User} & TypedAction<'[Login Page] User Login'>> & CreateEffectMetadata;

  constructor(private readonly actions$: Actions<Action>, private readonly router: Router) {
    /*
    const loginEffect$: Observable<{user: User} & TypedAction<'[Login Page] User Login'>> = this.actions$
    .pipe(
      // tap((action: Action) => {
      //   if(action.type == '[Login Page] User Login') {
      //     const user: Prop<Action, 'user'> = prop<User, 'user', Action>('user', action);
      //
      //     this.setLocalStorage<typeof user>(user);
      //   }
      // })
      ofType(loginAction),
      tap((action: {user: User} & TypedAction<'[Login Page] User Login'>) => {
        const { user }: {user: User} = action;

        this.setLocalStorage<typeof user>(user);
      })
    );
    loginEffect$.subscribe(noop);
     */

    this.logoutEffect$ = createEffect(() => this.actions$
      .pipe(
        ofType(logoutAction),
        tap((_action: TypedAction<'[Menu Left] User Logout'>) => {
          this.removeLocalStorage('user');

          //this.router.navigateByUrl('');
        })
      ), LoginEffects.CREATE_EFFECT_DISPATCH_FALSE_CONFIG
    );

    this.loginEffect$ = createEffect(() => this.actions$
      .pipe(
        ofType(loginAction),
        tap((
          action: { user: User } & TypedAction<'[Login Page] User Login'>) => this.setLocalStorage(action.user)
        )
      ), LoginEffects.CREATE_EFFECT_DISPATCH_FALSE_CONFIG
    );
  }

  public setLocalStorage(user: User): void {
    return localStorage.setItem('user', JSON.stringify(user));
  }

  public removeLocalStorage(key: string): void {
    return localStorage.removeItem(key);
  }
}
