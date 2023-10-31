const Joi = require('joi');

const createBoard = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    thumnail: Joi.string().allow(null, ''),
  }),
};

const getBoards = {
  query: Joi.object().keys({
    page: Joi.number(),
    pageSize: Joi.number(),
    size: Joi.number(),
  }),
  body: Joi.object().keys({
    page: Joi.number(),
    pageSize: Joi.number(),
    size: Joi.number(),
  }),
};

const getBoard = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const updateBoard = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    id: Joi.number(),
    title: Joi.string(),
    content: Joi.string(),
    thumnail: Joi.string().allow(null, ''),
  }),
};

module.exports = {
  createBoard,
  getBoard,
  updateBoard,
  getBoards,
};
