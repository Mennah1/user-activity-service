const { sendMessage } = require('../infrastructure/kafka/producer');
const config = require('../config/env');

class EventService {
    async logActivity(data) {
        // Add a timestamp and send to Kafka
        const payload = { 
            ...data, 
            timestamp: new Date() 
        };
        
        // Publish event
        await sendMessage(config.KAFKA_TOPIC, payload);
        return payload;
    }
}

module.exports = new EventService();