import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserTie, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-neutral-800 hover:text-white";

    return (
        <div className="w-64 bg-neutral-900 h-screen border-r border-neutral-800 flex flex-col p-4">

            <nav className="flex-1 space-y-2 mt-4">
                <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${isActive('/')}`}>
                    <FaChartBar /> Dashboard
                </Link>
                <Link to="/employees" className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${isActive('/employees')}`}>
                    <FaUserTie /> Employees
                </Link>
            </nav>

            <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-500 rounded transition-all mt-auto"
            >
                <FaSignOutAlt /> Logout
            </button>
        </div>
    );
};

export default Sidebar;
