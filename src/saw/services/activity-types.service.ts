import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { ActivityType } from '../models/activity-type.model';

@Injectable()
export class ActivityTypesService {
  constructor(private http: HttpClient) {}

  getActivityTypes(): Observable<ActivityType[]> {
    return this.http
      .get<ActivityType[]>(`/api/activityTypes`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
