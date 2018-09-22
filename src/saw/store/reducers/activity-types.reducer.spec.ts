import * as fromActivityTypes from './activity-types.reducer';
import * as fromActions from '../actions/activityTypes.action';
import { ActivityType } from '../../models/activity-type.model';

describe('ActivityTypesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromActivityTypes;
      const action = {} as any;
      const state = fromActivityTypes.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_ACTIVITYTYPES action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromActivityTypes;
      const action = new fromActions.LoadActivityTypes();
      const state = fromActivityTypes.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.entities).toEqual({});
    });
  });

  describe('LOAD_ACTIVITYTYPES_SUCCESS action', () => {
    it('should populate the activityTypes array', () => {
      const activityTypes: ActivityType[] = [
        { id: 1, name: 'check fraud' },
        { id: 2, name: 'ach fraud' },
        { id: 3, name: 'money laundering' }
      ];
      const entities = {
        1: activityTypes[0],
        2: activityTypes[1],
        3: activityTypes[2]
      };
      const { initialState } = fromActivityTypes;
      const action = new fromActions.LoadActivityTypesSuccess(activityTypes);
      const state = fromActivityTypes.reducer(initialState, action);

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('LOAD_ACTIVITYTYPES_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromActivityTypes;
      const action = new fromActions.LoadActivityTypesFail({});
      const state = fromActivityTypes.reducer(initialState, action);

      expect(state).toEqual(initialState);
    });
    it('should return the previous state', () => {
      const { initialState } = fromActivityTypes;
      const previousState = { ...initialState, loading: true };
      const action = new fromActions.LoadActivityTypesFail({});
      const state = fromActivityTypes.reducer(previousState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('VISUALISE_ACTIVITYTYPES action', () => {
    it('should set an array of number ids', () => {
      const { initialState } = fromActivityTypes;
      const action = new fromActions.VisualiseActivityTypes([1, 5, 9]);
      const state = fromActivityTypes.reducer(initialState, action);

      expect(state.selectedActivityTypes).toEqual([1, 5, 9]);
    });
  });
});

describe('IncidentsReducer Selectors', () => {
  describe('getActivityTypeEntities', () => {
    it('should return .entities', () => {
      const entities: { [key: number]: ActivityType } = {
        1: { id: 1, name: 'check fraud' },
        2: { id: 2, name: 'ach fraud' }
      };
      const { initialState } = fromActivityTypes;
      const previousState = { ...initialState, entities };
      const slice = fromActivityTypes.getActivityTypeEntities(previousState);

      expect(slice).toEqual(entities);
    });
  });

  describe('getSelectedActivityTypes', () => {
    it('should return .selectedActivityTypes', () => {
      const selectedActivityTypes = [1, 2, 3, 4, 5];
      const { initialState } = fromActivityTypes;
      const previousState = { ...initialState, selectedActivityTypes };
      const slice = fromActivityTypes.getSelectedActivityTypes(previousState);

      expect(slice).toEqual(selectedActivityTypes);
    });
  });

  describe('getActivityTypesLoading', () => {
    it('should return .loading', () => {
      const { initialState } = fromActivityTypes;
      const previousState = { ...initialState, loading: true };
      const slice = fromActivityTypes.getActivityTypesLoading(previousState);

      expect(slice).toEqual(true);
    });
  });

  describe('getActivityTypesLoaded', () => {
    it('should return .loaded', () => {
      const { initialState } = fromActivityTypes;
      const previousState = { ...initialState, loaded: true };
      const slice = fromActivityTypes.getActivityTypesLoaded(previousState);

      expect(slice).toEqual(true);
    });
  });

  describe('getSelectedActivityTypes', () => {
    it('should return .selectedActivityTypes', () => {
      const { initialState } = fromActivityTypes;
      const previousState = { ...initialState };
      const slice = fromActivityTypes.getSelectedActivityTypes(previousState);

      expect(slice).toEqual([]);
    });
  });
});
