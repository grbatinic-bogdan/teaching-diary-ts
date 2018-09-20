import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import { reducer as user } from "../modules/user";
import { timeEntriesReducer as timeEntries } from '../modules/time-entry';

const reducer = {
    user,
    form,
    timeEntries
};

export default combineReducers(reducer);
