import React from "react";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Shield, Calendar, IdCard, CheckCircle2, XCircle, ShieldAlert } from "lucide-react";

const Profile = () => {
    const { user, verifyEmail, resendVerificationEmail, updateAvatar } = useAuth();
    const [imgError, setImgError] = React.useState(false);
    const [isUploading, setIsUploading] = React.useState(false);
    const fileInputRef = React.useRef(null);

    if (!user) return null;

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const success = await updateAvatar(file);
        setIsUploading(false);
        if (success) {
            setImgError(false);
        }
    };

    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }).format(new Date(dateString));
    };

    return (
        <div className="max-w-5xl mx-auto px-6 pt-32 pb-20 animate-in">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-accents-2 pb-12">
                <div className="flex items-center gap-6">
                    <div 
                        onClick={handleAvatarClick}
                        className="group relative w-24 h-24 bg-accents-1 border border-accents-2 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer hover:border-white transition-all duration-200"
                    >
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            className="hidden" 
                            accept="image/*"
                        />
                        
                        {isUploading && (
                            <div className="absolute inset-0 z-10 bg-black/60 flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 z-10">
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Change</span>
                        </div>

                        {user.avatar?.url && !imgError ? (
                            <img 
                                src={user.avatar.url} 
                                alt={`${user.username}'s avatar`} 
                                width="96" 
                                height="96"
                                className="w-full h-full object-cover"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full h-full bg-accents-1">
                                <User size={40} className="text-accents-3" />
                                <span className="text-[10px] text-accents-4 mt-1 font-bold">NO IMG</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-4xl font-bold tracking-tight text-white">{user.username}</h1>
                            {user.isEmailVerified ? (
                                <CheckCircle2 size={20} className="text-success mt-1" aria-label="Verified" />
                            ) : (
                                <ShieldAlert size={20} className="text-error mt-1" aria-label="Unverified" />
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-accents-5 font-medium flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${user.isEmailVerified ? 'bg-success' : 'bg-error animate-pulse'}`}></span>
                                {user.isEmailVerified ? 'Verified Account' : 'Action Required: Verify Email'}
                            </p>
                            <span className="text-accents-3">•</span>
                            <p className="text-accents-5 text-sm uppercase tracking-tighter">
                                {user.loginType?.replace('_', ' ')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <span className="px-3 py-1 bg-accents-1 border border-accents-2 rounded-full text-xs font-semibold text-accents-6 uppercase tracking-wider tabular-nums">
                        Role: {user.role}
                    </span>
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <section className="md:col-span-2 space-y-6">
                    <div className="geist-card p-6">
                        <h2 className="text-sm font-semibold text-white mb-6 uppercase tracking-widest">Personal Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-accents-4 uppercase tracking-wider">Email Address</span>
                                <div className="flex items-center gap-2 text-white">
                                    <Mail size={16} className="text-accents-3" />
                                    <span className="text-sm">{user.email}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-accents-4 uppercase tracking-wider">User Identifier</span>
                                <div className="flex items-center gap-2 text-white">
                                    <IdCard size={16} className="text-accents-3" />
                                    <span className="text-sm font-mono text-xs tabular-nums">{user._id}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="geist-card p-6">
                        <h2 className="text-sm font-semibold text-white mb-6 uppercase tracking-widest">Account Timeline</h2>
                        <div className="flex items-center gap-12">
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-accents-4 uppercase tracking-wider">Created On</span>
                                <div className="flex items-center gap-2 text-white">
                                    <Calendar size={16} className="text-accents-3" />
                                    <span className="text-sm tabular-nums">{formatDate(user.createdAt)}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-accents-4 uppercase tracking-wider">Last Updated</span>
                                <div className="flex items-center gap-2 text-white">
                                    <Shield size={16} className="text-accents-3" />
                                    <span className="text-sm tabular-nums">{formatDate(user.updatedAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <aside className="space-y-6">
                    <div className="geist-card p-6 bg-accents-1/30">
                        <h2 className="text-sm font-semibold text-white mb-4 uppercase tracking-widest">Security Status</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-accents-2">
                                <span className="text-sm text-accents-5">Two-Factor Auth</span>
                                <span className="text-xs font-bold text-accents-4">DISABLED</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-accents-2">
                                <span className="text-sm text-accents-5">Email Verified</span>
                                <span className={`text-xs font-bold ${user.isEmailVerified ? 'text-success' : 'text-error'}`}>
                                    {user.isEmailVerified ? 'YES' : 'NO'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-accents-5">Login Alerts</span>
                                <span className="text-xs font-bold text-success">ACTIVE</span>
                            </div>
                        </div>
                    </div>

                    {!user.isEmailVerified && (
                        <div className="geist-card p-6 border-indigo-500/30 bg-indigo-500/5 animate-in">
                            <h2 className="text-sm font-semibold text-indigo-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                                <ShieldAlert size={16} />
                                Verify Your Email
                            </h2>
                            <p className="text-xs text-accents-5 mb-4 leading-relaxed">
                                Enter the verification token sent to your email. Didn't receive it?{" "}
                                <button 
                                    onClick={resendVerificationEmail}
                                    className="text-white hover:underline underline-offset-4 font-semibold"
                                >
                                    Resend Code
                                </button>
                            </p>
                            <form 
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const token = e.target.token.value;
                                    if (!token) return;
                                    await verifyEmail(token);
                                }}
                                className="space-y-3"
                            >
                                <input 
                                    name="token"
                                    type="text"
                                    placeholder="Enter token…"
                                    className="geist-input text-xs"
                                    required
                                />
                                <button type="submit" className="geist-button w-full text-xs h-9">
                                    Verify Now
                                </button>
                            </form>
                        </div>
                    )}
                </aside>
            </main>
        </div>
    );
};

export default Profile;
