import axios from "axios";
import { getToken, getCurrentMenu } from "../lib/storage";

const api = axios.create({ baseURL: "https://mml-admin.madinamaritime.com/api",});

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {config.headers.Authorization = `Bearer ${token}`;}
        const { moduleId,menuId,childMenuId,} = getCurrentMenu();
        if (moduleId !== null) {config.headers["X-Module-Id"] = moduleId;}
        if (menuId !== null) {config.headers["X-Menu-Id"] = menuId;}
        if (childMenuId !== null) {config.headers["X-Child-Menu-Id"] = childMenuId; }
        return config;
    },
    (error) => {return Promise.reject(error);}
);

export default api;