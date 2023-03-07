import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { User } from './login.service';

export const loginAction: ActionCreator<'[Login Page] User Login', (props: {user: User}) => ({user: User} & TypedAction<'[Login Page] User Login'>)> = createAction<'[Login Page] User Login', { user: User; }>(
  '[Login Page] User Login',
  props<{ user: User }>()
);

export const logoutAction = createAction(
  '[Menu Left] User Logout'
);
