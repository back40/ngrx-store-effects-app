import * as fromIncidents from '../actions/incidents.action';
import { Incident } from '../../models/incident.model';

export interface IncidentState {
  entities: { [id: number]: Incident };
  loaded: boolean;
  loading: boolean;
}

export const initialState: IncidentState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromIncidents.IncidentsAction
): IncidentState {
  switch (action.type) {
    case fromIncidents.LOAD_INCIDENTS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromIncidents.LOAD_INCIDENTS_SUCCESS: {
      const incidents = action.payload;

      const entities = incidents.reduce(
        (entities: { [id: number]: Incident }, incident: Incident) => {
          return {
            ...entities,
            [incident.id]: incident
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromIncidents.LOAD_INCIDENTS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromIncidents.UPDATE_INCIDENT_SUCCESS:
    case fromIncidents.CREATE_INCIDENT_SUCCESS: {
      const incident = action.payload;
      const entities = {
        ...state.entities,
        [incident.id]: incident
      };

      return {
        ...state,
        entities
      };
    }

    case fromIncidents.REMOVE_INCIDENT_SUCCESS: {
      const incident = action.payload;
      const { [incident.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getIncidentsEntities = (state: IncidentState) => state.entities;
export const getIncidentsLoading = (state: IncidentState) => state.loading;
export const getIncidentsLoaded = (state: IncidentState) => state.loaded;
