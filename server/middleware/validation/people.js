const { check } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const peopleValidation = {
  read: [
    sanitize('id').toInt(),
  ],
  update: [
    sanitize('id').toInt(),
    check(['firstname', 'surname'])
      .exists().optional()
      .matches(/^[a-z ,.'-]+$/i)
      .trim(),
  ],
};

module.exports = peopleValidation;
