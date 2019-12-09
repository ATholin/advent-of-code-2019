const { IntCode } = require('../lib/intcode');

const part1 = (program) => new IntCode([...program])
  .withInput(1)
  .execute()
  .output
  .join(',');

const part2 = (program) => new IntCode([...program])
  .withInput(2)
  .execute()
  .output
  .join(',');

module.exports = {
  part1,
  part2,
};
