const parseParam = (input, mode, i) => mode == 1 ? input[i] : input[input[i]]

const part1 = (input, n = 1) => {
    let cnt = 0
    let output = -1
    while (input[cnt] != 99) {
        const i = input[cnt]
        const instr = ("00000" + i).slice(-5)
        
        const opcode = parseInt(instr.slice(3))
        const p1 = parseInt(instr[2])
        const p2 = parseInt(instr[1])
        const p3 = parseInt(instr[0])

        if (opcode == 1) {
            const param1 = parseParam(input, p1, cnt + 1)
            const param2 = parseParam(input, p2, cnt + 2)
            const param3 = input[cnt + 3]
            
            input[param3] = param1 + param2
            cnt += 4
        }

        else if (opcode == 2) {
            const param1 = parseParam(input, p1, cnt + 1)
            const param2 = parseParam(input, p2, cnt + 2)
            const param3 = input[cnt + 3]
            
            input[param3] = param1 * param2
            cnt += 4
        }

        if (opcode == 3) {
            const param1 = input[cnt + 1]
            input[param1] = n
            cnt += 2
        }

        else if (opcode == 4) {
            output = parseParam(input, p1, cnt + 1)
            cnt += 2
        }
    }

    return output
}

const part2 = (input, n = 5) => {
    let cnt = 0
    let output = -1
    while (cnt < input.length) {
        const i = input[cnt]
        const instr = ("00000" + i).slice(-5)
        
        const opcode = parseInt(instr.slice(3))
        const p1 = parseInt(instr[2])
        const p2 = parseInt(instr[1])
        const p3 = parseInt(instr[0])

        if (opcode == 99 || opcode == null || opcode == undefined) break

        else if (opcode == 1) {
            const param1 = parseParam(input, p1, cnt + 1)
            const param2 = parseParam(input, p2, cnt + 2)
            const param3 = input[cnt + 3]
            
            input[param3] = param1 + param2
            cnt += 4
        }

        else if (opcode == 2) {
            const param1 = parseParam(input, p1, cnt + 1)
            const param2 = parseParam(input, p2, cnt + 2)
            const param3 = input[cnt + 3]
            
            input[param3] = param1 * param2
            cnt += 4
        }

        if (opcode == 3) {
            const param1 = input[cnt + 1]
            input[param1] = n
            cnt += 2
        }

        else if (opcode == 4) {
            output = parseParam(input, p1, cnt + 1)
            cnt += 2
        }

        else if (opcode == 5) {
            const param1 = parseParam(input, p1, cnt + 1)
            const param2 = parseParam(input, p2, cnt + 2)
            if (param1 != 0) {
                cnt = param2
            } else {
                cnt += 3
            }
        }

        else if (opcode == 6) {
            const param1 = parseParam(input, p1, cnt + 1)
            const param2 = parseParam(input, p2, cnt + 2)
            
            if (param1 == 0) {
                cnt = param2
            } else {
                cnt += 3
            }
        }

        else if (opcode == 7) {
            const param1 = parseParam(input, p1, cnt + 1)
            const param2 = parseParam(input, p2, cnt + 2)
            const param3 = input[cnt + 3]

            input[param3] = param1 < param2 ? 1 : 0

            cnt += 4
        }

        else if (opcode == 8) {
            const param1 = parseParam(input, p1, cnt + 1)
            const param2 = parseParam(input, p2, cnt + 2)
            const param3 = input[cnt + 3]

            input[param3] = param1 == param2 ? 1 : 0

            cnt += 4
        }
    }

    return output
}

module.exports = {
    part1,
    part2
}