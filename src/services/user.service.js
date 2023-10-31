const httpStatus = require('http-status');
const dayjs = require('dayjs');
const ApiError = require('../utils/ApiError');
const nextId = require('../utils/nextId');
const db = require('../config/lowdb');
const { defaultDateFormat } = require('../config/constants');

const getUserDb = () => {
  return db.get('users');
};

const getUsersMap = () => {
  const result = {};
  getUserDb()
    .value()
    .forEach((obj) => {
      result[obj.id] = obj;
    });
  return result;
};

const getUserByEmail = (email) => {
  return getUserDb().find({ email }).value();
};

const getUserById = (id) => {
  return getUserDb().find({ id }).value();
};

const isEmailTaken = (email) => {
  return !!getUserByEmail(email);
};

const createUser = (payload) => {
  if (isEmailTaken(payload.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'email is already exists');
  }
  const userDb = getUserDb();
  const user = userDb
    .push({
      id: nextId(userDb),
      ...payload,
      regDate: dayjs().format(defaultDateFormat),
    })
    .write();
  return user;
};

const updateUserById = (id, payload) => {
  const user = getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  getUserDb()
    .find(user)
    .merge({
      ...payload,
    })
    .write();
  return user;
};

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  updateUserById,
  getUsersMap,
};
