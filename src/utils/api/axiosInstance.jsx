import axios from 'axios';
import { api_base_url } from './urls';

export const getToken = () =>
	localStorage.getItem('token') ? localStorage.getItem('token') : null;

export const instance = axios.create({
	baseURL: api_base_url,
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json',
		'X-Auth-Token': getToken(),
	},
});
