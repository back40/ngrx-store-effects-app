import * as fromActivityTypes from './activityTypes.action';

describe('ActivityTypes Actions', () => {
  describe('LoadActivityTypes Actions', () => {
    describe('LoadActivityTypes', () => {
      it('should create an action', () => {
        const action = new fromActivityTypes.LoadActivityTypes();
        expect({ ...action }).toEqual({
          type: fromActivityTypes.LOAD_ACTIVITYTYPES
        });
      });
    });

    describe('LoadActivityTypesFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromActivityTypes.LoadActivityTypesFail(payload);

        expect({ ...action }).toEqual({
          type: fromActivityTypes.LOAD_ACTIVITYTYPES_FAIL,
          payload
        });
      });
    });

    describe('LoadActivityTypesSuccess', () => {
      it('should create an action', () => {
        const payload = [
          { id: 1, name: 'check fraud' },
          { id: 2, name: 'ach fraud' },
          { id: 3, name: 'money laundering' }
        ];
        const action = new fromActivityTypes.LoadActivityTypesSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromActivityTypes.LOAD_ACTIVITYTYPES_SUCCESS,
          payload
        });
      });
    });
  });

  describe('VisualiseActivityTypes Actions', () => {
    describe('VisualiseActivityTypes', () => {
      it('should create an action', () => {
        const action = new fromActivityTypes.VisualiseActivityTypes([1, 2, 3]);
        expect({ ...action }).toEqual({
          type: fromActivityTypes.VISUALISE_ACTIVITYTYPES,
          payload: [1, 2, 3]
        });
      });
    });
  });
});
