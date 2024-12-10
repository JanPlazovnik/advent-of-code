import { hash, run, findAdjacentSteps } from './input.mjs';

function solve(x, y, summits = new Set()) {
    const steps = findAdjacentSteps(x, y);

    for (const step of steps) {
        if (step.summit) {
            summits.add(hash(step.x, step.y));
        } else {
            solve(step.x, step.y, summits);
        }
    }

    return summits.size;
}

console.log(run(solve));
