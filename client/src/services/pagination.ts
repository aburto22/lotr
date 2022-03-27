import { ICharacter, IQuote } from '../types';

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
};

export const getRaceCharacter = (characters: ICharacter[], race: string) => {
  if (!race) {
    return characters;
  }

  let raceRgx: RegExp;
  if (race === 'elf') {
    raceRgx = /^el/i;
  } else if (race === 'dwarf') {
    raceRgx = /^dwar/i;
  } else if (race === 'human') {
    raceRgx = /^(human|men)/i;
  } else {
    raceRgx = new RegExp(race, 'i');
  }
  return characters.filter((c) => raceRgx.test(c.race));
};

export const getNameQuotes = (quotes: IQuote[], name: string): IQuote[] => {
  if (!name) {
    return quotes;
  }
  const nameRgx = new RegExp(name, 'i');
  return quotes.filter((q) => nameRgx.test(q.characterName));
};

export const getDialogQuotes = (quotes: IQuote[], dialog: string): IQuote[] => {
  if (!dialog) {
    return quotes;
  }
  const dialogRgx = new RegExp(dialog, 'i');
  return quotes.filter((q) => dialogRgx.test(q.dialog));
};
