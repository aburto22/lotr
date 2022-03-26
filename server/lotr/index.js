const express = require('express');
const { getAllCharacters, getImageFromUrl, getAllQuotes } = require('./api');
const { populateNamesQuotes } = require('./helpers');
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

router.get('/', async (req, res, next) => {
  try {
    const dataPromises = [getAllCharacters(), getAllQuotes()];
    const [characters, quotes] = await Promise.all(dataPromises);
    const namedQuotes = quotes.map((quote) => populateNamesQuotes(quote, characters));
    res.json({ characters, quotes: namedQuotes });
  } catch (err) {
    next(err);
  }
});

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
