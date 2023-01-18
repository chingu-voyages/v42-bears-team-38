import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loggedIn: false,
	user: {
		name: null,
		email: null,
		admin: false,
		id: null,
	},
	token: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: state => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.loggedIn = true;
		},
		logout: state => {
			localStorage.removeItem('token');
			state.loggedIn = false;
		},
		saveUserData: (state, action) => {
			state.user = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout, saveUserData } = userSlice.actions;

export default userSlice.reducer;
