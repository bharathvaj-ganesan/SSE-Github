require('dotenv').config({});

const express = require('express');
const events = require('./events');
const GithubEvent = require('./github');
const { Nuxt, Builder } = require('nuxt');
const cors = require('cors');
const app = express();
const host = '127.0.0.1';
const port = process.env.PORT || 2000;

app.set('port', port);

const githubEvent = new GithubEvent();

app.get('/events', cors(), events.subscribe);

githubEvent.on('event', events.publish);

//Start consuming Github Events
githubEvent.start();

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  console.log('Server listening on http://' + host + ':' + port); // eslint-disable-line no-console
}
start();
