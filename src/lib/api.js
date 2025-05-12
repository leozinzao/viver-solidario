export const api = async(
    url,
    options = {}
) => {
    const token = localStorage.getItem("token"); // salvo no login
    const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers,
            },
        });
    if (!res.ok) throw await res.json();
    return res.json();
};