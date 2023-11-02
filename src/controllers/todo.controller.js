const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { todoService } = require('../services');

const createTodo = catchAsync((req, res) => {
  const todos = todoService.createTodo(req.user.id, req.body);
  res.send(todos);
});

const getTodos = catchAsync((req, res) => {
  const todos = todoService.getTodosByUserId(req.user.id);
  res.send(todos);
});

const deleteTodo = catchAsync((req, res) => {
  todoService.deleteTodoById(req.params.id, req.user.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateTodo = catchAsync((req, res) => {
  const todo = todoService.updateTodoById(req.params.id, req.user.id, req.body);
  res.send(todo);
});

module.exports = {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
};
