const Joi = require('joi');

const createTodo = {
  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
};

const getTodo = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const updateTodo = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    id: Joi.number(),
    content: Joi.string().allow(null),
    completed: Joi.boolean().allow(null),
  }),
};

module.exports = {
  createTodo,
  getTodo,
  updateTodo,
};
