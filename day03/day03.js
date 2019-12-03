const fs = require('fs')

const calcPath = (path, index) => {
    let p = [{
        x: 0,
        y: 0
    }]
    path.split(',').forEach(step => {
        const dir = step[0]
        const c = step.slice(1)
        
        switch(dir) {
            case 'U':
                for (let i = 0; i < c; i++) {
                    p.push({
                        x: p[p.length-1].x,
                        y: p[p.length-1].y + 1
                    })
                }
                break
            case 'D':
                for (let i = 0; i < c; i++) {
                    p.push({
                        x: p[p.length-1].x,
                        y: p[p.length-1].y - 1
                    })
                }
                break
            case 'R':
                for (let i = 0; i < c; i++) {
                    p.push({
                        x: p[p.length-1].x + 1,
                        y: p[p.length-1].y
                    })
                }
                break
            case 'L':
                for (let i = 0; i < c; i++) {
                    p.push({
                        x: p[p.length-1].x - 1,
                        y: p[p.length-1].y
                    })
                }
                break
        }
    })

    return p
}

const calcDistance = pos => Math.abs(pos.x) + Math.abs(pos.y)

const data = fs.readFileSync('day03_test.in', 'utf8');

const calculatedPaths = data.split('\n').map(calcPath)

const path1 = calculatedPaths[0]
const path2 = calculatedPaths[1]

let fewestSteps = 99999
let closest = 99999
//part2
path1.forEach((path, i) => {
    if (path2.filter(p => p.x == path.x && p.y == path.y).length > 0 && path.x != 0 && path.y != 0) {
        const distance = calcDistance(path);
        closest = Math.min(closest, distance)
        
        const steps1 = i
        const steps2 = path2
            .findIndex(p => p.x == path.x && p.y == path.y)
        const steps = steps1+steps2

        fewestSteps = Math.min(fewestSteps, steps)
    }
})
console.log("(PART1) Closest steps:", closest)
console.log("(PART2) Fewest steps:", fewestSteps)