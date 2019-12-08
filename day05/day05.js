const { IntCode } = require('../lib/intcode');

const run = (program, n) => new IntCode([...program])
  .withInput(n)
  .execute()
  .getOutput();

const part1 = (program, n = 1) => run(program, n);

const part2 = (program, n = 5) => run(program, n);

module.exports = {
  part1,
  part2,
};
