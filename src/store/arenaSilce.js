import {createSlice} from "@reduxjs/toolkit";
import {allMonstrix} from "../data/monstrixData";


const arenaSlice = createSlice({
	name: 'arena',
	initialState: {
		stage: 1,
		enemy: allMonstrix.find(elem => elem.name === 'Reshiram'),
		isFight: false,
	},
	reducers: {
		startFight(state, action){
			// state.isFight = action.payload.name;
			// state.isAuth = true;
		},
	},
});

export const {} = arenaSlice.actions;

export default arenaSlice.reducer;