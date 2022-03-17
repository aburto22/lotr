const express = require('express');
const { getAllCharacters, getCharacter } = require('./api');
require('dotenv').config();

const router = express.Router();

router.get('/characters/:id', async (req, res, next) => {
  try {
    const character = await getCharacter(req.params.id);
    res.json(character);
  } catch (err) {
    next(err);
  }
});

router.get('/characters', async (req, res, next) => {
  try {
    const characters = await getAllCharacters();
    res.json(characters);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
