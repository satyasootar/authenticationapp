import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCurrentUser = async () => {
        try {
            const response = await API.get("/users/current-user");
            if (response.data.success) {
                setUser(response.data.data);
            }
        } catch (error) {
            console.error("Not logged in");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await API.post("/users/login", { username, password });
            if (response.data.success) {
                setUser(response.data.data.user);
                toast.success("Login successful!");
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            return false;
        }
    };

    const register = async (userData) => {
        try {
            const response = await API.post("/users/register", userData);
            if (response.data.success) {
                toast.success("Registration successful!");
                return await login(userData.username, userData.password);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
            return false;
        }
    };

    const verifyEmail = async (token) => {
        try {
            const response = await API.get(`/users/verify-email/${token}`);
            if (response.data.success) {
                toast.success("Email verified successfully!");
                await fetchCurrentUser(); 
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Verification failed");
            return false;
        }
    };

    const resendVerificationEmail = async () => {
        try {
            const response = await API.post("/users/resend-email-verification");
            if (response.data.success) {
                toast.success("Verification email sent! Check your inbox.");
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send email");
            return false;
        }
    };

    const updateAvatar = async (file) => {
        try {
            const formData = new FormData();
            formData.append("avatar", file);

            const response = await API.patch("/users/avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                toast.success("Avatar updated successfully!");
                await fetchCurrentUser();
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update avatar");
            return false;
        }
    };

    const logout = async () => {
        try {
            const response = await API.post("/users/logout");
            if (response.data.success) {
                setUser(null);
                toast.success("Logged out successfully");
            }
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, register, logout, verifyEmail, resendVerificationEmail, updateAvatar, fetchCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
