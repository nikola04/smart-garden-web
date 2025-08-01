import { apiFetch } from "@/lib/api";
import type { IUser } from "@/types/user";

export const googleCallback = async (code: string, state: string): Promise<{ user: IUser, accessToken: string, csrfToken: string }|null> => {
     try {
        const data = await apiFetch<{ user: IUser, accessToken: string, csrfToken: string }>(`/api/auth/google/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }, false);
        if (!data)
            return null;

        if (data.user && data.accessToken && data.csrfToken) {
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
        const response = await fetch('/api/auth/register', {
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

interface RegisterData {
    name: string,
    email: string,
    password: string,
}
export const registerUser = async ({ name, email, password }: RegisterData): Promise<{ user: IUser, accessToken: string, csrfToken: string }|null> => {
    try {
        const data = await apiFetch<{ user: IUser, accessToken: string, csrfToken: string }>('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        if (!data)
            return null;

        if (data.user && data.accessToken && data.csrfToken) {
            return ({ user: data.user, accessToken: data.accessToken, csrfToken: data.csrfToken });
        }
        return null;
    } catch (error) {
        console.error('Error refreshing auth token:', error);
        return null;
    }
}
