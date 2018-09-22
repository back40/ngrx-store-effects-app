import * as fromIncidents from './incidents.reducer';
import * as fromActions from '../actions/incidents.action';
import { Incident } from '../../models/incident.model';

describe('IncidentsReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromIncidents;
      const action = {} as any;
      const state = fromIncidents.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_INCIDENTS action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromIncidents;
      const action = new fromActions.LoadIncidents();
      const state = fromIncidents.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.entities).toEqual({});
    });
  });

  describe('LOAD_INCIDENTS_SUCCESS action', () => {
    it('should populate the activityTypes array', () => {
      const incidents: Incident[] = [
        { id: 1, name: 'Incident #1', activityTypes: [] },
        { id: 2, name: 'Incident #2', activityTypes: [] }
      ];
      const entities = {
        1: incidents[0],
        2: incidents[1]
      };
      const { initialState } = fromIncidents;
      const action = new fromActions.LoadIncidentsSuccess(incidents);
      const state = fromIncidents.reducer(initialState, action);

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('LOAD_INCIDENTS_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromIncidents;
      const action = new fromActions.LoadIncidentsFail({});
      const state = fromIncidents.reducer(initialState, action);

      expect(state).toEqual(initialState);
    });

    it('should return the previous state', () => {
      const { initialState } = fromIncidents;
      const previousState = { ...initialState, loading: true };
      const action = new fromActions.LoadIncidentsFail({});
      const state = fromIncidents.reducer(previousState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('CREATE_INCIDENT_SUCCESS action', () => {
    it('should add the new incident to the incidents array', () => {
      const incidents: Incident[] = [
        { id: 1, name: 'Incident #1', activityTypes: [] },
        { id: 2, name: 'Incident #2', activityTypes: [] }
      ];
      const newIncident: Incident = {
        id: 3,
        name: 'Incident #3',
        activityTypes: []
      };
      const entities = {
        1: incidents[0],
        2: incidents[1]
      };
      const { initialState } = fromIncidents;
      const previousState = { ...initialState, entities };
      const action = new fromActions.CreateIncidentSuccess(newIncident);
      const state = fromIncidents.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(3);
      expect(state.entities).toEqual({ ...entities, 3: newIncident });
    });
  });

  describe('UPDATE_INCIDENT_SUCCESS action', () => {
    it('should update the incident', () => {
      const incidents: Incident[] = [
        { id: 1, name: 'Incident #1', activityTypes: [] },
        { id: 2, name: 'Incident #2', activityTypes: [] }
      ];
      const updatedIncident = {
        id: 2,
        name: 'Incident #2',
        activityTypes: [{ id: 1, name: 'basil' }]
      };
      const entities = {
        1: incidents[0],
        2: incidents[1]
      };
      const { initialState } = fromIncidents;
      const previousState = { ...initialState, entities };
      const action = new fromActions.UpdateIncidentSuccess(updatedIncident);
      const state = fromIncidents.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(2);
      expect(state.entities).toEqual({ ...entities, 2: updatedIncident });
    });
  });

  describe('REMOVE_INCIDENT_SUCCESS action', () => {
    it('should remove the incident', () => {
      const incidents: Incident[] = [
        { id: 1, name: 'Incident #1', activityTypes: [] },
        { id: 2, name: 'Incident #2', activityTypes: [] }
      ];
      const entities = {
        1: incidents[0],
        2: incidents[1]
      };
      const { initialState } = fromIncidents;
      const previousState = { ...initialState, entities };
      const action = new fromActions.RemoveIncidentSuccess(incidents[0]);
      const state = fromIncidents.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(1);
      expect(state.entities).toEqual({ 2: incidents[1] });
    });
  });
});

describe('IncidentsReducer Selectors', () => {
  describe('getIncidentEntities', () => {
    it('should return .entities', () => {
      const entities: { [key: number]: Incident } = {
        1: { id: 1, name: 'Incident #1', activityTypes: [] },
        2: { id: 2, name: 'Incident #2', activityTypes: [] }
      };
      const { initialState } = fromIncidents;
      const previousState = { ...initialState, entities };
      const slice = fromIncidents.getIncidentsEntities(previousState);

      expect(slice).toEqual(entities);
    });
  });

  describe('getIncidentsLoading', () => {
    it('should return .loading', () => {
      const { initialState } = fromIncidents;
      const previousState = { ...initialState, loading: true };
      const slice = fromIncidents.getIncidentsLoading(previousState);

      expect(slice).toEqual(true);
    });
  });

  describe('getIncidentsLoaded', () => {
    it('should return .loaded', () => {
      const { initialState } = fromIncidents;
      const previousState = { ...initialState, loaded: true };
      const slice = fromIncidents.getIncidentsLoaded(previousState);

      expect(slice).toEqual(true);
    });
  });
});
