const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    taskName: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: Boolean,
        default: false,
    },
    isEdited: {
        required: true,
        type: Boolean,
        defaut:false
    },
   
}, {timestamps:true})

module.exports = mongoose.model('Data', dataSchema)