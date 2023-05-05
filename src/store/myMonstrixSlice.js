import {createSlice} from "@reduxjs/toolkit";
import {allMonstrix} from "../data/monstrixData";


const myMonstrixSlice = createSlice({
	name: 'myMonstrix',
	initialState: {
		myMonstrix: [
			allMonstrix.find(elem => elem.name === 'Torracat'),
			allMonstrix.find(elem => elem.name === 'Haunter'),
			allMonstrix.find(elem => elem.name === 'Jirachi'),
		],
	},
	reducers: {
	},
});

export const {} = myMonstrixSlice.actions;

export default myMonstrixSlice.reducer;