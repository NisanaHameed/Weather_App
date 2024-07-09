import jwt from 'jsonwebtoken';

const authenticate = async (req, res, next) => {
    let token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            req.userId = decoded.Id;
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

    } catch (err) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
}

export default authenticate;