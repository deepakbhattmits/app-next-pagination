/** @format */

import axios from 'axios';

//  baseURL
const api = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/',
});
export default api;
