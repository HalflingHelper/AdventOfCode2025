import { Day } from './day.js'

// https://stackoverflow.com/questions/22015684/zip-arrays-in-javascript
const zip = (...arr) => Array(Math.max(...arr.map(a => a.length))).fill(0).map((_, i) => arr.map(a => a[i]));

function doOp(op: string, arr: number[]): number {
  switch (op) {
    case '*':
      return arr.reduce((a, b) => a * b, 1)
    case '+':
      return arr.reduce((a, b) => a + b, 0)
    default:
      console.error(`Bad op '${op}'`)
      return -1;
  }
}


const day06 = {
  run: (input: string) => {
    const lines = input.trim().split(/\r?\n/)
    const numLines = lines.map(l => l.trim().split(/[\s\r\n]+/));
    const calcs = zip(...numLines);

    const a = calcs.map((a) => doOp(a[a.length - 1], a.slice(0, a.length - 1).map((i) => parseInt(i))));
    const sol1 = a.reduce((a, b) => a + b, 0)

    // Have to use part two for lines to get a new calcs
    let calcs2 = [];
    let curCalc = [];
    let curOp = '';
    for (let i = 0; i != lines[0].length; ++i) {
      let n = '';
      for (let j = 0; j != lines.length - 1; ++j) {
        n += lines[j][i];
      }

      if (lines[lines.length - 1][i] != ' ' && lines[lines.length - 1][i]) {
        curOp = lines[lines.length - 1][i];
      }

      n = n.replace(/\s/g, '');

      if (n == '') {
        curCalc.push(curOp);
        calcs2.push(curCalc);
        curCalc = [];
      } else {
        curCalc.push(parseInt(n));
      }
    }

    curCalc.push(curOp);
    calcs2.push(curCalc);

    const b = calcs2.map((a) => doOp(a[a.length - 1], a.slice(0, a.length - 1)));
    const sol2 = b.reduce((a, b) => a + b, 0)


    console.log(`Part 1: ${sol1}`)
    console.log(`Part 2: ${sol2}`)
  }
}

export { day06 }