import { refreshAuthToken } from "@/services/auth";
import { toast } from "sonner";

let isRefreshing = false;
let refreshPromise: Promise<boolean>|null = null;

const refreshToken = async (): Promise<boolean> => {
    if(!isRefreshing || !refreshPromise){
        isRefreshing = true;
        refreshPromise = refreshAuthToken().finally(() => {
            isRefreshing = false;
            refreshPromise = null;
        });
    }
    return refreshPromise;
}

export async function apiFetch<T = undefined>(url: string, options: RequestInit = {}, auth = true): Promise<(T extends undefined ? true : T) | null> {
    const origin = import.meta.env.VITE_API_URL
    const token = getAuthToken();
    const csrf = getCsrfToken();

    const headers: Record<string, string> = ({
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    });

    if (auth && token)
        headers['Authorization'] = `Bearer ${token}`;
    if (csrf)
        headers['X-csrf-token'] = csrf;

    const response = await fetch(origin + url, {
        ...options,
        headers,
    });

    try{
        const json = await response.json() as { code: number, message: string, data?: T };
        if (!response.ok) {
            if(response.status === 401 && json.message.includes("Expired authorization")) {
                const refreshed = await refreshToken();
                if(refreshed)
                    return apiFetch<T>(url, options, auth);
                resetAuthToken();
                toast("Session expired.");
                return null;
            }
            toast(json.message);
            return null;
        }

        return (json.data ?? null) as T extends undefined ? never : T;
    } catch(err) {
        if(err instanceof Error && err.name != "SyntaxError") {
            toast(err.message);
        } else toast("Unexpected error happened.");
        return null;
    }
}

function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
}

function resetAuthToken() {
    if (typeof window === 'undefined') return null;
    localStorage.removeItem('accessToken');
}

function getCsrfToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('csrfToken');
}
