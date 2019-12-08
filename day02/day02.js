const { IntCode } = require('../lib/intcode');

const part1 = (input, p1, p2) => new IntCode([...input])
  .setAtPosition(1, p1)
  .setAtPosition(2, p2)
  .execute()
  .getAtPosition(0);

const part2 = (input) => {
  for (let i = 0; i < 100; i += 1) {
    for (let j = 0; j < 100; j += 1) {
      const ic = new IntCode([...input]);
      ic.setAtPosition(1, i).setAtPosition(2, j);

      if (ic.execute().getAtPosition(0) === 19690720) {
        return (100 * i) + j;
      }
    }
  }

  return -1;
};

module.exports = {
  part1,
  part2,
};
