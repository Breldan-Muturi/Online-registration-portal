import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
    startDate: {
        type: Date,
        required: [true, 'Please add a start date'],
        min: () => Date.now(),
    },
    endDate: {
        type: Date,
        required: [true, 'Please add a end date'],
        min: () => Date.now(),
    },
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course',
        required: [true, 'Please add a parent course'],
    },
    venue: String,
    onPremisesFee: Number,
    onPremisesSlots: Number,
    onPremisesSlotsTaken: {
        type: Number,
        default: 0
    },
    onlineFee: Number,
    onlineSlots: Number,
    onlineSlotsTaken: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

export default mongoose.model('Session', sessionSchema);
