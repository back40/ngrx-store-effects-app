import { Action } from '@ngrx/store';

import { Incident } from '../../models/incident.model';

// load pizzas
export const LOAD_INCIDENTS = '[Saw] Load Incidents';
export const LOAD_INCIDENTS_FAIL = '[Saw] Load Incidents Fail';
export const LOAD_INCIDENTS_SUCCESS = '[Saw] Load Incidents Success';

export class LoadIncidents implements Action {
  readonly type = LOAD_INCIDENTS;
}

export class LoadIncidentsFail implements Action {
  readonly type = LOAD_INCIDENTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadIncidentsSuccess implements Action {
  readonly type = LOAD_INCIDENTS_SUCCESS;
  constructor(public payload: Incident[]) {}
}

// create pizza
export const CREATE_INCIDENT = '[Saw] Create Incident';
export const CREATE_INCIDENT_FAIL = '[Saw] Create Incident Fail';
export const CREATE_INCIDENT_SUCCESS = '[Saw] Create Incident Success';

export class CreateIncident implements Action {
  readonly type = CREATE_INCIDENT;
  constructor(public payload: Incident) {}
}

export class CreateIncidentFail implements Action {
  readonly type = CREATE_INCIDENT_FAIL;
  constructor(public payload: any) {}
}

export class CreateIncidentSuccess implements Action {
  readonly type = CREATE_INCIDENT_SUCCESS;
  constructor(public payload: Incident) {}
}

// update pizza
export const UPDATE_INCIDENT = '[Saw] Update Incident';
export const UPDATE_INCIDENT_FAIL = '[Saw] Update Incident Fail';
export const UPDATE_INCIDENT_SUCCESS = '[Saw] Update Incident Success';

export class UpdateIncident implements Action {
  readonly type = UPDATE_INCIDENT;
  constructor(public payload: Incident) {}
}

export class UpdateIncidentFail implements Action {
  readonly type = UPDATE_INCIDENT_FAIL;
  constructor(public payload: any) {}
}

export class UpdateIncidentSuccess implements Action {
  readonly type = UPDATE_INCIDENT_SUCCESS;
  constructor(public payload: Incident) {}
}

// remove pizza
export const REMOVE_INCIDENT = '[Saw] Remove Incident';
export const REMOVE_INCIDENT_FAIL = '[Saw] Remove Incident Fail';
export const REMOVE_INCIDENT_SUCCESS = '[Saw] Remove Incident Success';

export class RemoveIncident implements Action {
  readonly type = REMOVE_INCIDENT;
  constructor(public payload: Incident) {}
}

export class RemoveIncidentFail implements Action {
  readonly type = REMOVE_INCIDENT_FAIL;
  constructor(public payload: any) {}
}

export class RemoveIncidentSuccess implements Action {
  readonly type = REMOVE_INCIDENT_SUCCESS;
  constructor(public payload: Incident) {}
}

// action types
export type IncidentsAction =
  | LoadIncidents
  | LoadIncidentsFail
  | LoadIncidentsSuccess
  | CreateIncident
  | CreateIncidentFail
  | CreateIncidentSuccess
  | UpdateIncident
  | UpdateIncidentFail
  | UpdateIncidentSuccess
  | RemoveIncident
  | RemoveIncidentFail
  | RemoveIncidentSuccess;
