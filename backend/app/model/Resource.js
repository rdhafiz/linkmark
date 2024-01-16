const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "Resource owner is required"],
    },
    title: {
        type: String,
        required: [true, "Resource title is required"],
    },
    parent_id: {
        type: String,
        required: [true, "Resource parent is required"],
    },
    is_dir: {
        type: Number,
        required: [true, "Resource type is required"],
        enum: [0,1]
    },
    url: {
        type: String,
        required: [false],
    },
    preview: {
        type: Object,
        required: [false]
    }
}, {timestamps: true});

module.exports = mongoose.model("Resource", resourceSchema);