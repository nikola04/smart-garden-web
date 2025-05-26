"use client";

import { IUser } from "@/types/user";

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
