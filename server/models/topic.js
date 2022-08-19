import mongoose from "mongoose";

const topicSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course',
        required: [true, 'Please add a parent course'],
    },
}, {timestamps: true})

export default mongoose.model('Topic', topicSchema);
