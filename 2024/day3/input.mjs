import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');

// Part 1
const re1 = new RegExp(/mul\((\d+),(\d+)\)/, "g");
const matches1 = [];
do {
    const match = re1.exec(input);
    if (match) {
        matches1.push(match);
    }
} while (re1.lastIndex > 0);

// Part 2
const re2 = new RegExp(/mul\((\d+),(\d+)\)|don\'t\(\)|do\(\)/, "g");
const matches2 = [];
do {
    const match = re2.exec(input);
    if (match) {
        matches2.push(match);
    }
} while (re2.lastIndex > 0);

export { input, matches1, matches2 };