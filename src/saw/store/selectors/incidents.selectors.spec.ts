import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

import { TestBed } from '@angular/core/testing';
import { Incident } from '../../models/incident.model';

import * as fromRoot from '../../../app/store';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './incidents.selectors';

describe('Incidents Selectors', () => {
  let store: Store<fromReducers.SawState>;

  const incident1: Incident = {
    id: 1,
    name: 'Incident1',
    activityTypes: [
      { id: 1, name: 'check fraud' },
      { id: 2, name: 'ach fraud' },
      { id: 3, name: 'money laundering' }
    ]
  };

  const incident2: Incident = {
    id: 2,
    name: 'Incident2',
    activityTypes: [
      { id: 1, name: 'kiting' },
      { id: 2, name: 'wire fraud' },
      { id: 3, name: 'drug activity' }
    ]
  };

  const incident3: Incident = {
    id: 3,
    name: 'Incident 3',
    activityTypes: [
      { id: 1, name: 'indentity theft' },
      { id: 2, name: 'loan fraud' },
      { id: 3, name: 'structuring' },
      { id: 4, name: 'credt card fraud' },
      { id: 5, name: 'atm fraud' }
    ]
  };

  const incidents: Incident[] = [incident1, incident2, incident3];

  const entities = {
    1: incidents[0],
    2: incidents[1],
    3: incidents[2]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
  });

  describe('getIncidentState', () => {
    it('should return state of incident store slice', () => {
      let result;

      store.select(fromSelectors.getIncidentState).subscribe(value => (result = value));

      expect(result).toEqual({
        entities: {},
        loaded: false,
        loading: false
      });

      store.dispatch(new fromActions.LoadIncidentsSuccess(incidents));

      expect(result).toEqual({
        entities,
        loaded: true,
        loading: false
      });
    });
  });

  describe('getIncidentEntities', () => {
    it('should return incidents as entities', () => {
      let result;

      store.select(fromSelectors.getIncidentsEntities).subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadIncidentsSuccess(incidents));

      expect(result).toEqual(entities);
    });
  });

  describe('getSelectedIncident', () => {
    it('should return selected incident as an entity', () => {
      let result;
      let params;

      store.dispatch(new fromActions.LoadIncidentsSuccess(incidents));

      store.dispatch({
        type: 'ROUTER_NAVIGATION',
        payload: {
          routerState: {
            url: '/saw',
            queryParams: {},
            params: { incidentId: '2' }
          },
          event: {}
        }
      });

      store
        .select(fromRoot.getRouterState)
        .subscribe(routerState => (params = routerState.state.params));

      expect(params).toEqual({ incidentId: '2' });

      store
        .select(fromSelectors.getSelectedIncident)
        .subscribe(selectedIncident => (result = selectedIncident));

      expect(result).toEqual(entities[2]);
    });
  });

  describe('getIncidentVisualised', () => {
    it('should return selected incident composed with selected activityTypes', () => {
      let result;
      let params;
      const activityTypes = [
        {
          id: 6,
          name: 'check fraud'
        },
        {
          id: 9,
          name: 'ach fraud'
        },
        {
          id: 11,
          name: 'money laundering'
        }
      ];

      store.dispatch(new fromActions.LoadIncidentsSuccess(incidents));
      store.dispatch(new fromActions.LoadActivityTypesSuccess(activityTypes));
      store.dispatch(new fromActions.VisualiseActivityTypes([11, 9, 6]));

      store.dispatch({
        type: 'ROUTER_NAVIGATION',
        payload: {
          routerState: {
            url: '/saw',
            queryParams: {},
            params: { incidentId: '2' }
          },
          event: {}
        }
      });

      store
        .select(fromSelectors.getIncidentVisualised)
        .subscribe(selectedIncident => (result = selectedIncident));

      const expectedActivityTypes = [activityTypes[2], activityTypes[1], activityTypes[0]];

      expect(result).toEqual({ ...entities[2], activityTypes: expectedActivityTypes });
    });
  });

  describe('getAllIncidents', () => {
    it('should return incidents as an array', () => {
      let result;

      store.select(fromSelectors.getAllIncidents).subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadIncidentsSuccess(incidents));

      expect(result).toEqual(incidents);
    });
  });

  describe('getIncidentsLoaded', () => {
    it('should return the incidents loaded state', () => {
      let result;

      store.select(fromSelectors.getIncidentsLoaded).subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadIncidentsSuccess([]));

      expect(result).toEqual(true);
    });
  });

  describe('getIncidentsLoading', () => {
    it('should return the incidents loading state', () => {
      let result;

      store.select(fromSelectors.getIncidentsLoading).subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadIncidents());

      expect(result).toEqual(true);
    });
  });
});
