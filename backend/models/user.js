const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Hostel Student', 'Hostel Admin', 'Sevak', 'Others'],
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
