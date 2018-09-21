import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivityType } from '../../models/activity-type.model';

const INCIDENT_ACTIVITYTYPE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IncidentActivityTypesComponent),
  multi: true
};

@Component({
  selector: 'incident-activity-types',
  providers: [INCIDENT_ACTIVITYTYPE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['incident-activity-types.component.scss'],
  template: `
    <div class="incident-activity-types">
      <div
        class="incident-activity-types-item"
        *ngFor="let activityType of activityTypes;"
        (click)="selectActivityType(activityType)"
        [class.active]="existsInActivityTypes(activityType)">
        <img src="/assets/img/toppings/singles/{{ activityType.name }}.svg">
        {{ activityType.name }}
      </div>
    </div>
  `
})
export class IncidentActivityTypesComponent implements ControlValueAccessor {
  @Input()
  activityTypes: ActivityType[] = [];

  value: ActivityType[] = [];

  private onTouch: Function;
  private onModelChange: Function;

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: ActivityType[]) {
    this.value = value;
  }

  selectActivityType(activityType: ActivityType) {
    if (this.existsInActivityTypes(activityType)) {
      this.value = this.value.filter(item => item.id !== activityType.id);
    } else {
      this.value = [...this.value, activityType];
    }
    this.onTouch();
    this.onModelChange(this.value);
  }

  existsInActivityTypes(activityType: ActivityType) {
    return this.value.some(val => val.id === activityType.id);
  }
}
