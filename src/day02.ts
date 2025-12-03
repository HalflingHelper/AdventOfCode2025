import { Day } from './day.js'

const day02: Day = {
  run: (input: string) => {
    const ranges: string[] = input.split(",");


    function isInvalid(id: number) {
      const len: number = Math.ceil(Math.log10(id))
      if (len % 2 == 1) return false;

      const factor: number = 10 ** (len / 2) + 1

      return id % factor == 0;
    }

    function isInvalidTwo(id: number) {
      const len: number = Math.ceil(Math.log10(id))

      // i is the number of repetitions
      for (let i = 2; i <= len; ++i) {
        if (len % i) continue;

        let div: number = 0;
        for (let j = 0; j < len; j += len / i) {
          div += 10 ** j;
        }

        if (id % div == 0) return true;
      }
      return false;
    }


    let ans1: number = 0;
    let ans2: number = 0;

    ranges.forEach(r => {
      const ids: string[] = r.split("-");
      for (let i = parseInt(ids[0]); i <= parseInt(ids[1]); ++i) {
        if (isInvalid(i)) { ans1 += i; }
        if (isInvalidTwo(i)) { ans2 += i; }
      }
    })
    console.log(`Part 1: ${ans1}`)
    console.log(`Part 2: ${ans2}`)
  }
}

export { day02 }


