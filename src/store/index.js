import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import myMonstrixReducer from "./myMonstrixSlice";

export default configureStore({
	reducer: {
		profile: profileReducer,
		myMonstrix: myMonstrixReducer,
	}
});