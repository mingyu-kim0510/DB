// const username = (value, helpers) => {
//   if (!value.length > 3) {
//     return helpers.message('must be valid username');
//   }
//   return value;
// };

const password = (value, helpers) => {
  if (value.length < 4) {
    return helpers.message('password must be at least 8 characters');
  }
  return value;
};

module.exports = {
  // username,
  password,
};
