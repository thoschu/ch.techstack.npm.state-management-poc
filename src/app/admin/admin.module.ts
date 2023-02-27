import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAdmin from './reducers';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAdmin.adminFeatureKey, fromAdmin.reducers, { metaReducers: fromAdmin.metaReducers })
  ]
})
export class AdminModule { }
