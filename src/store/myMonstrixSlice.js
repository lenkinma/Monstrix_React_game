import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {allMonstrix} from "../data/monstrixData";

//fake async fetching
function fetchTimeout(timeout = 500, func) {
	return new Promise((resolve) =>
		setTimeout(() => {resolve({ data: true });},  timeout)
	);
}
export const fetchingAsync = createAsyncThunk(
	'myMonstrix/fetching',
	async ({timeout, func}, {dispatch}) => {
		const response = await fetchTimeout(timeout, func);
		dispatch(func());
		return response.data;
	}
);

const myMonstrixSlice = createSlice({
	name: 'myMonstrix',
	initialState: {
		myMonstrix: [
			allMonstrix.Torracat,
			allMonstrix.Haunter,
			allMonstrix.Jirachi,
		],
		isFetching: false,
	},
	reducers: {
	},
	extraReducers: {
		[fetchingAsync.pending]: (state, action) => {
			state.isFetching = true;
		},
		[fetchingAsync.fulfilled]: (state, action) => {
			state.isFetching = false;
		},
	}
});

export const {} = myMonstrixSlice.actions;

export default myMonstrixSlice.reducer;