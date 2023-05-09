import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//fake async fetching
function fetchTimeout(timeout = 500, func) {
	return new Promise((resolve) =>
		setTimeout(() => {resolve({ data: true });},  timeout)
	);
}
export const fetchingAsync = createAsyncThunk(
	'profile/fetching',
	async ({timeout, func = null}, {dispatch}) => {
		const response = await fetchTimeout(timeout, func);
		if (func) dispatch(func());
		return response.data;
	}
);

const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		isAuth: false,
		name: null,
		coins: 5000,
		isFetching: false,
		errorNotification: {
			status: false,
			text: '',
		},
		successNotification: {
			status: false,
			text: '',
		}
	},
	reducers: {
		createGame(state, action){
			state.name = action.payload.name;
			state.isAuth = true;
		},
		setCoins(state, action){
			state.coins = action.payload.coins;
		},
		setErrorNotification(state, action){
			state.errorNotification.status = action.payload.status;
			state.errorNotification.text = action.payload.text;
		},
		setSuccessNotification(state, action){
			state.successNotification.status = action.payload.status;
			state.successNotification.text = action.payload.text;
		},
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

export const {createGame, setCoins, setErrorNotification, setSuccessNotification} = profileSlice.actions;

export default profileSlice.reducer;