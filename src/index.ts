import { loadEnvFile } from 'node:process'
import { runDay } from './dayrunner.js'
import * as fs from 'fs';

// Loads environment variables from the default .env file
loadEnvFile();

async function getInput(day : number) : Promise<string> {
  const res = await fetch(`https://adventofcode.com/2025/day/${day}/input`, {
    method: 'GET',
    headers: {
      Cookie: process.env.API_KEY
    }
  })

  return res.text();
}

if (process.argv.length < 3) {
  console.error("Expected the day to be provided.")
}


let useTestInput = false;
let day = -1;

for (let i = 2; i != process.argv.length; ++i) {
  if (process.argv[i] == '-t') {
    useTestInput = true;
  } else {
    try {
      day = parseInt(process.argv[i])
    } catch (err) {
      console.error(`Invalid command line argument '${process.argv[i]}'`);
    }
  }
}

// TODO: Do this safely (wrap in a try)
// const day = parseInt(process.argv[2]);
let input: string;

if (useTestInput) {
  input = await fs.readFileSync('./test_input.txt', { encoding: 'utf-8', flag: 'r'})
} else {
  input = await getInput(day);
}


// const input = await getInput(day);

runDay(day, input)

export {}