// jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const createToken = (userId) => {
    const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
    return token;
};

module.exports = { createToken };
