export async function getGoogleLoginURL() {
    const origin = import.meta.env.VITE_API_URL
    return fetch(`${origin}/auth/google/login`)
        .then((res) => res.json())
        .then((data) => data.data.url);
}
