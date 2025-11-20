const { Kafka } = require('kafkajs');
const config = require('../../config/env');

const kafka = new Kafka({
    clientId: config.KAFKA_CLIENT_ID,
    brokers: [config.KAFKA_BROKER] // Uses localhost:9093
});

module.exports = kafka;