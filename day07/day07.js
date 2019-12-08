const perm = require('../lib/functions/perm')

const Amplifier = require('./Amplifier')
const Thruster = require('./Thruster')

const part1 = program => {
    const permutations = perm([0,1,2,3,4])

    return permutations.reduce((acc, n) => {
        const AmpA = new Amplifier([...program], 'AmpA').withInput([n[0], 0])
        const AmpB = new Amplifier([...program], 'AmpB').withInput(n[1])
        const AmpC = new Amplifier([...program], 'AmpC').withInput(n[2])
        const AmpD = new Amplifier([...program], 'AmpD').withInput(n[3])
        const AmpE = new Amplifier([...program], 'AmpE').withInput(n[4])
        const thruster = new Thruster()

        AmpA.connectNextAmplifier(AmpB)
        AmpB.connectNextAmplifier(AmpC)
        AmpC.connectNextAmplifier(AmpD)
        AmpD.connectNextAmplifier(AmpE)
        AmpE.connectThruster(thruster)

        AmpA.execute().sendToNext()
        AmpB.execute().sendToNext()
        AmpC.execute().sendToNext()
        AmpD.execute().sendToNext()
        AmpE.execute().sendToThruster()
    
        return Math.max(acc, thruster.data)
    }, 0)
}

const part2 = program => {
    const permutations = perm([5,6,7,8,9])

    return permutations.reduce((acc, n) => {
        //console.log(n)
        const AmpA = new Amplifier([...program], 'AmpA').withInput([n[0], 0])
        const AmpB = new Amplifier([...program], 'AmpB').withInput(n[1])
        const AmpC = new Amplifier([...program], 'AmpC').withInput(n[2])
        const AmpD = new Amplifier([...program], 'AmpD').withInput(n[3])
        const AmpE = new Amplifier([...program], 'AmpE').withInput(n[4])

        AmpA.connectNextAmplifier(AmpB)
        AmpB.connectNextAmplifier(AmpC)
        AmpC.connectNextAmplifier(AmpD)
        AmpD.connectNextAmplifier(AmpE)
        AmpE.connectNextAmplifier(AmpA)

        let thruster = new Thruster()
        AmpE.connectThruster(thruster)
        
        do {
            AmpA.step().sendToNext()
            AmpB.step().sendToNext()
            AmpC.step().sendToNext()
            AmpD.step().sendToNext()
            AmpE.step().sendToMultiple([AmpA, thruster])
        } while (!AmpE.isHalted())

        return Math.max(thruster.data, acc)
    }, 0)
} 

module.exports = {
    part1,
    part2
}