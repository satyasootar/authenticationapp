import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const success = await login(username, password);
        setIsSubmitting(false);
        if (success) navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black">
            <div className="w-full max-w-[400px] animate-in">
                <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Sign In to AuthApp</h1>
                    <p className="text-accents-5 text-sm">Enter your credentials to access your account</p>
                </div>

                <div className="geist-card p-8 shadow-2xl shadow-white/[0.02]">
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="geist-input focus:border-white"
                                placeholder="johndoe…"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label htmlFor="password" name="password" className="text-sm font-medium text-accents-6">
                                    Password
                                </label>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="geist-input focus:border-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="geist-button w-full mt-2"
                        >
                            {isSubmitting ? "Signing In…" : "Sign In"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-accents-5 mt-8">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-white hover:underline transition-all duration-150 underline-offset-4">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
