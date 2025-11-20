const kafka = require('./kafkaClient');
const config = require('../../config/env');
const LogRepository = require('../repositories/logRepository');

const consumer = kafka.consumer({ groupId: 'user-activity-group' });

const runConsumer = async () => {
    try {
        await consumer.connect();
        
        await consumer.subscribe({ topic: config.KAFKA_TOPIC, fromBeginning: true });
        console.log('✅ Kafka Consumer Connected');

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const logData = JSON.parse(message.value.toString());
                console.log(`📥 [Consumer] Received Action: ${logData.action}`);
                
                // Save to MongoDB
                await LogRepository.createLog(logData);
            },
        });
    } catch (error) {
        console.error('❌ Kafka Consumer Error:', error);
    }
};

module.exports = { runConsumer };