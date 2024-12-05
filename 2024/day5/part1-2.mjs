import { rules, updates } from "./input.mjs";
import { isDeepStrictEqual } from "util";

function reorderUpdate(update) {
    let sorted = [...update];
    let updated;

    do {
        updated = false;

        for (let i = 0; i < sorted.length; i++) {
            for (let j = i + 1; j < sorted.length; j++) {
                const page = sorted[i];
                const before = sorted[j];

                if (rules.some(([a, b]) => a === before && b === page)) {
                    [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
                    updated = true;
                }
            }
        }
    } while (updated);

    return sorted;
}

let sum = 0;
let sum2 = 0;
for (const update of updates) {
    const reordered = reorderUpdate(update);

    if (isDeepStrictEqual(update, reordered)) {
        sum += update[Math.floor(update.length / 2)];
    } else {
        sum2 += reordered[Math.floor(reordered.length / 2)];
    }

}
console.log(`Part 1: ${sum}`);
console.log(`Part 2: ${sum2}`);
