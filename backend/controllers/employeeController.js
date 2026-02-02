const Employee = require('../models/Employee');

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({ createdBy: req.user._id });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEmployee = async (req, res) => {
    const { name, email, role, department, salary } = req.body;

    try {
        const employee = new Employee({
            name, email, role, department, salary,
            createdBy: req.user._id
        });

        const createdEmployee = await employee.save();
        res.status(201).json(createdEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatEmployee = async (req, res) => {
    const { name, email, role, department, salary } = req.body;

    try {
        const employee = await Employee.findById(req.params.id);

        if (employee) {
            if (employee.createdBy.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            employee.name = name || employee.name;
            employee.email = email || employee.email;
            employee.role = role || employee.role;
            employee.department = department || employee.department;
            employee.salary = salary || employee.salary;

            const updatedEmployee = await employee.save();
            res.json(updatedEmployee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (employee) {
            if (employee.createdBy.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            await employee.deleteOne();
            res.json({ message: 'Employee removed' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getEmployees, createEmployee, updatEmployee, deleteEmployee };
