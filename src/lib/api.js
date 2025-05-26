export const api = async(
    url,
    options = {}
) => {
    const token = localStorage.getItem("token"); // token salvo após login

    // Define a URL base a partir do .env ou usa uma URL padrão
    const baseUrl =
        import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    try {
        const response = await fetch(`${baseUrl}${url}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch {
                throw new Error(errorText || response.statusText);
            }
            throw errorData;
        }

        return await response.json();
    } catch (error) {
        console.error("Erro na API:", error);
        throw error;
    }
};