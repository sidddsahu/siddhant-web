const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        trim: true,
        default: null
    },
    address: {
        type: String,
        trim: true,
        default: null
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        minlength: [10, 'Message must be at least 10 characters'],
        maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    status: {
        type: String,
        enum: ['pending', 'read', 'replied', 'archived'],
        default: 'pending'
    },
    ipAddress: String,
    userAgent: String,
    readAt: {
        type: Date,
        default: null
    },
    repliedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Indexes for better performance
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;