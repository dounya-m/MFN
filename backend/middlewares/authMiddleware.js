const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const Admin = require('../models/admin')

const authToken = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) { 
            return res.status(401).json({ error: 'Not authorized' });
        }
        }
    
        if (!token) {
        return res.status(401).json({ error: 'Not authorized, no token' });
        }
    });

    const protected = asyncHandler(async (req, res, next) => {
        let token;
    
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.admin = await Admin.findById(decoded.id).select('-password');
                next();
            } catch (error) { 
                return res.status(401).json({ error: 'Not authorized' });
            }
            }
        
            if (!token) {
            return res.status(401).json({ error: 'Not authorized, no token' });
            }
        });


module.exports = {
    authToken,
    protected
}