// models/PDF.js
const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    name: String,
    fileSize: Number,
    path: String,
    uploadTimestamp: { type: Date, default: Date.now },
    data: String,
});

module.exports = mongoose.model('PDF', pdfSchema);
