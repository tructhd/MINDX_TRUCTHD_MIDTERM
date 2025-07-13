import User from '../models/User.js';

export function apiKeyAuth() {
    return async (req, res, next) => {
        const apiKey = req.query.apiKey;
        if (!apiKey) return res.status(401).json({ message: 'Missing apiKey' });

        const parts = apiKey.split('-$');
        if (parts.length !== 4 || !parts[0].startsWith('mern')) {
            return res.status(401).json({ message: 'Invalid API key format' });
        }

        
        const userId = parts[1].replace('$', '');
        const email = parts[2].replace('$', '');
        const random = parts[3].replace('$', '');

        try {
            const user = await User.findById(userId);
            if (!user || user.email !== email || user.apiKey !== random) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            req.user = user;
            next();
        } catch (error) {
            if (error.name === 'CastError') {
                return res.status(401).json({ message: 'Invalid user ID format' });
            }
            return res.status(500).json({ message: 'Server error' });
        }
    };
}