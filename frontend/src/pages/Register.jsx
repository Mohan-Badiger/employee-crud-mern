import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: ''
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(formData.name, formData.email, formData.password, formData.confirmPassword);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">

            <div className="glass p-8 rounded-md w-full max-w-md z-10">
                <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Create Account</h2>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-sm p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-sm p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-sm p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-sm p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-sm transition-all transform hover:scale-[1.02]"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-500 text-sm">
                    Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300">Login</Link>
                </p>
            </div>
            {/* Background Element */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[100px]"></div>
        </div>
    );
};

export default Register;
