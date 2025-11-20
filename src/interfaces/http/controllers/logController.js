const EventService = require('../../../application/eventService');
const LogRepository = require('../../../infrastructure/repositories/logRepository');

// POST /api/logs
exports.createLog = async (req, res) => {
    try {
        const { userId, action, metadata } = req.body;
        
        // Validate input
        if (!userId || !action) {
            return res.status(400).json({ error: 'userId and action are required' });
        }

        // Send to Kafka (Non-blocking)
        await EventService.logActivity({ userId, action, metadata });
        
        res.status(202).json({ message: 'Activity queued for processing' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /api/logs
exports.getLogs = async (req, res) => {
    try {
        const { userId, page, limit } = req.query;
        const data = await LogRepository.getLogs({ userId, page, limit });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};