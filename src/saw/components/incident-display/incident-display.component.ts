import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { transition, style, animate, trigger } from '@angular/animations';

import { Incident } from '../../models/incident.model';

export const DROP_ANIMATION = trigger('drop', [
  transition(':enter', [
    style({ transform: 'translateY(-200px)', opacity: 0 }),
    animate(
      '300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
      style({ transform: 'translateY(0)', opacity: 1 })
    )
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate(
      '200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
      style({ transform: 'translateY(-200px)', opacity: 0 })
    )
  ])
]);

@Component({
  selector: 'incident-display',
  animations: [DROP_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['incident-display.component.scss'],
  template: `
    <div class="incident-display">
      <div class="incident-display__base">
        <img src="/assets/img/pizza.svg">
        <img
          *ngFor="let activityType of incident?.activityTypes; index as i;"
          src="/assets/img/toppings/onion.svg"
          [style.zIndex]="i"
          class="incident-display__activityType"
          @drop>
      </div>
    </div>
  `
})
export class IncidentDisplayComponent {
  @Input()
  incident: Incident;
}
