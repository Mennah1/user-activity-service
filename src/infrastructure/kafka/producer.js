const kafka = require('./kafkaClient');

const producer = kafka.producer();

const connectProducer = async () => {
    try {
        await producer.connect();
        console.log('Kafka Producer Connected');
    } catch (error) {
        console.error('Kafka Producer Error:', error);
    }
};

const sendMessage = async (topic, message) => {
    await producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
    });
};

module.exports = { connectProducer, sendMessage };
