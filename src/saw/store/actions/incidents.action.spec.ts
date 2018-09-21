import * as fromIncidents from './incidents.action';

describe('Incidents Actions', () => {
  describe('LoadIncidents Actions', () => {
    describe('LoadIncidents', () => {
      it('should create an action', () => {
        const action = new fromIncidents.LoadIncidents();

        expect({ ...action }).toEqual({
          type: fromIncidents.LOAD_INCIDENTS
        });
      });
    });

    describe('LoadIncidentsFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromIncidents.LoadIncidentsFail(payload);

        expect({ ...action }).toEqual({
          type: fromIncidents.LOAD_INCIDENTS_FAIL,
          payload
        });
      });
    });

    describe('LoadIncidentsSuccess', () => {
      it('should create an action', () => {
        const payload = [
          {
            id: 1,
            name: 'Incident #1',
            actitvityTypes: [
              { id: 1, name: 'check fraud' },
              { id: 2, name: 'ach fraud' },
              { id: 3, name: 'money laundering' }
            ]
          },
          {
            id: 2,
            name: 'Incident #2',
            actitvityTypes: [
              { id: 1, name: 'check fraud' },
              { id: 2, name: 'ach fraud' },
              { id: 3, name: 'money laundering' }
            ]
          }
        ];
        const action = new fromIncidents.LoadIncidentsSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromIncidents.LOAD_INCIDENTS_SUCCESS,
          payload
        });
      });
    });
  });

  describe('CreateIncident Actions', () => {
    describe('CreateIncident', () => {
      it('should create an action', () => {
        const payload = {
          name: 'Incident #2',
          actitvityTypes: [
            { id: 1, name: 'check fraud' },
            { id: 2, name: 'ach fraud' },
            { id: 3, name: 'money laundering' }
          ]
        };
        const action = new fromIncidents.CreateIncident(payload);

        expect({ ...action }).toEqual({
          type: fromIncidents.CREATE_INCIDENT,
          payload
        });
      });
    });

    describe('CreateIncidentFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Create Error' };
        const action = new fromIncidents.CreateIncidentFail(payload);

        expect({ ...action }).toEqual({
          type: fromIncidents.CREATE_INCIDENT_FAIL,
          payload
        });
      });
    });

    describe('CreateIncidentSuccess', () => {
      it('should create an action', () => {
        const payload = {
          id: 2,
          name: 'Incident #2',
          actitvityTypes: [
            { id: 1, name: 'check fraud' },
            { id: 2, name: 'ach fraud' },
            { id: 3, name: 'money laundering' }
          ]
        };
        const action = new fromIncidents.CreateIncidentSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromIncidents.CREATE_INCIDENT_SUCCESS,
          payload
        });
      });
    });
  });

  describe('UpdateIncident Actions', () => {
    describe('UpdateIncident', () => {
      it('should create an action', () => {
        const payload = {
          id: 2,
          name: 'Incident #2',
          actitvityTypes: [
            { id: 1, name: 'check fraud' },
            { id: 2, name: 'ach fraud' },
            { id: 3, name: 'money laundering' }
          ]
        };
        const action = new fromIncidents.UpdateIncident(payload);

        expect({ ...action }).toEqual({
          type: fromIncidents.UPDATE_INCIDENT,
          payload
        });
      });
    });

    describe('UpdateIncidentFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Update Error' };
        const action = new fromIncidents.UpdateIncidentFail(payload);

        expect({ ...action }).toEqual({
          type: fromIncidents.UPDATE_INCIDENT_FAIL,
          payload
        });
      });
    });

    describe('UpdateIncidentSuccess', () => {
      it('should create an action', () => {
        const payload = {
          id: 2,
          name: 'Incident #2',
          actitvityTypes: [
            { id: 1, name: 'check fraud' },
            { id: 2, name: 'ach fraud' },
            { id: 3, name: 'money laundering' }
          ]
        };
        const action = new fromIncidents.UpdateIncidentSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromIncidents.UPDATE_INCIDENT_SUCCESS,
          payload
        });
      });
    });
  });

  describe('RemoveIncident Actions', () => {
    describe('RemoveIncident', () => {
      it('should create an action', () => {
        const payload = {
          id: 2,
          name: 'Incident #2',
          actitvityTypes: [
            { id: 1, name: 'check fraud' },
            { id: 2, name: 'ach fraud' },
            { id: 3, name: 'money laundering' }
          ]
        };
        const action = new fromIncidents.RemoveIncident(payload);

        expect({ ...action }).toEqual({
          type: fromIncidents.REMOVE_INCIDENT,
          payload
        });
      });
    });

    describe('RemoveIncidentFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Remove Error' };
        const action = new fromIncidents.RemoveIncidentFail(payload);

        expect({ ...action }).toEqual({
          type: fromIncidents.REMOVE_INCIDENT_FAIL,
          payload
        });
      });
    });

    describe('RemoveIncidentSuccess', () => {
      it('should create an action', () => {
        const payload = {
          id: 2,
          name: 'Incident #2',
          actitvityTypes: [
            { id: 1, name: 'check fraud' },
            { id: 2, name: 'ach fraud' },
            { id: 3, name: 'money laundering' }
          ]
        };
        const action = new fromIncidents.RemoveIncidentSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromIncidents.REMOVE_INCIDENT_SUCCESS,
          payload
        });
      });
    });
  });
});
