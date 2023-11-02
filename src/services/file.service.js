const httpStatus = require('http-status');
const _ = require('lodash');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

/**
 * Upload File
 * @param {File} email
 * @returns {string} fileName
 */
const uploadFile = (file) => {
  const ext = _.last(file.name.split('.'));
  const newFileNm = `${new Date().getTime()}.${ext}`;
  const uploadPath = `${config.uploadDir}/${newFileNm}`;
  return new Promise((resolve) => {
    file.mv(uploadPath, (err) => {
      if (err) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'can not move file');
      }
      resolve(newFileNm);
    });
  });
};

module.exports = {
  uploadFile,
};
