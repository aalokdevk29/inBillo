import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import loginReducer from "./reducer";

export const rootReducer = combineReducers({
  form: formReducer,
  login: loginReducer,
});
