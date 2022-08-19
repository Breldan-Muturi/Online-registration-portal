import mongoose from "mongoose";

const organizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email'],
        lowercase: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please add a phone number'],
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
    },
    county: {
        type: String,
        required: [true, 'Please add County'],
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: [true, 'Please add the organization creator'],
    },
    admins: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'User',
        required: [true, 'Please add at least one administrator.']
    },
    members: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'User',
        default: [],
    },
    joinRequests: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'User',
        default: [],
    },
    invites:{ 
        type: [String], 
        default: [],
    },
    organizationLogo: String,
}, {timestamps: true})

export default mongoose.model('Organization', organizationSchema);