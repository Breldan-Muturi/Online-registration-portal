import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: [true, 'Please add the application creator']
    },
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course',
        required: [true, 'Please add an application course'],
    },
    topics: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Topic',
        required: [true, 'Ensure to add topics to this application']
    },
    delivery: {
        type: String,
        required: [true, 'Please add a description'],
    },
    venue: String,
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
    fee: {
        type: Number,
        required: [true, 'Please add a fee for this application']
    },
    participants: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'User',
        required: [true, 'Please add at least one participant']
    },
    applicationFee: {
        type: Number,
        required: [true, 'Please add an application fee']
    },
    status: {
        type: String,
        required: [true, 'Please add a status'],
        default: 'Pending'
    },
    contactPerson: {
        type: String,
        required: [true, 'Please add an application contact person']
    },
    contactEmail: {
        type: String,
        required: [true, 'Please add a contact email']
    },
    contactPhoneNumber: {
        type: String,
        required: [true, 'Please add a contact email']
    },
    approvedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    approvalMessage: String,
    offerLetter: String,
    proformaInvoice: String,
    receipt: String,
    completionDate: {
        type: Date,
        min: () => Date.now(),
    },
}, {timestamps: true});

export default mongoose.model('Application', applicationSchema);
