"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var taskModelSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
    console.log("checking if title was changed");
    if (this.isModified("title")) {
        this.isEdited = true;
    }
});
var Task = mongoose_1.default.model("Tasks", taskModelSchema);
exports.default = Task;
