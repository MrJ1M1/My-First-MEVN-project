// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const router = require('./routes/routes');
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('uploads'));
app.use('/api/posts', router);

// connects to database

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Successfully Connected to the database!')).catch(err => console.log(err));

// start server

app.listen(process.env.PORT, () => console.log(`server running at http://localhost:${process.env.PORT}`));
