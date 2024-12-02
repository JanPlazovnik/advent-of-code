import { left, right } from './input.mjs'

const appearances = {};

for (const ln of left) {
    if (!appearances[ln]) {
        appearances[ln] = {
            count: 0,
            score: 0,
            locked: false
        };
    }

    for (const rn of right) {
        if (appearances[ln].locked) continue;

        if (rn === ln) {
            appearances[ln].count++;
        }
    }

    appearances[ln].locked = true;
    appearances[ln].score += appearances[ln].count * ln
}

let sum = 0;
for (const appearance of Object.values(appearances)) {
    sum += appearance.score;
}

console.log(sum)