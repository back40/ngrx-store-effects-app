import { ActivityType } from './activity-type.model';

export interface Incident {
  id?: number;
  name?: string;
  activityTypes?: ActivityType[];
}
