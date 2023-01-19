// authActions.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const backendURL = 'http://127.0.0.1:5000';

export const registerUser = createAsyncThunk(
	'auth/register',
	async ({ name, email, password }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			await axios.post(
				`${backendURL}/register`,
				{ name, email, password },
				config
			);
		} catch (error) {
			// return custom error message from backend if present
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const userLogin = createAsyncThunk(
	'auth/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			// configure header's Content-Type as JSON
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const { data } = await axios.post(`${backendURL}/login`, config, {
				auth: {
					username: email,
					password: password,
				},
			});
			// store user's token in local storage
			localStorage.setItem('token', data.token);
			return data;
		} catch (error) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
