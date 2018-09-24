import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import * as fromStore from '../store';

import { Incident } from '../models/incident.model';

@Injectable()
export class IncidentExistsGuards implements CanActivate {
  constructor(private store: Store<fromStore.SawState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.incidentId, 10);
        return this.hasIncident(id);
      })
    );
  }

  hasIncident(id: number): Observable<boolean> {
    return this.store.select(fromStore.getIncidentsEntities).pipe(
      map((entities: { [key: number]: Incident }) => !!entities[id]),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getIncidentsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadIncidents());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
