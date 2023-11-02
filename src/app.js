const jsonServer = require('json-server');
const httpStatus = require('http-status');
const passport = require('passport');
const express = require('express');

const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');

const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const routes = require('./routes/v1');

const mp = require('./middlewares/mp');
const mpRoutes = require('./routes/mp');

const app = jsonServer.create();
const middlewares = jsonServer.defaults({ logger: true, noCors: config.cors });
// const jsonRouter = jsonServer.router(config.jsonDb);

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(
  require('express-session')({
    secret: 'mysession',
    resave: true,
    saveUninitialized: true,
  })
);

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use(middlewares);
app.use(jsonServer.bodyParser);

app.use(require('express-fileupload')());

// app.use(jsonRouter);
app.use('/mp', mpRoutes);

app.use(routes);

app.use(config.uploadUri, express.static(config.uploadDir));
app.use(express.static('public'));

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
