const express = require('express');
const connectDB = require('./infrastructure/database');
const { connectProducer } = require('./infrastructure/kafka/producer');
const { runConsumer } = require('./infrastructure/kafka/consumer');
const config = require('./config/env');
const logRoutes = require('./interfaces/http/routes/logRoutes'); // <--- Import Routes

const app = express();
app.use(express.json());

// Use the routes
app.use('/api/logs', logRoutes); // <--- Enable API

const start = async () => {
    await connectDB();
    await connectProducer();
    await runConsumer();

    app.listen(config.PORT, () => {
        console.log(`🚀 Server running on port ${config.PORT}`);
    });
};

start();