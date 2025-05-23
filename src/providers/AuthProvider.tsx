"use client";
import { IUser } from '@/types/user';
import React, { createContext, useCallback, useEffect, useState } from 'react';

interface IAuthContext {
    loading: boolean;
    loggedIn: boolean;
    user: IUser | null;
    login: (user: IUser, access: string, csrf: string) => void;
    logout: () => void;
}
const initialState: IAuthContext = {
    loggedIn: false,
    loading: true,
    user: null,
    login: (_user: IUser, _access: string, _csrf: string) => {},// eslint-disable-line @typescript-eslint/no-unused-vars
    logout: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        setLoading(true);
        const csrfToken = localStorage.getItem('csrfToken');
        try {
            const response = await fetch(`/api/user/@me?csrf=${csrfToken}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (response.ok) {
                const json = await response.json();
                if(json?.data?.user) {
                    setUser(json.data.user);
                    setLoggedIn(true);
                }else setUser(null);
            } else {
                setUser(null);
                setLoggedIn(false);
            }
        }
        catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);
            setLoggedIn(false);
        }
        finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback((userData: IUser, access: string, csrf: string) => {
        setLoggedIn(true);
        setUser(userData);
        setLoading(false);
        localStorage.setItem('accessToken', access);
        localStorage.setItem('csrfToken', csrf);
    }, []);

    const logout = useCallback(() => {
        setLoggedIn(false);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('csrfToken');
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            fetchUser();
        } else {
            setLoading(false);
            setLoggedIn(false);
            setUser(null);
        }
    }, [fetchUser]);

    return <AuthContext.Provider value={{ loggedIn, loading, user, login, logout }}>
        {children}
    </AuthContext.Provider>
};
