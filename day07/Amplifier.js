const IntCode = require('../lib/intcode/intcode')

module.exports = class Amplifier extends IntCode {
    nextAmplifier = null
    thruster = null

    connectNextAmplifier = next => this.nextAmplifier = next

    connectThruster = thruster => this.thruster = thruster

    sendToThruster = () => {
        if (this.output != null) {
            //console.log(`${this.name}: Sending output ${this.output} to Thruster`)
            this.sendOutput(this.output, this.thruster)
        }

        return this
    }

    sendToNext = () => {
        if (this.output != null) {
            //console.log(`${this.name}: Sending output ${this.output} to ${this.nextAmplifier.name}`)
            this.sendOutput(this.output, this.nextAmplifier)
        }

        return this
    }

    sendToMultiple = targets => {
        if (this.output != null) {
            targets.forEach(target => {
                //console.log(`${this.name}: Sending output ${this.output} to ${this.nextAmplifier.name}`)
                target.receive(this.output)
            })
        }

        this.output = null
        
        return this
    }

    sendOutput = (output, target) => {
        target.receive(output)

        this.output = null

        return this
    }

    receive = output => {
        //console.log(`${this.name}: Received ${this.output} from previous`)
        this.pushInput(output)
    }
}