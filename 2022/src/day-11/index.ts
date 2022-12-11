import * as fs from 'fs';
import * as path from 'path';
import { Monkey, WorryManageMode } from './types';

const input = fs.readFileSync(path.join(__dirname, '/input/input.txt'), 'utf8').trim();

function parseInput(input: string): Monkey[] {
    const monkeys: Monkey[] = [];
    const lines = input.split('\n');
    let id = 0;
    while (lines.length) {
        const monkey: Monkey = {
            id: id++,
            operation: {},
            test: {},
            inspections: 0,
        } as Monkey;
        while (lines.length && lines[0] !== '') {
            const line = lines.shift();
            if (!line || line.startsWith('Monkey')) continue;

            const dataStart = line.indexOf(':');
            if (dataStart === -1) throw new Error('wtf?');
            const dataString = line.substring(dataStart + 2, line.length);

            // Get starting items
            if (line.includes('Starting items')) {
                monkey.items = dataString.split(', ').map(Number);
                continue;
            }

            // Get operation
            if (line.includes('Operation')) {
                const groups = dataString.match(/([+-/*]) (\d+|\w+)/);
                if (!groups?.length) throw new Error('uh-oh.');
                monkey.operation.type = groups[1];
                monkey.operation.value = groups[2];
                continue;
            }

            // Get test
            if (line.includes('Test')) {
                monkey.test.divisibleBy = Number(dataString.split(' ').at(-1));
                continue;
            }

            // Get test true
            if (line.includes('If true')) {
                monkey.test.true = Number(dataString.split(' ').at(-1));
                continue;
            }

            // Get test false
            if (line.includes('If false')) {
                monkey.test.false = Number(dataString.split(' ').at(-1));
                continue;
            }

            throw new Error('yikes');
        }
        monkeys.push(monkey);
        lines.shift();
    }

    return monkeys;
}

function solve(rounds: number, worryManageMode: WorryManageMode): number {
    const monkeys = parseInput(input);
    // This is only needed for WorryManageMode.MOD, so it's still wasteful to calculate it for WorryManageMode.DIVIDE but it's not a big deal
    const mod = monkeys.reduce((value: number, monkey: Monkey) => monkey.test.divisibleBy * value, 1);

    for (let round = 0; round < rounds; round++) {
        for (const monkey of monkeys) {
            for (const item of [...monkey.items]) {
                monkey.inspections++;
                const index = monkey.items.indexOf(item);
                const value = !Number.isNaN(Number(monkey.operation.value)) ? Number(monkey.operation.value) : item;

                // prettier-ignore
                switch (monkey.operation.type) {
                    case '+': monkey.items[index] += value; break;
                    case '*': monkey.items[index] *= value; break;
                }

                // prettier-ignore
                switch (worryManageMode) {
                    case WorryManageMode.DIVIDE: monkey.items[index] = Math.floor(monkey.items[index] / 3); break;
                    case WorryManageMode.MOD: monkey.items[index] %= mod; break;
                }

                const test = monkey.items[index] % monkey.test.divisibleBy === 0;
                monkeys[test ? monkey.test.true : monkey.test.false].items.push(monkey.items.shift() as number);
            }
        }
    }

    const sorted = monkeys.sort((a, b) => b.inspections - a.inspections);
    return sorted[0].inspections * sorted[1].inspections;
}

console.log(solve(20, WorryManageMode.DIVIDE)); // 55216
console.log(solve(10000, WorryManageMode.MOD)); // 12848882750
