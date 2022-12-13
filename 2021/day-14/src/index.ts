import * as fs from 'fs';
import * as path from 'path';

// Read the input file
const input = fs
    .readFileSync(path.join(__dirname, '/input/demo.txt'), 'utf8')
    .trimEnd()
    .split('\n\n');

function parseInput(input: string[]): [string, { [key: string]: string }] {
    const _input = [...input];
    const str = _input.shift() as string;
    const lines = _input.join('').split('\n');
    const rules = {} as { [key: string]: string };
    for (const line of lines) {
        const [pair, el] = line.split(' -> ');
        rules[pair] = el;
    }
    return [str, rules];
}

function solve(input: string[], steps: number): void | number {
    const parsed = parseInput(input);
    let str: string[] = parsed[0].split('');
    const rules = parsed[1];

    for (let step = 0; step < steps; step++) {
        str = str
            .map((char, i) => (rules[char + str[i + 1]] ? char + rules[char + str[i + 1]] : char))
            .join('')
            .split('');
        console.log(`Step ${step + 1}: ${str.length}`);
    }

    const counts: { [key: string]: number } = {};
    str.forEach((value) => {
        if (!counts[value]) counts[value] = 0;
        counts[value]++;
    });

    const mostCommon = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
    const leastCommon = Object.keys(counts).reduce((a, b) => (counts[a] < counts[b] ? a : b));

    console.log(`Most common: ${mostCommon} (${counts[mostCommon]})`);
    console.log(`Least common: ${leastCommon} (${counts[leastCommon]})`);
    console.log(counts[mostCommon] - counts[leastCommon]);
}

solve(input, 10);
// solve(input, 40); // runs out of memory after ~25 steps and i can't be bothered to make it work
