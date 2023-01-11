import mongoose from 'mongoose'

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
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

export default mongoose.model('Publisher', publisherSchema)