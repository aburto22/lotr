const axios = require('axios');
const { JSDOM } = require('jsdom');
require('dotenv').config();

const getAllCharacters = async () => {
  const response = await axios({
    method: 'get',
    url: 'https://the-one-api.dev/v2/character',
    headers: {
      Authorization: `Bearer ${process.env.LOTR_KEY}`,
    },
  });

  return response.data.docs
    .map((character) => ({ ...character, id: character._id }));
};

const getAllQuotes = async () => {
  const pages = [1, 2, 3];
  const pagesPromises = pages.map((page) => axios({
    method: 'get',
    url: `https://the-one-api.dev/v2/quote?page=${page}`,
    headers: {
      Authorization: `Bearer ${process.env.LOTR_KEY}`,
    },
  }));

  const responses = await Promise.all(pagesPromises);

  return responses.map((res) => res.data.docs).flat();
};

const getImageFromUrl = async (url) => {
  const response = await axios.get(url);
  const dom = new JSDOM(response.data);
  const image = dom.window.document.querySelector('.pi-image-thumbnail');
  if (!image) {
    return '';
  }
  const imageRgx = /^[\s\S]+(?:\.png|\.jpg|\.jpeg)/i;
  const imageMatch = image.src.match(imageRgx);
  if (!imageMatch) {
    return '';
  }
  return imageMatch[0];
};

const getImage = async (id) => {
  const response = await axios({
    method: 'get',
    url: `https://the-one-api.dev/v2/character/${id}`,
    headers: {
      Authorization: `Bearer ${process.env.LOTR_KEY}`,
    },
  });

  const character = response.data.docs[0];
  const wiki = character.wikiUrl;
  return getImageFromUrl(wiki);
};

module.exports = {
  getAllCharacters,
  getImage,
  getAllQuotes,
};
