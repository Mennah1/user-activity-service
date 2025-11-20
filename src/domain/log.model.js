const mongoose = require('mongoose');

// This defines how a "Log" looks in the database
const LogSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true }, // Indexed for fast filtering
    action: { type: String, required: true },
    metadata: { type: Object, default: {} },
    timestamp: { type: Date, default: Date.now, index: true } // Indexed for sorting
});

module.exports = mongoose.model('Log', LogSchema);