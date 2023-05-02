import {createSlice} from "@reduxjs/toolkit";
import {allMonstrix} from "../data/monstrixData";


const arenaSlice = createSlice({
	name: 'arena',
	initialState: {
		stage: 1,
		enemy: allMonstrix.Reshiram,
		isFight: true,
	},
	reducers: {
	},
});

export const {} = arenaSlice.actions;

export default arenaSlice.reducer;