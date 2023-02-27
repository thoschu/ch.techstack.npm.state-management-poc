import { isDevMode } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { initMenuAction } from '../menu.actions';

export const menuFeatureKey = 'menu';

export interface MenuState {
  routerLinks: string[] | null
}

export const initialMenuState: MenuState = {
  routerLinks: null
};

// export const reducers: ActionReducerMap<MenuState> = {
//   // menu: [];
// };

export const menuReducers = createReducer(
  initialMenuState,
  on(initMenuAction,(state: MenuState, action: MenuState & TypedAction<'[Init] Menu RouterLinks'> & {type: '[Init] Menu RouterLinks'}) => {
    const { routerLinks }: { routerLinks: string[] | null } = action;

    return {
      routerLinks
    }
  })
);

export function metaMenuReducerLogger(reducer: ActionReducer<MenuState>): ActionReducer<MenuState> {
  return (state: MenuState | undefined, action: Action): MenuState => {
    // console.log(state);
    // console.log(action);
    return reducer(state, action);
  }
}

export const menuMetaReducers: MetaReducer<MenuState>[] = isDevMode() ? [metaMenuReducerLogger] : [];
