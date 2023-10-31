const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = (email, password) => {
  const user = userService.getUserByEmail(email);
  if (!user || !(user.password === password)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = (refreshToken) => {
  const refreshTokenDoc = tokenService.findToken({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  tokenService.removeToken(refreshTokenDoc);
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = (refreshToken) => {
  try {
    const refreshTokenDoc = tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    tokenService.removeToken(refreshTokenDoc);
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    userService.updateUserById(user.id, { password: newPassword });
    tokenService.removeToken({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  // verifyEmail,
};
