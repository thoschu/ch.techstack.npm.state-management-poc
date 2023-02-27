import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

export const navigationFeatureKey = 'navigation';

export interface NavigationState {

}

export const reducers: ActionReducerMap<NavigationState> = {

};

export const metaReducers: MetaReducer<NavigationState>[] = isDevMode() ? [] : [];
