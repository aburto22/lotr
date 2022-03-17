const express = require('express');
const { getAllCharacters } = require('./api');
require('dotenv').config();

const router = express.Router();

router.get('/characters', async (req, res, next) => {
  try {
    const characters = await getAllCharacters();
    res.json(characters);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
