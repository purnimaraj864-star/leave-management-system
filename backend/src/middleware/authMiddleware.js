const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT and attach user to request
const authenticateUser = async (req, res, next) => {
    try {
        let token;

        // Check Authorization header for "Bearer <token>"
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from database excluding password
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        // Attach user info to request
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};

// Middleware to ensure user has Admin role
const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied: Admin only' });
    }
};

module.exports = {
    authenticateUser,
    requireAdmin
};
