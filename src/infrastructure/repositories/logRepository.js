const Log = require('../../domain/log.model');

class LogRepository {
    async createLog(data) {
        try {
            const log = new Log(data);
            return await log.save();
        } catch (error) {
            console.error('❌ Database Save Error:', error);
        }
    }

    async getLogs({ userId, page = 1, limit = 10 }) {
        const query = {};
        if (userId) query.userId = userId;

        const logs = await Log.find(query)
            .sort({ timestamp: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        
        const total = await Log.countDocuments(query);
        return { logs, total, page, pages: Math.ceil(total / limit) };
    }
}

module.exports = new LogRepository();