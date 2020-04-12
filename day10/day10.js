/**
 * Return an array of objects consisting of { x, y }
 * @param {string} input The input string
 */
const setup = (input, station = { x: 0, y: 0 }) => {
  // Make the input a 2D array
  const s = input.split('\n').map((l) => l.split(''));

  let y = 0;

  const asteroids = [];
  s.forEach((line) => {
    let x = 0;
    line.forEach((place) => {
      if (place !== '.' && !(x === station.x && y === station.y)) {
        asteroids.push({
          x,
          y,
          degrees: Math.atan2(station.y - y, station.x - x) * (180 / Math.PI),
          distance: Math.hypot(x - station.x, y - station.y),
        });
      }
      x += 1;
    });
    y += 1;
  });

  return asteroids;
};

const withAngles = (asteroids) => asteroids
  .map(({ x: x1, y: y1 }) => {
    const angles = new Set();

    asteroids.forEach(({ x: x2, y: y2 }) => {
      if (!(x1 === x2 && y1 === y2)) {
        angles.add(Math.atan2(y2 - y1, x2 - x1));
      }
    });

    return {
      asteroids: angles.size,
      x: x1,
      y: y1,
    };
  });

/**
 * Get the best asteroid
 * @param {string} input The input string
 */
const part1 = (input) => {
  const asteroids = setup(input);

  return withAngles(asteroids)
    .sort((a, b) => b.asteroids - a.asteroids)[0];
};

const part2 = (input, stationCoordinates = { x: 0, y: 0 }) => {
  const { x: x1, y: y1 } = stationCoordinates;

  let targets = input
    .split('\n')
    .reduce((objects, line, y2) => {
      line.trim().split('').forEach((space, x2) => {
        if (space === '#' && !(x1 === x2 && y1 === y2)) {
          objects.push({
            x: x2,
            y: y2,
            degrees: Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI),
            distance: Math.hypot(x1 - x2, y1 - y2),
          });
        }
      });

      return objects;
    }, [])
    .sort((a, b) => a.degrees - b.degrees);

  const targetDegrees = [...new Set(targets.map((target) => target.degrees))];

  let currentDegrees = targetDegrees.findIndex((degrees) => degrees === -90);
  let counter = 0;

  while (targets.length) {
    const target = targets
      .filter((t) => t.degrees === targetDegrees[currentDegrees])
      .sort((a, b) => a.distance - b.distance)[0];

    if (target) {
      targets = targets.filter(({ x, y }) => !(x === target.x && y === target.y));
      counter += 1;
      if (counter === 200) {
        return target.x * 100 + target.y;
      }
    }

    currentDegrees = currentDegrees < targetDegrees.length ? currentDegrees + 1 : 0;
  }
};

module.exports = {
  part1,
  part2,
};
