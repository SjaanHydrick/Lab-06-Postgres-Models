const fs = require('fs');
const request = require('supertest');
const app = require('./index.js');
const StevenUniverse = require('./stevenuniverse.js');
const pool = require('./lib/utils/pool.js');

describe('app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });
});

it('creates a character via POST', async() => {
  const response = await request(app)
    .post('/stevenuniverse')
    .send({
      name: 'Steven Universe',
      weapon: 'Sheild',
      species: 'Half-human, half-gem'
    });

  expect(response.body).toEqual({
    id: '1',
    name: 'Steven Universe',
    weapon: 'Sheild',
    species: 'Half-human, half-gem'
  });
});

