import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as incidentActions from '../actions/incidents.action';
import * as fromServices from '../../services';

@Injectable()
export class IncidentsEffects {
  constructor(private actions$: Actions, private incidentService: fromServices.IncidentsService) {}

  @Effect()
  loadIncidents$ = this.actions$.ofType(incidentActions.LOAD_INCIDENTS).pipe(
    switchMap(() => {
      return this.incidentService.getIncidents().pipe(
        map(incidents => new incidentActions.LoadIncidentsSuccess(incidents)),
        catchError(error => of(new incidentActions.LoadIncidentsFail(error)))
      );
    })
  );

  @Effect()
  createIncident$ = this.actions$.ofType(incidentActions.CREATE_INCIDENT).pipe(
    map((action: incidentActions.CreateIncident) => action.payload),
    switchMap(incident => {
      return this.incidentService.createIncident(incident).pipe(
        map(incident => new incidentActions.CreateIncidentSuccess(incident)),
        catchError(error => of(new incidentActions.CreateIncidentFail(error)))
      );
    })
  );

  @Effect()
  createIncidentSuccess$ = this.actions$.ofType(incidentActions.CREATE_INCIDENT_SUCCESS).pipe(
    map((action: incidentActions.CreateIncidentSuccess) => action.payload),
    map(incident => {
      return new fromRoot.Go({
        path: ['/saw', incident.id]
      });
    })
  );

  @Effect()
  updateIncident$ = this.actions$.ofType(incidentActions.UPDATE_INCIDENT).pipe(
    map((action: incidentActions.UpdateIncident) => action.payload),
    switchMap(incident => {
      return this.incidentService.updateIncident(incident).pipe(
        map(incident => new incidentActions.UpdateIncidentSuccess(incident)),
        catchError(error => of(new incidentActions.UpdateIncidentFail(error)))
      );
    })
  );

  @Effect()
  removeIncident$ = this.actions$.ofType(incidentActions.REMOVE_INCIDENT).pipe(
    map((action: incidentActions.RemoveIncident) => action.payload),
    switchMap(incident => {
      return this.incidentService.removeIncident(incident).pipe(
        map(() => new incidentActions.RemoveIncidentSuccess(incident)),
        catchError(error => of(new incidentActions.RemoveIncidentFail(error)))
      );
    })
  );

  @Effect()
  handleIncidentSuccess$ = this.actions$
    .ofType(incidentActions.UPDATE_INCIDENT_SUCCESS, incidentActions.REMOVE_INCIDENT_SUCCESS)
    .pipe(
      map(incident => {
        return new fromRoot.Go({
          path: ['/saw']
        });
      })
    );
}
