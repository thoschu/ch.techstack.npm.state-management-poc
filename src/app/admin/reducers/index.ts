import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

export const adminFeatureKey = 'admin';

export interface AdminState {

}

export const reducers: ActionReducerMap<AdminState> = {

};

export const metaReducers: MetaReducer<AdminState>[] = isDevMode() ? [] : [];
