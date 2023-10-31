const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');
const ApiError = require('../utils/ApiError');

const register = catchAsync((req, res) => {
  const user = userService.createUser(req.body);
  const tokens = tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync((req, res) => {
  const { email, password } = req.body;
  const user = authService.loginUserWithEmailAndPassword(email, password);
  const tokens = tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const sessionLogin = catchAsync((req, res) => {
  const { email, password } = req.body;
  const user = authService.loginUserWithEmailAndPassword(email, password);
  req.session.user = user;
  res.send({ user });
});

const logout = catchAsync((req, res) => {
  authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const sessionLogout = catchAsync((req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
    }
    res.status(httpStatus.NO_CONTENT).send();
  });
});

const refreshTokens = catchAsync((req, res) => {
  const tokens = authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync((req, res) => {
  const resetPasswordToken = tokenService.generateResetPasswordToken(req.body.email);
  res.send({ resetPasswordToken });
});

const resetPassword = catchAsync((req, res) => {
  authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const getSession = catchAsync((req, res) => {
  res.send({ ...req.user });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  resetPassword,
  forgotPassword,
  sessionLogin,
  sessionLogout,
  getSession,
};
