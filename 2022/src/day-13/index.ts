import * as fs from 'fs';
import * as path from 'path';
import { InputType, deepEqual } from '../common/utils';

type InputArray = (InputArray | number)[];

const input = fs.readFileSync(path.join(__dirname, '/input/input.txt'), 'utf8').trimEnd();

const DIVIDER_1 = [[2]];
const DIVIDER_2 = [[6]];

function parseInput(input: string): InputArray {
    const lines = input.split('\n').filter((line) => line !== '');
    const packets: InputArray[] = [];

    for (let i = 0; i < lines.length; i += 2) {
        packets.push(JSON.parse(lines[i]));
        packets.push(JSON.parse(lines[i + 1]));
    }

    return packets;
}

function checkOrder(left: InputArray, right: InputArray): number {
    // both are numbers
    if (typeof left === 'number' && typeof right === 'number') {
        if (left === right) {
            return 0;
        }

        return left < right ? 1 : -1;
    }

    // both are lists
    if (Array.isArray(left) && Array.isArray(right)) {
        const length = Math.max(left.length, right.length);

        for (let i = 0; i < length; i++) {
            const leftValue = left[i] as InputArray;
            const rightValue = right[i] as InputArray;

            if (leftValue === undefined) {
                return 1;
            }

            if (rightValue === undefined) {
                return -1;
            }

            const tmp = checkOrder(leftValue, rightValue);
            if (tmp === 0) {
                continue;
            }
            return tmp;
        }
    }

    // If only one is a number
    if (typeof left === 'number' && Array.isArray(right)) {
        return checkOrder([left], right);
    }

    if (typeof right === 'number' && Array.isArray(left)) {
        return checkOrder(left, [right]);
    }

    return 0;
}

function solve(input: string, type: InputType): number | void {
    const packets = parseInput(input);

    if (type === InputType.Part1) {
        const results = [];
        for (let i = 0; i < packets.length; i += 2) {
            const result = checkOrder(packets[i] as InputArray, packets[i + 1] as InputArray);
            if (result === 0) continue;
            results.push(result);
        }
        return results.map((result, index) => (result === 1 ? index + 1 : 0)).reduce((a, b) => a + b, 0);
    }

    if (type === InputType.Part2) {
        packets.push(DIVIDER_1, DIVIDER_2);
        const sorted = packets.sort((left, right) => (checkOrder(left as InputArray, right as InputArray) === 1 ? -1 : 1));
        const div1 = sorted.findIndex((result) => deepEqual(result, DIVIDER_1)) + 1;
        const div2 = sorted.findIndex((result) => deepEqual(result, DIVIDER_2)) + 1;
        return div1 * div2;
    }
}

console.log(solve(input, InputType.Part1));
console.log(solve(input, InputType.Part2));
