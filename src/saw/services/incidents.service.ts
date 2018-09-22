import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Incident } from '../models/incident.model';

@Injectable()
export class IncidentsService {
  constructor(private http: HttpClient) {}

  getIncidents(): Observable<Incident[]> {
    return this.http
      .get<Incident[]>(`/api/incidents`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createIncident(payload: Incident): Observable<Incident> {
    return this.http
      .post<Incident>(`/api/incidents`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateIncident(payload: Incident): Observable<Incident> {
    return this.http
      .put<Incident>(`/api/incidents/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removeIncident(payload: Incident): Observable<Incident> {
    return this.http
      .delete<any>(`/api/incidents/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
