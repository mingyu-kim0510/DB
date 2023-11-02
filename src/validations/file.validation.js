const Joi = require('joi');

const fileUpload = {
  files: Joi.object().keys({
    file: Joi.required(),
  }),
};

module.exports = {
  fileUpload,
};
