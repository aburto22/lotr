const { rest } = require('msw');
const { setupServer } = require('msw/node');
const supertest = require('supertest');
const { populateNamesQuotes } = require('../lotr/helpers');
const app = require('../app');

const mockedCharacters = {
  docs: [
    {
      _id: '5cd99d4bde30eff6ebccfbbe',
      height: '6.7',
      race: 'Human',
      gender: 'Female',
      birth: '80',
      spouse: 'Belemir',
      death: 'FS23',
      realm: 'Gondor',
      hair: 'Yellow',
      name: 'Adanel',
      wikiUrl: 'http://lotr.wikia.com//wiki/Adanel',
    },
    {
      _id: '5cd99d4bde30eff6ebccfbbf',
      height: '8',
      race: 'Human',
      gender: 'Male',
      birth: 'Before ,TA 1944',
      spouse: 'Mama',
      death: 'Late ,Third Age',
      realm: 'Aragorn',
      hair: 'Blue',
      name: 'Adrahil I',
      wikiUrl: 'http://lotr.wikia.com//wiki/Adrahil_I',
    },
  ],
};

const mockedQuotes = {
  docs: [
    {
      _id: '5cd96e05de30eff6ebcce7e9',
      dialog: 'Deagol!',
      movie: '5cd95395de30eff6ebccde5d',
      character: '5cd99d4bde30eff6ebccfbbe',
      id: '5cd96e05de30eff6ebcce7e9',
    },
    {
      _id: '5cd96e05de30eff6ebcce7ec',
      dialog: 'Give us that! Deagol my love',
      movie: '5cd95395de30eff6ebccde5d',
      character: '5cd99d4bde30eff6ebccfe9e',
      id: '5cd96e05de30eff6ebcce7ec',
    },
  ],
};

const server = setupServer(
  rest.get('https://the-one-api.dev/v2/character', (req, res, ctx) => res(ctx.json(mockedCharacters))),
  rest.get('https://the-one-api.dev/v2/quote', (req, res, ctx) => res(ctx.json(mockedQuotes))),
);

describe('/api/lotr', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  beforeEach(() => server.resetHandlers());

  test('GET /characters', () => {
    const expectedCharacters = mockedCharacters.docs.map((c) => ({ ...c, id: c._id }));
    const expectedQuotes = mockedQuotes.docs.map((q) => populateNamesQuotes(q, expectedCharacters));

    return supertest(app)
      .get('/api/lotr/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.characters).toEqual(expectedCharacters);
        expect(res.body.quotes).toEqual(expectedQuotes);
      });
  });
});
