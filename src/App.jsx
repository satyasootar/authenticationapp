import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <Loader />;
    if (!user) return <Navigate to="/login" replace />;

    return children;
};

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <Loader />;
    if (user) return <Navigate to="/" replace />;

    return children;
};

function AppContent() {
    const { loading } = useAuth();

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen">
            <Navbar />
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/login" 
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } 
                />
                <Route 
                    path="/register" 
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <Toaster 
                    position="top-center"
                    toastOptions={{
                        style: {
                            background: '#000',
                            color: '#fff',
                            border: '1px solid #333',
                            borderRadius: '8px',
                            fontSize: '14px',
                        },
                    }}
                />
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;