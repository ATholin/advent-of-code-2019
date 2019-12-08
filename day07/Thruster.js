module.exports = class Thruster {
    data = 0

    receive = output => {
        //console.log(`Thruster: Received ${this.output} from previous`)
        if (output != null) {
            this.data = output
        }
    }
}