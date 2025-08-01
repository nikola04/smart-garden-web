import { AuthContext } from '@/contexts/AuthContext';
import { apiFetch } from '@/lib/api';
import type { IUser } from '@/types/user';
import { useCallback, useEffect, useState, type PropsWithChildren } from 'react';

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiFetch<{ user: IUser }>(`/user/@me`);
            if (response && typeof response === "object" && 'user' in response) {
                setUser(response.user);
                setLoggedIn(true);
            } else {
                setUser(null);
                setLoggedIn(false);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);
            setLoggedIn(false);
        } finally {
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
