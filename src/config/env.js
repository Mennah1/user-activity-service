require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/logs_db',
    // We use 9093 because we changed it in Docker!
    KAFKA_BROKER: process.env.KAFKA_BROKER || 'localhost:9094', // Updated to 9094 
    KAFKA_TOPIC: 'user-activity-logs',
    KAFKA_CLIENT_ID: 'activity-service'
};