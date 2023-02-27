import { isDevMode } from '@angular/core';
import {
  Action,
  ActionReducer, ActionReducerMap,
  createFeatureSelector, createReducer, createSelector,
  MetaReducer, on
} from '@ngrx/store';
import { User } from '../login.service';
import { loginAction, logoutAction } from '../login.actions';
import {TypedAction} from "@ngrx/store/src/models";

export const loginFeatureKey = 'login';

export interface LoginState {
  user: User | null
}

export const initialLoginState: LoginState = {
  user: null
} satisfies LoginState;

// export const reducers2: ActionReducerMap<LoginState> = {
//
// };

export const reducers: ActionReducer<LoginState> = createReducer(
  initialLoginState,
  on(loginAction, (state: LoginState, action: LoginState & TypedAction<'[Login Page] User Login'> & { type: '[Login Page] User Login'}) => {
    const { user }: LoginState = action;

    // //strictActionImmutability
    // action.user = {
    //   id: 1,
    //   name: 'Tim',
    //   info: 'Berlin'
    // };

    return {
      user
    }
  }),
  on(logoutAction, (_state: LoginState, action) => {
    console.log(action);

    return initialLoginState
  })
);

export const metaReducers: MetaReducer<LoginState>[] = isDevMode() ? [] : [];
