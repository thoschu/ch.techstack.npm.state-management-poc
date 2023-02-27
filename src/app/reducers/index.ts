import { isDevMode } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';

export interface AppState {
  router: RouterState
};

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};
export const reducers2 = createReducer({})

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
