const { BadRequestError, NotFoundError } = require("../errors");
const { body, param, validationResult} = require('express-validator');
const mongoose = require('mongoose');
const Message = require('../models/Message');

const withValidationErrors = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

const validateMessageInput = withValidationErrors([
  body('messenger').notEmpty().withMessage('messenger is required'),
  body('content').notEmpty().withMessage('content is required'),
]);

const validateMessageId = withValidationErrors([
  param('id').custom(async value => { 
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if(!isValidId) throw new BadRequestError('invalid id configuration');
    const message = await Message.findById(value);

    if(!job) throw new NotFoundError(`no message with id: ${value}`)
  }),
]);

module.exports = { validateMessageInput, validateMessageId };