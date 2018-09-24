import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'incident-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['incident-item.component.scss'],
  template: `
    <div class="incident-item">
      <a [routerLink]="['/saw', incident.id]">
        <!--<incident-display
          [incident]="incident">
        </incident-display>-->
        <h4>{{ incident.name }}</h4>
        <button type="button" class="btn btn__ok">
          View Incident
        </button>
      </a>
    </div>
  `
})
export class IncidentItemComponent {
  @Input()
  incident: any;
}
