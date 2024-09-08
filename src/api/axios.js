import axios from "axios";

const BASE_URL = 'https://localhost:7001/api' //http://192.168.1.3:8096/api

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});