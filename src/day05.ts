import { Day } from './day.js'

function rangeCollide(r1: number[], r2: number[]): boolean {
  return r1[1] >= r2[0] && r1[0] <=r2[1];
}

function addRange(range: number[], ranges: number[][]): void {
  let hits : number[][] = [range];

  for (let i = 0; i < ranges.length; ++i) {
    if (rangeCollide(range, ranges[i])) {
      hits.push(ranges[i]);
      ranges.splice(i, 1);
      i--;
    } 
  }
  let hitsFlat = hits.flat();
  ranges.push([Math.min(...hitsFlat), Math.max(...hitsFlat)])
}


const day05: Day = {
  run: (input: string) => {
    const lines: string[] = input.split(/\r?\n/);

    let i : number = 0;
    let sol1: number = 0;

    let ranges: number[][] = [];

    while (lines[i]) {
      const range: string[] = lines[i].split('-');
      // ranges.push(range.map(l => parseInt(l)))
      addRange(range.map(l => parseInt(l)), ranges)
      i++;
    }

    i++; // Blank line

    while (lines[i]) {
      const j = parseInt(lines[i]);

      if (ranges.some(([s, e]) => s <= j && j <= e)) {
        sol1++;
      }

      i++;
    }

    let sol2: number = ranges.reduce((total: number, [s, e]) => total + 1 + e - s, 0);

    console.log(`Part 1: ${sol1}`);
    console.log(`Part 2: ${sol2}`)
  }
}

export { day05 }