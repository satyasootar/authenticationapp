import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "ADMIN"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const success = await register(formData);
        setIsSubmitting(false);
        if (success) navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black">
            <div className="w-full max-w-[400px] animate-in">
                <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Create an Account</h1>
                    <p className="text-accents-5 text-sm">Join the platform to manage your profile</p>
                </div>

                <div className="geist-card p-8 shadow-2xl shadow-white/[0.02]">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium text-accents-6 ml-1">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                spellCheck={false}
                                value={formData.username}
                                onChange={handleChange}
                                className="geist-input focus:border-white"
                                placeholder="johndoe…"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-accents-6 ml-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                spellCheck={false}
                                value={formData.email}
                                onChange={handleChange}
                                className="geist-input focus:border-white"
                                placeholder="name@example.com…"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" name="password" className="text-sm font-medium text-accents-6 ml-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleChange}
                                className="geist-input focus:border-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="role" className="text-sm font-medium text-accents-6 ml-1">
                                Account Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="geist-input focus:border-white appearance-none cursor-pointer"
                                required
                            >
                                <option value="ADMIN">Administrator</option>
                                <option value="USER">Standard User</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="geist-button w-full mt-6"
                        >
                            {isSubmitting ? "Creating Account…" : "Create Account"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-accents-5 mt-8">
                    Already have an account?{" "}
                    <Link to="/login" className="text-white hover:underline transition-all duration-150 underline-offset-4">
                        Log in instead
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
