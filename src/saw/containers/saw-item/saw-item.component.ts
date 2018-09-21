import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import * as fromStore from '../../store';

import { Incident } from '../../models/incident.model';
import { ActivityType } from '../../models/activity-type.model';

@Component({
  selector: 'saw-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['saw-item.component.scss'],
  template: `
    <div
      class="saw-item">
      <incident-form
        [incident]="incident$ | async"
        [activityTypes]="activityTypes$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <incident-display
          [incident]="visualise$ | async">
        </incident-display>
      </incident-form>
    </div>
  `
})
export class SawItemComponent implements OnInit {
  incident$: Observable<Incident>;
  visualise$: Observable<Incident>;
  activityTypes$: Observable<ActivityType[]>;

  constructor(private store: Store<fromStore.SawState>) {}

  ngOnInit() {
    this.incident$ = this.store.select(fromStore.getSelectedIncident).pipe(
      tap((incident: Incident = null) => {
        const incidentExists = !!(incident && incident.activityTypes);
        const activityTypes = incidentExists
          ? incident.activityTypes.map(activityType => activityType.id)
          : [];
        this.store.dispatch(new fromStore.VisualiseActivityTypes(activityTypes));
      })
    );
    this.activityTypes$ = this.store.select(fromStore.getAllActivityTypes);
    this.visualise$ = this.store.select(fromStore.getIncidentVisualised);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new fromStore.VisualiseActivityTypes(event));
  }

  onCreate(event: Incident) {
    this.store.dispatch(new fromStore.CreateIncident(event));
  }

  onUpdate(event: Incident) {
    this.store.dispatch(new fromStore.UpdateIncident(event));
  }

  onRemove(event: Incident) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromStore.RemoveIncident(event));
    }
  }
}
