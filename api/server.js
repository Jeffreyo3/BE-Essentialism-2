const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authenticate = require('./auth/authenticate-middlware');
const authRouter = require('./auth/authRouter');
const valueRouter = require('./values/valueRouter');
const userDataRouter = require('./userData/userDataRouter')

const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

// Routes
server.use('/api/auth', authRouter);
server.use('/api/values', valueRouter);
server.use('/api/user', authenticate, userDataRouter);

// Alive messages
server.get('/', (req, res) => {
    res.send(`<h2>ESSENTIALISM server is alive</h2>`);
});
server.get('/api', (req, res) => {
    res.send(`<h2>Use an /api/endpoint...</h2>`);
});

module.exports = server;