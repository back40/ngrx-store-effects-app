import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromIncidents from '../reducers/incidents.reducer';
import * as fromActivityTypes from './activity-types.selectors';

import { Incident } from '../../models/incident.model';

export const getIncidentState = createSelector(
  fromFeature.getSawState,
  (state: fromFeature.SawState) => state.incidents
);

export const getIncidentsEntities = createSelector(
  getIncidentState,
  fromIncidents.getIncidentsEntities
);

export const getSelectedIncident = createSelector(
  getIncidentsEntities,
  fromRoot.getRouterState,
  (entities, router): Incident => {
    return router.state && entities[router.state.params.incidentId];
  }
);

export const getIncidentVisualised = createSelector(
  getSelectedIncident,
  fromActivityTypes.getActivityTypeEntities,
  fromActivityTypes.getSelectedActivityTypes,
  (incident, activityTypeEntities, selectedActivityTypes) => {
    const activityTypes = selectedActivityTypes.map(id => activityTypeEntities[id]);
    return { ...incident, activityTypes };
  }
);

export const getAllIncidents = createSelector(getIncidentsEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getIncidentsLoaded = createSelector(
  getIncidentState,
  fromIncidents.getIncidentsLoaded
);
export const getIncidentsLoading = createSelector(
  getIncidentState,
  fromIncidents.getIncidentsLoading
);
