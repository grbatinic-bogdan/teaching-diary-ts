import { combineReducers, Reducer, ReducersMapObject } from "redux";
import { reducer as form, FormReducer } from "redux-form";

import { reducer as user } from "../modules/user";

const reducer = {
    user,
    form
};

export default combineReducers(reducer);
