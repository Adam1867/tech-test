const expect = require('expect');
const request = require('supertest');

const app = require('./../server');

// import seed data and seed utils
const people = require('./seed/seed.people.json');
const { populatePeople } = require('./seed/seed');

// populate test db file with seed data before every test
beforeEach(populatePeople);


// GET /api/people
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

// GET /api/people/:id
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

// PATCH /api/people/:id
describe('PATCH /api/people/:id', () => {
  it('should update a person', (done) => {
    const updatedPerson = {
      firstname: '     Kirsty', // checks trim() sanitization also
    };
    request(app)
      .patch(`/api/people/${people[2].id}`)
      .send(updatedPerson)
      .expect(200)
      .expect((res) => {
        expect(res.body.updated.firstname).toBe(updatedPerson.firstname.trim());
        expect(res.body.updated.surname).toBe(people[2].surname);
      })
      .end(done);
  });
  it('should not update a person if invalid ID is supplied', (done) => {
    const updatedPerson = {
      firstname: 'Kirsty',
      surname: 'Gallacher',
    };
    request(app)
      .patch('/api/people/99')
      .send(updatedPerson)
      .expect(400)
      .end(done);
  });
  it('should not update a person if invalid data is supplied', (done) => {
    const updatedPerson = {
      firstname: 'aD4m?',
    };
    request(app)
      .patch(`/api/people/${people[0].id}`)
      .send(updatedPerson)
      .expect(422)
      .end(done);
  });
});
