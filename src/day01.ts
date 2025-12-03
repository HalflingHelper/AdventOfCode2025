import * as fs from 'fs';
import { Day } from './day.js'


const day01: Day = {
  run: (input: string) => {
    const lines: string[] = input.split(/\r?\n/);

    let counter: number = 0;
    let counter1: number = 0;
    let dial: number = 50;
    let olddial: number = 50;
    lines.forEach(l => {
      let m = l.match(/([LR])(\d+)/);

      if (m) {
        let dir: number = m[1] == 'L' ? -1 : 1;
        let amt: number = parseInt(m[2]);

        counter1 += Math.floor(amt / 100);
        amt -= Math.floor(amt / 100) * 100;

        olddial = dial;
        dial += dir * amt;


        // If dial is negative, and wasn't zero last time, increment

        // This means we crossed over
        if (dial < 0) {
          dial += 100;
          if (olddial) counter1++;
        }

        if (olddial && dial == 0) {
          counter1++;
        }
        // This means we crossed over
        if (dial >= 100) {
          dial -= 100;
          if (olddial) counter1++;
        }
        if (dial == 0) {
          counter++;
        }
      }
    })

    console.log(`Part 1 ${counter}`)

    console.log(`Part 2 ${counter1}`)
  }
}

export { day01 }


