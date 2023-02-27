import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import { detailsPeriodicElementsAction } from "../details.actions";
import { PeriodicElement } from "../details.component";
import {User} from "../../login/login.service";
import {TypedAction} from "@ngrx/store/src/models";

export const detailsFeatureKey = 'details';

export interface DetailsState {
  periodicElements: PeriodicElement[] | null,
  displayedColumns: string[] | null
}

export const initialDetailsState: DetailsState = {
  periodicElements: null,
  displayedColumns: null
}

// export const reducers: ActionReducerMap<DetailsState> = {};

export const reducers = createReducer(
  initialDetailsState,
  on(detailsPeriodicElementsAction,(state: DetailsState, action: DetailsState & TypedAction<'[Details Page] Init PeriodicElementsAndDisplayedColumns'> & {type: '[Details Page] Init PeriodicElementsAndDisplayedColumns'}) => {
    const { periodicElements, displayedColumns }: DetailsState = action;

    return {
      periodicElements,
      displayedColumns
    }
  })
);


export const metaReducers: MetaReducer<DetailsState>[] = isDevMode() ? [] : [];
