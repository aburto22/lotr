import { ICharacter } from "../types"

export const getPage = (characters: ICharacter[], page: number = 1, limit: number = 10): ICharacter[] => {
  const init = (page - 1) * limit;
  const end = page * limit;
  return characters.slice(init, end);
};

export const getName = (characters: ICharacter[], name: string) => {
  if (!name) {
    return characters;
  }
  const nameRgx = new RegExp(name, 'i');
  return characters.filter((c) => nameRgx.test(c.name));
}

export const getRace = (characters: ICharacter[], race: string) => {
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
