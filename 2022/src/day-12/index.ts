/* eslint-disable @typescript-eslint/no-unused-vars */
import * as fs from 'fs';
import * as path from 'path';
import { InputType } from '../common/utils';
import { CoordinatePair, StartPoint } from './types';

const input = fs.readFileSync(path.join(__dirname, '/input/input.txt'), 'utf8').trim();

function parseInput(input: string, type: InputType): [number[][], CoordinatePair[], CoordinatePair] {
    const lines = input.split('\n');
    const elevationMap: number[][] = [];
    const startPositions: CoordinatePair[] = [];
    let end: CoordinatePair | null = null;

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (!elevationMap[i]) {
                elevationMap[i] = [];
            }
            if (lines[i][j] === 'S' || (type === InputType.Part2 && lines[i][j] === 'a')) {
                startPositions.push([j, i]);
                elevationMap[i][j] = 0; // 0 since that's the starting point
            } else if (lines[i][j] === 'E') {
                end = [j, i];
                elevationMap[i][j] = 25; // z - a = 25
            } else {
                elevationMap[i][j] = lines[i][j].charCodeAt(0) - 'a'.charCodeAt(0); // 1 - 25 elevation scale
            }
        }
    }

    if (!end) {
        throw new Error('There is no end in sight. You are doomed to be stuck here forever. Your suffering will be legendary, even in Hell.');
    }

    return [elevationMap, startPositions, end];
}

function solve(input: string, type: InputType): number {
    const [elevationMap, startPositions, end] = parseInput(input, type);

    const visited: CoordinatePair[] = [];
    const queue: StartPoint[] = startPositions.map((s) => ({ point: s, steps: 0 }));

    while (queue.length > 0) {
        const { point, steps } = queue.shift() as StartPoint;
        const [x, y] = point;

        // if we've already visited this point, skip it
        if (visited.some((v) => v[0] === x && v[1] === y)) {
            continue;
        }

        // Mark point as visited
        visited.push(point);

        // If we're at the end, return the steps taken to get here
        if (point[0] === end[0] && point[1] === end[1]) {
            return steps;
        }

        // Get the adjacent points
        const adjacentPoints: CoordinatePair[] = [
            [x - 1, y],
            [x + 1, y],
            [x, y - 1],
            [x, y + 1],
        ];

        for (const adjacentPoint of adjacentPoints) {
            const [adjacentX, adjacentY] = adjacentPoint;

            // Skip the adjacent point if it's out of bounds of the map
            if (adjacentX < 0 || adjacentX >= elevationMap[0].length || adjacentY < 0 || adjacentY >= elevationMap.length) {
                continue;
            }

            // Skip the adjacent point if the elevation is no bueno (too high)
            if (elevationMap[adjacentY][adjacentX] - elevationMap[y][x] > 1) {
                continue;
            }

            // Add the adjacent point to the queue
            queue.push({ point: adjacentPoint, steps: steps + 1 });
        }
    }
    return -1;
}

console.log(solve(input, InputType.Part1));
console.log(solve(input, InputType.Part2));
