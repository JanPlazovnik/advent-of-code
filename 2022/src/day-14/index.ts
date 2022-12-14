import * as fs from 'fs';
import * as path from 'path';
import { InputType, Timer } from '../common/utils';

const input = fs.readFileSync(path.join(__dirname, '/input/input.txt'), 'utf8').trimEnd();

function str(x: number, y: number): string {
    return `${x},${y}`;
}

function parseInput(input: string): Set<string> {
    const rocks = input.split('\n');
    const rockPixels: Set<string> = new Set();

    // Get all the pixels where the rock has to be drawn using #
    for (const rock of rocks) {
        // Get all the points of the path
        const path = rock.split(' -> ');
        // Then get all the points of the path for the rock
        for (let i = 0; i < path.length - 1; i++) {
            const [x1, y1] = path[i].split(',').map(Number);
            const [x2, y2] = path[i + 1].split(',').map(Number);

            // Get the points between the two points, be mindful of the direction
            if (x1 === x2) {
                const yStart = Math.min(y1, y2);
                const yEnd = Math.max(y1, y2);

                for (let y = yStart; y <= yEnd; y++) {
                    rockPixels.add(str(x1, y));
                }
            } else {
                const xStart = Math.min(x1, x2);
                const xEnd = Math.max(x1, x2);

                for (let x = xStart; x <= xEnd; x++) {
                    rockPixels.add(str(x, y1));
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
function solve(input: string, type: InputType): number {
    const origin = [500, 0];
    const rockPixels = parseInput(input);
    const sandPixels: Set<string> = new Set();

    // I could have just stored this when parsing the input, but it is what it is.
    const maxY = Math.max(...Array.from(rockPixels.values()).map((value) => Number(value.split(',')[1])));

    // Keep spawning sand until it's overflowing
    let simulating = true;
    while (simulating) {
        // Create a new sand particle at the origin
        const particle = [...origin];

        // Keep dropping it until it stops or overflows
        let falling = true;
        while (falling) {
            const [x, y] = particle;

            // Do all the checks here so i can merge part1 and 2 into one function and not have to copy paste the code
            const down = !rockPixels.has(str(x, y + 1)) && !sandPixels.has(str(x, y + 1));
            const left = !rockPixels.has(str(x - 1, y + 1)) && !sandPixels.has(str(x - 1, y + 1));
            const right = !rockPixels.has(str(x + 1, y + 1)) && !sandPixels.has(str(x + 1, y + 1));

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
            sandPixels.add(str(x, y));
            falling = false;
        }

        // We're back at the origin, stop simulating
        if (type === InputType.Part2 && particle.toString() === origin.toString()) {
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
