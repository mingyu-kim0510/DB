module.exports = (path) => (req, res, next) => {
  next(path);
};
