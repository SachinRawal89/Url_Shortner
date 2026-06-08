import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    shortId : {
        type: String,
        required: true,
        unique: true
    },
    originalUrl : {
        type: String,
        required: true
    },
    visitHistory : [
        {
            timestamps : { type: Number}
        }
    ],
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
    }
}, { timestamps: true });

const URL = mongoose.model('URL', urlSchema);

export default URL;