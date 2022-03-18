const express = require('express');
const cors = require('cors');
const path = require('path');
const lotr = require('./lotr');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api/lotr', lotr);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

module.exports = app;
