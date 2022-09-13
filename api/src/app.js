const express = require('express');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const axios = require("axios");
const { Genre } = require('../src/db.js');
require('./db.js');
const {API_KEY} = process.env;
const server = express();

server.name = 'API';

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);   // todas las request van a ser diregidas al routes  (a routes/index.js)

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

function generateGenres(){
  const genresInApi = axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`) //al inicio trae todos los géneros
   .then(resp => {
    return resp.data.results.forEach(e => Genre.findOrCreate({
        where:{id: e.id, name: e.name}
      })
    )});
}

// carga los items Genres 
generateGenres();

module.exports = server;
