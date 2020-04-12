const { IntCode } = require('../lib/intcode');


const part1 = (input) => {
  const pos = {
    x: 0, y: 0, dx: 0, dy: -1,
  };
  const positions = new Map();

  const intcode = new IntCode(input).withInput(0);
  while (!intcode.isHalted()) {
    intcode.step();

    if (intcode.output.length === 2) {
      const output = [intcode.getOutput(), intcode.getOutput()];
      const turn = output[1] === 0 ? 'left' : 'right';
      console.log(output);

      if ((positions.get(`${pos.x},${pos.y}`) || 0) !== output[0]) {
        positions.set(`${pos.x},${pos.y}`, output[0]);
      }

      // eslint-disable-next-line no-nested-ternary
      const dx = pos.dx === 0 ? turn === 'left' ? pos.dy : pos.dy * -1 : 0;
      // eslint-disable-next-line no-nested-ternary
      const dy = pos.dy === 0 ? turn === 'left' ? pos.dx * -1 : pos.dx : 0;

      pos.dx = dx;
      pos.dy = dy;
      pos.x += pos.dx;
      pos.y += pos.dy;

      intcode.pushInput(positions.get(`${pos.x},${pos.y}`) || 0);
    }
  }

  return positions.size;
};

// const part2 = (input) => {

// };

module.exports = {
  part1,
  // part2,
};
