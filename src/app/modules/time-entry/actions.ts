import { createStandardAction, createAction } from 'typesafe-actions'
import { ITimeEntry } from './interfaces'

const GET_TIME_ENTRIES_START = 'GET_TIME_ENTRIES_START';
const GET_TIME_ENTRIES_FAILURE = 'GET_TIME_ENTRIES_FAILURE';
const GET_TIME_ENTRIES_SUCCESS = 'GET_TIME_ENTRIES_SUCCESS';

export const getTimeEntriesStart = createStandardAction(GET_TIME_ENTRIES_START)<void>();
export const getTimeEntriesSuccess = createAction(GET_TIME_ENTRIES_SUCCESS, resolve => {
    return (response: ITimeEntry) => {
        response.time = (typeof response.time === 'string') ? new Date(response.time) : response.time;

        return resolve(response);
    }
});
export const getTimeEntriesFailure = createStandardAction(GET_TIME_ENTRIES_FAILURE)<string>();
