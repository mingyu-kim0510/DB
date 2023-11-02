const httpStatus = require('http-status');
const dayjs = require('dayjs');
const ApiError = require('../utils/ApiError');
const nextId = require('../utils/nextId');
const db = require('../config/lowdb');
const { defaultDateFormat } = require('../config/constants');

const getTodoDb = () => {
  return db.get('todos');
};

const getTodosByUserId = (userId) => {
  return getTodoDb().filter({ userId });
};

const createTodo = (userId, payload) => {
  const todoDb = getTodoDb();
  return todoDb
    .push({ id: nextId(todoDb), userId, ...payload, completed: false, regDate: dayjs().format(defaultDateFormat) })
    .write();
};

const getTodoById = (id) => {
  return getTodoDb().find({ id }).value();
};

const updateTodoById = (id, userId, payload) => {
  const todo = getTodosByUserId(userId).find({ id }).value();
  if (!todo) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Todo not found');
  }
  getTodoDb()
    .find(todo)
    .merge({
      ...payload,
    })
    .write();
  return getTodoById(id);
};

const deleteTodoById = (id, userId) => {
  const todo = getTodosByUserId(userId).find({ id }).value();
  if (!todo) throw new ApiError(httpStatus.BAD_REQUEST, 'Todo not found');
  getTodoDb().remove({ id }).write();
};

module.exports = {
  getTodosByUserId,
  getTodoById,
  updateTodoById,
  deleteTodoById,
  createTodo,
};
