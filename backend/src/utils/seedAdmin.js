const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

// Script to create or reset the initial Admin account
const seedAdmin = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error('Error: MONGO_URI is not defined in .env');
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for admin seeding...');

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        const adminName = process.env.ADMIN_NAME || 'System Administrator';

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log(`Admin account with email "${adminEmail}" already exists!`);
            console.log(`Role: ${existingAdmin.role}`);
            process.exit(0);
        }

        // Hash admin password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        // Create the admin user
        const adminUser = await User.create({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            role: 'admin'
        });

        console.log('====================================');
        console.log('Admin account created successfully:');
        console.log(`Name:     ${adminUser.name}`);
        console.log(`Email:    ${adminUser.email}`);
        console.log(`Password: ${adminPassword}`);
        console.log(`Role:     ${adminUser.role}`);
        console.log('====================================');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin user:', error.message);
        process.exit(1);
    }
};

seedAdmin();
