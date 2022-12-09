import * as fs from 'fs';
import * as path from 'path';
import { chunkify } from '../common/utils';

function getItemPriority(item: string): number {
    const inASCII = item.charCodeAt(0);
    return inASCII >= 65 && inASCII <= 90 ? inASCII - 38 : inASCII - 96;
}

// Read the input file
const input = fs.readFileSync(path.join(__dirname, '/input/input.txt'), 'utf8');

function part1(): void {
    // Parse the input file into an array of rucksacks
    const rucksacks = input.split('\r\n').map((line) => {
        const items = line.split('');
        return chunkify(items, items.length / 2);
    });

    // Set the sum to 0
    let prioritySum = 0;

    // Loop through each rucksack
    for (const sack of rucksacks) {
        const [left, right] = sack;
        const commonItem = left.find((value) => right.includes(value));

        if (!commonItem) {
            continue;
        }

        prioritySum += getItemPriority(commonItem);
    }

    console.log(`[1]: ${prioritySum}`);
}

function part2(): void {
    // Parse the input file into groups of 3
    const groups = chunkify(input.split('\r\n'), 3);

    // Set the sum to 0
    let prioritySum = 0;

    // Find the parition sum for each group
    for (const group of groups) {
        const sacks = group.map((line) => new Set(line));

        // Find the intersection of all 3 sets
        const [commonItem] = new Set(
            [...sacks[0]].filter((x) => sacks[1].has(x) && sacks[2].has(x))
        );

        prioritySum += getItemPriority(commonItem);
    }

    console.log(`[2]: ${prioritySum}`);
}

part1();
part2();
