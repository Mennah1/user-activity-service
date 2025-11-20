const mongoose = require('mongoose');
const config = require('../config/env');

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log(' MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
