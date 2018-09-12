import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import { reducer as user } from "../modules/user";

export default combineReducers({
    user,
    form,    
});
