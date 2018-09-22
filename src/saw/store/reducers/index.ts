import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromIncidents from './incidents.reducer';
import * as fromActivityTypes from './activity-types.reducer';

export interface SawState {
  incidents: fromIncidents.IncidentState;
  activityTypes: fromActivityTypes.ActivityTypesState;
}

export const reducers: ActionReducerMap<SawState> = {
  incidents: fromIncidents.reducer,
  activityTypes: fromActivityTypes.reducer
};

export const getSawState = createFeatureSelector<SawState>('saw');
