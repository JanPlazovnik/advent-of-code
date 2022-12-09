import * as fs from 'fs';
import * as path from 'path';

// Read the input file
const input = fs.readFileSync(path.join(__dirname, '/input/input.txt'), 'utf8');

// Parse the input into the stacks and instructions
function parseInput(input: string): [string[][], number[][]] {
    const _input = input.split('\r\n');
    const separator = _input.indexOf('');
    const _stacks = _input.slice(0, separator - 1);
    const _instructions = _input.slice(separator + 1);

    // Parse the stacks into just the characters
    const rows = _stacks.map((stack) => {
        // Bundle together every 4 characters
        return (stack.match(/.{1,4}/g) || []).map((item) => {
            // Remove everything but the actual contained character
            return /\[(.)\]/.exec(item.trim())?.[1] ?? '';
        });
    });

    // Reorder the rows into stacks with the bottom most item first
    const orderedStacks: string[][] = [];
    for (const row of rows) {
        for (let i = 0; i < row.length; i++) {
            if (row[i] === '') continue;
            if (orderedStacks[i] === undefined) orderedStacks[i] = [];
            orderedStacks[i].unshift(row[i]);
        }
    }

    return [orderedStacks, parseInstructions(_instructions)];
}

// Parse the instructions
function parseInstructions(instructions: string[]): number[][] {
    return instructions.map((instruction) => {
        const parts = instruction.split(' ').map((part) => parseInt(part));
        return [parts[1], parts[3] - 1, parts[5] - 1];
    });
}

function part1(): void {
    const [stacks, instructions] = parseInput(input);

    for (const [count, from, to] of instructions) {
        for (let i = 0; i < count; i++) {
            const item = stacks[from].pop()!;
            stacks[to].push(item);
        }
    }

    console.log(stacks.map((stack) => stack[stack.length - 1]).join(''));
}

function part2(): void {
    const [stacks, instructions] = parseInput(input);

    for (const [count, from, to] of instructions) {
        const items = stacks[from].splice(-count);
        stacks[to].push(...items);
    }

    console.log(stacks.map((stack) => stack[stack.length - 1]).join(''));
}

part1();
part2();
