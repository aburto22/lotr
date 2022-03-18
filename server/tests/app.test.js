const { rest } = require('msw');
const { setupServer } = require('msw/node');
const supertest = require('supertest');
const app = require('../app');

const mockedData = {
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

const server = setupServer(
  rest.get('https://the-one-api.dev/v2/character', (req, res, ctx) => res(ctx.json(mockedData))),
);

describe('/api/lotr', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  beforeEach(() => server.resetHandlers());

  test('GET /characters', () => {
    const expected = mockedData.docs.map((character) => ({ ...character, id: character._id }));
    return supertest(app)
      .get('/api/lotr/characters')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual(expected);
      });
  });
});
