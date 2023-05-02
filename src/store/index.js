import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import myMonstrixReducer from "./myMonstrixSlice";
import arenaReducer from "./arenaSilce";

export default configureStore({
	reducer: {
		profile: profileReducer,
		myMonstrix: myMonstrixReducer,
		arena: arenaReducer,
	}
});