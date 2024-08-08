import mongoose from 'mongoose'

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

taskModelSchema.pre('save', function (next) {
    console.log("checking if title was changed")
    if(this.isModified("title")) {
        this.isEdited = true
    }

})

const Task = mongoose.model("Tasks", taskModelSchema)

export default Task;