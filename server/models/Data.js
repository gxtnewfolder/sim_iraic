const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
        name: String,
        location: {
            type: String
        },
        file: String
}, { timestamps: true });

module.exports = mongoose.model('data', dataSchema);