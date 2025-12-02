import { day01 } from './day01.js'
import { day02 } from './day02.js'

function runDay(day: number, input: string) {
  switch (day) {
    case 1:
      day01.run(input);
      break;
    case 2: 
      day02.run(input)
      break;
    default:
      console.error(`Day ${day} does not exist`)
  }
}


export { runDay }