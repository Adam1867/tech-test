const fs = require('fs');
const path = require('path');

// grab seed data
const defaultPeople = require('./seed.people.json');

// grab correct db file using env variable
const dbFile = process.env.DB;

// refresh test db file with seed data - ran before each test
const populatePeople = (done) => {
  fs.writeFile(path.join(__dirname, './../../db/', dbFile), JSON.stringify(defaultPeople), (err) => {
    if (err) throw err;
    done();
  });
};

// grab current people from test db file
const getCurrentPeople = () => JSON.parse(fs.readFileSync(path.join(__dirname, './../../', 'db/', dbFile)));

module.exports = { populatePeople, getCurrentPeople };
