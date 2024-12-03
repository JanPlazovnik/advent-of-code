import { input } from './input.mjs';

function getDirection(curr, next) {
    if (next > curr) return 1;
    if (next < curr) return -1;
    return null;
}

function checkUnsafe(curr, next) {
    const diff = Math.abs(curr - next);
    return diff == 0 || diff > 3;
}

function parseReport(report) {
    let direction = null;
    for (let i = 0; i < report.levels.length - 1; i++) {
        const curr = report.levels[i];
        const next = report.levels[i + 1];

        if (checkUnsafe(curr, next)) return false;

        const currentDirection = getDirection(curr, next);
        if (direction === null) {
            direction = currentDirection;
        } else if (direction !== currentDirection) {
            return false;
        }
    }
    return true;
}

function isSafeWithOneRemoval(levels) {
    for (let i = 0; i < levels.length; i++) {
        const modifiedReport = [...levels];
        modifiedReport.splice(i, 1);
        if (parseReport({ levels: modifiedReport })) {
            return true;
        }
    }
    return false;
}

let count = 0;
for (const report of input) {
    if (parseReport(report)) {
        count++;
    } else if (isSafeWithOneRemoval(report.levels)) {
        count++;
    }
}

console.log(count);
