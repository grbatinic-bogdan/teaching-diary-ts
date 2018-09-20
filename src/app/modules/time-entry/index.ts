import { ActionType, getType } from 'typesafe-actions';

import { normalizeTimeEntries } from './normalizr';
import { ITimeEntryState } from './interfaces';
import * as timeEntriesActions from './actions';
import api from '../../services/api';

type TimeEntryActions = ActionType<typeof timeEntriesActions>;

export const getTimeEntries = () => {
    return (dispatch: Function) => {
        dispatch(timeEntriesActions.getTimeEntriesStart());
        api(
            'time-entry',
            'GET'
        )
        .then((response) => {
            const { data } = response;

            dispatch(timeEntriesActions.getTimeEntriesSuccess(data));
        })
        .catch((error) => {
            dispatch(timeEntriesActions.getTimeEntriesFailure(error.toString()));
        })
    }
};

export const timeEntriesReducer = (state: ITimeEntryState | null, action: TimeEntryActions) => {
    switch (action.type) {
        case (getType(timeEntriesActions.getTimeEntriesSuccess)): {
            return normalizeTimeEntries(action.payload);
        }
        default:
            return null;
    }
}

/*
export const timeEntriesReducer = handleActions({
    [getTimeEntriesSuccess](state, { payload } ) {
        return normalizeTimeEntries(payload);
    }
}, null);
*/

