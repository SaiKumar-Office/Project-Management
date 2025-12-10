// src/Apis/authApi.ts

const BASE_URL = "http://localhost:8000/auth"; // adjust if needed

// Signup
export async function signupApi(data: {
    name: string;
    email: string;
    password: string;
    // role: string;
}) {
    const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Signup failed");
    }

    return res.json();
}

// Login
export async function loginApi(data: { email: string; password: string }) {
    const form = new URLSearchParams();
    form.append("username", data.email);
    form.append("password", data.password);

    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        body: form,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    if (!res.ok) throw new Error("Invalid credentials");
    return res.json();
}

// Get current user (/me)
export async function getMeApi(token: string) {
    const res = await fetch(`${BASE_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error("Unauthorized");
    return res.json();
}

// Logout
export async function logoutApi(token: string) {
    const res = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Logout failed");
    return res.json();
}

// Admin: Get all users
export async function getAllUsersApi(token: string) {
    const res = await fetch(`${BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error("Not authorized");
    return res.json();
}
