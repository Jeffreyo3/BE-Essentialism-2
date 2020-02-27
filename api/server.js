const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');


const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

// Alive messages
server.get('/', (req, res) => {
    res.send(`<h2>ESSENTIALISM server is alive</h2>`);
});
server.get('/api', (req, res) => {
    res.send(`<h2>Use an /api/endpoint...</h2>`);
});

module.exports = server;