import { day01 } from './day01.js'
import { day02 } from './day02.js'
import { day03 } from './day03.js'

function runDay(day: number, input: string) {
  console.log(`Day ${day}\n==================`)
  switch (day) {
    case 1:
      day01.run(input);
      break;
    case 2: 
      day02.run(input)
      break;
    case 3:
      day03.run(input);
      break;
    default:
      console.error(`Day ${day} does not exist`)
  }
}


export { runDay }