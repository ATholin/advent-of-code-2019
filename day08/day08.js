require('../lib/functions/chunk');

const COLORS = {
  0: ' ',
  1: '█',
};

const part1 = (input, width, height) => {
  const chunked = [...input].chunk(width * height);

  const l0 = chunked.reduce((acc, n) => {
    const acc0 = acc.filter((o) => o === 0).length;
    const n0 = n.filter((o) => o === 0).length;
    return acc0 < n0 ? acc : n;
  });

  return l0.filter((o) => o === 1).length * l0.filter((o) => o === 2).length;
};

const draw = (data) => data.map((p) => p.map((c) => COLORS[c]).join('')).join('\n');

const part2 = (input, width, height) => {
  const layers = [...input].chunk(width * height);
  const image = Array(width * height).fill(2);

  layers.forEach((c) => {
    c.forEach((p, i) => {
      if (image[i] === 2) {
        image[i] = p;
      }
    });
  });

  return draw(image.chunk(width));
};

module.exports = {
  part1,
  part2,
};
