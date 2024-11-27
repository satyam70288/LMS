import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        enum: ['student', 'instructor', ],
        required: true,
        default: 'student'
    },
    enrolledCourses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
    }],
    photoUrl: {
        type: String,
        default: 'https://res.cloudinary.com/dz0k9wv5v/image/upload/v1688169791/avatars/default-avatar_1_vn8q4f.png'
    }
}, {
    timestamps: true
});

export const User=mongoose.model('User', userSchema);