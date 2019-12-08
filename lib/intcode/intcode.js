const instructions = require('./instructions')

class IntCode {
    pc = 0
    program = []
    input = []
    output = null
    halt = false
    name = "Amp"

    constructor(program, name) {
        this.program = program
        this.name = name
    }

    withInput = input => {
        if (typeof input == 'number') {
            this.input = [input]
        } else {
            this.input = input
        }
        
        return this
    }

    pushInput = input => {
        if (!this.input) {
            this.input = []
        }

        this.input.push(input)

        return this
    }
    
    parseParam = (input, mode, i) => mode == 1 ? input[i] : input[input[i]]

    step = () => {
        const i = this.program[this.pc]
        const instr = ("00000" + i).slice(-5)
        
        const opcode = parseInt(instr.slice(3))
        const p1 = parseInt(instr[2])
        const p2 = parseInt(instr[1])
        const p3 = parseInt(instr[0])

        //console.log(`(${this.name}): ${instr} ${p1} ${p2} ${p3}`)

        if (!Object.values(instructions).includes(opcode)) {
            throw Error(`(${this.pc}): Unhandled opcode ${opcode}`)
        }

        if (opcode == instructions.HALT || opcode == null || opcode == undefined) {
            this.halt = true
            //console.log(`${this.name}: Halted. Output -> ${this.output}`)
        }

        else if (opcode == instructions.ADD) {
            const param1 = this.parseParam(this.program, p1, this.pc + 1)
            const param2 = this.parseParam(this.program, p2, this.pc + 2)
            const param3 = this.program[this.pc + 3]
            
            this.program[param3] = param1 + param2
            this.pc += 4
        }

        else if (opcode == instructions.MUL) {
            const param1 = this.parseParam(this.program, p1, this.pc + 1)
            const param2 = this.parseParam(this.program, p2, this.pc + 2)
            const param3 = this.program[this.pc + 3]
            
            this.program[param3] = param1 * param2
            this.pc += 4
        }

        if (opcode == instructions.IN) {
            //console.log(`${this.name}: Reading from input queue...`)
            if (this.input && this.input.length > 0) {
                const param1 = this.program[this.pc + 1]
                this.program[param1] = this.input.shift()
                //console.log(`${this.name}: Read ${this.program[param1]}`)
                this.pc += 2
            }
        }

        else if (opcode == instructions.OUT) {
            this.output = this.parseParam(this.program, p1, this.pc + 1)
            //console.log(`${this.name}: Output -> ${this.output}`)
            this.pc += 2
        }

        else if (opcode == instructions.JIT) {
            const param1 = this.parseParam(this.program, p1, this.pc + 1)
            const param2 = this.parseParam(this.program, p2, this.pc + 2)
            if (param1 != 0) {
                this.pc = param2
            } else {
                this.pc += 3
            }
        }

        else if (opcode == instructions.JIF) {
            const param1 = this.parseParam(this.program, p1, this.pc + 1)
            const param2 = this.parseParam(this.program, p2, this.pc + 2)
            
            if (param1 == 0) {
                this.pc = param2
            } else {
                this.pc += 3
            }
        }

        else if (opcode == instructions.LT) {
            const param1 = this.parseParam(this.program, p1, this.pc + 1)
            const param2 = this.parseParam(this.program, p2, this.pc + 2)
            const param3 = this.program[this.pc + 3]

            this.program[param3] = param1 < param2 ? 1 : 0

            this.pc += 4
        }

        else if (opcode == instructions.EQ) {
            const param1 = this.parseParam(this.program, p1, this.pc + 1)
            const param2 = this.parseParam(this.program, p2, this.pc + 2)
            const param3 = this.program[this.pc + 3]

            this.program[param3] = param1 == param2 ? 1 : 0

            this.pc += 4
        }

        return this
    }

    execute = () => {
        while(!this.halt) {
            this.step()
        }

        return this
    }

    isHalted = () => this.halt

    getOutput = () => this.output
}

module.exports = IntCode