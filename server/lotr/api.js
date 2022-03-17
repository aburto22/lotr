const axios = require('axios');
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
    .slice(0, 10)
    .map((character) => ({ ...character, id: character._id }));
};

const getCharacter = async (id) => {
  const response = await axios({
    method: 'get',
    url: `https://the-one-api.dev/v2/character/${id}`,
    headers: {
      Authorization: `Bearer ${process.env.LOTR_KEY}`,
    },
  });

  return response.data.docs[0];
};

module.exports = {
  getAllCharacters,
  getCharacter,
};
