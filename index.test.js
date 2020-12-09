const fs = require('fs');
const request = require('supertest');
const app = require('./index.js');
const StevenUniverse = require('./stevenuniverse.js');
const pool = require('./lib/utils/pool.js');

describe('app tests', () => {

  beforeAll(() => {
    return pool.query(fs.readFileSync('./setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });



  it('creates a character via POST', async() => {
    const response = await request(app)
      .post('/stevenuniverse')
      .send({
        name: 'Steven Universe',
        weapon: 'Shield',
        species: 'Half-human, half-gem'
      });
  
    expect(response.body).toEqual({
      id: '1',
      name: 'Steven Universe',
      weapon: 'Shield',
      species: 'Half-human, half-gem'
    });
  });

  it('gets characer via GET', async() => {
    const expectation = [{
      'id': '1',
      'name': 'Steven Universe',
      'weapon': 'Shield',
      'species': 'Half-human, half-gem'
    }];
      
    const data = await request(app)
      .get('/stevenuniverse');
        
    expect(data.body).toEqual(expectation);
  });

  it('finds a character by id with GET', async() => {
    const data = await request(app)
      .get('/stevenuniverse/1');

    expect(data.body).toEqual({
      id: '1',
      name: 'Steven Universe',
      weapon: 'Shield',
      species: 'Half-human, half-gem'
    });
  });

  it('updates a character with PUT', async() => {
    const amethyst = await StevenUniverse.insert({ name: 'Amethyst', weapon: 'Whip', species: 'Amethyst' });

    const data = await request(app)
      .put(`/stevenuniverse/${amethyst.id}`)
      .send({
        name: 'Amethyst',
        weapon: 'Whip',
        species: 'Gem'
      });

    expect(data.body).toEqual({
      ...amethyst,
      species: 'Gem'
    });
  });

  it('deletes a character with DELETE', async() => {
    const garnet = await StevenUniverse.insert({
      name: 'Garnet',
      weapon: 'Gauntlets',
      species: 'Gem'
    });

    const data = await request(app)
      .delete(`/stevenuniverse/${garnet.id}`);

    expect(data.body).toEqual(garnet);
  });

});
