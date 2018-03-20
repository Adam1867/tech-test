const expect = require('expect');
const request = require('supertest');

const app = require('./../server');

// import seed data
const people = require('./seed/seed.people.json');

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
  it('should return person with ID of 5', (done) => {
    request(app)
      .get('/api/people/5')
      .expect(200)
      .expect((res) => {
        expect(res.body.person.id).toBe(people[4].id);
      })
      .end(done);
  });
});
