import axios, { Axios } from "axios";

const http = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

export { http }