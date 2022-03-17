import { ICharacter, IQuote, IQuoteName } from "../types"

export const getPage = <T>(array: T[], page: number = 1, limit: number = 10): T[] => {
  const init = (page - 1) * limit;
  const end = page * limit;
  return array.slice(init, end);
};

export const getNameCharacter = (characters: ICharacter[], name: string) => {
  if (!name) {
    return characters;
  }
  const nameRgx = new RegExp(name, 'i');
  return characters.filter((c) => nameRgx.test(c.name));
}

export const getRaceCharacter = (characters: ICharacter[], race: string) => {
  if (!race) {
    return characters;
  }

  let raceRgx: RegExp;
  if (race === 'elf') {
    raceRgx = new RegExp('el', 'i');
  } else if (race === 'dwarf') {
    raceRgx = new RegExp('dwar', 'i');
  } else if (race === 'human') {
    raceRgx = new RegExp('(human|men)', 'i');
  } else {
    raceRgx = new RegExp(race, 'i');
  }
  return characters.filter((c) => raceRgx.test(c.race));
}

export const getNameQuotes = (quotes: IQuoteName[], name: string): IQuoteName[] => {
  if (!name) {
    return quotes;
  }
  const nameRgx = new RegExp(name, 'i');
  return quotes.filter((q) => nameRgx.test(q.characterName));
}

export const populateNamesQuotes = (quote: IQuote, characters: ICharacter[]): IQuoteName => {
  const character = characters.find(c => c.id === quote.character);
  return {
    ...quote,
    characterName: character ? character.name : ''
  }
}
