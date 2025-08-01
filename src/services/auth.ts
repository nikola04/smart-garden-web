import { apiFetch } from "@/lib/api";
import type { IUser } from "@/types/user";

export const googleCallback = async (code: string, state: string): Promise<{ user: IUser, accessToken: string, csrfToken: string }|null> => {
     try {
        const data = await apiFetch<{ user: IUser, accessToken: string, csrfToken: string }>(`/auth/google/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`, {
            method: 'GET',
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
        const data = await apiFetch<{ user: IUser, accessToken: string, csrfToken: string }>('/auth/refresh', {
            method: 'POST',
        }, false);

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
        const data = await apiFetch<{ user: IUser, accessToken: string, csrfToken: string }>('/auth/register', {
            method: 'POST',
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
