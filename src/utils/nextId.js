const PK = 'id';
/**
 *
 */
const nextId = (target) => {
  const last = target.last().value();
  return last ? last[PK] + 1 : 1;
};
module.exports = nextId;
