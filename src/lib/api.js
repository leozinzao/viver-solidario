
export const api = async(
    url,
    options = {}
) => {
    const token = localStorage.getItem("token"); // salvo no login
    // Use a public API service for testing or fallback to the deployed backend
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'https://api-viver-solidario.onrender.com';
    
    const res = await fetch(
        baseUrl + url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers,
            },
        });
    if (!res.ok) {
        const errorData = await res.text();
        let parsedError;
        try {
            parsedError = JSON.parse(errorData);
        } catch (e) {
            throw new Error(errorData || res.statusText);
        }
        throw parsedError;
    }
    return res.json();
};
