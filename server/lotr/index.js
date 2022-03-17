const express = require('express');
const { getAllCharacters, getImage } = require('./api');
require('dotenv').config();

const router = express.Router();

router.get('/characters/:id/image', async (req, res, next) => {
  try {
    const src = await getImage(req.params.id);
    res.send({ src });
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
