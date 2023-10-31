const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync((req, res) => {
  userService.createUser(req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const getUser = catchAsync((req, res) => {
  const user = userService.getUserById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync((req, res) => {
  const user = userService.updateUserById(req.params.id, req.body);
  res.send(user);
});

module.exports = {
  createUser,
  getUser,
  updateUser,
};
