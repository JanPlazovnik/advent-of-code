import { run, findAdjacentSteps } from './input.mjs';

function solve(x, y) {
    const steps = findAdjacentSteps(x, y);
    let count = 0;

    for (const step of steps) {
        if (step.summit) {
            count++;
        } else {
            count += solve(step.x, step.y);
        }
    }

    return count;
}

console.log(run(solve));
