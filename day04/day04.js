// range 134792-675810

/**
 * Sort the array and check if they're equal.
 * If they are, the numbers are not decreasing.
 *
 * @param {string} nums
 */
const checkIncreasing = (nums) => nums.split('').toString() === nums.split('').sort().toString();

const checkPassword = (number, part2 = false) => {
  const str = number.toString();
  const res = str.match(/(\d)\1+(?!\1)/g);

  if (!checkIncreasing(str)) return false;

  if (res == null) return false;

  if (part2 && res.filter((v) => v.length === 2).length === 0) return false;

  return true;
};

const iterate = (start, end, part2 = false) => {
  let count = 0;

  for (let i = start; i <= end; i += 1) {
    if (checkPassword(i, part2)) count += 1;
  }

  return count;
};

/**
 *
 * @param {Number} start Range starting number
 * @param {Number} end Range ending number
 */
const part1 = (start, end) => iterate(start, end);

/**
 *
 * @param {Number} start Range starting number
 * @param {Number} end Range ending number
 */
const part2 = (start, end) => iterate(start, end, true);

module.exports = {
  part1,
  part2,
};
