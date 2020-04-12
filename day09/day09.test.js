const { day, year } = require('./');
const { part1/* , part2 */ } = require('./day09');

// const QUINE = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99';

describe(`${year} - Day ${day} - Part One`, () => {
  // it('Should print itself', () => {
  //   expect(part1(QUINE)).toBe(QUINE);
  // });

  // it('Should output a 16-digit number', () => {
  //   expect(part1('1102,34915192,34915192,7,4,7,99,0')).toBe(QUINE);
  // });

  it('Should output 1125899906842624', () => {
    expect(part1('104,1125899906842624,99')).toBe('1125899906842624');
  });
});
