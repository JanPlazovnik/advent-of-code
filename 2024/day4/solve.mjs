import { input } from './input.mjs';

export function solve(needles) {
    let count = 0;

    for (const needle of needles) {
        const is1D = !Array.isArray(needle[0]);

        for (let row = 0; row < input.length; row++) {
            for (let col = 0; col < input[row].length; col++) {
                // Handle simple 1D needle
                if (is1D) {
                    if (input[row].slice(col, col + needle.length).join('') === needle.join('')) {
                        count++;
                    }
                    continue;
                }

                // Handle 2D matrix needles
                let match = true;
                for (let nRow = 0; nRow < needle.length; nRow++) {
                    for (let nCol = 0; nCol < needle[nRow].length; nCol++) {
                        if (needle[nRow][nCol] == "#") continue;
                        if (input[row + nRow]?.[col + nCol] !== needle[nRow][nCol]) {
                            match = false;
                            break;
                        }
                    }
                }

                if (match) {
                    count++;
                }
            }
        }
    }

    return count;
}