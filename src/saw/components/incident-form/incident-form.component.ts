import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { map } from 'rxjs/operators';

import { Incident } from '../../models/incident.model';
import { ActivityType } from '../../models/activity-type.model';

@Component({
  selector: 'incident-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['incident-form.component.scss'],
  template: `
    <div class="incident-form">
      <form [formGroup]="form">

        <label>
          <h4>Incident name</h4>
          <input
            type="text"
            formControlName="name"
            placeholder="e.g. Pepperoni"
            class="incident-form__input"
            [class.error]="nameControlInvalid">
          <div
            class="incident-form__error"
            *ngIf="nameControlInvalid">
            <p>Incident must have a name</p>
          </div>
        </label>

        <ng-content></ng-content>

        <label>
          <h4>Select activityTypes</h4>
        </label>
        <div class="incident-form__list">

          <incident-activity-types
            [activityTypes]="activityTypes"
            formControlName="activityTypes">
          </incident-activity-types>

        </div>

        <div class="incident-form__actions">
          <button
            type="button"
            class="btn btn__ok"
            *ngIf="!exists"
            (click)="createIncident(form)">
            Create Incident
          </button>

          <button
            type="button"
            class="btn btn__ok"
            *ngIf="exists"
            (click)="updateIncident(form)">
            Save changes
          </button>

          <button
            type="button"
            class="btn btn__warning"
            *ngIf="exists"
            (click)="removeIncident(form)">
            Delete Incident
          </button>
        </div>

      </form>
    </div>
  `
})
export class IncidentFormComponent implements OnChanges {
  exists = false;

  @Input()
  incident: Incident;
  @Input()
  activityTypes: ActivityType[];

  @Output()
  selected = new EventEmitter<Incident>();
  @Output()
  create = new EventEmitter<Incident>();
  @Output()
  update = new EventEmitter<Incident>();
  @Output()
  remove = new EventEmitter<Incident>();

  form = this.fb.group({
    name: ['', Validators.required],
    activityTypes: [[]]
  });

  constructor(private fb: FormBuilder) {}

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.hasError('required') && this.nameControl.touched;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.incident && this.incident.id) {
      this.exists = true;
      this.form.patchValue(this.incident);
    }
    this.form
      .get('activityTypes')
      .valueChanges.pipe(
        map(activityTypes => activityTypes.map((topping: ActivityType) => topping.id))
      )
      .subscribe(value => this.selected.emit(value));
  }

  createIncident(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
    }
  }

  updateIncident(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.incident, ...value });
    }
  }

  removeIncident(form: FormGroup) {
    const { value } = form;
    this.remove.emit({ ...this.incident, ...value });
  }
}
