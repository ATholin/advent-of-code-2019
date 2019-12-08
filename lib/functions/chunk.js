// eslint-disable-next-line no-extend-native
Array.prototype.chunk = (groupsize) => {
  const sets = [];
  const chunks = Math.ceil(this.length / groupsize);
  let i = 0;

  while (i < chunks) {
    sets[i] = this.splice(0, groupsize);
    i += 1;
  }
  return sets;
};
