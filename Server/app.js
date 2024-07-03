const express = require("express");
const dotenv = require('dotenv');
require('./database/db')
const userRoute = require('./router/userRoute')
const adminRoute = require('./router/adminRoute')
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors())

app.use('/', userRoute)
app.use('/admin', adminRoute)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on : http://localhost:${PORT}`));