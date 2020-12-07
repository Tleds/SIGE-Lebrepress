
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
require('./app/models/mongo/config');
const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');


class App {
  constructor() {
    this.server = express();
    this.http = http;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(
      '/insomnia.json',
      express.static(path.resolve(__dirname, '..', 'insomnia','insomnia.json'))
    );
    this.server.use(
      '/docs',
      express.static(path.resolve(__dirname, '..','insomnia'))
    );

  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
