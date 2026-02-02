const express = require('express');
const router = express.Router();
const { getEmployees, createEmployee, updatEmployee, deleteEmployee } = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getEmployees).post(protect, createEmployee);
router.route('/:id').put(protect, updatEmployee).delete(protect, deleteEmployee);

module.exports = router;
