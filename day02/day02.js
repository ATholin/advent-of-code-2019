const parseInstr = (instr, rs, rd) => {
    if (instr == 99) return -1
    return instr == 1 ? rs + rd : rs * rd
}

module.exports.part1 = input => {
    let cnt = 0
    while (cnt < input.length) {
        const instr = input[cnt]
        if (instr == 99) break
        const rs = input[input[cnt + 1]]
        const rd = input[input[cnt + 2]]
        const o = input[cnt + 3]
        const res = parseInstr(instr, rs, rd)
        input[o] = res
        cnt += 4
    }

    return input
}

module.exports.part2 = input => {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            input[1] = i
            input[2] = j
    
            if (this.part1([...input])[0] == 19690720) {
                console.log("FOUND!", input[1], input[2])
                return (100 * input[1]) + input[2]
            }
        }
    }
}