const { check } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const peopleValidation = {
  create: [
    check(['firstname', 'surname'])
      .exists()
      .matches(/^[a-z ,.'-]+$/i)
      .trim(),
  ],
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
  delete: [
    sanitize('id').toInt(),
  ],
};

module.exports = peopleValidation;
