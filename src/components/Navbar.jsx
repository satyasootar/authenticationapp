import React from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut, User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [imgError, setImgError] = React.useState(false);

    if (!user) return null;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-accents-2 bg-black/50 backdrop-blur-md">
            <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 focus-visible:ring-2 ring-white ring-offset-2 ring-offset-black rounded-md outline-none" aria-label="Home">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                        <div className="w-4 h-4 bg-black rounded-sm transform rotate-45"></div>
                    </div>
                    <span className="font-semibold tracking-tight text-white">AuthApp</span>
                </Link>
                
                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-xs font-medium text-white">{user.username}</span>
                        <span className="text-[10px] uppercase tracking-widest text-accents-5">{user.role}</span>
                    </div>
                    
                    <Link to="/" className="focus-visible:ring-2 ring-white ring-offset-2 ring-offset-black rounded-full outline-none">
                        <div className="w-9 h-9 border border-accents-2 rounded-full overflow-hidden bg-accents-1 flex items-center justify-center">
                            {user.avatar?.url && !imgError ? (
                                <img 
                                    src={user.avatar.url} 
                                    alt="Profile" 
                                    width="36" 
                                    height="36" 
                                    className="w-full h-full object-cover" 
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <UserIcon size={16} className="text-accents-4" />
                            )}
                        </div>
                    </Link>

                    <button 
                        onClick={logout}
                        aria-label="Logout"
                        className="geist-button geist-button-secondary h-9 px-3 gap-2"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
