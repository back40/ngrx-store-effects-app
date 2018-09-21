import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as activityTypesActions from '../actions/activityTypes.action';
import * as fromServices from '../../services/activity-types.service';

@Injectable()
export class ActivityTypesEffects {
  constructor(
    private actions$: Actions,
    private activityTypessService: fromServices.ActivityTypesService
  ) {}

  @Effect()
  loadActivityTypes$ = this.actions$.ofType(activityTypesActions.LOAD_ACTIVITYTYPES).pipe(
    switchMap(() => {
      return this.activityTypessService.getActivityTypes().pipe(
        map(activityTypess => new activityTypesActions.LoadActivityTypesSuccess(activityTypess)),
        catchError(error => of(new activityTypesActions.LoadActivityTypesFail(error)))
      );
    })
  );
}
