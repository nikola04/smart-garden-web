import { toast } from "sonner";

export async function apiFetch<T>(url: string, options: RequestInit = {}, auth = true): Promise<T|null> {
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

    const response = await fetch(url, {
        ...options,
        headers,
    });

    try{
        const json = await response.json();
        if (!response.ok) {
            toast(json.message);
            return null;
        }
        return json.data ?? true;
    } catch(err) {
        if(err instanceof Error && err.name != "SyntaxError")
            toast(err.message);
        else toast("Unexpected error happened.");
        return null;
    }
}

function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
}

function getCsrfToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('csrfToken');
}
