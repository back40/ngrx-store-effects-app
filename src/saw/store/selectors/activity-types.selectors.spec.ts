import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../app/store/reducers';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './activity-types.selectors';

import { ActivityType } from '../../models/activity-type.model';

describe('ActivityTypesReducer Selectors', () => {
  let store: Store<fromReducers.SawState>;

  const activityTypes: ActivityType[] = [
    { id: 1, name: 'check fraud' },
    { id: 2, name: 'ach fraud' },
    { id: 3, name: 'kiting' }
  ];

  const entities = {
    1: activityTypes[0],
    2: activityTypes[1],
    3: activityTypes[2]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          saw: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getActivityTypeEntities', () => {
    it('should return activityTypes as entities', () => {
      let result;

      store.select(fromSelectors.getActivityTypeEntities).subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadActivityTypesSuccess(activityTypes));

      expect(result).toEqual(entities);
    });
  });

  describe('getSelectedActivityTypes', () => {
    it('should return selected activityTypes as ids', () => {
      let result;

      store.select(fromSelectors.getSelectedActivityTypes).subscribe(value => (result = value));

      store.dispatch(new fromActions.LoadActivityTypesSuccess(activityTypes));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.VisualiseActivityTypes([1, 3]));

      expect(result).toEqual([1, 3]);
    });
  });

  describe('getAllActivityTypes', () => {
    it('should return activityTypes as an array', () => {
      let result;

      store.select(fromSelectors.getAllActivityTypes).subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadActivityTypesSuccess(activityTypes));

      expect(result).toEqual(activityTypes);
    });
  });

  describe('getActivityTypesLoaded', () => {
    it('should return the activityTypes loaded state', () => {
      let result;

      store.select(fromSelectors.getActivityTypesLoaded).subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadActivityTypesSuccess([]));

      expect(result).toEqual(true);
    });
  });

  describe('getActivityTypesLoading', () => {
    it('should return the activityTypes loading state', () => {
      let result;

      store.select(fromSelectors.getActivityTypesLoading).subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadActivityTypes());

      expect(result).toEqual(true);
    });
  });
});
