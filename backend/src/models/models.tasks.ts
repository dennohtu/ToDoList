import mongoose, { Mongoose } from 'mongoose'

const taskModelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'new'
    },
    isEdited: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

const Task = mongoose.model("Tasks", taskModelSchema)

export default Task;