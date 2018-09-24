import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Incident } from '../../models/incident.model';

@Component({
  selector: 'saw',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['saw.component.scss'],
  template: `
    <div class="saw">
      <div class="saw__new">
        <a
          class="btn btn__ok"
          routerLink="./new">
          New Incident
        </a>
      </div>
      <div class="saw__list">
        <div *ngIf="!((incidents$ | async)?.length)">
          No incidents, add one to get started.
        </div>
        <incident-item
          *ngFor="let incident of (incidents$ | async)"
          [incident]="incident">
        </incident-item>

      </div>
    </div>
  `
})
export class SawComponent implements OnInit {
  incidents$: Observable<Incident[]>;

  constructor(private store: Store<fromStore.SawState>) {}

  ngOnInit() {
    this.incidents$ = this.store.select(fromStore.getAllIncidents);
  }
}
