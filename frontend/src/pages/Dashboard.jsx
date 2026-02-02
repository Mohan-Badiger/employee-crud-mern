import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../api/api';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        departments: 0,
        totalSalary: 0,
        deptDistribution: {}
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/employees');
                const uniqueDepts = [...new Set(data.map(e => e.department))];
                const totalSal = data.reduce((acc, curr) => acc + curr.salary, 0);

                const distribution = {};
                data.forEach(e => {
                    distribution[e.department] = (distribution[e.department] || 0) + 1;
                });

                setStats({
                    totalEmployees: data.length,
                    departments: uniqueDepts.length,
                    totalSalary: totalSal,
                    deptDistribution: distribution
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            }
        };
        fetchStats();
    }, []);

    const chartData = {
        labels: Object.keys(stats.deptDistribution),
        datasets: [
            {
                label: '# of Employees',
                data: Object.values(stats.deptDistribution),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex h-screen bg-black text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black p-6">
                    <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Summary Cards */}
                        <div className="glass p-6 rounded-xl border-l-4 border-blue-500">
                            <h3 className="text-gray-400 text-sm uppercase tracking-wider">Total Employees</h3>
                            <p className="text-3xl font-bold mt-2">{stats.totalEmployees}</p>
                        </div>
                        <div className="glass p-6 rounded-xl border-l-4 border-green-500">
                            <h3 className="text-gray-400 text-sm uppercase tracking-wider">Departments</h3>
                            <p className="text-3xl font-bold mt-2">{stats.departments}</p>
                        </div>
                        <div className="glass p-6 rounded-xl border-l-4 border-purple-500">
                            <h3 className="text-gray-400 text-sm uppercase tracking-wider">Monthly Payroll</h3>
                            <p className="text-3xl font-bold mt-2">${stats.totalSalary.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="glass p-6 rounded-xl w-full max-w-lg mx-auto">
                        <h3 className="text-xl font-bold mb-4 text-center">Department Distribution</h3>
                        <div className="flex items-center justify-center p-4">
                            {stats.totalEmployees > 0 ? (
                                <Doughnut data={chartData} />
                            ) : (
                                <p className="text-gray-500">No data available for charts.</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
