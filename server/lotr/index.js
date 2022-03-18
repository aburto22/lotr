const express = require('express');
const { getAllCharacters, getImageFromUrl, getAllQuotes } = require('./api');
require('dotenv').config();

const router = express.Router();

router.post('/characters/:id/image', async (req, res, next) => {
  try {
    if (!req.body.wiki) {
      return res.send({ src: '' });
    }
    const src = await getImageFromUrl(req.body.wiki);
    return res.send({ src });
  } catch (err) {
    return next(err);
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

router.get('/quotes', async (req, res, next) => {
  try {
    const quotes = await getAllQuotes();
    res.json(quotes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
