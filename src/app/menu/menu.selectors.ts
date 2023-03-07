import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { isNil, not, prop } from 'ramda';
import { User } from '../login/login.service';
import { LoginState } from '../login/reducers';

export const selectLoginStateFeature = createFeatureSelector<LoginState>('login');

export const isLoggedInSelector = createSelector<object, LoginState, boolean>(
  // (state: AppState) => state['login'],
  // (state: AppState) => prop('login', state),
  selectLoginStateFeature,
  (login: LoginState) => {
    const user: User | null = prop<User, 'user', LoginState>('user', login);
    const isUserNil: boolean = isNil(user);
    const isUserLoggedIn: boolean = not(isUserNil);

    return isUserLoggedIn;
  }
);
