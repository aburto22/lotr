const populateNamesQuotes = (quote, characters) => {
  const character = characters.find((c) => c.id === quote.character);
  return {
    ...quote,
    characterName: character ? character.name : '',
    isFavourite: false,
  };
};

module.exports = {
  populateNamesQuotes,
};
