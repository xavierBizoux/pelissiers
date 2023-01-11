import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

userSchema.index({ firstName: 1, lastName: 1 }, { unique: true })
userSchema.index({ lastName: 1 })

export default mongoose.model('User', userSchema)