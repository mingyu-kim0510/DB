const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

const getPath = (target) => {
  return path.resolve(__dirname, `../../${target}`);
};

dotenv.config({ path: getPath('.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'local').required(),
    PORT: Joi.number().default(3000),
    CORS: Joi.boolean().default(false).truthy('true').falsy('false').sensitive(),
    JSON_DB: Joi.string().default(getPath('json/db.json')),
    UPLOAD_DIR: Joi.string().default(getPath('uploads')),
    UPLOAD_URI: Joi.string().default('/files'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  cors: envVars.CORS,
  jsonDb: envVars.JSON_DB,
  uploadDir: envVars.UPLOAD_DIR,
  uploadUri: envVars.UPLOAD_URI,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  },
};
