import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">

            <div className="glass p-8 rounded-md w-full max-w-md z-10">
                <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Welcome Back</h2>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-sm p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                            placeholder="user@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-sm p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-sm transition-all transform hover:scale-[1.02]"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-500 text-sm">
                    Don't have an account? <Link to="/register" className="text-blue-400 hover:text-blue-300">Register</Link>
                </p>
            </div>
            {/* Background Element */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]"></div>
        </div>
    );
};

export default Login;
