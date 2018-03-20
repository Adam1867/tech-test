const router = require('express').Router();
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

// grab correct db file using env variable
const dbFile = process.env.DB;

// GET / - Return all people
router.get('/', (req, res) => {
  const people = JSON.parse(fs.readFileSync(path.join(__dirname, './../', 'db/', dbFile)));
  res.send({ people });
});

// GET /:id - Return single person (unused)
router.get('/:id', (req, res) => {
  const people = JSON.parse(fs.readFileSync(path.join(__dirname, './../', 'db/', dbFile)));
  const person = people.find(p => p.id === parseInt(req.params.id, 10));
  if (person) {
    res.send({ person });
  } else {
    res.status(404).send();
  }
});

// PATCH /:id - Update existing person
router.patch('/:id', (req, res) => {
  const people = JSON.parse(fs.readFileSync(path.join(__dirname, './../', 'db/', dbFile)));
  const personIdx = people.findIndex(p => p.id === parseInt(req.params.id, 10));
  if (personIdx > -1) {
    const updates = _.pick(req.body, ['firstname', 'surname']);
    people[personIdx] = { ...people[personIdx], ...updates };
    fs.writeFile(path.join(__dirname, './../', 'db/', dbFile), JSON.stringify(people), (err) => {
      if (err) throw err;
      res.send({ updated: people[personIdx] });
    });
  } else {
    res.status(400).send();
  }
});

module.exports = router;
