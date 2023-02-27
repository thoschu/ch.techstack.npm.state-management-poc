import { createAction, props } from '@ngrx/store';
import { MenuState } from "./reducers";

export const initMenuAction = createAction<'[Init] Menu RouterLinks', MenuState>(
  '[Init] Menu RouterLinks',
  props<MenuState>()
);
