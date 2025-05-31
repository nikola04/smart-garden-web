"use client";

import { IUser } from "@/types/user";

export const googleCallback = async (code: string, state: string): Promise<{ user: IUser, accessToken: string, csrfToken: string }|null> => {
     try {
        const response = await fetch(`/api/auth/google/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok)
            return null;

        const json = await response.json();
        if (!json || !json.data) {
            console.error('Invalid response format:', json);
            return null;
        }
        const data = json.data as { user: IUser, accessToken: string, csrfToken: string };
        if (data && data.user && data.accessToken && data.csrfToken) {
            return ({
                user: data.user,
                accessToken: data.accessToken,
                csrfToken: data.csrfToken
            });
        }
        return null;
    } catch (error) {
        console.error('Error refreshing auth token:', error);
        return null;
    }
}

export const refreshAuthToken = async (): Promise<boolean> => {
    try {
        const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok)
            return false;

        const json = await response.json();
        if (!json || !json.data) {
            console.error('Invalid response format:', json);
            return false;
        }
        const data = json.data as { user: IUser, accessToken: string, csrfToken: string };
        if (data && data.user && data.accessToken && data.csrfToken) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('csrfToken', data.csrfToken);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error refreshing auth token:', error);
        return false;
    }
}
