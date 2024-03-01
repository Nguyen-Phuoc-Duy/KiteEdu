import React, { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import useAlert from '../hook/useAlert';
import Loader from '../components/loader/loader';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [navigationApp, setNavigationApp] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const useFetch = useCallback(async (url, data, method = 'GET', headers = {}) => {
        try {
            const accessToken = token || user?.token || localStorage.getItem('token') || '';
            const setHeaders = {
                'Content-Type': 'application/json',
                ...headers,
                authorization: 'Bearer ' + accessToken
            }
            url = 'http://localhost:2222/' + url;
            let result;
            switch (method) {
                case 'GET':
                case "DELETE":
                    result = await axios({
                        method,
                        url,
                        headers: setHeaders,
                    });
                    result = result.data;
                    break;
                case 'POST':
                    result = await axios.post(url, data, {
                        headers: setHeaders
                    });
                    result = result.data;
                    break;
                default:
                    result = {
                        errCode: 500,
                        errMsg: 'Method not supported!'
                    };
                    break;
            }
            if (result?.errCode === 400) {
                await useAlert.alertSync('Forbidden', result.errMsg, '');
                navigationApp?.navigate('Login');
                return result;
            } else {
                return result;
            }
        } catch (err) {
            console.log('useFetch:', err);
            return 'System Error!';
        }
    }, [token, user?.token, navigationApp]);

    const loginWithToken = useCallback(async () => {
        setIsLoading(true);
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            try {
                const result = await useFetch('users/loginWithToken/' + accessToken);
                if (result.errCode === 200) {
                    setUser(result.data);
                    setToken(accessToken);
                }
            } catch (e) {
                console.log(e);
            }
        }
        setIsLoading(false);
    }, [useFetch]);

    useEffect(() => {
        loginWithToken();
    }, [loginWithToken])

    const logOut = async (navigate) => {
        try {
            setIsLoading(true);
            localStorage.removeItem('token');
            setUser(null);
            setToken(null);
            navigate('Login');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                useFetch,
                logOut,
                navigationApp,
                setNavigationApp
            }}
        >
            {isLoading ? <Loader /> : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
