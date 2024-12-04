import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')
    .map((row) => row.split(""));

export { input }