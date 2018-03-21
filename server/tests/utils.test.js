const expect = require('expect');

// import seed data and utils
const people = require('./seed/seed.people.json');
const { getNextId } = require('./../utils/people');


// getNextId
describe('getNextId', () => {
  it('should return the next valid ID', () => {
    const id = getNextId(people);
    expect(id).toBe(6);
  });
  it('should return 1 if there are no current IDs', () => {
    const id = getNextId([]);
    expect(id).toBe(1);
  });
});
