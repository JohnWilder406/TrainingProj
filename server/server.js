require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.MY_PORT;

require('./config/mongoose.config')

app.use(cors({credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./routes/users.routes')(app)
require('./routes/training.routes')(app)

app.listen(port, ()=> console.log(`Listening on port: ${port}`));