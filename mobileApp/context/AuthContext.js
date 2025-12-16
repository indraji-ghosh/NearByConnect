import { createContext,useState } from "react";
import api from "../api/axios";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";
export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const router = useRouter()
    const login = async (loginId, password) =>{
        try {
            const { data } = await api.post("/auth/login",{
                loginId,
                password
            });
            setAccessToken(data.accessToken);
           
            setUser(data.user);
            console.log("Login Successful:", data);
             console.log(data.accessToken)
        router.push('/home')


            // Set auth header for subsequent requests
            api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
            await SecureStore.setItemAsync("refreshToken", data.refreshToken);
            return data.user;
        } catch (err) {
            // Bubble up so UI can show feedback
            throw err;
        }
    }
       
    const logout = async () =>{
        try {
            const refreshToken = await SecureStore.getItemAsync("refreshToken");
            if (refreshToken) {
                await api.post("/auth/logout",{ refreshToken });
            }
        } finally {
            setAccessToken(null);
            setUser(null);
            delete api.defaults.headers.common["Authorization"];
            await SecureStore.deleteItemAsync("refreshToken");
        }

    }


    return(
        <AuthContext.Provider value={{user, accessToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

    }
