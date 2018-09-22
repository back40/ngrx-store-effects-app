import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { IncidentsService } from '../../services/incidents.service';
import * as fromEffects from './incidents.effect';
import * as fromActions from '../actions/incidents.action';

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

describe('IncidentsEffects', () => {
  let actions$: TestActions;
  let service: IncidentsService;
  let effects: fromEffects.IncidentsEffects;

  const pizzas = [
    {
      id: 1,
      name: 'Incident #1',
      activityTypes: [
        { id: 1, name: 'check fraud' },
        { id: 2, name: 'ach fraud' },
        { id: 3, name: 'kiting' }
      ]
    },
    {
      id: 2,
      name: 'Incident #2',
      activityTypes: [
        { id: 1, name: 'onion' },
        { id: 2, name: 'mushroom' },
        { id: 3, name: 'basil' }
      ]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        IncidentsService,
        fromEffects.IncidentsEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(IncidentsService);
    effects = TestBed.get(fromEffects.IncidentsEffects);

    spyOn(service, 'getIncidents').and.returnValue(of(pizzas));
    spyOn(service, 'createIncident').and.returnValue(of(pizzas[0]));
    spyOn(service, 'updateIncident').and.returnValue(of(pizzas[0]));
    spyOn(service, 'removeIncident').and.returnValue(of(pizzas[0]));
  });

  describe('loadIncidents$', () => {
    it('should return a collection from LoadIncidentsSuccess', () => {
      const action = new fromActions.LoadIncidents();
      const completion = new fromActions.LoadIncidentsSuccess(pizzas);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadIncidents$).toBeObservable(expected);
    });
  });

  describe('createIncident$', () => {
    it('should work', () => {
      const action = new fromActions.CreateIncident(pizzas[0]);
      const completion = new fromActions.CreateIncidentSuccess(pizzas[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.createIncident$).toBeObservable(expected);
    });
  });

  describe('updateIncident$', () => {
    it('should work', () => {
      const action = new fromActions.UpdateIncident(pizzas[0]);
      const completion = new fromActions.UpdateIncidentSuccess(pizzas[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.updateIncident$).toBeObservable(expected);
    });
  });

  describe('removeIncident$', () => {
    it('should work', () => {
      const action = new fromActions.RemoveIncident(pizzas[0]);
      const completion = new fromActions.RemoveIncidentSuccess(pizzas[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.removeIncident$).toBeObservable(expected);
    });
  });
});
