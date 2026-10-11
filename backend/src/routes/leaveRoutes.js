const express = require('express');
const router = express.Router();
const {
    createLeave,
    getLeaves,
    getLeaveById,
    updateLeave,
    deleteLeave,
    approveLeave,
    rejectLeave
} = require('../controllers/leaveController');
const { authenticateUser, requireAdmin } = require('../middleware/authMiddleware');

// All leave routes require authentication
router.use(authenticateUser);

// Core CRUD routes
router.route('/')
    .post(createLeave)
    .get(getLeaves);

router.route('/:id')
    .get(getLeaveById)
    .put(updateLeave)
    .delete(deleteLeave);

// Admin-only approval and rejection routes
router.patch('/:id/approve', requireAdmin, approveLeave);
router.patch('/:id/reject', requireAdmin, rejectLeave);

module.exports = router;
