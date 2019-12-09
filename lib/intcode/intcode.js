const instructions = require('./instructions');
const modes = require('./modes');

class IntCode {
    pc = 0;

    program = []

    input = []

    output = []

    halt = false

    name = 'IntCode'

    base = 0

    constructor(program, name = 'IntCode') {
      if (typeof program === 'string') {
        this.program = [...program.split(',').map((c) => parseInt(c, 10))];
      } else {
        this.program = [...program];
      }
      this.name = name;
    }

    getAtPosition = (position) => this.program[position]

    setAtPosition = (position, value) => {
      this.program[position] = value;
      return this;
    }

    withInput = (input) => {
      if (typeof input === 'number') {
        this.input = [input];
      } else {
        this.input = input;
      }

      return this;
    }

    pushInput = (input) => {
      if (!this.input) {
        this.input = [];
      }

      this.input.push(input);

      return this;
    }

    parseParam = (mode = modes.POSITION, i, asIndex = false) => {
      let v;
      switch (mode) {
        case modes.POSITION:
          v = this.program[i];
          break;
        case modes.IMMEDIATE:
          v = i;
          break;
        case modes.RELATIVE:
          v = this.base + this.program[i];
          break;
        default:
          throw new Error('Bad mode');
      }

      return asIndex ? v : this.program[v];
    }

    step = () => {
      const i = this.program[this.pc] || 0;
      const instr = (`00000${i}`).slice(-5);

      const opcode = parseInt(instr.slice(3), 10);
      const p1Mode = parseInt(instr[2], 10);
      const p2Mode = parseInt(instr[1], 10);
      const p3Mode = parseInt(instr[0], 10);

      if (!Object.values(instructions).includes(opcode)) {
        throw Error(`(${this.pc}): Unhandled opcode ${opcode}`);
      }

      if (opcode === instructions.HALT || opcode == null || opcode === undefined) {
        this.halt = true;
      } else if (opcode === instructions.ADD) {
        const param1 = this.parseParam(p1Mode, this.pc + 1);
        const param2 = this.parseParam(p2Mode, this.pc + 2);
        const param3 = this.parseParam(p3Mode, this.pc + 3, true);

        this.program[param3] = param1 + param2;
        this.pc += 4;
      } else if (opcode === instructions.MUL) {
        const param1 = this.parseParam(p1Mode, this.pc + 1);
        const param2 = this.parseParam(p2Mode, this.pc + 2);
        const param3 = this.parseParam(p3Mode, this.pc + 3, true);

        this.program[param3] = param1 * param2;
        this.pc += 4;
      }

      if (opcode === instructions.IN) {
        if (this.input && this.input.length > 0) {
          const param1 = this.parseParam(p1Mode, this.pc + 1, true);
          this.program[param1] = this.input.shift();
          this.pc += 2;
        }
      } else if (opcode === instructions.OUT) {
        this.output.push(this.parseParam(p1Mode, this.pc + 1));
        this.pc += 2;
      } else if (opcode === instructions.JIT) {
        const param1 = this.parseParam(p1Mode, this.pc + 1);
        const param2 = this.parseParam(p2Mode, this.pc + 2);
        if (param1 !== 0) {
          this.pc = param2;
        } else {
          this.pc += 3;
        }
      } else if (opcode === instructions.JIF) {
        const param1 = this.parseParam(p1Mode, this.pc + 1);
        const param2 = this.parseParam(p2Mode, this.pc + 2);

        if (param1 === 0) {
          this.pc = param2;
        } else {
          this.pc += 3;
        }
      } else if (opcode === instructions.LT) {
        const param1 = this.parseParam(p1Mode, this.pc + 1);
        const param2 = this.parseParam(p2Mode, this.pc + 2);
        const param3 = this.parseParam(p3Mode, this.pc + 3, true);

        this.program[param3] = param1 < param2 ? 1 : 0;

        this.pc += 4;
      } else if (opcode === instructions.EQ) {
        const param1 = this.parseParam(p1Mode, this.pc + 1);
        const param2 = this.parseParam(p2Mode, this.pc + 2);
        const param3 = this.parseParam(p3Mode, this.pc + 3, true);

        this.program[param3] = param1 === param2 ? 1 : 0;

        this.pc += 4;
      } else if (opcode === instructions.AB) {
        const param1 = this.parseParam(p1Mode, this.pc + 1) || 0;
        this.base += param1;


        this.pc += 2;
      }

      return this;
    }

    execute = () => {
      while (!this.halt) {
        this.step();
      }

      return this;
    }

    isHalted = () => this.halt

    getOutput = () => this.output.pop()
}

module.exports = IntCode;
