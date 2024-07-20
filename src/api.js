import axios from "axios";
import { ACCESS_TOKEN } from "./constants";
import {BaseUrl} from "./constants";

const api = axios.create({
    baseURL: BaseUrl
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default api