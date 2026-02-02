import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../api/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        totalSalary: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/employees');

                const totalSal = data.reduce(
                    (acc, curr) => acc + Number(curr.salary || 0),
                    0
                );

                setStats({
                    totalEmployees: data.length,
                    totalSalary: totalSal
                });
            } catch (error) {
                console.error('Failed to fetch dashboard stats', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="flex h-screen bg-black text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black p-6">
                    <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Total Employees */}
                        <div className="glass p-6 rounded-md border-l-4 border-blue-500">
                            <h3 className="text-gray-400 text-sm uppercase tracking-wider">
                                Total Employees
                            </h3>
                            <p className="text-3xl font-bold mt-2">
                                {stats.totalEmployees}
                            </p>
                        </div>

                        {/* Total Salary */}
                        <div className="glass p-6 rounded-md border-l-4 border-purple-500">
                            <h3 className="text-gray-400 text-sm uppercase tracking-wider">
                                Total Salary
                            </h3>
                            <p className="text-3xl font-bold mt-2">
                                ₹ {stats.totalSalary.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
