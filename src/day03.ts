import { Day } from './day.js'

function maxJoltage(bank: string, size: number): number {
  let choices: string[] = [];
  for (let i = 0; i != size; ++i) { choices.push('0'); }

  for (let i = 0; i < bank.length; ++i) {
    const c = bank.charAt(i);
    const j : number = Math.max(size - (bank.length - i), 0);

    for (let k = j; k < choices.length; ++k) {
      if (c > choices[k]) {
        choices.splice(k, 1, c);
        choices.fill('0', k+1)
        break;
      }
    }
  }

  return parseInt(choices.join(''));
}

const day03: Day = {
  run: (input: string) => {
    const lines: string[] = input.split(/\r?\n/);
    let sol1: number = 0;
    let sol2: number = 0;

    for (let line of lines) {
      sol1 += maxJoltage(line, 2);
      sol2 += maxJoltage(line, 12);
    }

    console.log(`Part 1: ${sol1}`);
    console.log(`Part 2: ${sol2}`);
  }
}

export { day03 }