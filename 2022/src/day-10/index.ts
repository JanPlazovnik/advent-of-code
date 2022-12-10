import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';

const input = fs.readFileSync(path.join(__dirname, '/input/input.txt'), 'utf8');

let registerValue = 1;
let currentCycles = 0;
const signalStrengths: number[] = [];

// prettier-ignore
const display: string[][] = new Array(6).fill(0).map(() => new Array(40).fill(' '));

for (const instruction of input.split('\n')) {
    const [instr, value] = instruction.split(' ');

    instr === 'noop' && runCycles(1);
    instr === 'addx' && runCycles(2) && (registerValue += parseInt(value));
}

function runCycles(amount: number): boolean {
    for (let i = 0; i < amount; i++) {
        // prettier-ignore
        if ([registerValue - 1, registerValue, registerValue + 1].includes(currentCycles % 40)) {
            display[Math.floor((currentCycles + 1) / 40)][((currentCycles) % 40)] = chalk.bold`{red #}`;
        }

        currentCycles++;

        // Calculate the signal strength
        if ([20, 60, 100, 140, 180, 220].includes(currentCycles)) {
            signalStrengths.push(currentCycles * registerValue);
        }
    }
    return true;
}

console.log(signalStrengths.reduce((acc, curr) => acc + curr, 0));
console.log(display.map((row) => row.join('')).join('\n'));
