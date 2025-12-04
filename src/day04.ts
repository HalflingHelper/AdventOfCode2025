import { Day } from './day.js'

interface Point {
  row: number;
  col: number;
}

function getAccessibleRolls(grid: string[][]): Point[] {
  const adj = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  let res: Point[] = [];

  for (let i = 0; i != grid.length; ++i) {
    for (let j = 0; j != grid[i].length; ++j) {
      if (grid[i][j] != '@') { continue; }

      let count = 0;

      adj.forEach(([di, dj]) => {
        if (i + di >= 0 && i + di < grid.length && j + dj >= 0 && j + dj < grid[i].length) {
          if (grid[i + di][j + dj] == '@') {
            count++;
          }
        }
      })
      if (count < 4) {
        res.push({ row: i, col: j })
      }
    }
  }

  return res;
}



const day04: Day = {
  run: (input: string) => {
    const grid: string[][] = input.split(/\r?\n/).map(l => l.split(''))
    grid.pop(); // Remove newline row

    let sol1 = 0;
    let sol2 = 0;

    let rolls: Point[] = getAccessibleRolls(grid);
    sol1 = rolls.length;

    while (rolls.length > 0) {
      sol2 += rolls.length;

      rolls.forEach(p => {
        grid[p.row][p.col] = '.';
      })

      rolls = getAccessibleRolls(grid)      
    }

    console.log(`Part 1: ${sol1}`);
    console.log(`Part 2: ${sol2}`);
  }
}

export { day04 }