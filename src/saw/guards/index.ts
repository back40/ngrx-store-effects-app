import { IncidentsGuard } from './incidents.guard';
import { ActivityTypesGuard } from './activity-types.guard';
import { IncidentExistsGuards } from './incident-exists.guard';

export const guards: any[] = [IncidentsGuard, ActivityTypesGuard, IncidentExistsGuards];

export * from './incidents.guard';
export * from './activity-types.guard';
export * from './incident-exists.guard';
