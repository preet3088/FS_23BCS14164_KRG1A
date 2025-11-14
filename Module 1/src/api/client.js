import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: { "Content-Type": "application/json" },
});

// Optional: simple response error interceptor to show messages
api.interceptors.response.use(
    (res) => res,
    (err) => {
        const msg =
            err?.response?.data?.error ||
            err?.response?.data?.message ||
            err?.message ||
            "Request failed";
        console.error("API Error:", msg);
        return Promise.reject(err);
    }
);
