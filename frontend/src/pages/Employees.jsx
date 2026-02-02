import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../api/api';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [search, setSearch] = useState('');
    const [formData, setFormData] = useState({
        name: '', email: '', role: '', department: '', salary: ''
    });

    const fetchEmployees = async () => {
        try {
            const { data } = await api.get('/employees');
            setEmployees(data);
        } catch (error) {
            console.error("Failed to fetch employees", error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentEmployee) {
                await api.put(`/employees/${currentEmployee._id}`, formData);
            } else {
                await api.post('/employees', formData);
            }
            setIsModalOpen(false);
            setCurrentEmployee(null);
            setFormData({ name: '', email: '', role: '', department: '', salary: '' });
            fetchEmployees();
        } catch (error) {
            console.error("Operation failed", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await api.delete(`/employees/${id}`);
                fetchEmployees();
            } catch (error) {
                console.error("Delete failed", error);
            }
        }
    };

    const openModal = (employee = null) => {
        if (employee) {
            setCurrentEmployee(employee);
            setFormData({
                name: employee.name,
                email: employee.email,
                role: employee.role,
                department: employee.department,
                salary: employee.salary
            });
        } else {
            setCurrentEmployee(null);
            setFormData({ name: '', email: '', role: '', department: '', salary: '' });
        }
        setIsModalOpen(true);
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-black text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Employees</h2>
                        <button
                            onClick={() => openModal()}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <FaPlus /> Add Employee
                        </button>
                    </div>

                    <div className="glass p-4 rounded-xl mb-6 flex items-center gap-2">
                        <FaSearch className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="bg-transparent border-none outline-none text-white w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="glass rounded-xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-neutral-900/50 text-gray-400 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Department</th>
                                    <th className="px-6 py-4">Salary</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800">
                                {filteredEmployees.map(emp => (
                                    <tr key={emp._id} className="hover:bg-neutral-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium">{emp.name}</td>
                                        <td className="px-6 py-4 text-gray-400">{emp.email}</td>
                                        <td className="px-6 py-4"><span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-xs">{emp.role}</span></td>
                                        <td className="px-6 py-4">{emp.department}</td>
                                        <td className="px-6 py-4">${emp.salary}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => openModal(emp)} className="text-blue-400 hover:text-blue-300 mx-2"><FaEdit /></button>
                                            <button onClick={() => handleDelete(emp._id)} className="text-red-400 hover:text-red-300 mx-2"><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredEmployees.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No employees found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="glass p-8 rounded-2xl w-full max-w-lg">
                        <h3 className="text-xl font-bold mb-4">{currentEmployee ? 'Edit Employee' : 'Add New Employee'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Name</label>
                                    <input type="text" className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Email</label>
                                    <input type="email" className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Role</label>
                                    <input type="text" className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} required />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Department</label>
                                    <input type="text" className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Salary</label>
                                <input type="number" className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white" value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} required />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded text-gray-400 hover:text-white">Cancel</button>
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">{currentEmployee ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;
