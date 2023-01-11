import mongoose from 'mongoose'

const musicianSchema = new mongoose.Schema({
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Person"
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Role"
    },
    position: {
        type: Number,
        required: true
    }
})

const scoreSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    subtitle: {
        type: String,
        trim: true
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publisher"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner"
    },
    musicians: [musicianSchema],
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

export default mongoose.model('Score', scoreSchema)