import React from "react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="relative w-8 h-8">
                <div className="absolute top-0 left-0 w-full h-full border-2 border-white/10 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-2 border-t-white rounded-full animate-spin"></div>
            </div>
            <span className="ml-3 text-sm font-medium text-accents-5" aria-live="polite">Loading…</span>
        </div>
    );
};

export default Loader;
