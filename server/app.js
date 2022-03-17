const express = require('express');
const cors = require('cors');
const lotr = require('./lotr');

const app = express();

app.use(cors());

app.use('/api/lotr', lotr);

app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

module.exports = app;
