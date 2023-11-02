const config = require('../config/config');
const catchAsync = require('../utils/catchAsync');
const { fileService } = require('../services');

const uploadFile = catchAsync(async (req, res) => {
  const filename = await fileService.uploadFile(req.files.file);
  res.send({
    path: `${config.uploadUri}/${filename}`,
    fullpath: `${req.protocol}://${req.get('host')}${config.uploadUri}/${filename}`,
  });
});

module.exports = {
  uploadFile,
};
