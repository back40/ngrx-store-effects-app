import { Action } from '@ngrx/store';

import { ActivityType } from '../../models/activity-type.model';

export const LOAD_ACTIVITYTYPES = '[Saw] Load ActivityTypes';
export const LOAD_ACTIVITYTYPES_FAIL = '[Saw] Load ActivityTypes Fail';
export const LOAD_ACTIVITYTYPES_SUCCESS = '[Saw] Load ActivityTypes Success';
export const VISUALISE_ACTIVITYTYPES = '[Saw] Visualise ActivityTypes';

export class LoadActivityTypes implements Action {
  readonly type = LOAD_ACTIVITYTYPES;
}

export class LoadActivityTypesFail implements Action {
  readonly type = LOAD_ACTIVITYTYPES_FAIL;
  constructor(public payload: any) {}
}

export class LoadActivityTypesSuccess implements Action {
  readonly type = LOAD_ACTIVITYTYPES_SUCCESS;
  constructor(public payload: ActivityType[]) {}
}

export class VisualiseActivityTypes implements Action {
  readonly type = VISUALISE_ACTIVITYTYPES;
  constructor(public payload: number[]) {}
}

// action types
export type ActivityTypesAction =
  | LoadActivityTypes
  | LoadActivityTypesFail
  | LoadActivityTypesSuccess
  | VisualiseActivityTypes;
