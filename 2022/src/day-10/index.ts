import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';

const input = fs.readFileSync(path.join(__dirname, '/input/input.txt'), 'utf8').split('\n').map(it => it.split(' '));
const line = { str: '', print() { console.log(this.str); this.str = ''; } }
let registerValue = 1, cycles = 0, signalStrength = 0;

for (const [instr, value] of input) {
    instr === 'noop' && runCycle();
    instr === 'addx' && runCycle() && runCycle() && (registerValue += parseInt(value));
}

function runCycle() {
    line.str += ((cycles % 40) >= registerValue - 1 && (cycles % 40) <= registerValue + 1) ? chalk.bold`{red #}` : ' ';
    (++cycles % 40 === 0) && line.print();
    return [20, 60, 100, 140, 180, 220].includes(cycles) && (signalStrength += cycles * registerValue), true;
}

console.log(signalStrength);