const fs = require('fs');

const calcPath = (path) => {
  const p = [{
    x: 0,
    y: 0,
  }];
  path.split(',').forEach((step) => {
    const dir = step[0];
    const c = step.slice(1);

    switch (dir) {
      case 'U':
        for (let i = 0; i < c; i += 1) {
          p.push({
            x: p[p.length - 1].x,
            y: p[p.length - 1].y + 1,
          });
        }
        break;
      case 'D':
        for (let i = 0; i < c; i += 1) {
          p.push({
            x: p[p.length - 1].x,
            y: p[p.length - 1].y - 1,
          });
        }
        break;
      case 'R':
        for (let i = 0; i < c; i += 1) {
          p.push({
            x: p[p.length - 1].x + 1,
            y: p[p.length - 1].y,
          });
        }
        break;
      case 'L':
        for (let i = 0; i < c; i += 1) {
          p.push({
            x: p[p.length - 1].x - 1,
            y: p[p.length - 1].y,
          });
        }
        break;
      default:
        break;
    }
  });

  return p;
};

const calcDistance = (pos) => Math.abs(pos.x) + Math.abs(pos.y);

const data = fs.readFileSync('day03.in', 'utf8');

const calculatedPaths = data.split('\n').map(calcPath);

const path1 = calculatedPaths[0];
const path2 = calculatedPaths[1];
const len = path1.length;

console.log('Parsing complete\n');

let fewestSteps = 99999;
let closest = 99999;

path1.forEach((path, i) => {
  if (path.x === 0 && path.y === 0) return;
  if (path2.some((val) => val.x === path.x && val.y === path.y)) {
    const distance = calcDistance(path);
    closest = Math.min(closest, distance);

    const steps1 = i;
    const steps2 = path2
      .findIndex((p) => p.x === path.x && p.y === path.y);
    const steps = steps1 + steps2;

    console.log(`(${i}/${len})Distance: ${distance}, steps: ${steps}`);

    fewestSteps = Math.min(fewestSteps, steps);
  }
});

console.log('\nDONE\n');
console.log('[PART1] Closest steps:', closest);
console.log('[PART2] Fewest steps:', fewestSteps);
