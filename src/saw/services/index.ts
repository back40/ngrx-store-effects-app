import { IncidentsService } from './incidents.service';
import { ActivityTypesService } from './activity-types.service';

export const services: any[] = [IncidentsService, ActivityTypesService];

export * from './incidents.service';
export * from './activity-types.service';
