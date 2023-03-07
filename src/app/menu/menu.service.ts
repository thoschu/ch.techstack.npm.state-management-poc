import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormControl } from '@angular/forms';
import { TypedAction } from '@ngrx/store/src/models';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { pipe, prop, Prop } from 'ramda';
import { MenuState } from "./reducers";
import { isLoggedInSelector } from './menu.selectors';
import { AppState } from '../reducers';
import { logoutAction } from '../login/login.actions';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private readonly store: Store<AppState>,
    @Inject(DOCUMENT) private readonly document: Document
  ) { }

  public getRouterLinksFromStore$(): Observable<string[] | undefined> {
    return this.store.pipe(map<AppState, string[] | undefined>((state: AppState): string[] | undefined => {
      const menuPropFn: <T>(value: T) => Prop<T, 'menu'> = prop<AppState, 'menu'>('menu');
      const routerLinksPropFn: <T>(value: T) => Prop<T, 'routerLinks'> = prop<MenuState, 'routerLinks'>('routerLinks');
      const findLinks: <T>(value: T) => Prop<Prop<T, 'menu'>, 'routerLinks'> = pipe(menuPropFn, routerLinksPropFn);

      return findLinks<AppState>(state);
    }));
  }

  public getIsLoggedInFromStore$(): Observable<boolean> {
    return this.store
      .pipe(
        select<object, boolean>(
          isLoggedInSelector
        )
      );
  }

  public getToggleControlValueChangesSubscription(toggleControl: FormControl<boolean | null>): Subscription {
    return  toggleControl.valueChanges.subscribe((darkMode: boolean | null) => {
      const mediaQueryList: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
      const prefersDarkMode: boolean = mediaQueryList.matches;

      if(prefersDarkMode) {
        this.document.body.classList.remove('light-theme');
        this.document.body.classList.remove('dark-theme');
        this.document.body.classList.toggle(darkMode ? 'dark-theme' : 'light-theme');
      } else {
        this.document.body.classList.remove('dark-theme');
        this.document.body.classList.remove('light-theme');
        this.document.body.classList.toggle(darkMode ? 'light-theme' : 'dark-theme');
      }
    })
  }

  public logout(): void {
    const newLogoutAction: TypedAction<'[Menu Left] User Logout'> = logoutAction();

    this.store.dispatch(newLogoutAction);
  }
}
