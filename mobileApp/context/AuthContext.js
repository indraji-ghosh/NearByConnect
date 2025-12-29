import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";
export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    
    // Restore session on app start
    useEffect(() => {
        const restoreToken = async () => {
            try {
                const token = await SecureStore.getItemAsync("refreshToken");
                if (token) {
                    setAccessToken(token);
                    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    // Optionally fetch user data here if needed
                }
            } catch (err) {
                console.log("Error restoring token:", err);
            } finally {
                setIsLoading(false);
            }
        };
        restoreToken();
    }, []);
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
        router.replace('/(app)/(tabs)/(chat)');



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
            router.push('/(auth)/LoginScreen');
        }

    }
    const register = async (username, email, password) => {
        try {
            const { data } = await api.post("/auth/signup", {
                username,
                email,
                password
            });
            setAccessToken(data.accessToken);
            setUser(data.user);
            console.log("Registration Successful:", data);
            
            // Set auth header for subsequent requests
            api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
            await SecureStore.setItemAsync("refreshToken", data.refreshToken);
            
            router.push('/(app)/(chat)');
            return data.user;
        } catch (err) {
            throw err;
        }
    }

    return(
        <AuthContext.Provider value={{user, accessToken, login, logout, register, isLoading}}>
            {children}
        </AuthContext.Provider>
    )

    }
