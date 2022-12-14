import * as fs from 'fs';
import * as path from 'path';
import { InputType, Timer } from '../common/utils';

const input = fs.readFileSync(path.join(__dirname, '/input/input.txt'), 'utf8').trimEnd();

function hash(x: number, y: number): number {
    return x * 10000 + y;
}

let maxY = 0;

function parseInput(input: string): Set<number> {
    const rocks = input.split('\n');
    const rockPixels: Set<number> = new Set();

    // Get all the pixels where the rock has to be drawn using #
    for (const rock of rocks) {
        // Get all the points of the path
        const path = rock.split(' -> ');
        // Then get all the points of the path for the rock
        for (let i = 0; i < path.length - 1; i++) {
            const [x1, y1] = path[i].split(',').map(Number);
            const [x2, y2] = path[i + 1].split(',').map(Number);

            // Get the max Y value, we'll use this later to stop the simulation when the sand overflows
            maxY = Math.max(maxY, y1, y2);

            // Get the points between the two points, be mindful of the direction
            if (x1 === x2) {
                const yStart = Math.min(y1, y2);
                const yEnd = Math.max(y1, y2);

                for (let y = yStart; y <= yEnd; y++) {
                    rockPixels.add(hash(x1, y));
                }
            } else {
                const xStart = Math.min(x1, x2);
                const xEnd = Math.max(x1, x2);

                for (let x = xStart; x <= xEnd; x++) {
                    rockPixels.add(hash(x, y1));
                }
            }
        }
    }

    return rockPixels;
}

// Don't be me. I initially used a Set<number[]> and it was a pain to compare the values in the set
// I had to use JSON.stringify to compare the values, which is not ideal. Like, at all. So don't be me.
// The runtime was SLOW. Not just SLOW, but SLOW^2. So don't be me. I waited like 5 minutes for part 1, didn't even bother with part 2.
// With a Set<string> the runtime is much better, we're talking seconds here.
// Don't be me.
// Edit: We're now back to Set<number> but now I'm hashing the values to get a unique number.
function solve(input: string, type: InputType): number {
    const rockPixels = parseInput(input);
    const sandPixels: Set<number> = new Set();

    // Keep spawning sand until it's overflowing
    let simulating = true;
    while (simulating) {
        // Create a new sand particle at the origin
        const particle = [500, 0];

        // Keep dropping it until it stops or overflows
        let falling = true;
        while (falling) {
            const [x, y] = particle;

            // Do all the checks here so i can merge part1 and 2 into one function and not have to copy paste the code
            const down = !rockPixels.has(hash(x, y + 1)) && !sandPixels.has(hash(x, y + 1));
            const left = !rockPixels.has(hash(x - 1, y + 1)) && !sandPixels.has(hash(x - 1, y + 1));
            const right = !rockPixels.has(hash(x + 1, y + 1)) && !sandPixels.has(hash(x + 1, y + 1));

            // Check if the sand is overflowing
            if (type === InputType.Part1 && y > maxY) {
                falling = false;
                simulating = false;
                continue;
            }

            // There is space below the sand, keep falling
            if ((type === InputType.Part1 && down) || (type === InputType.Part2 && down && y <= maxY)) {
                particle[1] += 1;
                continue;
            }

            // Move diagonally left
            if ((type === InputType.Part1 && left) || (type === InputType.Part2 && left && y <= maxY)) {
                particle[0] -= 1;
                particle[1] += 1;
                continue;
            }

            // Move diagonally right
            if ((type === InputType.Part1 && right) || (type === InputType.Part2 && right && y <= maxY)) {
                particle[0] += 1;
                particle[1] += 1;
                continue;
            }

            // We're stuck, add the sand to the set
            sandPixels.add(hash(x, y));
            falling = false;
        }

        // We're back at the origin, stop simulating
        if (type === InputType.Part2 && particle[0] === 500 && particle[1] === 0) {
            simulating = false;
        }
    }

    return sandPixels.size;
}

const part1 = new Timer('Part 1');
console.log(solve(input, InputType.Part1));
part1.end();

const part2 = new Timer('Part 2');
console.log(solve(input, InputType.Part2));
part2.end();
