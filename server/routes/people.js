const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const validation = require('./../middleware/validation/people');
const { getNextId } = require('./../utils/people');

// grab correct db file using env variable
const dbFile = process.env.DB;

// GET / - Return all people
router.get('/', (req, res) => {
  const people = JSON.parse(fs.readFileSync(path.join(__dirname, './../', 'db/', dbFile)));
  res.send({ people });
});

// GET /:id - Return single person (unused)
router.get('/:id', validation.read, (req, res) => {
  const people = JSON.parse(fs.readFileSync(path.join(__dirname, './../', 'db/', dbFile)));
  const person = people.find(p => p.id === req.params.id);
  if (person) {
    res.send({ person });
  } else {
    res.status(404).send();
  }
});

// PATCH /:id - Update existing person
router.patch('/:id', validation.update, (req, res) => {
  // send validation errors if they exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.mapped() });
  }
  // modify db file
  const people = JSON.parse(fs.readFileSync(path.join(__dirname, './../', 'db/', dbFile)));
  const personIdx = people.findIndex(p => p.id === req.params.id);
  if (personIdx > -1) {
    const updates = matchedData(req);
    people[personIdx] = { ...people[personIdx], ...updates };
    fs.writeFile(path.join(__dirname, './../', 'db/', dbFile), JSON.stringify(people), (err) => {
      if (err) throw err;
      res.send({ updated: people[personIdx] });
    });
  } else {
    res.status(400).send();
  }
});

// POST / - Create new person
router.post('/', validation.create, (req, res) => {
  // send validation errors if they exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.mapped() });
  }
  // create new person object
  const people = JSON.parse(fs.readFileSync(path.join(__dirname, './../', 'db/', dbFile)));
  const newPerson = {
    id: getNextId(people),
    ...matchedData(req),
  };
  people.push(newPerson);
  // save new person to db file
  fs.writeFile(path.join(__dirname, './../', 'db/', dbFile), JSON.stringify(people), (err) => {
    if (err) throw err;
    res.send({ created: newPerson });
  });
});

// DELETE /:id - Remove person
router.delete('/:id', validation.delete, (req, res) => {
  // send validation errors if they exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.mapped() });
  }
  // modify db file
  const people = JSON.parse(fs.readFileSync(path.join(__dirname, './../', 'db/', dbFile)));
  const personIdx = people.findIndex(p => p.id === req.params.id);
  if (personIdx > -1) {
    const deleted = people.splice(personIdx, 1);
    fs.writeFile(path.join(__dirname, './../', 'db/', dbFile), JSON.stringify(people), (err) => {
      if (err) throw err;
      res.send({ deleted: deleted[0] });
    });
  } else {
    res.status(400).send();
  }
});

module.exports = router;
