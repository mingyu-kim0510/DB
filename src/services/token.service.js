const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const dayjs = require('dayjs');
const config = require('../config/config');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const db = require('../config/lowdb');

const getTokenDb = () => {
  return db.get('tokens');
};

/**
 * Generate token
 * @param {ObjectId} id
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (id, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: id,
    iat: dayjs().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} id
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = (token, id, expires, type, blacklisted = false) => {
  const tokenDb = getTokenDb();
  tokenDb.remove({ user: id }).write();
  tokenDb
    .push({
      token,
      user: id,
      expires: expires.toDate(),
      type,
      blacklisted,
    })
    .write();
  return tokenDb.find({ token });
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = (token, type) => {
  const tokenDb = getTokenDb();
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = tokenDb.find({ token, type, user: payload.sub, blacklisted: false }).value();
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = (user) => {
  const accessTokenExpires = dayjs().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = dayjs().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const generateResetPasswordToken = (email) => {
  const user = userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const accessTokenExpires = dayjs().add(config.jwt.accessExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken(user.id, accessTokenExpires, tokenTypes.RESET_PASSWORD);
  saveToken(resetPasswordToken, user.id, accessTokenExpires, tokenTypes.RESET_PASSWORD);
  return {
    resetPasswordToken,
  };
};

const findToken = ({ token, type, blacklisted }) => {
  const tokenDb = getTokenDb();
  const tokenDoc = tokenDb.find({ token, type, blacklisted });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

const removeToken = (tokenDoc) => {
  const tokenDb = getTokenDb();
  tokenDb.remove(tokenDoc).write();
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  findToken,
  removeToken,
  generateResetPasswordToken,
};
