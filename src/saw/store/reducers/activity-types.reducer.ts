import * as fromActivityTypes from '../actions/activityTypes.action';
import { ActivityType } from '../../models/activity-type.model';

export interface ActivityTypesState {
  entities: { [id: number]: ActivityType };
  loaded: boolean;
  loading: boolean;
  selectedActivityTypes: number[];
}

export const initialState: ActivityTypesState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedActivityTypes: []
};

export function reducer(
  state = initialState,
  action: fromActivityTypes.ActivityTypesAction
): ActivityTypesState {
  switch (action.type) {
    case fromActivityTypes.VISUALISE_ACTIVITYTYPES: {
      const selectedActivityTypes = action.payload;

      return {
        ...state,
        selectedActivityTypes
      };
    }

    case fromActivityTypes.LOAD_ACTIVITYTYPES: {
      return {
        ...state,
        loading: true
      };
    }

    case fromActivityTypes.LOAD_ACTIVITYTYPES_SUCCESS: {
      const toppings = action.payload;

      const entities = toppings.reduce(
        (entities: { [id: number]: ActivityType }, topping: ActivityType) => {
          return {
            ...entities,
            [topping.id]: topping
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loaded: true,
        loading: false,
        entities
      };
    }

    case fromActivityTypes.LOAD_ACTIVITYTYPES_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
  }

  return state;
}

export const getActivityTypeEntities = (state: ActivityTypesState) => state.entities;
export const getActivityTypesLoaded = (state: ActivityTypesState) => state.loaded;
export const getActivityTypesLoading = (state: ActivityTypesState) => state.loading;
export const getSelectedActivityTypes = (state: ActivityTypesState) => state.selectedActivityTypes;
