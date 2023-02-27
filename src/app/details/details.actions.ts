import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import {DetailsState} from "./reducers";

export const detailsPeriodicElementsAction = createAction(
  '[Details Page] Init PeriodicElementsAndDisplayedColumns',
  props<DetailsState>()
);
