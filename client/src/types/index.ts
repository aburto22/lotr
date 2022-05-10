export interface ICharacterSummary {
  id: string,
  name: string,
  race: string,
  gender: string,
}

export interface ICharacter {
  height: string,
  race: string,
  gender: string,
  birth: string,
  spouse: string,
  death: string,
  realm: string,
  hair: string,
  name: string,
  wikiUrl: string,
  id: string
}

export interface IQuote {
  dialog: string;
  movie: string;
  character: string;
  id: string;
  characterName: string;
  isFavourite: boolean;
}
