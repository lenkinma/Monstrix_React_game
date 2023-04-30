import {createSlice} from "@reduxjs/toolkit";



const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		isAuth: false,
		name: null,
		coins: 0,
	},
	reducers: {
		createGame(state, action){
			state.name = action.payload.name;
			state.isAuth = true;
		}
	},
});

export const {createGame} = profileSlice.actions;

export default profileSlice.reducer;