import { Day } from './day.js'


function addBeam(m : Map<number, number>, k: number, v: number) {
  if (m.has(k)) {
    m.set(k, v + m.get(k))
  } else {
    m.set(k, v)
  }
}

export const day07: Day = {
  run: (input: string) => {
    const grid: string[][] = input.trim().split(/\r?\n/).map(l => l.split(''));

    // MacGyver's multi-set
    let beams: Map<number, number> = new Map();
    beams.set(grid[0].indexOf('S'), 1);

    let sol1: number = 0;
    
    for (let i = 1; i != grid.length; ++ i) {
      let row = grid[i];
      let newBeams: Map<number, number> = new Map();

      beams.forEach((v, k) => {
        if (row[k] == '^') {
          addBeam(newBeams, k-1, v) 
          addBeam(newBeams, k+1, v)
          sol1++;
        } else {
          addBeam(newBeams, k, v)
        }
      });

      beams = newBeams;
    }

    let sol2: number = 0;
    beams.forEach(v => sol2 += v)

    console.log(`Part 1: ${sol1}`)
    console.log(`Part 2: ${sol2}`)

  }
}