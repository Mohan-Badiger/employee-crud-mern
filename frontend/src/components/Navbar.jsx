import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="bg-neutral-900 border-b border-neutral-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-wider">EMP<span className="text-blue-500">MGR</span></h1>
            <div className="flex items-center gap-4">
                <span>{user?.name}</span>
                <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded text-sm transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
