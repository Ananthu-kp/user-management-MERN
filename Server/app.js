const express = require("express");
const dotenv = require('dotenv');
require('./database/db')
const userRoute = require('./router/userRoute')

const app = express();

app.use(express.json())

app.use('/', userRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on : http://localhost:${PORT}`));