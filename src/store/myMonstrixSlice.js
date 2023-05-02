import {createSlice} from "@reduxjs/toolkit";
import {allMonstrix} from "../data/monstrixData";


const myMonstrixSlice = createSlice({
	name: 'myMonstrix',
	initialState: {
		myMonstrix: [
			allMonstrix.Torracat,
			allMonstrix.Haunter,
			allMonstrix.Jirachi,
		],
	},
	reducers: {
	},
});

export const {} = myMonstrixSlice.actions;

export default myMonstrixSlice.reducer;