const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = process.env.MONGODB_URL;
const connect = mongoose.connect(db)

connect.then(() => console.log('Database connected'))
    .catch((err) => console.error(err.message)) 