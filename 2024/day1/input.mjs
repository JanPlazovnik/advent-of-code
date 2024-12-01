import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')
    .map((x) => x.split('   ').map(Number))

const left = [];
const right = [];

for (const line of input) {
    left.push(line[0]);
    right.push(line[1]);
}

left.sort();
right.sort();

export {
    left,
    right
}