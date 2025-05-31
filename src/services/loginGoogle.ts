export async function openGoogleLogin() {
    const authUrl = await fetch("/api/auth/google/login")
        .then((res) => res.json())
        .then((data) => data.data.url);

    window.location.href = authUrl;
}
