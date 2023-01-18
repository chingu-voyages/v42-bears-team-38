import axios from 'axios';
import { instance } from './axiosInstance';

export const registerUser = async data => {
	var config = {
		method: 'post',
		url: 'register',
		data: data,
	};

	return await instance
		.post('register', data)
		.then(function (response) {
			console.log(JSON.stringify(response.data));
		})
		.catch(function (error) {
			console.log(error);
		});
};

export const loginUser = async (email, password) => {
	var config = {
		method: 'post',
		url: 'http://127.0.0.1:5000/login',
		headers: {
			'Content-Type': 'application/json',
			Authorization: { username: email, password },
		},
	};

	return await axios(config)
		.then(function (response) {
			const { token } = response.data;
			return token;
		})
		.catch(function (error) {
			throw new Error(`Unable to login: ${error}`);
		});
};

export const getUserData = async () => {
	return await instance
		.get('/getUser')
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			throw new Error(`Not able to retrieve user data: ${error}`);
		});
};
