import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//fake async fetching
function fetchTimeout(timeout = 500, func) {
	return new Promise((resolve) =>
		setTimeout(() => {resolve({ data: true });},  timeout)
	);
}
export const fetchingAsync = createAsyncThunk(
	'profile/fetching',
	async ({timeout, func}, {dispatch}) => {
		const response = await fetchTimeout(timeout, func);
		dispatch(func());
		return response.data;
	}
);

const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		isAuth: false,
		name: null,
		coins: 100,
		isFetching: false,
	},
	reducers: {
		createGame(state, action){
			state.name = action.payload.name;
			state.isAuth = true;
		}
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

export const {createGame} = profileSlice.actions;

export default profileSlice.reducer;