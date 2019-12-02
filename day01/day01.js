const calc = (mass, recursive = false) => {
    const rounded = Math.round(Math.floor((mass/3))) - 2
    if (rounded <= 0)
        return 0
    return recursive ? rounded + calc(rounded, true) : rounded
} 

module.exports = {
    part1: (input) => input
        .map(val => calc(val))
        .reduce((a, b) => a + b),

    part2: (input) => input
        .map(val => calc(val, true))
        .reduce((a, b) => a + b)
}