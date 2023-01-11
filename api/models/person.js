import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

export default mongoose.model('Person', personSchema)