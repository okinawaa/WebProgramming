import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./ducks/auth";

const rootReducer = combineReducers({
    auth: authSlice,
});

export default rootReducer;
