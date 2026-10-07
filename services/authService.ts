
import api from "./api";
import {setToken, setUser, removeToken, setUserAccess} from "../lib/storage";

import type {
    LoginPayload,
    RegisterPayload,
    AuthResponse
} from "./types";

export const login = async(data:LoginPayload)=>{
    const response = await api.post<AuthResponse>("/auth/login", data);
    setToken(response.data.token);
    setUser(response.data.user);
    setUserAccess(response.data.accesses);
    return response.data;
};

export const register = async(data:RegisterPayload)=>{
    const response = await api.post("/auth/register",data);
    return response.data;
};

export const logout = async()=>{
    const response = await api.post("/auth/logout");
    removeToken();
    return response.data;
}
