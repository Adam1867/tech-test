const expect = require('expect');
const request = require('supertest');

const app = require('./../server');

// import seed data and seed utils
const people = require('./seed/seed.people.json');
const { populatePeople } = require('./seed/seed');

// populate test db file with seed data before every test
beforeEach(populatePeople);


describe('GET /api/people', () => {
  it('should return all people', (done) => {
    request(app)
      .get('/api/people')
      .expect(200)
      .expect((res) => {
        expect(res.body.people[0]).toEqual(people[0]);
      })
      .end(done);
  });
});

describe('GET /api/people/:id', () => {
  it('should return person if ID is valid', (done) => {
    request(app)
      .get(`/api/people/${people[4].id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.person.id).toBe(people[4].id);
      })
      .end(done);
  });
  it('should return a 404 if an ID is invalid', (done) => {
    request(app)
      .get('/api/people/99')
      .expect(404)
      .end(done);
  });
});
