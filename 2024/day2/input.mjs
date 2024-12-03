import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')
    .map((x) => ({
        safe: undefined,
        direction: undefined,
        unsafeIndices: [],
        levels: x.split(" ").map(Number)
    }))

export { input }