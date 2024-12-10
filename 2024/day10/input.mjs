import fs from 'fs';

const args = process.argv;

const file = (args[2] == "demo" ? "demo" : "input") + ".txt";
const data = fs.readFileSync(file, 'utf-8').trim();
const map = data.split("\n").map((e) => e.split(""));

const hash = (a, b) => a * 10000 + b;

function findAdjacentSteps(x, y, yMax = 9) {
    const current = Number(map[x][y]);
    let steps = [];

    if (map[x]?.[y + 1] == current + 1) {
        steps.push({ x: x, y: y + 1, summit: map[x]?.[y + 1] == yMax });
    }

    if (map[x]?.[y - 1] == current + 1) {
        steps.push({ x: x, y: y - 1, summit: map[x]?.[y - 1] == yMax });
    }

    if (map[x + 1]?.[y] == current + 1) {
        steps.push({ x: x + 1, y, summit: map[x + 1]?.[y] == yMax });
    }

    if (map[x - 1]?.[y] == current + 1) {
        steps.push({ x: x - 1, y, summit: map[x - 1]?.[y] == yMax });
    }

    return steps;
}

function run(fn) {
    let count = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] != "0") continue;
            count += fn(i, j)
        }
    }
    return count;
}

export { map, hash, findAdjacentSteps, run }