import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { ActivityTypesService } from '../../services/activity-types.service';
import * as fromEffects from './activity-types.effect';
import * as fromActions from '../actions/activityTypes.action';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('ActivityTypesEffects', () => {
  let actions$: TestActions;
  let service: ActivityTypesService;
  let effects: fromEffects.ActivityTypesEffects;

  const toppings = [
    { id: 1, name: 'onion' },
    { id: 2, name: 'mushroom' },
    { id: 3, name: 'basil' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ActivityTypesService,
        fromEffects.ActivityTypesEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(ActivityTypesService);
    effects = TestBed.get(fromEffects.ActivityTypesEffects);

    spyOn(service, 'getActivityTypes').and.returnValue(of(toppings));
  });

  describe('loadActivityTypes$', () => {
    it('should return a collection from LoadActivityTypesSuccess', () => {
      const action = new fromActions.LoadActivityTypes();
      const completion = new fromActions.LoadActivityTypesSuccess(toppings);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadActivityTypes$).toBeObservable(expected);
    });
  });
});
