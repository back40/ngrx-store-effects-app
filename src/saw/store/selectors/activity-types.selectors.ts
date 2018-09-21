import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromActivityTypes from '../reducers/activity-types.reducer';

export const getActivityTypesState = createSelector(
  fromFeature.getSawState,
  (state: fromFeature.SawState) => state.activityTypes
);

export const getActivityTypeEntities = createSelector(
  getActivityTypesState,
  fromActivityTypes.getActivityTypeEntities
);

export const getSelectedActivityTypes = createSelector(
  getActivityTypesState,
  fromActivityTypes.getSelectedActivityTypes
);

export const getAllActivityTypes = createSelector(getActivityTypeEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getActivityTypesLoaded = createSelector(
  getActivityTypesState,
  fromActivityTypes.getActivityTypesLoaded
);

export const getActivityTypesLoading = createSelector(
  getActivityTypesState,
  fromActivityTypes.getActivityTypesLoading
);
