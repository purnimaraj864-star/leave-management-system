const mongoose = require('mongoose');

// Leave schema representing leave requests submitted by employees
const leaveSchema = new mongoose.Schema(
    {
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Employee reference is required']
        },
        leaveType: {
            type: String,
            required: [true, 'Leave type is required'],
            enum: ['Sick Leave', 'Casual Leave', 'Earned Leave', 'Emergency Leave', 'Other']
        },
        fromDate: {
            type: Date,
            required: [true, 'From date is required']
        },
        toDate: {
            type: Date,
            required: [true, 'To date is required']
        },
        reason: {
            type: String,
            required: [true, 'Reason is required'],
            trim: true
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Leave', leaveSchema);
